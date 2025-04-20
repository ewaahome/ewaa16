# How to Fix Layout Errors in Next.js App

This guide addresses the following errors in the Next.js application:

```
Uncaught SyntaxError: "" literal not terminated before end of script layout.js:527:2657517
Uncaught (in promise) TypeError: originalFactory is undefined
    NextJS 3
    <anonymous> webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:17
    NextJS 5
webpack.js:715:15
```

## Quick Fix

To quickly fix these issues, run:

```
npm run fix-app
```

This will:
1. Fix quote problems in critical files
2. Ensure layout.tsx is properly set up as a server component
3. Clean up all caches and build artifacts
4. Start the app on port 3500

## Manual Fix Steps

If you want to fix the issues manually:

1. **Fix layout.tsx**:
   - Remove any `'use client'` directive from the layout.tsx file
   - Ensure the file starts with: `// This must be a server component without 'use client' directive`
   - Make sure it has proper metadata exports

2. **Clean caches**:
   ```powershell
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   npm cache clean --force
   ```

3. **Run with proper environment variables**:
   ```powershell
   $env:SKIP_PRISMA_GENERATE='true'
   $env:NEXTAUTH_URL='http://localhost:3500'
   $env:NEXTAUTH_SECRET='this_is_a_secure_secret_key_for_development_do_not_use_in_production'
   npx next dev -p 3500
   ```

## Common Root Causes

1. **Mixing Server and Client Components**: The `layout.tsx` file was attempting to use both `'use client'` directive and export server-specific metadata.

2. **Quotation Mark Issues**: Non-standard or curly quotes can cause syntax errors in JavaScript.

3. **Cache Corruption**: Next.js cache can become corrupted, causing webpack errors.

## Prevention

- Always keep `layout.tsx` as a server component (no `'use client'` directive)
- Use the fix-app script before significant changes
- Avoid copying text from word processors that might introduce curly quotes 