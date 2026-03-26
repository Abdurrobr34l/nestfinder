import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router"
import {
  MapPin, Bed, Bath, Maximize, Phone, MessageCircle,
  Star, ChevronLeft, Share2, Heart, Calendar
} from "lucide-react"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import PropertyCard from "../Components/Property/PropertyCard"
import { getPropertyById, properties } from "../Data/properties"
import { getReviewsByPropertyId, getAverageRating } from "../Data/reviews"
import { useAuth } from "../Hooks/useAuth"
import type { Review } from "../Types/index"

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [activeImage, setActiveImage] = useState(0)
  const [showPhone, setShowPhone] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const property = getPropertyById(id || "")
  const similarProperties = properties
    .filter(p => p.city === property?.city && p.id !== property?.id)
    .slice(0, 3)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (id) {
      setReviews(getReviewsByPropertyId(id))
      setAvgRating(getAverageRating(id))
    }
  }, [id])

  const handleShowPhone = () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setShowPhone(true)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    const review: Review = {
      id: `r${Date.now()}`,
      propertyId: id || "",
      userId: user?.id || "",
      userName: user?.name || "",
      userAvatar: user?.avatar || "",
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString().split("T")[0]
    }
    setReviews(prev => [review, ...prev])
    setAvgRating(prev => Math.round(((prev * reviews.length + newReview.rating) / (reviews.length + 1)) * 10) / 10)
    setNewReview({ rating: 5, comment: "" })
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 3000)
  }

  if (!isLoading && !property) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Property not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The property you are looking for does not exist</p>
          <Link to="/explore" className="bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors">
            Browse Properties
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/2" />
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to listings
        </button>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 rounded-2xl overflow-hidden mb-3">
            <img
              src={property!.images[activeImage]}
              alt={property!.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Heart size={18} className="text-gray-600 dark:text-gray-300" />
              </button>
              <button className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Share2 size={18} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                property!.priceType === "rent" ? "bg-blue-800 text-white" : "bg-green-700 text-white"
              }`}>
                {property!.priceType === "rent" ? "For Rent" : "For Sale"}
              </span>
              {property!.isFeatured && (
                <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-amber-500 text-white">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail row */}
          {property!.images.length > 1 && (
            <div className="flex gap-3">
              {property!.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-32 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === i ? "border-blue-800" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title + location */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {property!.title}
                </h1>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-400">
                    ৳{property!.price.toLocaleString()}
                  </div>
                  {property!.priceType === "rent" && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">/month</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">{property!.address}</span>
              </div>
            </div>

            {/* Key specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property!.bedrooms > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                  <Bed size={22} className="text-blue-800 dark:text-blue-400 mx-auto mb-1" />
                  <div className="font-semibold text-gray-900 dark:text-white">{property!.bedrooms}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Bedrooms</div>
                </div>
              )}
              {property!.bathrooms > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                  <Bath size={22} className="text-blue-800 dark:text-blue-400 mx-auto mb-1" />
                  <div className="font-semibold text-gray-900 dark:text-white">{property!.bathrooms}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Bathrooms</div>
                </div>
              )}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                <Maximize size={22} className="text-blue-800 dark:text-blue-400 mx-auto mb-1" />
                <div className="font-semibold text-gray-900 dark:text-white">{property!.sqft}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Sqft</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                <Calendar size={22} className="text-blue-800 dark:text-blue-400 mx-auto mb-1" />
                <div className="font-semibold text-gray-900 dark:text-white capitalize">{property!.status}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Status</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {property!.description}
              </p>
            </div>

            {/* Property info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Property Type", value: property!.category },
                  { label: "Listing Type", value: property!.priceType },
                  { label: "City", value: property!.city },
                  { label: "Area", value: property!.area },
                  { label: "Status", value: property!.status },
                  { label: "Listed On", value: property!.createdAt },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Reviews ({reviews.length})
                </h2>
                {avgRating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star size={18} className="text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{avgRating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/ 5</span>
                  </div>
                )}
              </div>

              {/* Review form */}
              <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Leave a Review</h3>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(r => ({ ...r, rating: star }))}
                    >
                      <Star
                        size={22}
                        className={star <= newReview.rating ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-600"}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={newReview.comment}
                  onChange={e => setNewReview(r => ({ ...r, comment: e.target.value }))}
                  placeholder="Share your experience with this property..."
                  rows={3}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none resize-none mb-3"
                />

                {reviewSubmitted && (
                  <div className="text-green-600 dark:text-green-400 text-sm mb-3">
                    Review submitted successfully!
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-blue-800 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-900 transition-colors"
                >
                  {isAuthenticated ? "Submit Review" : "Login to Review"}
                </button>
              </form>

              {/* Reviews list */}
              {reviews.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{review.userName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{review.createdAt}</div>
                        </div>
                        <div className="ml-auto flex items-center gap-0.5">
                          {Array(review.rating).fill(0).map((_, i) => (
                            <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right — owner contact card */}
          <div className="space-y-4">

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Owner</h2>

              {/* Owner info */}
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={property!.owner.avatar}
                  alt={property!.owner.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{property!.owner.name}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Property Owner</div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone Number</div>
                {showPhone ? (
                  <a
                    href={`tel:${property!.owner.phone}`}
                    className="flex items-center gap-2 text-blue-800 dark:text-blue-400 font-semibold"
                  >
                    <Phone size={16} />
                    {property!.owner.phone}
                  </a>
                ) : (
                  <button
                    onClick={handleShowPhone}
                    className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-900 transition-colors font-medium"
                  >
                    <Phone size={18} />
                    {isAuthenticated ? "Show Phone Number" : "Login to See Number"}
                  </button>
                )}
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${property!.owner.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <p className="text-xs text-amber-700 dark:text-amber-400 text-center">
                  Always meet in a safe public place when viewing properties
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Similar properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Similar Properties in {property!.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}

export default PropertyDetails