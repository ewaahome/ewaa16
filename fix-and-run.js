const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Kill any running Node processes
console.log('🔪 Killing any running Node.js processes...');
try {
  execSync('taskkill /F /IM node.exe', { stdio: 'ignore' });
  console.log('✅ Node processes killed');
} catch (e) {
  console.log('⚠️ No Node processes to kill');
}

// Clean .next directory
console.log('🧹 Cleaning .next directory...');
try {
  execSync('Remove-Item -Recurse -Force -ErrorAction Ignore .next', { shell: 'powershell.exe', stdio: 'ignore' });
  console.log('✅ .next directory cleaned');
} catch (e) {
  console.log('⚠️ Error cleaning .next directory');
}

// Fix layout.tsx file
console.log('🔧 Fixing layout.tsx file...');
const layoutPath = path.join(__dirname, 'app', 'layout.tsx');

try {
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

  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ layout.tsx fixed');
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

  fs.writeFileSync(tsconfigPath, tsconfigContent);
  console.log('✅ tsconfig.json fixed');
} catch (e) {
  console.log('❌ Error fixing tsconfig.json:', e.message);
}

// Create .env.local file
console.log('📝 Creating .env.local file...');
const envPath = path.join(__dirname, '.env.local');

try {
  const envContent = `NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=this_is_a_secure_secret_key_for_development_do_not_use_in_production
SKIP_PRISMA_GENERATE=true
DEBUG=next-auth:*`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created/updated');
} catch (e) {
  console.log('❌ Error creating .env.local:', e.message);
}

// Start the application
console.log('🚀 Starting the application...');
try {
  execSync('npx next dev -p 3000', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      SKIP_PRISMA_GENERATE: 'true',
      NEXTAUTH_URL: 'http://localhost:3000',
      NEXTAUTH_SECRET: 'this_is_a_secure_secret_key_for_development_do_not_use_in_production',
      DEBUG: 'next-auth:*'
    }
  });
} catch (e) {
  console.log('❌ Error starting the application:', e.message);
} 