"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Award, Users, Home, TrendingUp, Calendar, MapPin } from "lucide-react"

interface AboutUsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl border-none shadow-2xl my-8 max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-orange-500 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">About RealEstate</h2>
                <p className="text-orange-100">Your trusted partner in real estate</p>
              </div>
              <Button variant="ghost" className="text-white hover:bg-orange-600" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 max-h-96 overflow-y-auto">
            <div className="space-y-8">
              {/* Company Story */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Founded in 2008, RealEstate has grown from a small local agency to one of the most trusted names in
                    real estate. Our journey began with a simple mission: to help families find their perfect home while
                    providing exceptional service every step of the way.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Over the years, we've helped thousands of clients buy, sell, and invest in properties across the
                    region. Our success is built on trust, expertise, and a genuine commitment to our clients' needs.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/properties/modern-office.jpg"
                    alt="Our modern office"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <Award className="h-6 w-6 text-orange-500" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Our Mission</h4>
                    </div>
                    <p className="text-gray-600">
                      To provide exceptional real estate services that exceed our clients' expectations while building
                      lasting relationships based on trust, integrity, and professional excellence.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <TrendingUp className="h-6 w-6 text-orange-500" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Our Vision</h4>
                    </div>
                    <p className="text-gray-600">
                      To be the leading real estate agency in the region, known for innovation, market expertise, and
                      unwavering commitment to client satisfaction.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Company Values */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Core Values</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-orange-500" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Client First</h4>
                    <p className="text-sm text-gray-600">
                      Every decision we make is guided by what's best for our clients
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-orange-500" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                    <p className="text-sm text-gray-600">We strive for excellence in every aspect of our service</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="h-8 w-8 text-orange-500" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Integrity</h4>
                    <p className="text-sm text-gray-600">Honest, transparent, and ethical in all our dealings</p>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Work With Us?</h3>
                <p className="text-gray-600 mb-4">
                  Contact us today to experience the RealEstate difference for yourself.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => {
                      onClose()
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Contact Us
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                    onClick={() => {
                      onClose()
                      alert("Schedule consultation feature coming soon!")
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
