import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Safely redirect to the home page
    const timeout = setTimeout(() => {
      router.push('/');
    }, 100);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <>
      <Head>
        <title>Page Not Found | Ewaa Home</title>
        <meta name="description" content="Sorry, the page you are looking for does not exist." />
      </Head>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">404 - الصفحة غير موجودة</h1>
        <p className="mb-4">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
        <p>جاري إعادة توجيهك للصفحة الرئيسية...</p>
      </div>
    </>
  );
} 