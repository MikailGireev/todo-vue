<script setup lang="ts">
import { useTaskStore } from '@/stores/todoTask';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();
const { todoLength } = storeToRefs(taskStore);
</script>

<template>
  <footer class="app-footer">{{ todoLength }} more to do, 1 done</footer>
</template>
