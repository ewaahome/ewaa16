const fs = require('fs');
const path = require('path');

// Fix layout.tsx file
console.log('🔧 Fixing layout.tsx file...');
const layoutPath = path.join(__dirname, 'app', 'layout.tsx');

try {
  // Check if file exists
  if (!fs.existsSync(layoutPath)) {
    console.log(`❌ File not found: ${layoutPath}`);
    process.exit(1);
  }

  // Read current content to check for issues
  const currentContent = fs.readFileSync(layoutPath, 'utf8');
  console.log(`📄 Current file size: ${currentContent.length} bytes`);
  
  // Look for unterminated strings
  const hasUnterminatedString = /["'](?:[^"'\\]|\\.)*$/.test(currentContent);
  if (hasUnterminatedString) {
    console.log('⚠️ Detected possible unterminated string in layout.tsx');
  }

  // Create fixed content
  const layoutContent = `// This must be a server component without 'use client' directive
import './globals.css'
import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import ClientLayout from './components/ClientLayout'
import { getServerSession } from 'next-auth'
import { authOptions } from './libs/auth'
import { Suspense } from 'react'

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
          <ClientLayout session={session}>
            {children}
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}`;

  // Create backup of original file
  const backupPath = path.join(__dirname, 'app', 'layout.tsx.bak');
  fs.writeFileSync(backupPath, currentContent);
  console.log(`✅ Created backup at ${backupPath}`);

  // Write the fixed content
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ layout.tsx fixed and saved');
} catch (e) {
  console.log('❌ Error fixing layout.tsx:', e.message);
}

// Fix tsconfig.json
console.log('🔧 Fixing tsconfig.json...');
const tsconfigPath = path.join(__dirname, 'tsconfig.json');

try {
  const tsconfigContent = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;

  // Create backup
  if (fs.existsSync(tsconfigPath)) {
    const currentTsconfig = fs.readFileSync(tsconfigPath, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'tsconfig.json.bak'), currentTsconfig);
  }

  fs.writeFileSync(tsconfigPath, tsconfigContent);
  console.log('✅ tsconfig.json fixed');
} catch (e) {
  console.log('❌ Error fixing tsconfig.json:', e.message);
}

console.log('✅ All fixes applied. Now you can restart your server.');
console.log('   Run: taskkill /F /IM node.exe && npx next dev -p 3000'); 