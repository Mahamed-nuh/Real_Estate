"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Search, MapPin, Bed, Bath, Square, Heart, TrendingUp } from "lucide-react"

interface QuickSearchModalProps {
  isOpen: boolean
  onClose: () => void
  properties: any[]
  onViewProperty: (property: any) => void
  favorites: number[]
  onToggleFavorite: (propertyId: number) => void
}

export default function QuickSearchModal({
  isOpen,
  onClose,
  properties,
  onViewProperty,
  favorites,
  onToggleFavorite,
}: QuickSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [recentSearches] = useState([
    "Beverly Hills",
    "Manhattan Apartment",
    "Miami Beach Villa",
    "Downtown Condo",
    "Luxury Properties",
  ])

  if (!isOpen) return null

  // Filter properties based on search term
  const filteredProperties = properties.filter((property) => {
    if (!searchTerm.trim()) return false

    const searchLower = searchTerm.toLowerCase()
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.type.toLowerCase().includes(searchLower) ||
      property.price.toLowerCase().includes(searchLower)
    )
  })

  // Popular searches based on property data
  const popularSearches = [
    "Houses under $1M",
    "Luxury Apartments",
    "3+ Bedroom Homes",
    "Waterfront Properties",
    "Investment Properties",
    "Move-in Ready",
  ]

  const handleQuickSearch = (term: string) => {
    setSearchTerm(term)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl border-none shadow-2xl max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-orange-500 text-white p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Quick Property Search</h2>
                <p className="text-orange-100">Find properties instantly</p>
              </div>
              <Button variant="ghost" className="text-white hover:bg-orange-600" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-orange-200" />
              <Input
                placeholder="Search by location, property type, price..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg bg-white/10 border-white/20 text-white placeholder-orange-200 focus:bg-white/20"
                autoFocus
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 text-orange-200 hover:text-white hover:bg-white/10"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {searchTerm.trim() ? (
              // Search Results
              <div className="p-6">
                {filteredProperties.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Search Results ({filteredProperties.length})
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                        onClick={() => {
                          onClose()
                          // Scroll to properties section
                          document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        View All Properties
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredProperties.slice(0, 6).map((property) => (
                        <Card
                          key={property.id}
                          className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                          <CardContent className="p-4">
                            <div className="flex space-x-4">
                              <div className="relative flex-shrink-0">
                                <img
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.title}
                                  className="w-20 h-16 object-cover rounded"
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=64&width=80"
                                  }}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`absolute -top-1 -right-1 w-6 h-6 p-0 bg-white/80 hover:bg-white ${
                                    favorites.includes(property.id) ? "text-red-500" : "text-gray-600"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onToggleFavorite(property.id)
                                  }}
                                >
                                  <Heart
                                    className={`h-3 w-3 ${favorites.includes(property.id) ? "fill-current" : ""}`}
                                  />
                                </Button>
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 truncate">{property.title}</h4>
                                <div className="flex items-center text-gray-600 mb-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span className="text-sm truncate">{property.location}</span>
                                </div>
                                <div className="text-lg font-bold text-orange-500 mb-2">{property.price}</div>

                                <div className="flex items-center space-x-3 text-xs text-gray-600">
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
                                  size="sm"
                                  className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
                                  onClick={() => {
                                    onViewProperty(property)
                                    onClose()
                                  }}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredProperties.length > 6 && (
                      <div className="text-center mt-6">
                        <Button
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                          onClick={() => {
                            onClose()
                            document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })
                          }}
                        >
                          View All {filteredProperties.length} Results
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  // No Results
                  <div className="text-center py-12">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any properties matching "{searchTerm}". Try a different search term.
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearSearch}
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // Search Suggestions
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                        onClick={() => handleQuickSearch(search)}
                      >
                        <Search className="h-3 w-3 mr-2" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Popular Searches */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-orange-200 text-orange-600 hover:border-orange-500 hover:bg-orange-50 bg-transparent"
                        onClick={() => handleQuickSearch(search)}
                      >
                        <TrendingUp className="h-3 w-3 mr-2" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Browse by Category</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant="ghost"
                      className="h-auto p-3 flex flex-col items-center text-center hover:bg-orange-100"
                      onClick={() => handleQuickSearch("For Sale")}
                    >
                      <div className="text-2xl font-bold text-orange-500">
                        {properties.filter((p) => p.type === "For Sale").length}
                      </div>
                      <div className="text-sm text-gray-600">For Sale</div>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-auto p-3 flex flex-col items-center text-center hover:bg-orange-100"
                      onClick={() => handleQuickSearch("For Rent")}
                    >
                      <div className="text-2xl font-bold text-orange-500">
                        {properties.filter((p) => p.type === "For Rent").length}
                      </div>
                      <div className="text-sm text-gray-600">For Rent</div>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-auto p-3 flex flex-col items-center text-center hover:bg-orange-100"
                      onClick={() => handleQuickSearch("Featured")}
                    >
                      <div className="text-2xl font-bold text-orange-500">
                        {properties.filter((p) => p.featured).length}
                      </div>
                      <div className="text-sm text-gray-600">Featured</div>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-auto p-3 flex flex-col items-center text-center hover:bg-orange-100"
                      onClick={() => handleQuickSearch("Luxury")}
                    >
                      <div className="text-2xl font-bold text-orange-500">
                        {properties.filter((p) => Number.parseInt(p.price.replace(/[$,]/g, "")) > 1000000).length}
                      </div>
                      <div className="text-sm text-gray-600">Luxury</div>
                    </Button>
                  </div>
                </div>

                {/* Search Tips */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Search Tips</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Try searching by location: "Beverly Hills", "Manhattan"</li>
                    <li>• Search by property type: "House", "Apartment", "Condo"</li>
                    <li>• Use price ranges: "Under 500k", "Luxury"</li>
                    <li>• Search by features: "3 bedroom", "Waterfront"</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
