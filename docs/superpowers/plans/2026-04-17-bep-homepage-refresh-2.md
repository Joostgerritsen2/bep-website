# BEP Homepage Refresh Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface case metrics, domain expertise, sovereignty language, and client quotes on the homepage; expose key nav links inline; update hero copy.

**Architecture:** All changes are additive to existing files. Navigation.tsx gets inline links. HomeContent.tsx gets 5 new sections inserted at specific positions in the existing JSX tree. globals.css gets ~200 lines of new CSS class definitions at the end of the file. No new files created, no existing sections removed.

**Tech Stack:** Next.js 14 App Router, TypeScript, CSS custom properties (no Tailwind), `useLang()` hook for NL/EN translations via `t(nl, en)`, `FadeUp`/`FadeUpContainer` for scroll animations, `LocaleLink` for internal links.

---

## File Map

| File | Change |
|---|---|
| `src/components/Navigation.tsx` | Add `.nav-links` group with 3 inline links; add Pricing to hamburger |
| `src/app/[lang]/HomeContent.tsx` | Update hero h1+subtitle; add 5 new sections |
| `src/styles/globals.css` | Append CSS for all new elements |

---

## Task 1: Navigation — Inline Links + Pricing in Hamburger

**Spec ref:** Section 1 of design spec

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/styles/globals.css`

**Context:** The current nav has: logo | [space] | LanguageSwitcher + CTA button + hamburger. We add a `nav-links` div between the logo and `header-right`. The hamburger overlay currently lists: Home, Waarom BEP, Cases, Blog, Team, Contact (in `menu-main`). We add Pricing after Team.

- [ ] **Step 1: Add `.nav-links` group to Navigation.tsx**

In `src/components/Navigation.tsx`, add the `nav-links` div between the `<Link href="/" className="logo">` block and `<div className="header-right">`. The final `<header>` inner content should be:

```tsx
<div className="container header-inner">
  <Link href="/" className="logo">
    <Image
      src="/images/bep-icon.png"
      alt="BEP"
      width={36}
      height={36}
      className="logo-img"
    />
    <span className="logo-text">BEP</span>
  </Link>

  <nav className="nav-links">
    <Link href="/cases">{t('Cases', 'Cases')}</Link>
    <Link href="/toepassingen">{t('Toepassingen', 'Applications')}</Link>
    <Link href="/pricing" className="nav-link--pricing">{t('Pricing', 'Pricing')}</Link>
  </nav>

  <div className="header-right">
    <LanguageSwitcher />
    <Link href="/contact" className="header-cta">
      {t('Plan een demo', 'Schedule a demo')}
    </Link>
    <button className="menu-btn-round" onClick={() => setMenuOpen(true)} aria-label="Menu">
      <Menu size={20} />
    </button>
  </div>
</div>
```

- [ ] **Step 2: Add Pricing to hamburger menu**

In the `menu-main` nav block (inside `menu-overlay`), add the Pricing link after Team:

```tsx
<nav className="menu-main">
  <Link href="/" onClick={close}>Home</Link>
  <Link href="/waarom-bep" onClick={close}>{t('Waarom BEP', 'Why BEP')}</Link>
  <Link href="/cases" onClick={close}>Cases</Link>
  <Link href="/blog" onClick={close}>Blog</Link>
  <Link href="/team" onClick={close}>Team</Link>
  <Link href="/pricing" onClick={close}>{t('Pricing', 'Pricing')}</Link>
  <Link href="/contact" onClick={close}>Contact</Link>
</nav>
```

- [ ] **Step 3: Add CSS for `.nav-links` at end of globals.css**

Append to `src/styles/globals.css`:

```css
/* ===== NAV INLINE LINKS ===== */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  padding: 6px 12px;
  transition: color 0.15s;
  text-decoration: none;
}
.nav-links a:hover {
  color: white;
}
.nav-links a.nav-link--pricing {
  color: var(--orange);
  font-weight: 600;
}
@media (max-width: 767px) {
  .nav-links {
    display: none;
  }
}
```

- [ ] **Step 4: Verify build passes**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` (or similar), no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/components/Navigation.tsx src/styles/globals.css && git commit -m "feat: expose Cases, Toepassingen, Pricing inline in nav"
```

---

## Task 2: Hero Copy Update + Anti-Slop Banner

**Spec ref:** Sections 2 and 3 of design spec

**Files:**
- Modify: `src/app/[lang]/HomeContent.tsx`
- Modify: `src/styles/globals.css`

**Context:** The current h1 is `BEP <gradient-text>je nieuwe <typed-cursor>bedrijfsexpert</typed-cursor></gradient-text>`. Replace with new framing. The subtitle `<p className="subtitle">` also changes. Everything else in the hero (stats, buttons, team, badges) stays. The anti-slop bar is a new `<section>` inserted immediately after the closing `</section>` of the hero and before `<MarqueeLogos />`.

- [ ] **Step 1: Update hero h1 in HomeContent.tsx**

Find the current h1 block (lines ~31-35 in HomeContent.tsx):

```tsx
<h1>
  BEP{' '}
  <span className="gradient-text">
    {t('je nieuwe', 'your new')}{' '}
    <span className="typed-cursor">{t('bedrijfsexpert', 'business expert')}</span>
  </span>
</h1>
```

Replace with:

```tsx
<h1>
  {t('Maak van jouw bedrijf een', 'Turn your company into a')}<br />
  <em className="highlight-text">{t('lerende organisatie.', 'learning organization.')}</em>
</h1>
```

- [ ] **Step 2: Update hero subtitle in HomeContent.tsx**

Find the current subtitle (lines ~37-42):

```tsx
<p className="subtitle">
  {t(
    'BEP verbindt al je bedrijfsdata, signaleert kansen en risico\'s, en pakt taken proactief op. Volledig autonoom, volledig in je eigen cloud.',
    'BEP connects all your business data, flags opportunities and risks, and proactively handles tasks. Fully autonomous, fully in your own cloud.'
  )}
</p>
```

Replace with:

```tsx
<p className="subtitle">
  {t(
    'BEP verbindt jouw systemen, leert van jouw data en handelt autonoom — domein voor domein. 100% in jouw eigen cloud.',
    'BEP connects your systems, learns from your data and acts autonomously — domain by domain. 100% in your own cloud.'
  )}
</p>
```

- [ ] **Step 3: Add anti-slop banner section in HomeContent.tsx**

Find the line `<MarqueeLogos />` in HomeContent.tsx. Insert the anti-slop section immediately before it:

```tsx
{/* ===== ANTI-SLOP BANNER ===== */}
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

<MarqueeLogos />
```

- [ ] **Step 4: Add CSS for hero highlight + anti-slop bar**

Append to `src/styles/globals.css`:

```css
/* ===== HERO HIGHLIGHT ===== */
.highlight-text {
  color: var(--orange);
  font-style: normal;
}

/* ===== ANTI-SLOP BAR ===== */
.anti-slop-bar {
  background: var(--blue-darker);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
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
  color: rgba(255, 255, 255, 0.6);
}
.anti-slop-check {
  color: var(--orange);
}
.anti-slop-divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}
@media (max-width: 767px) {
  .anti-slop-items {
    gap: 12px;
  }
  .anti-slop-divider {
    display: none;
  }
}
```

- [ ] **Step 5: Verify build passes**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors, successful compile.

- [ ] **Step 6: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/app/\[lang\]/HomeContent.tsx src/styles/globals.css && git commit -m "feat: update hero copy to lerende organisatie + add anti-slop banner"
```

---

## Task 3: Case Metrics Section

**Spec ref:** Section 4 of design spec

**Files:**
- Modify: `src/app/[lang]/HomeContent.tsx`
- Modify: `src/styles/globals.css`

**Context:** `cases` is already imported at the top of HomeContent.tsx from `./cases/caseData`. `FadeUp` and `Link` (as `LocaleLink`) are also already imported. The new section goes after `<MarqueeLogos />` and before the existing "4 Layers" capabilities section (`<section className="section section-gray bep-motif dark-glow">`).

The metric numbers are hardcoded (they are curated proof points, not auto-derived). The `cases` import is only used for `cases[0].slug`, `cases[1].slug`, etc. to build the href — all other content is inline.

- [ ] **Step 1: Add case metrics section to HomeContent.tsx**

Find `{/* ===== 4 LAYERS — Art direction concept ===== */}` in HomeContent.tsx. Insert the following block immediately before it:

```tsx
{/* ===== CASE METRICS ===== */}
<section className="case-metrics-section">
  <div className="container">
    <FadeUp>
      <span className="section-label">{t('Bewezen resultaten', 'Proven results')}</span>
      <h2>{t('BEP werkt. In de praktijk.', 'BEP works. In practice.')}</h2>
    </FadeUp>
    <div className="case-metrics-grid">
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

- [ ] **Step 2: Add CSS for case metrics**

Append to `src/styles/globals.css`:

```css
/* ===== CASE METRICS ===== */
.case-metrics-section {
  padding: 56px 0 48px;
  background: white;
}
.case-metrics-section h2 {
  font-size: 28px;
  font-weight: 900;
  color: var(--blue-darker);
  letter-spacing: -0.8px;
  margin-top: 8px;
  margin-bottom: 0;
}
.case-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: #e5e7eb;
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
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.metric-card--alt::before {
  background: var(--blue-dark);
}
.metric-card:hover {
  background: #fffbf7;
}
.metric-card:hover::before {
  transform: scaleX(1);
}
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
.metric-card--alt .metric-num {
  color: var(--blue-dark);
}
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
  .case-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: successful compile, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/app/\[lang\]/HomeContent.tsx src/styles/globals.css && git commit -m "feat: add case metrics section to homepage"
```

---

## Task 4: Domain Tiles + Sovereignty Block

**Spec ref:** Sections 5 and 6 of design spec

**Files:**
- Modify: `src/app/[lang]/HomeContent.tsx`
- Modify: `src/styles/globals.css`

**Context:** Both sections are inserted after the existing "Zo werkt het" (4 steps) section and before the FAQ section. The "Zo werkt het" section ends with `</section>` and is followed by `{/* ===== FAQ ===== */}`. Insert domain tiles first, then sovereignty block, then FAQ continues as-is.

- [ ] **Step 1: Add domain tiles + sovereignty block to HomeContent.tsx**

Find `{/* ===== FAQ ===== */}` in HomeContent.tsx. Insert both sections immediately before it:

```tsx
{/* ===== DOMAIN TILES ===== */}
<section className="domain-tiles-section section section-white">
  <div className="container">
    <FadeUp>
      <span className="section-label">{t('Sectoren', 'Sectors')}</span>
      <h2>{t('BEP kent jouw domein', 'BEP knows your domain')}</h2>
    </FadeUp>
    <div className="domain-tiles-grid">
      {([
        { icon: '📋', nl: 'Aanbestedingen', en: 'Tenders', exNl: 'Tender Strateeg — 60% sneller', exEn: 'Tender Strateeg — 60% faster' },
        { icon: '⚓', nl: 'Havens & Logistiek', en: 'Ports & Logistics', exNl: 'Groningen Seaports — 24/7', exEn: 'Groningen Seaports — 24/7' },
        { icon: '📊', nl: 'Financieel Advies', en: 'Financial Advisory', exNl: 'SJB Advies — 4.2× ROI', exEn: 'SJB Advies — 4.2× ROI' },
        { icon: '🏭', nl: 'Productie', en: 'Production', exNl: 'BPZ — 0 kennisincidenten', exEn: 'BPZ — 0 knowledge incidents' },
        { icon: '🧠', nl: 'Jouw sector', en: 'Your sector', exNl: 'Overal waar kennis verspreid zit', exEn: 'Wherever knowledge is scattered' },
      ] as const).map((tile, i) => (
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

{/* ===== SOVEREIGNTY BLOCK ===== */}
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
          {([
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
          ] as const).map((pillar, i) => (
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

- [ ] **Step 2: Add CSS for domain tiles and sovereignty block**

Append to `src/styles/globals.css`:

```css
/* ===== DOMAIN TILES ===== */
.domain-tiles-section {
  padding: 56px 0;
}
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
  transition: background 0.15s, border-color 0.15s;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.domain-tile:hover {
  background: #fff8f2;
  border-color: var(--orange);
}
.domain-tile-icon {
  font-size: 24px;
}
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
  .domain-tiles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ===== SOVEREIGNTY BLOCK ===== */
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
.sovereignty-left .section-label {
  display: block;
  margin-bottom: 8px;
}
.sovereignty-left h2 {
  font-size: 32px;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
  line-height: 1.1;
  margin: 0 0 14px;
}
.sovereignty-left h2 em {
  color: var(--orange);
  font-style: normal;
}
.sovereignty-left p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.65;
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
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.55;
}
@media (max-width: 767px) {
  .sovereignty-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: successful compile, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/app/\[lang\]/HomeContent.tsx src/styles/globals.css && git commit -m "feat: add domain tiles and sovereignty block to homepage"
```

---

## Task 5: Quotes Section

**Spec ref:** Section 7 of design spec

**Files:**
- Modify: `src/app/[lang]/HomeContent.tsx`
- Modify: `src/styles/globals.css`

**Context:** `cases` is already imported at the top of HomeContent.tsx. `cases[0]` is Tender Strateeg (quote: "BEP heeft de manier waarop wij tenders voorbereiden fundamenteel veranderd..."), `cases[1]` is Groningen Seaports (quote: "We opereren 24/7 en nu is onze kennis dat ook..."). Both have a `quote` property shaped as `{ text: { nl: string; en: string }; author: string }`. Insert quotes section after the sovereignty block and before the existing Blog section.

The Blog section starts with `{latestPosts.length > 0 && (`. If there are no blog posts, the quotes section will appear directly before the "Zo werkt het" section wait — actually per the existing code, the order is: Cases image grid → Blog → Zo werkt het → FAQ → CTA. We added domain tiles + sovereignty BEFORE FAQ. Now quotes should go AFTER the sovereignty block (which is just before FAQ). So insert after `</section>` of the sovereignty block.

- [ ] **Step 1: Add quotes section to HomeContent.tsx**

Find `{/* ===== FAQ ===== */}` again (the domain tiles and sovereignty block now appear just before it). Insert the quotes section between the sovereignty block's closing `</section>` and the FAQ comment:

```tsx
{/* ===== QUOTES ===== */}
<section className="quotes-section section section-gray">
  <div className="container">
    <FadeUp>
      <span className="section-label">{t('Klanten aan het woord', 'Clients speak')}</span>
    </FadeUp>
    <div className="quotes-grid">
      {([cases[0], cases[1]] as const).map((c, i) => (
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

- [ ] **Step 2: Add CSS for quotes section**

Append to `src/styles/globals.css`:

```css
/* ===== QUOTES ===== */
.quotes-section {
  padding: 56px 0;
}
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
  margin: 0;
}
.quote-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.quote-card:hover::before {
  transform: scaleX(1);
}
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
.quote-footer {
  display: block;
}
.quote-author {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--blue-dark);
}
@media (max-width: 767px) {
  .quotes-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: successful compile, no TypeScript errors.

- [ ] **Step 4: Final lint check**

```bash
cd /Users/joost/Downloads/bep-website && npm run lint 2>&1 | tail -20
```

Expected: no ESLint errors (warnings about `img` vs `Image` in other files may already exist — don't fix pre-existing warnings, only fix new ones introduced by this task).

- [ ] **Step 5: Commit**

```bash
cd /Users/joost/Downloads/bep-website && git add src/app/\[lang\]/HomeContent.tsx src/styles/globals.css && git commit -m "feat: add client quotes section to homepage"
```

---

## Self-Review Checklist (completed inline)

**Spec coverage:**
- [x] Nav: Cases + Toepassingen + Pricing inline → Task 1
- [x] Pricing added to hamburger → Task 1
- [x] Hero h1 "lerende organisatie" → Task 2
- [x] Updated subtitle → Task 2
- [x] Anti-slop banner with 4 items → Task 2
- [x] Case metrics 4 cards with big numbers + links → Task 3
- [x] Domain tiles 5 sectors → Task 4
- [x] Sovereignty block with 4 pillars → Task 4
- [x] Quotes from cases[0] and cases[1] → Task 5

**Placeholder scan:** No TBD/TODO/placeholder text in plan.

**Type consistency:**
- `metric-card` and `metric-card--alt` used consistently in Task 3 CSS and JSX
- `sovereignty-pillar`, `sovereignty-pillar-title`, `sovereignty-pillar-desc` consistent throughout Task 4
- `cases[0]` / `cases[1]` access is safe — array always has 4 elements, `quote` property is typed as optional but both cases[0] and cases[1] have it (guarded by `c.quote &&` anyway)
- `as const` on inline arrays prevents TypeScript from widening the type

**No new files created.** All changes are edits to 3 existing files.
