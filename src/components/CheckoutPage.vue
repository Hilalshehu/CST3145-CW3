<template>
  <div>
    <h1>Checkout Page</h1>
    <div v-for="item in cartItems" :key="item.id">
      <p>{{ item.title }} ({{ item.quantity }})</p>
      <button @click="removeFromCart(item)">Remove</button>
    </div>
    <div>
      <label>Name: </label>
      <input v-model="name" type="text" />
      <label>Phone: </label>
      <input v-model="phone" type="text" />
      <button :disabled="!validForm" @click="checkout">Checkout</button>
      <p v-if="!validForm" style="color: red;">Please fill out all fields correctly.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutPage",
  data() {
    return {
      name: "",
      phone: "",
      cart: JSON.parse(localStorage.getItem('cart')) || {}
    };
  },
  methods: {
    removeFromCart(item) {
      if (this.cart[item.id].quantity > 1) {
        this.cart[item.id].quantity--;
      } else {
        delete this.cart[item.id];
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    async checkout() {
      try {
        if (!this.validForm) {
          console.log('Form is invalid');
          return;
        }
        
        const order = {
          lessons: Object.values(this.cart),
          username: this.name,
          phonenumber: this.phone
        };

        const response = await fetch('https://backend-ten-inky-80.vercel.app/collection/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        });

        if (!response.ok) {
          throw new Error(`Error creating order: ${response.statusText}`);
        }

        alert(`Order created successfully for ${this.name} (phone: ${this.phone})!`);
        this.cart = {};
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.$router.push('/');
      } catch (error) {
        console.error('Error:', error.message);
        alert(`Failed to create order: ${error.message}`);
      }
    }
  },
  computed: {
    cartItems() {
      return Object.values(this.cart);
    },
    validForm() {
      return this.cartItems.length > 0 && this.name.trim() !== "" && this.phone.match(/^\d+$/);
    }
  }
};
</script>

<style scoped>
/* Add styles as needed */
</style>
