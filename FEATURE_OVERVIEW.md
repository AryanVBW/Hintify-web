# Report Issue Feature - Visual Overview

## 🎨 Page Structure

```
┌─────────────────────────────────────────────────────────┐
│                      NAVBAR                              │
│  [Logo] [How It Works] [Examples] [Dashboard]           │
│         [Report Issue] [Sign In] [Get Started]          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                          │
│              📝 Report an Issue                          │
│   Help us improve Hintify by reporting bugs...          │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Issue Details                                           │
│  Please provide as much detail as possible...            │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Issue Type                                       │   │
│  │ [Select an issue type ▼]                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Description                                      │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ Please describe the issue in detail...      │ │   │
│  │ │                                              │ │   │
│  │ │                                              │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │ 0/2000 characters                                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Screenshots (Optional)                           │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │        📤                                    │ │   │
│  │ │  Click to upload screenshots                │ │   │
│  │ │  PNG, JPG up to 5MB each (max 5 files)     │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                  │   │
│  │  [Preview] [Preview] [Preview]                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Your Name                                        │   │
│  │ [John Doe                                    ]   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Email Address                                    │   │
│  │ [john@example.com                            ]   │   │
│  │ We'll use this to follow up on your report      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │          [Submit Report]                         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Form Fields Breakdown

### 1. Issue Type (Dropdown)
```
Options:
├── 🐛 Bug Report
├── ✨ Feature Request
├── ⚡ Performance Issue
├── 🎨 UI/UX Issue
├── 🔒 Security Concern
└── 📝 Other
```

**Validation**: Required field

### 2. Description (Textarea)
- **Min Length**: 10 characters
- **Max Length**: 2000 characters
- **Features**: 
  - Character counter
  - Auto-resize
  - Placeholder text

### 3. Screenshots (File Upload)
- **Max Files**: 5
- **Max Size**: 5MB per file
- **Formats**: PNG, JPG, JPEG, GIF, WebP
- **Features**:
  - Drag & drop support
  - Live preview thumbnails
  - Remove individual files
  - File name display

### 4. Name (Text Input)
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Validation**: Required

### 5. Email (Email Input)
- **Validation**: 
  - Required
  - Valid email format
  - Used as reply-to address

## 📧 Email Template Structure

```
┌─────────────────────────────────────────────────────────┐
│  🐛 New Issue Report                                     │
│  (Yellow gradient header with Hintify branding)          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ISSUE TYPE                                              │
│  [Bug Report]  ← Yellow badge                            │
│                                                          │
│  REPORTED BY                                             │
│  John Doe                                                │
│  john@example.com                                        │
│                                                          │
│  DESCRIPTION                                             │
│  The application crashes when I try to...                │
│  (Full description with preserved formatting)            │
│                                                          │
│  📎 ATTACHMENTS                                          │
│  3 screenshot(s) attached to this email                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  This issue was submitted via the Hintify Report         │
│  Issue form                                              │
│  Submitted on January 15, 2025 at 3:45 PM               │
└─────────────────────────────────────────────────────────┘
```

## ✅ Success Page

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                    ✓                                     │
│              (Large checkmark)                           │
│                                                          │
│              Thank You!                                  │
│                                                          │
│   Your issue report has been successfully submitted.    │
│   Our team will review it and get back to you soon.     │
│                                                          │
│         [Submit Another Report]                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

```css
Background:     #000000 (Black)
Primary Text:   #FFFFFF (White)
Secondary Text: #9CA3AF (Gray-400)
Accent:         #FACC15 (Yellow-400)
Borders:        rgba(255, 255, 255, 0.2)
Cards:          rgba(0, 0, 0, 0.4) with backdrop-blur
```

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Full-width form fields
- Stacked screenshot previews (2 columns)
- Hamburger menu in navbar

### Tablet (768px - 1024px)
- Optimized spacing
- 3-column screenshot grid
- Expanded navbar

### Desktop (> 1024px)
- Maximum width container (768px)
- 3-column screenshot grid
- Full navbar with all links

## 🔄 States & Interactions

### Loading State
```
┌─────────────────────────────────────────────────────────┐
│  [⟳ Submitting...]                                       │
│  (Button disabled, spinner animation)                    │
└─────────────────────────────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────────────────────────────┐
│  ⚠️ Failed to send email. Please try again later.       │
│  (Red alert box)                                         │
└─────────────────────────────────────────────────────────┘
```

### Validation Errors
```
┌─────────────────────────────────────────────────────────┐
│  Email Address                                           │
│  [invalid-email                                      ]   │
│  ❌ Please enter a valid email address                   │
└─────────────────────────────────────────────────────────┘
```

## 🎭 Animations

1. **Page Load**: Fade in with slide up
2. **Form Submit**: Button transforms to loading spinner
3. **Success**: Checkmark scales in with bounce
4. **Error**: Alert slides down from top
5. **Screenshot Upload**: Preview fades in
6. **Hover Effects**: Smooth color transitions

## 🔐 Security Features

```
Client-Side:
├── Input validation (Zod schema)
├── File type checking
├── File size limits
└── XSS protection (React)

Server-Side:
├── Request validation
├── File type verification
├── Size limit enforcement
├── Email format validation
└── Sanitized email content
```

## 📊 User Flow

```
1. User clicks "Report Issue" in navbar
   ↓
2. Lands on report issue page
   ↓
3. Fills out form fields
   ↓
4. Optionally uploads screenshots
   ↓
5. Clicks "Submit Report"
   ↓
6. Loading state shown
   ↓
7a. Success → Thank you page
   ↓
   Option to submit another report
   
7b. Error → Error message shown
   ↓
   User can retry submission
```

## 🎯 Key Features Visualization

```
┌─────────────────────────────────────────────────────────┐
│  FORM VALIDATION                                         │
│  ├── Real-time validation                                │
│  ├── Clear error messages                                │
│  └── Prevents invalid submissions                        │
├─────────────────────────────────────────────────────────┤
│  FILE UPLOAD                                             │
│  ├── Drag & drop support                                 │
│  ├── Multiple files (up to 5)                            │
│  ├── Preview thumbnails                                  │
│  ├── Size validation (5MB max)                           │
│  └── Type validation (images only)                       │
├─────────────────────────────────────────────────────────┤
│  EMAIL DELIVERY                                          │
│  ├── Professional HTML template                          │
│  ├── Screenshot attachments                              │
│  ├── Reply-to user email                                 │
│  └── Delivery via Resend                                 │
├─────────────────────────────────────────────────────────┤
│  USER EXPERIENCE                                         │
│  ├── Loading indicators                                  │
│  ├── Success confirmation                                │
│  ├── Error handling                                      │
│  └── Smooth animations                                   │
└─────────────────────────────────────────────────────────┘
```

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA)
- ✅ Semantic HTML

---

This feature provides a complete, production-ready solution for collecting user feedback with a beautiful, accessible interface that matches your app's design system.

