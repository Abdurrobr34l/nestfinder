import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { Search, MapPin, TrendingUp, ChevronRight, Star, Building, Home as HomeIcon, Trees, Store } from "lucide-react"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import PropertyCard from "../Components/Property/PropertyCard"
import SkeletonCard from "../Components/Property/SkeletonCard"
import { propertyAPI } from "../lib/api"

const Home = () => {
  const [searchCity, setSearchCity] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [featuredProperties, setFeaturedProperties] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await propertyAPI.getFeatured()
        setFeaturedProperties(res.data.data)
      } catch (error) {
        console.error("Failed to fetch featured properties", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      navigate(`/explore?city=${searchCity}`)
    }
  }

  const cities = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]

  const stats = [
    { label: "Total Listings", value: "500+" },
    { label: "Cities Covered", value: "4" },
    { label: "Happy Clients", value: "1,200+" },
    { label: "Property Owners", value: "300+" },
  ]

  const categoryItems = [
    { label: "Apartments", value: "apartment", icon: <Building size={28} />, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400" },
    { label: "Houses", value: "house", icon: <HomeIcon size={28} />, color: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
    { label: "Commercial", value: "commercial", icon: <Store size={28} />, color: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
    { label: "Land", value: "land", icon: <Trees size={28} />, color: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" },
  ]

  const steps = [
    { step: "01", title: "Search Your City", desc: "Type your city name like Dhaka or Chittagong to find available properties in that area." },
    { step: "02", title: "Browse Properties", desc: "View all available properties with photos, prices, and details. Filter by type and price range." },
    { step: "03", title: "Contact Owner", desc: "Found your perfect property? Get the owner's contact number and reach out directly." },
  ]

  const testimonials = [
    { name: "Sakib Ahmed", city: "Dhaka", rating: 5, comment: "Found my dream apartment in Gulshan within 2 days. The platform is so easy to use and the listings are genuine.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
    { name: "Fatema Begum", city: "Chittagong", rating: 5, comment: "I was looking for a house in Nasirabad for months. NestFinder helped me find the perfect one in just a week!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { name: "Tanvir Islam", city: "Sylhet", rating: 4, comment: "Great platform for finding properties in Sylhet. The owners are genuine and the contact process is very smooth.", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100" },
  ]

  const faqs = [
    { q: "How do I find properties in my city?", a: "Simply type your city name in the search bar on the homepage or explore page. You will see all available properties in that city instantly." },
    { q: "How do I contact a property owner?", a: "Click on any property card to go to the details page. There you will find the owner's contact number and a WhatsApp button. You need to be logged in to see the full number." },
    { q: "Is NestFinder free to use?", a: "Yes, browsing and searching properties is completely free. Property owners can list one property for free and pay a small fee for additional listings." },
    { q: "How do I list my property on NestFinder?", a: "Click the Submit Property button and fill in your property details including photos, price, and contact number. Our team will review and publish it within 24 hours." },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[65vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')" }}
      >
        <div className="absolute inset-0 bg-blue-950/70" />
        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Home in Bangladesh
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Search thousands of properties across Dhaka, Chittagong, Sylhet and Rajshahi
          </p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin size={20} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by city — Dhaka, Chittagong, Sylhet..."
                value={searchCity}
                onChange={e => setSearchCity(e.target.value)}
                className="w-full text-gray-800 dark:text-white bg-transparent outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors font-medium"
            >
              <Search size={18} />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-800 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Properties</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Hand-picked properties just for you</p>
          </div>
          <Link
            to="/explore"
            className="flex items-center gap-1 text-blue-800 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : featuredProperties.length > 0
              ? featuredProperties.slice(0, 4).map((p: any) => <PropertyCard key={p._id} property={p} />)
              : <p className="text-gray-500 col-span-4 text-center py-8">No featured properties yet.</p>
          }
        </div>
      </section>

      {/* Browse by City */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Browse by City</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Find properties in your preferred city</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map(city => (
              <Link
                key={city}
                to={`/explore?city=${city}`}
                className="group relative h-40 rounded-2xl overflow-hidden"
              >
                <img
                  src={`https://images.unsplash.com/photo-${city === "Dhaka" ? "1558618666-fcd25c85cd64" : city === "Chittagong" ? "1571896349842-33c89424de2d" : city === "Sylhet" ? "1449158743715-0a90ebb6d2d8" : "1578662996442-48f60103fc96"}?w=400`}
                  alt={city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-950/50 group-hover:bg-blue-950/40 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">{city}</h3>
                  <p className="text-blue-200 text-sm">View properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Property Categories</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">What type of property are you looking for?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryItems.map(cat => (
            <Link
              key={cat.value}
              to={`/explore?category=${cat.value}`}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-800 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-800"
            >
              <div className={`p-4 rounded-xl ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="font-medium text-gray-800 dark:text-white">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">How It Works</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12">Find your property in 3 simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(s => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-blue-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">What Our Users Say</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Real experiences from real people</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, i) => (
                  <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">"{t.comment}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Banner */}
      <section className="py-16 px-4 bg-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-3xl font-bold text-white mb-3">Meet Your AI Property Assistant</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Just describe what you need — "3 bedroom flat in Mirpur under 20,000 BDT" — and our AI will find it for you instantly.
          </p>
          <button className="bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
            Try AI Assistant
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Stay Updated</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Get the latest property listings delivered to your inbox</p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white outline-none focus:border-blue-800 dark:focus:border-blue-400 text-sm"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Everything you need to know</p>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.q} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <TrendingUp size={20} className="text-blue-800 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home

// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router"
// import { Search, MapPin, TrendingUp, ChevronRight, Star, Building, Home as HomeIcon, Trees, Store } from "lucide-react"
// import Navbar from "../Components/Layout/Navbar"
// import Footer from "../Components/Layout/Footer"
// import PropertyCard from "../Components/Property/PropertyCard"
// import SkeletonCard from "../Components/Property/SkeletonCard"
// import { cities, getFeaturedProperties } from "../Data/properties"

// const Home = () => {
//   const [searchCity, setSearchCity] = useState("")
//   const [isLoading, setIsLoading] = useState(true)
//   const [featuredProperties, setFeaturedProperties] = useState(getFeaturedProperties())
//   const navigate = useNavigate()

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1500)
//     return () => clearTimeout(timer)
//   }, [])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (searchCity.trim()) {
//       navigate(`/explore?city=${searchCity}`)
//     }
//   }

//   const stats = [
//     { label: "Total Listings", value: "500+" },
//     { label: "Cities Covered", value: "4" },
//     { label: "Happy Clients", value: "1,200+" },
//     { label: "Property Owners", value: "300+" },
//   ]

//   const categoryItems = [
//     { label: "Apartments", value: "apartment", icon: <Building size={28} />, color: "bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400" },
//     { label: "Houses", value: "house", icon: <HomeIcon size={28} />, color: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
//     { label: "Commercial", value: "commercial", icon: <Store size={28} />, color: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
//     { label: "Land", value: "land", icon: <Trees size={28} />, color: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" },
//   ]

//   const steps = [
//     { step: "01", title: "Search Your City", desc: "Type your city name like Dhaka or Chittagong to find available properties in that area." },
//     { step: "02", title: "Browse Properties", desc: "View all available properties with photos, prices, and details. Filter by type and price range." },
//     { step: "03", title: "Contact Owner", desc: "Found your perfect property? Get the owner's contact number and reach out directly." },
//   ]

//   const testimonials = [
//     { name: "Sakib Ahmed", city: "Dhaka", rating: 5, comment: "Found my dream apartment in Gulshan within 2 days. The platform is so easy to use and the listings are genuine.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
//     { name: "Fatema Begum", city: "Chittagong", rating: 5, comment: "I was looking for a house in Nasirabad for months. NestFinder helped me find the perfect one in just a week!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
//     { name: "Tanvir Islam", city: "Sylhet", rating: 4, comment: "Great platform for finding properties in Sylhet. The owners are genuine and the contact process is very smooth.", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100" },
//   ]

//   const faqs = [
//     { q: "How do I find properties in my city?", a: "Simply type your city name in the search bar on the homepage or explore page. You will see all available properties in that city instantly." },
//     { q: "How do I contact a property owner?", a: "Click on any property card to go to the details page. There you will find the owner's contact number and a WhatsApp button. You need to be logged in to see the full number." },
//     { q: "Is NestFinder free to use?", a: "Yes, browsing and searching properties is completely free. Property owners can list one property for free and pay a small fee for additional listings." },
//     { q: "How do I list my property on NestFinder?", a: "Click the Submit Property button and fill in your property details including photos, price, and contact number. Our team will review and publish it within 24 hours." },
//   ]

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-950">
//       <Navbar />

//       {/* Hero Section */}
//       <section
//         className="relative h-[65vh] flex items-center justify-center bg-cover bg-center"
//         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')" }}
//       >
//         <div className="absolute inset-0 bg-blue-950/70" />
//         <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Find Your Perfect Home in Bangladesh
//           </h1>
//           <p className="text-blue-100 text-lg mb-8">
//             Search thousands of properties across Dhaka, Chittagong, Sylhet and Rajshahi
//           </p>
//           <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl">
//             <div className="flex items-center gap-2 flex-1 px-3">
//               <MapPin size={20} className="text-gray-400 shrink-0" />
//               <input
//                 type="text"
//                 placeholder="Search by city — Dhaka, Chittagong, Sylhet..."
//                 value={searchCity}
//                 onChange={e => setSearchCity(e.target.value)}
//                 className="w-full text-gray-800 dark:text-white bg-transparent outline-none text-sm"
//               />
//             </div>
//             <button
//               type="submit"
//               className="flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors font-medium"
//             >
//               <Search size={18} />
//               Search
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* Stats Bar */}
//       <section className="bg-blue-800 py-8">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map(stat => (
//             <div key={stat.label} className="text-center">
//               <div className="text-3xl font-bold text-white">{stat.value}</div>
//               <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Properties */}
//       <section className="py-16 px-4 max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Properties</h2>
//             <p className="text-gray-500 dark:text-gray-400 mt-1">Hand-picked properties just for you</p>
//           </div>
//           <Link
//             to="/explore"
//             className="flex items-center gap-1 text-blue-800 dark:text-blue-400 hover:underline text-sm font-medium"
//           >
//             View All <ChevronRight size={16} />
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {isLoading
//             ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
//             : featuredProperties.slice(0, 4).map(p => <PropertyCard key={p.id} property={p} />)
//           }
//         </div>
//       </section>

//       {/* Browse by City */}
//       <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Browse by City</h2>
//           <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Find properties in your preferred city</p>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {cities.map(city => (
//               <Link
//                 key={city}
//                 to={`/explore?city=${city}`}
//                 className="group relative h-40 rounded-2xl overflow-hidden"
//               >
//                 <img
//                   src={`https://images.unsplash.com/photo-${city === "Dhaka" ? "1558618666-fcd25c85cd64" : city === "Chittagong" ? "1571896349842-33c89424de2d" : city === "Sylhet" ? "1449158743715-0a90ebb6d2d8" : "1578662996442-48f60103fc96"}?w=400`}
//                   alt={city}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-blue-950/50 group-hover:bg-blue-950/40 transition-colors" />
//                 <div className="absolute bottom-4 left-4">
//                   <h3 className="text-white font-bold text-lg">{city}</h3>
//                   <p className="text-blue-200 text-sm">View properties</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Browse by Category */}
//       <section className="py-16 px-4 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Property Categories</h2>
//         <p className="text-gray-500 dark:text-gray-400 text-center mb-10">What type of property are you looking for?</p>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {categoryItems.map(cat => (
//             <Link
//               key={cat.value}
//               to={`/explore?category=${cat.value}`}
//               className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-800 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-800"
//             >
//               <div className={`p-4 rounded-xl ${cat.color}`}>
//                 {cat.icon}
//               </div>
//               <span className="font-medium text-gray-800 dark:text-white">{cat.label}</span>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">How It Works</h2>
//           <p className="text-gray-500 dark:text-gray-400 text-center mb-12">Find your property in 3 simple steps</p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {steps.map(s => (
//               <div key={s.step} className="text-center">
//                 <div className="w-16 h-16 bg-blue-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
//                   {s.step}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16 px-4 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">What Our Users Say</h2>
//         <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Real experiences from real people</p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {testimonials.map(t => (
//             <div key={t.name} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
//               <div className="flex items-center gap-1 mb-4">
//                 {Array(t.rating).fill(0).map((_, i) => (
//                   <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
//                 ))}
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">"{t.comment}"</p>
//               <div className="flex items-center gap-3">
//                 <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
//                 <div>
//                   <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
//                   <div className="text-gray-500 dark:text-gray-400 text-xs">{t.city}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* AI Banner */}
//       <section className="py-16 px-4 bg-blue-800">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="text-5xl mb-4">🤖</div>
//           <h2 className="text-3xl font-bold text-white mb-3">Meet Your AI Property Assistant</h2>
//           <p className="text-blue-100 mb-6 text-lg">
//             Just describe what you need — "3 bedroom flat in Mirpur under 20,000 BDT" — and our AI will find it for you instantly.
//           </p>
//           <button className="bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
//             Try AI Assistant
//           </button>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Stay Updated</h2>
//           <p className="text-gray-500 dark:text-gray-400 mb-6">Get the latest property listings delivered to your inbox</p>
//           <form className="flex gap-3">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white outline-none focus:border-blue-800 dark:focus:border-blue-400 text-sm"
//             />
//             <button
//               type="submit"
//               className="bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors font-medium"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="py-16 px-4 max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Frequently Asked Questions</h2>
//         <p className="text-gray-500 dark:text-gray-400 text-center mb-10">Everything you need to know</p>
//         <div className="space-y-4">
//           {faqs.map(faq => (
//             <div key={faq.q} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
//               <div className="flex items-start gap-3">
//                 <TrendingUp size={20} className="text-blue-800 dark:text-blue-400 shrink-0 mt-0.5" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
//                   <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }

// export default Home