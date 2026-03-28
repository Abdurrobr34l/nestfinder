import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "react-router"
import { Search, SlidersHorizontal, X } from "lucide-react"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import PropertyCard from "../Components/Property/PropertyCard"
import SkeletonCard from "../Components/Property/SkeletonCard"
import { propertyAPI } from "../lib/api"
import type { Property, PropertyFilters } from "../Types/index"

const ITEMS_PER_PAGE = 8

interface FilterPanelProps {
  filters: PropertyFilters
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilters>>
  clearFilters: () => void
}

const FilterPanel = ({ filters, setFilters, clearFilters }: FilterPanelProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
      <button onClick={clearFilters} className="text-xs text-red-500 hover:underline">
        Clear all
      </button>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">City</label>
      <select
        value={filters.city}
        onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-sm outline-none"
      >
        <option value="">All Cities</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chittagong">Chittagong</option>
        <option value="Sylhet">Sylhet</option>
        <option value="Rajshahi">Rajshahi</option>
      </select>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Property Type</label>
      <select
        value={filters.category}
        onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-sm outline-none"
      >
        <option value="">All Types</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </select>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Listing Type</label>
      <div className="flex gap-2">
        {["", "rent", "sale"].map(type => (
          <button
            key={type}
            onClick={() => setFilters(f => ({ ...f, priceType: type }))}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              filters.priceType === type
                ? "bg-blue-800 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {type === "" ? "All" : type === "rent" ? "Rent" : "Sale"}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Bedrooms</label>
      <div className="flex gap-2 flex-wrap">
        {["", "1", "2", "3", "4", "5"].map(b => (
          <button
            key={b}
            onClick={() => setFilters(f => ({ ...f, bedrooms: b }))}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
              filters.bedrooms === b
                ? "bg-blue-800 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {b === "" ? "Any" : b === "5" ? "5+" : b}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Sort By</label>
      <select
        value={filters.sortBy}
        onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}
        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-sm outline-none"
      >
        <option value="newest">Newest First</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  </div>
)

const Explore = () => {
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [properties, setProperties] = useState<Property[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [filters, setFilters] = useState<PropertyFilters>({
    city: searchParams.get("city") || "",
    category: searchParams.get("category") || "",
    priceType: searchParams.get("priceType") || "",
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: "",
    sortBy: "newest"
  })

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500)
    return () => clearTimeout(timer)
  }, [search])

  const fetchProperties = useCallback(async () => {
    setIsLoading(true)
    try {
      const sortMap: Record<string, string> = {
        newest: "-createdAt",
        "price-low": "price",
        "price-high": "-price"
      }

      const params: Record<string, string> = {
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        sort: sortMap[filters.sortBy] || "-createdAt"
      }

      if (debouncedSearch) params.search = debouncedSearch
      if (filters.city) params.city = filters.city
      if (filters.category) params.category = filters.category
      if (filters.priceType) params.priceType = filters.priceType
      if (filters.bedrooms) params.bedrooms = filters.bedrooms
      if (filters.minPrice > 0) params.priceMin = String(filters.minPrice)
      if (filters.maxPrice < 10000000) params.priceMax = String(filters.maxPrice)

      const res = await propertyAPI.getAll(params)
      setProperties(res.data.data.data)
      setTotal(res.data.data.meta.total)
    } catch (error) {
      console.error("Failed to fetch properties", error)
    } finally {
      setIsLoading(false)
    }
  }, [filters, debouncedSearch, currentPage])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, debouncedSearch])

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const clearFilters = () => {
    setFilters({
      city: "",
      category: "",
      priceType: "",
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: "",
      sortBy: "newest"
    })
    setSearch("")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="bg-blue-800 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Properties</h1>
          <p className="text-blue-200">Find your perfect property across Bangladesh</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, city or area..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent text-gray-800 dark:text-white text-sm outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          <div className="hidden lg:block w-64 shrink-0">
            <FilterPanel filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
          </div>

          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end">
              <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                <FilterPanel filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full mt-4 bg-blue-800 text-white py-3 rounded-xl font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {total} properties found
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No properties found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-800 text-white px-6 py-2 rounded-xl hover:bg-blue-900 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map(p => (
                    <PropertyCard key={p._id} property={p} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Previous
                    </button>
                    {Array(totalPages).fill(0).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                          currentPage === i + 1
                            ? "bg-blue-800 text-white"
                            : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Explore