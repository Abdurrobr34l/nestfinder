import { Link } from "react-router"
import { MapPin, Bed, Bath, Maximize, Heart } from "lucide-react"
import type { Property } from "../../Types"

interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
            property.priceType === "rent"
              ? "bg-blue-800 text-white"
              : "bg-green-700 text-white"
          }`}>
            {property.priceType === "rent" ? "For Rent" : "For Sale"}
          </span>
          {property.isFeatured && (
            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-amber-500 text-white">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition-colors">
          <Heart size={16} className="text-gray-400 hover:text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        {/* Category badge */}
        <span className="text-xs font-medium text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md w-fit mb-2 capitalize">
          {property.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-3">
          <MapPin size={14} />
          <span className="text-sm">{property.area}, {property.city}</span>
        </div>

        {/* Meta info */}
        {property.category !== "land" && (
          <div className="flex items-center gap-4 mb-3 text-gray-500 dark:text-gray-400">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed size={14} />
                <span className="text-sm">{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath size={14} />
                <span className="text-sm">{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize size={14} />
              <span className="text-sm">{property.sqft} sqft</span>
            </div>
          </div>
        )}

        {/* Price and button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <span className="text-lg font-bold text-blue-800 dark:text-blue-400">
              {formatPrice(property.price)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {property.priceType === "rent" ? "/month" : ""}
            </span>
          </div>
          <Link
            to={`/property/${property._id || property.id}`}
            className="text-sm bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PropertyCard