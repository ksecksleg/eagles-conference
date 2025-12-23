# Vercel Deployment Fix - Node Version Issue

## Problem
Error message:
```
Module parse failed: Unexpected token (682:63)
./node_modules/undici/lib/web/fetch/util.js
```

## Root Cause
Firebase 10+ requires Node.js 18.17.0 or higher, pero ang default ni Vercel is older version.

## ✅ SOLUTION - 3 Options

### Option 1: Update Node Version sa Vercel (RECOMMENDED)

1. **Sa Vercel Dashboard:**
   - Go to your project settings
   - Click "General"
   - Scroll to "Node.js Version"
   - Select **18.x** or **20.x**
   - Save changes
   - Redeploy

2. **Or via vercel.json** (already included in the updated files)

### Option 2: Firebase-less Deployment (Fastest)

Kung di nimo kailangan ang Firebase for now:

1. **Don't add Firebase environment variables sa Vercel**
   - Skip ang NEXT_PUBLIC_FIREBASE_* variables
   - App will work without Firebase
   - Meetings will still work perfectly
   - Just no database logging

2. **Deploy normally**
   - Everything works except meeting history
   - All Jitsi features work 100%

### Option 3: Use Different Firebase Version

Update `package.json`:
```json
"dependencies": {
  "firebase": "^9.23.0",
  ...
}
```

Then:
```bash
npm install
git add .
git commit -m "Downgrade Firebase version"
git push
```

---

## ✅ Quick Fix Steps (EASIEST)

**If naa na naka-deploy:**

1. Go to Vercel project settings
2. General > Node.js Version
3. Change to: **18.x** 
4. Click "Redeploy"

**If bag-o pa:**

1. Make sure `.nvmrc` file exists with content: `18.17.0`
2. Make sure `package.json` has:
   ```json
   "engines": {
     "node": ">=18.17.0"
   }
   ```
3. Deploy normally

---

## Alternative: Netlify Deployment

Kung di pa gihapon mo-work sa Vercel:

1. **Push to GitHub** (same process)

2. **Deploy sa Netlify:**
   - Go to https://netlify.com
   - Import from GitHub
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Add environment variables**
   - Same Firebase variables

---

## Testing Before Deploy

```bash
# Make sure Node version is correct
node --version
# Should show v18.17.0 or higher

# Clean install
rm -rf node_modules package-lock.json .next
npm install

# Test build locally
npm run build

# If successful, deploy!
git add .
git commit -m "Fix: Update Node version for Vercel"
git push
```

---

## Firebase Setup (OPTIONAL)

**Kung gusto nimo ang Firebase:**

1. **Create Firebase project**
   - https://console.firebase.google.com
   - Create project
   - Enable Firestore

2. **Add to Vercel:**
   - Settings > Environment Variables
   - Add all NEXT_PUBLIC_FIREBASE_* variables
   - Redeploy

**Kung ayaw nimo Firebase:**
- Just deploy without Firebase variables
- App works perfectly without it
- Only meeting history won't be saved

---

## Verification Checklist

After deploying, check:

- [ ] Homepage loads
- [ ] Can create meeting
- [ ] Can join meeting  
- [ ] Video works
- [ ] Audio works
- [ ] Screen sharing works
- [ ] Chat works
- [ ] PWA installable
- [ ] No console errors

---

## Current File Updates

Updated files to fix the issue:

1. ✅ `package.json` - Updated versions + Node engine
2. ✅ `.nvmrc` - Node version specification
3. ✅ `vercel.json` - Build configuration
4. ✅ `lib/firebase.ts` - Optional Firebase
5. ✅ `app/page.tsx` - Works without Firebase

---

## Summary

**The fix is simple:**
1. Set Node version to 18.x in Vercel
2. OR deploy without Firebase (still 100% functional)
3. OR downgrade Firebase to v9

**All Jitsi features work regardless!**
- Video ✅
- Audio ✅  
- Screen sharing ✅
- Chat ✅
- Recording ✅
- 100+ participants ✅

**Firebase is OPTIONAL** - only for meeting history logging.

---

Need more help? Check DEPLOYMENT.md or contact Godmisoft.

**Para sa Philippine Eagles! 🦅**
