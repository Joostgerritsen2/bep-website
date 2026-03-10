'use client'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'

export function LanguageSwitcher() {
  const params = useParams<{ lang: string }>()
  const pathname = usePathname()
  const lang = params?.lang || 'nl'
  const otherLang = lang === 'nl' ? 'en' : 'nl'
  const otherPath = pathname.replace(/^\/(nl|en)/, `/${otherLang}`)

  return (
    <div className="lang-switch">
      <Link href={lang === 'nl' ? pathname : otherPath} className={`lang-btn ${lang === 'nl' ? 'active' : ''}`}>NL</Link>
      <Link href={lang === 'en' ? pathname : otherPath} className={`lang-btn ${lang === 'en' ? 'active' : ''}`}>EN</Link>
    </div>
  )
}
