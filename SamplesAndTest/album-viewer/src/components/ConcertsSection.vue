<template>
  <div class="concerts-section">
    <div class="section-header">
      <div class="section-title">🎤 Concerts Near You</div>
      <div class="section-subtitle">Showing concerts closest to Seattle</div>
    </div>

    <div class="sort-controls">
      <span class="sort-label">Sort by:</span>
      <span
        class="sort-option"
        :class="{ active: sortBy === 'distance' }"
        @click="sortBy = 'distance'"
      >
        Distance
      </span>
      <span
        class="sort-option"
        :class="{ active: sortBy === 'date' }"
        @click="sortBy = 'date'"
      >
        Date
      </span>
      <span
        class="sort-option"
        :class="{ active: sortBy === 'price' }"
        @click="sortBy = 'price'"
      >
        Price
      </span>
    </div>

    <div v-if="loading" class="loading-concerts">
      <div class="spinner"></div>
    </div>

    <div v-else class="concerts-grid">
      <ConcertCard
        v-for="concert in sortedConcerts"
        :key="concert.id"
        :concert="concert"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchConcerts } from '../stores/mockConcertService'
import ConcertCard from './ConcertCard.vue'
import type { Concert } from '../types/concert'

const concerts = ref<Concert[]>([])
const loading = ref(true)
const sortBy = ref<'distance' | 'date' | 'price'>('distance')

const sortedConcerts = computed(() => {
  const sorted = [...concerts.value]
  switch (sortBy.value) {
    case 'distance':
      return sorted.sort((a, b) => a.distanceKm - b.distanceKm)
    case 'date':
      return sorted.sort((a, b) => a.date.localeCompare(b.date))
    case 'price':
      return sorted.sort((a, b) => a.price - b.price)
    default:
      return sorted
  }
})

onMounted(async () => {
  concerts.value = await fetchConcerts()
  loading.value = false
})
</script>

<style scoped>
.concerts-section {
  margin-top: 3rem;
}

.section-header {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.25rem;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
}

.sort-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}

.sort-option {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.sort-option.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
}

.sort-option:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.loading-concerts {
  display: flex;
  justify-content: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.concerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}
</style>
