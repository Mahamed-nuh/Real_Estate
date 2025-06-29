"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SecurityCheck() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Main heading */}
        <h1 className="text-3xl font-semibold text-orange-500">{"Let's confirm you are human"}</h1>

        {/* Description text */}
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Complete the security check before continuing. This step verifies that you are not a bot, which helps to
            protect your account and prevent spam.
          </p>
        </div>

        {/* Begin button */}
        <div className="pt-4">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium"
            onClick={() => {
              // Handle security check initiation
              console.log("Security check initiated")
            }}
          >
            Begin →
          </Button>
        </div>

        {/* Language selector */}
        <div className="pt-8">
          <Select defaultValue="english">
            <SelectTrigger className="w-32 mx-auto border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Español</SelectItem>
              <SelectItem value="french">Français</SelectItem>
              <SelectItem value="german">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
