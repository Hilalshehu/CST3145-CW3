<template>
  <div id="app" class="container">
    <header>

    </header>
    <main>
     
      
      <ProductList @addProducts="addToCart" :serverUrl="serverUrl" v-if="activeComponent === 'ProductList'" />
      <CheckoutPage :cart="cart" v-if="activeComponent === 'CheckoutPage'" />
      <button v-on:click="changeComponent" class="btn btn-primary m-3">    Proceed to Checkout ({{ cartItemCount }})</button>
    </main>
    
  </div>
</template>

<script>
import CheckoutPage from "./components/CheckoutPage.vue";
import ProductList from "./components/ProductList.vue";

export default {
  name: "App",
  components: {
    ProductList,
    CheckoutPage,
  },
  data() {
    return {
      serverUrl: "https://backend-ten-inky-80.vercel.app",
      cart: [],
      lessons: [],
      activeComponent: 'ProductList'
    };
  },
  methods: {
    changeComponent() {
  this.activeComponent = this.activeComponent === 'ProductList' ? 'CheckoutPage' : 'ProductList';
},

addToCart(lesson) {
  if (lesson.spaces > 0) {
    if (!this.cart[lesson._id]) {
      this.cart[lesson._id] = { ...lesson, quantity: 0 };
    }
    this.cart[lesson._id].quantity++;
    lesson.spaces--;
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
},

    async getLessons() {
      const url = new URL(this.$root.serverUrl + "/collection/products");

      const response = await fetch(url);
      if (response.ok) {
        const lessons = await response.json();
        this.lessons = lessons;
        this.filteredLessons = lessons;
        this.sortLessons();
      } else {
        console.error("Failed to fetch lessons:", response.statusText);
      }
    },
  },
};
</script>
