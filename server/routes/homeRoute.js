import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, '../task.json');

const readTask = async () => {
  try {
    fs.access(FILE_PATH);
    const data = await fs.readFile(FILE_PATH, 'utf-8').then((data) => JSON.parse(data));
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const saveTask = async (tasks) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
};

export const homeRoute = async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const todos = await readTask();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
  }

  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const newTask = JSON.parse(body);
      newTask.id = Date.now();
      const tasks = await readTask();
      tasks.push(newTask);
      await saveTask(tasks);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newTask));
    });
  }
};
