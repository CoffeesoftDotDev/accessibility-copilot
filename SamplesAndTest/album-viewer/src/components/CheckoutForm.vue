<template>
  <div class="checkout-overlay" v-if="isCheckoutOpen">
    <div class="checkout-panel">
      <div class="checkout-header">
        <h2>Checkout</h2>
        <span class="close-btn" @click="closeCheckout" style="cursor: pointer;">×</span>
      </div>
      
      <div class="checkout-content">
        <div class="order-summary">
          <h3>Order Summary</h3>
          <div v-for="item in cartItems" :key="item.album.id" class="summary-item">
            <span>{{ item.album.title }} (x{{ item.quantity }})</span>
            <span>${{ (item.album.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="total-line">
            <span>Total</span>
            <span>${{ formattedTotalPrice }}</span>
          </div>
        </div>
        
        <form @submit.prevent="submitOrder" class="checkout-form">
          <h3>Customer Information</h3>
          
          <div class="form-row">
            <div class="form-group">
              <input 
                v-model="customerInfo.firstName" 
                type="text" 
                placeholder="First Name"
                required 
              />
            </div>
            
            <div class="form-group">
              <input 
                v-model="customerInfo.lastName" 
                type="text" 
                placeholder="Last Name"
                required 
              />
            </div>
          </div>
          
          <div class="form-group">
            <input 
              v-model="customerInfo.email" 
              type="text" 
              placeholder="Email"
              required 
            />
          </div>
          
          <h3>Shipping Address</h3>
          
          <div class="form-group">
            <input 
              v-model="customerInfo.address" 
              type="text" 
              placeholder="Address"
              required 
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <input 
                v-model="customerInfo.city" 
                type="text" 
                placeholder="City"
                required 
              />
            </div>
            
            <div class="form-group">
              <input 
                v-model="customerInfo.postalCode" 
                type="text" 
                placeholder="Postal Code"
                required 
              />
            </div>
          </div>
          
          <div class="form-group">
            <input 
              v-model="customerInfo.country" 
              type="text" 
              placeholder="Country"
              required 
            />
          </div>
          
          <h3>Payment Method</h3>
          
          <div class="payment-options">
            <div class="payment-option" @click="customerInfo.paymentMethod = 'credit-card'" 
                 :style="{ background: customerInfo.paymentMethod === 'credit-card' ? '#4a6cf7' : '#eee', color: customerInfo.paymentMethod === 'credit-card' ? 'white' : '#333' }">
              💳 Credit Card
            </div>
            
            <div class="payment-option" @click="customerInfo.paymentMethod = 'paypal'"
                 :style="{ background: customerInfo.paymentMethod === 'paypal' ? '#4a6cf7' : '#eee', color: customerInfo.paymentMethod === 'paypal' ? 'white' : '#333' }">
              🅿️ PayPal
            </div>
          </div>
          
          <div class="form-actions">
            <div class="btn btn-secondary" @click="goBackToCart">
              Back to Cart
            </div>
            <div class="btn btn-primary" @click="submitOrder">
              Place Order
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import type { CustomerInfo } from '../stores/cartStore'

const cartStore = useCartStore()

const customerInfo = ref<CustomerInfo>({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  paymentMethod: 'credit-card'
})

// Computed properties
const isCheckoutOpen = computed(() => cartStore.isCheckoutOpen)
const cartItems = computed(() => cartStore.items)
const formattedTotalPrice = computed(() => cartStore.formattedTotalPrice)

// Methods
const closeCheckout = () => {
  cartStore.closeCheckout()
}

const goBackToCart = () => {
  cartStore.closeCheckout()
  cartStore.toggleCart()
}

const submitOrder = () => {
  cartStore.saveCustomerInfo(customerInfo.value)
  const success = cartStore.submitOrder()
  
  if (success) {
    // You could show a success message or redirect the user
    alert('Order placed successfully!')
  }
}
</script>

<style scoped>
.checkout-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.checkout-panel {
  background-color: white;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}

.checkout-header {
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

.checkout-content {
  padding: 20px;
}

.order-summary {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #ddd;
}

.total-line {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  font-weight: bold;
  font-size: 18px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 500;
}

input[type="text"],
input[type="email"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.payment-options {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
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
}

.btn-primary:hover {
  background-color: #3955d1;
}

.btn-secondary:hover {
  background-color: #d0d0d0;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .checkout-panel {
    max-width: 100%;
  }
}
</style>