'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import Container from "./Container";
import { useState } from 'react';

const Footer = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="bg-white border-t">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-10 pb-6">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="mb-4 block">
              {!imgError ? (
                <Image
                  src="/images/footer-logo.jpg"
                  alt="EiwaaHome Logo"
                  width={150}
                  height={50}
                  priority
                  onError={() => setImgError(true)}
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/images/logo.png"
                  alt="EiwaaHome Logo"
                  width={150}
                  height={50}
                  priority
                  className="object-contain"
                />
              )}
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              منصة عقارية متكاملة تقدم حلولاً شاملة لبيع وشراء وتأجير العقارات في المملكة العربية السعودية.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <FaGooglePlay size={24} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <FaApple size={24} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">عن المنصة</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                    سياسة الخصوصية
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">خدماتنا</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/properties" className="text-sm text-gray-600 hover:text-gray-900">
                    العقارات
                  </Link>
                </li>
                <li>
                  <Link href="/agents" className="text-sm text-gray-600 hover:text-gray-900">
                    الوكلاء
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
                    المدونة
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">المدن</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/cities/riyadh" className="text-sm text-gray-600 hover:text-gray-900">
                    الرياض
                  </Link>
                </li>
                <li>
                  <Link href="/cities/jeddah" className="text-sm text-gray-600 hover:text-gray-900">
                    جدة
                  </Link>
                </li>
                <li>
                  <Link href="/cities/dammam" className="text-sm text-gray-600 hover:text-gray-900">
                    الدمام
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-center text-xs text-gray-600">
            &copy; 2024 EiwaaHome. جميع الحقوق محفوظة.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 