'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { useLang } from '@/lib/language'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { X, Menu } from 'lucide-react'
import Image from 'next/image'

export function Navigation() {
  const { t } = useLang()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showFloating, setShowFloating] = useState(false)

  const isActive = (href: string) => pathname?.includes(href) ?? false
  const isLightPage = pathname?.includes('/demo') || pathname?.includes('/contact')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowFloating(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''} ${isLightPage && !scrolled ? 'on-light' : ''}`} id="header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            <Image
              src="/images/bep-icon.png"
              alt="BEP"
              width={36}
              height={36}
              className="logo-img"
            />
            <span className="logo-text">BEP</span>
          </Link>

          <nav className="nav-links">
            <Link href="/waarom-bep" className={isActive('/waarom-bep') ? 'nav-active' : ''}>{t('Waarom BEP', 'Why BEP')}</Link>
            <Link href="/cases" className={isActive('/cases') ? 'nav-active' : ''}>{t('Cases', 'Cases')}</Link>
            <Link href="/toepassingen" className={isActive('/toepassingen') ? 'nav-active' : ''}>{t('Toepassingen', 'Applications')}</Link>
            <Link href="/team" className={isActive('/team') ? 'nav-active' : ''}>{t('Team', 'Team')}</Link>
            <Link href="/pricing" className={`nav-link--pricing${isActive('/pricing') ? ' nav-active' : ''}`}>{t('Pricing', 'Pricing')}</Link>
          </nav>

          <div className="header-right">
            <LanguageSwitcher />
            <Link href="/demo" className="header-cta">
              {t('Plan een demo', 'Schedule a demo')}
            </Link>
            <button className="menu-btn-round" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu-overlay ${menuOpen ? 'active' : ''}`} id="menuOverlay">
        <button className="close-btn" onClick={close}>
          <X size={24} />
        </button>
        <div className="menu-columns">
          <nav className="menu-main">
            <Link href="/" onClick={close} className={pathname?.endsWith('/nl') || pathname?.endsWith('/en') ? 'nav-active' : ''}>Home</Link>
            <Link href="/waarom-bep" onClick={close} className={isActive('/waarom-bep') ? 'nav-active' : ''}>{t('Waarom BEP', 'Why BEP')}</Link>
            <Link href="/cases" onClick={close} className={isActive('/cases') ? 'nav-active' : ''}>Cases</Link>
            <Link href="/blog" onClick={close} className={isActive('/blog') ? 'nav-active' : ''}>Blog</Link>
            <Link href="/team" onClick={close} className={isActive('/team') ? 'nav-active' : ''}>Team</Link>
            <Link href="/pricing" onClick={close} className={isActive('/pricing') ? 'nav-active' : ''}>{t('Pricing', 'Pricing')}</Link>
            <Link href="/contact" onClick={close} className={isActive('/contact') ? 'nav-active' : ''}>Contact</Link>
          </nav>
          <div className="menu-secondary">
            <div className="menu-secondary-group">
              <span className="menu-secondary-label">{t('Verdieping', 'Deep dive')}</span>
              <Link href="/toepassingen" onClick={close}>{t('Toepassingen', 'Applications')}</Link>
              <Link href="/technologie" onClick={close}>{t('Onder de motorkap', 'Under the hood')}</Link>
              <Link href="/filosofie" onClick={close}>{t('Onze filosofie', 'Our philosophy')}</Link>
            </div>
            <div className="menu-secondary-group">
              <span className="menu-secondary-label">Contact</span>
              <a href="mailto:info@bep.expert">info@bep.expert</a>
              <a href="https://www.linkedin.com/company/bep-expert/" target="_blank" rel="noopener">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating mobile CTA */}
      <div className={`floating-cta ${showFloating ? 'visible' : ''}`}>
        <Link href="/demo">
          {t('Plan een demo', 'Schedule a demo')}
        </Link>
      </div>
    </>
  )
}
