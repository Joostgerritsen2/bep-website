'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { Check, ArrowRight } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    price: '499',
    descriptionNl: 'Ideaal om te starten met AI-bedrijfskennis',
    descriptionEn: 'Ideal to start with AI business knowledge',
    featured: false,
    features: [
      { nl: 'Tot 1.000 documenten', en: 'Up to 1,000 documents' },
      { nl: '5 gebruikers', en: '5 users' },
      { nl: '3 systeemkoppelingen', en: '3 system integrations' },
      { nl: 'Kennisbank + Zoeken', en: 'Knowledge base + Search' },
      { nl: 'E-mail support', en: 'Email support' },
      { nl: '100% eigen cloud', en: '100% your own cloud' },
    ],
  },
  {
    name: 'Professional',
    price: '1.099',
    descriptionNl: 'Voor groeiende organisaties die meer willen',
    descriptionEn: 'For growing organizations that want more',
    featured: true,
    features: [
      { nl: 'Tot 10.000 documenten', en: 'Up to 10,000 documents' },
      { nl: '20 gebruikers', en: '20 users' },
      { nl: 'Onbeperkt koppelingen', en: 'Unlimited integrations' },
      { nl: 'Kennisbank + Zoeken + Taken', en: 'Knowledge base + Search + Tasks' },
      { nl: 'Taakuitvoering (CRM, e-mail, ERP)', en: 'Task execution (CRM, email, ERP)' },
      { nl: 'Prioriteit support', en: 'Priority support' },
      { nl: '100% eigen cloud', en: '100% your own cloud' },
    ],
  },
  {
    name: 'Enterprise',
    price: '3.900+',
    descriptionNl: 'Voor grote organisaties met complexe eisen',
    descriptionEn: 'For large organizations with complex requirements',
    featured: false,
    features: [
      { nl: '500.000+ documenten', en: '500,000+ documents' },
      { nl: 'Onbeperkt gebruikers', en: 'Unlimited users' },
      { nl: 'Onbeperkt koppelingen', en: 'Unlimited integrations' },
      { nl: 'Alle functionaliteit', en: 'All functionality' },
      { nl: 'Custom workflows', en: 'Custom workflows' },
      { nl: 'Dedicated support & SLA', en: 'Dedicated support & SLA' },
      { nl: 'On-premise optie', en: 'On-premise option' },
      { nl: 'SSO / SAML', en: 'SSO / SAML' },
    ],
  },
]

export function PricingContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      <section className="section section-white" style={{ paddingTop: 140 }}>
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">Pricing</span>
              <h1>{t('Eenvoudige, transparante pricing', 'Simple, transparent pricing')}</h1>
              <p>
                {t(
                  'Kies het pakket dat bij je organisatie past. Altijd 100% in je eigen cloud.',
                  'Choose the plan that fits your organization. Always 100% in your own cloud.'
                )}
              </p>
            </div>
          </FadeUp>

          <div className="pricing-grid">
            {tiers.map((tier, i) => (
              <FadeUp key={tier.name} delay={i * 0.1}>
                <div className={`pricing-card ${tier.featured ? 'featured' : ''}`}>
                  <div className="pricing-card-name">{tier.name}</div>
                  <div className="pricing-card-price">
                    €{tier.price} <span>/mo</span>
                  </div>
                  <p className="pricing-card-description">
                    {t(tier.descriptionNl, tier.descriptionEn)}
                  </p>
                  <ul className="pricing-features">
                    {tier.features.map((feature, j) => (
                      <li key={j}>
                        <Check size={16} />
                        {t(feature.nl, feature.en)}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className={`btn btn-arrow ${tier.featured ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {t('Plan een demo', 'Schedule a demo')}
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <FadeUp>
            <h2>{t('Niet zeker welk pakket?', 'Not sure which plan?')}</h2>
            <p>
              {t(
                'Ontdek in 2 minuten wat BEP voor jouw organisatie kan betekenen.',
                'Discover in 2 minutes what BEP can do for your organization.'
              )}
            </p>
            <a href="/contact" className="btn btn-white btn-arrow">
              {t('Plan een demo', 'Schedule a demo')}
            </a>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
