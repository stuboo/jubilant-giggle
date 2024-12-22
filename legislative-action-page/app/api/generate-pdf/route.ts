import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(request: Request) {
  try {
    const { content, userInfo, legislators } = await request.json()

    if (!content || !userInfo || !legislators) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    // Create HTML content for both letters
    const letterHtml = legislators.map((legislator: any, index: number) => `
      ${index > 0 ? '<div style="page-break-before: always;"></div>' : ''}
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page {
              size: letter;
              margin: 1in;
            }
            body {
              font-family: "Times New Roman", Times, serif;
              font-size: 12pt;
              line-height: 1;
              color: #000000;
              margin: 0;
              padding: 0;
            }
            .sender-info {
              margin-bottom: 24pt;
              text-align: left;
            }
            .date {
              margin-bottom: 24pt;
            }
            .recipient-info {
              margin-bottom: 24pt;
            }
            .salutation {
              margin-bottom: 24pt;
            }
            .letter-content {
              margin-bottom: 24pt;
            }
            .letter-content p {
              margin: 0 0 24pt 0;
              text-align: left;
            }
            .letter-content p:last-child {
              margin-bottom: 24pt;
            }
            .closing {
              margin-bottom: 48pt; /* 4 line spaces for signature */
            }
            .signature {
              margin-bottom: 0;
            }
          </style>
        </head>
        <body>
          <div class="sender-info">
            ${userInfo.name}<br>
            ${userInfo.address}<br>
            ${userInfo.city}, ${userInfo.state} ${userInfo.zip}
          </div>

          <div class="date">
            ${formattedDate}
          </div>

          <div class="recipient-info">
            ${legislator.name}<br>
            ${legislator.role}<br>
            ${legislator.address.street}<br>
            ${legislator.address.suite}<br>
            ${legislator.address.city}, ${legislator.address.state} ${legislator.address.zip}
          </div>

          <div class="salutation">
            Dear ${legislator.role} ${legislator.name},
          </div>

          <div class="letter-content">
            ${content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
          </div>

          <div class="closing">
            Sincerely,
          </div>

          <div class="signature">
            ${userInfo.name}
          </div>
        </body>
      </html>
    `).join('')

    // Set content with both letters
    await page.setContent(letterHtml)

    // Generate PDF with exact 8.5" x 11" dimensions
    const pdf = await page.pdf({
      format: 'Letter', // 8.5" x 11"
      margin: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in'
      },
      printBackground: true,
      preferCSSPageSize: true
    })

    await browser.close()

    // Return the PDF with appropriate headers
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="letters-to-legislators.pdf"'
      }
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
