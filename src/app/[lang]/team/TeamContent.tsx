'use client'
import { useLang } from '@/lib/language'
import { FadeUp, FadeUpContainer } from '@/components/FadeUp'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const teamMembers = [
  {
    image: '/images/team-member-2.png',
    name: 'Berco Beute',
    role: 'Strategie & Klant',
    roleEn: 'Strategy & Client',
    bioNl: 'Verbindt visie, technologie en klantvraag. Zorgt dat BEP niet alleen technisch sterk is, maar ook echt aansluit op hoe organisaties werken en waar zij waarde willen realiseren.',
    bioEn: 'Connects vision, technology and client needs. Ensures BEP is not only technically strong, but also truly aligned with how organisations work and where they want to create value.',
  },
  {
    image: '/images/team-member-3.png',
    name: 'Sven Vintges',
    role: 'Techniek',
    roleEn: 'Engineering',
    bioNl: 'Bouwt aan de technische basis van BEP. Zorgt dat Agents betrouwbaar werken, goed integreren met bestaande systemen en veilig omgaan met bedrijfsdata.',
    bioEn: 'Builds the technical foundation of BEP. Ensures Agents work reliably, integrate well with existing systems and handle business data securely.',
  },
  {
    image: '/images/team-member-6.png',
    name: 'Jelle Klaver',
    role: 'Product',
    roleEn: 'Product',
    bioNl: 'Maakt van complexe technologie een product dat duidelijk en bruikbaar is in de praktijk. Zorgt dat BEP logisch werkt voor gebruikers en past binnen dagelijkse processen.',
    bioEn: 'Turns complex technology into a product that is clear and usable in practice. Ensures BEP works intuitively for users and fits within daily processes.',
  },
  {
    image: '/images/team-member-1.png',
    name: 'Sietse van der Laan',
    role: 'Operations',
    roleEn: 'Operations',
    bioNl: 'Zorgt dat plannen strak worden uitgevoerd en dat implementaties goed georganiseerd verlopen. Houdt overzicht op voortgang, afstemming en dagelijkse operatie.',
    bioEn: 'Ensures plans are executed tightly and implementations are well organised. Maintains oversight of progress, alignment and day-to-day operations.',
  },
  {
    image: '/images/team-member-4.png',
    name: 'Jeroen Broekema',
    role: 'Partnerships & Inspiratie',
    roleEn: 'Partnerships & Inspiration',
    bioNl: 'Bouwt aan samenwerkingen, geeft inspiratie en helpt organisaties scherp te krijgen waar BEP het meeste verschil maakt. Vertaalt kansen naar concrete toepassingen.',
    bioEn: 'Builds partnerships, provides inspiration and helps organisations identify where BEP makes the most difference. Translates opportunities into concrete applications.',
  },
]

export function TeamContent() {
  const { t } = useLang()

  return (
    <FadeUpContainer>
      {/* ===== HERO ===== */}
      <section className="hero dark-glow">
        <div className="container">
          <FadeUp>
            <span className="section-label">{t('Over ons', 'About us')}</span>
            <h1>
              {t('Het team achter ', 'The team behind ')}
              <span className="highlight">BEP</span>
            </h1>
            <p className="subtitle">
              {t(
                'Wij bouwen een AI-platform met Agents voor je hele organisatie. Met een mix van 30 jaar ervaring in AI, techniek, product en business.',
                'We build an AI platform with Agents for your entire organisation. With a mix of 30 years of experience in AI, engineering, product and business.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section section-white">
        <div className="container">
          <div className="solution-content">
            <FadeUp>
              <Image
                src="/images/team-duo.png"
                alt={t('Het BEP team', 'The BEP team')}
                width={500}
                height={400}
                style={{ objectFit: 'cover', borderRadius: 0 }}
              />
            </FadeUp>
            <FadeUp delay={0.2}>
              <div>
                <span className="section-label">{t('Ons verhaal', 'Our story')}</span>
                <h2>{t('Gebouwd door mensen die het snappen', 'Built by people who get it')}</h2>
                <p>
                  {t(
                    'Met een mix van 30 jaar ervaring in AI, techniek, product en business helpen we organisaties om AI bruikbaar te maken in het dagelijkse werk — in meerdere teams en processen. Van inspiratie tot werkende oplossing. Wij helpen je van A tot Z.',
                    'With a mix of 30 years of experience in AI, engineering, product and business, we help organisations make AI usable in daily work — across multiple teams and processes. From inspiration to working solution. We help you from A to Z.'
                  )}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== TEAM GRID ===== */}
      <section className="section section-gray">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <span className="section-label">{t('Het team', 'The team')}</span>
              <h2>{t('De mensen achter BEP', 'The people behind BEP')}</h2>
            </div>
          </FadeUp>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.1}>
                <div className="team-card">
                  <Image
                    className="team-card-photo"
                    src={member.image}
                    alt={member.name}
                    width={72}
                    height={72}
                    style={{ objectFit: 'cover', borderRadius: 0 }}
                  />
                  <div className="team-card-info">
                    <h3>{member.name}</h3>
                    <div className="role">{t(member.role, member.roleEn)}</div>
                    <p className="team-card-bio">{t(member.bioNl, member.bioEn)}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FRONTIERS ===== */}
      <div className="team-frontiers-wrap">
        <FadeUp>
          <Image
            src="/images/aigrunn-event.jpg"
            alt="AIGrunn developer conference"
            width={1400}
            height={480}
            className="team-frontiers-photo"
            style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          />
        </FadeUp>
        <div className="team-frontiers-bar">
          <div className="team-frontiers-inner">
            <FadeUp>
              <span className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {t('Waar we zijn', 'Where we are')}
              </span>
              <h2 className="team-frontiers-title">
                {t('Op het snijvlak van technologie.', 'At the frontier of technology.')}
              </h2>
              <p className="team-frontiers-sub">
                {t(
                  'Wij organiseren AIGrunn en PyGrunn, de developer events van Noord-Nederland. Niet als toeschouwers, maar als de mensen op het podium.',
                  'We organize AIGrunn and PyGrunn, the developer events of Northern Netherlands. Not as spectators, but as the people on stage.'
                )}
              </p>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <FadeUp>
            <h2>{t('Wil je samenwerken?', 'Want to collaborate?')}</h2>
            <p>
              {t(
                'We staan altijd open voor een gesprek.',
                'We\'re always open for a conversation.'
              )}
            </p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn btn-white btn-arrow">
                {t('Neem contact op', 'Get in touch')}
              </Link>
              <a href="/demo" className="btn btn-ghost btn-arrow">
                {t('Plan een demo', 'Schedule a demo')}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </FadeUpContainer>
  )
}
