import sgMail from '@sendgrid/mail'

interface EmailParams {
  to: string
  from: string
  subject: string
  content: string
}

export class SendGridEmailClient {
  constructor() {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY environment variable is not set')
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async send({ to, from, subject, content }: EmailParams) {
    const msg = {
      to,
      from,
      subject,
      html: content,
    }

    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error('SendGrid Error:', error)
      throw error
    }
  }
}
