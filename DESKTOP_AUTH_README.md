# Desktop Authentication with Clerk - Complete Guide

## 📚 Overview

This guide explains how to implement secure desktop-to-web authentication for your Hintify Electron application using **Clerk** as the authentication provider.

### What's Implemented

✅ **Web Authentication Page** (`/auth/desktop`)  
✅ **API Endpoint** (`/api/auth/desktop-token`)  
✅ **Clerk OAuth Integration** (Google)  
✅ **CSRF Protection** via state parameter  
✅ **Custom URI Scheme** callback (`hintify://auth/callback`)  
✅ **JWT Token Management**  
✅ **Comprehensive Security**  

---

## 🎯 Quick Links

- **[Quick Start Guide](./DESKTOP_AUTH_QUICKSTART.md)** - Get started in 15 minutes
- **[Setup Instructions](./DESKTOP_AUTH_SETUP.md)** - Detailed configuration
- **[Security Documentation](./DESKTOP_AUTH_SECURITY.md)** - Security architecture
- **[Implementation Summary](./DESKTOP_AUTH_IMPLEMENTATION.md)** - Technical details

---

## 🔐 Authentication Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────────┐
│   Desktop   │      │  Web Browser │      │    Clerk    │      │   Desktop    │
│     App     │─────▶│   /auth/     │─────▶│    OAuth    │─────▶│     App      │
│             │      │   desktop    │      │   (Google)  │      │  (Callback)  │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────────┘
      │                     │                      │                     │
      │ 1. Generate UUID    │                      │                     │
      │    (state param)    │                      │                     │
      │                     │                      │                     │
      │ 2. Open browser     │                      │                     │
      │    with state       │                      │                     │
      │                     │                      │                     │
      │                     │ 3. Validate state    │                     │
      │                     │    Redirect to OAuth │                     │
      │                     │                      │                     │
      │                     │                      │ 4. User signs in    │
      │                     │                      │    with Google      │
      │                     │                      │                     │
      │                     │ 5. Get JWT token     │                     │
      │                     │    from Clerk        │                     │
      │                     │                      │                     │
      │                     │ 6. Redirect to       │                     │
      │                     │    hintify://auth/   │                     │
      │                     │    callback          │                     │
      │                     │                      │                     │
      │                     │                      │ 7. Validate state   │
      │                     │                      │    Store token      │
      │                     │                      │    Authenticate     │
```

---

## 🚀 Key Features

### 1. **CSRF Protection**
- Desktop app generates unique UUID state parameter
- State is validated throughout the OAuth flow
- Prevents unauthorized authentication requests

### 2. **Clerk OAuth Integration**
- Seamless Google sign-in
- Automatic PKCE handling
- Secure token management

### 3. **JWT Tokens**
- Short-lived access tokens (1 hour)
- Automatic token refresh
- Secure server-side generation

### 4. **Custom URI Scheme**
- OS-level app registration (`hintify://`)
- Secure token delivery
- No browser history exposure

---

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Clerk Account** - [Sign up at clerk.com](https://clerk.com)
2. **Clerk Application** - Created in Clerk Dashboard
3. **Google OAuth** - Enabled in Clerk
4. **Environment Variables** - Clerk keys configured
5. **Electron App** - With custom URI scheme support

---

## 🛠️ Quick Setup

### 1. Configure Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **OAuth** settings
4. Enable **Google** provider
5. Add redirect URL: `https://hintify.nexus-v.tech/auth/desktop`

### 2. Update Environment Variables

```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
NEXT_PUBLIC_SITE_URL=https://hintify.nexus-v.tech
NEXT_PUBLIC_APP_URL=hintify://auth
```

### 3. Implement Electron App

See [DESKTOP_AUTH_SETUP.md](./DESKTOP_AUTH_SETUP.md) for detailed Electron implementation.

---

## 🔒 Security Features

### ✅ Implemented

- **CSRF Protection** - UUID state parameter validation
- **PKCE** - Proof Key for Code Exchange (handled by Clerk)
- **Short-lived Tokens** - 1-hour JWT expiration
- **Secure Token Storage** - Encrypted electron-store
- **Custom URI Scheme** - OS-level app protection
- **Server-side Token Generation** - Never exposed to client

### 📖 Learn More

Read [DESKTOP_AUTH_SECURITY.md](./DESKTOP_AUTH_SECURITY.md) for comprehensive security documentation.

---

## 📁 File Structure

```
app/
├── auth/
│   └── desktop/
│       └── page.tsx          # Desktop auth page
├── api/
│   └── auth/
│       └── desktop-token/
│           └── route.ts      # Token API endpoint
├── layout.tsx                # ClerkProvider wrapper
└── sign-in/
    └── page.tsx              # Clerk sign-in page

components/
└── auth/
    ├── AuthProvider.tsx      # Clerk auth context
    └── UserButton.tsx        # User dropdown

lib/
└── clerk.ts                  # Clerk helper functions

middleware.ts                 # Clerk middleware
```

---

## 🧪 Testing

### Test the Flow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Web Authentication**
   - Visit: `http://localhost:3000/auth/desktop?state=550e8400-e29b-41d4-a716-446655440000`
   - Should redirect to Clerk OAuth
   - After sign-in, should redirect to `hintify://auth/callback`

3. **Test Desktop App**
   - Implement Electron app following [DESKTOP_AUTH_SETUP.md](./DESKTOP_AUTH_SETUP.md)
   - Click "Sign In" in desktop app
   - Verify browser opens and authentication completes
   - Verify desktop app receives callback with token

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Missing state parameter" error  
**Solution**: Ensure desktop app generates and passes UUID state parameter

**Issue**: Clerk OAuth not working  
**Solution**: Verify Google OAuth is enabled in Clerk Dashboard

**Issue**: Custom URI scheme not working  
**Solution**: Ensure Electron app is registered as default protocol client

**Issue**: Token validation fails  
**Solution**: Check Clerk secret key is correctly configured

---

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Electron Protocol Handlers](https://www.electronjs.org/docs/latest/api/protocol)
- [OAuth 2.0 Specification](https://oauth.net/2/)

---

## 🆘 Support

If you encounter issues:

1. Check [DESKTOP_AUTH_SETUP.md](./DESKTOP_AUTH_SETUP.md) for configuration
2. Review [DESKTOP_AUTH_SECURITY.md](./DESKTOP_AUTH_SECURITY.md) for security
3. See [DESKTOP_AUTH_IMPLEMENTATION.md](./DESKTOP_AUTH_IMPLEMENTATION.md) for technical details
4. Open an issue on GitHub

---

## ✅ Next Steps

1. ✅ Read [Quick Start Guide](./DESKTOP_AUTH_QUICKSTART.md)
2. ✅ Configure Clerk Dashboard
3. ✅ Update environment variables
4. ✅ Implement Electron app
5. ✅ Test authentication flow
6. ✅ Deploy to production

---

**Happy Coding!** 🚀

