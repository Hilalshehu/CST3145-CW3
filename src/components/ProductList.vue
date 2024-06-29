<template>
  <div class="container">
    <h1>After School Program</h1>
    <!-- Search and Sort inputs -->
    <div class="search-sort">
      <input
        v-model="searchQuery"
        @input="filterLessons"
        class="form-control"
        placeholder="Search by subject or location"
      />
      <select v-model="sortOrder" @change="sortLessons" class="form-control ml-2">
        <option value="priceAsc">Sort by Price: Low to High</option>
        <option value="priceDesc">Sort by Price: High to Low</option>
        <option value="locationAsc">Sort by Location: A to Z</option>
        <option value="locationDesc">Sort by Location: Z to A</option>
      </select>
    </div>

    <!-- Lessons List -->
    <div class="row">
    <div v-for="lesson in sortedLessons" :key="lesson.id" class="col-md-4 mt-1 mb-1 shadow">
      <div class="card">
      <div class="card-body">
        <i :class="lesson.icon"></i>
        <h2>{{ lesson.title }}</h2>
        <h5>{{ lesson.subject }}</h5>
        <p>Location: {{ lesson.location }}</p>
        <p>Price: AED{{ lesson.price }}</p>
        <p>Spaces: {{ lesson.spaces }}</p>
        <button
          :disabled="lesson.spaces === 0"
          @click="addToCart(lesson)"
          class="btn btn-primary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "ProductList",
  data() {
    return {
      
      filteredLessons: [],
      cart: JSON.parse(localStorage.getItem("cart")) || {},
      searchQuery: "",
      sortOrder: "priceAsc",
    };
  },
  
  created() {
    this.getLessons();
  },
  methods: {
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
    addToCart(lesson) {
      this.$emit('addProducts', lesson);
    },
    
    toggleCart() {
      this.showCart = !this.showCart;
    },
    removeFromCart(item) {
      if (this.cart[item.id].quantity > 1) {
        this.cart[item.id].quantity--;
      } else {
        delete this.cart[item.id];
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    filterLessons() {
      this.filteredLessons = this.lessons.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.sortLessons();
    },
    sortLessons() {
      const compareFunctions = {
        priceAsc: (a, b) => a.price - b.price,
        priceDesc: (a, b) => b.price - a.price,
        locationAsc: (a, b) => a.location.localeCompare(b.location),
        locationDesc: (a, b) => b.location.localeCompare(a.location),
      };
      this.filteredLessons.sort(compareFunctions[this.sortOrder]);
    },
  },
  computed: {
    cartItemCount() {
      return Object.values(this.cart).reduce((total, item) => total + item.quantity, 0);
    },
    sortedLessons() {
      return this.filteredLessons;
    },
  },
  watch: {
    searchQuery: "filterLessons",
    sortOrder: "sortLessons",
  },
};
</script>

<style scoped>
.search-sort {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.card {
  margin-bottom: 1rem;
}
.btn-primary {
  margin-top: 1rem;
}
</style>

<style scoped>
/* General Styles */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #FFFFFF;
  color: #68B9C5;
  margin: 0;
  padding: 0;
}

h1, h2, h3 {
  color: #68B9C5;
  margin: auto;
}

button {
  background-color: #FFFFFF;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  margin-bottom: auto;
}
  
/* Lesson List */
.lesson {
  display: flex;
  flex-direction: column; /* Adjust the layout to column */
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 10px; /* Rounded corners */
  background-color: #000000; /* Black background color */
  color: #FFFFFF; /* White text color */
  margin-bottom: 1rem; /* Add space between cards */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}

/* Shopping Cart */
.cart {
  margin-top: auto;
}

.cart ul {
  list-style-type: none;
  padding: 0;
}

.cart li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
}

/* Checkout */
.CheckoutPage {
  margin-top: auto;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f2f2f2;
  color: #333;
  padding-top: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  color: #007bff;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.search-sort {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.search-sort .form-control {
  flex: 1;
  margin-right: 0.5rem;
}

.search-sort .form-control:last-child {
  margin-right: 0;
}
</style>