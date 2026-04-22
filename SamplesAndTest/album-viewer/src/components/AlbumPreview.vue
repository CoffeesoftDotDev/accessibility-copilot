<template>
  <div v-if="album" class="preview-backdrop" @click.self="close">
    <div class="preview-dialog" tabindex="0">
      <div class="preview-close" @click="close">×</div>

      <div class="preview-body">
        <img :src="album.image_url" class="preview-cover" @error="handleImageError" />
        <div class="preview-info">
          <div class="preview-title">{{ album.title }}</div>
          <div class="preview-artist">{{ album.artist }}</div>
          <div class="preview-price">${{ album.price.toFixed(2) }}</div>

          <div class="preview-player">
            <div class="preview-play-btn" @click="togglePlay">
              {{ isPlaying ? '❚❚' : '▶' }}
            </div>
            <div class="preview-progress">
              <div class="preview-progress-bar" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="preview-time">{{ formatTime(currentTime) }} / 0:30</div>
          </div>

          <div class="preview-tracks">
            <div class="tracks-title">Tracklist</div>
            <div class="track-item" v-for="i in 6" :key="i">
              <span style="color: #bbb;">{{ i }}.</span>
              <span class="track-name" :style="{ color: i <= 2 ? '#999' : '#ddd' }">Track {{ i }} — {{ ['Intro', 'Main Theme', 'Interlude', 'Deep Cut', 'Bridge', 'Finale'][i-1] }}</span>
              <span style="color: #ccc; font-size: 0.75rem;">{{ Math.floor(Math.random() * 3 + 2) }}:{{ String(Math.floor(Math.random() * 60)).padStart(2, '0') }}</span>
            </div>
          </div>

          <div class="preview-actions">
            <div class="btn btn-primary" @click="addAndClose">Add to Cart</div>
            <div class="btn btn-secondary" @click="close">Close</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import type { Album } from '../types/album'
import { useCartStore } from '../stores/cartStore'

interface Props {
  album: Album | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()
const cartStore = useCartStore()

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = 30
const progress = computed(() => (currentTime.value / duration) * 100)
let timer: number | null = null

watch(
  () => props.album,
  (newAlbum, oldAlbum) => {
    if (newAlbum && !oldAlbum) {
      document.body.style.overflow = 'hidden'
      isPlaying.value = true
      timer = window.setInterval(() => {
        currentTime.value += 1
        if (currentTime.value >= duration) {
          stopPlayback()
          currentTime.value = 0
        }
      }, 1000)
    } else if (!newAlbum && oldAlbum) {
      stopPlayback()
      document.body.style.overflow = ''
    }
  }
)

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x400/667eea/white?text=Album+Cover'
}

const close = () => {
  emit('close')
}

const addAndClose = () => {
  if (props.album) cartStore.addToCart(props.album)
  close()
}

const togglePlay = () => {
  if (isPlaying.value) {
    stopPlayback()
  } else {
    isPlaying.value = true
    timer = window.setInterval(() => {
      currentTime.value += 1
      if (currentTime.value >= duration) {
        stopPlayback()
        currentTime.value = 0
      }
    }, 1000)
  }
}

const stopPlayback = () => {
  isPlaying.value = false
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  stopPlayback()
  document.body.style.overflow = ''
})
</script>

<style scoped>
.preview-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  animation: flashIn 0.4s ease;
}

@keyframes flashIn {
  0% { opacity: 0; background: white; }
  30% { background: white; }
  100% { opacity: 1; background: rgba(0, 0, 0, 0.7); }
}

.preview-dialog {
  background: #fff;
  color: #222;
  border-radius: 16px;
  max-width: 780px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.preview-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.04);
  color: #ccc;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.preview-body {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 1.5rem;
  padding: 1.5rem;
}

.preview-cover {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.preview-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-title {
  font-size: 1.6rem;
  font-weight: bold;
}

.preview-artist {
  color: #bbb;
  font-size: 0.95rem;
}

.preview-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #667eea;
}

.preview-player {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f4f4f8;
  border-radius: 10px;
  margin-top: 0.5rem;
}

.preview-play-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #667eea;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.preview-progress {
  flex: 1;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  overflow: hidden;
}

.preview-progress-bar {
  height: 100%;
  background: #667eea;
  transition: width 0.2s linear;
}

.preview-time {
  font-size: 0.8rem;
  color: #ccc;
  min-width: 5ch;
}

.preview-tracks {
  margin-top: 0.5rem;
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

.tracks-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.track-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.85rem;
  align-items: baseline;
}

.track-name {
  flex: 1;
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  border: 2px solid transparent;
}

.btn-primary {
  background: #667eea;
  color: #fff;
}

.btn-primary:hover {
  background: #5a6fd8;
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border-color: #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: #fff;
}

@media (max-width: 640px) {
  .preview-body {
    grid-template-columns: 1fr;
  }
}
</style>