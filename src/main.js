// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Import Bootstrap CSS
import '../public/Css/bootstrap.css'
import '../public/Css/bootstrap.min.css';

// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

import '../public/Css/bootstrap.css'
import '../public/Css/style.css'
const app = createApp(App);
  app.use(router)
  app.mount('#app');
