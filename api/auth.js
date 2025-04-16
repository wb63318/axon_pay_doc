export default function handler(req, res) {
    const auth = req.headers.authorization;
  
    const USER = process.env.BASIC_AUTH_USERNAME;
    const PASS = process.env.BASIC_AUTH_PASSWORD;
  
    if (!auth) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(401).end('Unauthorized');
    }
  
    const [scheme, encoded] = auth.split(' ');
  
    if (scheme !== 'Basic' || !encoded) {
      return res.status(401).end('Unauthorized');
    }
  
    const decoded = Buffer.from(encoded, 'base64').toString();
    const [user, pass] = decoded.split(':');
  
    if (user !== USER || pass !== PASS) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(401).end('Unauthorized');
    }
  
    res.status(200).end('Authorized');
  }
  