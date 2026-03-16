export interface CaseStudy {
  slug: string
  client: string
  sector: { nl: string; en: string }
  tagline: { nl: string; en: string }
  description: { nl: string; en: string }
  logo: string
  coverImage?: string
  stats: { value: string; label: { nl: string; en: string } }[]
  sections: {
    title: { nl: string; en: string }
    paragraphs: { nl: string; en: string }[]
  }[]
  quote?: { text: { nl: string; en: string }; author: string }
}

export const cases: CaseStudy[] = [
  {
    slug: 'tender-strateeg',
    client: 'Tender Strateeg',
    sector: { nl: 'Consultancy', en: 'Consultancy' },
    tagline: {
      nl: 'Kennisbank voor tenderspecialisten',
      en: 'Knowledge base for tender specialists',
    },
    description: {
      nl: 'Tender Strateeg begeleidt organisaties bij complexe aanbestedingen. Met honderden tenderdocumenten, richtlijnen en best practices verspreid over verschillende systemen was het vinden van de juiste informatie een tijdrovende klus.',
      en: 'Tender Strateeg guides organizations through complex procurement processes. With hundreds of tender documents, guidelines and best practices spread across different systems, finding the right information was a time-consuming task.',
    },
    logo: '/images/client-tender-strateeg.png',
    stats: [
      { value: '60%', label: { nl: 'Snellere voorbereiding', en: 'Faster preparation' } },
      { value: '500+', label: { nl: 'Documenten ontsloten', en: 'Documents unlocked' } },
      { value: '15', label: { nl: 'Consultants gebruiken BEP', en: 'Consultants use BEP' } },
      { value: '2 wk', label: { nl: 'Implementatietijd', en: 'Implementation time' } },
    ],
    sections: [
      {
        title: { nl: 'De Uitdaging', en: 'The Challenge' },
        paragraphs: [
          {
            nl: 'Bij elke nieuwe aanbesteding moesten consultants urenlang zoeken in SharePoint-mappen, e-mailarchief en oude offertes. Relevante precedenten en winnende strategieen waren verspreid over tientallen locaties.',
            en: 'For each new tender, consultants had to spend hours searching through SharePoint folders, email archives and old proposals. Relevant precedents and winning strategies were scattered across dozens of locations.',
          },
          {
            nl: 'Nieuwe medewerkers hadden maanden nodig om de kennisbasis te doorgronden. Senior experts werden constant gestoord met vragen die ze al eerder hadden beantwoord.',
            en: 'New employees needed months to master the knowledge base. Senior experts were constantly interrupted with questions they had already answered before.',
          },
        ],
      },
      {
        title: { nl: 'De Oplossing', en: 'The Solution' },
        paragraphs: [
          {
            nl: 'BEP is gekoppeld aan SharePoint, het e-mailsysteem en de interne kennisbank van Tender Strateeg. Alle 500+ documenten zijn geindexeerd en doorzoekbaar in natuurlijke taal.',
            en: 'BEP was connected to SharePoint, the email system and Tender Strateeg\'s internal knowledge base. All 500+ documents are indexed and searchable in natural language.',
          },
          {
            nl: 'Consultants stellen nu vragen als "Welke strategie gebruikten we voor de laatste gemeente-aanbesteding?" of "Toon alle compliance-eisen voor zorg-tenders". BEP vindt het antwoord binnen seconden, inclusief bronvermelding.',
            en: 'Consultants now ask questions like "What strategy did we use for the last municipal tender?" or "Show all compliance requirements for healthcare tenders". BEP finds the answer within seconds, including source references.',
          },
        ],
      },
      {
        title: { nl: 'Het Resultaat', en: 'The Result' },
        paragraphs: [
          {
            nl: 'De voorbereidingstijd voor nieuwe tenders is met 60% gedaald. Consultants besteden hun tijd nu aan strategie in plaats van zoeken. De kwaliteit van offertes is meetbaar gestegen doordat relevante precedenten automatisch worden aangedragen.',
            en: 'Preparation time for new tenders has decreased by 60%. Consultants now spend their time on strategy instead of searching. The quality of proposals has measurably increased as relevant precedents are automatically suggested.',
          },
          {
            nl: 'Nieuwe medewerkers zijn nu binnen dagen productief. De kennisoverdracht die voorheen weken kostte, gebeurt nu organisch via BEP.',
            en: 'New employees are now productive within days. The knowledge transfer that previously took weeks now happens organically through BEP.',
          },
        ],
      },
    ],
    quote: {
      text: {
        nl: 'BEP heeft de manier waarop wij tenders voorbereiden fundamenteel veranderd. Wat voorheen uren kostte, doen we nu in minuten.',
        en: 'BEP has fundamentally changed the way we prepare tenders. What used to take hours, we now do in minutes.',
      },
      author: 'Managing Partner, Tender Strateeg',
    },
  },
  {
    slug: 'groningen-seaports',
    client: 'Groningen Seaports',
    sector: { nl: 'Havenbeheer', en: 'Port Management' },
    tagline: {
      nl: 'Operationele data ontsloten',
      en: 'Operational data unlocked',
    },
    description: {
      nl: 'Groningen Seaports beheert twee zeehavens en een uitgestrekt industrieterrein. Operationele kennis zat verspreid over Excel-sheets, e-mails en de hoofden van ervaren medewerkers.',
      en: 'Groningen Seaports manages two seaports and an extensive industrial area. Operational knowledge was scattered across Excel sheets, emails and the minds of experienced employees.',
    },
    logo: '/images/client-groningen-seaports.png',
    stats: [
      { value: '80%', label: { nl: 'Minder zoektijd', en: 'Less search time' } },
      { value: '3.5x', label: { nl: 'ROI in jaar 1', en: 'ROI in year 1' } },
      { value: '200+', label: { nl: 'Gebruikers', en: 'Users' } },
      { value: '24/7', label: { nl: 'Beschikbaar', en: 'Available' } },
    ],
    sections: [
      {
        title: { nl: 'De Uitdaging', en: 'The Challenge' },
        paragraphs: [
          {
            nl: 'De haven opereert 24/7 maar kritische operationele kennis was alleen beschikbaar tijdens kantooruren, wanneer de juiste persoon aanwezig was. Informatie over regelgeving, procedures en klantafspraken zat verspreid over tientallen systemen.',
            en: 'The port operates 24/7 but critical operational knowledge was only available during office hours, when the right person was present. Information about regulations, procedures and client agreements was spread across dozens of systems.',
          },
          {
            nl: 'Met het naderen van pensioen van meerdere senior medewerkers dreigde jarenlange ervaring verloren te gaan.',
            en: 'With several senior employees approaching retirement, years of experience were at risk of being lost.',
          },
        ],
      },
      {
        title: { nl: 'De Oplossing', en: 'The Solution' },
        paragraphs: [
          {
            nl: 'BEP verbindt de interne systemen van Groningen Seaports: van havenbeheerssoftware en contractendatabases tot e-mail en interne procedures. Alle operationele kennis is nu 24/7 doorzoekbaar.',
            en: 'BEP connects Groningen Seaports\' internal systems: from port management software and contract databases to email and internal procedures. All operational knowledge is now searchable 24/7.',
          },
          {
            nl: 'Medewerkers vragen BEP bijvoorbeeld: "Wat zijn de lostijden voor terminal 3 deze week?" of "Welke milieueisen gelden voor chemische overslag?". BEP doorzoekt alle bronnen en geeft direct antwoord.',
            en: 'Employees ask BEP for example: "What are the unloading times for terminal 3 this week?" or "What environmental requirements apply to chemical transshipment?". BEP searches all sources and provides immediate answers.',
          },
        ],
      },
      {
        title: { nl: 'Het Resultaat', en: 'The Result' },
        paragraphs: [
          {
            nl: 'De zoektijd naar operationele informatie is met 80% gedaald. Nachtploegen hebben nu dezelfde toegang tot kennis als dagploegen. De ROI was al in het eerste jaar 3.5x de investering.',
            en: 'Search time for operational information has decreased by 80%. Night shifts now have the same access to knowledge as day shifts. The ROI was already 3.5x the investment in the first year.',
          },
          {
            nl: 'De kennis van vertrekkende medewerkers is vastgelegd en blijft beschikbaar voor de hele organisatie. Nieuwe medewerkers komen sneller op snelheid.',
            en: 'The knowledge of departing employees has been captured and remains available for the entire organization. New employees get up to speed faster.',
          },
        ],
      },
    ],
    quote: {
      text: {
        nl: 'We opereren 24/7 en nu is onze kennis dat ook. BEP heeft een einde gemaakt aan het probleem dat cruciale informatie alleen in de hoofden van een paar mensen zat.',
        en: 'We operate 24/7 and now our knowledge does too. BEP has put an end to the problem of crucial information only being in the heads of a few people.',
      },
      author: 'Operations Director, Groningen Seaports',
    },
  },
  {
    slug: 'sjb-advies',
    client: 'SJB Advies',
    sector: { nl: 'Financieel Advies', en: 'Financial Advisory' },
    tagline: {
      nl: 'Klantkennis altijd paraat',
      en: 'Client knowledge always ready',
    },
    description: {
      nl: 'SJB Advies is een groeiend financieel advieskantoor met meer dan 150 gebruikers. Door de snelle groei werd het steeds lastiger om klantdossiers, regelgeving en adviezen snel terug te vinden.',
      en: 'SJB Advies is a growing financial advisory firm with over 150 users. Due to rapid growth, it became increasingly difficult to quickly find client dossiers, regulations and advice.',
    },
    logo: '/images/client-sjb-advies.png',
    stats: [
      { value: '4.2x', label: { nl: 'ROI', en: 'ROI' } },
      { value: '150+', label: { nl: 'Dagelijkse gebruikers', en: 'Daily users' } },
      { value: '40%', label: { nl: 'Snellere dienstverlening', en: 'Faster service delivery' } },
      { value: '10K+', label: { nl: 'Dossiers doorzoekbaar', en: 'Dossiers searchable' } },
    ],
    sections: [
      {
        title: { nl: 'De Uitdaging', en: 'The Challenge' },
        paragraphs: [
          {
            nl: 'Financieel adviseurs moesten voor elk klantgesprek handmatig dossiers doorzoeken, regelgeving checken en eerdere adviezen opzoeken. Dit kostte gemiddeld 30-45 minuten per gesprek aan voorbereiding.',
            en: 'Financial advisors had to manually search through dossiers, check regulations and look up previous advice before each client meeting. This took an average of 30-45 minutes of preparation per meeting.',
          },
          {
            nl: 'Door veranderende wet- en regelgeving was het lastig om altijd de meest actuele informatie te gebruiken. Fouten in advisering lagen op de loer.',
            en: 'Due to changing laws and regulations, it was difficult to always use the most current information. Errors in advice were lurking around the corner.',
          },
        ],
      },
      {
        title: { nl: 'De Oplossing', en: 'The Solution' },
        paragraphs: [
          {
            nl: 'BEP is gekoppeld aan het CRM, dossierbeheer en de interne kennisbank van SJB Advies. Alle 10.000+ klantdossiers, beleidsregels en eerdere adviezen zijn nu doorzoekbaar in gewone taal.',
            en: 'BEP is connected to the CRM, dossier management and SJB Advies\' internal knowledge base. All 10,000+ client dossiers, policy rules and previous advice are now searchable in plain language.',
          },
          {
            nl: 'Een adviseur vraagt bijvoorbeeld: "Wat is het laatst gegeven pensioenadvies aan klant X?" of "Welke fiscale wijzigingen gelden per 1 januari voor DGA\'s?". BEP geeft direct het antwoord met bronverwijzing.',
            en: 'An advisor asks for example: "What was the last pension advice given to client X?" or "What tax changes apply from January 1 for company directors?". BEP provides the answer immediately with source reference.',
          },
        ],
      },
      {
        title: { nl: 'Het Resultaat', en: 'The Result' },
        paragraphs: [
          {
            nl: 'De dienstverlening is 40% sneller geworden. Adviseurs bereiden klantgesprekken nu in minuten voor in plaats van een half uur. De kwaliteit van advies is gestegen doordat altijd de meest actuele regelgeving wordt gebruikt.',
            en: 'Service delivery has become 40% faster. Advisors now prepare client meetings in minutes instead of half an hour. The quality of advice has increased as the most current regulations are always used.',
          },
          {
            nl: 'Met een ROI van 4.2x in het eerste jaar heeft BEP zichzelf ruimschoots terugverdiend. Alle 150+ medewerkers gebruiken BEP dagelijks.',
            en: 'With an ROI of 4.2x in the first year, BEP has more than paid for itself. All 150+ employees use BEP daily.',
          },
        ],
      },
    ],
    quote: {
      text: {
        nl: 'Onze adviseurs hebben nu het gevoel dat ze een persoonlijke assistent hebben die alles weet van elke klant en elke regeling. Dat maakt ons sneller en beter.',
        en: 'Our advisors now feel like they have a personal assistant who knows everything about every client and every regulation. That makes us faster and better.',
      },
      author: 'Directeur, SJB Advies',
    },
  },
  {
    slug: 'bpz',
    client: 'BPZ',
    sector: { nl: 'Productie', en: 'Manufacturing' },
    tagline: {
      nl: 'Bedrijfskennis geborgd',
      en: 'Business knowledge preserved',
    },
    description: {
      nl: 'BPZ is een productiebedrijf waar de kennis van het productieproces grotendeels in de hoofden van senior medewerkers zat. Met meerdere pensioneringen in zicht moest deze kennis snel worden vastgelegd.',
      en: 'BPZ is a manufacturing company where knowledge of the production process was largely in the heads of senior employees. With several retirements approaching, this knowledge had to be captured quickly.',
    },
    logo: '/images/client-bpz.png',
    coverImage: '/images/case-bpz.webp',
    stats: [
      { value: '2 wk', label: { nl: 'Implementatietijd', en: 'Implementation time' } },
      { value: '100%', label: { nl: 'Kennisbehoud', en: 'Knowledge retained' } },
      { value: '50%', label: { nl: 'Minder inwerktijd', en: 'Less onboarding time' } },
      { value: '0', label: { nl: 'Kennisincidenten', en: 'Knowledge incidents' } },
    ],
    sections: [
      {
        title: { nl: 'De Uitdaging', en: 'The Challenge' },
        paragraphs: [
          {
            nl: 'Drie senior productiemedewerkers met samen meer dan 80 jaar ervaring gingen binnen een jaar met pensioen. Hun kennis over machineonderhoud, kwaliteitsprocessen en probleemoplossing was nergens gedocumenteerd.',
            en: 'Three senior production employees with a combined 80+ years of experience were retiring within a year. Their knowledge about machine maintenance, quality processes and troubleshooting was not documented anywhere.',
          },
          {
            nl: 'Eerdere pogingen om kennis vast te leggen in handleidingen en procedures hadden gefaald. De documenten werden niet bijgehouden en niemand kon er efficient in zoeken.',
            en: 'Previous attempts to capture knowledge in manuals and procedures had failed. The documents were not maintained and nobody could search through them efficiently.',
          },
        ],
      },
      {
        title: { nl: 'De Oplossing', en: 'The Solution' },
        paragraphs: [
          {
            nl: 'In twee weken is BEP geimplementeerd en gekoppeld aan alle bestaande documentatie, onderhoudslogboeken en e-mailcorrespondentie. Vervolgens zijn gerichte kennissessies gehouden met de senior medewerkers, waarvan de output direct in BEP is opgenomen.',
            en: 'In two weeks, BEP was implemented and connected to all existing documentation, maintenance logbooks and email correspondence. Then targeted knowledge sessions were held with senior employees, the output of which was directly captured in BEP.',
          },
          {
            nl: 'Productiemedewerkers vragen BEP nu: "Hoe los ik trillingsprobleem X op bij machine Y?" of "Wat is het onderhoudsschema voor de verpakkingslijn?". BEP antwoordt met de kennis van de experts, inclusief context en achtergrond.',
            en: 'Production workers now ask BEP: "How do I solve vibration problem X on machine Y?" or "What is the maintenance schedule for the packaging line?". BEP answers with expert knowledge, including context and background.',
          },
        ],
      },
      {
        title: { nl: 'Het Resultaat', en: 'The Result' },
        paragraphs: [
          {
            nl: 'Alle kritische kennis is vastgelegd en blijft beschikbaar, ook na het vertrek van de senior medewerkers. De inwerktijd voor nieuwe productiemedewerkers is gehalveerd.',
            en: 'All critical knowledge has been captured and remains available, even after the senior employees\' departure. Onboarding time for new production workers has been cut in half.',
          },
          {
            nl: 'Sinds de implementatie zijn er nul kennisincidenten geweest — situaties waarbij productie stilstond omdat niemand wist hoe een probleem opgelost moest worden. BEP fungeert als het collectieve geheugen van de fabriek.',
            en: 'Since implementation, there have been zero knowledge incidents — situations where production stood still because nobody knew how to solve a problem. BEP functions as the collective memory of the factory.',
          },
        ],
      },
    ],
    quote: {
      text: {
        nl: 'We waren bang dat we met het vertrek van onze beste mensen ook onze beste kennis zouden verliezen. BEP heeft dat volledig voorkomen.',
        en: 'We were afraid that with the departure of our best people, we would also lose our best knowledge. BEP has completely prevented that.',
      },
      author: 'Productiemanager, BPZ',
    },
  },
]

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find(c => c.slug === slug)
}

export function getRelatedCases(currentSlug: string): CaseStudy[] {
  return cases.filter(c => c.slug !== currentSlug).slice(0, 3)
}
