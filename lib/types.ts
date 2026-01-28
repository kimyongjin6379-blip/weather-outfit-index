// WeatherAPI.com 응답 타입
export interface WeatherApiResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    precip_mm: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    is_day: number;
    uv: number;
    air_quality?: {
      pm2_5: number;
      pm10: number;
      'us-epa-index': number;
    };
  };
  forecast?: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
    air_quality?: {
      pm2_5: number;
      pm10: number;
      'us-epa-index': number;
    };
  };
}

// 앱 내부 사용 타입
export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDir: string;
    precipitation: number;
    condition: string;
    conditionIcon: string;
    isDay: boolean;
    uv: number;
  };
  airQuality: {
    pm25: number | null;
    pm10: number | null;
    aqiIndex: number | null;
    level: AirQualityLevel;
  };
  forecast: {
    today: DayForecast;
    tomorrow: DayForecast | null;
  };
}

export interface DayForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
  maxWind: number;
  precipitation: number;
  humidity: number;
  rainChance: number;
  snowChance: number;
  condition: string;
  conditionIcon: string;
  uv: number;
  airQuality: {
    pm25: number | null;
    pm10: number | null;
    aqiIndex: number | null;
    level: AirQualityLevel;
  };
}

export type AirQualityLevel = 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous' | 'unknown';

export interface OutfitRecommendation {
  top: string;
  outer: string;
  bottom: string;
  accessory: string;
  summary: string;
}

export interface ExerciseIndex {
  score: number;
  label: '권장' | '주의' | '비권장';
  comment: string;
}

export interface CityInfo {
  slug: string;
  name: string;
  nameEn: string;
  lat: number;
  lon: number;
}
