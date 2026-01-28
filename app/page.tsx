'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { LocationButton } from '@/components/LocationButton';
import { WeatherCard } from '@/components/WeatherCard';
import { OutfitCard } from '@/components/OutfitCard';
import { ExerciseCard } from '@/components/ExerciseCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { PopularCities } from '@/components/PopularCities';
import { AdSlot } from '@/components/AdSlot';
import { fetchWeather } from '@/lib/api';
import { getOutfitRecommendation, getExerciseIndex } from '@/lib/recommendations';
import { WeatherData } from '@/lib/types';

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
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

  const handleLocationFound = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeather({ lat, lon });
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '날씨 정보를 가져오는데 실패했습니다.');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationError = (errorMsg: string) => {
    setError(errorMsg);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 광고 */}
      <AdSlot slot="top-banner" format="horizontal" className="mb-6" />

      {/* 히어로 섹션 */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">오늘 뭐 입지?</h1>
        <p className="text-gray-600">
          실시간 날씨와 미세먼지 정보를 바탕으로 오늘의 옷차림과 운동 적합도를 알려드립니다.
        </p>
      </section>

      {/* 검색 섹션 */}
      <section className="mb-8">
        <div className="card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
            <LocationButton
              onLocationFound={handleLocationFound}
              onError={handleLocationError}
            />
          </div>
        </div>
      </section>

      {/* 결과 영역 */}
      {isLoading && <LoadingSpinner />}

      {error && !isLoading && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            setError(null);
          }}
        />
      )}

      {weather && !isLoading && !error && (
        <div className="space-y-6">
          {/* 날씨 정보 */}
          <WeatherCard weather={weather} />

          {/* 중간 광고 */}
          <AdSlot slot="mid-content" format="rectangle" />

          {/* 옷차림/운동지수 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OutfitCard outfit={getOutfitRecommendation(weather)} />
            <ExerciseCard exercise={getExerciseIndex(weather)} />
          </div>
        </div>
      )}

      {/* 초기 상태 - 인기 도시 */}
      {!weather && !isLoading && !error && (
        <div className="space-y-6">
          <PopularCities />

          {/* 서비스 설명 */}
          <section className="card">
            <h2 className="text-xl font-semibold mb-4">서비스 소개</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>오늘뭐입지</strong>는 실시간 날씨 정보를 기반으로 오늘 어떤 옷을 입어야 할지,
                야외 운동이 적합한지 알려주는 서비스입니다.
              </p>
              <h3 className="font-semibold text-gray-800">주요 기능</h3>
              <ul className="list-disc space-y-1">
                <li>
                  <strong>실시간 날씨:</strong> 현재 기온, 체감온도, 습도, 풍속, 강수량 정보 제공
                </li>
                <li>
                  <strong>대기질 정보:</strong> PM2.5, PM10 미세먼지 농도와 대기질 등급 표시
                </li>
                <li>
                  <strong>옷차림 추천:</strong> 기온과 날씨 상황에 맞는 상의, 아우터, 하의, 소품 추천
                </li>
                <li>
                  <strong>운동지수:</strong> 0~100점으로 표시되는 야외 운동 적합도 점수
                </li>
                <li>
                  <strong>위치 기반 검색:</strong> 현재 위치의 날씨를 한 번에 확인
                </li>
              </ul>
              <h3 className="font-semibold text-gray-800">옷차림 추천 기준</h3>
              <ul className="list-disc space-y-1">
                <li>체감온도 0°C 이하: 롱패딩, 두꺼운 코트, 방한 소품</li>
                <li>체감온도 1~8°C: 패딩, 니트, 목도리</li>
                <li>체감온도 9~16°C: 자켓, 가디건, 긴팔</li>
                <li>체감온도 17~22°C: 얇은 긴팔, 가벼운 아우터</li>
                <li>체감온도 23~27°C: 반팔, 얇은 옷</li>
                <li>체감온도 28°C 이상: 민소매, 린넨 소재</li>
              </ul>
              <p className="text-sm text-gray-500">
                * 비/눈 예보 시 우산과 방수 의류 추천, 미세먼지 나쁨 시 마스크 착용 권장
              </p>
            </div>
          </section>
        </div>
      )}

      {/* 하단 광고 */}
      <AdSlot slot="bottom-banner" format="horizontal" className="mt-8" />
    </div>
  );
}
