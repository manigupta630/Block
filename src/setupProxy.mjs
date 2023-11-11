// proxy-server.mjs
import corsAnywhere from 'cors-anywhere';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
});

proxy.listen(port, host, () => {
  console.log(`CORS Anywhere is running on ${host}:${port}`);
});
