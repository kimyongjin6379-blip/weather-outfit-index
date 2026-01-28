'use client';

import { useState } from 'react';

interface LocationButtonProps {
  onLocationFound: (lat: number, lon: number) => void;
  onError?: (error: string) => void;
}

export function LocationButton({ onLocationFound, onError }: LocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) {
      onError?.('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        onLocationFound(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setIsLoading(false);
        let message = '위치를 가져오는데 실패했습니다.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = '위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = '위치 정보를 사용할 수 없습니다.';
            break;
          case error.TIMEOUT:
            message = '위치 요청 시간이 초과되었습니다.';
            break;
        }
        onError?.(message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5분 캐시
      }
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="btn btn-secondary flex items-center gap-2"
      aria-label="현재 위치로 날씨 검색"
    >
      {isLoading ? (
        <>
          <span className="spinner" style={{ width: '1rem', height: '1rem' }} />
          <span>위치 확인 중...</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
          </svg>
          <span>현재 위치</span>
        </>
      )}
    </button>
  );
}
