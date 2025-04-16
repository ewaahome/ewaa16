import { Nunito, Tajawal } from 'next/font/google'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';
import AuthProvider from '@/app/providers/AuthProvider';
import ClientOnly from './components/ClientOnly';
import Footer from './components/Footer';

import './globals.css'

const font = Tajawal({ 
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Eiwaa Home',
  description: 'Eiwaa Home - Your Home in Saudi Arabia',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="ar" dir="rtl">
      <body className={font.className}>
        <AuthProvider session={session}>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <Navbar />
          </ClientOnly>
          <div className="pb-20 pt-28">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
