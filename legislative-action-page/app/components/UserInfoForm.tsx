'use client'

import { useUserInfo } from '../contexts/UserInfoContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function UserInfoForm() {
  const { userInfo, setUserInfo, isFormComplete } = useUserInfo()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Information</h2>
      <Alert className="mb-4">
        <AlertDescription>
          To continue, please fill in your contact information below. Your information will only be saved for this session and will not be stored after you leave the page.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={userInfo.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={userInfo.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={userInfo.address} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={userInfo.city} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" value={userInfo.state} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="zip">ZIP Code</Label>
          <Input id="zip" name="zip" value={userInfo.zip} onChange={handleChange} required />
        </div>
      </div>
    </form>
  )
}

