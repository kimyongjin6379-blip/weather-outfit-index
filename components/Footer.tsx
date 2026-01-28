import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            &copy; {currentYear} 오늘뭐입지. All rights reserved.
          </div>
          <nav>
            <ul className="flex gap-4 text-sm text-gray-500">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/ads" className="hover:text-blue-600 transition">
                  광고정책
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  문의하기
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-4 text-xs text-gray-400 text-center">
          날씨 데이터 제공: WeatherAPI.com | 본 서비스는 참고용이며, 실제 날씨와 다를 수 있습니다.
        </div>
      </div>
    </footer>
  );
}
