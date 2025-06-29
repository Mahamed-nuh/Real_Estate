"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, DollarSign, User, Phone, Mail, MapPin, Calculator } from "lucide-react"

interface FreeQuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FreeQuoteModal({ isOpen, onClose }: FreeQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    propertyType: "",
    propertyAddress: "",
    propertyValue: "",
    timeline: "",
    additionalServices: [] as string[],
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const additionalServiceOptions = [
    "Property Photography",
    "Virtual Tours",
    "Market Analysis",
    "Legal Documentation",
    "Property Inspection",
    "Insurance Assistance",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const estimatedCost = calculateEstimate()
      alert(
        `Free Quote Generated!\n\nService: ${formData.serviceType}\nProperty Type: ${formData.propertyType}\nEstimated Cost: ${estimatedCost}\nTimeline: ${formData.timeline}\n\nDetailed quote will be sent to ${formData.email} within 2 hours.`,
      )
      setIsLoading(false)
      onClose()
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        propertyType: "",
        propertyAddress: "",
        propertyValue: "",
        timeline: "",
        additionalServices: [],
        description: "",
      })
    }, 2000)
  }

  const calculateEstimate = () => {
    const baseRates: { [key: string]: number } = {
      "Property Search": 0, // Commission-based
      "Property Valuation": 400,
      "Legal Assistance": 1500,
      "Property Management": 0, // Percentage-based
      "Investment Consulting": 2000,
      "Home Staging": 3000,
    }

    const base = baseRates[formData.serviceType] || 0
    const additional = formData.additionalServices.length * 200

    if (formData.serviceType === "Property Search") {
      return "Commission-based (2.5-3%)"
    } else if (formData.serviceType === "Property Management") {
      return "8-12% of monthly rent"
    } else {
      return `$${(base + additional).toLocaleString()}`
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleAdditionalService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-3xl border-none shadow-2xl my-8">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Get Free Quote</h2>
                <p className="text-gray-600">Receive a detailed estimate for our services</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Service Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Service Type *</label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Property Search">Property Search</SelectItem>
                    <SelectItem value="Property Valuation">Property Valuation</SelectItem>
                    <SelectItem value="Legal Assistance">Legal Assistance</SelectItem>
                    <SelectItem value="Property Management">Property Management</SelectItem>
                    <SelectItem value="Investment Consulting">Investment Consulting</SelectItem>
                    <SelectItem value="Home Staging">Home Staging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property Type *</label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Family Home">Single Family Home</SelectItem>
                    <SelectItem value="Apartment/Condo">Apartment/Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Commercial Property">Commercial Property</SelectItem>
                    <SelectItem value="Land/Lot">Land/Lot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Property Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter property address"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Estimated Property Value</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., 500,000"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Timeline *</label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="When do you need this service?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASAP">ASAP (Within 1 week)</SelectItem>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="1 month">Within 1 month</SelectItem>
                  <SelectItem value="2-3 months">2-3 months</SelectItem>
                  <SelectItem value="3+ months">3+ months</SelectItem>
                  <SelectItem value="Just exploring">Just exploring options</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Services */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Additional Services (Optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {additionalServiceOptions.map((service) => (
                  <div
                    key={service}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.additionalServices.includes(service)
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                    onClick={() => toggleAdditionalService(service)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{service}</span>
                      {formData.additionalServices.includes(service) && (
                        <Badge className="bg-orange-500 text-white text-xs">Added</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Project Description</label>
              <Textarea
                placeholder="Describe your specific needs, requirements, or any special considerations..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Estimate Preview */}
            {formData.serviceType && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-5 w-5 text-orange-500" />
                  <div>
                    <h4 className="font-medium text-orange-900 mb-1">Estimated Cost</h4>
                    <p className="text-lg font-bold text-orange-700">{calculateEstimate()}</p>
                    <p className="text-sm text-orange-600 mt-1">
                      *This is a preliminary estimate. Final quote will be provided via email.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-12 bg-transparent">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-12"
                disabled={isLoading}
              >
                {isLoading ? "Generating Quote..." : "Get Free Quote"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
