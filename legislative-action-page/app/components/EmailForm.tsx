'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useUserInfo } from '../contexts/UserInfoContext'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Copy, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const emailTemplate = `Dear [Legislator],

I urge you to oppose the Education Freedom Act of 2025. This bill risks harming public schools, which serve all students, regardless of their background or needs. We must focus on fully funding and strengthening our public schools, not diverting resources to private institutions.

Thank you for considering this important issue.

Sincerely,
[Your Name]
[Your Address]`

interface EmailClient {
  name: string
  icon: string
  getUrl: (to: string, subject: string, body: string) => string
}

const emailClients: EmailClient[] = [
  {
    name: 'Gmail',
    icon: '📧',
    getUrl: (to, subject, body) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`
  },
  {
    name: 'Outlook',
    icon: '✉️',
    getUrl: (to, subject, body) =>
      `https://outlook.live.com/owa/#subject=${subject}&body=${body}&to=${to}&path=%2fmail%2faction%2fcompose`
  },
  {
    name: 'Yahoo',
    icon: '📨',
    getUrl: (to, subject, body) =>
      `http://compose.mail.yahoo.com/?to=${to}&subj=${subject}&body=${body}`
  },
  {
    name: 'AOL',
    icon: '📬',
    getUrl: (to, subject, body) =>
      `http://mail.aol.com/mail/compose-message.aspx?to=${to}&subject=${subject}&body=${body}`
  },
  {
    name: 'Default Email',
    icon: '📩',
    getUrl: (to, subject, body) =>
      `mailto:${to}?subject=${subject}&body=${body}`
  }
]

interface Legislator {
  name: string
  role: string
  email: string
}

const legislators: Legislator[] = [
  {
    name: 'Iris Rudder',
    role: 'Representative',
    email: 'iris.rudder@capitol.tn.gov'
  },
  {
    name: 'Janice Bowling',
    role: 'Senator',
    email: 'janice.bowling@capitol.tn.gov'
  }
]

export default function EmailForm() {
  const { userInfo } = useUserInfo()
  const [emailContent, setEmailContent] = useState('')
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const [selectedLegislator, setSelectedLegislator] = useState<Legislator | null>(null)
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null)

  useEffect(() => {
    if (userInfo) {
      setEmailContent(emailTemplate
        .replace('[Your Name]', userInfo.name)
        .replace('[Your Address]', `${userInfo.address}, ${userInfo.city}, ${userInfo.state} ${userInfo.zip}`))
    }
  }, [userInfo])

  const getEmailUrl = (client: EmailClient, legislator: Legislator) => {
    const subject = encodeURIComponent('Oppose the Education Freedom Act of 2025')
    const body = encodeURIComponent(
      emailContent.replace('[Legislator]', `${legislator.role} ${legislator.name}`)
    )
    return client.getUrl(legislator.email, subject, body)
  }

  const copyToClipboard = async (legislator: Legislator) => {
    try {
      const textToCopy = `To: ${legislator.email}
Subject: Oppose the Education Freedom Act of 2025

${emailContent.replace('[Legislator]', `${legislator.role} ${legislator.name}`)}`

      await navigator.clipboard.writeText(textToCopy)
      setCopiedStates(prev => ({ ...prev, [legislator.email]: true }))
      setHighlightedCard(legislator.email)
      
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [legislator.email]: false }))
        setHighlightedCard(null)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Email Content Preview */}
      <Card>
        <CardContent className="pt-6">
          <Label className="mb-4 block">Preview and Edit Email Template</Label>
          <Textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[200px] font-mono text-sm mb-4"
          />
        </CardContent>
      </Card>

      {/* Legislator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {legislators.map((legislator) => (
          <Card 
            key={legislator.email}
            className={`transition-colors duration-200 ${
              highlightedCard === legislator.email 
                ? 'bg-green-50 dark:bg-green-950' 
                : ''
            }`}
          >
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">
                Email {legislator.role} {legislator.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{legislator.email}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {emailClients.map((client) => (
                  <Button
                    key={client.name}
                    variant="outline"
                    className="w-full text-sm"
                    asChild
                  >
                    <a
                      href={getEmailUrl(client, legislator)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>{client.icon}</span>
                      <span>{client.name}</span>
                    </a>
                  </Button>
                ))}
              </div>

              <Button
                variant="secondary"
                onClick={() => copyToClipboard(legislator)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {copiedStates[legislator.email] ? 'Copied!' : 'Copy Email Content'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Alert>
        <AlertDescription>
          Choose your preferred email client above to compose your message. You can preview and edit the template before sending.
          If none of the email clients work for you, use the "Copy Email Content" button to copy the message and paste it into your email client manually.
        </AlertDescription>
      </Alert>
    </div>
  )
}
