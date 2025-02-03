<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useUserStore();
const user = computed(() => store.user);

const hadleLogout = () => {
  store.logout();
  router.push('/register');
};
</script>

<template>
  <header class="app-header">
    <router-link to="/"><span class="logo">TODOS</span></router-link>

    <div v-if="user" class="app-header__user flex items-center gap-3">
      <p>{{ user.user.username ? user.user.username : 'User' }}</p>
      <i
        @click="hadleLogout"
        class="bi bi-box-arrow-right hover:scale-110 hover:translate-x-1 transition-all"
      ></i>
    </div>
    <div v-else class="app-header__links">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </header>
</template>
