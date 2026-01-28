'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WeatherCard } from '@/components/WeatherCard';
import { OutfitCard } from '@/components/OutfitCard';
import { ExerciseCard } from '@/components/ExerciseCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { AdSlot } from '@/components/AdSlot';
import { fetchWeather } from '@/lib/api';
import { getOutfitRecommendation, getExerciseIndex } from '@/lib/recommendations';
import { WeatherData, CityInfo } from '@/lib/types';

interface CityWeatherClientProps {
  city: CityInfo;
}

export function CityWeatherClient({ city }: CityWeatherClientProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeather({ lat: city.lat, lon: city.lon });
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '날씨 정보를 가져오는데 실패했습니다.');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [city.slug]);

  return (
    <>
      {/* 상단 광고 */}
      <AdSlot slot="city-top-banner" format="horizontal" className="mb-6" />

      {/* 브레드크럼 */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          홈
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{city.name}</span>
      </nav>

      {/* 페이지 제목 */}
      <h1 className="text-2xl font-bold mb-6">
        {city.name} 날씨 - 오늘의 옷차림 & 운동지수
      </h1>

      {/* 로딩/에러/결과 */}
      {isLoading && <LoadingSpinner />}

      {error && !isLoading && <ErrorMessage message={error} onRetry={loadWeather} />}

      {weather && !isLoading && !error && (
        <div className="space-y-6">
          {/* 날씨 정보 */}
          <WeatherCard weather={weather} />

          {/* 중간 광고 */}
          <AdSlot slot="city-mid-content" format="rectangle" />

          {/* 옷차림/운동지수 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OutfitCard outfit={getOutfitRecommendation(weather)} />
            <ExerciseCard exercise={getExerciseIndex(weather)} />
          </div>
        </div>
      )}

      {/* 하단 광고 */}
      <AdSlot slot="city-bottom-banner" format="horizontal" className="mt-6" />
    </>
  );
}
