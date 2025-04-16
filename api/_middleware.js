export const config = {
    runtime: 'edge',
};

const USERNAME = process.env.BASIC_AUTH_USER
const PASSWORD = process.env.BASIC_AUTH_PASS

export default async function middleware(req) {
    const auth = req.headers.get('authorization');

    if (auth) {
        const [, encoded] = auth.split(' ');
        const [user, pass] = atob(encoded).split(':');

        if (user === USERNAME && pass === PASSWORD) {
            return new Response(null, { status: 200 });
        }
    }

    return new Response('Unauthorized', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}
