<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFiltes from './components/AppFilters.vue';
import AppTodoList from './components/AppTodoList.vue';
import AddTodoList from './components/AddTodoList.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div>
    <AppHeader />
    <AppFiltes />
    <main class="app-main">
      <AppTodoList />
      <AddTodoList />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped></style>
