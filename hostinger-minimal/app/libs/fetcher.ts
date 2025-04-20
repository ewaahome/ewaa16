import axios from 'axios';

// Configure axios to always use the correct port
axios.interceptors.request.use((config) => {
  // If we're in the browser and the URL is relative or points to localhost:3001
  if (typeof window !== 'undefined') {
    // For relative URLs, ensure they use the current origin
    if (!config.url?.startsWith('http')) {
      config.baseURL = window.location.origin;
    } 
    // For URLs pointing to localhost:3001, redirect to localhost:3000
    else if (config.url?.includes('localhost:3001')) {
      config.url = config.url.replace('localhost:3001', 'localhost:3000');
    }
  }
  
  return config;
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
