'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useUserInfo } from '../contexts/UserInfoContext'
import { Phone } from 'lucide-react'

const phoneScript = `Introduction:
Hello, my name is [Your Name], and I'm a constituent from [Your City]. I'm calling to urge the legislator to oppose the school voucher bill being considered.

Message:
This bill risks harming our public schools, which are the backbone of our community. Public schools serve every child, while private schools do not. Although the bill claims to use private funds initially, it sets a precedent that could weaken public education in the future.

We need to prioritize fully funding and improving public schools, not diverting attention and resources to private interests. I hope they will stand with public schools and vote against this harmful bill.

Conclusion:
Thank you for your time and for considering my concerns. I appreciate your service to our community.`

export default function TelephoneScript() {
  const { userInfo } = useUserInfo()

  const getPopulatedScript = () => {
    return phoneScript
      .replace('[Your Name]', userInfo.name)
      .replace('[Your City]', userInfo.city)
  }

  return (
    <div className="space-y-6">
      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Rep. Iris Rudder</h3>
            </div>
            <p className="text-lg font-medium text-blue-600">(615) 741-8695</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Sen. Janice Bowling</h3>
            </div>
            <p className="text-lg font-medium text-blue-600">(615) 741-6694</p>
          </CardContent>
        </Card>
      </div>

      {/* Phone Script */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Suggested Phone Script</h3>
          <div className="bg-blue-50 p-6 rounded-md whitespace-pre-wrap text-base">
            {getPopulatedScript()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
