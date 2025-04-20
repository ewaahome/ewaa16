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
    <div className="relative z-20" ref={menuRef}>
      <div className="flex flex-row items-center gap-1 md:gap-3">
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
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="القائمة الرئيسية"
          className="
            inline-flex
            items-center
            justify-center
            p-1.5
            md:p-2
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
          <AiOutlineMenu className="h-4 w-4 md:h-5 md:w-5" />
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
            w-[80vw]
            sm:w-[50vw]
            md:w-auto
            min-w-[200px]
            md:min-w-[240px]
            max-w-[90vw]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            z-50
            user-menu-dropdown
            menu-container
            md:menu-container-desktop
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="رحلاتي" 
                  onClick={() => {
                    router.push('/trips');
                    setIsOpen(false);
                  }}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
                />
                <MenuItem 
                  label="المفضلة" 
                  onClick={() => {
                    router.push('/favorites');
                    setIsOpen(false);
                  }}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
                />
                <MenuItem 
                  label="حجوزاتي" 
                  onClick={() => {
                    router.push('/reservations');
                    setIsOpen(false);
                  }}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
                />
                <MenuItem 
                  label="عقاراتي" 
                  onClick={() => {
                    router.push('/properties');
                    setIsOpen(false);
                  }}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
                />
                <MenuItem 
                  label="أضف عقارك" 
                  onClick={() => {
                    rentModal.onOpen();
                    setIsOpen(false);
                  }}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
                />
                <hr className="my-1 border-neutral-200" />
                <MenuItem 
                  label="تسجيل الخروج" 
                  onClick={() => signOut()}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="تسجيل الدخول" 
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
                />
                <MenuItem 
                  label="إنشاء حساب" 
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                  className="mobile-menu-item menu-item text-base font-semibold whitespace-nowrap"
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