<script setup lang="ts">
import AppTodoList from '../components/AppTodoList.vue';
import AppFooter from '../components/AppFooter.vue';
import AddTodoList from '../components/AddTodoList.vue';
import AppFiltes from '../components/AppFilters.vue';
</script>

<template>
  <AppFiltes />
  <section class="header__page">
    <AppTodoList />
    <AddTodoList />
  </section>
  <AppFooter />
</template>
