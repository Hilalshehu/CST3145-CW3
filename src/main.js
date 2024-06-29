// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your router configuration

// Import global CSS files
import '../public/bootstrap.css';
import '../public/bootstrap.min.css';
import '../public/style.css';

const app = createApp(App);

app.use(router); // Register the router with Vue instance

app.mount('#app');
