// middleware.js

export const config = {
  runtime: 'edge', // Ensure it runs at the edge (Vercel's Edge Functions)
};

const USERNAME = process.env.BASIC_AUTH_USERNAME;  // Fetch from Vercel environment variables
const PASSWORD = process.env.BASIC_AUTH_PASSWORD;  // Fetch from Vercel environment variables

export default async function handler(req) {
  const auth = req.headers.get('authorization');  // Get the Authorization header

  if (auth) {
    const [scheme, encoded] = auth.split(' ');  // Split the Basic auth header

    if (scheme === 'Basic') {
      const decoded = atob(encoded);  // Decode base64 encoded credentials
      const [user, pass] = decoded.split(':');  // Split decoded credentials

      if (user === USERNAME && pass === PASSWORD) {
        return fetch(req);  // Proceed with the request if authentication is successful
      }
    }
  }

  // Return Unauthorized if authentication fails
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
``
