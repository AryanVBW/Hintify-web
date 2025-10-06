# Report Issue Feature - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Get Your Resend API Key (2 minutes)

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Create a free account
3. Go to **API Keys** → **Create API Key**
4. Copy your API key (starts with `re_`)

### Step 2: Configure Environment Variables (1 minute)

Create a `.env.local` file in your project root:

```env
# Required: Your Resend API Key
RESEND_API_KEY=re_paste_your_key_here

# Required: Where to send issue reports
SUPPORT_EMAIL=your-email@example.com

# Optional: Custom from address (requires domain verification)
RESEND_FROM_EMAIL=Hintify Support <noreply@yourdomain.com>
```

**For testing**, you can use:
```env
RESEND_API_KEY=re_your_key_here
SUPPORT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Step 3: Test It! (1 minute)

```bash
# Start your dev server
npm run dev

# Open in browser
# http://localhost:3000/report-issue
```

Fill out the form and submit. Check your email!

---

## 📋 What You Get

### ✅ A Beautiful Report Issue Page
- Professional design matching your app theme
- Black background with yellow accents
- Fully responsive (mobile, tablet, desktop)

### ✅ Complete Form with Validation
- **Issue Type**: Dropdown with 6 categories
- **Description**: Textarea with character counter
- **Screenshots**: Upload up to 5 images (5MB each)
- **Name & Email**: Contact information fields
- **Real-time validation** with helpful error messages

### ✅ Dual Email System ✨ NEW!
**Two emails sent per submission:**

1. **Support Team Email**
   - Professional HTML email template
   - All form data included
   - Screenshots attached
   - Reply-to user's email
   - Sent via Resend

2. **User Confirmation Email** ✨
   - Beautiful black & yellow themed design
   - Thank you message with checkmark
   - Summary of their submission
   - Expected response time
   - Professional and reassuring

### ✅ Great User Experience
- Loading spinner during submission
- Success page with thank you message
- Immediate email confirmation to user
- Clear error messages
- Smooth animations

---

## 🎯 Access the Feature

The Report Issue page is accessible from:
- **Direct URL**: `/report-issue`
- **Navbar**: "Report Issue" link (added automatically)

---

## 🔧 Customization

### Change Issue Types

Edit `app/report-issue/page.tsx`:

```typescript
const issueTypes = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  // Add your own types here
]
```

### Change Support Email

Update `.env.local`:

```env
SUPPORT_EMAIL=support@yourdomain.com
```

### Modify Email Template

Edit `app/api/report-issue/route.ts` - look for the `emailHtml` variable.

---

## 📱 Features Included

- ✅ Form validation (client & server)
- ✅ Screenshot upload with preview
- ✅ File size & type validation
- ✅ Loading states
- ✅ Success confirmation
- ✅ Error handling
- ✅ Mobile responsive
- ✅ Email with attachments
- ✅ Professional design
- ✅ Accessible (WCAG compliant)

---

## 🐛 Troubleshooting

### "Failed to send email"
- Check your `RESEND_API_KEY` is correct
- Verify it's in `.env.local` (not `.env.example`)
- Restart your dev server after adding env vars

### Email not received
- Check spam folder
- Verify `SUPPORT_EMAIL` is correct
- Check Resend dashboard for logs

### Screenshots not uploading
- Ensure files are under 5MB
- Only image files are allowed
- Maximum 5 files at once

---

## 📚 More Information

- **Full Setup Guide**: See `REPORT_ISSUE_SETUP.md`
- **Implementation Details**: See `REPORT_ISSUE_SUMMARY.md`
- **Resend Docs**: https://resend.com/docs

---

## 🎉 That's It!

You now have a fully functional Report Issue system. Users can submit bug reports, feature requests, and feedback with screenshots, and you'll receive professional email notifications.

**Need help?** Check the detailed guides or the code comments.

