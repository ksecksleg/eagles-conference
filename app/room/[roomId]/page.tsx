'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function RoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const meetingId = params.roomId as string;
  const displayName = searchParams.get('name') || 'Guest';
  const isHost = searchParams.get('host') === 'true';
  
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);
  const [copied, setCopied] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const meetingLink = typeof window !== 'undefined' 
    ? `${window.location.origin}/room/${meetingId}` 
    : '';

  useEffect(() => {
    // Load Jitsi Meet External API
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !jitsiContainerRef.current) return;

    const domain = 'meet.jit.si';
    const options = {
      roomName: `PhilippineEagles_${meetingId}`,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        toolbarButtons: [
          'camera',
          'chat',
          'closedcaptions',
          'desktop',
          'download',
          'embedmeeting',
          'etherpad',
          'feedback',
          'filmstrip',
          'fullscreen',
          'hangup',
          'help',
          'highlight',
          'invite',
          'linktosalesforce',
          'livestreaming',
          'microphone',
          'noisesuppression',
          'participants-pane',
          'profile',
          'raisehand',
          'recording',
          'security',
          'select-background',
          'settings',
          'shareaudio',
          'sharedvideo',
          'shortcuts',
          'stats',
          'tileview',
          'toggle-camera',
          'videoquality',
          'whiteboard',
        ],
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: '',
        SHOW_POWERED_BY: false,
        DEFAULT_BACKGROUND: '#1a1a1a',
        DEFAULT_LOGO_URL: '/logo.png',
        MOBILE_APP_PROMO: false,
        DISPLAY_WELCOME_FOOTER: false,
      },
      userInfo: {
        displayName: displayName,
      },
    };

    jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

    // Event listeners
    jitsiApiRef.current.on('videoConferenceJoined', () => {
      console.log('Conference joined successfully');
    });

    jitsiApiRef.current.on('participantLeft', () => {
      console.log('Participant left');
    });

    jitsiApiRef.current.on('readyToClose', () => {
      router.push('/');
    });

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [scriptLoaded, meetingId, displayName, router]);

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-eagles-black">
      {/* Top Bar */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-eagles-gold/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.png" 
              alt="Philippine Eagles Logo" 
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-eagles-gold">Philippine Eagles Conference</h1>
            <p className="text-xs text-gray-400">
              {isHost ? '👑 Host' : '👤 Participant'} • {displayName}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-eagles-gold/30">
            <p className="text-xs text-gray-400 mb-1">Meeting ID</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-eagles-gold">{meetingId}</span>
              <button
                onClick={copyMeetingId}
                className="text-xs bg-eagles-gold/20 hover:bg-eagles-gold/30 text-eagles-gold px-2 py-1 rounded transition-all"
              >
                {copied ? '✓' : '📋'}
              </button>
            </div>
          </div>
          
          <button
            onClick={copyMeetingLink}
            className="bg-eagles-gold hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition-all text-sm flex items-center gap-2"
          >
            <span className="hidden md:inline">
              {copied ? '✓ Copied!' : '🔗 Copy Link'}
            </span>
            <span className="md:hidden">
              {copied ? '✓' : '🔗'}
            </span>
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Jitsi Meeting Container */}
      <div className="flex-1 relative">
        <div ref={jitsiContainerRef} className="absolute inset-0" />
        {!scriptLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-eagles-black">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image 
                  src="/logo.png" 
                  alt="Loading" 
                  fill
                  className="object-contain animate-pulse"
                />
              </div>
              <p className="text-white text-lg">Loading conference...</p>
              <p className="text-gray-400 text-sm mt-2">Palihug pag-antus gamay</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Info Bar */}
      <div className="md:hidden bg-black/90 backdrop-blur-sm border-t border-eagles-gold/30 px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Meeting ID</p>
            <p className="text-sm font-mono text-eagles-gold">{meetingId}</p>
          </div>
          <button
            onClick={copyMeetingId}
            className="text-xs bg-eagles-gold/20 hover:bg-eagles-gold/30 text-eagles-gold px-3 py-1 rounded transition-all"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
