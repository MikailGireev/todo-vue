import { useTaskStore } from '@/stores/todoTask';
import type { Todo } from '@/utils/types';

export const getTodos = async (): Promise<Todo[]> => {
  const taskStore = useTaskStore();
  return taskStore.tasks;
};

export const addTodo = async (text: string): Promise<Todo | null> => {
  try {
    const taskStore = useTaskStore();
    const newTask: Todo = { id: Date.now(), text, completed: false };

    taskStore.tasks.push(newTask);

    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskStore.tasks),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
