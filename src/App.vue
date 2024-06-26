<template>
  <div id="app">
    <header>
      <!-- Header content -->
    </header>
    <main>
      <!-- ProductList component emits 'addProducts' event -->
      <ProductList @addProducts="addToCart" :serverUrl="serverUrl" />

      <!-- Navigation to CheckoutPage happens through router-link -->
      <router-link v-if="cart.length > 0" :to="{ name: 'CheckoutPage' }">Proceed to Checkout</router-link>
    </main>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";

export default {
  name: "App",
  components: {
    ProductList,
  },
  data() {
    return {
      serverUrl: "https://backend-ten-inky-80.vercel.app",
      cart: [],
    };
  },
  methods: {
    addToCart(product) {
      console.log("Product added to cart:", product);
      this.cart.push(product);
    },
  },
};
</script>
