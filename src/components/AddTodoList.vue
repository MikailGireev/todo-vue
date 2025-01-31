<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '@/stores/todoTask';

const { addTask } = useTaskStore();
const newTask = ref('');



</script>

<template>
  <section class="add-todo">
    <button class="add-todo__show-form-button">
      <i class="bi bi-plus-lg"></i>
    </button>
    <form class="add-todo__form">
      <button class="close-button" type="button">
        <i class="bi bi-x"></i>
      </button>
      <div class="text-input text-input--focus">
        <input v-model="newTask" class="input" />
      </div>
      <button
        @click.prevent="
          addTask(newTask);
          newTask = '';
        "
        class="button button--filled"
      >
        Add task
      </button>
    </form>
  </section>
</template>
