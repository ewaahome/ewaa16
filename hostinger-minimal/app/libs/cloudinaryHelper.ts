/**
 * CloudinaryHelper - Utility functions for working with Cloudinary images
 */

/**
 * Optimizes a Cloudinary URL to ensure it loads properly
 * @param url The original Cloudinary URL
 * @returns An optimized URL with proper parameters
 */
export const optimizeCloudinaryUrl = (url: string): string => {
  if (!url) return '';
  
  // Check if it's a Cloudinary URL
  if (!url.includes('cloudinary.com')) {
    return url;
  }
  
  // Ensure HTTPS is used
  let optimizedUrl = url.replace('http://', 'https://');
  
  // Add quality and format parameters if they don't exist
  if (!optimizedUrl.includes('q_auto')) {
    optimizedUrl = optimizedUrl.replace('/upload/', '/upload/q_auto/');
  }
  
  if (!optimizedUrl.includes('f_auto')) {
    optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto/');
  }
  
  // Add proper width for responsive images
  if (!optimizedUrl.includes('w_')) {
    optimizedUrl = optimizedUrl.replace('/upload/', '/upload/w_1200/');
  }
  
  return optimizedUrl;
};

/**
 * Gets a lower quality placeholder version of a Cloudinary image for lazy loading
 * @param url The original Cloudinary URL
 * @returns A low quality placeholder URL
 */
export const getPlaceholderUrl = (url: string): string => {
  if (!url || !url.includes('cloudinary.com')) {
    return '';
  }
  
  // Create a low quality, blurred version for placeholders
  return url.replace('/upload/', '/upload/w_60,e_blur:1000,q_30/');
};

/**
 * Checks if an image URL is a default/placeholder Cloudinary image
 * @param url Image URL to check
 * @returns Boolean indicating if it's a default image
 */
export const isDefaultCloudinaryImage = (url: string): boolean => {
  if (!url) return true;
  
  return url.includes('default_property_image') || 
         url.includes('placeholder') ||
         url.includes('default.jpg');
};

export default {
  optimizeCloudinaryUrl,
  getPlaceholderUrl,
  isDefaultCloudinaryImage
}; 