<template>
  <div class="container mt-4">
    <h1>Checkout Page</h1>
    <div v-for="item in cartItems" :key="item._id" class="card mb-3">
      <div class="card-body">
        <i :class="['fas', item.icon]"></i>
        <p><strong>{{ item.title }}</strong> (Quantity: {{ item.spaces }})</p>
        <p>Location: {{ item.location }}</p>
        <p>Price: AED{{ item.price }}</p>
        <button @click="removeFromCart(item)" class="btn btn-danger">Remove</button>
      </div>
    </div>
    <div class="form-group">
      <label>Name: </label>
      <input v-model="name" type="text" pattern="^[a-zA-Z\s]+$" required class="form-control">
    </div>
    <div class="form-group">
      <label>Phone number: </label>
      <input v-model="phone" type="text" pattern="^\d+$" required class="form-control">
    </div>
    <button :disabled="!validForm" @click="checkout" class="btn btn-primary">Checkout</button>
    <p v-if="!validForm" style="color: red;">Please fill out all fields correctly.</p>
    <p v-if="checkoutMessage" style="color: green;">{{ checkoutMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "CheckoutPage",
  props: {
    cart: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: "",
      phone: "",
      checkoutMessage: "",
    };
  },
  computed: {
    cartItems() {
      return Object.values(this.cart);
    },
    validForm() {
      return this.name.trim() !== "" && this.phone.match(/^\d+$/);
    }
  },
  methods: {
    removeFromCart(item) {
      this.$emit('remove-from-cart', item);
    },
    // Example of handling navigation in Vue component method
async checkout() {
  // Ensure form validation passes before proceeding
  if (!this.validForm) {
    return;
  }

  try {
    // Example of an HTTP POST request to create an order
    const response = await fetch('https://backend-ten-inky-80.vercel.app/collection/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* your order data */ }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`);
    }

    // Example of clearing cart after successful order creation
    this.$emit('clear-cart'); // Emit event to clear cart

    // Optionally, update state or show success message to user
    this.checkoutMessage = `Order created successfully for ${this.name} (phone: ${this.phone})!`;

  } catch (error) {
    console.error('Error creating order:', error.message);
    alert(`Failed to create order: ${error.message}`);
    // Handle error scenario, show error message to user or perform fallback action
  }
}


  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.card {
  margin-bottom: 1rem;
}
.btn-primary {
  margin-top: 1rem;
}
</style>