'use client'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { useLang } from '@/lib/language'
import Image from 'next/image'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Image src="/images/bep-icon.png" alt="BEP" width={28} height={28} style={{ filter: 'brightness(0) invert(1)' }} />
              <span className="footer-logo">BEP</span>
            </div>
            <p className="footer-tagline">
              {t('De Nieuwe Bedrijfsexpert', 'The New Business Expert')}
            </p>
          </div>

          <div>
            <h4>{t('Pagina\'s', 'Pages')}</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/waarom-bep">{t('Waarom BEP', 'Why BEP')}</Link></li>
              <li><Link href="/cases">Cases</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="/contact">{t('Plan een sessie', 'Schedule a session')}</a></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <a href="mailto:info@bep.expert">info@bep.expert</a>
              </div>
              <div className="footer-contact-item">
                Groningen, Nederland
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} BEP — {t('De Nieuwe Bedrijfsexpert', 'The New Business Expert')}
          </div>
          <div className="footer-bottom-links">
            <Link href="/privacy">{t('Privacybeleid', 'Privacy Policy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
