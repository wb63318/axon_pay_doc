// middleware.js
import { NextResponse } from 'next/server'

export const config = {
  matcher: '/:path*'
}

export function middleware(request) {
  const basicAuth = request.headers.get('authorization')
  const url = request.nextUrl

  const username = process.env.BASIC_AUTH_USERNAME
  const password = process.env.BASIC_AUTH_PASSWORD

  const validAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')

  if (basicAuth === validAuth) {
    return NextResponse.next()
  }

  url.pathname = '/api/auth'
  return NextResponse.rewrite(url)
}
