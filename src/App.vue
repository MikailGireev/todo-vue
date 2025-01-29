<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div>
    <AppHeader />
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
