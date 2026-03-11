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

  // ── Blog 2: Data Soevereiniteit ─────────────────────────────────────
  {
    _id: 'local-data-soevereiniteit',
    title: 'Waarom wij weigeren je data naar OpenAI te sturen',
    titleEn: 'Why we refuse to send your data to OpenAI',
    slug: { current: 'data-soevereiniteit' },
    author: 'Berco Beute',
    publishedAt: '2025-04-02T09:00:00Z',
    category: 'business',
    excerpt: 'De keuze tussen gemak en soevereiniteit is een valse tegenstelling. Open-source AI in je eigen cloud is niet het compromis — het is de betere aanpak.',
    excerptEn: 'The choice between convenience and sovereignty is a false dichotomy. Open-source AI in your own cloud isn\'t the compromise — it\'s the better approach.',
    body: [
      p('Elke AI-leverancier wil je data. Microsoft, Google, OpenAI — ze hebben allemaal je bedrijfsdata nodig om betere modellen te trainen. Dat is hún businessmodel. Het jouwe zou niet moeten zijn om het te voeden.'),

      p('We leven in een tijd waarin AI-tools uit de grond schieten als paddenstoelen. Elke week een nieuwe integratie, een nieuwe copiloot, een nieuw platform dat belooft je organisatie slimmer te maken. Maar achter die beloftes schuilt een fundamentele vraag die te weinig bestuurders stellen: waar gaat mijn data naartoe?'),

      h2('De ongemakkelijke waarheid'),

      p('Wanneer je ChatGPT Enterprise of Microsoft Copilot gebruikt, stromen je prompts, je documenten en je klantgegevens door infrastructuur die je niet beheert. Ja, ze beloven: "we trainen niet op jouw data." Maar je hebt geen enkele manier om dat te verifiëren. Je neemt het op goed vertrouwen aan van een Amerikaans techbedrijf dat kwartaalcijfers moet halen.'),

      p('En het gaat verder dan vertrouwen alleen. De EU AI Act — die nu gefaseerd in werking treedt — eist dat organisaties kunnen aantonen waar hun data verwerkt wordt, hoe AI-beslissingen tot stand komen, en welke waarborgen er zijn. "De cloud van Microsoft" is geen antwoord dat standhoudt in een audit.'),

      p('Ondertussen verzamelen deze platforms metadata die minstens zo waardevol is als de data zelf. Welke vragen stellen je medewerkers? Welke documenten raadplegen ze? Welke bedrijfsprocessen lopen vast? Dat is competitieve informatie die je weigert te delen met je concurrent, maar wél routinematig deelt met je AI-leverancier.'),

      p('De ironie is dat bedrijven miljoenen investeren in cybersecurity, firewalls en dataverschleuteling — om vervolgens hun meest gevoelige bedrijfsinformatie vrijwillig door te sluizen naar servers in Virginia.'),

      h2('Open-source is geen plan B'),

      p('Er leeft een hardnekkig misverstand dat open-source AI-modellen inferieur zijn. Dat was misschien waar in 2022. Het is aantoonbaar onwaar in 2025. Modellen als Llama, Mistral en Qwen presteren op veel zakelijke taken op hetzelfde niveau als hun gesloten tegenhangers. Voor specifieke, domeingerichte taken presteren ze vaak beter — omdat ze gefinetuned kunnen worden op jouw data, in jouw omgeving.'),

      p('De sleutel is RAG-architectuur: Retrieval-Augmented Generation. In plaats van het grootste model ter wereld nodig te hebben, heb je het juiste model nodig met toegang tot de juiste data. Een kleiner, gespecialiseerd model dat jouw ERP, CRM en documentatie kan doorzoeken geeft betere antwoorden dan GPT-4 zonder context.'),

      p('Open-source AI draaien in je eigen cloud geeft je vier fundamentele voordelen die geen enkele SaaS-oplossing kan evenaren:'),

      p('Volledige controle. Je bepaalt welke data het model ziet, hoe het verwerkt wordt, en waar het opgeslagen blijft. Geen verrassingen, geen kleine lettertjes, geen eenzijdige wijzigingen in de Terms of Service.'),

      p('Geen datalekkage. Je bedrijfsdata verlaat nooit je eigen omgeving. Niet naar een trainingsset, niet naar een logbestand, niet naar een analytics-dashboard van de leverancier.'),

      p('EU-compliance by design. Niet als een extra laag bovenop, maar als architecturele eigenschap. De data blijft in de EU, verwerking is transparant, en je kunt elke stap auditten.'),

      p('Geen vendor lock-in. Je bent niet afhankelijk van de prijsstrategie, de roadmap of de continuïteit van één leverancier. Open-source betekent keuzevrijheid — vandaag, morgen, en over vijf jaar.'),

      h2('Wat dit in de praktijk betekent'),

      p('Stel: een productiebedrijf met SAP als ERP, duizenden orders per maand, gevoelige klantdata en leveranciersovereenkomsten. Ze willen dat medewerkers in natuurlijke taal vragen kunnen stellen over orderstatus, levertijden en voorraadbeheer.'),

      p('De gangbare route: Microsoft Copilot of een ChatGPT-integratie. Resultaat: alle SAP-data stroomt naar externe servers. Elke vraag die een medewerker stelt — "Hoe staat het met de order van Klant X?" — gaat met context en al door Amerikaanse infrastructuur.'),

      p('De BEP-route: het AI-model draait IN hun eigen Azure- of AWS-omgeving. De data verlaat nooit het bedrijfsnetwerk. Het model is open-source en auditeerbaar — de klant kan letterlijk de broncode inzien. EU AI Act-compliance is ingebouwd, niet erop geplakt als afterthought.'),

      p('Het verschil is niet subtiel. Het is architectureel. En architecturele keuzes zijn de keuzes die je vijf jaar later nog voelt.'),

      p('We zien al dat de eerste bedrijven terugkrabbelen van hun Copilot-implementaties. Niet omdat het niet werkt, maar omdat compliance-afdelingen lastige vragen gaan stellen. Vragen die makkelijker te beantwoorden zijn als je data nooit je eigen muren heeft verlaten.'),

      richBlock(
        [
          span('Datasoevereiniteit is geen feature. Het is een fundamentele architectuurkeuze. Eenmaal gemaakt volgt al het andere vanzelf. '),
          span('De vraag is niet of je het je kunt veroorloven om in datasoevereiniteit te investeren. De vraag is of je het je kunt veroorloven om het niet te doen.', ['strong']),
        ]
      ),
    ],
    bodyEn: [
      p('Every AI vendor wants your data. Microsoft, Google, OpenAI — they all need your business data to train better models. That\'s their business model. Yours shouldn\'t be feeding it.'),

      p('We live in a time when AI tools are popping up everywhere. Every week brings a new integration, a new copilot, a new platform promising to make your organization smarter. But behind those promises lies a fundamental question too few executives are asking: where does my data actually go?'),

      h2('The uncomfortable truth'),

      p('When you use ChatGPT Enterprise or Microsoft Copilot, your prompts, your documents, and your client data flow through infrastructure you don\'t control. Yes, they promise: "we don\'t train on your data." But you have no way to verify that. You\'re taking it on faith from an American tech company that needs to hit quarterly earnings.'),

      p('And it goes beyond trust. The EU AI Act — now being phased into effect — requires organizations to demonstrate where their data is processed, how AI decisions are made, and what safeguards exist. "Microsoft\'s cloud" is not an answer that holds up in an audit.'),

      p('Meanwhile, these platforms collect metadata that\'s at least as valuable as the data itself. What questions do your employees ask? What documents do they consult? Which business processes get stuck? That\'s competitive intelligence you\'d refuse to share with a competitor, yet routinely share with your AI vendor.'),

      p('The irony is that companies invest millions in cybersecurity, firewalls, and data encryption — only to voluntarily funnel their most sensitive business information through servers in Virginia.'),

      h2('Open-source is not plan B'),

      p('There\'s a persistent misconception that open-source AI models are inferior. That might have been true in 2022. It\'s demonstrably false in 2025. Models like Llama, Mistral, and Qwen perform at the same level as their closed counterparts on many business tasks. For specific, domain-focused tasks, they often perform better — because they can be fine-tuned on your data, in your environment.'),

      p('The key is RAG architecture: Retrieval-Augmented Generation. Instead of needing the biggest model in the world, you need the right model with access to the right data. A smaller, specialized model that can search through your ERP, CRM, and documentation gives better answers than GPT-4 without context.'),

      p('Running open-source AI in your own cloud gives you four fundamental advantages that no SaaS solution can match:'),

      p('Full control. You determine what data the model sees, how it\'s processed, and where it stays. No surprises, no fine print, no unilateral changes to the Terms of Service.'),

      p('No data leakage. Your business data never leaves your own environment. Not into a training set, not into a log file, not into the vendor\'s analytics dashboard.'),

      p('EU compliance by design. Not as an extra layer on top, but as an architectural property. Data stays in the EU, processing is transparent, and you can audit every step.'),

      p('No vendor lock-in. You\'re not dependent on the pricing strategy, roadmap, or continuity of a single vendor. Open-source means freedom of choice — today, tomorrow, and five years from now.'),

      h2('What this means in practice'),

      p('Consider: a manufacturing company running SAP as their ERP, processing thousands of orders monthly, handling sensitive client data and supplier agreements. They want employees to ask natural-language questions about order status, delivery times, and inventory management.'),

      p('The conventional route: Microsoft Copilot or a ChatGPT integration. Result: all SAP data flows to external servers. Every question an employee asks — "What\'s the status of Client X\'s order?" — travels with full context through American infrastructure.'),

      p('The BEP route: the AI model runs IN their own Azure or AWS environment. The data never leaves the company network. The model is open-source and auditable — the client can literally inspect the source code. EU AI Act compliance is built in, not bolted on as an afterthought.'),

      p('The difference isn\'t subtle. It\'s architectural. And architectural choices are the ones you still feel five years later.'),

      p('We\'re already seeing the first companies walk back their Copilot deployments. Not because they don\'t work, but because compliance departments are asking tough questions. Questions that are much easier to answer when your data has never left your own walls.'),

      richBlock(
        [
          span('Data sovereignty isn\'t a feature. It\'s a fundamental architectural choice. Once you make it, everything else follows. '),
          span('The question isn\'t whether you can afford to invest in data sovereignty. It\'s whether you can afford not to.', ['strong']),
        ]
      ),
    ],
  },

  // ── Blog 3: De Kenniscrisis ─────────────────────────────────────────
  {
    _id: 'local-kenniscrisis',
    title: 'De kenniscrisis die niemand ziet aankomen',
    titleEn: 'The knowledge crisis nobody sees coming',
    slug: { current: 'kenniscrisis' },
    author: 'Sven Hulstein',
    publishedAt: '2025-04-18T09:00:00Z',
    category: 'business',
    excerpt: 'In 2030 gaat 30% van de beroepsbevolking met pensioen. Hun kennis gaat mee. De meeste bedrijven hebben geen plan.',
    excerptEn: 'By 2030, 30% of the workforce will retire. Their knowledge goes with them. Most companies have no plan.',
    body: [
      p('Stel je voor: je beste productieplanner gaat met pensioen na 28 jaar. Hij weet welke leveranciers te laat leveren in de zomer. Hij weet welke machine extra koeling nodig heeft op vochtige dagen. Hij weet welke klant altijd op het laatste moment zijn bestelling wijzigt. Niets daarvan staat in enig systeem.'),

      p('Dit is geen hypothetisch scenario. Dit is de realiteit in vrijwel elk productiebedrijf, elke logistieke organisatie, elk ingenieursbureau in Nederland. De mensen die de organisatie draaiende houden, zijn dezelfde mensen die over drie tot vijf jaar vertrekken. En hun kennis vertrekt met ze.'),

      p('We noemen het de vergrijzing. We hebben het over arbeidsmarktkrapte en pensioenleeftijden. Maar over het echte probleem — het verdampen van decennia aan opgebouwde bedrijfskennis — hebben we het nauwelijks.'),

      h2('Het stille vertrek van kennis'),

      p('Elke organisatie heeft ze. De mensen die iedereen belt als er iets misgaat. De operator die aan het geluid van een machine hoort of de lagers versleten zijn. De projectleider die precies weet welk subcontract bij welk type project problemen oplevert. De accountmanager die de ongeschreven regels van de top-20 klanten kent.'),

      p('Hun kennis zit niet in het ERP. Niet in de documentatie. Niet in de procedures. Het zit in hun hoofd — in patronen die ze in tientallen jaren hebben ontwikkeld, in relaties tussen informatie die ze intuïtief leggen, in uitzonderingen die ze kennen omdat ze ze hebben meegemaakt.'),

      p('Wanneer zo iemand vertrekt, vertrekt dat allemaal mee. De opvolger begint op nul. Maakt dezelfde fouten. Ontdekt dezelfde uitzonderingen. Leergeld dat de organisatie al een keer heeft betaald, wordt opnieuw betaald. En opnieuw. En opnieuw.'),

      p('De kosten hiervan zijn enorm maar onzichtbaar. Ze verschijnen niet op de balans als "verloren kennis." Ze manifesteren zich als langere doorlooptijden, meer fouten, tragere onboarding, gedaalde klanttevredenheid. Dood door duizend sneden.'),

      h2('Documentatie is niet het antwoord'),

      p('De voor de hand liggende reactie: "Dan documenteren we toch alles?" Elke paar jaar lanceert er wel een organisatie een documentatieproject. De senior medewerkers worden gevraagd hun kennis op te schrijven. Er worden templates gemaakt, wiki\'s ingericht, handleidingen geschreven.'),

      p('Het resultaat, zonder uitzondering: 200 pagina\'s die niemand leest. Verouderd na drie maanden. Onvindbaar na zes. Het probleem is niet dat mensen niet willen documenteren. Het probleem is dat kennis geen document is.'),

      p('Echte bedrijfskennis is context. Het is nuance. Het is de relatie tussen twee stukken informatie die op papier niets met elkaar te maken hebben, maar in de praktijk alles. "Als leverancier Y zijn levertijd met meer dan twee dagen overschrijdt in het derde kwartaal, heeft dat impact op de productielijn van Klant Z, want die draait dan op minimale voorraad vanwege hun eigen seizoenspatroon." Probeer dát maar eens in een Word-document te vangen.'),

      p('Documentatie is statisch. Kennis is dynamisch. Een document is een foto. Kennis is een film die continu wordt bijgewerkt.'),

      h2('Kennis activeren, niet archiveren'),

      p('BEP kiest voor een fundamenteel andere benadering. In plaats van mensen te dwingen hun kennis op te schrijven — een proces dat altijd faalt — leert BEP van hoe mensen werken.'),

      p('BEP indexeert e-mails, documenten, beslissingen, gespreksnotities — uiteraard met toestemming en binnen de kaders van privacywetgeving. Het maakt niet één document. Het creëert een levende kennisbasis die groeit terwijl mensen gewoon hun werk doen. Geen apart project. Geen extra administratie. Kennis die zich organisch opbouwt.'),

      p('Wanneer een nieuwe medewerker een vraag stelt die de vertrokken senior in twee seconden had beantwoord, geeft BEP datzelfde antwoord — met de context, de nuance en de bronnen erbij. Niet omdat iemand het heeft opgeschreven, maar omdat BEP het heeft geleerd uit jaren aan data en interacties.'),

      p('Het verschil met traditionele kennismanagementsystemen is fundamenteel. Die systemen verwachten dat mensen hun werkwijze aanpassen om het systeem te voeden. BEP past zich aan de werkwijze van mensen aan en leert terwijl zij werken.'),

      h2('De urgentie is nu'),

      p('De demografische cijfers liegen niet. In Nederland gaat de komende tien jaar bijna een derde van de beroepsbevolking met pensioen. In technische sectoren als productie, engineering en logistiek is dat percentage nog hoger. De vervanging komt er niet — althans niet in dezelfde aantallen.'),

      p('Bedrijven die nu beginnen met het activeren van hun bedrijfskennis hebben drie tot vijf jaar om de kennisbasis op te bouwen. Dat klinkt als veel tijd, maar het is dat niet. Een AI-systeem dat bedrijfskennis moet absorberen heeft tijd nodig om te leren, te trainen en betrouwbaar te worden. Hoe eerder je begint, hoe rijker de kennisbasis wanneer de pensioneringsgolf piekt.'),

      p('Bedrijven die wachten, bouwen straks vanaf nul op. Met minder mensen, minder ervaring en minder tijd. Dat is geen voorspelling. Dat is wiskunde.'),

      richBlock(
        [
          span('De vraag is niet of je het je kunt veroorloven om in kennisbehoud te investeren. '),
          span('De vraag is of je het je kunt veroorloven om het niet te doen.', ['strong']),
          span(' Over vijf jaar is het antwoord pijnlijk duidelijk. De organisaties die nu handelen, zijn de organisaties die straks hun concurrentiepositie behouden.'),
        ]
      ),
    ],
    bodyEn: [
      p('Picture this: your best production planner retires after 28 years. He knows which suppliers deliver late in summer. He knows which machine needs extra cooling on humid days. He knows which client always changes their order at the last minute. None of that is in any system.'),

      p('This isn\'t a hypothetical scenario. This is the reality in virtually every manufacturing company, every logistics organization, every engineering firm in the Netherlands. The people who keep the organization running are the same people leaving in three to five years. And their knowledge leaves with them.'),

      p('We call it the aging workforce. We talk about labor shortages and retirement ages. But about the real problem — the evaporation of decades of accumulated business knowledge — we barely speak.'),

      h2('The silent departure of knowledge'),

      p('Every organization has them. The people everyone calls when something goes wrong. The operator who can hear from the sound of a machine whether the bearings are worn. The project manager who knows exactly which subcontractor causes problems with which type of project. The account manager who knows the unwritten rules of the top 20 clients.'),

      p('Their knowledge isn\'t in the ERP. Not in the documentation. Not in the procedures. It\'s in their heads — in patterns they\'ve developed over decades, in relationships between information they draw intuitively, in exceptions they know because they\'ve lived through them.'),

      p('When someone like that leaves, all of it leaves too. The successor starts from zero. Makes the same mistakes. Discovers the same exceptions. Tuition the organization already paid once gets paid again. And again. And again.'),

      p('The cost of this is enormous but invisible. It doesn\'t appear on the balance sheet as "lost knowledge." It manifests as longer lead times, more errors, slower onboarding, declining customer satisfaction. Death by a thousand cuts.'),

      h2('Documentation is not the answer'),

      p('The obvious reaction: "Let\'s just document everything." Every few years, some organization launches a documentation project. Senior employees are asked to write down their knowledge. Templates are created, wikis set up, manuals written.'),

      p('The result, without exception: 200 pages nobody reads. Outdated after three months. Unfindable after six. The problem isn\'t that people don\'t want to document. The problem is that knowledge isn\'t a document.'),

      p('Real business knowledge is context. It\'s nuance. It\'s the relationship between two pieces of information that on paper have nothing to do with each other, but in practice have everything. "If Supplier Y exceeds their delivery time by more than two days in Q3, it impacts Client Z\'s production line, because they\'re running on minimal inventory due to their own seasonal pattern." Try capturing that in a Word document.'),

      p('Documentation is static. Knowledge is dynamic. A document is a photograph. Knowledge is a film that\'s continuously being updated.'),

      h2('Activating knowledge, not archiving it'),

      p('BEP takes a fundamentally different approach. Instead of forcing people to write down their knowledge — a process that always fails — BEP learns from how people work.'),

      p('BEP indexes emails, documents, decisions, conversation notes — with permission and within privacy regulations, of course. It doesn\'t create one document. It builds a living knowledge base that grows while people simply do their jobs. No separate project. No extra administration. Knowledge that builds organically.'),

      p('When a new employee asks a question the departed senior would have answered in two seconds, BEP gives that same answer — with the context, the nuance, and the sources. Not because someone wrote it down, but because BEP learned it from years of data and interactions.'),

      p('The difference from traditional knowledge management systems is fundamental. Those systems expect people to change their way of working to feed the system. BEP adapts to how people work and learns while they do.'),

      h2('The urgency is now'),

      p('The demographics don\'t lie. In the Netherlands, nearly a third of the workforce will retire in the next ten years. In technical sectors like manufacturing, engineering, and logistics, that percentage is even higher. The replacements aren\'t coming — at least not in the same numbers.'),

      p('Companies that start activating their business knowledge now have three to five years to build the knowledge base. That sounds like a lot of time, but it isn\'t. An AI system that needs to absorb business knowledge takes time to learn, train, and become reliable. The sooner you start, the richer the knowledge base when the retirement wave peaks.'),

      p('Companies that wait will be rebuilding from scratch. With fewer people, less experience, and less time. That\'s not a prediction. That\'s math.'),

      richBlock(
        [
          span('The question isn\'t whether you can afford to invest in knowledge retention. '),
          span('The question is whether you can afford not to.', ['strong']),
          span(' In five years, the answer will be painfully clear. The organizations that act now are the ones that will maintain their competitive edge.'),
        ]
      ),
    ],
  },

  // ── Blog 4: Data, niet AI ───────────────────────────────────────────
  {
    _id: 'local-data-niet-ai',
    title: 'AI is niet het antwoord. De juiste data is het antwoord.',
    titleEn: 'AI is not the answer. The right data is the answer.',
    slug: { current: 'data-niet-ai' },
    author: 'Berco Beute',
    publishedAt: '2025-05-06T09:00:00Z',
    category: 'ai',
    excerpt: 'Elke organisatie wil AI. Bijna niemand heeft de datafundering om er iets zinvols mee te doen. Het probleem is niet de technologie — het is de data-chaos eronder.',
    excerptEn: 'Every organization wants AI. Almost nobody has the data foundation to do anything meaningful with it. The problem isn\'t the technology — it\'s the data chaos underneath.',
    body: [
      p('In elke bestuurskamer in Nederland vraagt iemand: "Wat doen wij met AI?" Het eerlijke antwoord voor de meeste bedrijven: tools kopen die niemand gebruikt, omdat het onderliggende probleem niet is opgelost.'),

      p('Het is de vraag van het moment. Op elk congres, in elk managementoverleg, in elke strategiesessie. AI is het toverwoord geworden voor modernisering, efficiëntie en concurrentiekracht. Maar tussen de belofte en de werkelijkheid gaapt een kloof die de meeste organisaties liever niet bekijken.'),

      h2('Het AI-hype probleem'),

      p('Bedrijven adopteren ChatGPT, Copilot, Gemini. Medewerkers gebruiken het voor e-mail en samenvattingen. Handig, zeker. Maar de échte bedrijfsvragen — "Hoe staat het met de order van Van der Berg?", "Welke leverancier gaf ons vorig jaar de beste prijzen?", "Hoeveel openstaande offertes hebben we boven de 100K?" — blijven onbeantwoord.'),

      p('Omdat de AI geen toegang heeft tot de data.'),

      p('Dat is het punt dat in vrijwel elke AI-strategie gemist wordt. Het probleem is niet het model. GPT-4, Claude, Gemini — ze zijn allemaal indrukwekkend intelligent. Het probleem is dat ze blind zijn. Ze hebben geen idee wat er in jouw ERP staat, wat er in je CRM leeft, welke afspraken er in mailthreads begraven liggen. Ze zijn briljante experts in een donkere kamer.'),

      p('De tools die bedrijven nu kopen, zijn in essentie dure autoaanvulling. Ze maken tekst mooier, ze vatten vergaderingen samen, ze genereren presentatieslides. Nuttig? Ja. Transformatief? Nee. Want de fundamentele bedrijfsvragen blijven handwerk.'),

      h2('Garbage in, genius out? Nee.'),

      p('AI is exact zo goed als de data die het kan bereiken. En in de meeste bedrijven is data verspreid over vijf tot vijftien systemen die niet met elkaar communiceren.'),

      p('Het ERP weet alles over orders en voorraden, maar niets over klantrelaties. Het CRM kent de klanthistorie, maar ziet geen financiële data. De projecttool beheert uren en deadlines, maar weet niets over de bijbehorende contracten. De documenten staan op SharePoint, de afspraken in Outlook, de kennisdocumenten op een gedeelde schijf die drie mensen kennen.'),

      p('Elke bron op zich bevat waardevolle informatie. Maar de echte waarde zit in de verbindingen — en die bestaan niet. Een medewerker die wil weten of een klant een goede kandidaat is voor upselling, moet het CRM checken voor contacthistorie, het ERP voor ordervolume, de inbox voor recente communicatie, en het hoofd van de accountmanager voor het sentiment. Vier bronnen, nul integratie.'),

      p('Geen enkel AI-model, hoe geavanceerd ook, lost dat op. Je kunt het slimste brein ter wereld in een bibliotheek zetten, maar als alle boeken in kluizen liggen waar het de code niet van kent, krijg je geen antwoorden.'),

      h2('Eerst verbinden, dan verslimmen'),

      p('De echte revolutie is niet AI — het is dataverbinding. RAG-architectuur (Retrieval-Augmented Generation) werkt door eerst alle databronnen te verbinden en dan AI daaroverheen te laten bevragen. Het AI-model is bijna secundair. Wat er écht toe doet is het dataweefsel eronder.'),

      p('Dit is een ongemakkelijke boodschap voor bedrijven die net een AI-strategie hebben gepresenteerd. Maar het is de waarheid. Zonder verbonden data is je AI-investering een motor zonder brandstof. Indrukwekkende specificaties, nul kilometers.'),

      p('BEP begint daarom niet bij het model. BEP begint bij de data. Welke bronnen heb je? Hoe zijn ze gestructureerd? Waar zitten de overlappingen en de gaten? Welke verbindingen moeten er gelegd worden om echte bedrijfsvragen te beantwoorden?'),

      p('Pas als dat dataweefsel staat — pas als de informatie uit ERP, CRM, e-mail, documenten en databases als één geheel bevraagbaar is — wordt AI transformatief. Dan gaat het niet meer om tekst genereren. Dan gaat het om bedrijfsintelligentie.'),

      h2('Wat dit er anders uitziet'),

      p('Een bedrijf met verbonden data vraagt: "Toon me alle klanten in de bouwsector met openstaande orders boven de 50.000 euro en een betalingshistorie langer dan 90 dagen." En krijgt binnen seconden een antwoord.'),

      p('Niet omdat de AI slimmer is. Maar omdat het toegang heeft tot alle relevante data. Het ERP levert de orderinformatie. Het CRM levert de sectorclassificatie. De financiële administratie levert de betalingshistorie. De AI combineert, analyseert en presenteert — maar het dataweefsel maakt het mogelijk.'),

      p('Vergelijk dat met de huidige realiteit in de meeste bedrijven: iemand van sales mailt finance om een overzicht, finance exporteert een Excel uit het ERP, sales filtert handmatig, en twee dagen later heb je een antwoord dat al verouderd is op het moment dat je het krijgt. Dat is geen efficiëntieprobleem. Dat is een dataprobleem.'),

      p('En het gaat verder dan rapportages. Met verbonden data kan AI proactief worden. Het signaleert klanten die dreigen af te haken voordat iemand erom vraagt. Het identificeert leveranciers die systematisch te laat leveren. Het ziet patronen in offertes die leiden tot conversie en patronen die leiden tot verlies. Allemaal onmogelijk zonder het dataweefsel.'),

      richBlock(
        [
          span('Stop met de vraag "welke AI-tool moeten we kopen?" '),
          span('Begin met de vraag: "Is onze data verbonden genoeg om welke AI-tool dan ook nuttig te maken?"', ['strong']),
          span(' Het antwoord op die tweede vraag bepaalt of je AI-investering rendeert of verdampt. De technologie is er. De modellen zijn er. Het enige dat ontbreekt bij de meeste organisaties is de fundering eronder.'),
        ]
      ),
    ],
    bodyEn: [
      p('In every boardroom in the Netherlands, someone is asking: "What are we doing with AI?" The honest answer for most companies: buying tools nobody uses, because the underlying problem hasn\'t been solved.'),

      p('It\'s the question of the moment. At every conference, in every management meeting, in every strategy session. AI has become the magic word for modernization, efficiency, and competitive advantage. But between the promise and reality lies a gap most organizations would rather not examine.'),

      h2('The AI hype problem'),

      p('Companies adopt ChatGPT, Copilot, Gemini. Employees use them for email and summaries. Useful, certainly. But the real business questions — "What\'s the status of the Van der Berg order?", "Which supplier gave us the best prices last year?", "How many open proposals do we have above 100K?" — remain unanswered.'),

      p('Because the AI doesn\'t have access to the data.'),

      p('That\'s the point missed in virtually every AI strategy. The problem isn\'t the model. GPT-4, Claude, Gemini — they\'re all impressively intelligent. The problem is that they\'re blind. They have no idea what\'s in your ERP, what lives in your CRM, what agreements are buried in email threads. They\'re brilliant experts in a dark room.'),

      p('The tools companies are buying now are essentially expensive autocomplete. They make text prettier, they summarize meetings, they generate presentation slides. Useful? Yes. Transformative? No. Because the fundamental business questions remain manual work.'),

      h2('Garbage in, genius out? No.'),

      p('AI is only as good as the data it can access. And in most companies, data is scattered across five to fifteen systems that don\'t communicate with each other.'),

      p('The ERP knows everything about orders and inventory but nothing about customer relationships. The CRM knows the client history but can\'t see financial data. The project tool manages hours and deadlines but knows nothing about the associated contracts. Documents live on SharePoint, appointments in Outlook, knowledge documents on a shared drive that three people know about.'),

      p('Each source contains valuable information on its own. But the real value lies in the connections — and those don\'t exist. An employee who wants to know if a client is a good candidate for upselling needs to check the CRM for contact history, the ERP for order volume, the inbox for recent communication, and the account manager\'s head for sentiment. Four sources, zero integration.'),

      p('No AI model, however advanced, solves that. You can put the smartest brain in the world in a library, but if all the books are locked in safes it doesn\'t have the codes to, you won\'t get answers.'),

      h2('Connect first, then get smart'),

      p('The real revolution isn\'t AI — it\'s data connection. RAG architecture (Retrieval-Augmented Generation) works by first connecting all data sources, then letting AI query across them. The AI model is almost secondary. What truly matters is the data fabric underneath.'),

      p('This is an uncomfortable message for companies that just presented an AI strategy. But it\'s the truth. Without connected data, your AI investment is an engine without fuel. Impressive specifications, zero mileage.'),

      p('That\'s why BEP doesn\'t start with the model. BEP starts with the data. What sources do you have? How are they structured? Where are the overlaps and gaps? What connections need to be made to answer real business questions?'),

      p('Only when that data fabric is in place — only when information from ERP, CRM, email, documents, and databases can be queried as one whole — does AI become transformative. Then it\'s no longer about generating text. It\'s about business intelligence.'),

      h2('What this looks like in practice'),

      p('A company with connected data asks: "Show me all clients in the construction sector with open orders above 50,000 euros and a payment history longer than 90 days." And gets an answer within seconds.'),

      p('Not because the AI is smarter. But because it has access to all the relevant data. The ERP provides order information. The CRM provides sector classification. The financial administration provides payment history. The AI combines, analyzes, and presents — but the data fabric makes it possible.'),

      p('Compare that to the current reality in most companies: someone from sales emails finance for an overview, finance exports an Excel from the ERP, sales filters manually, and two days later you have an answer that\'s already outdated the moment you receive it. That\'s not an efficiency problem. That\'s a data problem.'),

      p('And it goes beyond reporting. With connected data, AI can become proactive. It flags clients at risk of churning before anyone asks. It identifies suppliers who systematically deliver late. It spots patterns in proposals that lead to conversion and patterns that lead to loss. All impossible without the data fabric.'),

      richBlock(
        [
          span('Stop asking "which AI tool should we buy?" '),
          span('Start asking: "Is our data connected enough to make any AI tool useful?"', ['strong']),
          span(' The answer to that second question determines whether your AI investment pays off or evaporates. The technology is there. The models are there. The only thing missing at most organizations is the foundation underneath.'),
        ]
      ),
    ],
  },
]
