export const config = {
  matcher: '/**',
};

export default async function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  const USER = process.env.BASIC_AUTH_USERNAME;
  const PASS = process.env.BASIC_AUTH_PASSWORD;

  if (!basicAuth) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const [scheme, encoded] = basicAuth.split(' ');

  if (scheme !== 'Basic' || !encoded) {
    return new Response('Unauthorized', { status: 401 });
  }

  const decoded = atob(encoded);
  const [user, pass] = decoded.split(':');

  if (user !== USER || pass !== PASS) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return new Response(null, { status: 200 }); // allow through
}
