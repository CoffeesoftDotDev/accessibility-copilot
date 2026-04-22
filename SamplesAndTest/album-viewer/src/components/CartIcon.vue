<template>
  <div class="cart-icon" @click="toggleCart">
    <div class="cart-icon-container">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="cart-svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span v-if="totalItems > 0" class="cart-badge" :style="{ background: totalItems > 3 ? 'red' : 'orange' }">{{ totalItems }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const toggleCart = () => {
  cartStore.toggleCart()
}

const totalItems = computed(() => cartStore.totalItems)
</script>

<style scoped>
.cart-icon {
  position: relative;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-icon-container {
  position: relative;
}

.cart-svg {
  width: 28px;
  height: 28px;
  color: rgba(255, 255, 255, 0.5);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  animation: pulse 0.8s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
</style>