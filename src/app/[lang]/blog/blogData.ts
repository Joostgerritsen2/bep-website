// Local blog posts — used as fallback when Sanity is not connected
// Format matches Sanity blogPost schema so BlogDetail/BlogOverview work seamlessly

export interface LocalBlogPost {
  _id: string
  title: string
  titleEn: string
  slug: { current: string }
  author: string
  publishedAt: string
  category: string
  excerpt: string
  excerptEn: string
  coverUrl?: string
  body: any[]
  bodyEn?: any[]
  relatedPosts?: any[]
}

let keyCounter = 0
function k() {
  return `k${++keyCounter}`
}

function p(text: string, marks?: string[]): any {
  return {
    _type: 'block',
    style: 'normal',
    _key: k(),
    markDefs: [],
    children: [{ _type: 'span', text, marks: marks || [], _key: k() }],
  }
}

function h2(text: string): any {
  return {
    _type: 'block',
    style: 'h2',
    _key: k(),
    markDefs: [],
    children: [{ _type: 'span', text, _key: k() }],
  }
}

function richBlock(children: any[], markDefs?: any[]): any {
  return {
    _type: 'block',
    style: 'normal',
    _key: k(),
    markDefs: markDefs || [],
    children,
  }
}

function span(text: string, marks?: string[]): any {
  return { _type: 'span', text, marks: marks || [], _key: k() }
}

export const localBlogPosts: LocalBlogPost[] = [
  {
    _id: 'local-dode-data',
    title: 'Je hebt al jaren data verzameld. Je gebruikt het niet.',
    titleEn: 'You\'ve been collecting data for years. You\'re not using it.',
    slug: { current: 'dode-data' },
    author: 'BEP',
    publishedAt: '2025-03-10T09:00:00Z',
    category: 'business',
    excerpt: 'Hoe bedrijfsdata van passief archief naar actieve bedrijfsexpert gaat. Data die je niet kunt gebruiken, is geen bedrijfskapitaal — het is digitale rommel met een duur prijskaartje.',
    excerptEn: 'How business data goes from passive archive to active business expert. Data you can\'t use isn\'t business capital — it\'s digital clutter with an expensive price tag.',
    body: [
      p('Hoe bedrijfsdata van passief archief naar actieve bedrijfsexpert gaat.', ['em']),

      p('Elke organisatie van enige omvang heeft hetzelfde probleem, ook al voelt het niet altijd zo.'),

      p('In het ERP staat de volledige orderhistorie. In het CRM zitten jaren klantcontact. In de inbox van de salesmanager sluimert een offertetraject dat drie maanden geleden bijna doorging. In een Sharepoint-map op de derde tab staat een procedure die de nieuwe medewerker nooit heeft gevonden. In het hoofd van de senior die volgend jaar met pensioen gaat, zit kennis die nergens is vastgelegd.'),

      p('Dat is geen klein probleem. Dat is het probleem.'),

      h2('Data die niemand gebruikt is geen asset'),

      p('Bedrijven investeren jaren in systemen. ERP-implementaties, CRM-trajecten, documentbeheer, e-mailarchivering. Al die investering levert data op. Maar die data is passief. Hij zit opgesloten in losse systemen die niet met elkaar praten, in formats die mensen niet kunnen doorzoeken, in mappen die niemand meer kent.'),

      p('Het resultaat: medewerkers zoeken. Ze bellen de collega die het waarschijnlijk wel weet. Ze openen vijf systemen om één vraag te beantwoorden. Ze herontdekken wiel na wiel, omdat de kennis er wel is, maar niet bereikbaar.'),

      p('Data die je niet kunt gebruiken, is geen bedrijfskapitaal. Het is digitale rommel met een duur prijskaartje.'),

      h2('Verbinden is het begin. Activeren is het doel.'),

      p('BEP verbindt alle databronnen die een organisatie al heeft: het ERP, het CRM, documenten, e-mail, databases. Niet om er een betere zoekmachine van te maken, maar om er een bedrijfsexpert van te maken.'),

      p('Het verschil is groot.'),

      p('Een zoekmachine geeft je resultaten. Een expert geeft je antwoorden. BEP begrijpt de vraag achter de vraag, haalt informatie op uit meerdere bronnen tegelijk, en geeft een antwoord met bronvermelding. "Wat was de gemiddelde doorlooptijd van orders boven de 50.000 euro in Q3?" BEP doorzoekt het ERP, combineert de data, en geeft het antwoord. Geen export, geen Excel, geen collega die het even uitzoekt.'),

      p('Maar BEP stopt daar niet.'),

      h2('Een expert die niet wacht tot je een vraag stelt'),

      p('Een chatbot reageert. Een bedrijfsexpert handelt.'),

      p('BEP voert taken uit en signaleert proactief wat aandacht verdient, zonder dat iemand ernaar hoeft te vragen. Een levering die dreigt te laat te komen? BEP signaleert het en stelt een actie voor. Een klant die al maanden geen contact heeft gehad? BEP attendeert de accountmanager. Een factuur die over drie dagen vervalt? BEP herinnert de juiste persoon op het juiste moment.'),

      p('Dat is het verschil tussen data die reageert en data die werkt.'),

      h2('Jouw data. Jouw cloud. Jouw expert.'),

      p('Wat BEP niet doet: je data doorsturen naar Microsoft, Google of OpenAI. BEP draait volledig in je eigen cloudomgeving, aangedreven door open-source AI. Geen vendor lock-in, geen datadeling met Big Tech, geen vragen over wat er met je bedrijfsinformatie gebeurt.'),

      p('Jouw data was altijd al van jou. Nu wordt het ook bruikbaar voor je.'),

      p('En hoe meer je BEP voedt, hoe slimmer de bedrijfsexpert wordt. De kennis die nu versnipperd zit over systemen en hoofden, groeit toe naar één plek die de hele organisatie kan raadplegen en op kan bouwen.'),

      p('Hoe je dat implementeert op een manier die ook echt werkt, dat is een apart gesprek. Maar het begint hier: met de data die je al hebt.'),

      richBlock(
        [
          span('Ontdek wat BEP voor jouw organisatie kan betekenen: ', ['strong']),
          span('bep.expert', ['strong', 'link-bep']),
        ],
        [{ _type: 'link', _key: 'link-bep', href: 'https://bep.expert' }]
      ),
    ],
    bodyEn: [
      p('How business data goes from passive archive to active business expert.', ['em']),

      p('Every organization of any size has the same problem, even if it doesn\'t always feel that way.'),

      p('The ERP holds the complete order history. The CRM contains years of client contacts. In the sales manager\'s inbox, a proposal that nearly went through three months ago lies dormant. In a SharePoint folder on the third tab, there\'s a procedure the new employee never found. In the mind of the senior who retires next year, there\'s knowledge that has never been documented.'),

      p('That\'s not a small problem. That is the problem.'),

      h2('Data nobody uses is not an asset'),

      p('Companies invest years in systems. ERP implementations, CRM projects, document management, email archiving. All that investment produces data. But that data is passive. It\'s locked in separate systems that don\'t talk to each other, in formats people can\'t search through, in folders nobody remembers.'),

      p('The result: employees search. They call the colleague who probably knows. They open five systems to answer one question. They reinvent the wheel over and over, because the knowledge exists — it\'s just not accessible.'),

      p('Data you can\'t use is not business capital. It\'s digital clutter with an expensive price tag.'),

      h2('Connecting is the beginning. Activating is the goal.'),

      p('BEP connects all the data sources an organization already has: the ERP, the CRM, documents, email, databases. Not to build a better search engine, but to build a business expert.'),

      p('The difference is significant.'),

      p('A search engine gives you results. An expert gives you answers. BEP understands the question behind the question, retrieves information from multiple sources simultaneously, and provides an answer with source references. "What was the average lead time for orders over €50,000 in Q3?" BEP searches the ERP, combines the data, and gives you the answer. No exports, no Excel, no colleague who\'ll look into it.'),

      p('But BEP doesn\'t stop there.'),

      h2('An expert that doesn\'t wait for you to ask'),

      p('A chatbot reacts. A business expert acts.'),

      p('BEP executes tasks and proactively signals what needs attention, without anyone having to ask. A delivery at risk of being late? BEP flags it and proposes an action. A client who hasn\'t been contacted in months? BEP alerts the account manager. An invoice due in three days? BEP reminds the right person at the right time.'),

      p('That\'s the difference between data that reacts and data that works.'),

      h2('Your data. Your cloud. Your expert.'),

      p('What BEP doesn\'t do: send your data to Microsoft, Google or OpenAI. BEP runs entirely in your own cloud environment, powered by open-source AI. No vendor lock-in, no data sharing with Big Tech, no questions about what happens to your business information.'),

      p('Your data has always been yours. Now it becomes usable too.'),

      p('And the more you feed BEP, the smarter the business expert becomes. The knowledge that\'s currently scattered across systems and minds grows into one place the entire organization can consult and build upon.'),

      p('How to implement that in a way that actually works — that\'s a separate conversation. But it starts here: with the data you already have.'),

      richBlock(
        [
          span('Discover what BEP can do for your organization: ', ['strong']),
          span('bep.expert', ['strong', 'link-bep']),
        ],
        [{ _type: 'link', _key: 'link-bep', href: 'https://bep.expert' }]
      ),
    ],
  },
]
