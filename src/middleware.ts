import { NextRequest, NextResponse } from 'next/server'

const locales = ['nl', 'en']
const defaultLocale = 'nl'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files and special paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/.well-known') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.match(/\.\w+$/) // skip files with extensions
  ) {
    return NextResponse.next()
  }

  // Already has a locale prefix → pass through
  if (locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    return NextResponse.next()
  }

  // Redirect bare paths to default locale (301 to preserve SEO)
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
