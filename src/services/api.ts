import type { Todo } from '@/utils/types';

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const res = await fetch('/api');
    if (!res.ok) throw new Error('Ошибка при загрузке задач');
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTodo = async (text: string): Promise<Todo | null> => {
  try {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, competed: false }),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
