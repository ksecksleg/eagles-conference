# Deployment Guide / Giya sa Pag-deploy

## Paagi 1: GitHub + Vercel (RECOMMENDED)

### Step 1: I-push sa GitHub

1. **Mag-create ug GitHub account** kung wala pay (https://github.com)

2. **Mag-create ug bag-ong repository**
   - Go to github.com
   - Click "New repository"
   - Name: `eagles-conference` 
   - Public o Private (ikaw bahala)
   - Click "Create repository"

3. **I-push ang code**
\`\`\`bash
cd eagles-conference
git init
git add .
git commit -m "Initial commit - Philippine Eagles Conference"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eagles-conference.git
git push -u origin main
\`\`\`

### Step 2: Firebase Setup

1. **Pag-adto sa Firebase Console**
   - Go to https://console.firebase.google.com/
   - Click "Add project" o "Create a project"

2. **Pag-configure sa project**
   - Project name: `eagles-conference`
   - Disable Google Analytics (optional)
   - Click "Create project"

3. **I-enable ang Firestore Database**
   - Sa left sidebar, click "Firestore Database"
   - Click "Create database"
   - Select "Start in test mode"
   - Choose location: asia-southeast1 (Singapore) - closest sa Pilipinas
   - Click "Enable"

4. **Kuha-on ang Firebase Config**
   - Click sa gear icon ⚙️ > Project settings
   - Scroll down to "Your apps"
   - Click Web icon `</>`
   - App nickname: `Eagles Conference Web`
   - I-check ang "Also set up Firebase Hosting"
   - Click "Register app"
   - **I-copy ang config values** (apiKey, authDomain, etc.)

### Step 3: Deploy sa Vercel

1. **Mag-adto sa Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" using your GitHub account

2. **Import Project**
   - Click "Add New..." > "Project"
   - Select "Import Git Repository"
   - Pangita ang `eagles-conference` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   
4. **Add Environment Variables**
   Click "Environment Variables" then add:
   
   \`\`\`
   NEXT_PUBLIC_FIREBASE_API_KEY = [your_value]
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = [your_value]
   NEXT_PUBLIC_FIREBASE_PROJECT_ID = [your_value]
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = [your_value]
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = [your_value]
   NEXT_PUBLIC_FIREBASE_APP_ID = [your_value]
   \`\`\`

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! Makuha nimo ang URL: `https://eagles-conference-xxx.vercel.app`

### Step 4: Custom Domain (Optional)

Kung naa kay domain (example: eaglesconference.com):

1. Sa Vercel dashboard, go to Settings > Domains
2. Add your domain
3. I-update ang DNS records sa imong domain registrar
4. Wait 24-48 hours para ma-propagate

---

## Paagi 2: Direct Vercel CLI

Mas paspas pero mas technical:

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# I-follow ang prompts
# Select scope
# Link to existing project? No
# Project name: eagles-conference
# Directory: ./
# Override settings? No
\`\`\`

---

## Testing sa Deployment

1. Open ang URL nga gi-provide ni Vercel
2. Try mag-create ug meeting
3. Try mo-join using another device
4. Check kung working ang video/audio
5. Test ang screen sharing
6. Try i-install as PWA

---

## Updating the App / Pag-update

Kung naa kay gi-change sa code:

\`\`\`bash
git add .
git commit -m "Update: [describe changes]"
git push
\`\`\`

Vercel will automatically rebuild and deploy! ⚡

---

## Common Issues / Kasagarang Problema

### 1. "Firebase not configured"
**Solution**: Check kung na-add ba nimo ang environment variables sa Vercel

### 2. "Build failed"
**Solution**: 
- Check syntax errors
- Run `npm run build` locally first
- Check Vercel build logs

### 3. Video not loading
**Solution**:
- Jitsi Meet requires HTTPS (Vercel provides this automatically)
- Check browser permissions
- Try different browser

### 4. PWA not installing
**Solution**:
- Must be HTTPS (✓ Vercel default)
- Clear cache
- Try Chrome/Edge browser

---

## Cost / Gasto

**Total Cost: ₱0 / FREE! 🎉**

- GitHub: Free for public repos
- Firebase: Free tier (Spark Plan)
  - 50K reads/day
  - 20K writes/day
  - 1GB storage
- Vercel: Free tier (Hobby)
  - 100GB bandwidth/month
  - Unlimited deployments
- Jitsi Meet: Completely FREE
  - Unlimited participants
  - Unlimited meetings
  - No time limits

Perfect para sa communities like Philippine Eagles! 🦅

---

## Security Best Practices

1. **Firestore Rules** - Update after testing:
\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /meetings/{meetingId} {
      allow read: if true;
      allow create: if request.auth != null || true;
      allow update: if resource.data.hostName == request.auth.token.name;
      allow delete: if false;
    }
  }
}
\`\`\`

2. **Environment Variables** - Never commit `.env.local`

3. **HTTPS Only** - Vercel provides SSL automatically

---

## Need Help?

Contact Godmisoft for support! 

**Salamat ug Good luck! 🦅**
