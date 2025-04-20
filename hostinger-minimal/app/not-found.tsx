'use client';

import Link from 'next/link';
import ClientOnly from '@/app/components/ClientOnly';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';

export default function NotFound() {
  return (
    <ClientOnly>
      <Container>
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
          <Heading
            center
            title="404 - Page Not Found"
            subtitle="Sorry, the page you are looking for does not exist."
          />
          <div className="w-48 mt-4">
            <Link href="/">
              <Button 
                label="Go Home"
                onClick={() => {}}
              />
            </Link>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
} 