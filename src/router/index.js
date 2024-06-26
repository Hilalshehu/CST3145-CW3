// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import CheckoutPage from '../components/CheckoutPage.vue';  

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/Checkout',
    name: 'CheckoutPage',
    component: CheckoutPage 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
