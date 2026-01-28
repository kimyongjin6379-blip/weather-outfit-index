'use client';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = '날씨 정보를 불러오는 중...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="spinner mb-4" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
