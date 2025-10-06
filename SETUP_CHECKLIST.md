# Report Issue Feature - Setup Checklist

Use this checklist to ensure your Report Issue feature is properly configured and working.

## 📋 Pre-Deployment Checklist

### 1. Dependencies ✅
- [x] Resend package installed (`npm install resend`)
- [x] All existing dependencies up to date

### 2. Environment Variables ⚙️
- [ ] Created `.env.local` file
- [ ] Added `RESEND_API_KEY`
- [ ] Added `SUPPORT_EMAIL`
- [ ] Added `RESEND_FROM_EMAIL` (optional for testing)
- [ ] Restarted development server after adding env vars

**Example `.env.local`:**
```env
RESEND_API_KEY=re_your_api_key_here
SUPPORT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 3. Resend Account Setup 🔑
- [ ] Created Resend account at https://resend.com
- [ ] Verified email address
- [ ] Generated API key
- [ ] Copied API key to `.env.local`

### 4. Testing (Development) 🧪
- [ ] Started dev server (`npm run dev`)
- [ ] Navigated to `/report-issue`
- [ ] Page loads without errors
- [ ] Form displays correctly
- [ ] All fields are visible and functional

### 5. Form Validation Testing ✔️
- [ ] Try submitting empty form (should show errors)
- [ ] Try invalid email format (should show error)
- [ ] Try description < 10 characters (should show error)
- [ ] Try description > 2000 characters (should show error)
- [ ] All validation messages display correctly

### 6. File Upload Testing 📤
- [ ] Upload a single image (should work)
- [ ] Upload multiple images (up to 5)
- [ ] Try uploading 6th image (should show error)
- [ ] Try uploading file > 5MB (should show error)
- [ ] Try uploading non-image file (should show error)
- [ ] Preview thumbnails display correctly
- [ ] Can remove uploaded images

### 7. Form Submission Testing 📨
- [ ] Fill out complete form
- [ ] Click Submit Report
- [ ] Loading spinner appears
- [ ] Button is disabled during submission
- [ ] Success page displays after submission
- [ ] Can submit another report from success page

### 8. Email Delivery Testing 📧
- [ ] Check support email inbox
- [ ] Email received successfully
- [ ] Email subject is correct
- [ ] Issue type is displayed
- [ ] User name and email are included
- [ ] Description is complete and formatted
- [ ] Screenshots are attached (if uploaded)
- [ ] Reply-to is set to user's email
- [ ] Email template looks professional

### 9. Navigation Testing 🧭
- [ ] "Report Issue" link appears in navbar
- [ ] Link works on desktop
- [ ] Link works on mobile menu
- [ ] Can navigate to page from any route
- [ ] Page is not redirected by middleware

### 10. Responsive Design Testing 📱
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Form is usable on all screen sizes
- [ ] Screenshot grid adjusts properly
- [ ] Navbar is responsive

### 11. Browser Testing 🌐
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 12. Error Handling Testing ⚠️
- [ ] Test with invalid API key (should show error)
- [ ] Test with network disconnected (should show error)
- [ ] Error messages are user-friendly
- [ ] Can retry after error

## 🚀 Production Deployment Checklist

### 1. Domain Verification (Required for Production) 🌐
- [ ] Added domain in Resend dashboard
- [ ] Added SPF record to DNS
- [ ] Added DKIM records to DNS
- [ ] Added DMARC record to DNS (recommended)
- [ ] Verified domain in Resend
- [ ] Updated `RESEND_FROM_EMAIL` to use verified domain

### 2. Environment Variables (Production) 🔐
- [ ] Added `RESEND_API_KEY` to production environment
- [ ] Added `SUPPORT_EMAIL` to production environment
- [ ] Added `RESEND_FROM_EMAIL` with verified domain
- [ ] Verified all env vars are set correctly

### 3. Security Enhancements (Recommended) 🔒
- [ ] Consider adding rate limiting
- [ ] Consider adding CAPTCHA (reCAPTCHA/hCaptcha)
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure CSP headers
- [ ] Review file upload security

### 4. Performance Optimization ⚡
- [ ] Test with large images
- [ ] Verify email sending speed
- [ ] Check page load time
- [ ] Optimize images if needed

### 5. Monitoring & Analytics 📊
- [ ] Set up email delivery monitoring
- [ ] Track form submission success rate
- [ ] Monitor error rates
- [ ] Set up alerts for failures

### 6. Documentation 📚
- [ ] Team knows how to access reports
- [ ] Support email is monitored
- [ ] Process for handling reports is defined
- [ ] Escalation path is clear

### 7. Final Production Tests 🎯
- [ ] Submit test report in production
- [ ] Verify email delivery
- [ ] Check all features work
- [ ] Verify mobile experience
- [ ] Test from different locations/networks

## 🎉 Post-Launch Checklist

### Week 1
- [ ] Monitor email delivery rate
- [ ] Check for any error reports
- [ ] Review user feedback
- [ ] Verify all reports are received

### Month 1
- [ ] Analyze issue types submitted
- [ ] Review response times
- [ ] Gather user feedback on the feature
- [ ] Make improvements if needed

## 🆘 Troubleshooting Quick Reference

### Email Not Sending
1. Check `RESEND_API_KEY` is correct
2. Verify API key has send permissions
3. Check Resend dashboard for errors
4. Verify domain is verified (production)
5. Check rate limits

### Form Not Submitting
1. Check browser console for errors
2. Verify API route is accessible
3. Check network tab for failed requests
4. Verify all required fields are filled
5. Check file sizes and types

### Screenshots Not Uploading
1. Verify file is an image
2. Check file size (< 5MB)
3. Ensure not exceeding 5 files
4. Check browser console for errors
5. Verify FormData is being sent correctly

### Styling Issues
1. Clear browser cache
2. Check for CSS conflicts
3. Verify Tailwind classes are correct
4. Test in different browsers
5. Check responsive breakpoints

## 📞 Support Resources

- **Resend Documentation**: https://resend.com/docs
- **Setup Guide**: See `REPORT_ISSUE_SETUP.md`
- **Quick Start**: See `QUICK_START.md`
- **Feature Overview**: See `FEATURE_OVERVIEW.md`

## ✅ Sign-Off

Once all items are checked:

- [ ] Development testing complete
- [ ] Production deployment successful
- [ ] Team trained on handling reports
- [ ] Monitoring in place
- [ ] Documentation complete

**Deployed By**: _______________  
**Date**: _______________  
**Verified By**: _______________  
**Date**: _______________  

---

**Status**: Ready for production! 🚀

