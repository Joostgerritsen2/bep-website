# BEP Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Volledig vernieuwen van de BEP website: nieuwe pricing pagina, site-wide levendige visuele upgrades, en een echte Claude-powered AI chatbot.

**Architecture:** CSS-eerste aanpak — alle nieuwe visuele patronen komen eerst in `globals.css`, dan worden componenten bijgewerkt. Drie onafhankelijke stromen: (1) CSS + homepage, (2) pricing pagina, (3) AI chat. Elke stroom is zelfstandig testbaar in de browser op `localhost:3002`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Anthropic SDK (claude-haiku-4-5-20251001), CSS animations (geen extra npm packages), lucide-react icons.

---

## File Map

| Actie | Bestand | Verantwoordelijkheid |
|-------|---------|----------------------|
| Modify | `src/styles/globals.css` | Alle nieuwe CSS-patronen: card hover, marquee, stats, glow, typed cursor, pricing classes, chat messages |
| Create | `src/components/MarqueeLogos.tsx` | Scrollende klantlogo-strip |
| Create | `src/components/HeroAgent.tsx` | Geanimeerde agent-hub visualisatie |
| Modify | `src/app/[lang]/HomeContent.tsx` | Stats row, MarqueeLogos, HeroAgent, dark-glow classes |
| Modify | `src/app/[lang]/pricing/PricingContent.tsx` | Complete herschrijving met nieuwe copy |
| Create | `src/app/api/chat/route.ts` | Streaming Claude chat API |
| Modify | `src/components/ChatWidget.tsx` | Echte AI chatinterface (vervangt WhatsApp) |

---

## Task 1: CSS Foundation

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Voeg card hover top-lijn toe aan alle card-klassen**

Voeg onderaan de sectie van elke bestaande card-klasse toe (zoek op de klassenaam en voeg `::before` toe). Doe dit voor: `.capability-card`, `.trust-card`, `.step-card`, `.blog-card`, `.home-case-card`.

```css
/* === CARD HOVER — oranje top-lijn (sitebreed) === */
.capability-card,
.trust-card,
.step-card,
.blog-card,
.home-case-card {
  position: relative;
  overflow: hidden;
}

.capability-card::before,
.trust-card::before,
.step-card::before,
.blog-card::before,
.home-case-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
  z-index: 1;
}

.capability-card:hover::before,
.trust-card:hover::before,
.step-card:hover::before,
.blog-card:hover::before,
.home-case-card:hover::before {
  transform: scaleX(1);
}
```

- [ ] **Step 2: Voeg hero stats CSS toe**

```css
/* === HERO STATS === */
.hero-stats {
  display: flex;
  gap: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  flex-wrap: wrap;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hero-stat-num {
  font-size: 28px;
  font-weight: 900;
  color: var(--white);
  letter-spacing: -1px;
  line-height: 1;
}

.hero-stat-num.orange {
  color: var(--orange);
}

.hero-stat-label {
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

- [ ] **Step 3: Voeg marquee CSS toe**

```css
/* === MARQUEE LOGO STRIP === */
.marquee-wrap {
  overflow: hidden;
  position: relative;
  padding: 20px 0;
  border-top: 1px solid var(--color-card-border);
  border-bottom: 1px solid var(--color-card-border);
  background: rgba(255, 255, 255, 0.03);
}

.marquee-wrap::before,
.marquee-wrap::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}

.marquee-wrap::before {
  left: 0;
  background: linear-gradient(to right, var(--color-bg-primary), transparent);
}

.marquee-wrap::after {
  right: 0;
  background: linear-gradient(to left, var(--color-bg-primary), transparent);
}

.marquee-label {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--steel);
  z-index: 3;
  background: var(--color-bg-primary);
  padding-right: 16px;
}

.marquee-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: marquee 22s linear infinite;
  padding-left: 160px;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-logo-item {
  display: flex;
  align-items: center;
  padding: 0 40px;
  flex-shrink: 0;
}

.marquee-logo-item img {
  height: 32px;
  width: auto;
  object-fit: contain;
  filter: grayscale(1) brightness(2);
  opacity: 0.4;
  transition: opacity 0.2s, filter 0.2s;
}

.marquee-logo-item img:hover {
  opacity: 0.9;
  filter: grayscale(0) brightness(1);
}
```

- [ ] **Step 4: Voeg step connector line CSS toe**

```css
/* === STEP CONNECTOR LINE === */
.steps-grid {
  position: relative;
}

.steps-grid::before {
  content: '';
  position: absolute;
  top: 28px;
  left: calc(12.5% + 20px);
  right: calc(12.5% + 20px);
  height: 1px;
  background: linear-gradient(to right, var(--orange), var(--cloud), var(--cloud), var(--cloud));
  z-index: 0;
}

.step-card {
  position: relative;
  z-index: 1;
}

.step-card .step-number {
  position: relative;
  z-index: 2;
}
```

- [ ] **Step 5: Voeg typed cursor CSS toe**

```css
/* === TYPED CURSOR === */
.typed-cursor::after {
  content: '|';
  color: var(--orange);
  animation: cursor-blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

- [ ] **Step 5: Voeg dark-glow utility toe**

```css
/* === DARK SECTION GLOW === */
.dark-glow {
  position: relative;
  overflow: hidden;
}

.dark-glow::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(245, 134, 29, 0.14) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.dark-glow::after {
  content: '';
  position: absolute;
  bottom: -60px; left: -60px;
  width: 240px; height: 240px;
  background: radial-gradient(circle, rgba(47, 109, 186, 0.12) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.dark-glow > * {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 6: Voeg pricing pagina CSS toe**

```css
/* === PRICING PAGE === */

/* Hero */
.pricing-hero {
  padding: 120px 0 64px;
  background: var(--blue-darker);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.pricing-hero::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(245,134,29,0.4), transparent);
}

.pricing-hero .section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--orange);
  margin-bottom: 20px;
}

.pricing-hero .section-kicker::before,
.pricing-hero .section-kicker::after {
  content: '';
  width: 48px;
  height: 1px;
  background: rgba(245, 134, 29, 0.5);
}

.pricing-hero h1 {
  font-size: clamp(32px, 4vw, 52px);
  color: var(--white);
  margin-bottom: 16px;
}

.pricing-hero .hero-sub {
  font-size: 17px;
  color: var(--color-text-secondary);
  max-width: 540px;
  margin: 0 auto 28px;
  line-height: 1.65;
}

.pricing-checks {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
}

.pricing-check {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.pricing-check::before {
  content: '✓';
  color: var(--trust-green);
  font-weight: 700;
  font-size: 14px;
}

/* Intro block */
.pricing-intro {
  background: var(--snow);
  padding: 40px 0;
  border-bottom: 1px solid var(--cloud);
}

.pricing-intro p {
  font-size: 16px;
  color: var(--slate);
  line-height: 1.75;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.pricing-intro strong {
  color: var(--blue-dark);
}

/* Cards grid */
.pricing-cards-section {
  background: var(--white);
  padding: 64px 0;
}

.pricing-cards-label {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--steel);
  margin-bottom: 36px;
}

.new-pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--cloud);
  max-width: 1100px;
  margin: 0 auto;
}

.np-card {
  padding: 28px 24px;
  border-right: 1px solid var(--cloud);
  background: var(--white);
  position: relative;
  overflow: hidden;
  transition: background 0.2s;
}

.np-card:last-child {
  border-right: none;
}

.np-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.np-card:hover {
  background: #fffbf7;
}

.np-card:hover::before,
.np-card.featured::before {
  transform: scaleX(1);
}

.np-card.featured {
  background: #fff8f2;
}

.np-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--orange);
  background: var(--orange-light);
  padding: 2px 10px;
  margin-bottom: 12px;
}

.np-card-name {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--steel);
  margin-bottom: 8px;
}

.np-card.featured .np-card-name {
  color: var(--orange);
}

.np-price {
  font-size: 28px;
  font-weight: 900;
  color: var(--blue-dark);
  letter-spacing: -1px;
  line-height: 1;
}

.np-price span {
  font-size: 13px;
  font-weight: 500;
  color: var(--steel);
}

.np-setup {
  font-size: 11px;
  color: var(--steel);
  margin-top: 4px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--cloud);
}

.np-desc {
  font-size: 12px;
  color: var(--slate);
  line-height: 1.55;
  margin-bottom: 14px;
}

.np-section-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--steel);
  margin-bottom: 6px;
  margin-top: 14px;
}

.np-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.np-features li {
  font-size: 12px;
  color: var(--slate);
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.4;
}

.np-features.inclusief li::before {
  content: '✓';
  color: var(--trust-green);
  font-weight: 700;
  font-size: 11px;
  flex-shrink: 0;
  margin-top: 1px;
}

.np-features.ideaal li::before {
  content: '→';
  color: var(--orange);
  font-weight: 700;
  font-size: 11px;
  flex-shrink: 0;
  margin-top: 1px;
}

.np-cta {
  display: block;
  text-align: center;
  margin-top: 20px;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 700;
  color: var(--orange);
  border: 1.5px solid var(--orange);
  transition: all 0.2s;
}

.np-cta:hover {
  background: var(--orange);
  color: var(--white);
}

.np-card.featured .np-cta {
  background: var(--orange);
  color: var(--white);
}

/* Add-ons */
.addons-section {
  background: var(--snow);
  padding: 56px 0;
  border-top: 1px solid var(--cloud);
  border-bottom: 1px solid var(--cloud);
}

.addons-header {
  margin-bottom: 28px;
}

.addons-header h2 {
  font-size: clamp(22px, 2.5vw, 30px);
  color: var(--blue-dark);
  margin-bottom: 6px;
}

.addons-header p {
  font-size: 14px;
  color: var(--steel);
}

.addons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.addon-card {
  background: var(--white);
  border: 1px solid var(--cloud);
  padding: 18px 20px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.addon-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.addon-card:hover {
  border-color: var(--orange);
  box-shadow: 0 2px 16px rgba(245, 134, 29, 0.08);
}

.addon-card:hover::before {
  transform: scaleX(1);
}

.addon-price {
  font-size: 17px;
  font-weight: 800;
  color: var(--blue-dark);
  letter-spacing: -0.5px;
  margin-bottom: 3px;
}

.addon-name {
  font-size: 12px;
  color: var(--steel);
  line-height: 1.4;
}

/* Differentiatie */
.diff-section {
  background: var(--blue-darker);
  padding: 72px 0;
}

.diff-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
}

.diff-kicker {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--orange);
  margin-bottom: 14px;
}

.diff-section h2 {
  font-size: clamp(26px, 3vw, 36px);
  color: var(--white);
}

.diff-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
}

.diff-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.55;
}

.diff-list li::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--orange);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

/* Vergelijking */
.compare-section {
  background: var(--white);
  padding: 72px 0;
}

.compare-kicker {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--orange);
  margin-bottom: 12px;
}

.compare-section h2 {
  font-size: clamp(24px, 3vw, 36px);
  color: var(--blue-dark);
  margin-bottom: 14px;
  max-width: 700px;
}

.compare-section > .container > p {
  font-size: 15px;
  color: var(--slate);
  line-height: 1.7;
  max-width: 700px;
  margin-bottom: 32px;
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: var(--cloud);
  max-width: 800px;
}

.compare-col {
  background: var(--white);
  padding: 28px;
}

.compare-col.bep-col {
  background: #fff8f2;
}

.compare-col-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--steel);
  margin-bottom: 10px;
}

.compare-col.bep-col .compare-col-label {
  color: var(--orange);
}

.compare-col h4 {
  font-size: 16px;
  font-weight: 800;
  color: var(--blue-dark);
  margin-bottom: 8px;
}

.compare-col p {
  font-size: 13px;
  color: var(--slate);
  line-height: 1.65;
}

/* Pricing CTA */
.pricing-cta {
  background: var(--blue-darker);
  padding: 72px 0;
  text-align: center;
}

.pricing-cta h2 {
  color: var(--white);
  margin-bottom: 12px;
}

.pricing-cta p {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  line-height: 1.65;
}

.pricing-cta-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 900px) {
  .new-pricing-grid { grid-template-columns: repeat(2, 1fr); }
  .np-card { border-right: none; border-bottom: 1px solid var(--cloud); }
  .addons-grid { grid-template-columns: repeat(2, 1fr); }
  .diff-inner { grid-template-columns: 1fr; gap: 36px; }
  .compare-grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .new-pricing-grid { grid-template-columns: 1fr; }
  .addons-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 7: Voeg chat message CSS toe (voor de nieuwe ChatWidget)**

```css
/* === CHAT MESSAGES === */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scroll-behavior: smooth;
}

.chat-msg {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}

.chat-msg.user {
  align-self: flex-end;
  align-items: flex-end;
}

.chat-msg.assistant {
  align-self: flex-start;
  align-items: flex-start;
}

.chat-msg-bubble {
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.55;
  white-space: pre-wrap;
}

.chat-msg.user .chat-msg-bubble {
  background: var(--orange);
  color: var(--white);
}

.chat-msg.assistant .chat-msg-bubble {
  background: rgba(255, 255, 255, 0.07);
  color: var(--color-text-primary);
  border: 1px solid var(--color-card-border);
}

.chat-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--color-card-border);
  align-self: flex-start;
}

.chat-typing span {
  width: 6px;
  height: 6px;
  background: var(--steel);
  border-radius: 50%;
  animation: typing-dot 1.2s ease-in-out infinite;
}

.chat-typing span:nth-child(2) { animation-delay: 0.2s; }
.chat-typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing-dot {
  0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
  40%           { transform: scale(1.2); opacity: 1; }
}

.chat-input-row {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.chat-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-card-border);
  color: var(--white);
  font-size: 13px;
  padding: 9px 12px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: var(--orange);
}

.chat-input::placeholder {
  color: var(--color-text-muted);
}

.chat-send-btn {
  background: var(--orange);
  color: var(--white);
  border: none;
  padding: 9px 14px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-send-btn:hover {
  background: var(--orange-dark);
}

.chat-send-btn:disabled {
  background: var(--steel);
  cursor: not-allowed;
}
```

- [ ] **Step 8: Controleer in browser**

Open `http://localhost:3002` — de site laadt nog hetzelfde want er zijn nog geen componenten bijgewerkt. Geen compile errors = goed.

- [ ] **Step 9: Commit**

```bash
cd ~/Downloads/bep-website
git add src/styles/globals.css
git commit -m "feat: add CSS foundation for site refresh (card hover, marquee, stats, glow, pricing, chat)"
```

---

## Task 2: MarqueeLogos Component

**Files:**
- Create: `src/components/MarqueeLogos.tsx`

- [ ] **Step 1: Maak het component aan**

```typescript
// src/components/MarqueeLogos.tsx
'use client'
import Image from 'next/image'
import { useLang } from '@/lib/language'

const logos = [
  { src: '/images/client-tender-strateeg.png', alt: 'Tender Strateeg' },
  { src: '/images/client-groningen-seaports.png', alt: 'Groningen Seaports' },
  { src: '/images/client-sjb-advies.png', alt: 'SJB Advies' },
  { src: '/images/client-bpz.png', alt: 'BPZ' },
]

export function MarqueeLogos() {
  const { t } = useLang()

  return (
    <section className="marquee-wrap">
      <span className="marquee-label">{t('Vertrouwd door', 'Trusted by')}</span>
      <div className="marquee-track">
        {/* Twee keer voor naadloze loop */}
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="marquee-logo-item">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MarqueeLogos.tsx
git commit -m "feat: add MarqueeLogos component"
```

---

## Task 3: HeroAgent Component

**Files:**
- Create: `src/components/HeroAgent.tsx`

- [ ] **Step 1: Maak het component aan**

```typescript
// src/components/HeroAgent.tsx
'use client'
import { useEffect, useState } from 'react'
import { Database, Mail, FileText, Users, Calendar, Bot } from 'lucide-react'

const systems = [
  { icon: Database, label: 'CRM' },
  { icon: FileText, label: 'ERP' },
  { icon: Mail, label: 'E-mail' },
  { icon: FileText, label: 'Docs' },
  { icon: Calendar, label: 'Agenda' },
]

const actions = [
  { emoji: '📊', text: 'Factuur #1234 is 30 dagen over tijd', action: 'actie voorgesteld' },
  { emoji: '🎯', text: 'Klant Rijkswaterstaat heeft 3 weken niets gehoord', action: 'follow-up aangemaakt' },
  { emoji: '📋', text: 'Tender deadline aankomende vrijdag', action: 'voorstel bijna klaar' },
  { emoji: '✅', text: 'Onboarding dossier compleet', action: 'team genotificeerd' },
]

export function HeroAgent() {
  const [activeAction, setActiveAction] = useState(0)
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    const actionInterval = setInterval(() => {
      setActiveAction(prev => (prev + 1) % actions.length)
    }, 2800)
    const dotInterval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % systems.length)
    }, 600)
    return () => {
      clearInterval(actionInterval)
      clearInterval(dotInterval)
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '280px',
    }}>

      {/* Achtergrond glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(245,134,29,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Systemen links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
        {systems.map((sys, i) => {
          const Icon = sys.icon
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: activeDot === i
                ? 'rgba(245,134,29,0.12)'
                : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeDot === i ? 'rgba(245,134,29,0.3)' : 'rgba(255,255,255,0.07)'}`,
              padding: '7px 10px',
              transition: 'all 0.3s ease',
            }}>
              <Icon size={13} color={activeDot === i ? '#F5861D' : 'rgba(255,255,255,0.4)'} />
              <span style={{
                fontSize: '11px', fontWeight: 600,
                color: activeDot === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.3s',
              }}>
                {sys.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Verbindingslijn links */}
      <div style={{ flex: '0 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '24px', height: '1px',
          background: 'linear-gradient(to right, rgba(245,134,29,0.6), rgba(245,134,29,0.2))',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            width: '5px', height: '5px',
            background: '#F5861D',
            borderRadius: '50%',
            top: '-2px',
            animation: 'dot-flow-left 1.2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* BEP hub midden */}
      <div style={{
        flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <div style={{
          width: '52px', height: '52px',
          background: 'linear-gradient(135deg, #F5861D, #D97316)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(245,134,29,0.35)',
          animation: 'hub-pulse 2s ease-in-out infinite',
        }}>
          <Bot size={22} color="white" />
        </div>
        <span style={{
          fontSize: '10px', fontWeight: 800,
          color: '#F5861D', letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>
          BEP
        </span>
      </div>

      {/* Verbindingslijn rechts */}
      <div style={{ flex: '0 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '24px', height: '1px',
          background: 'linear-gradient(to right, rgba(245,134,29,0.2), rgba(245,134,29,0.6))',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            width: '5px', height: '5px',
            background: '#F5861D',
            borderRadius: '50%',
            top: '-2px',
            animation: 'dot-flow-right 1.2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Actiekaartjes rechts */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {actions.map((action, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: '3px',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${i === activeAction ? 'rgba(245,134,29,0.35)' : 'rgba(255,255,255,0.06)'}`,
            padding: '8px 10px',
            marginBottom: '6px',
            opacity: i === activeAction ? 1 : 0.3,
            transform: i === activeAction ? 'translateX(0)' : 'translateX(4px)',
            transition: 'all 0.4s ease',
          }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>{action.emoji}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {action.text}
              </span>
            </div>
            <div style={{
              fontSize: '10px', color: '#F5861D', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <span>→</span> {action.action}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes hub-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(245,134,29,0.35); }
          50%       { box-shadow: 0 0 32px rgba(245,134,29,0.55); }
        }
        @keyframes dot-flow-left {
          0%   { left: 0; opacity: 0; }
          30%  { opacity: 1; }
          100% { left: calc(100% - 5px); opacity: 0; }
        }
        @keyframes dot-flow-right {
          0%   { left: 0; opacity: 0; }
          30%  { opacity: 1; }
          100% { left: calc(100% - 5px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroAgent.tsx
git commit -m "feat: add HeroAgent animated visualization component"
```

---

## Task 4: HomeContent Updates

**Files:**
- Modify: `src/app/[lang]/HomeContent.tsx`

- [ ] **Step 1: Update imports bovenaan het bestand**

Vervang de bestaande import van `HeroMockup` door `HeroAgent`, en voeg `MarqueeLogos` toe:

```typescript
import { HeroAgent } from '@/components/HeroAgent'
import { MarqueeLogos } from '@/components/MarqueeLogos'
```

Verwijder de import van `HeroMockup`:
```typescript
// Verwijder: import { HeroMockup } from '@/components/HeroMockup'
```

- [ ] **Step 2: Voeg hero stats toe in de hero sectie**

Zoek in `HomeContent.tsx` naar de `hero-team` div. Voeg de stats er vlak bóven in (tussen de hero-buttons en de hero-team div):

```tsx
{/* Hero Stats — nieuw */}
<div className="hero-stats">
  <div className="hero-stat">
    <span className="hero-stat-num orange">2–4</span>
    <span className="hero-stat-label">{t('weken live', 'weeks to live')}</span>
  </div>
  <div className="hero-stat">
    <span className="hero-stat-num">4</span>
    <span className="hero-stat-label">{t('live cases', 'live cases')}</span>
  </div>
  <div className="hero-stat">
    <span className="hero-stat-num orange">100%</span>
    <span className="hero-stat-label">{t('eigen cloud', 'your own cloud')}</span>
  </div>
  <div className="hero-stat">
    <span className="hero-stat-num">0</span>
    <span className="hero-stat-label">{t('data buiten je omgeving', 'data outside your env')}</span>
  </div>
</div>
```

- [ ] **Step 3: Vervang HeroMockup door HeroAgent**

Zoek naar `<HeroMockup />` in de hero-split en vervang:

```tsx
// Was:
<FadeUp delay={0.2}>
  <HeroMockup />
</FadeUp>

// Wordt:
<FadeUp delay={0.2}>
  <HeroAgent />
</FadeUp>
```

- [ ] **Step 4: Vervang statische client-logos door MarqueeLogos**

Zoek de sectie `className="client-logos"` en vervang de hele sectie:

```tsx
// Was: de volledige <section className="client-logos"> ... </section>
// Wordt:
<MarqueeLogos />
```

- [ ] **Step 5: Voeg dark-glow toe aan donkere secties**

Zoek de sectie met `className="section section-gray bep-motif"` (de "Hoe BEP werkt" sectie) en voeg `dark-glow` toe:

```tsx
// Was:
<section className="section section-gray bep-motif">
// Wordt:
<section className="section section-gray bep-motif dark-glow">
```

Doe hetzelfde voor de CTA-sectie onderaan met `className="cta-section orange-glow"`:
```tsx
// Was:
<section className="cta-section orange-glow">
// Wordt:
<section className="cta-section orange-glow dark-glow">
```

- [ ] **Step 6: Voeg typed-cursor class toe aan hero H1**

Zoek in de hero `<h1>` naar de span met gradient-text en wrap de tekst erin met de typed-cursor klasse:

```tsx
// Was:
<h1>
  BEP{' '}
  <span className="gradient-text">{t('je nieuwe bedrijfsexpert', 'your new business expert')}</span>
</h1>

// Wordt:
<h1>
  BEP{' '}
  <span className="gradient-text">
    {t('je nieuwe bedrijfsexpert', 'your new business')}{' '}
    <span className="typed-cursor">{t('expert', 'expert')}</span>
  </span>
</h1>
```

- [ ] **Step 7: Verifieer in browser**

Open `http://localhost:3002/nl` — controleer:
- [ ] HeroAgent animatie zichtbaar rechts van de hero tekst
- [ ] Stats rij zichtbaar onder de knoppen
- [ ] Marquee logo strip scrolt automatisch
- [ ] Cursor knippert achter "expert"
- [ ] Hover over een capability-card → oranje lijn verschijnt bovenaan

- [ ] **Step 8: Commit**

```bash
git add src/app/[lang]/HomeContent.tsx
git commit -m "feat: update homepage with stats, marquee, HeroAgent and dark-glow"
```

---

## Task 5: Pricing Page Rewrite

**Files:**
- Modify: `src/app/[lang]/pricing/PricingContent.tsx`

- [ ] **Step 1: Vervang het hele bestand**

```typescript
'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'

export function PricingContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>

      {/* ===== HERO ===== */}
      <section className="pricing-hero dark-glow">
        <div className="container">
          <FadeUp>
            <div className="section-kicker">
              {t('Pricing', 'Pricing')}
            </div>
            <h1>
              {t('Start klein met BEP.', 'Start small with BEP.')}<br />
              {t('Breid uit ', 'Expand ')}
              <em className="typed-cursor">{t('zodra het werkt', 'once it works')}</em>
            </h1>
            <p className="hero-sub">
              {t(
                'BEP brengt betrouwbare AI naar je eigen bedrijfscontext. Op je eigen data, in je eigen omgeving, met een lage drempel om te beginnen.',
                'BEP brings reliable AI to your own business context. On your own data, in your own environment, with a low barrier to get started.'
              )}
            </p>
            <div className="pricing-checks">
              <span className="pricing-check">{t('Live in 2 tot 4 weken', 'Live in 2 to 4 weeks')}</span>
              <span className="pricing-check">{t('Maandelijks uitbreidbaar', 'Monthly expandable')}</span>
              <span className="pricing-check">{t('Eigen cloud of on-prem mogelijk', 'Own cloud or on-prem possible')}</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="pricing-intro">
        <div className="container">
          <FadeUp>
            <p>
              <strong>
                {t('Geen generieke chatbot. Geen groot implementatietraject vooraf.', 'No generic chatbot. No large implementation project upfront.')}
              </strong>
              {' '}
              {t(
                'Met BEP start je op één afgebakend domein, met echte bedrijfsdata en een eerste koppeling. Zodra het werkt, breid je eenvoudig uit met extra agents, koppelingen en teams.',
                'With BEP you start on one defined domain, with real business data and a first integration. Once it works, you easily expand with extra agents, integrations and teams.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section className="pricing-cards-section">
        <div className="container">
          <FadeUp>
            <p className="pricing-cards-label">{t('Kies je startpunt', 'Choose your starting point')}</p>
          </FadeUp>
          <div className="new-pricing-grid">

            {/* START */}
            <FadeUp delay={0.05}>
              <div className="np-card">
                <div className="np-card-name">{t('Start', 'Start')}</div>
                <div className="np-price">€595 <span>/maand</span></div>
                <div className="np-setup">+ €1.250 {t('eenmalige setup', 'one-time setup')}</div>
                <p className="np-desc">
                  {t(
                    'Voor organisaties die BEP voor het eerst willen inzetten.',
                    'For organizations that want to deploy BEP for the first time.'
                  )}
                </p>
                <p className="np-section-label">{t('Inclusief', 'Included')}</p>
                <ul className="np-features inclusief">
                  <li>{t('1 domein', '1 domain')}</li>
                  <li>{t('1 koppeling', '1 integration')}</li>
                  <li>{t('1 standaard agent', '1 standard agent')}</li>
                  <li>{t('tot 10 gebruikers', 'up to 10 users')}</li>
                  <li>{t('onboarding', 'onboarding')}</li>
                  <li>{t('live in 2 tot 4 weken', 'live in 2 to 4 weeks')}</li>
                </ul>
                <p className="np-section-label">{t('Ideaal voor', 'Ideal for')}</p>
                <ul className="np-features ideaal">
                  <li>{t('eerste use case', 'first use case')}</li>
                  <li>{t('eerste team', 'first team')}</li>
                  <li>{t('snelle start op eigen data', 'fast start on own data')}</li>
                </ul>
                <Link href="/contact" className="np-cta">{t('Plan een demo →', 'Schedule a demo →')}</Link>
              </div>
            </FadeUp>

            {/* TEAM */}
            <FadeUp delay={0.1}>
              <div className="np-card featured">
                <div className="np-badge">{t('Meest gekozen', 'Most popular')}</div>
                <div className="np-card-name">{t('Team', 'Team')}</div>
                <div className="np-price">€1.250 <span>/maand</span></div>
                <div className="np-setup">+ €1.500 {t('eenmalige uitbreiding', 'one-time expansion')}</div>
                <p className="np-desc">
                  {t(
                    'Voor organisaties die BEP breder willen inzetten.',
                    'For organizations that want to deploy BEP more broadly.'
                  )}
                </p>
                <p className="np-section-label">{t('Inclusief', 'Included')}</p>
                <ul className="np-features inclusief">
                  <li>{t('2 domeinen', '2 domains')}</li>
                  <li>{t('3 koppelingen', '3 integrations')}</li>
                  <li>{t('3 standaard agents', '3 standard agents')}</li>
                  <li>{t('tot 25 gebruikers', 'up to 25 users')}</li>
                  <li>{t('uitgebreidere onboarding', 'extended onboarding')}</li>
                </ul>
                <p className="np-section-label">{t('Ideaal voor', 'Ideal for')}</p>
                <ul className="np-features ideaal">
                  <li>{t('meerdere teams', 'multiple teams')}</li>
                  <li>{t('bredere kennisbasis', 'broader knowledge base')}</li>
                  <li>{t('eerste procesinrichting', 'first process setup')}</li>
                </ul>
                <Link href="/contact" className="np-cta">{t('Plan een demo →', 'Schedule a demo →')}</Link>
              </div>
            </FadeUp>

            {/* GROWTH */}
            <FadeUp delay={0.15}>
              <div className="np-card">
                <div className="np-card-name">{t('Growth', 'Growth')}</div>
                <div className="np-price">€2.500 <span>/maand</span></div>
                <div className="np-setup">+ €2.500 {t('eenmalige uitbreiding', 'one-time expansion')}</div>
                <p className="np-desc">
                  {t(
                    'Voor organisaties die BEP organisatiebreed willen uitrollen.',
                    'For organizations that want to roll out BEP organization-wide.'
                  )}
                </p>
                <p className="np-section-label">{t('Inclusief', 'Included')}</p>
                <ul className="np-features inclusief">
                  <li>{t('meerdere domeinen', 'multiple domains')}</li>
                  <li>{t('5 koppelingen', '5 integrations')}</li>
                  <li>{t('5 standaard agents', '5 standard agents')}</li>
                  <li>{t('tot 50 gebruikers', 'up to 50 users')}</li>
                  <li>{t('analytics en optimalisatie', 'analytics and optimization')}</li>
                  <li>{t('priority support', 'priority support')}</li>
                </ul>
                <p className="np-section-label">{t('Ideaal voor', 'Ideal for')}</p>
                <ul className="np-features ideaal">
                  <li>{t('meerdere afdelingen', 'multiple departments')}</li>
                  <li>{t('structureel gebruik', 'structural use')}</li>
                  <li>{t('verdere opschaling', 'further scaling')}</li>
                </ul>
                <Link href="/contact" className="np-cta">{t('Plan een demo →', 'Schedule a demo →')}</Link>
              </div>
            </FadeUp>

            {/* PLATFORM */}
            <FadeUp delay={0.2}>
              <div className="np-card">
                <div className="np-card-name">{t('Platform', 'Platform')}</div>
                <div className="np-price" style={{ fontSize: '22px' }}>
                  {t('v.a. ', 'from ')}€4.500 <span>/maand</span>
                </div>
                <div className="np-setup">{t('v.a. €3.500 eenmalig', 'from €3,500 one-time')}</div>
                <p className="np-desc">
                  {t(
                    'Voor organisaties die BEP als strategisch AI-platform inzetten.',
                    'For organizations that use BEP as a strategic AI platform.'
                  )}
                </p>
                <p className="np-section-label">{t('Inclusief', 'Included')}</p>
                <ul className="np-features inclusief">
                  <li>{t('brede uitrol', 'broad rollout')}</li>
                  <li>{t('governance', 'governance')}</li>
                  <li>{t('priority support', 'priority support')}</li>
                  <li>{t('maatwerkafspraken', 'custom agreements')}</li>
                  <li>{t('enterprise opties', 'enterprise options')}</li>
                </ul>
                <Link href="/contact" className="np-cta">{t('Neem contact op →', 'Get in touch →')}</Link>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ===== ADD-ONS ===== */}
      <section className="addons-section">
        <div className="container">
          <FadeUp>
            <div className="addons-header">
              <h2>{t('Breid uit wanneer het past', 'Expand when the time is right')}</h2>
              <p>{t('Je start klein en breidt uit zodra BEP waarde levert.', 'You start small and expand once BEP delivers value.')}</p>
            </div>
          </FadeUp>
          <div className="addons-grid">
            {[
              { price: '€199 / maand', priceEn: '€199 / month', name: 'Extra koppeling', nameEn: 'Extra integration' },
              { price: '€149 / maand', priceEn: '€149 / month', name: 'Extra agent', nameEn: 'Extra agent' },
              { price: 'v.a. €750 / maand', priceEn: 'from €750 / month', name: 'Eigen cloud / on-prem / sovereign deployment', nameEn: 'Own cloud / on-prem / sovereign deployment' },
              { price: 'Op aanvraag', priceEn: 'On request', name: 'Enterprise en SLA', nameEn: 'Enterprise and SLA' },
            ].map((addon, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="addon-card">
                  <div className="addon-price">{t(addon.price, addon.priceEn)}</div>
                  <div className="addon-name">{t(addon.name, addon.nameEn)}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIFFERENTIATIE ===== */}
      <section className="diff-section dark-glow">
        <div className="container">
          <div className="diff-inner">
            <FadeUp>
              <p className="diff-kicker">{t('Waarom BEP', 'Why BEP')}</p>
              <h2>{t('Waarom organisaties voor BEP kiezen', 'Why organizations choose BEP')}</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <ul className="diff-list">
                {[
                  { nl: 'gekoppeld op eigen bedrijfsdata', en: 'connected to your own business data' },
                  { nl: 'betrouwbare antwoorden in bedrijfscontext', en: 'reliable answers in business context' },
                  { nl: 'soeverein in te richten in eigen cloud of on-prem', en: 'sovereign setup in own cloud or on-prem' },
                  { nl: 'open en uitbreidbaar', en: 'open and expandable' },
                  { nl: 'niet beperkt tot één ecosysteem', en: 'not limited to one ecosystem' },
                  { nl: 'maandelijkse groei zonder nieuw offertetraject', en: 'monthly growth without new quotation process' },
                ].map((item, i) => (
                  <li key={i}>{t(item.nl, item.en)}</li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== VERGELIJKING ===== */}
      <section className="compare-section">
        <div className="container">
          <FadeUp>
            <p className="compare-kicker">{t('Vergelijking', 'Comparison')}</p>
            <h2>{t('Geen generieke copiloot, maar een bedrijfsplatform', 'Not a generic copilot, but a business platform')}</h2>
            <p>
              {t(
                'Copilots helpen individuele gebruikers productiever te werken. BEP gaat verder: het verbindt systemen, begrijpt de eigen context van je organisatie en maakt agents inzetbaar op echte processen en kennisdomeinen.',
                'Copilots help individual users work more productively. BEP goes further: it connects systems, understands the context of your organization and makes agents deployable on real processes and knowledge domains.'
              )}
            </p>
            <div className="compare-grid">
              <div className="compare-col">
                <p className="compare-col-label">{t('Generieke copiloot', 'Generic copilot')}</p>
                <h4>{t('Individueel productiviteitswerktuig', 'Individual productivity tool')}</h4>
                <p>
                  {t(
                    'Helpt een medewerker sneller werken op basis van publieke kennis. Geen verbinding met jouw systemen of context.',
                    'Helps an employee work faster based on public knowledge. No connection to your systems or context.'
                  )}
                </p>
              </div>
              <div className="compare-col bep-col">
                <p className="compare-col-label">BEP</p>
                <h4>{t('Bedrijfsplatform op eigen data', 'Business platform on own data')}</h4>
                <p>
                  {t(
                    'Verbindt systemen, begrijpt de context van jouw organisatie en maakt agents inzetbaar op echte processen en kennisdomeinen.',
                    'Connects systems, understands the context of your organization and makes agents deployable on real processes and knowledge domains.'
                  )}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pricing-cta dark-glow">
        <div className="container">
          <FadeUp>
            <h2>{t('Klein beginnen?', 'Start small?')}</h2>
            <p>
              {t(
                'We laten je in 2 tot 4 weken live gaan op één domein,\nmet echte data en een eerste koppeling.',
                'We get you live in 2 to 4 weeks on one domain,\nwith real data and a first integration.'
              )}
            </p>
            <div className="pricing-cta-btns">
              <Link href="/contact" className="btn btn-primary btn-arrow">
                {t('Plan een demo', 'Schedule a demo')}
              </Link>
              <Link href="/contact" className="btn btn-ghost btn-arrow">
                {t('Bespreek jouw eerste domein', 'Discuss your first domain')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </FadeUpContainer>
  )
}
```

- [ ] **Step 2: Verifieer in browser**

Open `http://localhost:3002/nl/pricing` — controleer:
- [ ] Dark hero met oranje glow zichtbaar
- [ ] Typing cursor op "zodra het werkt"
- [ ] 4 pricing cards naast elkaar, Team gemarkeerd
- [ ] Hover op een card → oranje lijn verschijnt bovenaan
- [ ] Add-ons sectie met 4 blokken
- [ ] Differentiatie blok donker met glow
- [ ] Vergelijkingsblok wit
- [ ] CTA onderaan

- [ ] **Step 3: Commit**

```bash
git add src/app/[lang]/pricing/PricingContent.tsx
git commit -m "feat: complete pricing page rewrite with new copy and design"
```

---

## Task 6: Chat API Route

**Files:**
- Create: `src/app/api/chat/route.ts`

- [ ] **Step 1: Maak de route aan**

```typescript
// src/app/api/chat/route.ts
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
```

- [ ] **Step 2: Test de route met curl**

```bash
curl -X POST http://localhost:3002/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Wat kost BEP?"}],"lang":"nl"}' \
  --no-buffer
```

Verwacht: een stream van `data: {"text":"..."}` regels, eindigend met `data: [DONE]`

- [ ] **Step 3: Commit**

```bash
git add src/app/api/chat/route.ts
git commit -m "feat: add streaming Claude chat API route"
```

---

## Task 7: ChatWidget Rewrite

**Files:**
- Modify: `src/components/ChatWidget.tsx`

- [ ] **Step 1: Vervang het hele bestand**

```typescript
'use client'
import { useState, useRef, useEffect } from 'react'
import { useLang } from '@/lib/language'
import { MessageCircle, X, Send } from 'lucide-react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = {
  nl: ['Wat kost BEP?', 'Hoe werkt het?', 'Kan ik een demo plannen?'],
  en: ['What does BEP cost?', 'How does it work?', 'Can I schedule a demo?'],
}

export function ChatWidget() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentLang = (lang as string) === 'en' ? 'en' : 'nl'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, lang: currentLang }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      setLoading(false)

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                assistantContent += parsed.text
                setMessages(prev => [
                  ...prev.slice(0, -1),
                  { role: 'assistant', content: assistantContent },
                ])
              }
            } catch {
              // skip malformed chunk
            }
          }
        }
      }
    } catch {
      setLoading(false)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: t(
            'Er ging iets mis. Stuur een e-mail naar info@bep.expert.',
            'Something went wrong. Send an email to info@bep.expert.'
          ),
        },
      ])
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
                      'Hi! I\'m BEP. Ask me anything about what I can do for your organization.'
                    )}
                  </p>
                </div>
                <div className="chat-quick-questions">
                  <p className="chat-quick-label">
                    {t('Snelle vragen:', 'Quick questions:')}
                  </p>
                  {quickQuestions[currentLang].map((q, i) => (
                    <button
                      key={i}
                      className="chat-quick-btn"
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="chat-msg-bubble">
                  {msg.content || (msg.role === 'assistant' && loading && i === messages.length - 1 ? '' : msg.content)}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="chat-typing">
                <span /><span /><span />
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

- [ ] **Step 2: Update de lang destructuring in de component**

`useLang()` retourneert `{ lang, t }` — gebruik dit direct:

```typescript
const { t, lang } = useLang()
const currentLang = lang  // is al 'nl' | 'en'
```

Verwijder de `(lang as string)` cast — vervang `(lang as string) === 'en' ? 'en' : 'nl'` door gewoon `lang`.

- [ ] **Step 3: Verifieer in browser**

Open `http://localhost:3002/nl` — controleer:
- [ ] Oranje chat-knop rechtsonder zichtbaar
- [ ] Klik op knop → chat panel opent
- [ ] Welkomstbericht en 3 snelle vragen zichtbaar
- [ ] Klik op "Wat kost BEP?" → BEP antwoordt streamend
- [ ] Typ een eigen vraag en druk Enter → werkt
- [ ] X-knop sluit het panel

- [ ] **Step 4: Commit**

```bash
git add src/components/ChatWidget.tsx
git commit -m "feat: replace WhatsApp widget with real Claude-powered AI chat"
```

---

## Verificatie Checklist

Na alle taken, open `http://localhost:3002` en loop door:

- [ ] **Homepage:** HeroAgent animeert, stats zichtbaar, logos scrollen, cursor knippert
- [ ] **Homepage:** hover op capability/trust/step cards → oranje lijn
- [ ] **Homepage:** donkere secties hebben subtiele oranje glow
- [ ] **Pricing:** `/nl/pricing` — alle secties aanwezig, Team card gemarkeerd
- [ ] **Pricing:** hover op pricing cards en add-ons → oranje lijn
- [ ] **Chat:** knop rechtsonder, panel opent, BEP antwoordt met streaming
- [ ] **Taal:** schakel naar EN via de taalswitch — pricing check-teksten en chat zijn in het Engels
- [ ] **Mobiel:** verklein browser naar 375px — pricing grid wordt 1 kolom, chat panel past op scherm
