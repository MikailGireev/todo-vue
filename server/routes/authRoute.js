import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USER_FILE = path.join(__dirname, '../users.json');
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_key';

const readUsers = async () => {
  try {
    await fs.access(USER_FILE).catch(async () => {
      await fs.writeFile(USER_FILE, '[]', { flag: 'w' });
    });

    const data = await fs.readFile(USER_FILE, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Ошибка чтения пользователей:', error);
    return [];
  }
};

const saveUsers = async (users) => {
  await fs.writeFile(USER_FILE, JSON.stringify(users, null, 2), { flag: 'w' });
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '2h' });
};

export const authUser = async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/register') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));

    req.on('end', async () => {
      try {
        const { username, password } = JSON.parse(body);
        if (!username || !password) {
          return res.writeHead(400).end('Bad request');
        }

        const users = await readUsers();

        if (users.some((user) => user.username === username)) {
          return res.writeHead(409).end(JSON.stringify({ error: 'User already exists' }));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          id: Date.now(),
          username,
          password: hashedPassword,
        };

        users.push(newUser);
        await saveUsers(users);

        const token = generateToken(newUser);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'Регистрация успешна',
            token,
            user: { id: newUser.id, username },
          }),
        );
      } catch (error) {
        console.log('Ошибка регистрации:', error);
        res.writeHead(500).end('Ошибка сервера');
      }
    });
  }

  if (req.method === 'POST' && req.url === '/api/login') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));

    req.on('end', async () => {
      try {
        const { username, password } = JSON.parse(body);
        if (!username || !password) {
          return res.writeHead(400).end('Bad request');
        }

        const users = await readUsers();
        const user = users.find((u) => u.username === username);

        if (!user) {
          return res
            .writeHead(401)
            .end(JSON.stringify({ error: 'Неверное имя пользователя или пароль' }));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .writeHead(401)
            .end(JSON.stringify({ error: 'Неверное имя пользователя или пароль' }));
        }

        const token = generateToken(user);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'Авторизация успешна',
            token,
            user: { id: user.id, username },
          }),
        );
      } catch (error) {
        console.log('Ошибка входа:', error);
        res.writeHead(500).end('Ошибка сервера');
      }
    });
  }

  if (req.method === 'GET' && req.url === '/api/user') {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.writeHead(401).end(JSON.stringify({ error: 'Нет токена' }));
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const users = await readUsers();
      const user = users.find((u) => u.id === decoded.id);

      if (!user) {
        return res.writeHead(404).end(JSON.stringify({ error: 'Пользователь не найден' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ user: { id: user.id, username: user.username } }));
    } catch (error) {
      console.log('Ошибка авторизации:', error);
      res.writeHead(403).end(JSON.stringify({ error: 'Недействительный токен' }));
    }
  }
};
