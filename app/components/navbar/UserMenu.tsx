'use client';

import { useCallback, useState, useRef, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ( 
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          أضف عقارك
        </div>
        <button
          onClick={toggleOpen}
          type="button"
          className="
            inline-flex
            items-center
            justify-center
            p-2
            rounded-full
            border
            border-neutral-200
            hover:shadow-md
            transition
            relative
            z-50
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-neutral-200
            min-w-[40px]
            min-h-[40px]
            bg-white
            cursor-pointer
          "
        >
          <AiOutlineMenu className="h-5 w-5" />
          <div className="hidden md:block ml-2">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div 
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            z-50
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="رحلاتي" 
                  onClick={() => router.push('/trips')}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
                <MenuItem 
                  label="المفضلة" 
                  onClick={() => router.push('/favorites')}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
                <MenuItem 
                  label="حجوزاتي" 
                  onClick={() => router.push('/reservations')}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
                <MenuItem 
                  label="عقاراتي" 
                  onClick={() => router.push('/properties')}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
                <MenuItem 
                  label="أضف عقارك" 
                  onClick={rentModal.onOpen}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
                <hr className="my-1 border-neutral-200" />
                <MenuItem 
                  label="تسجيل الخروج" 
                  onClick={() => signOut()}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="تسجيل الدخول" 
                  onClick={loginModal.onOpen}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
                <MenuItem 
                  label="إنشاء حساب" 
                  onClick={registerModal.onOpen}
                  className="text-base font-semibold py-3 hover:bg-neutral-100 transition"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;