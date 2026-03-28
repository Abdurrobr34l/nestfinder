// Property type
export interface Property {
  _id: string
  id?: string
  title: string
  description: string
  images: string[]
  price: number
  priceType: "sale" | "rent"
  category: "apartment" | "house" | "commercial" | "land"
  status: "available" | "sold" | "rented"
  city: string
  area: string
  address: string
  bedrooms: number
  bathrooms: number
  sqft: number
  isFeatured: boolean
  rating: number
  owner: Owner
  createdBy?: string | { name: string; email: string; avatar: string }
  createdAt: string
}

// Owner type
export interface Owner {
  id?: string
  name: string
  phone: string
  whatsapp: string
  avatar: string
}

// User type
export interface User {
  _id?: string
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar: string
  phone?: string
  city?: string
  bio?: string
  createdAt: string
}

// Review type
export interface Review {
  _id: string
  id?: string
  propertyId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  createdAt: string
}

// Booking type
export interface Booking {
  _id: string
  id?: string
  propertyId: string | { title: string; images: string[]; city: string; price: number }
  propertyTitle: string
  propertyImage: string
  userId: string
  bookingType: "tour" | "purchase" | "rent"
  scheduledDate: string
  status: "pending" | "confirmed" | "cancelled"
  price: number
  createdAt: string
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Filter types
export interface PropertyFilters {
  city: string
  category: string
  priceType: string
  minPrice: number
  maxPrice: number
  bedrooms: string
  sortBy: string
}

// API response type
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  meta?: {
    page: number
    limit: number
    total: number
  }
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number
  totalProperties: number
  totalReviews: number
  totalBookings: number
}

export interface ChartData {
  bookingsByStatus: { _id: string; count: number }[]
  propertiesByCategory: { _id: string; count: number }[]
  propertiesByCity: { _id: string; count: number }[]
}

// // Property type
// export interface Property {
//   id: string
//   title: string
//   description: string
//   images: string[]
//   price: number
//   priceType: "sale" | "rent"
//   category: "apartment" | "house" | "commercial" | "land"
//   status: "available" | "sold" | "rented"
//   city: string
//   area: string
//   address: string
//   bedrooms: number
//   bathrooms: number
//   sqft: number
//   isFeatured: boolean
//   owner: Owner
//   createdAt: string
// }

// // Owner type
// export interface Owner {
//   id: string
//   name: string
//   phone: string
//   whatsapp: string
//   avatar: string
// }

// // User type
// export interface User {
//   id: string
//   name: string
//   email: string
//   role: "user" | "admin"
//   avatar: string
//   createdAt: string
// }

// // Review type
// export interface Review {
//   id: string
//   propertyId: string
//   userId: string
//   userName: string
//   userAvatar: string
//   rating: number
//   comment: string
//   createdAt: string
// }

// // Booking type
// export interface Booking {
//   id: string
//   propertyId: string
//   propertyTitle: string
//   propertyImage: string
//   userId: string
//   bookingType: "tour" | "purchase" | "rent"
//   scheduledDate: string
//   status: "pending" | "confirmed" | "cancelled"
//   price: number
// }

// // Auth types
// export interface LoginCredentials {
//   email: string
//   password: string
// }

// export interface RegisterCredentials {
//   name: string
//   email: string
//   password: string
//   confirmPassword: string
// }

// // Filter types
// export interface PropertyFilters {
//   city: string
//   category: string
//   priceType: string
//   minPrice: number
//   maxPrice: number
//   bedrooms: string
//   sortBy: string
// }

// // API response type
// export interface ApiResponse<T> {
//   success: boolean
//   message: string
//   data: T
//   meta?: {
//     page: number
//     limit: number
//     total: number
//   }
// }