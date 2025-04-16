export const config = {
  runtime: 'edge',
};

const USERNAME = 'admin';
const PASSWORD = 'mypassword';

export default async function handler(req) {
  const auth = req.headers.get('authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      if (user === USERNAME && pass === PASSWORD) {
        return new Response(null, { status: 200 });
      }
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}
