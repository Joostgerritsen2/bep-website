'use client'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { defaultLocale } from './config'

export function LocaleLink({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const params = useParams<{ lang: string }>()
  const lang = params?.lang || defaultLocale

  const localizedHref = typeof href === 'string' && href.startsWith('/') && !href.startsWith(`/${lang}/`) && href !== `/${lang}`
    ? `/${lang}${href}`
    : href

  return <NextLink href={localizedHref} {...props} />
}
