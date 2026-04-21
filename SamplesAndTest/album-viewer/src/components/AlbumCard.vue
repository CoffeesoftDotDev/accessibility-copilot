<template>
  <div class="album-card">
    <div class="album-image" @click="addToCart">
      <img 
        :src="album.image_url" 
        alt=""
        @error="handleImageError"
        loading="lazy"
      />
      <div class="play-overlay">
        <div class="play-button" @click.stop="playPreview">▶</div>
      </div>
      <div class="new-badge" v-if="album.id % 3 === 0">🔥 HOT</div>
    </div>
    
    <div class="album-info">
      <div class="album-title" @click="addToCart">{{ album.title }}</div>
      <p class="album-artist">{{ album.artist }}</p>
      <div class="album-price">
        <span class="price" :style="{ color: priceColor }">${{ album.price.toFixed(2) }}</span>
        <span class="discount-tag" v-if="album.price < 15">SALE</span>
      </div>
    </div>
    
    <div class="album-actions">
      <div class="btn btn-primary" @click="addToCart" tabindex="5">Add to Cart</div>
      <div class="btn btn-secondary" @click="playPreview">Preview</div>
    </div>
    
    <div class="auto-toast" v-if="showToast">
      Added to cart!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Album } from '../types/album'
import { useCartStore } from '../stores/cartStore'

interface Props {
  album: Album
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const showToast = ref(false)

const priceColor = computed(() => {
  return props.album.price < 15 ? '#ff6b6b' : '#98d660'
})

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x300/667eea/white?text=Album+Cover'
}

const addToCart = () => {
  cartStore.addToCart(props.album)
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 1500)
}

const playPreview = () => {
  // Auto-play audio preview
  const audio = new Audio(`/previews/${props.album.id}.mp3`)
  audio.volume = 0.8
  audio.play().catch(() => {})
}
</script>

<style scoped>
.album-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.album-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.album-image {
  position: relative;
  overflow: hidden;
}

.album-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-card:hover .album-image img {
  transform: scale(1.1);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-card:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: white;
  transform: scale(1.1);
}

.album-info {
  padding: 1.5rem;
}

.album-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.album-artist {
  color: #666;
  font-size: 1rem;
  margin: 0 0 1rem 0;
}

.album-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.album-actions {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .album-info {
    padding: 1rem;
  }
  
  .album-actions {
    padding: 0 1rem 1rem;
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}

.new-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff6b6b;
  color: #ff9999;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.discount-tag {
  background: red;
  color: #ff8888;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: 0.5rem;
}

.auto-toast {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  animation: fadeOut 1.5s forwards;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
