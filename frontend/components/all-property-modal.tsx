"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Search, MapPin, Bed, Bath, Square, Heart, Filter } from "lucide-react"

interface AllPropertiesModalProps {
  properties: any[]
  isOpen: boolean
  onClose: () => void
  onViewProperty: (property: any) => void
  favorites: number[]
  onToggleFavorite: (propertyId: number) => void
}

export default function AllPropertiesModal({
  properties,
  isOpen,
  onClose,
  onViewProperty,
  favorites,
  onToggleFavorite,
}: AllPropertiesModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  if (!isOpen) return null

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || property.type.toLowerCase().includes(filterType.toLowerCase())

    const matchesStatus = filterStatus === "all" || property.type === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-7xl border-none shadow-2xl max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-orange-500 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">All Properties</h2>
                <p className="text-orange-100">Browse our complete property collection</p>
              </div>
              <Button variant="ghost" className="text-white hover:bg-orange-600" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b bg-gray-50">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="For Rent">For Rent</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                onClick={() => alert("Advanced filters coming soon!")}
              >
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredProperties.length} of {properties.length} properties
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card
                  key={property.id}
                  className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className={`${property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"} text-white`}>
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
                      onClick={() => onToggleFavorite(property.id)}
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

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterType("all")
                    setFilterStatus("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
