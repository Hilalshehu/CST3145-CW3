# hello-world

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


<div> <div v-if="showCart">
      <div>
       
        <label>Name: </label>
        <input v-model="name" type="text" />
        <label>Phone: </label>
        <input v-model="phone" type="text" />
        <p v-if="!validForm" style="color: red;">Please Input Details.</p>
        <div v-for="item in cartItems" :key="item.id">
      <p>{{ item.title }} ({{ item.quantity }})</p>
            <button class="btn btn-primary" @click="removeFromCart(item)">Remove</button>
       </div></div>
    </div>
    <div>
    </div>
    
    </div>
  </div>