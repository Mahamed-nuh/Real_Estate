"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Bed, Bath, Square, Calendar, Phone, Mail, Heart } from "lucide-react"

interface PropertyDetailModalProps {
  property: any
  isOpen: boolean
  onClose: () => void
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function PropertyDetailModal({
  property,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: PropertyDetailModalProps) {
  if (!isOpen || !property) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl border-none shadow-2xl my-8 max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="relative">
            <img
              src={property.image || "/placeholder.svg?height=400&width=800"}
              alt={property.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className={`${property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"} text-white`}>
                {property.type}
              </Badge>
              {property.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`bg-white/80 hover:bg-white ${isFavorite ? "text-red-500" : "text-gray-600"}`}
                onClick={onToggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">{property.price}</div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 max-h-96 overflow-y-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-6 py-6 border-y">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Bed className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.beds}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Bath className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.baths}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Square className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.sqft}</div>
                    <div className="text-sm text-gray-600">Square Feet</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description ||
                      "This beautiful property offers modern amenities and exceptional comfort. Located in a prime area with easy access to schools, shopping, and transportation. Perfect for families looking for their dream home with spacious rooms and contemporary design."}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      property.features || [
                        "Modern Kitchen",
                        "Hardwood Floors",
                        "Central Air",
                        "Garage",
                        "Garden",
                        "Security System",
                      ]
                    ).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-orange-500 font-semibold text-lg">JD</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">John Doe</h4>
                        <p className="text-sm text-gray-600">Senior Real Estate Agent</p>
                      </div>

                      <div className="space-y-3">
                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => window.open("tel:+1234567890", "_self")}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                          onClick={() =>
                            window.open(
                              "mailto:agent@realestate.com?subject=Property Inquiry: " + property.title,
                              "_blank",
                            )
                          }
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          onClick={() => alert("Tour booking feature coming soon!")}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Tour
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Info */}
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property ID:</span>
                        <span className="font-medium">#{property.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Type:</span>
                        <span className="font-medium">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year Built:</span>
                        <span className="font-medium">2020</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Parking:</span>
                        <span className="font-medium">2 Cars</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
