import 'dotenv/config';
import http from 'http';
import { homeRoute } from './routes/homeRoute.js';
import { authUser } from './routes/authRoute.js';

const PORT = process.env.PORT || 8001;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/register') || req.url.startsWith('/api/login')) {
    authUser(req, res);
  } else if (req.url.startsWith('/api')) {
    homeRoute(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Маршрут не найден' }));
  }
});

server.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
