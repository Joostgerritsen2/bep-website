'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/lib/language'
import { LocaleLink } from '@/lib/i18n/LocaleLink'

export function CookieConsent() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <p>
          {t(
            'Wij gebruiken cookies om de website te verbeteren en bezoek te analyseren.',
            'We use cookies to improve the website and analyze visits.'
          )}{' '}
          <LocaleLink href="/privacy">{t('Lees meer', 'Learn more')}</LocaleLink>
        </p>
        <div className="cookie-banner-btns">
          <button onClick={accept} className="cookie-btn-accept">
            {t('Accepteren', 'Accept')}
          </button>
          <button onClick={decline} className="cookie-btn-decline">
            {t('Alleen noodzakelijk', 'Necessary only')}
          </button>
        </div>
      </div>
    </div>
  )
}
