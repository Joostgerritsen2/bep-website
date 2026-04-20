# BEP Autoriteit Sectie Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an authority/ecosystem section to the homepage that shows BEP is built by Stekz — the team behind AIGrunn and PyGrunn.

**Architecture:** New `<section>` in `HomeContent.tsx` inserted after the domain tiles section (line ~466), before the sovereignty section. Three credential cards with external logos fetched via `<Image>` tags. Supporting CSS in `globals.css`.

**Tech Stack:** Next.js 14, TypeScript, `next/image` for external images, `useLang` t() for i18n, FadeUp for scroll animation

---

## File Structure

| File | Change |
|---|---|
| `src/app/[lang]/HomeContent.tsx` | Insert authority section between domain-tiles and sovereignty-section |
| `src/styles/globals.css` | Add `.authority-section`, `.authority-grid`, `.authority-card`, `.authority-quote` CSS |

---

### Task 1: Authority section — HTML + CSS

**Files:**
- Modify: `src/app/[lang]/HomeContent.tsx` (insert after line ~466, the `</section>` closing domain-tiles)
- Modify: `src/styles/globals.css` (append new CSS rules)

**Context for the implementer:**

The file uses:
- `useLang()` hook: `const { t } = useLang()` — use `t('NL tekst', 'EN text')` for all user-facing strings
- `FadeUp` component: `<FadeUp delay={0.1}>...</FadeUp>` for scroll animations — already imported
- `next/image`: `import Image from 'next/image'` — already imported
- External images need `domains` config in `next.config.js` — check if `www.stekz.com` and `aigrunn.org` are already allowed; if not, add them

The domain tiles section ends around line 466 with `</section>`. Insert the new section immediately after that, before the `<section className="sovereignty-section dark-glow">`.

- [ ] **Step 1: Check next.config.js for allowed image domains**

Read `/Users/joost/Downloads/bep-website/next.config.js` (or `next.config.mjs`). If `www.stekz.com` and `aigrunn.org` are not in the `images.remotePatterns` or `images.domains` list, add them.

If the config uses `remotePatterns`:
```js
{ protocol: 'https', hostname: 'www.stekz.com' },
{ protocol: 'https', hostname: 'aigrunn.org' },
```

If the config uses `domains` (older style):
```js
domains: [...existing, 'www.stekz.com', 'aigrunn.org'],
```

- [ ] **Step 2: Insert the authority section in HomeContent.tsx**

Find the line `</section>` that closes the domain-tiles section (search for `domain-tiles-section` — the closing `</section>` follows it). Insert this JSX immediately after:

```tsx
      {/* Autoriteit / Ecosysteem */}
      <section className="authority-section">
        <div className="container">
          <FadeUp>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-label">{t('Het team', 'The team')}</span>
              <h2>{t('Niet zomaar een AI-tool.', 'Not just another AI tool.')}</h2>
              <p style={{ maxWidth: '560px', margin: '0 auto' }}>
                {t(
                  'BEP is gebouwd door het team achter de grootste tech-community events van Noord-Nederland.',
                  'BEP is built by the team behind the largest tech community events in the Northern Netherlands.'
                )}
              </p>
            </div>
          </FadeUp>

          <div className="authority-grid">
            <FadeUp delay={0.1}>
              <a
                href="https://www.stekz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-card"
              >
                <div className="authority-card-logo">
                  <Image
                    src="https://www.stekz.com/images/logo.svg"
                    alt="Stekz"
                    width={120}
                    height={32}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="authority-card-name">Stekz</div>
                <div className="authority-card-desc">
                  {t('Het IT bedrijf van Noord-Nederland', 'The IT company of Northern Netherlands')}
                </div>
              </a>
            </FadeUp>

            <FadeUp delay={0.2}>
              <a
                href="https://aigrunn.org"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-card"
              >
                <div className="authority-card-logo">
                  <Image
                    src="https://aigrunn.org/wp-content/uploads/2023/10/cropped-robot-1280.png"
                    alt="AIGrunn"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="authority-card-name">AIGrunn</div>
                <div className="authority-card-desc">
                  {t('AI Tech Event voor software professionals', 'AI Tech Event for software professionals')}
                </div>
              </a>
            </FadeUp>

            <FadeUp delay={0.3}>
              <a
                href="https://pygrunn.org"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-card"
              >
                <div className="authority-card-logo authority-card-logo--text">
                  <span className="pygrunn-badge">PyGrunn</span>
                </div>
                <div className="authority-card-name">PyGrunn</div>
                <div className="authority-card-desc">
                  {t('Python & friends conference', 'Python & friends conference')}
                </div>
              </a>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <blockquote className="authority-quote">
              <p>
                {t(
                  '"Wij organiseren de events waar developers AI leren bouwen — en BEP is wat we zelf gebruiken."',
                  '"We organize the events where developers learn to build AI — and BEP is what we use ourselves."'
                )}
              </p>
              <cite>{t('— Stekz team', '— Stekz team')}</cite>
            </blockquote>
          </FadeUp>
        </div>
      </section>
```

- [ ] **Step 3: Add CSS to globals.css**

Append these rules at the end of `src/styles/globals.css` (before the final closing lines if any, or just at the bottom):

```css
/* ── Authority / Ecosystem section ────────────────────────────────────────── */
.authority-section {
  background: var(--blue-darker);
  padding: 80px 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.authority-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.authority-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 32px 24px;
  text-decoration: none;
  text-align: center;
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.authority-card:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(245,134,29,0.3);
}

.authority-card-logo {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.authority-card-logo--text {
  height: 48px;
}

.pygrunn-badge {
  font-size: 18px;
  font-weight: 800;
  color: var(--orange);
  letter-spacing: -0.5px;
}

.authority-card-name {
  font-size: 15px;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
}

.authority-card-desc {
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  line-height: 1.5;
}

.authority-quote {
  margin: 48px auto 0;
  max-width: 600px;
  text-align: center;
  border: none;
  padding: 0;
}

.authority-quote p {
  font-size: 17px;
  font-style: italic;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
  margin: 0;
}

.authority-quote cite {
  display: block;
  margin-top: 12px;
  font-size: 13px;
  font-style: normal;
  color: rgba(255,255,255,0.35);
}

@media (max-width: 480px) {
  .authority-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Verify build**

```bash
cd /Users/joost/Downloads/bep-website && npm run build 2>&1 | tail -20
```

Expected: clean build, no TypeScript errors. If image domain errors appear, double-check Step 1.

- [ ] **Step 5: Commit**

No git repo — skip.
