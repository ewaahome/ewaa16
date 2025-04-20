'use client';

import { useEffect, useState } from 'react';
import AuthProvider from '@/app/providers/AuthProvider';
import ClientOnly from './ClientOnly';
import ToasterProvider from '@/app/providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/Footer';
import { Session } from 'next-auth';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';

interface ClientLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  // Fix hydration issues by only rendering after component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <AuthProvider session={session}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar />
        </ClientOnly>
        {children}
        <Footer />
      </AuthProvider>
    </ErrorBoundary>
  );
}