import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CreditIntel | Private Credit Intelligence Platform',
  description: 'Advanced AI-powered private credit fund research platform. Access comprehensive insights on fund strategies, team composition, portfolio analysis, and recent transactions.',
  keywords: 'private credit, fund research, direct lending, credit analysis, institutional investing, fund intelligence',
  authors: [{ name: 'CreditIntel' }],
  robots: 'index, follow',
  metadataBase: new URL('https://creditintel.com'),
  openGraph: {
    title: 'CreditIntel - Private Credit Intelligence Platform',
    description: 'Advanced AI-powered private credit fund research platform',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreditIntel - Private Credit Intelligence Platform',
    description: 'Advanced AI-powered private credit fund research platform',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <div className="min-h-screen">
          {children}
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              borderRadius: '12px',
              padding: '16px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#f9fafb',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#f9fafb',
              },
            },
          }}
        />
      </body>
    </html>
  )
} 