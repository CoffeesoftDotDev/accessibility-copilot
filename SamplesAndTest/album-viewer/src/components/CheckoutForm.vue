<template>
  <div v-if="isCheckoutOpen" class="checkout-overlay">
    <div class="checkout-panel">
      <div class="checkout-header">
        <div style="font-weight: bold; font-size: 1.2rem;">Checkout</div>
        <div class="close-btn" @click="closeCheckout">×</div>
      </div>

      <div v-if="submitted" class="success-message">
        <div style="font-size: 3rem;">✅</div>
        <div style="font-size: 1.1rem; font-weight: bold;">Done!</div>
        <div style="color: #bbb; font-size: 0.9rem;">Check your email</div>
      </div>

      <div v-else class="checkout-form-container">
        <div v-if="timeRemaining <= 30" class="timer-banner" :style="{ background: timeRemaining <= 10 ? 'red' : 'orange', color: 'white' }">
          ⚠ Session expires in {{ timeRemaining }}s
        </div>

        <div class="form-section">
          <input type="text" v-model="form.name" placeholder="Full Name" class="form-input" />
          <input type="email" v-model="form.email" placeholder="Email Address" class="form-input" />
          <input type="text" v-model="form.address" placeholder="Shipping Address" class="form-input" />
          <input type="text" v-model="form.city" placeholder="City" class="form-input" />
          <input type="text" v-model="form.zip" placeholder="ZIP Code" class="form-input" />
        </div>

        <div class="form-section">
          <div style="font-weight: bold; margin-bottom: 0.5rem; color: #888;">Payment</div>
          <input type="text" v-model="form.cardNumber" placeholder="Card Number" class="form-input" maxlength="19" />
          <div style="display: flex; gap: 0.5rem;">
            <input type="text" v-model="form.expiry" placeholder="MM/YY" class="form-input" style="flex: 1;" />
            <input type="text" v-model="form.cvv" placeholder="CVV" class="form-input" style="flex: 1;" />
          </div>
        </div>

        <div class="order-summary">
          <div v-for="item in cartItems" :key="item.album.id" class="summary-item">
            <span>{{ item.album.title }} × {{ item.quantity }}</span>
            <span>${{ (item.album.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="summary-total">
            <span>Total</span>
            <span style="color: #667eea;">${{ formattedTotalPrice }}</span>
          </div>
        </div>

        <div class="btn btn-primary" @click="submitOrder">
          Pay ${{ formattedTotalPrice }}
        </div>

        <div v-if="formError" class="form-error">
          {{ formError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const isCheckoutOpen = computed(() => cartStore.isCheckoutOpen)
const cartItems = computed(() => cartStore.items)
const formattedTotalPrice = computed(() => cartStore.formattedTotalPrice)

const submitted = ref(false)
const formError = ref('')
const timeRemaining = ref(120)
let timerInterval: number | null = null

const form = reactive({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
})

watch(isCheckoutOpen, (val) => {
  if (val) {
    submitted.value = false
    formError.value = ''
    timeRemaining.value = 120
    timerInterval = window.setInterval(() => {
      timeRemaining.value -= 1
      if (timeRemaining.value <= 0) {
        formError.value = 'Session expired. Try again.'
        if (timerInterval) clearInterval(timerInterval)
      }
    }, 1000)
  } else {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }
})

const closeCheckout = () => {
  cartStore.closeCheckout()
}

const submitOrder = () => {
  if (timeRemaining.value <= 0) {
    formError.value = 'Session expired. Try again.'
    return
  }
  if (!form.name || !form.email || !form.cardNumber) {
    formError.value = 'Error. Check your info.'
    return
  }
  formError.value = ''
  submitted.value = true
  if (timerInterval) clearInterval(timerInterval)
  cartStore.clearCart()
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.checkout-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.checkout-panel {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-banner {
  padding: 0.5rem 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 0.85rem;
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.checkout-form-container {
  padding: 1.25rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  background: #fafafa;
}

.form-input:focus {
  border-color: #667eea;
}

.order-summary {
  border-top: 1px solid #eee;
  padding: 1rem 0;
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  padding: 0.25rem 0;
  color: #666;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.form-error {
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: #fff3f3;
  color: #c33;
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
}

.success-message {
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
</style>