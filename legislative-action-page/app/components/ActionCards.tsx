'use client'

import { useState } from 'react'
import { useUserInfo } from '../contexts/UserInfoContext'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import EmailForm from './EmailForm'
import TelephoneScript from './TelephoneScript'
import PrintableLetter from './PrintableLetter'

export default function ActionCards() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const { isFormComplete } = useUserInfo()

  const actions = [
    {
      title: 'Send Emails',
      description: 'Quickly send personalized emails to your legislators.',
      component: <EmailForm />,
    },
    {
      title: 'Make Phone Calls',
      description: 'Use our script to effectively communicate your concerns.',
      component: <TelephoneScript />,
    },
    {
      title: 'Print Letters',
      description: 'Generate customizable letters to mail to your representatives.',
      component: <PrintableLetter />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <Card 
          key={index} 
          className={`cursor-pointer transition-all ${isFormComplete ? 'hover:shadow-lg' : 'opacity-50'}`}
          onClick={() => isFormComplete && setOpenModal(action.title)}
        >
          <CardHeader>
            <CardTitle>{action.title}</CardTitle>
            <CardDescription>{action.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}

      <Dialog open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{openModal}</DialogTitle>
            <DialogDescription>
              Take action against the school voucher bill
            </DialogDescription>
          </DialogHeader>
          {actions.find(action => action.title === openModal)?.component}
        </DialogContent>
      </Dialog>
    </div>
  )
}

