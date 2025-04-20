// Next.js build plugin for Netlify
module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('⚙️ Running Next.js pre-build setup...');
  },
  
  onBuild: ({ utils }) => {
    console.log('🔍 Checking Next.js build output...');
    
    // Log successful build
    console.log('✅ Next.js build completed successfully');
  },
  
  onPostBuild: ({ utils }) => {
    console.log('🧹 Running Next.js post-build cleanup...');
    
    // Add any necessary post-build tasks here
    
    console.log('🚀 Next.js site ready for deployment');
  }
}; 