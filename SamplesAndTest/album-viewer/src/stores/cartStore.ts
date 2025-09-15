import { defineStore } from 'pinia'
import type { Album } from '../types/album'

export interface CartItem {
  album: Album
  quantity: number
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
  paymentMethod: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isCartOpen: false,
    isCheckoutOpen: false,
    customerInfo: null as CustomerInfo | null
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    
    totalPrice: (state) => state.items.reduce(
      (total, item) => total + (item.album.price * item.quantity),
      0
    ),
    
    formattedTotalPrice(): string {
      return this.totalPrice.toFixed(2)
    }
  },
  
  actions: {
    addToCart(album: Album) {
      const existingItem = this.items.find(item => item.album.id === album.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ album, quantity: 1 })
      }
    },
    
    removeFromCart(albumId: number) {
      const index = this.items.findIndex(item => item.album.id === albumId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    
    updateQuantity(albumId: number, quantity: number) {
      const item = this.items.find(item => item.album.id === albumId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(albumId)
        } else {
          item.quantity = quantity
        }
      }
    },
    
    clearCart() {
      this.items = []
    },
    
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
      if (this.isCartOpen) {
        this.isCheckoutOpen = false
      }
    },
    
    openCheckout() {
      this.isCheckoutOpen = true
      this.isCartOpen = false
    },
    
    closeCheckout() {
      this.isCheckoutOpen = false
    },
    
    saveCustomerInfo(info: CustomerInfo) {
      this.customerInfo = info
    },
    
    submitOrder() {
      // Here you would typically send the order to a backend API
      // For this demo, we'll just clear the cart
      console.log('Submitting order with customer info:', this.customerInfo)
      console.log('Order items:', this.items)
      
      // Reset the cart state
      this.clearCart()
      this.closeCheckout()
      this.customerInfo = null
      
      return true // Simulating successful order submission
    }
  }
})