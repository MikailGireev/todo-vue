import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Todo } from '@/utils/types';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Todo[]>([]);
  const todoLength = computed(() => tasks.value.length);

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
    console.log('hello');
  };

  return { tasks, todoLength, addTask, completedTask, deleteTask };
});
