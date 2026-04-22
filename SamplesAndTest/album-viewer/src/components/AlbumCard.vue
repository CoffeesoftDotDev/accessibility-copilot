<template>
  <div class="album-card" @click="openPreview" tabindex="5">
    <div class="album-image">
      <img :src="album.image_url" @error="handleImageError" />
      <div class="play-overlay">
        <div class="play-button">▶</div>
      </div>
    </div>
    
    <div class="album-info">
      <div class="album-title">{{ album.title }}</div>
      <div class="album-artist" style="color: #ccc;">{{ album.artist }}</div>
      <div class="album-price">
        <img :src="`https://placehold.co/80x20/667eea/white?text=$${album.price.toFixed(2)}`" />
      </div>
    </div>
    
    <div class="album-actions">
      <div class="btn btn-primary" @click.stop="addToCart">🛒</div>
      <div class="btn btn-secondary" @click.stop="openPreview">👁</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Album } from '../types/album'
import { useCartStore } from '../stores/cartStore'

interface Props {
  album: Album
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'preview', album: Album): void
  (e: 'add-to-cart', album: Album): void
}>()
const cartStore = useCartStore()

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x300/667eea/white?text=Album+Cover'
}

const addToCart = () => {
  cartStore.addToCart(props.album)
  emit('add-to-cart', props.album)
}

const openPreview = () => {
  emit('preview', props.album)
}
</script>

<style scoped>
.album-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.album-card:hover {
  transform: translateY(-10px) rotate(1deg) scale(1.03);
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
  transition: transform 0.8s ease;
}

.album-card:hover .album-image img {
  transform: scale(1.2) rotate(-2deg);
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
  transition: opacity 0.15s ease;
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
}

.album-info {
  padding: 1.5rem;
}

.album-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.album-artist {
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.album-price img {
  height: 20px;
}

.album-actions {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}
</style>
