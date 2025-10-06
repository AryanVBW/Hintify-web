

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

    // Create email HTML content for support team
    const supportEmailHtml = `
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

    // Create confirmation email HTML for the user
    const userConfirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #ffffff;
              max-width: 600px;
              margin: 0 auto;
              padding: 0;
              background-color: #000000;
            }
            .container {
              background-color: #000000;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
              border: 1px solid rgba(250, 204, 21, 0.3);
              padding: 40px 30px;
              border-radius: 12px 12px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 32px;
              color: #facc15;
              font-weight: 700;
            }
            .header p {
              margin: 0;
              font-size: 16px;
              color: #9ca3af;
            }
            .checkmark {
              width: 60px;
              height: 60px;
              background: rgba(250, 204, 21, 0.2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              font-size: 32px;
            }
            .content {
              background: #0a0a0a;
              padding: 40px 30px;
              border-left: 1px solid rgba(250, 204, 21, 0.3);
              border-right: 1px solid rgba(250, 204, 21, 0.3);
            }
            .content p {
              color: #d1d5db;
              font-size: 16px;
              line-height: 1.8;
              margin: 0 0 20px 0;
            }
            .greeting {
              font-size: 18px;
              color: #ffffff;
              font-weight: 600;
              margin-bottom: 20px;
            }
            .summary-box {
              background: rgba(250, 204, 21, 0.1);
              border: 1px solid rgba(250, 204, 21, 0.3);
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
            }
            .summary-title {
              color: #facc15;
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 15px;
            }
            .summary-item {
              margin-bottom: 15px;
            }
            .summary-label {
              color: #9ca3af;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .summary-value {
              color: #ffffff;
              font-size: 15px;
              padding: 8px 12px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 5px;
              border-left: 3px solid #facc15;
            }
            .badge {
              display: inline-block;
              padding: 6px 16px;
              background: #facc15;
              color: #000000;
              border-radius: 20px;
              font-weight: 600;
              font-size: 13px;
            }
            .description-text {
              white-space: pre-wrap;
              word-wrap: break-word;
              line-height: 1.6;
            }
            .info-box {
              background: rgba(59, 130, 246, 0.1);
              border: 1px solid rgba(59, 130, 246, 0.3);
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .info-box p {
              margin: 0;
              color: #93c5fd;
              font-size: 14px;
            }
            .footer {
              background: #0a0a0a;
              padding: 30px;
              border: 1px solid rgba(250, 204, 21, 0.3);
              border-top: none;
              border-radius: 0 0 12px 12px;
              text-align: center;
            }
            .footer p {
              color: #6b7280;
              font-size: 14px;
              margin: 5px 0;
            }
            .footer a {
              color: #facc15;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            .divider {
              height: 1px;
              background: rgba(250, 204, 21, 0.2);
              margin: 30px 0;
            }
            @media only screen and (max-width: 600px) {
              .container {
                padding: 10px;
              }
              .header, .content, .footer {
                padding: 20px 15px;
              }
              .header h1 {
                font-size: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="checkmark">✓</div>
              <h1>Thank You!</h1>
              <p>Your report has been received</p>
            </div>

            <div class="content">
              <p class="greeting">Hi ${name},</p>

              <p>
                Thank you for taking the time to report an issue with Hintify. We truly appreciate your feedback
                and your help in making our platform better for everyone.
              </p>

              <p>
                Your report has been successfully submitted to our team. We take all feedback seriously and will
                review your submission carefully.
              </p>

              <div class="summary-box">
                <div class="summary-title">📋 Report Summary</div>

                <div class="summary-item">
                  <div class="summary-label">Issue Type</div>
                  <div class="summary-value">
                    <span class="badge">${issueTypeLabel}</span>
                  </div>
                </div>

                <div class="summary-item">
                  <div class="summary-label">Description</div>
                  <div class="summary-value description-text">${description}</div>
                </div>

                ${screenshots.length > 0 ? `
                  <div class="summary-item">
                    <div class="summary-label">Attachments</div>
                    <div class="summary-value">
                      📎 ${screenshots.length} screenshot${screenshots.length > 1 ? 's' : ''} included
                    </div>
                  </div>
                ` : ''}
              </div>

              <div class="info-box">
                <p>
                  <strong>💡 What happens next?</strong><br>
                  Our team will review your report and may reach out to you at <strong>${email}</strong>
                  if we need any additional information. We aim to respond to all reports within 2-3 business days.
                </p>
              </div>

              <div class="divider"></div>

              <p>
                In the meantime, if you have any urgent concerns or additional information to share,
                feel free to reply to this email.
              </p>

              <p style="margin-top: 30px; color: #9ca3af; font-size: 14px;">
                Best regards,<br>
                <strong style="color: #facc15;">The Hintify Team</strong>
              </p>
            </div>

            <div class="footer">
              <p>
                <strong style="color: #ffffff;">Hintify</strong> - Get Hints, Not Answers
              </p>
              <p style="margin: 15px 0; color: #4b5563; font-size: 12px;">
                Submitted on ${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}
              </p>
              <p style="margin-top: 15px;">
                <a href="https://hintify.nexus-v.tech">Visit our website</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to support team
    const { data: supportData, error: supportError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Hintify Support <noreply@support-hintify.nexus-v.tech>',
      to: process.env.SUPPORT_EMAIL || 'vivek.aryanvbw@gmail.com',
      replyTo: email,
      subject: `[${issueTypeLabel}] New Issue Report from ${name}`,
      html: supportEmailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    if (supportError) {
      console.error('Resend error (support email):', supportError)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const { data: userConfirmationData, error: userConfirmationError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Hintify Support <noreply@support-hintify.nexus-v.tech>',
      to: email,
      subject: `Thank you for your ${issueTypeLabel} - Hintify`,
      html: userConfirmationEmailHtml,
    })

    if (userConfirmationError) {
      console.error('Resend error (user confirmation email):', userConfirmationError)
      // Don't fail the request if confirmation email fails, but log it
      // The support email was sent successfully, which is the critical one
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Issue report submitted successfully',
        supportEmailId: supportData?.id,
        confirmationEmailId: userConfirmationData?.id
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

