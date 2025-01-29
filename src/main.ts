import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';

const app = createApp(App);

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);
app.mount('#app');
