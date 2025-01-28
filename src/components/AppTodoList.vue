<script setup lang="ts">
import AppTodoItem from './AppTodoItem.vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/todoTask';

const taskStore = useTaskStore();
const { filteredTasks } = storeToRefs(taskStore);
const { completedTask, deleteTask } = taskStore;
</script>

<template>
  <ul v-auto-animate class="todo-list">
    <AppTodoItem
      v-for="todo in filteredTasks"
      :key="todo.id"
      :id="todo.id"
      :text="todo.text"
      :completed="todo.completed"
      @completed="() => completedTask(todo.id)"
      @on-delete="() => deleteTask(todo.id)"
    />
  </ul>
</template>
