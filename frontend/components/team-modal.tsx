"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Phone, Mail, Linkedin, Award, Star } from "lucide-react"

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
}

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    position: "CEO & Founder",
    image: "/images/properties/real-state-team.jpg",
    experience: "15+ years",
    specialization: "Luxury Properties",
    phone: "+1 (555) 123-4567",
    email: "john@realestate.com",
    bio: "John founded RealEstate with a vision to revolutionize the real estate industry. With over 15 years of experience, he specializes in luxury properties and has closed over $500M in transactions.",
    achievements: ["Top Agent 2023", "Luxury Specialist", "Client Choice Award"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Senior Sales Agent",
    image: "/images/properties/real-state-team.jpg",
    experience: "10+ years",
    specialization: "Residential Sales",
    phone: "+1 (555) 234-5678",
    email: "sarah@realestate.com",
    bio: "Sarah is our top residential sales agent with a passion for helping families find their perfect home. Her attention to detail and market knowledge are unmatched.",
    achievements: ["Sales Leader 2023", "Customer Service Excellence", "Rising Star Award"],
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Investment Specialist",
    image: "/images/properties/real-state-team.jpg",
    experience: "8+ years",
    specialization: "Investment Properties",
    phone: "+1 (555) 345-6789",
    email: "michael@realestate.com",
    bio: "Michael helps investors build wealth through strategic real estate investments. His analytical approach and market insights have generated exceptional returns for clients.",
    achievements: ["Investment Expert", "Market Analyst", "ROI Specialist"],
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Property Manager",
    image: "/images/properties/real-state-team.jpg",
    experience: "6+ years",
    specialization: "Property Management",
    phone: "+1 (555) 456-7890",
    email: "emily@realestate.com",
    bio: "Emily oversees our property management division, ensuring landlords and tenants have a seamless experience. Her organizational skills and tenant relations expertise are exceptional.",
    achievements: ["Management Excellence", "Tenant Satisfaction", "Operations Leader"],
  },
]

export default function TeamModal({ isOpen, onClose }: TeamModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-6xl border-none shadow-2xl my-8 max-h-[90vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-orange-500 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Meet Our Team</h2>
                <p className="text-orange-100">Experienced professionals dedicated to your success</p>
              </div>
              <Button variant="ghost" className="text-white hover:bg-orange-600" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 max-h-96 overflow-y-auto">
            <div className="space-y-8">
              {/* Team Introduction */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Expert Team</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our team of experienced real estate professionals is committed to providing you with exceptional
                  service. Each member brings unique expertise and a passion for helping clients achieve their real
                  estate goals.
                </p>
              </div>

              {/* Team Members Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="border shadow-sm hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-20 h-20 object-cover rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=80&width=80"
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-orange-500 font-medium mb-2">{member.position}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Experience:</span> {member.experience}
                            </div>
                            <div>
                              <span className="font-medium">Specialty:</span> {member.specialization}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{member.bio}</p>

                          {/* Achievements */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {member.achievements.map((achievement, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700"
                                >
                                  <Star className="h-3 w-3 mr-1" />
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Contact Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={() => window.open(`tel:${member.phone}`, "_self")}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                              onClick={() =>
                                window.open(`mailto:${member.email}?subject=Real Estate Inquiry`, "_blank")
                              }
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                              onClick={() => alert("LinkedIn profile coming soon!")}
                            >
                              <Linkedin className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Join Team CTA */}
              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Join Our Team</h3>
                <p className="text-gray-600 mb-4">
                  Are you a passionate real estate professional? We're always looking for talented individuals to join
                  our growing team.
                </p>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => {
                    onClose()
                    alert("Careers page coming soon!")
                  }}
                >
                  <Award className="h-4 w-4 mr-2" />
                  View Career Opportunities
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
