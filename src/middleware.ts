import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  const publicRoutes = ["/login", "/forget-password", "/reset-password", "/otp"];

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|pdf|txt|mp4|mp3|woff|woff2|ttf|eot|json)).*)',
  ],
}

