'use client';

import Link from 'next/link';
import { popularCities } from '@/lib/cities';

export function PopularCities() {
  // 상위 10개 도시만 표시
  const cities = popularCities.slice(0, 10);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">인기 도시</h3>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/city/${city.slug}`}
            className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full text-sm transition"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
