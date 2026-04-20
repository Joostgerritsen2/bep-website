'use client'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { useLang } from '@/lib/language'
import Image from 'next/image'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Image src="/images/bep-icon.png" alt="BEP" width={26} height={26} />
              <span className="footer-logo">BEP</span>
            </div>
            <p className="footer-tagline">
              {t('De Nieuwe Bedrijfsexpert.', 'The New Business Expert.')}
              <br />

            </p>
            <div className="footer-trust-badges">
              <span className="footer-badge">GDPR</span>
              <span className="footer-badge">EU AI Act Ready</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="footer-col-title">Product</div>
            <Link href="/toepassingen" className="footer-link">{t('Toepassingen', 'Use cases')}</Link>
            <Link href="/waarom-bep" className="footer-link">{t('Waarom BEP', 'Why BEP')}</Link>
            <Link href="/pricing" className="footer-link">Pricing</Link>
            <Link href="/technologie" className="footer-link">{t('Technologie', 'Technology')}</Link>
            <Link href="/filosofie" className="footer-link">{t('Filosofie', 'Philosophy')}</Link>
          </div>

          {/* Over */}
          <div>
            <div className="footer-col-title">{t('Over BEP', 'About BEP')}</div>
            <Link href="/cases" className="footer-link">Cases</Link>
            <Link href="/blog" className="footer-link">Blog</Link>
            <Link href="/team" className="footer-link">Team</Link>
            <Link href="/demo" className="footer-link">{t('Plan een demo', 'Schedule a demo')}</Link>
          </div>

          {/* Ecosysteem */}
          <div>
            <div className="footer-col-title">{t('Ecosysteem', 'Ecosystem')}</div>
            <a href="https://www.stekz.com" target="_blank" rel="noopener noreferrer" className="footer-link">Stekz</a>
            <a href="https://aigrunn.org" target="_blank" rel="noopener noreferrer" className="footer-link">AIGrunn</a>
            <a href="https://pygrunn.org" target="_blank" rel="noopener noreferrer" className="footer-link">PyGrunn</a>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact</div>
            <a href="mailto:info@bep.expert" className="footer-link">info@bep.expert</a>
            <span className="footer-link footer-link--muted">Atoomweg 6B, Groningen</span>
            <Link href="/contact" className="footer-link" style={{ marginTop: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
              {t('Neem contact op →', 'Get in touch →')}
            </Link>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} BEP, {t('onderdeel van Stekz B.V.', 'part of Stekz B.V.')}
          </div>
          <div className="footer-kvk">BTW: NL854470888B01</div>
          <div className="footer-legal">
            <Link href="/privacy">{t('Privacybeleid', 'Privacy Policy')}</Link>
            <Link href="/contact">{t('Algemene voorwaarden', 'Terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
