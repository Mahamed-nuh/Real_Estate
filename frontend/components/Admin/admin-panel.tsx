"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Settings, BarChart3, Users, Home, Edit, Trash2 } from "lucide-react"
import AddPropertyForm from "./add-property-form"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
  properties: any[]
  onAddProperty: (property: any) => void
}

export default function AdminPanel({ isOpen, onClose, properties, onAddProperty }: AdminPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [activeTab, setActiveTab] = useState("properties")

  if (!isOpen) return null

  const stats = [
    { title: "Total Properties", value: properties.length, icon: Home, color: "bg-blue-500" },
    {
      title: "Active Listings",
      value: properties.filter((p) => p.type !== "Sold").length,
      icon: BarChart3,
      color: "bg-green-500",
    },
    {
      title: "Sold Properties",
      value: properties.filter((p) => p.type === "Sold").length,
      icon: Users,
      color: "bg-orange-500",
    },
    { title: "Featured", value: properties.filter((p) => p.featured).length, icon: Settings, color: "bg-purple-500" },
  ]

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 overflow-y-auto">
        <Card className="w-full max-w-6xl border-none shadow-2xl my-8 max-h-[90vh] overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-orange-500 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                  <p className="text-orange-100">Manage your real estate properties</p>
                </div>
                <Button variant="ghost" className="text-white hover:bg-orange-600" onClick={onClose}>
                  ✕
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`${stat.color} p-2 rounded-full`}>
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b">
              <div className="flex space-x-8 px-6">
                <button
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === "properties"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("properties")}
                >
                  Properties
                </button>
                <button
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === "analytics"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("analytics")}
                >
                  Analytics
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {activeTab === "properties" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Property Management</h3>
                    <Button
                      onClick={() => setShowAddForm(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {properties.map((property) => (
                      <Card key={property.id} className="border shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={property.image || "/placeholder.svg?height=60&width=80"}
                                alt={property.title}
                                className="w-20 h-15 object-cover rounded"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">{property.title}</h4>
                                <p className="text-sm text-gray-600">{property.location}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge
                                    className={`${property.type === "For Sale" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                                  >
                                    {property.type}
                                  </Badge>
                                  {property.featured && (
                                    <Badge className="bg-orange-100 text-orange-700">Featured</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-orange-500">{property.price}</span>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border shadow-sm">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Property Views</h4>
                        <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                          <p className="text-gray-500">Chart placeholder</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border shadow-sm">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Inquiries</h4>
                        <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                          <p className="text-gray-500">Chart placeholder</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddPropertyForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} onAddProperty={onAddProperty} />
    </>
  )
}
