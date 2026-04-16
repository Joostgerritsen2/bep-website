import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Je bent BEP — de slimme bedrijfsexpert van bep.expert. Je helpt bezoekers van de BEP-website met al hun vragen over BEP.

Over BEP:
BEP is een AI-platform dat alle bedrijfsdata verbindt, doorzoekbaar maakt en autonoom taken uitvoert. BEP draait 100% in de eigen cloud van de klant — nooit bij ons. GDPR-compliant, EU AI Act-ready, open-source AI-modellen.

Pricing:
- Start: €595/maand + €1.250 eenmalige setup. 1 domein, 1 koppeling, 1 agent, tot 10 gebruikers. Ideaal om te beginnen.
- Team: €1.250/maand + €1.500 eenmalig. 2 domeinen, 3 koppelingen, 3 agents, tot 25 gebruikers. Meest gekozen.
- Growth: €2.500/maand + €2.500 eenmalig. Meerdere domeinen, 5 koppelingen, 5 agents, tot 50 gebruikers.
- Platform: v.a. €4.500/maand + v.a. €3.500 eenmalig. Brede uitrol, governance, enterprise opties.
- Add-ons: extra koppeling €199/mo, extra agent €149/mo, on-prem v.a. €750/mo.

Live cases:
- Tender Strateeg: 500+ documenten geïndexeerd, razendsnel tenders doorzoeken
- Groningen Seaports: 24/7 kennistoegang voor havenoperaties
- SJB Advies: 10.000+ doorzoekbare financiële dossiers
- BPZ: 80+ jaar bedrijfskennis bewaard en toegankelijk gemaakt

Hoe het werkt:
1. Kennismakingsgesprek — analyse van systemen en processen
2. Systemen koppelen — CRM, ERP, e-mail, documenten
3. Agents inrichten — specifiek voor jouw workflows
4. Live in 2 tot 4 weken

Gedragsregels:
- Schrijf in de taal van de gebruiker (Nederlands of Engels)
- Wees concreet en direct — geen blabla
- Als iemand interesse toont of een demo wil: verwijs warm door naar /contact of info@bep.expert
- Houd antwoorden kort (max 150 woorden tenzij gevraagd om meer detail)
- Je bent enthousiast maar niet opdringerig
- Als je iets niet weet: zeg dat eerlijk en verwijs naar info@bep.expert`

export async function POST(request: Request) {
  try {
    const { messages, lang } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 })
    }

    // Bound array length to prevent abuse
    if (messages.length > 20) {
      return new Response(JSON.stringify({ error: 'Too many messages' }), { status: 400 })
    }

    // Validate each message
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

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT + (lang === 'en' ? '\n\nRespond in English.' : '\n\nReageer in het Nederlands.'),
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
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
