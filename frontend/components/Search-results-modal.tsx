"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Search, MapPin, Bed, Bath, Square, Heart, SlidersHorizontal } from "lucide-react"

interface SearchResultsModalProps {
  isOpen: boolean
  onClose: () => void
  searchData: {
    location: string
    propertyType: string
    priceRange: string
  }
  properties: any[]
  onViewProperty: (property: any) => void
  favorites: number[]
  onToggleFavorite: (propertyId: number) => void
}

export default function SearchResultsModal({
  isOpen,
  onClose,
  searchData,
  properties,
  onViewProperty,
  favorites,
  onToggleFavorite,
}: SearchResultsModalProps) {
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    minBaths: "",
    maxBaths: "",
    minSqft: "",
    maxSqft: "",
  })

  if (!isOpen) return null

  // Filter properties based on search criteria and additional filters
  const filteredProperties = properties.filter((property) => {
    // Location filter
    const matchesLocation =
      !searchData.location ||
      property.location.toLowerCase().includes(searchData.location.toLowerCase()) ||
      property.title.toLowerCase().includes(searchData.location.toLowerCase())

    // Property type filter
    const matchesType =
      !searchData.propertyType ||
      property.title.toLowerCase().includes(searchData.propertyType.toLowerCase()) ||
      property.type.toLowerCase().includes(searchData.propertyType.toLowerCase())

    // Price range filter
    let matchesPrice = true
    if (searchData.priceRange && searchData.priceRange !== "any") {
      const propertyPrice = Number.parseInt(property.price.replace(/[$,]/g, ""))
      switch (searchData.priceRange) {
        case "0-100k":
          matchesPrice = propertyPrice <= 100000
          break
        case "100k-300k":
          matchesPrice = propertyPrice >= 100000 && propertyPrice <= 300000
          break
        case "300k-500k":
          matchesPrice = propertyPrice >= 300000 && propertyPrice <= 500000
          break
        case "500k+":
          matchesPrice = propertyPrice >= 500000
          break
      }
    }

    // Additional filters
    const matchesMinPrice =
      !filters.minPrice || Number.parseInt(property.price.replace(/[$,]/g, "")) >= Number.parseInt(filters.minPrice)
    const matchesMaxPrice =
      !filters.maxPrice || Number.parseInt(property.price.replace(/[$,]/g, "")) <= Number.parseInt(filters.maxPrice)
    const matchesMinBeds = !filters.minBeds || property.beds >= Number.parseInt(filters.minBeds)
    const matchesMaxBeds = !filters.maxBeds || property.beds <= Number.parseInt(filters.maxBeds)
    const matchesMinBaths = !filters.minBaths || property.baths >= Number.parseInt(filters.minBaths)
    const matchesMaxBaths = !filters.maxBaths || property.baths <= Number.parseInt(filters.maxBaths)
    const matchesMinSqft =
      !filters.minSqft || Number.parseInt(property.sqft.replace(/,/g, "")) >= Number.parseInt(filters.minSqft)
    const matchesMaxSqft =
      !filters.maxSqft || Number.parseInt(property.sqft.replace(/,/g, "")) <= Number.parseInt(filters.maxSqft)

    return (
      matchesLocation &&
      matchesType &&
      matchesPrice &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinBeds &&
      matchesMaxBeds &&
      matchesMinBaths &&
      matchesMaxBaths &&
      matchesMinSqft &&
      matchesMaxSqft
    )
  })

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseInt(a.price.replace(/[$,]/g, "")) - Number.parseInt(b.price.replace(/[$,]/g, ""))
      case "price-high":
        return Number.parseInt(b.price.replace(/[$,]/g, "")) - Number.parseInt(a.price.replace(/[$,]/g, ""))
      case "beds":
        return b.beds - a.beds
      case "sqft":
        return Number.parseInt(b.sqft.replace(/,/g, "")) - Number.parseInt(a.sqft.replace(/,/g, ""))
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      minBaths: "",
      maxBaths: "",
      minSqft: "",
      maxSqft: "",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-7xl border-none shadow-2xl max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-orange-500 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Search Results</h2>
                <p className="text-orange-100">
                  {searchData.propertyType || "Properties"} in {searchData.location}
                  {searchData.priceRange && ` • ${searchData.priceRange}`}
                </p>
              </div>
              <Button variant="ghost" className="text-white hover:bg-orange-600" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar & Controls */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Refine location search..." className="pl-10" defaultValue={searchData.location} />
                </div>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{sortedProperties.length} properties found</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="beds">Most Bedrooms</SelectItem>
                    <SelectItem value="sqft">Largest First</SelectItem>
                    <SelectItem value="newest">Newest Listed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Min Price</label>
                    <Input
                      placeholder="e.g., 100000"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Max Price</label>
                    <Input
                      placeholder="e.g., 500000"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Min Beds</label>
                    <Select
                      value={filters.minBeds}
                      onValueChange={(value) => setFilters({ ...filters, minBeds: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Min Baths</label>
                    <Select
                      value={filters.minBaths}
                      onValueChange={(value) => setFilters({ ...filters, minBaths: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Clear Filters
                  </Button>
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Results Grid */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {sortedProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                        }}
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge
                          className={`${property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"} text-white`}
                        >
                          {property.type}
                        </Badge>
                        {property.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute top-3 right-3 bg-white/80 hover:bg-white ${
                          favorites.includes(property.id) ? "text-red-500" : "text-gray-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleFavorite(property.id)
                        }}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="text-xl font-bold text-orange-500">{property.price}</div>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600 py-2 border-t">
                          <div className="flex items-center">
                            <Bed className="h-3 w-3 mr-1" />
                            <span>{property.beds}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-3 w-3 mr-1" />
                            <span>{property.baths}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-3 w-3 mr-1" />
                            <span>{property.sqft}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => onViewProperty(property)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any properties matching your search criteria. Try adjusting your filters or search
                  terms.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  >
                    Clear All Filters
                  </Button>
                  <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600 text-white">
                    New Search
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
