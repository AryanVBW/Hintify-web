# Desktop Authentication - Quick Start Guide (15 Minutes)

Get your Hintify desktop app authenticating with Clerk in just 15 minutes!

---

## ⏱️ Time Breakdown

- **Step 1**: Clerk Dashboard Setup (3 minutes)
- **Step 2**: Environment Variables (2 minutes)
- **Step 3**: Electron App Implementation (10 minutes)

---

## 📋 Prerequisites

- ✅ Clerk account ([sign up here](https://clerk.com))
- ✅ Clerk application created
- ✅ Node.js and npm installed
- ✅ Electron app project set up

---

## Step 1: Clerk Dashboard Setup (3 minutes)

### 1.1 Enable Google OAuth

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **User & Authentication** → **Social Connections**
4. Enable **Google**
5. Configure OAuth consent screen if needed

### 1.2 Add Redirect URL

1. Go to **Paths** in Clerk Dashboard
2. Add redirect URL: `https://hintify.nexus-v.tech/auth/desktop`
3. Save changes

✅ **Checkpoint**: Clerk is configured for OAuth

---

## Step 2: Update Environment Variables (2 minutes)

### 2.1 Web App Environment Variables

Update `.env.local` in your Next.js project:

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bmF0aXZlLWNhdGZpc2gtMTEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_sbOOT8l7DU43aicei5cMuf0NrSAipgCAG9U90413Qk

# Website Configuration
NEXT_PUBLIC_SITE_URL=https://hintify.nexus-v.tech
NEXT_PUBLIC_APP_URL=hintify://auth
```

### 2.2 Electron App Configuration

Create `config.ts` in your Electron app:

```typescript
export const config = {
  clerkPublishableKey: 'pk_test_bmF0aXZlLWNhdGZpc2gtMTEuY2xlcmsuYWNjb3VudHMuZGV2JA',
  webAppUrl: 'https://hintify.nexus-v.tech'
}
```

✅ **Checkpoint**: Environment variables are configured

---

## Step 3: Electron App Implementation (10 minutes)

### 3.1 Install Dependencies

```bash
npm install @clerk/clerk-js electron-store
```

### 3.2 Register Custom URI Scheme

**File**: `electron/main.js` or `src/main/index.ts`

```typescript
import { app, protocol, BrowserWindow } from 'electron'

const PROTOCOL = 'hintify'

// Register protocol
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
  handleAuthCallback(url)
})

// Handle protocol on Windows/Linux
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine) => {
    const url = commandLine.find(arg => arg.startsWith('hintify://'))
    if (url) {
      handleAuthCallback(url)
    }
  })
}
```

### 3.3 Implement Authentication Flow

**File**: `electron/auth.ts`

```typescript
import { shell } from 'electron'
import Store from 'electron-store'
import Clerk from '@clerk/clerk-js'

// Secure storage
const store = new Store({
  encryptionKey: 'your-encryption-key-here',
  name: 'hintify-auth'
})

// Initialize Clerk
const clerk = new Clerk('pk_test_bmF0aXZlLWNhdGZpc2gtMTEuY2xlcmsuYWNjb3VudHMuZGV2JA')

// Start authentication
export async function startAuth() {
  // Generate state parameter for CSRF protection
  const state = crypto.randomUUID()
  store.set('auth_state', state)
  
  // Open browser with state parameter
  const authUrl = `https://hintify.nexus-v.tech/auth/desktop?state=${state}`
  shell.openExternal(authUrl)
  
  console.log('🔐 Opening browser for authentication...')
}

// Handle auth callback
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
      throw new Error('No token received')
    }
    
    // Parse user data
    const user = JSON.parse(userJson || '{}')
    
    // Store token securely
    store.set('clerk_token', token)
    store.set('user', user)
    
    // Initialize Clerk session
    await clerk.setSession({ token })
    
    console.log('✅ Authentication successful!', user.email)
    
    // Notify renderer process
    mainWindow?.webContents.send('auth-success', { user, token })
    
    return { success: true, user }
  } catch (error) {
    console.error('❌ Authentication failed:', error)
    mainWindow?.webContents.send('auth-error', error.message)
    return { success: false, error: error.message }
  }
}

// Get current user
export function getCurrentUser() {
  return store.get('user')
}

// Check if authenticated
export function isAuthenticated() {
  return !!store.get('clerk_token')
}

// Sign out
export async function signOut() {
  store.delete('clerk_token')
  store.delete('user')
  await clerk.signOut()
  console.log('👋 Signed out')
}
```

### 3.4 Add UI Button

**File**: `renderer/App.tsx` or `src/renderer/App.tsx`

```typescript
import { ipcRenderer } from 'electron'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Listen for auth events
    ipcRenderer.on('auth-success', (event, data) => {
      setUser(data.user)
      setLoading(false)
    })

    ipcRenderer.on('auth-error', (event, error) => {
      console.error('Auth error:', error)
      setLoading(false)
    })

    // Check if already authenticated
    ipcRenderer.invoke('is-authenticated').then(isAuth => {
      if (isAuth) {
        ipcRenderer.invoke('get-current-user').then(setUser)
      }
    })
  }, [])

  const handleSignIn = () => {
    setLoading(true)
    ipcRenderer.invoke('start-auth')
  }

  const handleSignOut = () => {
    ipcRenderer.invoke('sign-out')
    setUser(null)
  }

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <p>{user.email}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Hintify</h1>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In with Google'}
      </button>
    </div>
  )
}
```

### 3.5 Expose IPC Handlers

**File**: `electron/preload.js`

```typescript
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  startAuth: () => ipcRenderer.invoke('start-auth'),
  signOut: () => ipcRenderer.invoke('sign-out'),
  getCurrentUser: () => ipcRenderer.invoke('get-current-user'),
  isAuthenticated: () => ipcRenderer.invoke('is-authenticated'),
  onAuthSuccess: (callback) => ipcRenderer.on('auth-success', callback),
  onAuthError: (callback) => ipcRenderer.on('auth-error', callback),
})
```

**File**: `electron/main.js` (add IPC handlers)

```typescript
import { ipcMain } from 'electron'
import { startAuth, signOut, getCurrentUser, isAuthenticated } from './auth'

ipcMain.handle('start-auth', startAuth)
ipcMain.handle('sign-out', signOut)
ipcMain.handle('get-current-user', getCurrentUser)
ipcMain.handle('is-authenticated', isAuthenticated)
```

✅ **Checkpoint**: Electron app is ready!

---

## 🧪 Test the Integration

### 1. Start Web App

```bash
cd web-app
npm run dev
```

### 2. Start Electron App

```bash
cd electron-app
npm run dev
```

### 3. Test Authentication

1. Click "Sign In" in Electron app
2. Browser should open to `/auth/desktop?state=...`
3. Sign in with Google
4. Desktop app should receive callback
5. User should be authenticated

---

## ✅ Success Checklist

- [ ] Clerk Dashboard configured
- [ ] Google OAuth enabled
- [ ] Redirect URL added
- [ ] Environment variables set
- [ ] Electron dependencies installed
- [ ] Custom URI scheme registered
- [ ] Auth flow implemented
- [ ] UI button added
- [ ] IPC handlers exposed
- [ ] Authentication tested successfully

---

## 🎉 You're Done!

Your desktop app now has secure authentication with Clerk!

### Next Steps

- Read [DESKTOP_AUTH_SECURITY.md](./DESKTOP_AUTH_SECURITY.md) for security best practices
- See [DESKTOP_AUTH_SETUP.md](./DESKTOP_AUTH_SETUP.md) for advanced configuration
- Review [DESKTOP_AUTH_IMPLEMENTATION.md](./DESKTOP_AUTH_IMPLEMENTATION.md) for technical details

---

## 🐛 Troubleshooting

**Browser doesn't open?**  
→ Check `shell.openExternal()` permissions

**Callback not received?**  
→ Verify custom URI scheme registration

**State validation fails?**  
→ Ensure state is stored before opening browser

**Token invalid?**  
→ Check Clerk secret key in environment variables

---

**Need Help?** Check the [main README](./DESKTOP_AUTH_README.md) or open an issue!

