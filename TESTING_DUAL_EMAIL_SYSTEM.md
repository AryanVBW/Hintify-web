# Testing the Dual Email System

Complete guide for testing both the support team email and user confirmation email.

---

## 🎯 What to Test

When a user submits an issue report, **TWO emails** should be sent:

1. **Support Team Email** → Goes to `SUPPORT_EMAIL`
2. **User Confirmation Email** → Goes to the user's email address

---

## 🚀 Quick Test

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Navigate to Report Issue Page
```
http://localhost:3000/report-issue
```

### Step 3: Fill Out Form
```
Issue Type: Bug Report
Name: Test User
Email: your-test-email@example.com
Description: This is a test submission to verify both emails are sent correctly.
Screenshots: Upload 1-2 test images (optional)
```

### Step 4: Submit Form
- Click "Submit Report"
- Wait for success page
- Check both email inboxes

### Step 5: Verify Emails

**Check Support Email Inbox** (SUPPORT_EMAIL):
```
✓ Subject: [Bug Report] New Issue Report from Test User
✓ Has all form details
✓ Has screenshot attachments (if uploaded)
✓ Reply-to is set to user's email
```

**Check User Email Inbox** (your-test-email@example.com):
```
✓ Subject: Thank you for your Bug Report - Hintify
✓ Beautiful black & yellow design
✓ Has summary of submission
✓ No attachments
✓ Professional and reassuring tone
```

---

## 📋 Detailed Test Cases

### Test Case 1: Basic Submission (No Screenshots)

**Input:**
```
Issue Type: Bug Report
Name: John Doe
Email: john@example.com
Description: The app crashes when I click the hint button.
Screenshots: None
```

**Expected Results:**

**Support Email:**
- ✅ Received at SUPPORT_EMAIL
- ✅ Subject: `[Bug Report] New Issue Report from John Doe`
- ✅ Contains all form data
- ✅ No attachments
- ✅ Reply-to: john@example.com

**User Confirmation:**
- ✅ Received at john@example.com
- ✅ Subject: `Thank you for your Bug Report - Hintify`
- ✅ Black background with yellow accents
- ✅ Shows issue type: Bug Report
- ✅ Shows description
- ✅ No mention of attachments
- ✅ Shows expected response time

---

### Test Case 2: Submission with Screenshots

**Input:**
```
Issue Type: Feature Request
Name: Jane Smith
Email: jane@example.com
Description: Please add dark mode to the settings page.
Screenshots: 2 images uploaded
```

**Expected Results:**

**Support Email:**
- ✅ Received at SUPPORT_EMAIL
- ✅ Subject: `[Feature Request] New Issue Report from Jane Smith`
- ✅ Contains all form data
- ✅ Has 2 screenshot attachments
- ✅ Reply-to: jane@example.com

**User Confirmation:**
- ✅ Received at jane@example.com
- ✅ Subject: `Thank you for your Feature Request - Hintify`
- ✅ Shows issue type: Feature Request
- ✅ Shows description
- ✅ Shows "📎 2 screenshots included"
- ✅ No actual attachments

---

### Test Case 3: All Issue Types

Test each issue type to verify subject lines:

| Issue Type | Support Subject | User Subject |
|------------|----------------|--------------|
| Bug Report | `[Bug Report] New Issue Report from...` | `Thank you for your Bug Report - Hintify` |
| Feature Request | `[Feature Request] New Issue Report from...` | `Thank you for your Feature Request - Hintify` |
| Performance Issue | `[Performance Issue] New Issue Report from...` | `Thank you for your Performance Issue - Hintify` |
| UI/UX Issue | `[UI/UX Issue] New Issue Report from...` | `Thank you for your UI/UX Issue - Hintify` |
| Security Concern | `[Security Concern] New Issue Report from...` | `Thank you for your Security Concern - Hintify` |
| Other | `[Other] New Issue Report from...` | `Thank you for your Other - Hintify` |

---

### Test Case 4: Long Description

**Input:**
```
Issue Type: Bug Report
Name: Bob Johnson
Email: bob@example.com
Description: [500+ character description with multiple paragraphs]
Screenshots: None
```

**Expected Results:**
- ✅ Both emails received
- ✅ Full description preserved in both emails
- ✅ Proper formatting maintained
- ✅ No truncation

---

### Test Case 5: Special Characters

**Input:**
```
Issue Type: Bug Report
Name: María García
Email: maria@example.com
Description: The app shows "Error: Can't load data" with symbols: @#$%^&*()
Screenshots: None
```

**Expected Results:**
- ✅ Both emails received
- ✅ Special characters display correctly
- ✅ Accented characters preserved
- ✅ Symbols rendered properly

---

## 📱 Email Client Testing

### Desktop Email Clients

**Gmail (Desktop)**
- [ ] Open user confirmation email
- [ ] Verify black background displays
- [ ] Verify yellow accents show correctly
- [ ] Check all sections render properly
- [ ] Test "Visit our website" link
- [ ] Verify responsive layout

**Outlook (Desktop)**
- [ ] Open user confirmation email
- [ ] Verify colors display correctly
- [ ] Check border-radius rendering
- [ ] Verify all text is readable
- [ ] Test links

**Apple Mail (macOS)**
- [ ] Open user confirmation email
- [ ] Verify all effects display
- [ ] Check gradient header
- [ ] Verify all sections render
- [ ] Test links

### Mobile Email Clients

**Gmail (Mobile)**
- [ ] Open on phone
- [ ] Verify responsive layout
- [ ] Check touch-friendly links
- [ ] Verify readability
- [ ] Test scrolling

**Apple Mail (iOS)**
- [ ] Open on iPhone/iPad
- [ ] Verify responsive design
- [ ] Check all sections
- [ ] Test links
- [ ] Verify colors

**Outlook (Mobile)**
- [ ] Open on phone
- [ ] Verify layout adapts
- [ ] Check readability
- [ ] Test links

---

## 🔍 Visual Inspection Checklist

### User Confirmation Email

**Header Section:**
- [ ] Large checkmark visible
- [ ] Yellow color (#facc15) displays correctly
- [ ] "Thank You!" heading is prominent
- [ ] Subtext is readable
- [ ] Border shows correctly

**Content Section:**
- [ ] Personal greeting shows user's name
- [ ] Body text is readable (light gray on black)
- [ ] Proper spacing between paragraphs

**Report Summary Box:**
- [ ] Yellow border visible
- [ ] Semi-transparent yellow background
- [ ] "📋 Report Summary" title in yellow
- [ ] Issue type badge is yellow with black text
- [ ] Description shows with proper formatting
- [ ] Attachment count shows (if applicable)

**Info Box:**
- [ ] Blue border visible
- [ ] Semi-transparent blue background
- [ ] "💡 What happens next?" title
- [ ] User's email address shown
- [ ] Response time mentioned (2-3 business days)

**Footer:**
- [ ] "Hintify - Get Hints, Not Answers" visible
- [ ] Timestamp shows correctly
- [ ] "Visit our website" link is yellow
- [ ] Link is clickable

---

## 🧪 Error Handling Tests

### Test Case 6: Invalid Email (Support)

**Scenario:** SUPPORT_EMAIL is invalid

**Expected:**
- ❌ Support email fails
- ❌ User sees error message
- ❌ User confirmation NOT sent
- ❌ Form submission fails

### Test Case 7: Invalid Email (User)

**Scenario:** User enters invalid email format

**Expected:**
- ❌ Form validation catches it
- ❌ Shows error: "Please enter a valid email"
- ❌ Cannot submit form

### Test Case 8: Resend API Error

**Scenario:** Resend API is down or rate limited

**Expected:**
- ❌ Support email fails
- ❌ User sees error message
- ❌ Can retry submission

---

## 📊 Performance Testing

### Test Case 9: Large Screenshots

**Input:**
```
Screenshots: 5 images, each ~4.5MB
Total: ~22.5MB
```

**Expected:**
- ✅ All images accepted
- ✅ Support email sent with attachments
- ✅ User confirmation sent (no attachments)
- ⏱️ Submission completes within 10 seconds

### Test Case 10: Multiple Submissions

**Scenario:** Submit 5 reports in quick succession

**Expected:**
- ✅ All 10 emails sent (5 support + 5 user)
- ✅ No rate limiting issues
- ✅ All emails received
- ✅ Correct order maintained

---

## 🔐 Security Testing

### Test Case 11: XSS Attempt

**Input:**
```
Description: <script>alert('XSS')</script>
```

**Expected:**
- ✅ Script tags escaped in emails
- ✅ No JavaScript execution
- ✅ Safe rendering in email clients

### Test Case 12: SQL Injection Attempt

**Input:**
```
Name: '; DROP TABLE users; --
```

**Expected:**
- ✅ Input sanitized
- ✅ Emails sent safely
- ✅ No database issues

---

## 📈 Monitoring Checklist

### After Deployment

**Week 1:**
- [ ] Monitor email delivery rate
- [ ] Check for bounce backs
- [ ] Review error logs
- [ ] Verify both emails sending consistently

**Week 2:**
- [ ] Check email open rates
- [ ] Monitor user feedback
- [ ] Review support team feedback
- [ ] Check for any issues

**Ongoing:**
- [ ] Track delivery success rate
- [ ] Monitor Resend usage/limits
- [ ] Review user satisfaction
- [ ] Check for improvements needed

---

## 🎯 Success Criteria

### Email Delivery
- ✅ 99%+ delivery rate for both emails
- ✅ < 5 second send time
- ✅ No bounces or rejections

### Email Rendering
- ✅ Correct display in all major email clients
- ✅ Mobile responsive
- ✅ All colors and styles render correctly

### User Experience
- ✅ Users receive confirmation within seconds
- ✅ Emails are professional and clear
- ✅ No confusion about what happens next

### Support Team
- ✅ All necessary information in support email
- ✅ Screenshots attached correctly
- ✅ Easy to reply to users

---

## 🐛 Common Issues & Solutions

### Issue: User confirmation not received

**Check:**
1. Verify user's email is correct
2. Check spam/junk folder
3. Review Resend logs
4. Verify RESEND_FROM_EMAIL is set

**Solution:**
```bash
# Check environment variables
echo $RESEND_FROM_EMAIL

# Review API logs
# Check Resend dashboard for delivery status
```

### Issue: Support email has no attachments

**Check:**
1. Verify screenshots were uploaded
2. Check file size limits
3. Review console logs

**Solution:**
```typescript
// Verify attachments array is populated
console.log('Attachments:', attachments.length)
```

### Issue: Emails look broken in Outlook

**Check:**
1. Verify inline CSS is used
2. Check for unsupported CSS properties
3. Test with Outlook-specific rendering

**Solution:**
- Use inline styles
- Avoid advanced CSS features
- Test in Litmus or Email on Acid

---

## 📝 Test Report Template

```markdown
# Email System Test Report

**Date:** [Date]
**Tester:** [Name]
**Environment:** [Development/Staging/Production]

## Test Results

### Support Email
- [ ] Received successfully
- [ ] Correct subject line
- [ ] All data present
- [ ] Attachments included
- [ ] Reply-to works

### User Confirmation
- [ ] Received successfully
- [ ] Correct subject line
- [ ] Beautiful design
- [ ] All sections render
- [ ] Links work

### Issues Found
1. [Issue description]
2. [Issue description]

### Recommendations
1. [Recommendation]
2. [Recommendation]

**Overall Status:** ✅ Pass / ❌ Fail
```

---

## 🚀 Pre-Production Checklist

Before going live:

- [ ] Test all issue types
- [ ] Test with and without screenshots
- [ ] Test on multiple email clients
- [ ] Test on mobile devices
- [ ] Verify environment variables set
- [ ] Check Resend API limits
- [ ] Review error handling
- [ ] Test error scenarios
- [ ] Verify email templates
- [ ] Check all links work
- [ ] Review with support team
- [ ] Get user feedback on design
- [ ] Monitor first 10 submissions
- [ ] Document any issues
- [ ] Create runbook for issues

---

## ✅ Final Verification

Run through this quick checklist:

```bash
# 1. Environment variables set
✓ RESEND_API_KEY
✓ SUPPORT_EMAIL
✓ RESEND_FROM_EMAIL

# 2. Dependencies installed
✓ resend package

# 3. Code deployed
✓ app/api/report-issue/route.ts updated

# 4. Test submission
✓ Form works
✓ Both emails sent
✓ Both emails received
✓ Both emails look correct

# 5. Production ready
✓ All tests pass
✓ No errors in logs
✓ Team approved
```

---

**Status:** Ready for testing! 🎉

Follow this guide to thoroughly test the dual email system before going live.

