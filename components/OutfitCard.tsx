'use client';

import { OutfitRecommendation } from '@/lib/types';

interface OutfitCardProps {
  outfit: OutfitRecommendation;
}

export function OutfitCard({ outfit }: OutfitCardProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
        </svg>
        오늘의 옷차림 추천
      </h3>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-gray-500 w-16 flex-shrink-0">상의</span>
          <span className="font-medium">{outfit.top}</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-gray-500 w-16 flex-shrink-0">아우터</span>
          <span className="font-medium">{outfit.outer}</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-gray-500 w-16 flex-shrink-0">하의</span>
          <span className="font-medium">{outfit.bottom}</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-gray-500 w-16 flex-shrink-0">소품</span>
          <span className="font-medium">{outfit.accessory}</span>
        </div>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm font-medium">{outfit.summary}</p>
      </div>
    </div>
  );
}
