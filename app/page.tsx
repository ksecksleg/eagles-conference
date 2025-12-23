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
      alert('Palihug pag-enter sa imong ngalan');
      return;
    }

    setLoading(true);
    try {
      const newMeetingId = uuidv4().slice(0, 8);
      
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
          // Continue anyway - meeting still works without Firebase
        }
      }

      // Redirect to meeting room
      router.push(`/room/${newMeetingId}?name=${encodeURIComponent(displayName)}&host=true`);
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Error sa pag-create ug meeting. Palihug try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinMeeting = () => {
    if (!displayName.trim()) {
      alert('Palihug pag-enter sa imong ngalan');
      return;
    }
    if (!meetingId.trim()) {
      alert('Palihug pag-enter sa Meeting ID');
      return;
    }

    router.push(`/room/${meetingId}?name=${encodeURIComponent(displayName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eagles-black via-gray-900 to-eagles-blue">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-eagles-gold/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image 
                src="/logo.png" 
                alt="Philippine Eagles Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-eagles-gold">Philippine Eagles</h1>
              <p className="text-xs text-gray-400">Video Conference Platform</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-eagles-gold">The Fraternal Order of Eagles</p>
            <p className="text-xs text-gray-400">Est. 1979</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image 
                src="/logo.png" 
                alt="Philippine Eagles Logo" 
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mag-Connect, Mag-Collaborate
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Secure Video Conferencing for Eagles Community
            </p>
            <p className="text-sm text-eagles-gold">
              Unlimited participants • Screen sharing • HD Quality
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-eagles-gold/30 p-8 md:p-12">
            <div className="mb-8">
              <label className="block text-white text-sm font-semibold mb-3">
                Imong Ngalan / Your Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-eagles-gold/50 text-white placeholder-gray-400 focus:outline-none focus:border-eagles-gold transition-all"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Create Meeting */}
              <div className="bg-gradient-to-br from-eagles-gold/20 to-yellow-600/20 p-6 rounded-xl border-2 border-eagles-gold/50">
                <h3 className="text-2xl font-bold text-white mb-3">
                  🎥 Create Meeting
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Pag-start ug bag-ong video conference
                </p>
                <button
                  onClick={createMeeting}
                  disabled={loading}
                  className="w-full bg-eagles-gold hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create New Meeting'}
                </button>
              </div>

              {/* Join Meeting */}
              <div className="bg-gradient-to-br from-eagles-blue/20 to-blue-600/20 p-6 rounded-xl border-2 border-eagles-blue/50">
                <h3 className="text-2xl font-bold text-white mb-3">
                  🚀 Join Meeting
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Pag-enter sa Meeting ID para mo-join
                </p>
                <input
                  type="text"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  placeholder="Enter Meeting ID"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border-2 border-eagles-blue/50 text-white placeholder-gray-400 focus:outline-none focus:border-eagles-blue transition-all mb-3"
                />
                <button
                  onClick={joinMeeting}
                  className="w-full bg-eagles-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Join Meeting
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h4 className="text-white font-semibold mb-4 text-center">✨ Features</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="text-gray-300">
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-xs">100+ Participants</div>
                </div>
                <div className="text-gray-300">
                  <div className="text-2xl mb-1">🖥️</div>
                  <div className="text-xs">Screen Sharing</div>
                </div>
                <div className="text-gray-300">
                  <div className="text-2xl mb-1">💬</div>
                  <div className="text-xs">Live Chat</div>
                </div>
                <div className="text-gray-300">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-xs">Mobile Ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="text-white font-semibold mb-2">Secure</h3>
              <p className="text-gray-400 text-sm">End-to-end encrypted video calls</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-white font-semibold mb-2">Fast</h3>
              <p className="text-gray-400 text-sm">HD quality with low latency</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-3xl mb-2">🆓</div>
              <h3 className="text-white font-semibold mb-2">Free</h3>
              <p className="text-gray-400 text-sm">Unlimited meetings, no time limits</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-eagles-gold/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-eagles-gold font-bold">Philippine Eagles</h3>
                  <p className="text-xs text-gray-400">Conference Platform</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                The Fraternal Order of Eagles
              </p>
              <p className="text-xs text-gray-500">
                Ang Malayang Agila • Humanitarian Service
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <p className="text-sm text-gray-400 mb-1">Philippine Eagles 1979</p>
              <p className="text-sm text-gray-400">Deo Et Patria</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Technology</h4>
              <p className="text-sm text-gray-400 mb-1">Powered by Jitsi Meet</p>
              <p className="text-sm text-gray-400">WebRTC Technology</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-sm text-gray-400 mb-2">
              © 2024 Philippine Eagles Conference Platform. All rights reserved.
            </p>
            <p className="text-xs text-eagles-gold">
              Developed by <span className="font-semibold">Godmisoft</span> • Built with Next.js & Firebase
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
