# BEP Autoriteit Sectie — Design Spec

## Doel

Een sectie op de homepage die uitlegt dat BEP gebouwd is door Stekz — het team achter AIGrunn en PyGrunn. Bezoekers moeten begrijpen dat er echte AI-experts achter BEP zitten, geen generiek SaaS-bedrijf.

---

## Locatie

Na de domain tiles sectie, vóór de sovereignty block — op het moment dat de bezoeker begrijpt wát BEP doet, krijgen ze te zien wíé erachter zit.

---

## Inhoud

### Headline + subtekst
```
"Niet zomaar een AI-tool."
BEP is gebouwd door het team achter de grootste tech-community events van Noord-Nederland.
```

### Drie credential cards

| Logo | Naam | Beschrijving | URL |
|---|---|---|---|
| `https://www.stekz.com/images/logo.svg` | Stekz | Het IT bedrijf van Noord-Nederland | https://www.stekz.com |
| `https://aigrunn.org/wp-content/uploads/2023/10/cropped-robot-1280.png` | AIGrunn | AI Tech Event voor software professionals | https://aigrunn.org |
| Tekst "Py" styled | PyGrunn | Python & friends conference | https://pygrunn.org |

PyGrunn heeft geen bruikbaar zelfstandig logo — gebruik een gestylde tekst badge `<span>Py</span>Grunn` in oranje/paars of gewoon als tekst.

### Quote
```
"Wij organiseren de events waar developers AI leren bouwen — en BEP is wat we zelf gebruiken."
— Stekz team
```

---

## Visueel ontwerp

- Achtergrond: `var(--blue-darker)` (#0f1d2f) — zelfde dark blue als rest van de site
- Sectie padding: `80px 0`
- Headline gecentreerd, wit
- Subtekst gecentreerd, `rgba(255,255,255,0.6)`
- Cards: 3-koloms grid, elk met logo + naam + beschrijving, klikbaar (target="_blank")
- Card achtergrond: `rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.08)`
- Logo's: wit/licht weergegeven (CSS filter: brightness voor donkere logo's indien nodig)
- Quote: cursief, lichtgrijs, gecentreerd, max-width 600px

---

## Responsive

- Desktop: 3 kolommen naast elkaar
- Tablet (< 768px): 3 kolommen nog steeds (compact)
- Mobile (< 480px): 1 kolom gestapeld

---

## Bestanden

| Bestand | Wijziging |
|---|---|
| `src/app/[lang]/HomeContent.tsx` | Nieuwe sectie toevoegen na domain tiles |
| `src/styles/globals.css` | CSS voor `.authority-section`, `.authority-cards`, `.authority-card`, `.authority-quote` |
