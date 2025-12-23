'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [meetingId, setMeetingId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const createMeeting = async () => {
    if (!displayName.trim()) {
      alert('Please enter your name');
      return;
    }

    setLoading(true);
    try {
      const newMeetingId = uuidv4().slice(0, 8).toUpperCase();
      
      // Save meeting to Firebase if configured
      if (db) {
        try {
          await addDoc(collection(db, 'meetings'), {
            meetingId: newMeetingId,
            hostName: displayName,
            createdAt: serverTimestamp(),
            status: 'active'
          });
        } catch (error) {
          console.warn('Could not save to Firebase:', error);
        }
      }

      router.push(`/room/${newMeetingId}?name=${encodeURIComponent(displayName)}&host=true`);
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Error creating meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinMeeting = () => {
    if (!displayName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!meetingId.trim()) {
      alert('Please enter Meeting ID');
      return;
    }

    router.push(`/room/${meetingId}?name=${encodeURIComponent(displayName)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'create' | 'join') => {
    if (e.key === 'Enter') {
      action === 'create' ? createMeeting() : joinMeeting();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-white">Philippine Eagles</h1>
                <p className="text-xs text-gray-400">Video Conference</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="relative w-24 h-24 mx-auto mb-6 group">
            <Image 
              src="/logo.png" 
              alt="Philippine Eagles Logo" 
              fill
              className="object-contain transition-transform group-hover:scale-110 duration-300"
            />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Connect Seamlessly
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-3 font-light">
            KSEC/KSLEG - Ang Malayang Agila Video Conferencing Platform
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Unlimited Participants</span>
            <span>•</span>
            <span>HD Quality</span>
            <span>•</span>
            <span>No Time Limits</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            
            {/* Name Input Section */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 md:p-10 border-b border-white/10">
              <label className="block text-white text-sm font-semibold mb-3 uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'create')}
                placeholder="Enter your full name"
                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
              />
            </div>

            {/* Actions Grid */}
            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                
                {/* Create Meeting Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-700/20 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-500/60 transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Create Meeting</h3>
                        <p className="text-sm text-gray-400">Start a new conference</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-6">
                      Host a video conference with unlimited participants. Share your screen, chat, and collaborate in real-time.
                    </p>
                    <button
                      onClick={createMeeting}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Create New Meeting
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Join Meeting Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-700/20 p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Join Meeting</h3>
                        <p className="text-sm text-gray-400">Enter an existing room</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      Join an ongoing conference using the Meeting ID shared with you.
                    </p>
                    <input
                      type="text"
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value.toUpperCase())}
                      onKeyPress={(e) => handleKeyPress(e, 'join')}
                      placeholder="Enter Meeting ID"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all mb-4 backdrop-blur-sm font-mono text-center text-lg tracking-wider"
                    />
                    <button
                      onClick={joinMeeting}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Join Meeting
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Features Grid */}
          <div id="features" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: '👥', title: '100+ Participants', desc: 'Unlimited capacity' },
              { icon: '🖥️', title: 'Screen Share', desc: 'Present anything' },
              { icon: '💬', title: 'Live Chat', desc: 'Real-time messaging' },
              { icon: '📹', title: 'HD Quality', desc: 'Crystal clear video' },
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-1 text-sm">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div id="about" className="mt-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-gray-400 text-sm">Free Forever</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">Unlimited</div>
                <div className="text-gray-400 text-sm">Meeting Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">Secure</div>
                <div className="text-gray-400 text-sm">End-to-End Encrypted</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-gray-700/50 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Philippine Eagles</h3>
                  <p className="text-gray-400 text-xs">The Fraternal Order of Eagles</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Video conferencing platform for AMA to secure and seamless communication.
              </p>
              <p className="text-xs text-gray-500">
                Ang Malayang Agila • Humanitarian Service • Deo Et Patria
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Video Conferencing</li>
                <li>Screen Sharing</li>
                <li>Live Chat</li>
                <li>Recording</li>
              </ul>
            </div>

            {/* Technology */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Powered by Jitsi Meet</li>
                <li>WebRTC Technology</li>
                <li>Next.js Framework</li>
                <li>Firebase Database</li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Philippine Eagles Conference Platform. All rights reserved.
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Developed by</span>
              <span className="text-blue-400 font-semibold ml-1">Kuya Heber</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
