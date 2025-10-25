# Desktop Authentication - Complete Setup Guide

## Table of Contents

1. [Clerk Dashboard Configuration](#clerk-dashboard-configuration)
2. [Environment Variables](#environment-variables)
3. [Electron App Setup](#electron-app-setup)
4. [Testing](#testing)
5. [Deployment](#deployment)

---

## Clerk Dashboard Configuration

### Step 1: Create Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click "Add application"
3. Name your application (e.g., "Hintify")
4. Select your preferred authentication methods
5. Click "Create application"

### Step 2: Enable Google OAuth

1. Navigate to **User & Authentication** → **Social Connections**
2. Click on **Google**
3. Toggle "Enable for sign-up and sign-in"
4. Configure OAuth consent screen:
   - Application name: "Hintify"
   - Support email: your-email@example.com
   - Authorized domains: `hintify.nexus-v.tech`
5. Save changes

### Step 3: Configure Redirect URLs

1. Go to **Paths** in Clerk Dashboard
2. Add the following redirect URLs:
   - `https://hintify.nexus-v.tech/auth/desktop`
   - `http://localhost:3000/auth/desktop` (for development)
3. Save changes

### Step 4: Get API Keys

1. Go to **API Keys** in Clerk Dashboard
2. Copy your **Publishable Key** (starts with `pk_`)
3. Copy your **Secret Key** (starts with `sk_`)
4. Store these securely - you'll need them for environment variables

---

## Environment Variables

### Web App (.env.local)

Create or update `.env.local` in your Next.js project root:

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://hintify.nexus-v.tech

# Custom URI Scheme (for documentation)
NEXT_PUBLIC_APP_URL=hintify://auth
```

**Where to find these values**:

1. **Clerk Publishable Key**:
   - Clerk Dashboard → API Keys → Publishable Key
   - Safe to expose in client-side code

2. **Clerk Secret Key**:
   - Clerk Dashboard → API Keys → Secret Key
   - **NEVER expose to client** - server-side only

3. **Site URL**:
   - Your production domain
   - Use `http://localhost:3000` for development

### Electron App Configuration

Create `config.ts` in your Electron app:

```typescript
export const config = {
  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || 'pk_test_your_key_here',
  webAppUrl: process.env.WEB_APP_URL || 'https://hintify.nexus-v.tech',
  customScheme: 'hintify'
}
```

---

## Electron App Setup

### Step 1: Install Dependencies

```bash
npm install @clerk/clerk-js electron-store
```

### Step 2: Register Custom URI Scheme

**File**: `electron/main.ts`

```typescript
import { app, protocol, shell, BrowserWindow } from 'electron'
import path from 'path'

const PROTOCOL = 'hintify'

// Set as default protocol client
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
      path.resolve(process.argv[1])
    ])
  }
} else {
  app.setAsDefaultProtocolClient(PROTOCOL)
}

// Handle protocol on macOS
app.on('open-url', (event, url) => {
  event.preventDefault()
  if (mainWindow) {
    handleAuthCallback(url)
  }
})

// Handle protocol on Windows/Linux
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      
      const url = commandLine.find(arg => arg.startsWith('hintify://'))
      if (url) {
        handleAuthCallback(url)
      }
    }
  })
}
```

### Step 3: Implement Authentication Module

**File**: `electron/auth.ts`

```typescript
import { shell } from 'electron'
import Store from 'electron-store'
import Clerk from '@clerk/clerk-js'
import { config } from './config'

// Secure storage for tokens
const store = new Store({
  encryptionKey: 'your-secure-encryption-key-here', // Generate a secure key
  name: 'hintify-auth'
})

// Initialize Clerk
const clerk = new Clerk(config.clerkPublishableKey)

/**
 * Start authentication flow
 * Opens browser with state parameter for CSRF protection
 */
export async function startAuth() {
  try {
    // Generate UUID for CSRF protection
    const state = crypto.randomUUID()
    store.set('auth_state', state)
    
    // Construct auth URL
    const authUrl = `${config.webAppUrl}/auth/desktop?state=${state}`
    
    console.log('🔐 Opening browser for authentication...')
    await shell.openExternal(authUrl)
    
    return { success: true }
  } catch (error) {
    console.error('Failed to start auth:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Handle authentication callback from custom URI scheme
 */
export async function handleAuthCallback(url: string) {
  try {
    const urlObj = new URL(url)
    const token = urlObj.searchParams.get('token')
    const state = urlObj.searchParams.get('state')
    const userJson = urlObj.searchParams.get('user')
    
    // Validate state parameter (CSRF protection)
    const storedState = store.get('auth_state')
    if (state !== storedState) {
      throw new Error('Invalid state parameter - possible CSRF attack')
    }
    
    // Clear stored state
    store.delete('auth_state')
    
    if (!token) {
      throw new Error('No token received from authentication')
    }
    
    // Parse user data
    const user = userJson ? JSON.parse(userJson) : null
    
    // Store token and user data securely
    store.set('clerk_token', token)
    store.set('user', user)
    
    // Initialize Clerk session
    await clerk.setSession({ token })
    
    console.log('✅ Authentication successful!', user?.email)
    
    return { success: true, user, token }
  } catch (error) {
    console.error('❌ Authentication callback failed:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get current authenticated user
 */
export function getCurrentUser() {
  return store.get('user')
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!store.get('clerk_token')
}

/**
 * Sign out current user
 */
export async function signOut() {
  try {
    store.delete('clerk_token')
    store.delete('user')
    await clerk.signOut()
    console.log('👋 Signed out successfully')
    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get stored token
 */
export function getToken(): string | null {
  return store.get('clerk_token')
}
```

### Step 4: Add IPC Handlers

**File**: `electron/main.ts` (add to existing file)

```typescript
import { ipcMain } from 'electron'
import * as auth from './auth'

// Register IPC handlers
ipcMain.handle('start-auth', auth.startAuth)
ipcMain.handle('sign-out', auth.signOut)
ipcMain.handle('get-current-user', auth.getCurrentUser)
ipcMain.handle('is-authenticated', auth.isAuthenticated)
ipcMain.handle('get-token', auth.getToken)

// Handle auth callback
function handleAuthCallback(url: string) {
  auth.handleAuthCallback(url).then(result => {
    if (mainWindow) {
      if (result.success) {
        mainWindow.webContents.send('auth-success', result)
      } else {
        mainWindow.webContents.send('auth-error', result.error)
      }
    }
  })
}
```

### Step 5: Create Preload Script

**File**: `electron/preload.ts`

```typescript
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  // Auth methods
  startAuth: () => ipcRenderer.invoke('start-auth'),
  signOut: () => ipcRenderer.invoke('sign-out'),
  getCurrentUser: () => ipcRenderer.invoke('get-current-user'),
  isAuthenticated: () => ipcRenderer.invoke('is-authenticated'),
  getToken: () => ipcRenderer.invoke('get-token'),
  
  // Event listeners
  onAuthSuccess: (callback: (data: any) => void) => {
    ipcRenderer.on('auth-success', (_, data) => callback(data))
  },
  onAuthError: (callback: (error: string) => void) => {
    ipcRenderer.on('auth-error', (_, error) => callback(error))
  },
})
```

---

## Testing

### Development Testing

1. **Start Web App**:
   ```bash
   cd web-app
   npm run dev
   ```

2. **Start Electron App**:
   ```bash
   cd electron-app
   npm run dev
   ```

3. **Test Authentication**:
   - Click "Sign In" in Electron app
   - Browser opens to `/auth/desktop?state=...`
   - Sign in with Google
   - Desktop app receives callback
   - User is authenticated

### Production Testing

1. Build and package Electron app
2. Install on target OS
3. Test custom URI scheme registration
4. Verify authentication flow works end-to-end

---

## Deployment

### Web App Deployment

1. Deploy Next.js app to Vercel/Netlify
2. Update Clerk redirect URLs with production domain
3. Update environment variables in hosting platform

### Electron App Deployment

1. Build Electron app for target platforms
2. Code sign the application
3. Create installers (DMG, EXE, AppImage)
4. Distribute to users

---

## Security Checklist

- [ ] Clerk secret key is never exposed to client
- [ ] State parameter is validated on callback
- [ ] Tokens are stored in encrypted electron-store
- [ ] Custom URI scheme is registered correctly
- [ ] HTTPS is used for all web communication
- [ ] OAuth redirect URLs are whitelisted in Clerk

---

## Troubleshooting

See [DESKTOP_AUTH_README.md](./DESKTOP_AUTH_README.md) for common issues and solutions.

