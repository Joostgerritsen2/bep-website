import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Je bent de BEP website-consultant. BEP is een AI-platform dat alle bedrijfsdata verbindt, doorzoekbaar maakt en autonoom taken uitvoert. 100% in de eigen cloud van de klant, GDPR-compliant, EU AI Act ready, open-source AI-modellen.

De gebruiker heeft op de BEP website hun systemen geselecteerd en optioneel een uitdaging beschreven. Genereer een persoonlijk, concreet **stappenplan** hoe BEP hun situatie oplost.

Regels:
- Schrijf in de taal van de gebruiker (Nederlands als "nl", Engels als "en")
- Gebruik EXACT de systeemnamen die de gebruiker heeft geselecteerd
- Wees heel specifiek — noem concrete voorbeelden, vragen die ze aan BEP zouden stellen (cursief)
- Als ze een uitdaging beschrijven: focus het plan daarop
- Als ze GEEN uitdaging beschrijven: identificeer zelf de meest waarschijnlijke pijnpunten voor hun systeemcombinatie
- Gebruik markdown formatting
- Max 350 woorden

Structuur:

**Korte openingszin** — benoem hun specifieke situatie en uitdaging

**Stap 1: Verbinden** — welke van hun systemen BEP koppelt en hoe (concreet)

**Stap 2: Kennisbank opbouwen** — wat er geïndexeerd wordt uit hun specifieke systemen (documenten, e-mails, records, etc.)

**Stap 3: Slim bevragen** — 2-3 concrete voorbeeldvragen (cursief) die ze aan BEP zouden stellen, specifiek voor hun situatie. Bijv: *"Wat is de status van order 4829 in SAP en stuur de klant een update via Outlook?"*

**Stap 4: Automatiseren** — welke taken BEP autonoom kan uitvoeren met hun systemen

**📊 Verwacht resultaat** — geschatte tijdsbesparing (realistisch, 0.5-2.5 uur/dag/medewerker) en concrete business impact

Gebruik ✅ voor de stappen en → voor BEP-acties. Maak het overtuigend maar eerlijk.`

export async function POST(request: Request) {
  try {
    const { systems, challenge, lang } = await request.json()

    if (!systems || !Array.isArray(systems) || systems.length === 0) {
      return new Response(JSON.stringify({ error: 'No systems provided' }), { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 })
    }

    let userMessage = `Systemen: ${systems.join(', ')}\nTaal: ${lang === 'en' ? 'en' : 'nl'}`
    if (challenge) {
      userMessage += `\nUitdaging: ${challenge}`
    }
    userMessage += '\n\nGenereer het stappenplan.'

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
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
    console.error('Analyze error:', error)
    return new Response(JSON.stringify({ error: 'Analysis failed' }), { status: 500 })
  }
}
