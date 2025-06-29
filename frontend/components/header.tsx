"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Home, Search, User, LogOut, Settings } from "lucide-react"
import { useState } from "react"
import LoginForm from "./Auth/Login-form"
import SignupForm from "./Auth/Signup-form"
import AdminPanel from "./Admin/admin-panel"
import QuickSearchModal from "./quick-search-modal"

interface HeaderProps {
  user?: { name: string; email: string; isAdmin: boolean } | null
  onLogin?: (email: string, password: string) => void
  onLogout?: () => void
  properties?: any[]
  onAddProperty?: (property: any) => void
  onViewProperty?: (property: any) => void
  favorites?: number[]
  onToggleFavorite?: (propertyId: number) => void
}

export default function Header({
  user = null,
  onLogin = () => {},
  onLogout = () => {},
  properties = [],
  onAddProperty = () => {},
  onViewProperty = () => {},
  favorites = [],
  onToggleFavorite = () => {},
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showQuickSearch, setShowQuickSearch] = useState(false)

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would call your backend
    const isAdmin = email.includes("admin")
    onLogin(email, password)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Home className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">RealEstate</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-orange-500 font-medium">
                Home
              </a>
              <a href="#properties" className="text-gray-700 hover:text-orange-500 font-medium">
                Properties
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 font-medium">
                About
              </a>
              <a href="#services" className="text-gray-700 hover:text-orange-500 font-medium">
                Services
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 font-medium">
                Contact
              </a>
            </nav>

            {/* Desktop Auth & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Welcome, {user.name}</span>
                  </div>

                  {user.isAdmin && (
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                      onClick={() => setShowAdminPanel(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                    onClick={() => setShowQuickSearch(true)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    onClick={() => setShowLoginForm(true)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setShowSignupForm(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                  Home
                </a>
                <a href="#properties" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                  Properties
                </a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                  About
                </a>
                <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                  Services
                </a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-orange-500">
                  Contact
                </a>

                <div className="px-3 py-2 space-y-2">
                  {user ? (
                    <>
                      <div className="text-sm text-gray-600 mb-2">Welcome, {user.name}</div>
                      {user.isAdmin && (
                        <Button
                          variant="outline"
                          className="w-full border-orange-500 text-orange-500 bg-transparent"
                          onClick={() => setShowAdminPanel(true)}
                        >
                          Admin Panel
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 bg-transparent"
                        onClick={onLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-orange-500 text-orange-500 bg-transparent"
                        onClick={() => setShowLoginForm(true)}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => setShowSignupForm(true)}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      <LoginForm isOpen={showLoginForm} onClose={() => setShowLoginForm(false)} onLogin={handleLogin} />

      <SignupForm
        isOpen={showSignupForm}
        onClose={() => setShowSignupForm(false)}
        onSignup={(name, email, password) => {
          // Handle signup
          console.log("Signup:", { name, email, password })
          setShowSignupForm(false)
        }}
      />

      {/* Admin Panel */}
      {user?.isAdmin && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          properties={properties}
          onAddProperty={onAddProperty}
        />
      )}

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={showQuickSearch}
        onClose={() => setShowQuickSearch(false)}
        properties={properties}
        onViewProperty={onViewProperty}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  )
}
