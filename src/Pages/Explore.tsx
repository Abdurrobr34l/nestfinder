import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
import { Search, SlidersHorizontal, X } from "lucide-react"
import Navbar from "../Components/Layout/Navbar"
import Footer from "../Components/Layout/Footer"
import PropertyCard from "../Components/Property/PropertyCard"
import SkeletonCard from "../Components/Property/SkeletonCard"
import { properties } from "../Data/properties"
import type { Property, PropertyFilters } from "../Types/index"

const ITEMS_PER_PAGE = 8

// ✅ FilterPanel is NOW outside Explore component
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

    {/* City */}
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

    {/* Category */}
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

    {/* Price type */}
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

    {/* Bedrooms */}
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

    {/* Sort */}
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

// ✅ Explore component starts here — FilterPanel is NOT inside it
const Explore = () => {
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filtered, setFiltered] = useState<Property[]>(properties)

  const [filters, setFilters] = useState<PropertyFilters>({
    city: searchParams.get("city") || "",
    category: searchParams.get("category") || "",
    priceType: searchParams.get("priceType") || "",
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: "",
    sortBy: "newest"
  })

  const [search, setSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = [...properties]

    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.area.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filters.city) {
      result = result.filter(p =>
        p.city.toLowerCase() === filters.city.toLowerCase()
      )
    }

    if (filters.category) {
      result = result.filter(p => p.category === filters.category)
    }

    if (filters.priceType) {
      result = result.filter(p => p.priceType === filters.priceType)
    }

    result = result.filter(p =>
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    )

    if (filters.bedrooms) {
      result = result.filter(p => p.bedrooms === parseInt(filters.bedrooms))
    }

    if (filters.sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (filters.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    }

    setFiltered(result)
    setCurrentPage(1)
  }, [filters, search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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

          {/* Filter sidebar desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
            />
          </div>

          {/* Filter mobile */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end">
              <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  clearFilters={clearFilters}
                />
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full mt-4 bg-blue-800 text-white py-3 rounded-xl font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filtered.length} properties found
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
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
                  {paginated.map(p => <PropertyCard key={p.id} property={p} />)}
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