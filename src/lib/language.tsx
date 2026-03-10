'use client'
import { createContext, useContext, useCallback, ReactNode } from 'react'

type Lang = 'nl' | 'en'

interface LangContextType {
  lang: Lang
  t: (nl: string | undefined, en?: string | undefined) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'nl',
  t: (nl) => nl || '',
})

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = useCallback((nl: string | undefined, en?: string | undefined) => {
    if (lang === 'en' && en) return en
    return nl || ''
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, t }}>
      <div className={lang === 'en' ? 'lang-en' : ''}>
        {children}
      </div>
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
