'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  const placeholderImage = '/images/placeholder.jpg';
  return ( 
    <Image 
      className="rounded-full" 
      height="30" 
      width="30" 
      alt="Avatar" 
      src={src || placeholderImage}
      unoptimized
    />
   );
}
 
export default Avatar;