# BEP Agentic Chat — Design Spec

## Doel

De huidige ChatWidget is functioneel maar passief: statisch systeem prompt, geen tool use, geen lead capture, geen proactieve interactie. Dit design upgradet de chat naar een lichtgewicht agentic ervaring: BEP "denkt" zichtbaar, roept tools aan voor rijkere antwoorden, vangt leads op en opent proactief op basis van paginacontext.

De tool-implementaties zijn nu hardcoded (JSON-data in de route). De structuur is ontworpen zodat elke tool later vervangen kan worden door echte backend-calls zonder de chat-logica aan te raken.

---

## Architectuur

```
ChatWidget (client)
  → /api/chat (POST)
      → Claude Sonnet with tool_use
      → Agent loop: model → tool calls → tool results → final response
      → SSE stream terug naar client
```

De API route handelt de volledige agent loop af server-side. De client ziet alleen het eindresultaat plus tool-call statusindicatoren via SSE events.

---

## Onderdelen

### 1. Model upgrade

Van `claude-haiku-4-5-20251001` naar `claude-sonnet-4-6`.

`max_tokens` verhoogd van 512 naar 1024 (tool use + rijkere antwoorden).

---

### 2. Tools (hardcoded, vervangbaar)

**`lookup_case`**
```json
{
  "name": "lookup_case",
  "description": "Zoek gedetailleerde informatie op over een BEP live case in een specifiek domein.",
  "input_schema": {
    "type": "object",
    "properties": {
      "domain": {
        "type": "string",
        "enum": ["aanbesteding", "haven", "financieel", "hr", "algemeen"]
      }
    },
    "required": ["domain"]
  }
}
```

Hardcoded responses per domein (Tender Strateeg, Groningen Seaports, SJB Advies, BPZ).

**`get_pricing_advice`**
```json
{
  "name": "get_pricing_advice",
  "description": "Geef een passend planadvies op basis van bedrijfsomvang en use case.",
  "input_schema": {
    "type": "object",
    "properties": {
      "company_size": { "type": "string", "enum": ["klein", "middel", "groot", "enterprise"] },
      "use_case": { "type": "string" }
    },
    "required": ["company_size"]
  }
}
```

**`capture_lead`**
```json
{
  "name": "capture_lead",
  "description": "Sla naam en e-mail op van een geïnteresseerde bezoeker. Gebruik dit als iemand een demo wil of expliciete interesse toont.",
  "input_schema": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "email": { "type": "string" }
    },
    "required": ["name", "email"]
  }
}
```

Implementatie: POST naar bestaande `/api/contact` route met subject "Lead via chat".

**`check_fit`**
```json
{
  "name": "check_fit",
  "description": "Analyseer of BEP geschikt is voor een organisatie op basis van sector en uitdaging.",
  "input_schema": {
    "type": "object",
    "properties": {
      "sector": { "type": "string" },
      "challenge": { "type": "string" }
    },
    "required": ["sector", "challenge"]
  }
}
```

---

### 3. Agent loop in `/api/chat`

De route handelt multi-turn tool calling af:

```
1. Stuur messages + tools naar Claude Sonnet
2. Als response stop_reason === 'tool_use':
   a. Extraheer tool calls
   b. Voer tools uit (hardcoded data)
   c. Voeg assistant message + tool results toe aan messages
   d. Stuur SSE event: { type: 'tool_call', tool: name, status: 'done' }
   e. Herhaal (max 5 iteraties ter bescherming)
3. Als stop_reason === 'end_turn': stream tekst terug via SSE
```

SSE event types (unified format, vervangt huidig `{ text }` + `[DONE]`):
- `data: {"type":"tool_call","tool":"lookup_case"}` — UI toont indicator
- `data: {"type":"text","text":"..."}` — streaming tekst
- `data: {"type":"done"}` — afsluiten

De client parse op `event.type` in plaats van de huidige `event.text` + `[DONE]` check.

---

### 4. Rijker systeem prompt

Het huidige systeem prompt bevat basisinfo. Het nieuwe prompt:
- Instrueert BEP om tools te gebruiken bij vragen over cases, pricing, fit
- Instrueert BEP om door te vragen: "Welk systeem gebruik je nu?", "Hoe groot is je team?"
- Instrueert BEP om lead capture te triggeren als iemand zegt: "demo", "interesse", "meer weten", "contact"
- Voegt paginacontext toe: de client stuurt `page` mee in de request body
- Toon van echte expert: concreet, direct, geen blabla, maar stelt slimme vragen

---

### 5. Proactief openen

`ChatWidget` krijgt een `useEffect` die na 45 seconden:
1. De chat opent (als hij nog niet open was)
2. Direct een openingsbericht stuurt op basis van de huidige pagina

Pagina-bewuste openingsberichten (NL):
- `/` (homepage): *"Hoi! Ik zie je de site verkent. Kan ik je uitleggen wat BEP concreet voor jouw organisatie kan betekenen?"*
- `/cases`: *"Benieuwd hoe deze cases in de praktijk werken? Stel me gerust een vraag."*
- `/pricing`: *"Twijfel je welk plan past? Ik help je graag de juiste keuze maken."*
- `/toepassingen`: *"Zie je al een toepassing die bij jou past? Ik kan je meer vertellen."*
- Overige: *"Hoi! Heb je vragen over BEP? Ik ben hier om te helpen."*

De proactieve open gebeurt maximaal één keer per sessie (flag in `sessionStorage`).

---

### 6. UI: tool-call indicator

Als de API een `tool_call` SSE event stuurt, toont de chat een kleine status onder het laatste bericht:

```
⟳  BEP zoekt op...
```

Verdwijnt zodra de tool klaar is en tekst begint te stromen. Lucide `Loader` icon (spinning), dezelfde stijl als de bestaande typing indicator.

---

### 7. Markdown rendering

Huidige chat rendert platte tekst. BEP met tool use geeft gestructureerde antwoorden terug (lijsten, vetgedrukte tekst). Voeg minimale markdown rendering toe: `**bold**`, `- lijst`, `\n\n` als paragraphs. Geen externe library — kleine regex-based renderer volstaat.

---

## Dataflow per scenario

**Scenario: "Hoe werkt de Tender Strateeg case?"**
1. Bezoeker vraagt → model herkent "case" + "aanbesteding"
2. Model roept `lookup_case({ domain: "aanbesteding" })` aan
3. UI toont "BEP zoekt op..."
4. Tool retourneert rijke case data
5. Model antwoordt met concrete cijfers en details

**Scenario: "Ik wil graag een demo"**
1. Bezoeker zegt "ik wil een demo"
2. Model vraagt: "Leuk! Hoe heet je en wat is je e-mailadres?"
3. Bezoeker geeft naam + e-mail
4. Model roept `capture_lead({ name, email })` aan
5. Lead wordt opgeslagen via `/api/contact`
6. Model: "Geregeld! We nemen snel contact op."

---

## Wat dit nog NIET is

- Geen echte kennisbank / vector search (komt later)
- Geen CRM-integratie (Hubspot, Pipedrive) — lead gaat voorlopig naar e-mail
- Geen agent memory tussen sessies
- Geen tool voor agenda/demo-planning

---

## Bestanden

| Bestand | Wijziging |
|---|---|
| `src/app/api/chat/route.ts` | Agent loop, tool definities, hardcoded tool data, rijker prompt |
| `src/components/ChatWidget.tsx` | Proactief openen, tool-call indicator, markdown rendering, `page` prop |
| — | `ChatWidget` gebruikt `usePathname()` intern voor paginacontext — geen prop nodig |
