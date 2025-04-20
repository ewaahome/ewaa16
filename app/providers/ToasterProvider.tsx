'use client';

import { useEffect } from 'react';
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  useEffect(() => {
    // Fix for chunk loading errors
    const fixChunkLoadingErrors = () => {
      // Only run in the browser
      if (typeof window !== 'undefined') {
        // Add event listener for error events related to chunk loading
        window.addEventListener('error', (event) => {
          // Check if the error is related to chunk loading
          if (
            event.message && 
            (event.message.includes('Loading chunk') || 
             event.message.includes('failed to load')) &&
            event.target && 
            (event.target as any).src
          ) {
            // Prevent default error handling
            event.preventDefault();
            
            // Force reload of the page to get fresh chunks
            window.location.reload();
            
            return false;
          }
        }, true);
      }
    };

    fixChunkLoadingErrors();
  }, []);

  return ( 
    <Toaster />
   );
}
 
export default ToasterProvider;
