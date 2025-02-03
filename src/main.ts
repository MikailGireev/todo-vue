import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

import './assets/index.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './router/index';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);
app.use(VueQueryPlugin);
app.mount('#app');
