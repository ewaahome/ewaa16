'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/new-logo.png" 
      height={100} 
      width={100} 
      alt="Logo"
      priority
      style={{ height: "auto", width: "auto" }}
    />
   );
}
 
export default Logo;
