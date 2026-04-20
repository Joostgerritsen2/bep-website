# BEP Agentic Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the BEP chat from a basic Q&A widget into a lightweight agentic experience: Claude Sonnet with tool use, rich hardcoded domain data, a "BEP zoekt op..." tool indicator, markdown rendering, page context, and proactive opening after 45s.

**Architecture:** The API route runs a server-side agent loop using `client.messages.create()` — when Claude returns `stop_reason: 'tool_use'`, the route executes the hardcoded tool and loops; on `end_turn` it sends the final text as a single SSE chunk. The ChatWidget handles three SSE event types (`tool_call`, `text`, `done`) and renders a spinner during tool calls. Proactive opening is a `useEffect` timer that fires once per session via `sessionStorage`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Anthropic SDK (`@anthropic-ai/sdk` — already installed), Lucide React, `usePathname` from `next/navigation`

---

## File Structure

| File | Change |
|---|---|
| `src/app/api/chat/route.ts` | Full rewrite: agent loop, tool definitions, hardcoded tool data, `executeTool`, new system prompt |
| `src/components/ChatWidget.tsx` | Add `usePathname`, new SSE parsing, `toolCalling` state + indicator, markdown renderer, proactive open |

---

### Task 1: API route — agent loop + tools + system prompt

**Files:**
- Modify: `src/app/api/chat/route.ts` (full replacement)

- [ ] **Step 1: Replace `route.ts` with the complete new implementation**

```typescript
// src/app/api/chat/route.ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Tool definitions ──────────────────────────────────────────────────────────

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'lookup_case',
    description: 'Zoek gedetailleerde informatie op over een BEP live case in een specifiek domein.',
    input_schema: {
      type: 'object' as const,
      properties: {
        domain: {
          type: 'string',
          enum: ['aanbesteding', 'haven', 'financieel', 'hr', 'algemeen'],
        },
      },
      required: ['domain'],
    },
  },
  {
    name: 'get_pricing_advice',
    description: 'Geef een passend planadvies op basis van bedrijfsomvang en use case.',
    input_schema: {
      type: 'object' as const,
      properties: {
        company_size: { type: 'string', enum: ['klein', 'middel', 'groot', 'enterprise'] },
        use_case: { type: 'string' },
      },
      required: ['company_size'],
    },
  },
  {
    name: 'capture_lead',
    description: 'Sla naam en e-mail op van een geïnteresseerde bezoeker. Gebruik dit zodra iemand een demo wil, een afspraak wil of expliciet interesse toont.',
    input_schema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['name', 'email'],
    },
  },
  {
    name: 'check_fit',
    description: 'Analyseer of BEP geschikt is voor een organisatie op basis van sector en uitdaging.',
    input_schema: {
      type: 'object' as const,
      properties: {
        sector: { type: 'string' },
        challenge: { type: 'string' },
      },
      required: ['sector', 'challenge'],
    },
  },
]

// ── Hardcoded tool data (replace with real DB calls later) ────────────────────

const CASE_DATA: Record<string, string> = {
  aanbesteding: `**Tender Strateeg** (met Rijkswaterstaat)
- 500+ aanbestedingsdocumenten geïndexeerd
- Zoektijd van uren naar seconden — 60% sneller offertes schrijven
- Agents bewaken deadlines, signaleren kansen, stellen concept-reacties op
- Ideaal voor: adviesbureaus, ingenieursbureaus, bouwbedrijven met 10+ tenders/jaar`,

  haven: `**Groningen Seaports**
- 24/7 toegang tot operationele kennis voor havenoperateurs
- Alle regulaties, procedures en historische incidenten direct doorzoekbaar
- Nieuwe medewerkers operationeel in dagen in plaats van weken
- Ideaal voor: havens, logistiek, terminal operators`,

  financieel: `**SJB Advies**
- 10.000+ financiële dossiers doorzoekbaar gemaakt
- Adviseurs vinden klanthistorie direct — geen minuten zoeken meer
- Agents signaleren verlopen polissen en kansen voor aanvullend advies
- Ideaal voor: financieel adviseurs, accountants, belastingkantoren`,

  hr: `**BPZ**
- 80+ jaar bedrijfskennis bewaard en toegankelijk gemaakt
- HR-agents begeleiden onboarding, beantwoorden personeelsvragen 24/7
- Kennisborging bij pensionering van senior medewerkers
- Ideaal voor: organisaties met veel impliciete kennis, familiebedrijven`,

  algemeen: `**BEP live cases:**
- Tender Strateeg: aanbesteding — 60% sneller tenders schrijven
- Groningen Seaports: haven/logistiek — 24/7 operationele kennistoegang
- SJB Advies: financieel — 10.000+ dossiers doorzoekbaar
- BPZ: HR/kennisborging — 80+ jaar expertise bewaard

Vraag naar een specifiek domein voor meer details.`,
}

const PRICING_DATA: Record<string, string> = {
  klein: `Voor kleinere organisaties adviseer ik het **Start plan**:
- €595/maand + €1.250 eenmalig
- 1 domein, 1 koppeling, 1 agent, tot 10 gebruikers
- Live in 2-4 weken, ideaal om direct resultaat te zien`,

  middel: `Voor middelgrote organisaties adviseer ik het **Team plan** (meest gekozen):
- €1.250/maand + €1.500 eenmalig
- 2 domeinen, 3 koppelingen, 3 agents, tot 25 gebruikers
- Bewezen instapniveau voor groeiende organisaties`,

  groot: `Voor grotere organisaties adviseer ik het **Growth plan**:
- €2.500/maand + €2.500 eenmalig
- Meerdere domeinen, 5 koppelingen, 5 agents, tot 50 gebruikers
- Ruimte voor brede uitrol over meerdere afdelingen`,

  enterprise: `Voor enterprise-omgevingen adviseer ik het **Platform plan**:
- v.a. €4.500/maand + v.a. €3.500 eenmalig
- Brede uitrol, enterprise governance, on-prem beschikbaar
- Volledig maatwerk op security, compliance en integraties`,
}

// ── Tool executor ─────────────────────────────────────────────────────────────

async function executeTool(
  name: string,
  input: Record<string, string>,
  requestUrl: string,
): Promise<string> {
  switch (name) {
    case 'lookup_case':
      return CASE_DATA[input.domain] ?? CASE_DATA.algemeen

    case 'get_pricing_advice':
      return PRICING_DATA[input.company_size] ?? PRICING_DATA.middel

    case 'capture_lead': {
      const baseUrl = new URL(requestUrl).origin
      // Fire-and-forget — failure is non-fatal
      fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          source: 'chat-widget',
          message: `Lead via BEP chat`,
        }),
      }).catch(() => {})
      return `Lead opgeslagen voor ${input.name} (${input.email}).`
    }

    case 'check_fit':
      return `Sector: ${input.sector} | Uitdaging: ${input.challenge}

BEP past goed als er sprake is van:
- Kennisintensief werk (documenten, dossiers, procedures)
- Repetitieve taken die nu handmatig gebeuren
- Meerdere systemen die niet met elkaar praten
- Waardevolle kennis die in hoofden van medewerkers zit

Op basis van "${input.challenge}" in de ${input.sector}-sector: dit klinkt als een goed startpunt. Wil je weten welk domein het meest geschikt is als eerste stap?`

    default:
      return 'Tool niet beschikbaar.'
  }
}

// ── System prompt ─────────────────────────────────────────────────────────────

function buildSystemPrompt(lang: string, page: string): string {
  const pageCtx = page
    ? `\n\nDe bezoeker bevindt zich op: ${page}`
    : ''
  const langInstruction = lang === 'en'
    ? '\n\nRespond in English.'
    : '\n\nReageer in het Nederlands.'

  return `Je bent BEP — de slimme bedrijfsexpert van bep.expert. Je helpt bezoekers begrijpen wat BEP voor hun organisatie kan betekenen.

Over BEP:
BEP is een AI-platform dat alle bedrijfsdata verbindt, doorzoekbaar maakt en autonoom taken uitvoert. BEP draait 100% in de eigen cloud van de klant. GDPR-compliant, EU AI Act-ready, open-source modellen. Live in 2-4 weken.

Gedragsregels:
- Gebruik ALTIJD de juiste tool bij relevante vragen:
  - Vraag over cases of voorbeelden → gebruik lookup_case
  - Vraag over prijs of plannen → gebruik get_pricing_advice (vraag eerst naar teamgrootte als onduidelijk)
  - Vraag of BEP geschikt is → gebruik check_fit
  - Iemand zegt "demo", "interesse", "afspraak", "meer weten", "contact" → vraag naam + e-mail → gebruik capture_lead
- Stel slimme vervolgvragen: "Welke systemen gebruik je nu?", "Hoe groot is je team?", "Wat kost jullie de meeste tijd?"
- Wees concreet en direct — geen lange inleidingen, geen blabla
- Houd antwoorden beknopt (max 150 woorden tenzij gevraagd om meer)
- Je bent enthousiast maar niet opdringerig
- Als je iets niet weet: verwijs naar info@bep.expert${pageCtx}${langInstruction}`
}

// ── Request handler ───────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const { messages, lang, page } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 })
    }
    if (messages.length > 20) {
      return new Response(JSON.stringify({ error: 'Too many messages' }), { status: 400 })
    }
    for (const m of messages) {
      if (!m || typeof m !== 'object') {
        return new Response(JSON.stringify({ error: 'Invalid message format' }), { status: 400 })
      }
      if (m.role !== 'user' && m.role !== 'assistant') {
        return new Response(JSON.stringify({ error: 'Invalid message role' }), { status: 400 })
      }
      if (typeof m.content !== 'string' || m.content.length > 4000) {
        return new Response(JSON.stringify({ error: 'Invalid message content' }), { status: 400 })
      }
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 })
    }

    const systemPrompt = buildSystemPrompt(lang ?? 'nl', page ?? '')
    const encoder = new TextEncoder()
    const requestUrl = request.url

    const readable = new ReadableStream({
      async start(controller) {
        try {
          let currentMessages: Anthropic.MessageParam[] = messages.map(
            (m: { role: string; content: string }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })
          )

          for (let i = 0; i < 5; i++) {
            const response = await client.messages.create({
              model: 'claude-sonnet-4-6',
              max_tokens: 1024,
              system: systemPrompt,
              tools: TOOLS,
              messages: currentMessages,
            })

            if (response.stop_reason === 'tool_use') {
              const toolResults: Anthropic.ToolResultBlockParam[] = []

              for (const block of response.content) {
                if (block.type === 'tool_use') {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: 'tool_call', tool: block.name })}\n\n`
                    )
                  )
                  const result = await executeTool(
                    block.name,
                    block.input as Record<string, string>,
                    requestUrl,
                  )
                  toolResults.push({
                    type: 'tool_result',
                    tool_use_id: block.id,
                    content: result,
                  })
                }
              }

              currentMessages = [
                ...currentMessages,
                { role: 'assistant', content: response.content },
                { role: 'user', content: toolResults },
              ]
            } else {
              // end_turn — send final text
              for (const block of response.content) {
                if (block.type === 'text' && block.text) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: 'text', text: block.text })}\n\n`
                    )
                  )
                }
              }
              break
            }
          }
        } catch (err) {
          console.error('Agent loop error:', err)
        } finally {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(JSON.stringify({ error: 'Chat failed' }), { status: 500 })
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors in `src/app/api/chat/route.ts`. Build may have unrelated warnings — that's fine.

- [ ] **Step 3: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/app/api/chat/route.ts && git commit -m "feat: agentic chat API — tool use agent loop with Sonnet"
```

---

### Task 2: ChatWidget — SSE parsing, tool indicator, markdown, page context

**Files:**
- Modify: `src/components/ChatWidget.tsx` (full replacement)

The widget needs four changes from the current version:
1. `usePathname()` for page context — sent in the request body
2. New SSE event parsing — `{ type: 'tool_call' | 'text' | 'done' }` instead of `{ text }` + `[DONE]`
3. `toolCalling` state — shows "BEP zoekt op..." spinner when a tool is called
4. `renderMarkdown` helper — handles `**bold**`, `- lists`, `\n\n` paragraph breaks

The API expects messages to always start with a `user` role. The proactive assistant message (added in Task 3) would break this. Guard: when sending to the API, start from the first user message.

- [ ] **Step 1: Replace `ChatWidget.tsx` with the complete new implementation**

```typescript
// src/components/ChatWidget.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/language'
import { MessageCircle, X, Send, Loader } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = {
  nl: ['Wat kost BEP?', 'Hoe werkt het?', 'Kan ik een demo plannen?'],
  en: ['What does BEP cost?', 'How does it work?', 'Can I schedule a demo?'],
}

// ── Minimal markdown renderer ─────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </>
  )
}

function renderMarkdown(text: string): React.ReactNode {
  const paragraphs = text.split(/\n\n+/)
  return (
    <>
      {paragraphs.map((para, pi) => {
        const lines = para.split('\n').filter(Boolean)
        const isList = lines.length > 0 && lines.every(l => /^[-✓•]\s/.test(l.trim()))
        if (isList) {
          return (
            <ul key={pi} style={{ margin: pi === 0 ? '0' : '8px 0 0', paddingLeft: '16px' }}>
              {lines.map((item, ii) => (
                <li key={ii} style={{ marginBottom: '2px' }}>
                  {renderInline(item.replace(/^[-✓•]\s*/, ''))}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={pi} style={{ margin: pi === 0 ? '0' : '8px 0 0' }}>
            {renderInline(para.replace(/\n/g, ' '))}
          </p>
        )
      })}
    </>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ChatWidget() {
  const { t, lang } = useLang()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [toolCalling, setToolCalling] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const currentLang = lang === 'en' ? 'en' : 'nl'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, toolCalling])

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    return () => { abortRef.current?.abort() }
  }, [])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const userMessage: Message = { id: Date.now(), role: 'user', content: text.trim() }

    // The API requires messages to start with a user role.
    // If the first message is an assistant (proactive), skip it for the API call.
    const firstUserIdx = messages.findIndex(m => m.role === 'user')
    const apiBase = firstUserIdx >= 0 ? messages.slice(firstUserIdx) : []
    const apiMessages = [...apiBase, userMessage].map(m => ({ role: m.role, content: m.content }))

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setToolCalling(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, lang: currentLang, page: pathname }),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error('Chat request failed')
      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      const assistantId = Date.now() + 1
      let assistantAdded = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        let finished = false
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          try {
            const parsed = JSON.parse(data)
            if (parsed.type === 'tool_call') {
              setToolCalling(parsed.tool)
            } else if (parsed.type === 'text') {
              setToolCalling(null)
              if (!assistantAdded) {
                assistantAdded = true
                setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: parsed.text }])
              } else {
                setMessages(prev => [
                  ...prev.slice(0, -1),
                  { id: assistantId, role: 'assistant', content: prev[prev.length - 1].content + parsed.text },
                ])
              }
            } else if (parsed.type === 'done') {
              finished = true
              break
            }
          } catch {
            // skip malformed chunk
          }
        }
        if (finished) break
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages(prev => {
        const filtered =
          prev[prev.length - 1]?.content === '' && prev[prev.length - 1]?.role === 'assistant'
            ? prev.slice(0, -1)
            : prev
        return [
          ...filtered,
          {
            id: Date.now(),
            role: 'assistant',
            content: t(
              'Er ging iets mis. Stuur een e-mail naar info@bep.expert.',
              'Something went wrong. Send an email to info@bep.expert.'
            ),
          },
        ]
      })
    } finally {
      setLoading(false)
      setToolCalling(null)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Floating knop */}
      <button
        className={`chat-bubble ${open ? 'chat-bubble-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={t('Open BEP chat', 'Open BEP chat')}
      >
        <MessageCircle size={24} />
        <span className="chat-bubble-pulse" />
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">

          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <Image
                src="/images/bep-icon.png"
                alt="BEP"
                width={32}
                height={32}
                className="chat-header-avatar"
                style={{ objectFit: 'contain', background: 'transparent', borderRadius: 0 }}
              />
              <div>
                <div className="chat-header-name">BEP</div>
                <div className="chat-header-status">
                  <span className="chat-online-dot" />
                  {t('Je bedrijfsexpert', 'Your business expert')}
                </div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Berichtenlijst */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-msg">
                  <p>
                    {t(
                      'Hoi! Ik ben BEP. Stel me alles wat je wil weten over wat ik voor jouw organisatie kan betekenen.',
                      "Hi! I'm BEP. Ask me anything about what I can do for your organization."
                    )}
                  </p>
                </div>
                <div className="chat-quick-questions">
                  <p className="chat-quick-label">{t('Snelle vragen:', 'Quick questions:')}</p>
                  {quickQuestions[currentLang].map((q, i) => (
                    <button key={i} className="chat-quick-btn" onClick={() => sendMessage(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.role}`}>
                <div className="chat-msg-bubble">
                  {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {loading && !toolCalling && (
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            )}

            {toolCalling && (
              <div className="chat-tool-calling">
                <Loader size={12} className="chat-tool-loader" />
                {t('BEP zoekt op\u2026', 'BEP is looking up\u2026')}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('Stel een vraag...', 'Ask a question...')}
              disabled={loading}
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label={t('Verstuur', 'Send')}
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Add CSS for tool-call indicator to `globals.css`**

Find the existing `.chat-typing` rule in `src/styles/globals.css` and add after it:

```css
.chat-tool-calling {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  padding: 6px 12px;
}
.chat-tool-loader {
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors in `ChatWidget.tsx`. If you see `Module '"next/navigation"' has no exported member 'usePathname'` — that means the Next.js types need a rebuild: run `rm -rf .next && npm run build`.

- [ ] **Step 4: Manual smoke test**

Start the dev server if not running:
```bash
cd /Users/joost/Downloads/bep-website && npm run dev -- --port 3002
```

Open http://localhost:3002/nl and open the chat. Type "Vertel me over de Tender Strateeg case". Expected:
- Typing dots appear briefly
- "BEP zoekt op..." spinner appears
- Response appears with formatted text (bold, list items)

Type "Ik wil graag een demo plannen". Expected: BEP asks for name and email.

- [ ] **Step 5: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/components/ChatWidget.tsx src/styles/globals.css && git commit -m "feat: agentic chat widget — tool indicator, markdown, page context"
```

---

### Task 3: ChatWidget — proactive opening

**Files:**
- Modify: `src/components/ChatWidget.tsx`

Add a `useEffect` that fires after 45 seconds. It checks `sessionStorage` so it only fires once per session. It opens the chat and injects an assistant message directly into `messages` state — no API call needed.

- [ ] **Step 1: Add the proactive opening messages and `useEffect` to `ChatWidget.tsx`**

Add the `PROACTIVE_MESSAGES` constant and `useEffect` inside `ChatWidget`, right after the existing `useEffect(() => { return () => { abortRef.current?.abort() } }, [])` block:

```typescript
// Add this constant above the ChatWidget function (after quickQuestions):
const PROACTIVE_MESSAGES = {
  nl: {
    '/': 'Hoi! Ik zie je de site verkent — kan ik je uitleggen wat BEP concreet voor jouw organisatie kan doen?',
    '/cases': 'Benieuwd hoe deze cases in de praktijk werken? Stel me gerust een vraag.',
    '/pricing': 'Twijfel je welk plan past? Ik help je graag de juiste keuze maken.',
    '/toepassingen': 'Zie je al een toepassing die bij jou past? Ik kan je meer vertellen.',
    default: 'Hoi! Heb je vragen over BEP? Ik ben hier om te helpen.',
  },
  en: {
    '/': "Hi! I see you're exploring the site — can I explain what BEP can concretely do for your organisation?",
    '/cases': 'Curious how these cases work in practice? Feel free to ask.',
    '/pricing': "Not sure which plan fits? I'm happy to help you choose.",
    '/toepassingen': 'See an application that fits? I can tell you more.',
    default: 'Hi! Any questions about BEP? I\'m here to help.',
  },
}
```

Add this `useEffect` inside the `ChatWidget` function, after the abort cleanup `useEffect`:

```typescript
// Proactive opening: fires once per session after 45s
useEffect(() => {
  if (sessionStorage.getItem('bep-chat-proactive')) return
  const timer = setTimeout(() => {
    if (open) return
    const lang = currentLang as 'nl' | 'en'
    const pageMessages = PROACTIVE_MESSAGES[lang]
    // Find matching page or use default
    const page = Object.keys(pageMessages).find(
      key => key !== 'default' && pathname?.startsWith(key)
    ) as keyof typeof pageMessages | undefined
    const text = pageMessages[page ?? 'default']
    sessionStorage.setItem('bep-chat-proactive', '1')
    setOpen(true)
    setMessages([{ id: Date.now(), role: 'assistant', content: text }])
  }, 45000)
  return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
```

Note: The dependency array is intentionally empty — this effect should only run once on mount. The `open` check inside prevents double-open if the user already opened the chat manually.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: clean build, no errors.

- [ ] **Step 3: Manual smoke test**

In the browser, open DevTools → Application → Session Storage. Delete the `bep-chat-proactive` key if present. Change the timer temporarily to 3000ms (3s) for testing:

```typescript
// Temporarily change for testing:
}, 3000)  // was 45000
```

Open http://localhost:3002/nl, wait 3 seconds. Expected: chat opens automatically with "Hoi! Ik zie je de site verkent..." — no typing indicator, just the message appears. Close and reopen the page — chat should NOT re-open (sessionStorage key is set).

Restore to 45000ms after testing.

- [ ] **Step 4: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/components/ChatWidget.tsx && git commit -m "feat: proactive chat opening after 45s with page-aware message"
```
