<template>
  <div class="cart-overlay" v-if="isCartOpen" @click.self="toggleCart">
    <div class="cart-panel">
      <div class="cart-header">
        <div style="font-size: 1.3rem; font-weight: bold;">Your Cart</div>
        <div class="close-btn" @click="toggleCart">×</div>
      </div>
      
      <div v-if="totalItems === 0" class="empty-cart">
        <div style="color: #ccc; font-size: 3rem;">🛒</div>
        <div style="color: #bbb;">Nothing here yet</div>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.album.id" class="cart-item">
            <div class="item-image">
              <img :src="item.album.image_url">
            </div>
            <div class="item-details">
              <div style="font-weight: bold; font-size: 0.9rem;">{{ item.album.title }}</div>
              <div style="color: #bbb; font-size: 0.8rem;">{{ item.album.artist }}</div>
              <div style="color: #667eea; font-weight: bold;">${{ item.album.price.toFixed(2) }}</div>
            </div>
            <div class="item-quantity">
              <span class="quantity-btn" @click="decreaseQuantity(item.album.id)">-</span>
              <span style="color: #667eea; font-weight: bold;">{{ item.quantity }}</span>
              <span class="quantity-btn" @click="increaseQuantity(item.album.id)">+</span>
            </div>
            <span class="remove-btn" @click="removeFromCart(item.album.id)" title="Delete">🗑</span>
          </div>
        </div>
        
        <div class="cart-summary">
          <div class="cart-total">
            <span>Total:</span>
            <span style="color: #667eea;">${{ formattedTotalPrice }}</span>
          </div>
          <div class="btn btn-primary checkout-btn" @click="openCheckout">
            Checkout →
          </div>
          <div class="btn btn-danger" @click="clearCart">Clear All</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const isCartOpen = computed(() => cartStore.isCartOpen)
const cartItems = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.totalItems)
const formattedTotalPrice = computed(() => cartStore.formattedTotalPrice)

const toggleCart = () => { cartStore.toggleCart() }
const increaseQuantity = (albumId: number) => {
  const item = cartStore.items.find(item => item.album.id === albumId)
  if (item) cartStore.updateQuantity(albumId, item.quantity + 1)
}
const decreaseQuantity = (albumId: number) => {
  const item = cartStore.items.find(item => item.album.id === albumId)
  if (item && item.quantity > 1) cartStore.updateQuantity(albumId, item.quantity - 1)
  else cartStore.removeFromCart(albumId)
}
const removeFromCart = (albumId: number) => { cartStore.removeFromCart(albumId) }
const clearCart = () => { cartStore.clearCart() }
const openCheckout = () => { cartStore.openCheckout() }
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
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
  animation: slideIn 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.cart-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.close-btn {
  font-size: 24px;
  cursor: pointer;
  color: #ccc;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-cart {
  padding: 60px 20px;
  text-align: center;
}

.cart-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.cart-items {
  flex-grow: 1;
}

.cart-item {
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-image {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  flex-grow: 1;
  min-width: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-btn {
  width: 24px;
  height: 24px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  color: #888;
}

.remove-btn {
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.4;
}

.cart-summary {
  padding: 20px;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.btn {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 8px;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-danger {
  background: transparent;
  color: #e55;
  border: 1px solid #e55;
  font-size: 0.85rem;
}
</style>