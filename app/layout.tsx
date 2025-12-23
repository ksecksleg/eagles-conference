import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RegisterServiceWorker from '@/components/RegisterServiceWorker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Philippine Eagles Conference - Video Conferencing Platform',
  description: 'Secure video conferencing platform for The Fraternal Order of Eagles - Philippine Eagles 1979',
  manifest: '/manifest.json',
  themeColor: '#1a1a1a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Eagles Conference',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={inter.className}>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  )
}
