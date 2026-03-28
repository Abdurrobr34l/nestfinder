import axiosInstance from "./axiosInstance"

// Auth
export const authAPI = {
  login: (email: string, password: string) =>
    axiosInstance.post("/auth/login", { email, password }),
  register: (name: string, email: string, password: string) =>
    axiosInstance.post("/auth/register", { name, email, password }),
  getMe: () => axiosInstance.get("/auth/me")
}

// Properties
export const propertyAPI = {
  getAll: (params?: Record<string, string>) =>
    axiosInstance.get("/properties", { params }),
  getById: (id: string) =>
    axiosInstance.get(`/properties/${id}`),
  getFeatured: () =>
    axiosInstance.get("/properties/featured"),
  create: (data: Record<string, unknown>) =>
    axiosInstance.post("/properties", data),
  update: (id: string, data: Record<string, unknown>) =>
    axiosInstance.patch(`/properties/${id}`, data),
  delete: (id: string) =>
    axiosInstance.delete(`/properties/${id}`)
}

// Reviews
export const reviewAPI = {
  getByProperty: (propertyId: string) =>
    axiosInstance.get(`/reviews/property/${propertyId}`),
  create: (data: { rating: number; comment: string; propertyId: string }) =>
    axiosInstance.post("/reviews", data),
  delete: (id: string) =>
    axiosInstance.delete(`/reviews/${id}`),
  getAll: () =>
    axiosInstance.get("/reviews")
}

// Bookings
export const bookingAPI = {
  create: (data: Record<string, unknown>) =>
    axiosInstance.post("/bookings", data),
  getMyBookings: () =>
    axiosInstance.get("/bookings/my"),
  getAll: () =>
    axiosInstance.get("/bookings"),
  updateStatus: (id: string, status: string) =>
    axiosInstance.patch(`/bookings/${id}`, { status }),
  delete: (id: string) =>
    axiosInstance.delete(`/bookings/${id}`)
}

// Users
export const userAPI = {
  getAll: () => axiosInstance.get("/users"),
  getById: (id: string) => axiosInstance.get(`/users/${id}`),
  updateMyProfile: (data: Record<string, unknown>) =>
    axiosInstance.patch("/users/me", data),
  updateRole: (userId: string, role: string) =>
    axiosInstance.patch("/users/role", { userId, role }),
  delete: (id: string) => axiosInstance.delete(`/users/${id}`)
}

// Dashboard
export const dashboardAPI = {
  getStats: () => axiosInstance.get("/dashboard/stats"),
  getChartData: () => axiosInstance.get("/dashboard/chart-data")
}

// AI
export const aiAPI = {
  chat: (message: string, history: { role: string; content: string }[]) =>
    axiosInstance.post("/ai/chat", { message, history }),
  reviewSummary: (reviews: { rating: number; comment: string }[]) =>
    axiosInstance.post("/ai/review-summary", { reviews })
}