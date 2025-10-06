import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const issueType = formData.get('issueType') as string
    const description = formData.get('description') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const screenshots = formData.getAll('screenshots') as File[]

    // Validate required fields
    if (!issueType || !description || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Process screenshots and convert to base64 for email attachments
    const attachments = await Promise.all(
      screenshots.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        return {
          filename: file.name,
          content: buffer,
        }
      })
    )

    // Get issue type label
    const issueTypeLabels: Record<string, string> = {
      bug: 'Bug Report',
      feature: 'Feature Request',
      performance: 'Performance Issue',
      ui: 'UI/UX Issue',
      security: 'Security Concern',
      other: 'Other',
    }

    const issueTypeLabel = issueTypeLabels[issueType] || issueType

    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
              color: #facc15;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e5e5e5;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: 600;
              color: #666;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 16px;
              padding: 10px;
              background: #f9f9f9;
              border-radius: 5px;
              border-left: 3px solid #facc15;
            }
            .description {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .badge {
              display: inline-block;
              padding: 5px 15px;
              background: #facc15;
              color: #000;
              border-radius: 20px;
              font-weight: 600;
              font-size: 14px;
            }
            .footer {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 0 0 10px 10px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .screenshots-note {
              margin-top: 20px;
              padding: 15px;
              background: #fff9e6;
              border-left: 3px solid #facc15;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐛 New Issue Report</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">Issue Type</div>
              <div class="field-value">
                <span class="badge">${issueTypeLabel}</span>
              </div>
            </div>

            <div class="field">
              <div class="field-label">Reported By</div>
              <div class="field-value">
                <strong>${name}</strong><br>
                <a href="mailto:${email}">${email}</a>
              </div>
            </div>

            <div class="field">
              <div class="field-label">Description</div>
              <div class="field-value description">${description}</div>
            </div>

            ${screenshots.length > 0 ? `
              <div class="screenshots-note">
                <strong>📎 Attachments:</strong> ${screenshots.length} screenshot(s) attached to this email
              </div>
            ` : ''}
          </div>

          <div class="footer">
            <p>This issue was submitted via the Hintify Report Issue form</p>
            <p style="margin: 5px 0; color: #999; font-size: 12px;">
              Submitted on ${new Date().toLocaleString('en-US', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}
            </p>
          </div>
        </body>
      </html>
    `

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Hintify Support <onboarding@resend.dev>',
      to: process.env.SUPPORT_EMAIL || 'support@hintify.com',
      replyTo: email,
      subject: `[${issueTypeLabel}] New Issue Report from ${name}`,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Issue report submitted successfully',
        emailId: data?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing issue report:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

