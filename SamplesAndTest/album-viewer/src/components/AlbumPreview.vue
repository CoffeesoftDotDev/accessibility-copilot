<template>
  <div
    v-if="album"
    class="preview-backdrop"
    @click.self="close"
  >
    <div
      ref="dialogRef"
      class="preview-dialog"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="descId"
      tabindex="-1"
      @keydown.esc.stop="close"
      @keydown.tab="trapFocus"
    >
      <button
        ref="closeBtnRef"
        type="button"
        class="preview-close"
        aria-label="Close preview"
        @click="close"
      >
        ×
      </button>

      <div class="preview-body">
        <img
          :src="album.image_url"
          :alt="`${album.title} album cover`"
          class="preview-cover"
          @error="handleImageError"
        />
        <div class="preview-info">
          <h2 :id="titleId" class="preview-title">{{ album.title }}</h2>
          <p :id="descId" class="preview-artist">by {{ album.artist }}</p>
          <p class="preview-price">${{ album.price.toFixed(2) }}</p>

          <div class="preview-player" aria-label="Audio preview (demo)">
            <button
              type="button"
              class="preview-play-btn"
              :aria-pressed="isPlaying"
              @click="togglePlay"
            >
              <span aria-hidden="true">{{ isPlaying ? '❚❚' : '▶' }}</span>
              <span class="sr-only">{{ isPlaying ? 'Pause preview' : 'Play preview' }}</span>
            </button>
            <div class="preview-progress" aria-hidden="true">
              <div class="preview-progress-bar" :style="{ width: progress + '%' }"></div>
            </div>
            <span class="preview-time" aria-hidden="true">{{ formatTime(currentTime) }} / 0:30</span>
          </div>

          <div class="preview-actions">
            <button type="button" class="btn btn-primary" @click="addAndClose">
              Add to Cart
            </button>
            <button type="button" class="btn btn-secondary" @click="close">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import type { Album } from '../types/album'
import { useCartStore } from '../stores/cartStore'

interface Props {
  album: Album | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()

const cartStore = useCartStore()
const dialogRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
const previouslyFocused = ref<HTMLElement | null>(null)

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = 30
const progress = computed(() => (currentTime.value / duration) * 100)
let timer: number | null = null

const titleId = computed(() => `preview-title-${props.album?.id ?? 'x'}`)
const descId = computed(() => `preview-desc-${props.album?.id ?? 'x'}`)

watch(
  () => props.album,
  async (newAlbum, oldAlbum) => {
    if (newAlbum && !oldAlbum) {
      previouslyFocused.value = document.activeElement as HTMLElement
      await nextTick()
      closeBtnRef.value?.focus()
      document.body.style.overflow = 'hidden'
    } else if (!newAlbum && oldAlbum) {
      stopPlayback()
      document.body.style.overflow = ''
      previouslyFocused.value?.focus?.()
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

const trapFocus = (e: KeyboardEvent) => {
  if (!dialogRef.value) return
  const focusables = dialogRef.value.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

onUnmounted(() => {
  stopPlayback()
  document.body.style.overflow = ''
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.preview-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  animation: fade-in 0.15s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.preview-dialog {
  background: #fff;
  color: #222;
  border-radius: 16px;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  outline: none;
}

.preview-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid transparent;
  background: rgba(0, 0, 0, 0.06);
  color: #222;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.preview-close:hover,
.preview-close:focus-visible {
  background: rgba(0, 0, 0, 0.12);
  outline: 2px solid #667eea;
  outline-offset: 2px;
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
  gap: 0.75rem;
}

.preview-title {
  font-size: 1.6rem;
  margin: 0;
  line-height: 1.2;
}

.preview-artist {
  color: #555;
  margin: 0;
  font-size: 1.05rem;
}

.preview-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #667eea;
  margin: 0.25rem 0;
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
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #667eea;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  flex-shrink: 0;
}

.preview-play-btn:focus-visible {
  outline: 3px solid #222;
  outline-offset: 2px;
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
  font-variant-numeric: tabular-nums;
  font-size: 0.85rem;
  color: #555;
  min-width: 5ch;
  text-align: right;
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid transparent;
}

.btn-primary {
  background: #667eea;
  color: #fff;
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background: #5a6fd8;
  outline: 2px solid #222;
  outline-offset: 2px;
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border-color: #667eea;
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
  background: #667eea;
  color: #fff;
  outline: 2px solid #222;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .preview-body {
    grid-template-columns: 1fr;
  }
  .preview-cover {
    max-width: 260px;
    margin: 0 auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-backdrop { animation: none; }
  .preview-progress-bar { transition: none; }
}
</style>
