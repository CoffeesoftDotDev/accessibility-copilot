<template>
  <div class="concert-card" :class="{ 'sold-out': concert.availableTickets === 0 }">
    <div class="concert-image">
      <img :src="concert.image_url" @error="handleImageError" />
      <div class="distance-badge">{{ concert.distanceKm }} km</div>
      <div v-if="concert.availableTickets === 0" class="sold-out-badge">SOLD OUT</div>
      <div v-else-if="concert.availableTickets <= 10" class="low-tickets-badge">
        {{ concert.availableTickets }} left!
      </div>
    </div>

    <div class="concert-info">
      <div class="concert-artist">{{ concert.artist }}</div>
      <div class="concert-venue">📍 {{ concert.venue }}, {{ concert.city }}</div>
      <div class="concert-date">
        📅 {{ formatDate(concert.date) }} at {{ concert.time }}
      </div>
      <div class="concert-price">${{ concert.price.toFixed(2) }}</div>
    </div>

    <div class="concert-actions">
      <div
        class="btn btn-primary"
        :class="{ 'btn-disabled': concert.availableTickets === 0 }"
        @click="followConcert"
      >
        {{ isFollowing ? '★ Following' : '☆ Follow' }}
      </div>
      <div
        v-if="concert.availableTickets > 0"
        class="btn btn-secondary"
        @click="addToCart"
      >
        🎫 Get Tickets
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Concert } from '../types/concert'

interface Props {
  concert: Concert
}

const props = defineProps<Props>()
const isFollowing = ref(false)

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x180/667eea/white?text=Concert'
}

const followConcert = () => {
  isFollowing.value = !isFollowing.value
}

const addToCart = () => {
  // Placeholder — could integrate with cart store for ticket purchases
  alert(`Ticket for ${props.concert.artist} at ${props.concert.venue} added!`)
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<style scoped>
.concert-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.concert-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.concert-card.sold-out {
  opacity: 0.65;
}

.concert-image {
  position: relative;
  overflow: hidden;
}

.concert-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.distance-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.sold-out-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #e53e3e;
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.low-tickets-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #f59e0b;
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.concert-info {
  padding: 1.25rem;
}

.concert-artist {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.concert-venue {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.concert-date {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.75rem;
}

.concert-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #667eea;
}

.concert-actions {
  padding: 0 1.25rem 1.25rem;
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.65rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
}

.btn-primary.btn-disabled {
  background: #ccc;
  cursor: not-allowed;
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
