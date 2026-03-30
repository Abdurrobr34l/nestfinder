import type { Property } from "../Types"

export const properties: Property[] = [
  {
    _id: "1",
    id: "1",
    title: "Modern Apartment in Gulshan",
    description: "A beautiful modern apartment located in the heart of Gulshan, Dhaka. This spacious apartment features contemporary design with high-end finishes. Perfect for families or professionals looking for a comfortable living space in a prime location. The apartment is surrounded by restaurants, shopping centers, and excellent transport links.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    price: 45000,
    priceType: "rent",
    category: "apartment",
    status: "available",
    city: "Dhaka",
    area: "Gulshan",
    address: "House 12, Road 5, Gulshan-2, Dhaka",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    isFeatured: true,
    rating: 4.5,
    owner: {
      id: "o1",
      name: "Rahman Ahmed",
      phone: "+8801711000001",
      whatsapp: "8801711000001",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    createdAt: "2024-01-15"
  },
  {
    _id: "2",
    id: "2",
    title: "Luxury Villa in Dhanmondi",
    description: "Stunning luxury villa in the prestigious Dhanmondi area. This property offers exceptional living standards with a private garden, garage, and premium interiors. Ideal for large families who value space, privacy, and elegance. Close to top schools, hospitals, and shopping malls.",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800"
    ],
    price: 3500000,
    priceType: "sale",
    category: "house",
    status: "available",
    city: "Dhaka",
    area: "Dhanmondi",
    address: "Road 27, Dhanmondi, Dhaka",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    isFeatured: true,
    rating: 4.8,
    owner: {
      id: "o2",
      name: "Karim Hossain",
      phone: "+8801811000002",
      whatsapp: "8801811000002",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
    },
    createdAt: "2024-01-20"
  },
  {
    _id: "3",
    id: "3",
    title: "Affordable Flat in Mirpur",
    description: "A cozy and affordable flat in Mirpur, perfect for small families or couples. The flat is located in a secure building with 24/7 security. Easy access to public transport, markets, and schools. A great option for those looking for budget-friendly housing in Dhaka.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
    ],
    price: 18000,
    priceType: "rent",
    category: "apartment",
    status: "available",
    city: "Dhaka",
    area: "Mirpur",
    address: "Block D, Mirpur-10, Dhaka",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    isFeatured: false,
    rating: 4.2,
    owner: {
      id: "o3",
      name: "Nasrin Begum",
      phone: "+8801911000003",
      whatsapp: "8801911000003",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    createdAt: "2024-02-01"
  },
  {
    _id: "4",
    id: "4",
    title: "Commercial Space in Motijheel",
    description: "Prime commercial office space in Motijheel, the business hub of Dhaka. This space is ideal for corporate offices, banks, or retail businesses. The building has modern facilities including elevators, backup power, and parking. Excellent visibility and footfall in one of Dhaka's busiest areas.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
    ],
    price: 80000,
    priceType: "rent",
    category: "commercial",
    status: "available",
    city: "Dhaka",
    area: "Motijheel",
    address: "Dilkusha Commercial Area, Motijheel, Dhaka",
    bedrooms: 0,
    bathrooms: 2,
    sqft: 2500,
    isFeatured: true,
    rating: 4.6,
    owner: {
      id: "o4",
      name: "Iqbal Chowdhury",
      phone: "+8801611000004",
      whatsapp: "8801611000004",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    createdAt: "2024-02-10"
  },
  {
    _id: "5",
    id: "5",
    title: "Sea View Apartment in Chittagong",
    description: "Breathtaking sea view apartment located in the beautiful port city of Chittagong. Wake up every morning to stunning views of the Bay of Bengal. This premium apartment features modern amenities, spacious rooms, and a large balcony. Perfect for those who love the ocean.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
    ],
    price: 35000,
    priceType: "rent",
    category: "apartment",
    status: "available",
    city: "Chittagong",
    area: "Patenga",
    address: "Patenga Beach Road, Chittagong",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    isFeatured: true,
    rating: 4.7,
    owner: {
      id: "o5",
      name: "Farhan Islam",
      phone: "+8801711000005",
      whatsapp: "8801711000005",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100"
    },
    createdAt: "2024-02-15"
  },
  {
    _id: "6",
    id: "6",
    title: "Family House in Nasirabad",
    description: "Spacious family house in the quiet residential area of Nasirabad, Chittagong. This well-maintained property has a large garden, multiple living areas, and modern kitchen. The neighborhood is peaceful with good schools and parks nearby. Great for families seeking a calm lifestyle.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
    ],
    price: 1800000,
    priceType: "sale",
    category: "house",
    status: "available",
    city: "Chittagong",
    area: "Nasirabad",
    address: "Nasirabad Housing Society, Chittagong",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    isFeatured: false,
    rating: 4.4,
    owner: {
      id: "o6",
      name: "Sultana Parvin",
      phone: "+8801811000006",
      whatsapp: "8801811000006",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
    },
    createdAt: "2024-02-20"
  },
  {
    _id: "7",
    id: "7",
    title: "Tea Garden View Cottage in Sylhet",
    description: "Unique cottage with stunning views of lush tea gardens in Sylhet. This charming property is perfect for those who want to escape the city and enjoy nature. Surrounded by greenery, fresh air, and peaceful environment. Ideal as a vacation home or permanent residence for nature lovers.",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"
    ],
    price: 25000,
    priceType: "rent",
    category: "house",
    status: "available",
    city: "Sylhet",
    area: "Jalalabad",
    address: "Tea Estate Road, Jalalabad, Sylhet",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    isFeatured: true,
    rating: 4.9,
    owner: {
      id: "o7",
      name: "Aminul Islam",
      phone: "+8801911000007",
      whatsapp: "8801911000007",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
    },
    createdAt: "2024-03-01"
  },
  {
    _id: "8",
    id: "8",
    title: "Modern Flat in Sylhet City",
    description: "Contemporary flat in the heart of Sylhet city. This modern apartment offers comfortable urban living with easy access to markets, restaurants, and transport. The building has modern security systems and backup power. Great for working professionals or small families.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"
    ],
    price: 20000,
    priceType: "rent",
    category: "apartment",
    status: "available",
    city: "Sylhet",
    area: "Zindabazar",
    address: "Zindabazar Main Road, Sylhet",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    isFeatured: false,
    rating: 4.3,
    owner: {
      id: "o8",
      name: "Ruksana Khatun",
      phone: "+8801611000008",
      whatsapp: "8801611000008",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100"
    },
    createdAt: "2024-03-05"
  },
  {
    _id: "9",
    id: "9",
    title: "Budget Apartment in Rajshahi",
    description: "Affordable and comfortable apartment in Rajshahi city. This clean and well-maintained flat is perfect for students or young professionals. Located near Rajshahi University and major shopping areas. A great value-for-money option in one of Bangladesh's major cities.",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
    ],
    price: 12000,
    priceType: "rent",
    category: "apartment",
    status: "available",
    city: "Rajshahi",
    area: "Boalia",
    address: "Boalia, Rajshahi",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    isFeatured: false,
    rating: 4.1,
    owner: {
      id: "o9",
      name: "Habibur Rahman",
      phone: "+8801711000009",
      whatsapp: "8801711000009",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100"
    },
    createdAt: "2024-03-10"
  },
  {
    _id: "10",
    id: "10",
    title: "Land Plot in Rajshahi",
    description: "Prime land plot available for sale in a developing area of Rajshahi. This flat land is perfect for building your dream home or investment purposes. The area has good road connectivity and is rapidly developing with new infrastructure. A great long-term investment opportunity.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800"
    ],
    price: 500000,
    priceType: "sale",
    category: "land",
    status: "available",
    city: "Rajshahi",
    area: "Paba",
    address: "Paba Upazila, Rajshahi",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 5000,
    isFeatured: false,
    rating: 4.0,
    owner: {
      id: "o10",
      name: "Mozammel Haque",
      phone: "+8801811000010",
      whatsapp: "8801811000010",
      avatar: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=100"
    },
    createdAt: "2024-03-15"
  }
]

export const cities = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]

export const getFeaturedProperties = () => properties.filter(p => p.isFeatured)

export const getPropertiesByCity = (city: string) => properties.filter(p => p.city === city)

export const getPropertyById = (id: string) => properties.find(p => p.id === id)