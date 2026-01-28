'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            오늘뭐입지
          </Link>
          <nav>
            <ul className="flex gap-4 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  문의
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
