# Philippine Eagles Video Conference Platform 🦅

Secure video conferencing platform for **The Fraternal Order of Eagles - Philippine Eagles 1979**

**Ang Malayang Agila • Humanitarian Service • Deo Et Patria**

## ✨ Features / Mga Features

- 🎥 **Unlimited Participants** - 100+ participants supported
- 🖥️ **Screen Sharing** - Share presentations, documents, or your screen
- 💬 **Live Chat** - Real-time messaging during calls
- 🎙️ **HD Audio/Video** - Crystal clear quality
- 📱 **Progressive Web App** - Install on mobile and desktop
- 🔒 **Secure** - End-to-end encrypted
- 🆓 **Free** - No time limits, completely free
- 🌐 **WebRTC Technology** - Powered by Jitsi Meet
- 📊 **Recording** - Record meetings (host only)
- ✋ **Raise Hand** - Interactive participant features
- 🎨 **Virtual Backgrounds** - Customize your background
- 📋 **Meeting History** - Track meetings in Firebase

## 🚀 Quick Start / Pagsugod

### Prerequisites
- Node.js 18+ installed
- Firebase account (free tier)
- Git installed

### Installation / Pag-install

1. **Clone the repository**
\`\`\`bash
git clone <your-repo-url>
cd eagles-conference
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Setup Firebase**

   a. Go to [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project or select existing
   
   c. Enable Firestore Database:
      - Go to Firestore Database
      - Click "Create Database"
      - Start in **test mode** (for development)
      - Choose your region
   
   d. Get your Firebase config:
      - Go to Project Settings ⚙️
      - Scroll down to "Your apps"
      - Click Web icon `</>`
      - Copy the configuration

4. **Configure environment variables**
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` and add your Firebase credentials:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

5. **Run development server**
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment to Vercel

1. **Push to GitHub**
\`\`\`bash
git init
git add .
git commit -m "Initial commit - Eagles Conference Platform"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

2. **Deploy to Vercel**

   a. Go to [Vercel](https://vercel.com)
   
   b. Click "Add New Project"
   
   c. Import your GitHub repository
   
   d. Add Environment Variables in Vercel:
      - Go to Settings > Environment Variables
      - Add all variables from `.env.local`
   
   e. Click "Deploy"

3. **Your app will be live at**: `https://your-app.vercel.app`

## 📱 PWA Installation / Pag-install sa Mobile/Desktop

### Mobile (Android/iOS)
1. Open the app in your browser
2. Look for "Add to Home Screen" or "Install App" prompt
3. Click Install
4. App icon will appear on your home screen

### Desktop (Chrome/Edge)
1. Open the app in browser
2. Look for install icon (➕) in the address bar
3. Click Install
4. App will open as standalone application

## 🎯 How to Use / Unsaon Paggamit

### Creating a Meeting
1. Enter your name
2. Click "Create New Meeting"
3. You'll get a unique Meeting ID
4. Share the Meeting ID or link with participants

### Joining a Meeting
1. Enter your name
2. Enter the Meeting ID
3. Click "Join Meeting"

### During Meeting
- 🎥 Toggle camera
- 🎙️ Toggle microphone
- 🖥️ Share screen
- 💬 Open chat
- ✋ Raise hand
- ⚙️ Settings
- 📹 Record (host only)
- 🔴 Leave meeting

## 🔧 Technology Stack

- **Frontend**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Video Platform**: Jitsi Meet (WebRTC)
- **Database**: Firebase Firestore
- **Hosting**: Vercel
- **PWA**: Service Workers + Web Manifest

## 📁 Project Structure

\`\`\`
eagles-conference/
├── app/
│   ├── layout.tsx          # Main layout with PWA meta
│   ├── page.tsx            # Home page (create/join)
│   ├── room/
│   │   └── [roomId]/
│   │       └── page.tsx    # Video conference room
│   └── globals.css         # Global styles
├── lib/
│   └── firebase.ts         # Firebase configuration
├── public/
│   ├── logo.png            # Philippine Eagles logo
│   ├── manifest.json       # PWA manifest
│   ├── icon-192x192.png    # PWA icon
│   ├── icon-512x512.png    # PWA icon
│   └── favicon.ico         # Favicon
├── .env.local.example      # Environment template
└── package.json            # Dependencies

\`\`\`

## 🎨 Customization

### Change Branding
Edit the following files:
- `public/logo.png` - Your organization logo
- `public/manifest.json` - App name and description
- `app/layout.tsx` - Page title and meta tags
- `tailwind.config.js` - Brand colors

### Firebase Security Rules
For production, update Firestore rules:
\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /meetings/{meetingId} {
      allow read: if true;
      allow create: if request.auth != null || true;
      allow update, delete: if false;
    }
  }
}
\`\`\`

## 🐛 Troubleshooting

### "Firebase not configured" error
- Make sure `.env.local` exists with correct values
- Restart the development server after adding env vars

### Video not working
- Allow camera/microphone permissions in browser
- Check if another app is using the camera
- Try a different browser (Chrome/Edge recommended)

### PWA not installing
- Must be served over HTTPS (Vercel provides this)
- Clear browser cache and try again
- Check if browser supports PWA

## 📞 Support

For issues or questions:
- Contact: Philippine Eagles 1979
- Developer: **Godmisoft**

## 📄 License

Built for The Fraternal Order of Eagles - Philippine Eagles 1979

---

**Developed with ❤️ by Godmisoft**

*Ang Malayang Agila • Humanitarian Service • Deo Et Patria*
