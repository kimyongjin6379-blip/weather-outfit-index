'use client';

import Image from 'next/image';
import { WeatherData, DayForecast, AirQualityLevel } from '@/lib/types';

interface WeatherCardProps {
  weather: WeatherData;
  showForecast?: boolean;
}

function getAirQualityBadge(level: AirQualityLevel): { label: string; className: string } {
  switch (level) {
    case 'good':
      return { label: '좋음', className: 'badge-good' };
    case 'moderate':
      return { label: '보통', className: 'badge-moderate' };
    case 'unhealthy-sensitive':
      return { label: '민감군 영향', className: 'badge-moderate' };
    case 'unhealthy':
      return { label: '나쁨', className: 'badge-bad' };
    case 'very-unhealthy':
      return { label: '매우 나쁨', className: 'badge-bad' };
    case 'hazardous':
      return { label: '위험', className: 'badge-bad' };
    default:
      return { label: '정보 없음', className: '' };
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'short' };
  return date.toLocaleDateString('ko-KR', options);
}

export function WeatherCard({ weather, showForecast = true }: WeatherCardProps) {
  const aqBadge = getAirQualityBadge(weather.airQuality.level);

  return (
    <div className="card">
      {/* 현재 날씨 */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{weather.location.name}</h2>
            <p className="text-sm text-gray-500">
              {weather.location.region && `${weather.location.region}, `}
              {weather.location.country}
            </p>
            <p className="text-xs text-gray-400 mt-1">{weather.location.localtime}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              {weather.current.conditionIcon && (
                <Image
                  src={`https:${weather.current.conditionIcon}`}
                  alt={weather.current.condition}
                  width={64}
                  height={64}
                />
              )}
              <span className="text-4xl font-bold">{Math.round(weather.current.temp)}°</span>
            </div>
            <p className="text-gray-600">{weather.current.condition}</p>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">체감온도</p>
            <p className="font-medium">{Math.round(weather.current.feelsLike)}°C</p>
          </div>
          <div>
            <p className="text-gray-500">습도</p>
            <p className="font-medium">{weather.current.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-500">풍속</p>
            <p className="font-medium">
              {Math.round(weather.current.windSpeed)} km/h {weather.current.windDir}
            </p>
          </div>
          <div>
            <p className="text-gray-500">강수량</p>
            <p className="font-medium">{weather.current.precipitation} mm</p>
          </div>
        </div>

        {/* 대기질 */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">대기질</span>
            <span className={`badge ${aqBadge.className}`}>{aqBadge.label}</span>
          </div>
          {weather.airQuality.pm25 !== null && (
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">PM2.5: </span>
                <span className="font-medium">{Math.round(weather.airQuality.pm25)} µg/m³</span>
              </div>
              {weather.airQuality.pm10 !== null && (
                <div>
                  <span className="text-gray-500">PM10: </span>
                  <span className="font-medium">{Math.round(weather.airQuality.pm10)} µg/m³</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 오늘/내일 예보 */}
      {showForecast && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-3">일별 예보</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ForecastDayCard forecast={weather.forecast.today} label="오늘" />
            {weather.forecast.tomorrow && (
              <ForecastDayCard forecast={weather.forecast.tomorrow} label="내일" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ForecastDayCard({ forecast, label }: { forecast: DayForecast; label: string }) {
  const aqBadge = getAirQualityBadge(forecast.airQuality.level);

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-gray-500">{formatDate(forecast.date)}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        {forecast.conditionIcon && (
          <Image
            src={`https:${forecast.conditionIcon}`}
            alt={forecast.condition}
            width={40}
            height={40}
          />
        )}
        <div>
          <span className="text-blue-600">{Math.round(forecast.minTemp)}°</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-red-500">{Math.round(forecast.maxTemp)}°</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{forecast.condition}</p>
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex justify-between">
          <span>강수확률</span>
          <span>{forecast.rainChance}%</span>
        </div>
        <div className="flex justify-between">
          <span>대기질</span>
          <span className={`badge ${aqBadge.className}`} style={{ fontSize: '0.65rem' }}>
            {aqBadge.label}
          </span>
        </div>
      </div>
    </div>
  );
}
