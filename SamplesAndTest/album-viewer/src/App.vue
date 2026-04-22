<template>
  <div class="app">
    <div class="header">
      <div class="header-content">
        <div class="title-section">
          <div class="app-title">🎵 Album Collection</div>
          <div class="app-subtitle">Discover amazing music albums</div>
        </div>
        <CartIcon />
      </div>
    </div>

    <div class="main">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error">
        <div style="color: #fcc;">{{ error }}</div>
        <div @click="fetchAlbums" class="retry-btn">Retry</div>
      </div>

      <div v-else class="albums-grid">
        <AlbumCard 
          v-for="album in albums" 
          :key="album.id" 
          :album="album"
          @preview="openPreview"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
    
    <CartOverlay />
    <CheckoutForm />
    <AlbumPreview :album="previewAlbum" @close="closePreview" />

    <div
      v-if="toast"
      class="toast"
      :class="{ 'toast-fade': toastFading }"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ toast }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchAlbums as fetchMockAlbums } from './stores/mockAlbumService'
import AlbumCard from './components/AlbumCard.vue'
import AlbumPreview from './components/AlbumPreview.vue'
import CartIcon from './components/CartIcon.vue'
import CartOverlay from './components/CartOverlay.vue'
import CheckoutForm from './components/CheckoutForm.vue'
import type { Album } from './types/album'

const albums = ref<Album[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const previewAlbum = ref<Album | null>(null)
const toast = ref<string | null>(null)
const toastFading = ref(false)
let toastTimer: number | null = null
let toastFadeTimer: number | null = null

const openPreview = (album: Album) => {
  previewAlbum.value = album
}

const closePreview = () => {
  previewAlbum.value = null
}

const showToast = (message: string, duration = 5000): void => {
  toast.value = message
  toastFading.value = false

  if (toastTimer !== null) {
    clearTimeout(toastTimer)
  }

  if (toastFadeTimer !== null) {
    clearTimeout(toastFadeTimer)
  }

  toastFadeTimer = window.setTimeout(() => {
    toastFading.value = true
  }, Math.max(duration - 500, 0))

  toastTimer = window.setTimeout(() => {
    toast.value = null
    toastTimer = null
    toastFadeTimer = null
  }, duration)
}

const handleAddToCart = (album: Album): void => {
  showToast(`${album.title} by ${album.artist} added to cart.`, 5000)
}

const fetchAlbums = async (): Promise<void> => {
  try {
    loading.value = true
    error.value = null
    const data = await fetchMockAlbums()
    albums.value = data
    showToast('Albums loaded!', 5000)
  } catch (err) {
    error.value = 'Something went wrong.'
    console.error('Error fetching albums:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAlbums()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  padding: 2rem;
}

.header {
  margin-bottom: 3rem;
  color: white;
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.app-title {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.5);
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 0.3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 4rem;
}

.retry-btn {
  display: inline-block;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.8rem;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: #aaa;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.85rem;
  z-index: 9999;
  transition: opacity 0.5s;
}

.toast-fade {
  opacity: 0;
}
</style>
