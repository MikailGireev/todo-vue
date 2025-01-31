import 'dotenv/config';

import http from 'http';
import { homeRoute } from './routes/homeRoute.js';

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  homeRoute(req, res);
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
