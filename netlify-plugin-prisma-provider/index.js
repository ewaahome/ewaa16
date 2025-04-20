/**
 * Netlify Plugin for Prisma
 * 
 * This plugin prepares and generates the Prisma client during build
 * It ensures that Prisma works correctly in a Netlify environment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = {
  onPreBuild: ({ utils }) => {
    try {
      console.log('🔧 Preparing Prisma setup for Netlify...');
      
      // Ensure prisma directory exists
      const prismaDir = path.join(process.cwd(), 'prisma');
      if (!fs.existsSync(prismaDir)) {
        console.log('📁 Creating prisma directory...');
        fs.mkdirSync(prismaDir, { recursive: true });
      }
      
      // Check if schema exists in the prisma directory
      const schemaPath = path.join(prismaDir, 'schema.prisma');
      const rootSchemaPath = path.join(process.cwd(), 'schema.prisma');
      
      // Copy schema from root to prisma directory if needed
      if (fs.existsSync(rootSchemaPath) && !fs.existsSync(schemaPath)) {
        console.log('📄 Copying schema.prisma from root to prisma directory...');
        fs.copyFileSync(rootSchemaPath, schemaPath);
      }
      
      // Ensure schema exists
      if (!fs.existsSync(schemaPath)) {
        console.error('❌ No schema.prisma found. Build may fail!');
        utils.build.failBuild('Missing Prisma schema file');
        return;
      }
      
      // Generate Prisma client
      console.log('🔄 Generating Prisma client...');
      execSync('npx prisma generate', { stdio: 'inherit' });
      
      console.log('✅ Prisma setup complete');
    } catch (error) {
      console.error('❌ Prisma setup failed:', error);
      utils.build.failBuild(`Prisma setup failed: ${error.message}`);
    }
  }
}; 