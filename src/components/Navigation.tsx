'use client'
import { useState, useEffect } from 'react'
import { LocaleLink as Link } from '@/lib/i18n/LocaleLink'
import { useLang } from '@/lib/language'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { X, Menu } from 'lucide-react'
import Image from 'next/image'

export function Navigation() {
  const { t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showFloating, setShowFloating] = useState(false)

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
      <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
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

          <nav className="header-nav">
            <Link href="/waarom-bep">{t('Waarom BEP', 'Why BEP')}</Link>
            <Link href="/filosofie">{t('Filosofie', 'Philosophy')}</Link>
            <Link href="/cases">Cases</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/team">Team</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-right">
            <LanguageSwitcher />
            <Link href="/contact" className="header-cta">
              {t('Plan een sessie', 'Schedule a session')}
            </Link>
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>
              <Menu size={24} />
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
            <Link href="/" onClick={close}>Home</Link>
            <Link href="/waarom-bep" onClick={close}>{t('Waarom BEP', 'Why BEP')}</Link>
            <Link href="/filosofie" onClick={close}>{t('Filosofie', 'Philosophy')}</Link>
            <Link href="/cases" onClick={close}>Cases</Link>
            <Link href="/blog" onClick={close}>Blog</Link>
            <Link href="/team" onClick={close}>Team</Link>
            <Link href="/pricing" onClick={close}>Pricing</Link>
            <Link href="/contact" onClick={close}>{t('Plan een sessie', 'Schedule a session')}</Link>
            <Link href="/contact" onClick={close}>Contact</Link>
          </nav>
        </div>
      </div>

      {/* Floating mobile CTA */}
      <div className={`floating-cta ${showFloating ? 'visible' : ''}`}>
        <Link href="/contact">
          {t('Plan een sessie', 'Schedule a session')}
        </Link>
      </div>
    </>
  )
}
