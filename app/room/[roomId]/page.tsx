'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const meetingId = params.roomId as string;
  const displayName = searchParams.get('name') || 'Guest';
  const isHost = searchParams.get('host') === 'true';
  
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Jitsi meeting URL (direct, no 5-minute limit)
  const jitsiMeetingUrl = `https://meet.jit.si/PhilippineEagles${meetingId}#userInfo.displayName="${encodeURIComponent(displayName)}"`;
  
  const meetingLink = typeof window !== 'undefined' 
    ? `${window.location.origin}/room/${meetingId}` 
    : '';

  useEffect(() => {
    // Countdown before redirect
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to Jitsi after countdown
      window.location.href = jitsiMeetingUrl;
    }
  }, [countdown, jitsiMeetingUrl]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const joinNow = () => {
    window.location.href = jitsiMeetingUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-4">
      
      <div className="max-w-3xl w-full">
        
        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    Joining Conference
                  </h1>
                  <div className="flex items-center space-x-2 text-sm">
                    {isHost ? (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        HOST
                      </span>
                    ) : (
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        PARTICIPANT
                      </span>
                    )}
                    <span className="text-gray-300">{displayName}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-gray-400 hover:text-white transition-colors"
                title="Cancel"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            
            {/* Meeting Info */}
            <div className="space-y-4 mb-8">
              
              {/* Meeting ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Meeting ID
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                    <span className="text-2xl font-mono font-bold text-white tracking-widest">
                      {meetingId}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(meetingId)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-all transform hover:scale-105 active:scale-95"
                    title="Copy Meeting ID"
                  >
                    {copied ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Share Link */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                  Share Link
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={meetingLink}
                    readOnly
                    className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => copyToClipboard(meetingLink)}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl transition-all transform hover:scale-105 active:scale-95"
                    title="Copy Link"
                  >
                    {copied ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* Countdown Section */}
            <div className="text-center py-12 mb-8">
              {countdown > 0 ? (
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative text-8xl font-bold text-white">
                      {countdown}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-white">
                      Redirecting to meeting room...
                    </p>
                    <p className="text-gray-400">
                      Please wait a moment
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-xl text-white font-semibold">
                    Opening conference room...
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={joinNow}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Join Now</span>
                </span>
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-5 rounded-xl transition-all border border-white/20"
              >
                Cancel
              </button>
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-200 mb-2">
                    You will be redirected to Jitsi Meet
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• No time limits on meetings</li>
                    <li>• Support for 100+ participants</li>
                    <li>• All features included (screen share, recording, chat)</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-black/30 backdrop-blur-sm px-8 py-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-400">
                The Fraternal Order of Eagles • Philippine Eagles 1979
              </p>
              <p className="text-gray-500">
                Powered by <span className="text-blue-400 font-semibold">Godmisoft</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
