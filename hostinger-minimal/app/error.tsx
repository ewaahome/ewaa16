'use client';

import { useEffect } from "react";

import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    <EmptyState
      title="حدث خطأ"
      subtitle="نأسف، حدث خطأ غير متوقع!"
    />
   );
}
 
export default ErrorState;
