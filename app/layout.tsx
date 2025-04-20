// This is a server component (no 'use client' directive)
import './globals.css'
import { Metadata } from 'next/types'
import { Tajawal } from 'next/font/google'
import ClientLayout from './components/ClientLayout'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './libs/auth'
import { Suspense } from 'react'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'ايواء هوم',
  description: 'ايواء هوم'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
          <ClientLayout session={session}>
            {children}
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}