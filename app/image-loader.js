// Custom image loader for static export
export default function customImageLoader({ src, width, quality }) {
  // For Cloudinary images, maintain the URL structure
  if (src.includes('cloudinary.com')) {
    const params = [`w=${width}`];
    if (quality) {
      params.push(`q=${quality || 75}`);
    }
    const paramsString = params.join(',');
    
    // Replace the transformation portion of the cloudinary URL
    if (src.includes('/upload/')) {
      return src.replace('/upload/', `/upload/${paramsString}/`);
    }
    
    return src;
  }
  
  // If src is local or from other providers, return it as is
  return src;
} 