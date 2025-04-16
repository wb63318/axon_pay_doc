export const config = {
  matcher: '/**', // This applies to all routes
};

export default async function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  // Fetch username and password from environment variables
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

  const decoded = atob(encoded); // Decode the credentials
  const [user, pass] = decoded.split(':');

  // Check if credentials match
  if (user !== USER || pass !== PASS) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // If credentials are correct, pass the request
  return new Response(null, { status: 200 });
}
