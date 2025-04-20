'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  className = ''
}) => {
  return ( 
    <div 
      onClick={onClick} 
      className={`
        px-4
        py-3
        w-full
        text-right
        text-base
        font-medium
        cursor-pointer
        hover:bg-neutral-100
        transition
        ${className}
      `}
      role="menuitem"
    >
      {label}
    </div>
   );
}
 
export default MenuItem;