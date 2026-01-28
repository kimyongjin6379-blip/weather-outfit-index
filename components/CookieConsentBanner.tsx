'use client';

import { useEffect, useState } from 'react';
import { getCookieConsent, setCookieConsent } from '@/lib/storage';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 이미 동의/거부한 적이 있으면 배너 숨김
    const consent = getCookieConsent();
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    setShowBanner(false);
    // 동의 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
  };

  const handleDecline = () => {
    setCookieConsent(false);
    setShowBanner(false);
    window.dispatchEvent(new CustomEvent('cookieConsentChanged'));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          <p>
            이 웹사이트는 더 나은 서비스 제공을 위해 쿠키와 광고를 사용합니다.
            광고 동의 시 개인화된 광고가 표시될 수 있습니다.{' '}
            <a href="/privacy" className="text-blue-600 underline">
              개인정보처리방침
            </a>
            과{' '}
            <a href="/ads" className="text-blue-600 underline">
              광고정책
            </a>
            을 확인해주세요.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="btn btn-secondary text-sm"
            aria-label="광고 거부"
          >
            거부
          </button>
          <button
            onClick={handleAccept}
            className="btn btn-primary text-sm"
            aria-label="광고 동의"
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
}
