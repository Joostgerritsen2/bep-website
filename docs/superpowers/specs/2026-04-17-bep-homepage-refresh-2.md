# BEP Homepage Refresh — Phase 2 Design Spec

## Goal

Add credibility and expert identity to the BEP homepage by surfacing case metrics, domain expertise, client quotes, and Unum-inspired sovereignty/governance language. Also expose key nav links inline so Cases and Pricing are not buried in the hamburger menu.

## Background

The current homepage feels generic and AI-generated. Key problems identified:
1. Pricing is invisible — not in nav, not on homepage
2. Cases exist but are buried as image cards below the fold
3. No quantified proof of results on the homepage
4. No domain expertise signal (which sectors, which use cases)
5. Language sounds like any AI startup — no "lerende organisatie" framing, no governance story

Reference design approved: `/tmp/bep-refresh2/homepage-design.html`

---

## Architecture

### Files Modified

- `src/components/Navigation.tsx` — add 3 inline nav links (Cases, Toepassingen, Pricing)
- `src/app/[lang]/HomeContent.tsx` — hero copy update + 5 new sections added
- `src/styles/globals.css` — CSS for all new sections

### Files NOT Modified

- `src/app/[lang]/cases/caseData.ts` — source of truth, read-only; case metrics and quotes pulled from here
- All other pages and components unchanged

---

## Section 1: Navigation

**File:** `src/components/Navigation.tsx`

**Change:** Add a `nav-links` group between the logo and the existing `header-right` div. Three links displayed inline at ≥768px:

| Link text (NL) | Link text (EN) | href |
|---|---|---|
| Cases | Cases | `/cases` |
| Toepassingen | Applications | `/toepassingen` |
| Pricing | Pricing | `/pricing` |

- Pricing link gets an additional `nav-link--pricing` class (orange color, heavier weight — see CSS section)
- All three links are hidden on mobile (< 768px) via CSS
- Hamburger menu: add a `/pricing` link alongside the existing links. Currently the hamburger has: Home, Waarom BEP, Cases, Blog, Team, Contact. Add `<Link href="/pricing" onClick={close}>{t('Pricing', 'Pricing')}</Link>` after Team.

**CSS class:** `.nav-links` — `display: flex; gap: 4px; align-items: center;` hidden at mobile via `@media (max-width: 767px) { display: none }`

---

## Section 2: Hero Copy

**File:** `src/app/[lang]/HomeContent.tsx`

**Change:** Replace h1 and subtitle only. Stats row, buttons, team photos, and badges are unchanged.

Current h1:
```
BEP <gradient>je nieuwe <typed>bedrijfsexpert</typed></gradient>
```

New h1 (NL/EN):
```
NL: Maak van jouw bedrijf een <em>lerende organisatie.</em>
EN: Turn your company into a <em>learning organization.</em>
```

New subtitle (NL/EN):
```
NL: BEP verbindt jouw systemen, leert van jouw data en handelt autonoom — domein voor domein. 100% in jouw eigen cloud.
EN: BEP connects your systems, learns from your data and acts autonomously — domain by domain. 100% in your own cloud.
```

Implementation note: remove the `gradient-text` and `typed-cursor` span wrappers from the h1. Use `<em className="highlight-text">` for the italic orange portion. The existing `.highlight-text` (or equivalent orange italic style) can reuse `.gradient-text em` pattern from globals.css — if it doesn't exist, add `.highlight-text { color: var(--orange); font-style: normal; }`.

---

## Section 3: Anti-Slop Banner

**File:** `src/app/[lang]/HomeContent.tsx`
**Position:** Immediately after the `<section className="hero hero-new">` block, before `<MarqueeLogos />`

```tsx
<section className="anti-slop-bar">
  <div className="container">
    <div className="anti-slop-items">
      <div className="anti-slop-item">
        <span className="anti-slop-check">✓</span>
        {t('Antwoorden op jouw data — niet op internet', 'Answers from your data — not the internet')}
      </div>
      <div className="anti-slop-divider" />
      <div className="anti-slop-item">
        <span className="anti-slop-check">✓</span>
        {t('Bronvermelding bij elk antwoord', 'Source citation with every answer')}
      </div>
      <div className="anti-slop-divider" />
      <div className="anti-slop-item">
        <span className="anti-slop-check">✓</span>
        {t('Geen AI slop — governed & accountable', 'No AI slop — governed & accountable')}
      </div>
      <div className="anti-slop-divider" />
      <div className="anti-slop-item">
        <span className="anti-slop-check">✓</span>
        {t('Nooit jouw data buiten jouw omgeving', 'Your data never leaves your environment')}
      </div>
    </div>
  </div>
</section>
```

**CSS:** Dark background (`var(--blue-darker)`), horizontal flex row, items separated by thin dividers. On mobile: wraps to 2×2 grid.

---

## Section 4: Case Metrics

**File:** `src/app/[lang]/HomeContent.tsx`
**Position:** After `<MarqueeLogos />`, before the existing "4 Layers" capabilities section

Data sourced directly from `caseData.ts` — import the `cases` array (already imported at line 6). The 4 metric cards use hardcoded metric values (not in caseData) with client names resolved from the `cases` array.

```tsx
<section className="case-metrics-section">
  <div className="container">
    <FadeUp>
      <span className="section-label">{t('Bewezen resultaten', 'Proven results')}</span>
      <h2>{t('BEP werkt. In de praktijk.', 'BEP works. In practice.')}</h2>
    </FadeUp>
    <div className="case-metrics-grid">
      {/* 4 cards hardcoded — metrics are curated, not auto-derived */}
      <FadeUp delay={0.05}>
        <Link href="/cases/tender-strateeg" className="metric-card">
          <span className="metric-sector">{t('Consultancy · Aanbestedingen', 'Consultancy · Tenders')}</span>
          <span className="metric-num">60%</span>
          <p className="metric-desc">{t('Snellere voorbereiding per tender — 500+ documenten doorzoekbaar', 'Faster preparation per tender — 500+ documents searchable')}</p>
          <span className="metric-client">Tender Strateeg</span>
        </Link>
      </FadeUp>
      <FadeUp delay={0.1}>
        <Link href="/cases/groningen-seaports" className="metric-card metric-card--alt">
          <span className="metric-sector">{t('Havenbeheer · Logistiek', 'Port management · Logistics')}</span>
          <span className="metric-num">3.5×</span>
          <p className="metric-desc">{t('ROI in jaar 1 — 24/7 operationele kennis voor 200+ gebruikers', 'ROI in year 1 — 24/7 operational knowledge for 200+ users')}</p>
          <span className="metric-client">Groningen Seaports</span>
        </Link>
      </FadeUp>
      <FadeUp delay={0.15}>
        <Link href="/cases/sjb-advies" className="metric-card">
          <span className="metric-sector">{t('Financieel Advies', 'Financial Advisory')}</span>
          <span className="metric-num">4.2×</span>
          <p className="metric-desc">{t('ROI — 10.000+ klantdossiers doorzoekbaar, dienstverlening 40% sneller', 'ROI — 10,000+ client files searchable, service delivery 40% faster')}</p>
          <span className="metric-client">SJB Advies</span>
        </Link>
      </FadeUp>
      <FadeUp delay={0.2}>
        <Link href="/cases/bpz" className="metric-card metric-card--alt">
          <span className="metric-sector">{t('Productie · Manufacturing', 'Production · Manufacturing')}</span>
          <span className="metric-num">0</span>
          <p className="metric-desc">{t('Kennisincidenten — 80 jaar expertise geborgd in 2 weken', 'Knowledge incidents — 80 years of expertise secured in 2 weeks')}</p>
          <span className="metric-client">BPZ</span>
        </Link>
      </FadeUp>
    </div>
    <FadeUp delay={0.25}>
      <div className="case-metrics-footer">
        <Link href="/cases" className="btn btn-outline btn-arrow">
          {t('Alle cases bekijken', 'View all cases')}
        </Link>
      </div>
    </FadeUp>
  </div>
</section>
```

**CSS:** 4-column grid (white bg), 1px gap with `background: var(--border)` on wrapper. Big metric number (orange, `--alt` variant in dark blue). Hover: orange top border slides in from left via `transform: scaleX`. Mobile: 2-column.

---

## Section 5: Domain Tiles

**File:** `src/app/[lang]/HomeContent.tsx`
**Position:** After the existing "Zo werkt het" (4 steps) section, before FAQ

```tsx
<section className="domain-tiles-section section section-white">
  <div className="container">
    <FadeUp>
      <span className="section-label">{t('Sectoren', 'Sectors')}</span>
      <h2>{t('BEP kent jouw domein', 'BEP knows your domain')}</h2>
    </FadeUp>
    <div className="domain-tiles-grid">
      {[
        { icon: '📋', nl: 'Aanbestedingen', en: 'Tenders', exNl: 'Tender Strateeg — 60% sneller', exEn: 'Tender Strateeg — 60% faster' },
        { icon: '⚓', nl: 'Havens & Logistiek', en: 'Ports & Logistics', exNl: 'Groningen Seaports — 24/7', exEn: 'Groningen Seaports — 24/7' },
        { icon: '📊', nl: 'Financieel Advies', en: 'Financial Advisory', exNl: 'SJB Advies — 4.2× ROI', exEn: 'SJB Advies — 4.2× ROI' },
        { icon: '🏭', nl: 'Productie', en: 'Production', exNl: 'BPZ — 0 kennisincidenten', exEn: 'BPZ — 0 knowledge incidents' },
        { icon: '🧠', nl: 'Jouw sector', en: 'Your sector', exNl: 'Overal waar kennis verspreid zit', exEn: 'Wherever knowledge is scattered' },
      ].map((tile, i) => (
        <FadeUp key={tile.nl} delay={i * 0.05}>
          <div className="domain-tile">
            <span className="domain-tile-icon">{tile.icon}</span>
            <span className="domain-tile-name">{t(tile.nl, tile.en)}</span>
            <span className="domain-tile-ex">{t(tile.exNl, tile.exEn)}</span>
          </div>
        </FadeUp>
      ))}
    </div>
  </div>
</section>
```

**CSS:** 5-column grid (2-column mobile), light gray bg tiles with orange border on hover.

---

## Section 6: Sovereignty Block

**File:** `src/app/[lang]/HomeContent.tsx`
**Position:** After domain tiles, before quotes

```tsx
<section className="sovereignty-section dark-glow">
  <div className="container">
    <div className="sovereignty-inner">
      <FadeUp>
        <div className="sovereignty-left">
          <span className="section-label">{t('Waarom BEP anders is', 'Why BEP is different')}</span>
          <h2>
            {t('Jouw organisatie leert.', 'Your organization learns.')}<br />
            <em>{t('Jouw data blijft van jou.', 'Your data stays yours.')}</em>
          </h2>
          <p>
            {t(
              'BEP is geen generieke copiloot. Het is een bedrijfsplatform dat jouw systemen verbindt, jouw context begrijpt en autonoom handelt — volledig in jouw eigen cloud.',
              'BEP is not a generic copilot. It is a business platform that connects your systems, understands your context and acts autonomously — entirely in your own cloud.'
            )}
          </p>
        </div>
      </FadeUp>
      <FadeUp delay={0.1}>
        <ul className="sovereignty-pillars">
          {[
            {
              titleNl: 'Geen AI slop',
              titleEn: 'No AI slop',
              descNl: 'Antwoorden op jouw eigen bedrijfsdata, met bronvermelding. Niet op internet, niet gegenereerd uit het niets.',
              descEn: 'Answers from your own business data, with source citations. Not from the internet, not generated from nothing.',
            },
            {
              titleNl: 'Data soevereiniteit',
              titleEn: 'Data sovereignty',
              descNl: '100% on-prem of eigen cloud. Jouw data verlaat nooit jouw omgeving — GDPR-proof, EU AI Act-ready.',
              descEn: '100% on-prem or own cloud. Your data never leaves your environment — GDPR-proof, EU AI Act-ready.',
            },
            {
              titleNl: 'Open & uitbreidbaar',
              titleEn: 'Open & expandable',
              descNl: 'Niet gebonden aan één leverancier. Open-source AI-modellen, maandelijks uitbreidbaar zonder nieuw traject.',
              descEn: 'Not bound to one vendor. Open-source AI models, monthly expansion without new quotation process.',
            },
            {
              titleNl: 'Menselijke controle',
              titleEn: 'Human control',
              descNl: 'BEP handelt autonoom maar je behoudt altijd overzicht. Governed en accountable by design.',
              descEn: 'BEP acts autonomously but you always maintain oversight. Governed and accountable by design.',
            },
          ].map((pillar, i) => (
            <li key={pillar.titleNl} className="sovereignty-pillar">
              <span className="sovereignty-dot" />
              <div>
                <span className="sovereignty-pillar-title">{t(pillar.titleNl, pillar.titleEn)}</span>
                <span className="sovereignty-pillar-desc">{t(pillar.descNl, pillar.descEn)}</span>
              </div>
            </li>
          ))}
        </ul>
      </FadeUp>
    </div>
  </div>
</section>
```

**CSS:** Dark background (`var(--blue-darker)`), 2-column grid layout. `<em>` in h2 is orange. Pillars use orange dot + white title + muted description.

---

## Section 7: Quotes

**File:** `src/app/[lang]/HomeContent.tsx`
**Position:** After sovereignty block, before the existing Blog section (or before CTA if blog is empty)

Data sourced from `caseData.ts` — use `cases[0].quote` (Tender Strateeg) and `cases[1].quote` (Groningen Seaports).

```tsx
<section className="quotes-section section section-gray">
  <div className="container">
    <FadeUp>
      <span className="section-label">{t('Klanten aan het woord', 'Clients speak')}</span>
    </FadeUp>
    <div className="quotes-grid">
      {[cases[0], cases[1]].map((c, i) => (
        c.quote && (
          <FadeUp key={c.slug} delay={i * 0.1}>
            <blockquote className="quote-card">
              <span className="quote-mark">"</span>
              <p className="quote-text">{t(c.quote.text.nl, c.quote.text.en)}</p>
              <footer className="quote-footer">
                <span className="quote-author">{c.quote.author}</span>
              </footer>
            </blockquote>
          </FadeUp>
        )
      ))}
    </div>
  </div>
</section>
```

**CSS:** 2-column grid, white cards with orange top border (hover slide-in). Large quote mark in orange.

---

## CSS Additions (globals.css)

All classes are new — no existing classes modified.

### Navigation
```css
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  padding: 6px 12px;
  transition: color 0.15s;
  text-decoration: none;
}
.nav-links a:hover { color: white; }
.nav-links a.nav-link--pricing {
  color: var(--orange);
  font-weight: 600;
}
@media (max-width: 767px) { .nav-links { display: none; } }
```

### Hero h1 highlight
```css
.highlight-text { color: var(--orange); font-style: normal; }
```

### Anti-slop bar
```css
.anti-slop-bar {
  background: var(--blue-darker);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 14px 0;
}
.anti-slop-items {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}
.anti-slop-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
}
.anti-slop-check { color: var(--orange); }
.anti-slop-divider {
  width: 1px;
  height: 16px;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
}
@media (max-width: 767px) {
  .anti-slop-items { gap: 12px; }
  .anti-slop-divider { display: none; }
}
```

### Case metrics
```css
.case-metrics-section {
  padding: 56px 0 48px;
  background: white;
}
.case-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: var(--border, #e5e7eb);
  margin-top: 28px;
}
.metric-card {
  background: white;
  padding: 24px 20px;
  display: block;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: background 0.15s;
}
.metric-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.metric-card--alt::before { background: var(--blue-dark); }
.metric-card:hover { background: #fffbf7; }
.metric-card:hover::before { transform: scaleX(1); }
.metric-sector {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #9ca3af;
  margin-bottom: 10px;
}
.metric-num {
  display: block;
  font-size: 40px;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1;
  color: var(--orange);
  margin-bottom: 8px;
}
.metric-card--alt .metric-num { color: var(--blue-dark); }
.metric-desc {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 10px;
}
.metric-client {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}
.case-metrics-footer {
  text-align: center;
  margin-top: 24px;
}
@media (max-width: 767px) {
  .case-metrics-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### Domain tiles
```css
.domain-tiles-section { padding: 56px 0; }
.domain-tiles-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 28px;
}
.domain-tile {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 18px 14px;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.domain-tile:hover {
  background: #fff8f2;
  border-color: var(--orange);
}
.domain-tile-icon { font-size: 24px; }
.domain-tile-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--blue-dark);
}
.domain-tile-ex {
  font-size: 11px;
  color: #9ca3af;
  line-height: 1.4;
}
@media (max-width: 767px) {
  .domain-tiles-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### Sovereignty block
```css
.sovereignty-section {
  background: var(--blue-darker);
  padding: 64px 0;
}
.sovereignty-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
.sovereignty-left h2 {
  font-size: 32px;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
  line-height: 1.1;
  margin: 12px 0;
}
.sovereignty-left h2 em {
  color: var(--orange);
  font-style: normal;
}
.sovereignty-left p {
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  line-height: 1.65;
  margin-top: 14px;
}
.sovereignty-pillars {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.sovereignty-pillar {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.sovereignty-dot {
  width: 6px;
  height: 6px;
  background: var(--orange);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}
.sovereignty-pillar-title {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin-bottom: 3px;
}
.sovereignty-pillar-desc {
  display: block;
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
}
@media (max-width: 767px) {
  .sovereignty-inner { grid-template-columns: 1fr; gap: 32px; }
}
```

### Quotes
```css
.quotes-section { padding: 56px 0; }
.quotes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;
}
.quote-card {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 24px;
  position: relative;
  overflow: hidden;
}
.quote-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.quote-card:hover::before { transform: scaleX(1); }
.quote-mark {
  display: block;
  font-size: 48px;
  color: var(--orange);
  font-weight: 900;
  line-height: 0.7;
  margin-bottom: 12px;
}
.quote-text {
  font-size: 14px;
  color: #374151;
  line-height: 1.65;
  font-style: italic;
  margin: 0 0 16px;
}
.quote-footer { }
.quote-author {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--blue-dark);
}
@media (max-width: 767px) {
  .quotes-grid { grid-template-columns: 1fr; }
}
```

---

## Existing Sections Unchanged

The following sections of HomeContent.tsx are NOT modified:
- "4 Layers" capabilities grid (`section-gray bep-motif dark-glow`)
- "Technologie & Veiligheid" trust cards
- Existing cases image grid (`section-gray`, `home-cases-grid`)
- Blog section (conditional)
- "Zo werkt het" 4 steps
- FAQ
- CTA section

---

## Testing Checklist

- [ ] Nav shows Cases, Toepassingen, Pricing at ≥768px; hidden on mobile
- [ ] Pricing link appears in orange in nav
- [ ] Hero h1 reads "Maak van jouw bedrijf een lerende organisatie."
- [ ] Anti-slop bar shows 4 items below hero
- [ ] Case metrics grid shows 4 cards with correct metrics and links to case pages
- [ ] Domain tiles show 5 tiles with correct icons and examples
- [ ] Sovereignty block shows correct 4 pillars in NL and EN
- [ ] Quotes section shows Tender Strateeg and Groningen Seaports quotes
- [ ] All sections render in both NL (`/nl`) and EN (`/en`) routes
- [ ] No TypeScript errors (`npm run build`)
- [ ] No layout breaks on mobile (375px viewport)
