// ── Tool definitions (OpenAI format for OpenRouter) ────────────────────────

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'lookup_case',
      description: 'Zoek gedetailleerde informatie op over een BEP live case in een specifiek domein.',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            enum: ['aanbesteding', 'haven', 'financieel', 'hr', 'algemeen'],
          },
        },
        required: ['domain'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_pricing_advice',
      description: 'Geef een passend planadvies op basis van bedrijfsomvang en use case.',
      parameters: {
        type: 'object',
        properties: {
          company_size: { type: 'string', enum: ['klein', 'middel', 'groot', 'enterprise'] },
          use_case: { type: 'string' },
        },
        required: ['company_size'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'capture_lead',
      description: 'Sla naam en e-mail op van een geïnteresseerde bezoeker. Gebruik dit zodra iemand een demo wil, een afspraak wil of expliciet interesse toont.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['name', 'email'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_fit',
      description: 'Analyseer of BEP geschikt is voor een organisatie op basis van sector en uitdaging.',
      parameters: {
        type: 'object',
        properties: {
          sector: { type: 'string' },
          challenge: { type: 'string' },
        },
        required: ['sector', 'challenge'],
      },
    },
  },
]

// ── Hardcoded tool data ────────────────────────────────────────────────────

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

// ── Tool executor ─────────────────────────────────────────────────────────

async function executeTool(
  name: string,
  input: Record<string, string>,
  requestUrl: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
): Promise<string> {
  switch (name) {
    case 'lookup_case':
      return CASE_DATA[input.domain] ?? CASE_DATA.algemeen

    case 'get_pricing_advice':
      return PRICING_DATA[input.company_size] ?? PRICING_DATA.middel

    case 'capture_lead': {
      const safeName = String(input.name ?? '').slice(0, 100)
      const rawEmail = String(input.email ?? '')
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) && rawEmail.length <= 254
      if (!emailOk) return 'Ongeldig e-mailadres ontvangen. Vraag de gebruiker om een geldig e-mailadres.'
      const baseUrl = new URL(requestUrl).origin
      // Format conversation transcript (user + assistant only, skip system/tool)
      const transcript = conversationHistory
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => `${m.role === 'user' ? '👤 Bezoeker' : '🤖 BEP'}: ${String(m.content).slice(0, 1000)}`)
        .join('\n\n')
      fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: safeName, email: rawEmail, source: 'chat-widget', message: transcript || 'Lead via BEP chat' }),
      }).catch(() => {})
      return `Lead opgeslagen voor ${safeName} (${rawEmail}).`
    }

    case 'check_fit': {
      const safeSector = String(input.sector ?? '').slice(0, 200)
      const safeChallenge = String(input.challenge ?? '').slice(0, 200)
      return `Sector: ${safeSector} | Uitdaging: ${safeChallenge}

BEP past goed als er sprake is van:
- Kennisintensief werk (documenten, dossiers, procedures)
- Repetitieve taken die nu handmatig gebeuren
- Meerdere systemen die niet met elkaar praten
- Waardevolle kennis die in hoofden van medewerkers zit

Op basis van "${safeChallenge}" in de ${safeSector}-sector: dit klinkt als een goed startpunt. Wil je weten welk domein het meest geschikt is als eerste stap?`
    }

    default:
      return 'Tool niet beschikbaar.'
  }
}

// ── System prompt ─────────────────────────────────────────────────────────

function buildSystemPrompt(lang: string, page: string): string {
  const pageCtx = page ? `\n\nDe bezoeker bevindt zich op: ${page}` : ''
  const langInstruction = lang === 'en' ? '\n\nRespond in English.' : '\n\nReageer in het Nederlands.'

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

// ── Request handler ───────────────────────────────────────────────────────

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
    if (!process.env.OPENROUTER_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 })
    }

    const systemPrompt = buildSystemPrompt(lang ?? 'nl', page ?? '')
    const encoder = new TextEncoder()
    const requestUrl = request.url

    const readable = new ReadableStream({
      async start(controller) {
        try {
          type OAIMessage =
            | { role: 'system' | 'user' | 'assistant'; content: string }
            | { role: 'tool'; tool_call_id: string; content: string }

          let currentMessages: OAIMessage[] = [
            { role: 'system', content: systemPrompt },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
          ]

          let textSent = false

          for (let i = 0; i < 5; i++) {
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://bep.expert',
                'X-Title': 'BEP',
              },
              body: JSON.stringify({
                model: 'anthropic/claude-sonnet-4-5',
                max_tokens: 1024,
                tools: TOOLS,
                messages: currentMessages,
              }),
            })

            if (!res.ok) {
              const err = await res.text()
              console.error('OpenRouter error:', err)
              throw new Error(`OpenRouter ${res.status}`)
            }

            const data = await res.json()
            const choice = data.choices?.[0]
            const msg = choice?.message
            const finishReason = choice?.finish_reason

            if (finishReason === 'tool_calls' && msg?.tool_calls?.length) {
              // Push assistant message with tool_calls
              currentMessages.push({ role: 'assistant', content: msg.content ?? '', ...{ tool_calls: msg.tool_calls } } as OAIMessage)

              for (const tc of msg.tool_calls) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ type: 'tool_call', tool: tc.function.name })}\n\n`)
                )
                const input = JSON.parse(tc.function.arguments ?? '{}') as Record<string, string>
                const result = await executeTool(tc.function.name, input, requestUrl, currentMessages)
                currentMessages.push({ role: 'tool', tool_call_id: tc.id, content: result })
              }
            } else {
              // end_turn
              const text = msg?.content
              if (text) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ type: 'text', text })}\n\n`)
                )
                textSent = true
              }
              break
            }
          }

          if (!textSent) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'text', text: 'Er is iets misgegaan. Probeer het opnieuw of stuur een e-mail naar info@bep.expert.' })}\n\n`)
            )
          }
        } catch (err) {
          console.error('Agent loop error:', err)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'Er is een interne fout opgetreden.' })}\n\n`)
          )
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
