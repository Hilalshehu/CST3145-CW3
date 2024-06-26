<template>
  <div>
    <!-- Proceed to Checkout button -->
    <button v-if="cartItemCount > 0" @click="showCheckoutForm" class="btn btn-primary">
      Proceed to Checkout ({{ cartItemCount }})
    </button>

    <div v-for="lesson in filteredLessons" :key="lesson.id">
      <h2>{{ lesson.title }}</h2>
      <h5>{{ lesson.subject }}</h5>
      <p>Location: {{ lesson.location }}</p>
      <p>Price: AED{{ lesson.price }}</p>
      <p>Spaces: {{ lesson.spaces }}</p>
      <button :disabled="lesson.spaces === 0" @click="addToCart(lesson)" class="btn btn-primary">
        Add to Cart
      </button>
    </div>

    <!-- Cart display (if needed) -->
    <div v-if="showCart">
      <div v-for="item in cartItems" :key="item.id">
        <p>{{ item.title }} ({{ item.quantity }})</p>
        <button class="btn btn-primary" @click="removeFromCart(item)">Remove</button>
      </div>
    </div>

    <!-- User information form -->
    <div v-if="showForm">
      <h3>Enter Your Information</h3>
      <form @submit.prevent="proceedToCheckout">
        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" v-model="name" type="text" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input id="phone" v-model="phone" type="text" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!validForm">Checkout</button>
        <p v-if="!validForm" style="color: red;">Fields Required.</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      lessons: [],
      cart: JSON.parse(localStorage.getItem('cart')) || {},
      showCart: true,
      showForm: false,
      sortOption: "",
      searchQuery: "",
      sortOrder: "asc",
      name: "",
      phone: ""
    };
  },
  created() {
    this.getLessons();
  },
  methods: {
    async getLessons() {
      const url = new URL('https://backend-ten-inky-80.vercel.app/collection/products');
      url.searchParams.append('search', this.searchQuery);
      url.searchParams.append('searchField', 'subject');
      url.searchParams.append('sort', this.sortOrder);

      const response = await fetch(url);
      const lessons = await response.json();
      this.lessons = lessons;
    },
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        if (!this.cart[lesson.id]) {
          this.cart[lesson.id] = { ...lesson, quantity: 0 };
        }
        this.cart[lesson.id].quantity++;
        lesson.spaces--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    showCheckoutForm() {
      this.showForm = true;
    },
    removeFromCart(item) {
      if (this.cart[item.id].quantity > 1) {
        this.cart[item.id].quantity--;
      } else {
        delete this.cart[item.id];
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    proceedToCheckout() {
      if (this.validForm) {
        // Make sure this route is defined in your router configuration
        this.$router.push({ name: 'CheckoutPage' });
      }
    }
  },
  computed: {
    cartItems() {
      return Object.values(this.cart);
    },
    filteredLessons() {
      return this.lessons.filter(lesson =>
        lesson.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    cartItemCount() {
      return Object.values(this.cart).reduce((total, item) => total + item.quantity, 0);
    },
    validForm() {
      return this.name.trim() !== "" && this.phone.trim() !== "";
    }
  },
  watch: {
    searchQuery: 'getLessons',
    sortOption: 'getLessons',
    sortOrder: 'getLessons'
  }
};
</script>

<style scoped>
/* Ensure scoped attribute is used if you want styles scoped to this component only */
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
</style>
