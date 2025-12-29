import { AuthProvider } from '@/auth/AuthContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const sfPro = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Pro-Display-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'STAB - Study Abroad Budget & Planning Platform',
  description: 'A comprehensive study abroad planning application with city comparison and interactive features',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sfPro.variable}`}>
      <body 
        className={`relative flex h-auto min-h-screen w-full flex-col bg-slate-50 group/design-root overflow-x-hidden font-sans ${sfPro.className}`}
      >
        <AuthProvider>
          <div className="layout-container flex h-full grow flex-col">
            {children}
          </div>
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}

