'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-12 pb-6 mt-8 shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* روابط سريعة */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-neutral-800">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-600 hover:text-blue-500 transition duration-300">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-blue-500 transition duration-300">
                  عن الموقع
                </Link>
              </li>
              <li>
                <Link href="/add-property" className="text-neutral-600 hover:text-blue-500 transition duration-300">
                  اضف عقارك
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-neutral-600 hover:text-blue-500 transition duration-300">
                  قالوا عنا
                </Link>
              </li>
            </ul>
          </div>
          
          {/* روابط إضافية */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-neutral-800">روابط مهمة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-neutral-600 hover:text-blue-500 transition duration-300">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-600 hover:text-blue-500 transition duration-300">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-600 hover:text-blue-500 transition duration-300">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
            
            {/* قسم تحميل التطبيق */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2 text-neutral-800">حمل التطبيق</h4>
              <div className="flex space-x-4 space-x-reverse">
                <Link href="#" className="hover:opacity-80 transition duration-300">
                  <div className="flex items-center justify-center bg-neutral-800 text-white rounded-lg px-3 py-2">
                    <FaGooglePlay className="text-xl ml-2" />
                    <div>
                      <div className="text-xs">متوفر على</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="hover:opacity-80 transition duration-300">
                  <div className="flex items-center justify-center bg-neutral-800 text-white rounded-lg px-3 py-2">
                    <FaApple className="text-xl ml-2" />
                    <div>
                      <div className="text-xs">متوفر على</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* الشعار */}
          <div className="flex items-start justify-end">
            <Image 
              src="/images/footer-logo.jpg" 
              alt="شعار إيواء هوم" 
              width={200} 
              height={80} 
              className="object-contain"
            />
          </div>
        </div>
        
        {/* حقوق الملكية */}
        <div className="border-t border-neutral-200 pt-6 mt-6">
          <p className="text-center text-neutral-600 text-sm">
            جميع الحقوق محفوظة © 2025 - موقع إيواء هوم
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 