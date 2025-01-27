<script setup lang="ts">
import type { Todo } from '../utils/types';
defineProps<Todo>();
const emit = defineEmits(['completed', 'onDelete']);
</script>

<template>
  <li v-auto-animate class="todo-item" :class="{ 'todo-item--done': completed }">
    <div @click="emit('completed')" class="todo-item__status">
      <i class="bi bi-check2"></i>
    </div>
    <span class="todo-item__text">{{ text }}</span>
    <button @click="emit('onDelete')" class="todo-item__remove-button">
      <i class="bi bi-trash3"></i>
    </button>
  </li>
</template>
