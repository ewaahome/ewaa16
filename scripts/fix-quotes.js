// Script to fix quotation mark issues in critical files
const fs = require('fs');
const path = require('path');

console.log('🛠️ Running quote fixer for Next.js files...');

// List of critical files to check for quote issues
const criticalFiles = [
  path.join(process.cwd(), 'app', 'layout.tsx'),
  path.join(process.cwd(), 'app', 'components', 'ClientLayout.tsx'),
  path.join(process.cwd(), 'app', 'providers', 'AuthProvider.tsx')
];

// Fix quotes in files
criticalFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File does not exist: ${filePath}`);
    return;
  }

  try {
    console.log(`🔍 Checking file: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // First backup the original file
    fs.writeFileSync(`${filePath}.bak`, content);
    
    // Replace curly single/double quotes with straight quotes
    content = content
      .replace(/'/g, "'")  // Replace curly single quotes with straight single quotes
      .replace(/"/g, '"')  // Replace curly double quotes with straight double quotes
      .replace(/"/g, '"')  // Replace left curly double quotes with straight double quotes
      .replace(/"/g, '"')  // Replace right curly double quotes with straight double quotes
      .replace(/'/g, "'")  // Replace left curly single quotes with straight single quotes
      .replace(/'/g, "'"); // Replace right curly single quotes with straight single quotes
    
    // Ensure 'use client' directive is properly formatted (if present)
    if (content.includes('use client')) {
      content = content.replace(/['"]use client['"];?/i, "'use client';");
      
      // Ensure 'use client' is at the top of the file
      if (!content.startsWith("'use client'")) {
        content = content.replace(/['"]use client['"];?\s*/i, '');
        content = "'use client';\n\n" + content;
      }
    }
    
    // Write the fixed content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed quotes in: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing quotes in ${filePath}:`, error.message);
  }
});

console.log('✅ Quote fixing completed'); 