'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { WeatherCard } from '@/components/WeatherCard';
import { OutfitCard } from '@/components/OutfitCard';
import { ExerciseCard } from '@/components/ExerciseCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SearchBar } from '@/components/SearchBar';
import { AdSlot } from '@/components/AdSlot';
import { fetchWeather } from '@/lib/api';
import { getOutfitRecommendation, getExerciseIndex } from '@/lib/recommendations';
import { WeatherData } from '@/lib/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async (city: string) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeather({ city });
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '날씨 정보를 가져오는데 실패했습니다.');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      loadWeather(query);
    }
  }, [query]);

  const handleSearch = (city: string) => {
    loadWeather(city);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 광고 */}
      <AdSlot slot="search-top-banner" format="horizontal" className="mb-6" />

      {/* 브레드크럼 */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          홈
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">검색 결과</span>
      </nav>

      {/* 검색 바 */}
      <div className="card mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 검색어 표시 */}
      {query && (
        <h1 className="text-2xl font-bold mb-6">
          &quot;{query}&quot; 날씨 검색 결과
        </h1>
      )}

      {/* 로딩/에러/결과 */}
      {isLoading && <LoadingSpinner />}

      {error && !isLoading && <ErrorMessage message={error} onRetry={() => loadWeather(query)} />}

      {weather && !isLoading && !error && (
        <div className="space-y-6">
          {/* 날씨 정보 */}
          <WeatherCard weather={weather} />

          {/* 중간 광고 */}
          <AdSlot slot="search-mid-content" format="rectangle" />

          {/* 옷차림/운동지수 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OutfitCard outfit={getOutfitRecommendation(weather)} />
            <ExerciseCard exercise={getExerciseIndex(weather)} />
          </div>
        </div>
      )}

      {!query && !isLoading && (
        <div className="card text-center py-8">
          <p className="text-gray-500">검색어를 입력하여 날씨를 확인하세요.</p>
        </div>
      )}

      {/* 하단 광고 */}
      <AdSlot slot="search-bottom-banner" format="horizontal" className="mt-6" />
    </div>
  );
}
