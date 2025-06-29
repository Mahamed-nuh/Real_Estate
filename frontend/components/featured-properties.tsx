"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import PropertyDetailModal from "./property-detail-modal"
import AllPropertiesModal from "./all-property-modal"

export default function FeaturedProperties({ properties = [] }: { properties?: any[] }) {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [showPropertyDetail, setShowPropertyDetail] = useState(false)
  const [showAllProperties, setShowAllProperties] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  // Use the passed properties or fallback to default ones with your actual images
  const defaultProperties = [
    {
      id: 1,
      title: "Modern Family House",
      location: "Beverly Hills, CA",
      price: "$850,000",
      image: "/images/properties/house3.jpg", // ← Your actual image
      beds: 4,
      baths: 3,
      sqft: "2,500",
      type: "For Sale",
      featured: true,
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Manhattan, NY",
      price: "$1,200,000",
      image: "/images/properties/house4.jpg", // ← Your actual image
      beds: 3,
      baths: 2,
      sqft: "1,800",
      type: "For Sale",
      featured: true,
    },
    {
      id: 3,
      title: "Cozy Villa",
      location: "Miami Beach, FL",
      price: "$950,000",
      image: "/images/properties/house1.jpg", // ← Your actual image (if you have it)
      beds: 5,
      baths: 4,
      sqft: "3,200",
      type: "For Sale",
      featured: false,
    },
    {
      id: 4,
      title: "Downtown Condo",
      location: "Seattle, WA",
      price: "$650,000",
      image: "/images/properties/house4.jpg", // ← Your actual image (if you have it)
      beds: 2,
      baths: 2,
      sqft: "1,400",
      type: "For Rent",
      featured: false,
    },
    {
      id: 5,
      title: "Suburban Home",
      location: "Austin, TX",
      price: "$750,000",
      image: "/images/properties/house5.jpg", // ← Your actual image (if you have it)
      beds: 4,
      baths: 3,
      sqft: "2,800",
      type: "For Sale",
      featured: true,
    },
    {
      id: 6,
      title: "Penthouse Suite",
      location: "Chicago, IL",
      price: "$1,500,000",
      image: "/images/properties/house6.jpg", // ← Your actual image (if you have it)
      beds: 3,
      baths: 3,
      sqft: "2,200",
      type: "For Sale",
      featured: false,
    },
  ]

  const displayProperties = properties.length > 0 ? properties : defaultProperties

  const handleViewDetails = (property: any) => {
    setSelectedProperty(property)
    setShowPropertyDetail(true)
  }

  const handleToggleFavorite = (propertyId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]

      // Show feedback to user
      const property = displayProperties.find((p) => p.id === propertyId)
      if (property) {
        const action = newFavorites.includes(propertyId) ? "added to" : "removed from"
        setTimeout(() => {
          alert(`${property.title} ${action} favorites!`)
        }, 100)
      }

      return newFavorites
    })
  }

  const handleViewAllProperties = () => {
    setShowAllProperties(true)
  }

  return (
    <>
      <section id="properties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties that offer the best value and location.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProperties.slice(0, 6).map((property) => (
              <Card
                key={property.id}
                className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"} text-white`}>
                      {property.type}
                    </Badge>
                    {property.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-4 right-4 bg-white/80 hover:bg-white transition-colors ${
                      favorites.includes(property.id) ? "text-red-500" : "text-gray-600"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleFavorite(property.id)
                    }}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-500">{property.price}</div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 py-3 border-t">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.baths} Baths</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                      onClick={() => handleViewDetails(property)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 bg-transparent transition-colors"
              onClick={handleViewAllProperties}
            >
              View All Properties ({displayProperties.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={showPropertyDetail}
        onClose={() => setShowPropertyDetail(false)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={() => selectedProperty && handleToggleFavorite(selectedProperty.id)}
      />

      {/* All Properties Modal */}
      <AllPropertiesModal
        properties={displayProperties}
        isOpen={showAllProperties}
        onClose={() => setShowAllProperties(false)}
        onViewProperty={handleViewDetails}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  )
}
