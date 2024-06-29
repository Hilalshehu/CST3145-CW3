// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CheckoutPage from '../components/CheckoutPage.vue';
import ProductList from '../components/ProductList.vue';

const routes = [
  {
    path: '/',
    name: '',
    component: ProductList,
  },
  {
    path: '/CheckoutPage.vue',
    name: 'Checkout',
    component: CheckoutPage,
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
