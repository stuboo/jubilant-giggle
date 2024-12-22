'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useUserInfo } from '../contexts/UserInfoContext'

const letterTemplate = `I am writing to express my strong opposition to the school voucher bill currently being debated. Public schools in our community play a critical role in educating all children and preparing them for a successful future. This bill threatens to undermine these efforts by paving the way for funding to be diverted to private schools that are not held to the same standards or serve all students.

Our public schools are already underfunded and face significant challenges. Diverting resources, even indirectly, risks further harming the children who rely on public education the most. Instead of creating voucher programs, we should focus on increasing support for public schools to ensure every student has access to high-quality education.

I urge you to vote against this harmful legislation and prioritize public education. Our community's future depends on it.

Thank you for your service and attention to this matter.`

export default function PrintableLetter() {
  const { userInfo } = useUserInfo()
  const [letterContent, setLetterContent] = useState(letterTemplate)
  const [loading, setLoading] = useState(false)

  const generatePDFs = async () => {
    try {
      setLoading(true)
      const legislatorInfo = await fetch('/api/legislator-info').then(res => res.json())
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: letterContent,
          userInfo,
          legislators: [
            legislatorInfo.representatives[0],
            legislatorInfo.senators[0]
          ]
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Get the PDF blob
      const blob = await response.blob()
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob)
      
      // Create a temporary link and click it to download
      const a = document.createElement('a')
      a.href = url
      a.download = 'letters-to-legislators.pdf'
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error generating PDFs:', error)
      alert('Failed to generate PDFs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="letter-content">Letter Content</Label>
        <Textarea
          id="letter-content"
          value={letterContent}
          onChange={(e) => setLetterContent(e.target.value)}
          className="min-h-[300px]"
        />
      </div>
      
      <div>
        <Button 
          onClick={generatePDFs} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate Letters for Rep. Rudder and Sen. Bowling'}
        </Button>
      </div>
    </div>
  )
}
