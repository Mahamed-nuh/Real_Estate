"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Search, Calculator, FileText, Key, TrendingUp } from "lucide-react"
import ServiceDetailModal from "./service-detail-modal"
import ScheduleConsultationModal from "./schedule-consultation-modal"
import FreeQuoteModal from "./free-quote-modal"

const services = [
  {
    icon: Search,
    title: "Property Search",
    description: "Find your perfect property with our advanced search tools and expert guidance.",
    features: ["Advanced filtering", "Market analysis", "Location insights"],
  },
  {
    icon: Calculator,
    title: "Property Valuation",
    description: "Get accurate property valuations based on current market trends and data.",
    features: ["Market comparison", "Investment analysis", "Future projections"],
  },
  {
    icon: FileText,
    title: "Legal Assistance",
    description: "Complete legal support for all your real estate transactions and documentation.",
    features: ["Contract review", "Legal documentation", "Compliance check"],
  },
  {
    icon: Key,
    title: "Property Management",
    description: "Comprehensive property management services for landlords and investors.",
    features: ["Tenant screening", "Maintenance coordination", "Rent collection"],
  },
  {
    icon: TrendingUp,
    title: "Investment Consulting",
    description: "Expert advice on real estate investments and portfolio optimization.",
    features: ["ROI analysis", "Market trends", "Risk assessment"],
  },
  {
    icon: Home,
    title: "Home Staging",
    description: "Professional home staging services to maximize your property's appeal.",
    features: ["Interior design", "Furniture rental", "Photography"],
  },
]

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showConsultationModal, setShowConsultationModal] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  const handleLearnMore = (service: any) => {
    setSelectedService(service)
    setShowServiceModal(true)
  }

  return (
    <>
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services to help you buy, sell, or invest in properties with
              confidence.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <service.icon className="h-8 w-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="outline"
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors bg-transparent"
                      onClick={() => handleLearnMore(service)}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-orange-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your real estate needs and discover how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                onClick={() => setShowConsultationModal(true)}
              >
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 bg-transparent"
                onClick={() => setShowQuoteModal(true)}
              >
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
      />

      {/* Schedule Consultation Modal */}
      <ScheduleConsultationModal isOpen={showConsultationModal} onClose={() => setShowConsultationModal(false)} />

      {/* Free Quote Modal */}
      <FreeQuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
    </>
  )
}
