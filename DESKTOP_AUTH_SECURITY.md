# Desktop Authentication - Security Architecture

## Overview

This document details the security architecture of the Hintify desktop authentication system using Clerk.

---

## Security Layers

### 1. CSRF Protection via State Parameter

**Implementation**:
- Desktop app generates UUID before initiating auth
- State is passed through entire OAuth flow
- State is validated on callback

**Code Example**:
```typescript
// Desktop app - Generate state
const state = crypto.randomUUID()
store.set('auth_state', state)

// Desktop app - Validate state on callback
const storedState = store.get('auth_state')
if (state !== storedState) {
  throw new Error('Invalid state - possible CSRF attack')
}
```

**Protection Against**:
- Cross-Site Request Forgery (CSRF)
- Unauthorized authentication attempts
- Session fixation attacks

---

### 2. PKCE (Proof Key for Code Exchange)

**Implementation**:
- Handled automatically by Clerk
- Code challenge and verifier managed internally
- No manual implementation required

**Protection Against**:
- Authorization code interception
- Man-in-the-middle attacks
- Code injection attacks

---

### 3. Short-lived JWT Tokens

**Implementation**:
- Clerk issues JWT tokens with 1-hour expiration
- Tokens are automatically refreshed
- Server-side validation on every request

**Token Lifecycle**:
```
Issue → Use → Expire → Refresh → Reissue
 (0m)   (0-60m)  (60m)   (60m)    (60m+)
```

**Protection Against**:
- Token theft and replay attacks
- Long-term credential exposure
- Unauthorized access after logout

---

### 4. Custom URI Scheme Security

**Implementation**:
- OS-level app registration (`hintify://`)
- Only registered app can intercept scheme
- Token passed via URL parameters

**Protection Against**:
- Unauthorized app interception
- Browser history exposure
- Cross-app token theft

---

### 5. Encrypted Token Storage

**Implementation**:
```typescript
const store = new Store({
  encryptionKey: 'your-secure-key',
  name: 'hintify-auth'
})
```

**Protection Against**:
- Local file access attacks
- Token extraction from disk
- Unauthorized credential access

---

## Threat Model

### Threats Mitigated

| Threat | Mitigation | Severity |
|--------|-----------|----------|
| CSRF Attack | State parameter validation | High |
| Token Interception | PKCE + HTTPS | High |
| Token Theft | Short-lived tokens + encryption | Medium |
| Replay Attack | Token expiration + nonce | Medium |
| Man-in-the-Middle | HTTPS + certificate pinning | High |
| Session Fixation | State parameter + new session | Medium |

### Residual Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Compromised Device | High | Low | User education, device security |
| Phishing | High | Medium | User awareness, domain verification |
| Malware | High | Low | Antivirus, OS security |

---

## Best Practices

### For Web App

1. **Never expose Clerk secret key to client**
   ```typescript
   // ❌ WRONG - Don't do this
   const clerk = new Clerk(process.env.CLERK_SECRET_KEY)
   
   // ✅ CORRECT - Use server-side only
   import { auth } from '@clerk/nextjs/server'
   ```

2. **Always validate state parameter**
   ```typescript
   const state = searchParams.get('state')
   if (!state || !isValidUUID(state)) {
     throw new Error('Invalid state parameter')
   }
   ```

3. **Use HTTPS in production**
   ```typescript
   if (process.env.NODE_ENV === 'production' && !req.secure) {
     return res.redirect('https://' + req.headers.host + req.url)
   }
   ```

### For Electron App

1. **Encrypt stored tokens**
   ```typescript
   const store = new Store({
     encryptionKey: crypto.randomBytes(32).toString('hex')
   })
   ```

2. **Validate callback URLs**
   ```typescript
   function handleAuthCallback(url: string) {
     if (!url.startsWith('hintify://auth/callback')) {
       throw new Error('Invalid callback URL')
     }
   }
   ```

3. **Clear sensitive data on logout**
   ```typescript
   export async function signOut() {
     store.delete('clerk_token')
     store.delete('user')
     store.delete('auth_state')
     await clerk.signOut()
   }
   ```

---

## Security Checklist

### Pre-Deployment

- [ ] Clerk secret key is in environment variables (not hardcoded)
- [ ] State parameter validation is implemented
- [ ] Tokens are stored in encrypted electron-store
- [ ] Custom URI scheme is registered correctly
- [ ] HTTPS is enforced in production
- [ ] OAuth redirect URLs are whitelisted in Clerk
- [ ] Error messages don't leak sensitive information
- [ ] Logging doesn't include tokens or secrets

### Post-Deployment

- [ ] Monitor authentication logs for anomalies
- [ ] Implement rate limiting on auth endpoints
- [ ] Set up alerts for failed authentication attempts
- [ ] Regularly rotate encryption keys
- [ ] Keep Clerk SDK updated
- [ ] Review and update security policies

---

## Compliance

### GDPR Compliance

- User data is processed with consent
- Users can request data deletion
- Data is stored securely with encryption
- Privacy policy is clearly communicated

### SOC 2 Compliance

- Access controls are implemented
- Audit logs are maintained
- Security monitoring is active
- Incident response plan is in place

---

## Incident Response

### If Token is Compromised

1. **Immediate Actions**:
   - Revoke compromised token in Clerk Dashboard
   - Force user to re-authenticate
   - Investigate source of compromise

2. **Follow-up Actions**:
   - Review security logs
   - Update security measures
   - Notify affected users if required
   - Document incident for future reference

### If State Parameter is Bypassed

1. **Immediate Actions**:
   - Block suspicious authentication attempts
   - Review state validation logic
   - Check for CSRF vulnerabilities

2. **Follow-up Actions**:
   - Strengthen state validation
   - Add additional security layers
   - Conduct security audit

---

## Security Updates

### Keeping Dependencies Secure

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Update Clerk SDK
npm install @clerk/nextjs@latest @clerk/clerk-js@latest
```

### Monitoring Security Advisories

- Subscribe to Clerk security advisories
- Monitor GitHub security alerts
- Follow Electron security updates
- Review CVE databases regularly

---

## Additional Resources

- [Clerk Security Documentation](https://clerk.com/docs/security)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/rfc6819)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Electron Security Guidelines](https://www.electronjs.org/docs/latest/tutorial/security)

---

## Contact

For security concerns or to report vulnerabilities:
- Email: security@hintify.com
- Responsible disclosure policy: [Link to policy]

