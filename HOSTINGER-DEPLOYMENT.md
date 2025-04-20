# تعليمات نشر مشروع Next.js على استضافة Hostinger
# Next.js Deployment Instructions for Hostinger

## بالعربية

### المتطلبات الأساسية
- حساب Hostinger مع خطة استضافة تدعم Node.js (مثل خطة VPS أو Cloud Hosting)
- نطاق مُسجل ومُضاف إلى حساب Hostinger الخاص بك
- وصول إلى لوحة تحكم Hostinger (hPanel)

### خطوات النشر

#### 1. إعداد المشروع للإنتاج
1. قم بتثبيت كافة التبعيات:
   ```
   npm install
   ```
2. قم ببناء المشروع:
   ```
   npm run build
   ```
3. تأكد من أن ملفات البناء جاهزة في مجلد `.next`

#### 2. إعداد البيئة على Hostinger

##### خيار 1: استضافة VPS (موصى بها)
1. قم بتسجيل الدخول إلى VPS الخاص بك باستخدام SSH
2. ثبّت Node.js (النسخة 18.17.0 أو أحدث) وnpm
3. قم بإعداد Nginx أو Apache كبروكسي عكسي
4. قم بتكوين مدير العمليات مثل PM2 لتشغيل تطبيق Next.js الخاص بك:
   ```
   npm install -g pm2
   pm2 start npm --name "next-app" -- start
   ```

##### خيار 2: استضافة مشتركة (محدودة)
1. تحتاج إلى استخدام ميزة Node.js إذا كانت متوفرة في خطة الاستضافة المشتركة الخاصة بك
2. يمكنك استخدام خدمة مثل Vercel أو Netlify ثم الإشارة إلى نطاقك المُسجل في Hostinger

#### 3. رفع الملفات

1. استخدم FTP أو SSH لرفع الملفات التالية إلى خادم Hostinger:
   - مجلد `.next`
   - مجلد `public`
   - ملف `package.json`
   - ملف `.env.production` (أو قم بإعداد المتغيرات البيئية يدويًا)
   - مجلد `node_modules` (أو قم بتثبيت التبعيات على الخادم)

#### 4. إعداد المتغيرات البيئية

تأكد من إعداد المتغيرات البيئية التالية على خادم Hostinger:
```
DATABASE_URL=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=...
NEXT_PUBLIC_MAPBOX_STYLE=...
```

#### 5. تكوين النطاق

1. في لوحة تحكم Hostinger، انتقل إلى قسم "المواقع"
2. أضف نطاقك وقم بتوجيهه إلى المجلد الذي يحتوي على تطبيقك
3. قم بتكوين DNS للإشارة إلى خادم Hostinger الخاص بك

#### 6. تشغيل التطبيق

على خادم VPS:
```
cd /path/to/your/app
pm2 start npm --name "next-app" -- start
```

#### 7. إعداد HTTPS

1. في لوحة تحكم Hostinger، قم بتمكين SSL للنطاق الخاص بك
2. يمكنك استخدام شهادة Let's Encrypt المجانية

### استكشاف الأخطاء وإصلاحها

- إذا واجهت مشاكل في التحميل، تحقق من سجلات النظام والتطبيق
- تأكد من أن متغيرات البيئة مكونة بشكل صحيح
- تحقق من أن منفذ التطبيق (عادة 3000) غير محظور بواسطة جدار الحماية

---

## In English

### Prerequisites
- A Hostinger account with a Node.js-compatible hosting plan (like VPS or Cloud Hosting)
- A registered domain added to your Hostinger account
- Access to Hostinger control panel (hPanel)

### Deployment Steps

#### 1. Prepare Your Project for Production
1. Install all dependencies:
   ```
   npm install
   ```
2. Build the project:
   ```
   npm run build
   ```
3. Ensure build files are ready in the `.next` folder

#### 2. Set Up Environment on Hostinger

##### Option 1: VPS Hosting (Recommended)
1. Log in to your VPS using SSH
2. Install Node.js (version 18.17.0 or later) and npm
3. Set up Nginx or Apache as a reverse proxy
4. Configure a process manager like PM2 to run your Next.js app:
   ```
   npm install -g pm2
   pm2 start npm --name "next-app" -- start
   ```

##### Option 2: Shared Hosting (Limited)
1. You need to use the Node.js feature if available in your shared hosting plan
2. You might use a service like Vercel or Netlify and then point your Hostinger-registered domain to it

#### 3. Upload Files

1. Use FTP or SSH to upload the following files to your Hostinger server:
   - `.next` folder
   - `public` folder
   - `package.json` file
   - `.env.production` file (or set up environment variables manually)
   - `node_modules` folder (or install dependencies on the server)

#### 4. Set Up Environment Variables

Make sure to set up the following environment variables on your Hostinger server:
```
DATABASE_URL=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=...
NEXT_PUBLIC_MAPBOX_STYLE=...
```

#### 5. Configure Domain

1. In Hostinger control panel, go to the "Websites" section
2. Add your domain and point it to the folder containing your app
3. Configure DNS to point to your Hostinger server

#### 6. Run the Application

On VPS server:
```
cd /path/to/your/app
pm2 start npm --name "next-app" -- start
```

#### 7. Set Up HTTPS

1. In Hostinger control panel, enable SSL for your domain
2. You can use the free Let's Encrypt certificate

### Troubleshooting

- If you encounter loading issues, check the system and application logs
- Make sure environment variables are properly configured
- Check that the application port (usually 3000) is not blocked by the firewall 