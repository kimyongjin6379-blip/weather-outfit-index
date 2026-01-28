'use client';

import { useEffect, useState } from 'react';
import { getCookieConsent } from '@/lib/storage';

interface AdSlotProps {
  slot: string; // 광고 슬롯 ID
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHasConsent(getCookieConsent());
  }, []);

  // 동의 상태 변경 감지
  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = () => {
      setHasConsent(getCookieConsent());
    };

    window.addEventListener('storage', handleStorageChange);
    // 커스텀 이벤트도 리스닝 (같은 탭에서의 변경)
    window.addEventListener('cookieConsentChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentChanged', handleStorageChange);
    };
  }, [isClient]);

  // 동의 전에는 placeholder 표시
  if (!isClient || hasConsent !== true) {
    return (
      <div
        className={`ad-placeholder ${className}`}
        style={{
          minHeight: format === 'horizontal' ? '90px' : format === 'rectangle' ? '250px' : '100px',
        }}
      >
        <span>광고 영역</span>
      </div>
    );
  }

  // 동의 후에는 실제 애드센스 코드가 들어갈 자리
  // 실제 배포 시 아래 주석을 해제하고 애드센스 코드로 교체
  return (
    <div className={className}>
      {/*
        실제 애드센스 코드 예시:
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      */}
      <div
        className="ad-placeholder"
        style={{
          minHeight: format === 'horizontal' ? '90px' : format === 'rectangle' ? '250px' : '100px',
          backgroundColor: '#f0f9ff',
          borderColor: '#3b82f6',
        }}
      >
        <span style={{ color: '#3b82f6' }}>광고 (슬롯: {slot})</span>
      </div>
    </div>
  );
}
