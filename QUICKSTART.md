# Quick Start Guide - Philippine Eagles Conference Platform

## Paspas nga Pagsugod (5 Minutes Setup)

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup Firebase

**Option A: Gamit ang Test Mode (For development)**

Create `.env.local` file:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=test
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=test
\`\`\`

**Option B: Real Firebase Setup (5 minutes)**

1. Go to https://console.firebase.google.com/
2. Click "Create a project"
3. Project name: eagles-conference
4. Enable Firestore Database (test mode)
5. Get config from Project Settings
6. Copy to `.env.local`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

### 4. Test the App

1. Enter your name
2. Click "Create New Meeting"
3. Copy meeting link
4. Open in another browser/device
5. Join the meeting
6. Test video, audio, screen share

### 5. Deploy (Optional)

See DEPLOYMENT.md for detailed instructions

---

## Features to Test

✅ Create meeting
✅ Join meeting with ID
✅ Video on/off
✅ Audio on/off
✅ Screen sharing
✅ Chat
✅ Raise hand
✅ Copy meeting link
✅ Install as PWA (mobile/desktop)

---

## Need Help?

Common issues:

**Camera/Mic not working?**
- Allow permissions in browser
- Check if another app is using camera
- Use Chrome or Edge browser

**Firebase errors?**
- Check `.env.local` file exists
- Restart dev server after adding env vars
- Verify Firebase config values

**Meeting not loading?**
- Check internet connection
- Clear browser cache
- Try incognito mode

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Setup real Firebase project
- [ ] Update Firestore security rules
- [ ] Add environment variables to Vercel
- [ ] Test on multiple devices
- [ ] Test PWA installation
- [ ] Test with 10+ participants

---

**Salamat! Enjoy your Eagles Conference Platform! 🦅**

Developed by Godmisoft
