import type { Concert } from '../types/concert'

const mockConcerts: Concert[] = [
  {
    id: 1,
    artist: 'Daprize',
    venue: 'The Cloud Arena',
    city: 'Seattle',
    date: '2026-05-15',
    time: '20:00',
    distanceKm: 5,
    price: 45.00,
    image_url: 'https://aka.ms/albums-daprlogo',
    availableTickets: 120,
  },
  {
    id: 2,
    artist: 'The Blue-Green Stripes',
    venue: 'Container Hall',
    city: 'Portland',
    date: '2026-05-22',
    time: '19:30',
    distanceKm: 12,
    price: 55.00,
    image_url: 'https://aka.ms/albums-containerappslogo',
    availableTickets: 45,
  },
  {
    id: 3,
    artist: 'KEDA Club',
    venue: 'Scale Stadium',
    city: 'Seattle',
    date: '2026-06-01',
    time: '21:00',
    distanceKm: 3,
    price: 60.00,
    image_url: 'https://aka.ms/albums-kedalogo',
    availableTickets: 200,
  },
  {
    id: 4,
    artist: 'MegaDNS',
    venue: 'The Resolver Room',
    city: 'San Francisco',
    date: '2026-06-10',
    time: '20:30',
    distanceKm: 28,
    price: 40.00,
    image_url: 'https://aka.ms/albums-envoylogo',
    availableTickets: 8,
  },
  {
    id: 5,
    artist: 'V is for VNET',
    venue: 'Private Network Lounge',
    city: 'Seattle',
    date: '2026-06-18',
    time: '19:00',
    distanceKm: 7,
    price: 35.00,
    image_url: 'https://aka.ms/albums-vnetlogo',
    availableTickets: 0,
  },
  {
    id: 6,
    artist: 'Guns N Probeses',
    venue: 'Health Check Theater',
    city: 'Redmond',
    date: '2026-07-04',
    time: '18:00',
    distanceKm: 15,
    price: 70.00,
    image_url: 'https://aka.ms/albums-containerappslogo',
    availableTickets: 350,
  },
]

export function fetchConcerts(): Promise<Concert[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockConcerts), 400)
  })
}

export function fetchConcertsByArtist(artist: string): Promise<Concert[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockConcerts.filter(c => c.artist === artist)), 200)
  })
}
