// Database connection and query utilities
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Flight {
  id: number
  airline_code: string
  airline_name: string
  airline_logo: string
  flight_number: string
  departure_airport_code: string
  departure_airport_name: string
  departure_city: string
  arrival_airport_code: string
  arrival_airport_name: string
  arrival_city: string
  departure_time: string
  arrival_time: string
  duration_minutes: number
  aircraft_type: string
  price_economy: number
  price_business: number
  price_first: number
  available_seats: number
  stops: number
}

export interface Hotel {
  id: number
  chain_name: string
  name: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  star_rating: number
  rating: number
  review_count: number
  description: string
  amenities: string[]
  images: string[]
  phone: string
  email: string
  website: string
  rooms: HotelRoom[]
}

export interface HotelRoom {
  id: number
  room_type: string
  description: string
  max_occupancy: number
  size_sqm: number
  amenities: string[]
  price_per_night: number
  available_rooms: number
}

export interface Restaurant {
  id: number
  name: string
  cuisine_type: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  rating: number
  review_count: number
  price_range: string
  description: string
  features: string[]
  menu: { category: string; items: string[] }[]
  phone: string
  website: string
  opening_hours: Record<string, string>
  images: string[]
}

export interface Place {
  id: number
  name: string
  category: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  rating: number
  review_count: number
  description: string
  highlights: string[]
  features: string[]
  opening_hours: Record<string, string>
  ticket_price: number
  duration_hours: number
  best_time_to_visit: string
  how_to_get_there: string
  images: string[]
  website: string
}

// Flight search functions
export async function searchFlights(params: {
  from?: string
  to?: string
  departure_date?: string
  return_date?: string
  passengers?: number
  class?: string
}): Promise<Flight[]> {
  let query = `
    SELECT 
      f.id,
      al.code as airline_code,
      al.name as airline_name,
      al.logo_url as airline_logo,
      f.flight_number,
      dep.code as departure_airport_code,
      dep.name as departure_airport_name,
      dep.city as departure_city,
      arr.code as arrival_airport_code,
      arr.name as arrival_airport_name,
      arr.city as arrival_city,
      f.departure_time,
      f.arrival_time,
      f.duration_minutes,
      f.aircraft_type,
      f.price_economy,
      f.price_business,
      f.price_first,
      f.available_seats,
      f.stops
    FROM flights f
    JOIN airlines al ON f.airline_id = al.id
    JOIN airports dep ON f.departure_airport_id = dep.id
    JOIN airports arr ON f.arrival_airport_id = arr.id
    WHERE f.available_seats > 0
  `

  const conditions = []
  if (params.from) {
    conditions.push(`(dep.code ILIKE '%${params.from}%' OR dep.city ILIKE '%${params.from}%')`)
  }
  if (params.to) {
    conditions.push(`(arr.code ILIKE '%${params.to}%' OR arr.city ILIKE '%${params.to}%')`)
  }
  if (params.departure_date) {
    conditions.push(`DATE(f.departure_time) = '${params.departure_date}'`)
  }

  if (conditions.length > 0) {
    query += ` AND ${conditions.join(" AND ")}`
  }

  query += ` ORDER BY f.price_economy ASC LIMIT 50`

  const results = await sql(query)
  return results as Flight[]
}

// Hotel search functions
export async function searchHotels(params: {
  location?: string
  checkin?: string
  checkout?: string
  guests?: number
  rooms?: number
}): Promise<Hotel[]> {
  let query = `
    SELECT 
      h.id,
      hc.name as chain_name,
      h.name,
      h.address,
      h.city,
      h.country,
      h.latitude,
      h.longitude,
      h.star_rating,
      h.rating,
      h.review_count,
      h.description,
      h.amenities,
      h.images,
      h.phone,
      h.email,
      h.website
    FROM hotels h
    LEFT JOIN hotel_chains hc ON h.chain_id = hc.id
    WHERE 1=1
  `

  if (params.location) {
    query += ` AND (h.city ILIKE '%${params.location}%' OR h.country ILIKE '%${params.location}%')`
  }

  query += ` ORDER BY h.rating DESC LIMIT 20`

  const hotels = (await sql(query)) as Hotel[]

  // Get rooms for each hotel
  for (const hotel of hotels) {
    const rooms = await sql(`
      SELECT id, room_type, description, max_occupancy, size_sqm, amenities, price_per_night, available_rooms
      FROM hotel_rooms 
      WHERE hotel_id = ${hotel.id} AND available_rooms > 0
      ORDER BY price_per_night ASC
    `)
    hotel.rooms = rooms as HotelRoom[]
  }

  return hotels
}

// Restaurant search functions
export async function searchRestaurants(params: {
  location?: string
  cuisine?: string
  price_range?: string
}): Promise<Restaurant[]> {
  let query = `
    SELECT *
    FROM restaurants
    WHERE 1=1
  `

  if (params.location) {
    query += ` AND (city ILIKE '%${params.location}%' OR country ILIKE '%${params.location}%')`
  }
  if (params.cuisine) {
    query += ` AND cuisine_type ILIKE '%${params.cuisine}%'`
  }
  if (params.price_range) {
    query += ` AND price_range = '${params.price_range}'`
  }

  query += ` ORDER BY rating DESC LIMIT 20`

  const results = await sql(query)
  return results as Restaurant[]
}

// Places search functions
export async function searchPlaces(params: {
  location?: string
  category?: string
}): Promise<Place[]> {
  let query = `
    SELECT *
    FROM places
    WHERE 1=1
  `

  if (params.location) {
    query += ` AND (city ILIKE '%${params.location}%' OR country ILIKE '%${params.location}%')`
  }
  if (params.category) {
    query += ` AND category ILIKE '%${params.category}%'`
  }

  query += ` ORDER BY rating DESC LIMIT 20`

  const results = await sql(query)
  return results as Place[]
}

// Get individual records by ID
export async function getFlightById(id: number): Promise<Flight | null> {
  const results = await sql(`
    SELECT 
      f.id,
      al.code as airline_code,
      al.name as airline_name,
      al.logo_url as airline_logo,
      f.flight_number,
      dep.code as departure_airport_code,
      dep.name as departure_airport_name,
      dep.city as departure_city,
      arr.code as arrival_airport_code,
      arr.name as arrival_airport_name,
      arr.city as arrival_city,
      f.departure_time,
      f.arrival_time,
      f.duration_minutes,
      f.aircraft_type,
      f.price_economy,
      f.price_business,
      f.price_first,
      f.available_seats,
      f.stops
    FROM flights f
    JOIN airlines al ON f.airline_id = al.id
    JOIN airports dep ON f.departure_airport_id = dep.id
    JOIN airports arr ON f.arrival_airport_id = arr.id
    WHERE f.id = ${id}
  `)

  return (results[0] as Flight) || null
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  const results = await sql(`
    SELECT 
      h.id,
      hc.name as chain_name,
      h.name,
      h.address,
      h.city,
      h.country,
      h.latitude,
      h.longitude,
      h.star_rating,
      h.rating,
      h.review_count,
      h.description,
      h.amenities,
      h.images,
      h.phone,
      h.email,
      h.website
    FROM hotels h
    LEFT JOIN hotel_chains hc ON h.chain_id = hc.id
    WHERE h.id = ${id}
  `)

  if (results[0]) {
    const hotel = results[0] as Hotel
    const rooms = await sql(`
      SELECT id, room_type, description, max_occupancy, size_sqm, amenities, price_per_night, available_rooms
      FROM hotel_rooms 
      WHERE hotel_id = ${hotel.id}
      ORDER BY price_per_night ASC
    `)
    hotel.rooms = rooms as HotelRoom[]
    return hotel
  }

  return null
}

export async function getRestaurantById(id: number): Promise<Restaurant | null> {
  const results = await sql(`SELECT * FROM restaurants WHERE id = ${id}`)
  return (results[0] as Restaurant) || null
}

export async function getPlaceById(id: number): Promise<Place | null> {
  const results = await sql(`SELECT * FROM places WHERE id = ${id}`)
  return (results[0] as Place) || null
}
