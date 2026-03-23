import type { Review } from "../Types"

export const reviews: Review[] = [
  {
    id: "r1",
    propertyId: "1",
    userId: "u1",
    userName: "Sakib Al Hasan",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    rating: 5,
    comment: "Excellent apartment! The location is perfect, very close to everything. The owner is very cooperative and the building is well maintained. Highly recommended for families.",
    createdAt: "2024-02-01"
  },
  {
    id: "r2",
    propertyId: "1",
    userId: "u2",
    userName: "Fatema Begum",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 4,
    comment: "Very nice apartment in a great location. The rooms are spacious and well ventilated. Only minor issue is the parking can get crowded sometimes. Overall a great place to live.",
    createdAt: "2024-02-10"
  },
  {
    id: "r3",
    propertyId: "1",
    userId: "u3",
    userName: "Tanvir Ahmed",
    userAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    rating: 5,
    comment: "Lived here for 2 years and loved every moment. The neighborhood is safe and friendly. The owner responds quickly to any maintenance requests. Would definitely recommend.",
    createdAt: "2024-02-20"
  },
  {
    id: "r4",
    propertyId: "2",
    userId: "u4",
    userName: "Reshma Khatun",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    rating: 5,
    comment: "Absolutely stunning villa! The garden is beautiful and the interior is luxurious. Perfect for a large family. The Dhanmondi location is unbeatable. Worth every taka.",
    createdAt: "2024-02-25"
  },
  {
    id: "r5",
    propertyId: "2",
    userId: "u5",
    userName: "Imran Hossain",
    userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    rating: 4,
    comment: "Great property in an excellent location. The house is spacious and well built. The price is a bit high but the quality justifies it. Good investment for the future.",
    createdAt: "2024-03-01"
  },
  {
    id: "r6",
    propertyId: "5",
    userId: "u6",
    userName: "Nusrat Jahan",
    userAvatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100",
    rating: 5,
    comment: "The sea view from this apartment is absolutely breathtaking! Waking up to the sound of waves is priceless. The apartment is modern and well furnished. Perfect vacation home.",
    createdAt: "2024-03-05"
  },
  {
    id: "r7",
    propertyId: "5",
    userId: "u7",
    userName: "Arif Billah",
    userAvatar: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=100",
    rating: 4,
    comment: "Lovely apartment with amazing views. The building is secure and well maintained. The owner is very friendly and helpful. Chittagong is a beautiful city and this location is ideal.",
    createdAt: "2024-03-10"
  },
  {
    id: "r8",
    propertyId: "7",
    userId: "u8",
    userName: "Maliha Sultana",
    userAvatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=100",
    rating: 5,
    comment: "A hidden gem in Sylhet! The tea garden views are magical especially in the morning. Very peaceful and relaxing environment. Perfect escape from the city noise. Highly recommended.",
    createdAt: "2024-03-15"
  }
]

export const getReviewsByPropertyId = (propertyId: string) =>
  reviews.filter(r => r.propertyId === propertyId)

export const getAverageRating = (propertyId: string) => {
  const propertyReviews = getReviewsByPropertyId(propertyId)
  if (propertyReviews.length === 0) return 0
  const total = propertyReviews.reduce((sum, r) => sum + r.rating, 0)
  return Math.round((total / propertyReviews.length) * 10) / 10
}