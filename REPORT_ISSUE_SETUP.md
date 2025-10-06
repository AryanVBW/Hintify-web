# Report Issue Feature - Setup Guide

This document provides instructions for setting up and configuring the Report Issue feature in Hintify.

## Overview

The Report Issue feature allows users to submit bug reports, feature requests, and other feedback directly through the website. The system includes:

- ✅ Form validation with Zod schema
- ✅ Screenshot upload (up to 5 images, 5MB each)
- ✅ Email notifications via Resend
- ✅ Responsive design matching the app theme
- ✅ Loading states and error handling
- ✅ Success confirmation page

## Prerequisites

- Node.js 18+ installed
- A Resend account (free tier available)
- Access to your domain's DNS settings (for production email sending)

## Setup Instructions

### 1. Install Dependencies

The required dependency has already been installed:

```bash
npm install resend
```

### 2. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 3. Get Your Resend API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Hintify Production")
5. Copy the API key (it starts with `re_`)

### 4. Configure Environment Variables

Create or update your `.env.local` file with the following variables:

```env
# Resend Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here

# Email Configuration
SUPPORT_EMAIL=support@hintify.com
RESEND_FROM_EMAIL=Hintify Support <noreply@yourdomain.com>
```

**Important Notes:**

- **Development/Testing**: You can use Resend's default sending domain (`onboarding@resend.dev`) for testing
- **Production**: You must verify your own domain in Resend to send emails from your domain

### 5. Verify Your Domain (Production Only)

For production use, you need to verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `hintify.com`)
4. Add the provided DNS records to your domain:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)
5. Wait for DNS propagation (can take up to 48 hours)
6. Verify the domain in Resend

Once verified, update your `.env.local`:

```env
RESEND_FROM_EMAIL=Hintify Support <noreply@hintify.com>
```

## Email Service Alternatives

If you prefer to use a different email service, here are some alternatives:

### Option 1: SendGrid (Free Tier)

```bash
npm install @sendgrid/mail
```

Update `app/api/report-issue/route.ts` to use SendGrid instead of Resend.

### Option 2: Mailgun (Free Tier)

```bash
npm install mailgun.js form-data
```

Update the API route accordingly.

### Option 3: Gmail SMTP (Not Recommended for Production)

While Gmail SMTP can work, it's not recommended for production due to:
- Daily sending limits (500 emails/day)
- Security concerns with app passwords
- Potential for being marked as spam

## Testing the Feature

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/report-issue`

3. Fill out the form with test data

4. Submit and check:
   - Console logs for any errors
   - Your support email inbox for the report

### Test Checklist

- [ ] Form validation works (try submitting empty fields)
- [ ] Email validation works (try invalid email formats)
- [ ] Screenshot upload works (try uploading images)
- [ ] File size validation works (try uploading files > 5MB)
- [ ] Maximum file limit works (try uploading > 5 images)
- [ ] Form submission shows loading state
- [ ] Success message displays after submission
- [ ] Email is received at support address
- [ ] Email includes all form data
- [ ] Screenshots are attached to email
- [ ] Reply-to address is set to user's email
- [ ] Mobile responsive design works

## Customization

### Change Issue Types

Edit the `issueTypes` array in `app/report-issue/page.tsx`:

```typescript
const issueTypes = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  // Add more types here
]
```

### Modify Email Template

Edit the `emailHtml` variable in `app/api/report-issue/route.ts` to customize the email design.

### Adjust File Upload Limits

In `app/report-issue/page.tsx`, modify these values:

```typescript
const isUnder5MB = file.size <= 5 * 1024 * 1024 // Change 5 to your desired MB limit

if (validFiles.length + screenshots.length > 5) { // Change 5 to your desired max files
  setError('Maximum 5 screenshots allowed')
  return
}
```

### Change Support Email

Update the `SUPPORT_EMAIL` environment variable in your `.env.local` file.

## Troubleshooting

### Issue: "Failed to send email"

**Possible causes:**
1. Invalid or missing `RESEND_API_KEY`
2. Unverified domain (in production)
3. Rate limiting (free tier has limits)

**Solutions:**
- Check your API key is correct
- Verify your domain in Resend
- Check Resend dashboard for error logs

### Issue: Emails going to spam

**Solutions:**
1. Verify your domain with proper DNS records
2. Add DMARC policy
3. Warm up your sending domain gradually
4. Ensure your email content isn't triggering spam filters

### Issue: Screenshots not attaching

**Possible causes:**
1. File size too large
2. Invalid file format
3. Memory issues with large files

**Solutions:**
- Check file size limits
- Ensure files are valid images
- Consider implementing image compression

### Issue: Form validation not working

**Solutions:**
- Check browser console for errors
- Ensure Zod schema is properly configured
- Verify react-hook-form is properly set up

## Security Considerations

1. **Rate Limiting**: Consider implementing rate limiting to prevent abuse
2. **CAPTCHA**: Add reCAPTCHA or similar to prevent spam
3. **File Validation**: The current implementation validates file types and sizes, but consider adding virus scanning for production
4. **Input Sanitization**: All user inputs are sanitized before being sent via email

## Production Deployment

Before deploying to production:

1. ✅ Verify your domain in Resend
2. ✅ Update environment variables in your hosting platform
3. ✅ Test the feature thoroughly
4. ✅ Set up monitoring for email delivery
5. ✅ Configure error tracking (e.g., Sentry)
6. ✅ Consider adding rate limiting
7. ✅ Add CAPTCHA if needed

## Support

For issues or questions:
- Check the [Resend Documentation](https://resend.com/docs)
- Review the code comments in the implementation
- Check the browser console and server logs for errors

## License

This feature is part of the Hintify project and follows the same license.

