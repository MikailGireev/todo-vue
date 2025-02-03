import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, '../task.json');

const readTask = async () => {
  try {
    await fs.access(FILE_PATH).catch(async () => {
      await fs.writeFile(FILE_PATH, '[]');
    });

    const data = await fs.readFile(FILE_PATH, 'utf-8');

    const tasks = JSON.parse(data);
    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.log(`Ошибка чтения файла: ${error}`);
    return [];
  }
};

const saveTask = async (tasks) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
};

export const homeRoute = async (req, res) => {
  if (req.method === 'GET' && req.url === '/api') {
    const todos = await readTask();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
  }

  if (req.method === 'POST' && req.url === '/api') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const newTask = JSON.parse(body);
        newTask.id = Date.now();

        const tasks = await readTask();
        tasks.push(newTask);
        await saveTask(tasks);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
      } catch (error) {
        console.log(`Ошибка добавление задачи ${error}`);
        res.writeHead(500).end('Ошибка сервера');
      }
    });
  }

  if (req.method === 'PUT' && req.url === '/api') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const updateTask = JSON.parse(body);
        let tasks = await readTask();
        tasks = tasks.map((task) => (task.id === updateTask.id ? updateTask : task));

        await saveTask(tasks);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updateTask));
      } catch (error) {
        console.log(`Ошибка обновление задачи ${error}`);
        res.writeHead(500).end('Ошибка сервера');
      }
    });
  }

  if (req.method === 'DELETE' && req.url === '/api') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { id } = JSON.parse(body);
        let tasks = await readTask();
        tasks = tasks.filter((task) => task.id !== id);
        await saveTask(tasks);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Задача удалена' }));
      } catch (error) {
        console.log(`Ошибка удаление задачи ${error}`);
        res.writeHead(500).end('Ошибка сервера');
      }
    });
  }
};
