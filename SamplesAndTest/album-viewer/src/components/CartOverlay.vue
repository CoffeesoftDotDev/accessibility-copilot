<template>
  <div class="cart-overlay" v-if="isCartOpen">
    <div class="cart-panel">
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="close-btn" @click="toggleCart">×</button>
      </div>
      
      <div v-if="totalItems === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <button class="btn btn-primary" @click="toggleCart">Continue Shopping</button>
      </div>
      
      <div v-else class="cart-content">
        <ul class="cart-items">
          <li v-for="item in cartItems" :key="item.album.id" class="cart-item">
            <div class="item-image">
              <img :src="item.album.image_url" :alt="item.album.title">
            </div>
            <div class="item-details">
              <h3>{{ item.album.title }}</h3>
              <p>{{ item.album.artist }}</p>
              <p class="item-price">${{ item.album.price.toFixed(2) }}</p>
            </div>
            <div class="item-quantity">
              <button @click="decreaseQuantity(item.album.id)" class="quantity-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.album.id)" class="quantity-btn">+</button>
            </div>
            <button @click="removeFromCart(item.album.id)" class="remove-btn">Remove</button>
          </li>
        </ul>
        
        <div class="cart-summary">
          <div class="cart-total">
            <span>Total:</span>
            <span>${{ formattedTotalPrice }}</span>
          </div>
          <button class="btn btn-primary checkout-btn" @click="openCheckout">
            Proceed to Checkout
          </button>
          <button class="btn btn-secondary" @click="clearCart">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

// Computed properties
const isCartOpen = computed(() => cartStore.isCartOpen)
const cartItems = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.totalItems)
const formattedTotalPrice = computed(() => cartStore.formattedTotalPrice)

// Methods
const toggleCart = () => {
  cartStore.toggleCart()
}

const increaseQuantity = (albumId: number) => {
  const item = cartStore.items.find(item => item.album.id === albumId)
  if (item) {
    cartStore.updateQuantity(albumId, item.quantity + 1)
  }
}

const decreaseQuantity = (albumId: number) => {
  const item = cartStore.items.find(item => item.album.id === albumId)
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(albumId, item.quantity - 1)
  } else {
    cartStore.removeFromCart(albumId)
  }
}

const removeFromCart = (albumId: number) => {
  cartStore.removeFromCart(albumId)
}

const clearCart = () => {
  cartStore.clearCart()
}

const openCheckout = () => {
  cartStore.openCheckout()
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

.cart-panel {
  background-color: white;
  width: 100%;
  max-width: 400px;
  height: 100%;
  overflow-y: auto;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}

.empty-cart {
  padding: 40px 20px;
  text-align: center;
}

.cart-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.cart-item {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.item-details p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.item-price {
  font-weight: bold;
  color: #000;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.quantity-btn {
  width: 25px;
  height: 25px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.item-quantity span {
  margin: 0 10px;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff5252;
  cursor: pointer;
  font-size: 14px;
}

.cart-summary {
  padding: 20px;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 18px;
}

.checkout-btn {
  width: 100%;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #4a6cf7;
  color: white;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
  width: 100%;
}

.btn-primary:hover {
  background-color: #3955d1;
}

.btn-secondary:hover {
  background-color: #d0d0d0;
}
</style>