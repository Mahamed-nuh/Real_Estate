"use client"

import { useState } from "react"
import Header from "../components/header"
import HeroSection from "../components/hero-section"
import FeaturedProperties from "../components/featured-properties"
import AboutSection from "../components/about-section"
import ServicesSection from "../components/services-section"
import ContactSection from "../components/contact-section"
import Footer from "../components/footer"
import SearchResultsModal from "../components/Search-results-modal"
import PropertyDetailModal from "../components/property-detail-modal"

// Initial properties data with your actual images
const initialProperties = [
  {
    id: 1,
    title: "Modern Family House",
    location: "Beverly Hills, CA",
    price: "$850,000",
    image: "/images/properties/house1.jpg", // ← Your actual image
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
    image: "/images/properties/house2.jpg", // ← Your actual image
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
    image: "/images/properties/house3.jpg", // ← Your actual image (if you have it)
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

export default function HomePage() {
  const [user, setUser] = useState<{ name: string; email: string; isAdmin: boolean } | null>(null)
  const [properties, setProperties] = useState(initialProperties)

  const [searchResults, setSearchResults] = useState<{
    location: string
    propertyType: string
    priceRange: string
  } | null>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [showPropertyDetail, setShowPropertyDetail] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showQuickSearchProperty, setShowQuickSearchProperty] = useState(false)

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would call your backend API
    const isAdmin = email.includes("admin") // Simple admin check
    const name = email.split("@")[0] // Extract name from email

    setUser({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      isAdmin,
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleAddProperty = (newProperty: any) => {
    setProperties([...properties, newProperty])
  }

  const handleSearch = (searchData: {
    location: string
    propertyType: string
    priceRange: string
  }) => {
    // Set search results and show modal
    setSearchResults(searchData)
    setShowSearchResults(true)
  }

  const handleViewProperty = (property: any) => {
    setSelectedProperty(property)
    setShowPropertyDetail(true)
    setShowSearchResults(false)
  }

  const handleToggleFavorite = (propertyId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]

      const property = properties.find((p) => p.id === propertyId)
      if (property) {
        const action = newFavorites.includes(propertyId) ? "added to" : "removed from"
        setTimeout(() => {
          alert(`${property.title} ${action} favorites!`)
        }, 100)
      }

      return newFavorites
    })
  }

  const handleQuickSearchViewProperty = (property: any) => {
    setSelectedProperty(property)
    setShowPropertyDetail(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        properties={properties}
        onAddProperty={handleAddProperty}
        onViewProperty={handleQuickSearchViewProperty}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
      <HeroSection onSearch={handleSearch} />
      <FeaturedProperties properties={properties} />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />

      {/* Search Results Modal */}
      {searchResults && (
        <SearchResultsModal
          isOpen={showSearchResults}
          onClose={() => setShowSearchResults(false)}
          searchData={searchResults}
          properties={properties}
          onViewProperty={handleViewProperty}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={showPropertyDetail}
        onClose={() => setShowPropertyDetail(false)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={() => selectedProperty && handleToggleFavorite(selectedProperty.id)}
      />
    </div>
  )
}
