"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home } from "lucide-react"

interface HeroSectionProps {
  onSearch?: (searchData: {
    location: string
    propertyType: string
    priceRange: string
  }) => void
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
  })

  const handleSearch = () => {
    if (!searchData.location.trim()) {
      alert("Please enter a location to search")
      return
    }

    // Call the search function if provided
    if (onSearch) {
      onSearch(searchData)
    } else {
      // Default behavior - show search results
      alert(
        `Searching for ${searchData.propertyType || "properties"} in ${searchData.location} with price range ${searchData.priceRange || "any"}`,
      )
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <section id="home" className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your
                <span className="text-orange-500"> Dream Home</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover the perfect property that matches your lifestyle. From luxury homes to cozy apartments, we have
                everything you need to find your next home.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter location"
                      className="pl-10"
                      value={searchData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Property Type</label>
                  <Select
                    value={searchData.propertyType}
                    onValueChange={(value) => handleInputChange("propertyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price Range</label>
                  <Select
                    value={searchData.priceRange}
                    onValueChange={(value) => handleInputChange("priceRange", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-100k">$0 - $100k</SelectItem>
                      <SelectItem value="100k-300k">$100k - $300k</SelectItem>
                      <SelectItem value="300k-500k">$300k - $500k</SelectItem>
                      <SelectItem value="500k+">$500k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">1000+</div>
                <div className="text-gray-600">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">50+</div>
                <div className="text-gray-600">Locations</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img src="/images/hero-home.jpg" alt="Modern house exterior" className="w-full h-[600px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Home className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Premium Location</div>
                  <div className="text-sm text-gray-600">Downtown Area</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
