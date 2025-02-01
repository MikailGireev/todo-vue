import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Todo } from '@/utils/types';
import { useFilterStore } from './filter';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Todo[]>([]);
  const todoLength = computed(() => tasks.value.length);
  const filterStore = useFilterStore();

  const loadTasks = async () => {
    try {
      const res = await fetch('/api');
      tasks.value = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const syncState = async (task: Todo | { id: number }, method: 'POST' | 'PUT' | 'DELETE') => {
    try {
      await fetch('/api', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = computed(() => {
    if (filterStore.filter === 'all') return tasks.value;
    if (filterStore.filter === 'active') return tasks.value.filter((task) => !task.completed);
    if (filterStore.filter === 'done') return tasks.value.filter((task) => task.completed);
    return [];
  });

  const addTask = (text: string) => {
    if (!text) return;
    const newTask: Todo = { id: Date.now(), text, completed: false };
    tasks.value.push(newTask);
    syncState(newTask, 'POST');
  };

  const completedTask = (taskId: number) => {
    const task = tasks.value.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      syncState(task, 'PUT');
    } else {
      return;
    }
  };

  const deleteTask = (taskId: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    syncState({ id: taskId }, 'DELETE');
  };

  onMounted(loadTasks);

  return { tasks, todoLength, addTask, completedTask, deleteTask, filteredTasks, loadTasks };
});
