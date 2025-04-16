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
        // Continue to the requested page
        const response = await fetch(req);
        return response;
      }
    }
  }

  // If not authorized, send the prompt
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
