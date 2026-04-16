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
                <div className="np-price">€595 <span>/{t('maand', 'month')}</span></div>
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
                <Link href="/contact" className="np-cta" aria-label={t('Plan een demo voor Start', 'Schedule a demo for Start')}>{t('Plan een demo →', 'Schedule a demo →')}</Link>
              </div>
            </FadeUp>

            {/* TEAM */}
            <FadeUp delay={0.1}>
              <div className="np-card featured">
                <div className="np-badge">{t('Meest gekozen', 'Most popular')}</div>
                <div className="np-card-name">{t('Team', 'Team')}</div>
                <div className="np-price">€1.250 <span>/{t('maand', 'month')}</span></div>
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
                <Link href="/contact" className="np-cta" aria-label={t('Plan een demo voor Team', 'Schedule a demo for Team')}>{t('Plan een demo →', 'Schedule a demo →')}</Link>
              </div>
            </FadeUp>

            {/* GROWTH */}
            <FadeUp delay={0.15}>
              <div className="np-card">
                <div className="np-card-name">{t('Growth', 'Growth')}</div>
                <div className="np-price">€2.500 <span>/{t('maand', 'month')}</span></div>
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
                <Link href="/contact" className="np-cta" aria-label={t('Plan een demo voor Growth', 'Schedule a demo for Growth')}>{t('Plan een demo →', 'Schedule a demo →')}</Link>
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
                <p className="np-section-label">{t('Ideaal voor', 'Ideal for')}</p>
                <ul className="np-features ideaal">
                  <li>{t('organisatiebrede uitrol', 'organization-wide rollout')}</li>
                  <li>{t('strategisch AI-platform', 'strategic AI platform')}</li>
                  <li>{t('enterprise governance', 'enterprise governance')}</li>
                </ul>
                <Link href="/contact" className="np-cta" aria-label={t('Neem contact op voor Platform', 'Get in touch for Platform')}>{t('Neem contact op →', 'Get in touch →')}</Link>
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
              <FadeUp key={addon.name} delay={i * 0.05}>
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
              {t('We laten je in 2 tot 4 weken live gaan op één domein,', 'We get you live in 2 to 4 weeks on one domain,')}<br />
              {t('met echte data en een eerste koppeling.', 'with real data and a first integration.')}
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
