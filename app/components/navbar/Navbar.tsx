'use client';

import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Search from "./Search";
import Container from "../Container";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();

  const onRent = useCallback(() => {
    if (!session) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, session]);

  const currentUser = session?.user ? {
    id: (session.user as any)?.id || '',
    name: session.user.name || null,
    email: session.user.email || null,
    image: session.user.image || null,
    emailVerified: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hashedPassword: null
  } as SafeUser : null;

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img 
                  src="https://i.ibb.co/nN0RnFRM/image-removebg-preview.png"
                  alt="إيواء هوم"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
            
            <div className="flex-1 px-4">
              <Search />
            </div>
            
            <div className="flex flex-row items-center gap-3">
              <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                <div onClick={() => router.push('/')}>الرئيسية</div>
              </div>
              <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                <div onClick={() => router.push('/listings')}>العقارات</div>
              </div>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;