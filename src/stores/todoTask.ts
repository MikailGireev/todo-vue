import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Todo } from '@/utils/types';
import { useFilterStore } from './filter';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Todo[]>([]);
  const todoLength = computed(() => tasks.value.length);
  const filterStore = useFilterStore();

  const filteredTasks = computed(() => {
    if (filterStore.filter === 'all') return tasks.value;
    if (filterStore.filter === 'active') return tasks.value.filter((task) => !task.completed);
    if (filterStore.filter === 'done') return tasks.value.filter((task) => task.completed);
    return [];
  });

  const addTask = (text: string) => {
    if (!text) return;
    tasks.value.push({ id: Date.now(), text, completed: false });
  };

  const completedTask = (taskId: number) => {
    const task = tasks.value.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const deleteTask = (taskId: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  };

  return { tasks, todoLength, addTask, completedTask, deleteTask, filteredTasks };
});
