"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Phone, Mail, Calendar, CheckCircle, ArrowRight, DollarSign, Clock, Users } from "lucide-react"

interface ServiceDetailModalProps {
  service: any
  isOpen: boolean
  onClose: () => void
}

const serviceDetails = {
  "Property Search": {
    title: "Property Search Services",
    description: "Find your perfect property with our comprehensive search and guidance services.",
    fullDescription:
      "Our property search service combines cutting-edge technology with expert local knowledge to help you find the perfect property. We understand that finding the right home or investment property is one of life's most important decisions.",
    features: [
      "Advanced MLS database access",
      "Personalized property matching",
      "Market trend analysis",
      "Neighborhood insights and reports",
      "Virtual and in-person property tours",
      "Comparative market analysis (CMA)",
      "Investment potential evaluation",
      "School district information",
    ],
    process: [
      "Initial consultation to understand your needs",
      "Set up customized property alerts",
      "Schedule property viewings",
      "Provide detailed property reports",
      "Negotiate on your behalf",
      "Close the deal successfully",
    ],
    pricing: "Free consultation • Commission-based",
    timeline: "2-8 weeks average",
    image: "/images/properties/property-consaltation.jpg",
  },
  "Property Valuation": {
    title: "Professional Property Valuation",
    description: "Get accurate property valuations based on current market data and expert analysis.",
    fullDescription:
      "Our property valuation service provides you with accurate, data-driven property assessments. Whether you're buying, selling, or refinancing, our certified appraisers deliver comprehensive valuation reports.",
    features: [
      "Certified appraiser evaluation",
      "Comparative market analysis",
      "Property condition assessment",
      "Market trend consideration",
      "Investment return calculations",
      "Tax assessment review",
      "Insurance valuation support",
      "Detailed written reports",
    ],
    process: [
      "Schedule property inspection",
      "Conduct thorough property analysis",
      "Research comparable sales",
      "Analyze market conditions",
      "Prepare comprehensive report",
      "Present findings and recommendations",
    ],
    pricing: "$300-$500 per valuation",
    timeline: "3-5 business days",
    image: "/images/properties/modern-office.jpg",
  },
  "Legal Assistance": {
    title: "Real Estate Legal Services",
    description: "Complete legal support for all your real estate transactions and documentation.",
    fullDescription:
      "Navigate complex real estate transactions with confidence. Our legal team provides comprehensive support for all aspects of real estate law, ensuring your interests are protected throughout the process.",
    features: [
      "Contract review and drafting",
      "Title search and insurance",
      "Closing coordination",
      "Dispute resolution",
      "Zoning and permit assistance",
      "Property tax appeals",
      "Landlord-tenant law",
      "Real estate litigation support",
    ],
    process: [
      "Initial legal consultation",
      "Document review and preparation",
      "Due diligence investigation",
      "Negotiation support",
      "Closing preparation",
      "Post-closing follow-up",
    ],
    pricing: "$150-$300 per hour",
    timeline: "Varies by complexity",
    image: "/images/properties/real-state-team.jpg",
  },
  "Property Management": {
    title: "Full-Service Property Management",
    description: "Comprehensive property management services for landlords and investors.",
    fullDescription:
      "Maximize your investment returns with our full-service property management. We handle everything from tenant screening to maintenance coordination, giving you peace of mind and steady rental income.",
    features: [
      "Tenant screening and placement",
      "Rent collection and accounting",
      "Property maintenance coordination",
      "24/7 emergency response",
      "Regular property inspections",
      "Financial reporting",
      "Lease agreement management",
      "Eviction proceedings if needed",
    ],
    process: [
      "Property assessment and setup",
      "Marketing and tenant placement",
      "Move-in coordination",
      "Ongoing management and maintenance",
      "Regular reporting and communication",
      "Lease renewal or tenant transition",
    ],
    pricing: "8-12% of monthly rent",
    timeline: "Ongoing service",
    image: "/images/properties/happy-client.jpg",
  },
  "Investment Consulting": {
    title: "Real Estate Investment Consulting",
    description: "Expert advice on real estate investments and portfolio optimization.",
    fullDescription:
      "Build wealth through strategic real estate investments. Our investment consultants provide expert guidance on market opportunities, risk assessment, and portfolio optimization to maximize your returns.",
    features: [
      "Investment strategy development",
      "Market opportunity analysis",
      "ROI and cash flow projections",
      "Risk assessment and mitigation",
      "Portfolio diversification advice",
      "Tax strategy optimization",
      "1031 exchange facilitation",
      "Exit strategy planning",
    ],
    process: [
      "Investment goals assessment",
      "Market analysis and research",
      "Investment strategy development",
      "Property identification and analysis",
      "Due diligence and acquisition",
      "Ongoing portfolio monitoring",
    ],
    pricing: "$200-$400 per hour",
    timeline: "Ongoing relationship",
    image: "/images/properties/modern-office.jpg",
  },
  "Home Staging": {
    title: "Professional Home Staging",
    description: "Professional home staging services to maximize your property's appeal and value.",
    fullDescription:
      "Transform your property to sell faster and for top dollar. Our professional staging team creates inviting spaces that help buyers envision themselves living in your home.",
    features: [
      "Complete home staging consultation",
      "Furniture rental and placement",
      "Interior design and decoration",
      "Decluttering and organization",
      "Professional photography coordination",
      "Virtual staging options",
      "Seasonal staging updates",
      "Move-out coordination",
    ],
    process: [
      "Initial staging consultation",
      "Staging plan development",
      "Furniture and decor selection",
      "Professional staging setup",
      "Photography and marketing",
      "Ongoing maintenance and updates",
    ],
    pricing: "$1,500-$5,000 per property",
    timeline: "1-2 weeks setup",
    image: "/images/properties/property-consaltation.jpg",
  },
}

export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  if (!isOpen || !service) return null

  const details = serviceDetails[service.title as keyof typeof serviceDetails]

  if (!details) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl border-none shadow-2xl my-8 max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="relative">
            <img
              src={details.image || "/placeholder.svg?height=300&width=800"}
              alt={details.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=300&width=800"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{details.title}</h2>
              <p className="text-lg text-white/90">{details.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 max-h-96 overflow-y-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Overview</h3>
                  <p className="text-gray-600 leading-relaxed">{details.fullDescription}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {details.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process</h3>
                  <div className="space-y-3">
                    {details.process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Service Info */}
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-orange-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Pricing</div>
                          <div className="text-sm text-gray-600">{details.pricing}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-orange-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Timeline</div>
                          <div className="text-sm text-gray-600">{details.timeline}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-orange-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">Expert Team</div>
                          <div className="text-sm text-gray-600">Dedicated specialists</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact CTA */}
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Started Today</h3>
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => {
                          onClose()
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Us Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                        onClick={() => {
                          onClose()
                          alert("Free consultation booking coming soon!")
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Free Consultation
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        onClick={() => {
                          onClose()
                          window.open("mailto:info@realestate.com?subject=Service Inquiry: " + details.title, "_blank")
                        }}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Inquiry
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Offer */}
                <Card className="border shadow-sm bg-orange-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Badge className="bg-orange-500 text-white mb-3">Limited Time</Badge>
                      <h4 className="font-semibold text-gray-900 mb-2">Free Consultation</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Get a complimentary 30-minute consultation to discuss your needs.
                      </p>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => {
                          onClose()
                          alert("Free consultation booking coming soon!")
                        }}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Claim Offer
                      </Button>
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
