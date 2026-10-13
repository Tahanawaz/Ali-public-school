import app from '../server/index.js';

export default function handler(req, res) {
  const requestUrl = new URL(req.url, 'http://localhost');
  const route = requestUrl.searchParams.get('route');

  if (route) {
    requestUrl.searchParams.delete('route');
    const query = requestUrl.searchParams.toString();
    req.url = `/api/${route}${query ? `?${query}` : ''}`;
  }

  return app(req, res);
}
