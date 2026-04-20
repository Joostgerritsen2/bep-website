# BEP Site Refresh — Design Spec
_2026-04-16_

## Scope

Drie samenhangende deliverables in één implementatieronde:

1. **Pricing pagina** — volledige herschrijving met nieuwe copy en nieuw visueel design
2. **Site-wide lively-up** — 6 visuele upgrades die door de hele site gelden
3. **AI Chat Widget** — echte Claude-powered chatbot vervangt de huidige WhatsApp-doorverwijzing

---

## 1. Pricing Pagina

### Visuele richting
Donkere hero (dark hero + licht body) — richting B zoals besproken. Bestaande BEP-kleuren: `#0f1d2f` / `#1F334B` donkerblauw, `#F5861D` oranje accent.

### Secties (van boven naar beneden)

#### Hero
- Achtergrond: `#0f1d2f` met oranje radiale glow rechtsbovenin
- Kicker: "Pricing" met decoratieve lijntjes links en rechts
- H1: "Start klein met BEP. Breid uit _zodra het werkt_" — cursieve woorden krijgen typend cursor-effect (`::after` met `blink` animatie)
- Subtekst: "BEP brengt betrouwbare AI naar je eigen bedrijfscontext. Op je eigen data, in je eigen omgeving, met een lage drempel om te beginnen."
- 3 checkmarks: "Live in 2 tot 4 weken", "Maandelijks uitbreidbaar", "Eigen cloud of on-prem mogelijk"
- Onderkant: subtiele oranje lijn als gradient-divider

#### Introblok
- Achtergrond: `#fafafa`
- Vette openingszin: "Geen generieke chatbot. Geen groot implementatietraject vooraf."
- Gevolgd door: "Met BEP start je op één afgebakend domein, met echte bedrijfsdata en een eerste koppeling. Zodra het werkt, breid je eenvoudig uit met extra agents, koppelingen en teams."

#### Pricing Cards (4 stuks)
Grid van 4 kolommen, witte achtergrond, gescheiden door `#e5e7eb` borders.

| Plan | Maandelijks | Eenmalig | Highlight |
|------|------------|----------|-----------|
| Start | €595 | €1.250 setup | — |
| Team | €1.250 | €1.500 uitbreiding | **Featured** — oranje top-border, badge "Meest gekozen" |
| Growth | €2.500 | €2.500 uitbreiding | — |
| Platform | v.a. €4.500 | v.a. €3.500 | — |

Elke card heeft:
- Naam + prijs + setupkosten
- Beschrijving (1 zin)
- "Inclusief" lijst met ✓-iconen (groen)
- "Ideaal voor" lijst met →-iconen (oranje)
- CTA-knop: outline oranje → fill bij hover; featured card: altijd filled
- Hover-state: lichte oranje achtergrond (`#fffbf7`) + oranje top-border animeert in

Volledige copy per card zoals aangeleverd in brief.

#### Add-ons Sectie
- Achtergrond: `#f9fafb`
- Titel: "Breid uit wanneer het past"
- Subtitel: "Je start klein en breidt uit zodra BEP waarde levert."
- 4 add-on blokken (hover: oranje top-border):
  - Extra koppeling — €199/maand
  - Extra agent — €149/maand
  - Eigen cloud / on-prem / sovereign — v.a. €750/maand
  - Enterprise en SLA — op aanvraag

#### Differentiatiblok
- Achtergrond: `#0f1d2f` met oranje radiale glow rechtsbovenin + blauwe tegenglow linksonderin
- 2-koloms grid: links kicker + H2, rechts 6 bullet-punten met oranje dots
- Bullets: gekoppeld op eigen bedrijfsdata / betrouwbare antwoorden / soeverein cloud of on-prem / open en uitbreidbaar / niet beperkt tot één ecosysteem / maandelijkse groei zonder nieuw offertetraject

#### Vergelijkingsblok
- Achtergrond: wit
- Kicker: "Vergelijking"
- H2: "Geen generieke copiloot, maar een bedrijfsplatform"
- Intro tekst
- 2-koloms grid (gescheiden door 2px border): Generieke copiloot vs BEP

#### CTA
- Achtergrond: `#0f1d2f` met oranje glow van onderuit
- H2: "Klein beginnen?"
- Subtekst: "We laten je in 2 tot 4 weken live gaan op één domein, met echte data en een eerste koppeling."
- 2 knoppen: primair "Plan een demo →", secundair "Bespreek jouw eerste domein"

---

## 2. Site-wide Lively-up

Alle aanpassingen zijn additief — bestaande functionaliteit blijft intact.

### ① Hero stats row (homepage)
Onder de bestaande hero-buttons, boven de team-faces. Een rij van 4 metrics gescheiden door een subtiele border-top:
- `2–4` weken live (oranje)
- `4` live cases
- `100%` eigen cloud (oranje)
- `0` data buiten je omgeving

### ② Marquee logo strip (homepage)
Vervangt de huidige statische `client-logos-grid`. Oneindige horizontale scroll-animatie (`marquee` keyframe, 22s). Logo's worden 2× herhaald voor naadloze loop. Fade-maskers links en rechts. Label "Vertrouwd door" links gefixeerd. Hover pauzeert de animatie. Logo's: grayscale 50% opacity → kleur bij hover.

### ③ Card hover — oranje top-lijn (sitebreed)
Toegevoegd aan alle card-klassen in `globals.css`:
`.capability-card`, `.trust-card`, `.step-card`, `.blog-card`, `.home-case-card`, `.pricing-card`

Pattern:
```css
.card-class { position: relative; overflow: hidden; transition: background 0.2s; }
.card-class::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--orange); transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease; }
.card-class:hover::before { transform: scaleX(1); }
```

### ④ Donkere secties met oranje glow
Toegevoegd aan `.section-dark`, `.cta-section`, hero-secties:
- Rechtsbovenin: `radial-gradient` oranje glow (~15% opacity)
- Linksonderin (optioneel): `radial-gradient` blauw tegenlicht (~12% opacity)
- Geïmplementeerd via `::before`/`::after` pseudo-elementen

### ⑤ Typing cursor-effect
Klasse `.typed-cursor` — de laatste woorden van de hero H1 krijgen een knipperende cursor:
```css
.typed-cursor::after { content: '|'; animation: blink 1s step-end infinite; color: var(--orange); }
```
Toegepast op homepage hero H1 en pricing hero H1.

### ⑥ HeroAgent visualisatie (homepage, vervangt HeroMockup)
Nieuwe component `HeroAgent.tsx` — geanimeerde SVG/CSS visualisatie:
- Links: systeem-icoontjes (CRM, ERP, e-mail, docs, agenda) als kleine tiles
- Midden: BEP hub — cirkel met icoon en naam
- Rechts: actiekaartjes die om de beurt verschijnen (CSS `animation-delay`):
  - "Factuur #1234 → 30 dagen over tijd → actie voorgesteld"
  - "Klant X → 3 weken stil → follow-up aangemaakt"
  - "Tender deadline → vrijdag → voorstel bijna klaar"
- Geanimeerde dots langs verbindingslijnen (links → midden → rechts)
- Volledig in CSS — geen video-afhankelijkheid, werkt op alle schermen

**Video slot:** Als `/public/videos/hero.mp4` bestaat, wordt die getoond als overlay-achtergrond in de hero met donkere overlay. Component controleert op file existence via een `videoSrc` prop — als leeg, toont HeroAgent.

---

## 3. AI Chat Widget

### Wat verandert
De huidige `ChatWidget.tsx` (WhatsApp/email doorverwijzing) wordt volledig vervangen door een echte streaming AI-chatbot.

### API Route: `/api/chat`
Nieuwe route naast de bestaande `/api/analyze`. Accepteert `{ messages, lang }`. Streamt SSE terug.

**Systeem-prompt:** BEP-expert die alles weet over:
- Pricing (Start/Team/Growth/Platform + add-ons)
- Cases (Tender Strateeg, Groningen Seaports, SJB Advies, BPZ)
- Hoe BEP werkt (domeinen, koppelingen, agents, onboarding)
- Technologie (eigen cloud, GDPR, EU AI Act, open-source)
- Filosofie en differentiatie
- Leidt warm door naar demo als iemand interesse toont

Model: `claude-haiku-4-5-20251001` (snel, goedkoop voor chat)

### ChatWidget UI
- **Floating knop** rechtsonder: oranje cirkel met chat-icoon, subtiele pulse-ring
- **Panel** (360×520px): donkere header (`#0f1d2f`) met BEP-logo + naam + "online" indicator
- **Berichtenlijst**: user-berichten rechts (oranje bubble), BEP-berichten links (donker)
- **Streaming**: BEP typt zichtbaar mee — karakter voor karakter
- **Snelle vragen** (alleen bij leeg gesprek): "Wat kost BEP?", "Hoe werkt het?", "Plan een demo"
- **Input**: tekstinvoer onderaan + verzendknop
- **Taaldetectie**: volgt de `useLang()` hook van de site

### Geen WhatsApp meer
De WhatsApp-integratie verdwijnt uit de widget. E-maillink kan optioneel blijven als fallback onderaan het panel.

---

## Technische constraints

- Next.js 14 App Router, TypeScript, geen nieuwe npm-packages tenzij noodzakelijk
- Alle animaties in CSS (geen Framer Motion, geen GSAP)
- `ANTHROPIC_API_KEY` environment variable — staat al in `.env.local`
- Tweetalig (NL/EN) via bestaande `useLang()` hook
- Bestaande `FadeUp` animaties blijven intact
- Geen breaking changes aan bestaande pagina's buiten de genoemde aanpassingen
