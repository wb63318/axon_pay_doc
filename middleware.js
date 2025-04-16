// middleware.js
import { NextResponse } from 'next/server'

// Replace these with your credentials
const USERNAME = process.env.BASIC_AUTH_USER
const PASSWORD = process.env.BASIC_AUTH_PASS


export function middleware(request) {
  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    const base64Credentials = authHeader.split(' ')[1]
    const [user, pass] = atob(base64Credentials).split(':')

    if (user === USERNAME && pass === PASSWORD) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// Apply to all routes
export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)'],
}
