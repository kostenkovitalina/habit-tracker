import { getSessionCookie } from 'better-auth/cookies'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { routing } from '@/pkg/locale'

const intlMiddleware = createMiddleware(routing)

const PROTECTED_PATHS = ['/dashboard']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`) ||
      pathname === `/en${path}` || pathname.startsWith(`/en${path}/`)
  )

  if (isProtected && !getSessionCookie(request)) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
}
