# 📝 Report Issue Feature - Complete Documentation

A comprehensive issue reporting system for Hintify that allows users to submit bug reports, feature requests, and feedback with screenshot attachments via email.

## 🌟 Features

- ✅ **Beautiful UI** - Matches Hintify's black & yellow theme
- ✅ **Form Validation** - Real-time validation with helpful error messages
- ✅ **Screenshot Upload** - Upload up to 5 images (5MB each) with live preview
- ✅ **Email Notifications** - Professional HTML emails sent via Resend
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Loading States** - Clear feedback during submission
- ✅ **Success Confirmation** - Beautiful thank you page
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Accessibility** - WCAG compliant with keyboard navigation

## 📁 Files Structure

```
Hintidy_website/
├── app/
│   ├── api/
│   │   └── report-issue/
│   │       └── route.ts          # API endpoint for handling submissions
│   └── report-issue/
│       └── page.tsx               # Main Report Issue page component
├── components/
│   └── ui/
│       └── navbar.tsx             # Updated with Report Issue link
├── .env.example                   # Environment variables template
├── QUICK_START.md                 # 3-step quick start guide
├── REPORT_ISSUE_SETUP.md          # Comprehensive setup guide
├── REPORT_ISSUE_SUMMARY.md        # Implementation summary
├── FEATURE_OVERVIEW.md            # Visual overview and structure
├── SETUP_CHECKLIST.md             # Complete testing checklist
└── REPORT_ISSUE_README.md         # This file
```

## 🚀 Quick Start

### 1. Get Resend API Key
```bash
# Visit https://resend.com/signup
# Create account → API Keys → Create API Key
```

### 2. Configure Environment
```bash
# Create .env.local file
cat > .env.local << EOF
RESEND_API_KEY=re_your_api_key_here
SUPPORT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
EOF
```

### 3. Test It
```bash
npm run dev
# Visit http://localhost:3000/report-issue
```

**That's it!** 🎉

## 📚 Documentation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **QUICK_START.md** | Get started in 3 steps | First time setup |
| **REPORT_ISSUE_SETUP.md** | Detailed setup instructions | Full configuration |
| **REPORT_ISSUE_SUMMARY.md** | Implementation details | Understanding the code |
| **FEATURE_OVERVIEW.md** | Visual guide & structure | Design reference |
| **SETUP_CHECKLIST.md** | Testing & deployment checklist | Before going live |

## 🎯 Form Fields

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Issue Type | Dropdown | 6 predefined options | Yes |
| Description | Textarea | 10-2000 characters | Yes |
| Screenshots | File Upload | Max 5 files, 5MB each | No |
| Name | Text | 2-100 characters | Yes |
| Email | Email | Valid email format | Yes |

## 📧 Email Template

The system sends professional HTML emails with:
- Branded header with Hintify logo
- Issue type badge
- User contact information
- Full description with formatting
- Screenshot attachments
- Timestamp
- Reply-to functionality

## 🎨 Design System

```css
Colors:
- Background: #000000 (Black)
- Text: #FFFFFF (White)
- Accent: #FACC15 (Yellow)
- Secondary: #9CA3AF (Gray)
- Borders: rgba(255, 255, 255, 0.2)

Components:
- Cards: Black with backdrop blur
- Buttons: Yellow with hover effects
- Inputs: Transparent with white borders
- Alerts: Contextual colors (red for errors, yellow for warnings)
```

## 🔧 Configuration

### Environment Variables

```env
# Required
RESEND_API_KEY=re_xxxxxxxxxxxxx
SUPPORT_EMAIL=support@hintify.com

# Optional (defaults to onboarding@resend.dev)
RESEND_FROM_EMAIL=Hintify Support <noreply@yourdomain.com>
```

### Customization Options

#### Change Issue Types
Edit `app/report-issue/page.tsx`:
```typescript
const issueTypes = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  // Add more...
]
```

#### Modify File Limits
Edit `app/report-issue/page.tsx`:
```typescript
const isUnder5MB = file.size <= 5 * 1024 * 1024 // Change 5 to desired MB
if (validFiles.length + screenshots.length > 5) // Change 5 to max files
```

#### Customize Email Template
Edit `app/api/report-issue/route.ts` - look for `emailHtml` variable.

## 🧪 Testing

### Development Testing
```bash
# Start dev server
npm run dev

# Test scenarios:
1. Submit with all fields filled
2. Submit with empty fields (validation)
3. Upload screenshots
4. Try invalid email
5. Test mobile responsive
```

### Production Testing
```bash
# Deploy to production
# Test from different devices
# Verify email delivery
# Check error handling
```

See `SETUP_CHECKLIST.md` for complete testing guide.

## 🔐 Security

- ✅ Input validation (client & server)
- ✅ File type restrictions (images only)
- ✅ File size limits (5MB per file)
- ✅ XSS protection via React
- ✅ Email sanitization
- ⚠️ Consider adding rate limiting
- ⚠️ Consider adding CAPTCHA

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ iOS Safari
- ✅ Chrome Mobile

## 🐛 Troubleshooting

### Email Not Sending
1. Verify `RESEND_API_KEY` is correct
2. Check Resend dashboard for errors
3. Ensure domain is verified (production)
4. Check rate limits

### Form Not Working
1. Check browser console for errors
2. Verify all environment variables are set
3. Restart dev server after env changes
4. Check API route is accessible

### Screenshots Not Uploading
1. Verify file is an image
2. Check file size (< 5MB)
3. Ensure not exceeding 5 files
4. Check browser console

See `SETUP_CHECKLIST.md` for more troubleshooting tips.

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
# 1. Verify domain in Resend
# 2. Set environment variables in hosting platform
# 3. Deploy
npm run build
npm start
```

### Vercel Deployment
```bash
# Add environment variables in Vercel dashboard:
# Settings → Environment Variables
# - RESEND_API_KEY
# - SUPPORT_EMAIL
# - RESEND_FROM_EMAIL
```

## 📊 Monitoring

Recommended monitoring:
- Email delivery rate (Resend dashboard)
- Form submission success rate
- Error rates
- Response times

## 🔄 Alternative Email Services

The implementation uses Resend, but you can switch to:

| Service | Free Tier | Setup Difficulty |
|---------|-----------|------------------|
| **Resend** | 3,000/month | Easy ⭐ |
| **SendGrid** | 100/day | Medium ⭐⭐ |
| **Mailgun** | 5,000/month | Medium ⭐⭐ |
| **AWS SES** | Pay-as-you-go | Hard ⭐⭐⭐ |

See `REPORT_ISSUE_SETUP.md` for migration instructions.

## 🎓 Technologies Used

- **Next.js 14** - React framework with App Router
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Resend** - Email delivery service
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## 📈 Future Enhancements

Consider adding:
- [ ] Rate limiting to prevent spam
- [ ] reCAPTCHA for bot protection
- [ ] Email confirmation to users
- [ ] Issue tracking system integration
- [ ] Admin dashboard for managing reports
- [ ] Analytics for issue types
- [ ] Automatic categorization with AI
- [ ] File compression for large images
- [ ] Multi-language support

## 🤝 Contributing

To modify or extend this feature:

1. Read the implementation in `REPORT_ISSUE_SUMMARY.md`
2. Review the code structure in `FEATURE_OVERVIEW.md`
3. Make your changes
4. Test using `SETUP_CHECKLIST.md`
5. Update documentation

## 📄 License

This feature is part of the Hintify project and follows the same license.

## 🆘 Support

Need help?
1. Check the documentation files
2. Review code comments
3. Check Resend documentation: https://resend.com/docs
4. Review browser console and server logs

## ✅ Status

**Current Status**: ✅ Complete and Production Ready

All features implemented and tested:
- [x] Form with validation
- [x] Screenshot upload
- [x] Email integration
- [x] Loading states
- [x] Success page
- [x] Error handling
- [x] Responsive design
- [x] Accessibility
- [x] Documentation

---

**Ready to use!** Follow the Quick Start guide to get started in 3 minutes. 🚀

