"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Home, TrendingUp } from "lucide-react"
import AboutUsModal from "./about-us-modal"
import TeamModal from "./team-modal"

const features = [
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as the top real estate agency in the region for 3 consecutive years.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our experienced agents provide personalized service and expert market knowledge.",
  },
  {
    icon: Home,
    title: "Quality Properties",
    description: "Curated selection of premium properties in the most desirable locations.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Stay ahead with our comprehensive market analysis and investment guidance.",
  },
]

export default function AboutSection() {
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)

  return (
    <>
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Why Choose
                  <span className="text-orange-500"> RealEstate</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With over 15 years of experience in the real estate industry, we have helped thousands of families
                  find their perfect home. Our commitment to excellence and customer satisfaction sets us apart from the
                  competition.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-orange-100 p-3 rounded-full">
                          <feature.icon className="h-6 w-6 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                  onClick={() => setShowAboutModal(true)}
                >
                  Learn More About Us
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 bg-transparent"
                  onClick={() => setShowTeamModal(true)}
                >
                  View Our Team
                </Button>
              </div>
            </div>

            {/* Right Content - Images with your actual images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/images/properties/real-state-team.jpg"
                    alt="Real estate team"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=250"
                    }}
                  />
                  <img
                    src="/images/properties/modern-office.jpg"
                    alt="Modern office"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=250"
                    }}
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="/images/properties/happy-client.jpg"
                    alt="Happy clients"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=250"
                    }}
                  />
                  <img
                    src="/images/properties/property-consaltation.jpg"
                    alt="Property consultation"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=250"
                    }}
                  />
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AboutUsModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />
    </>
  )
}
