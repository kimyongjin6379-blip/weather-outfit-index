import { WeatherData, WeatherApiResponse, AirQualityLevel } from './types';
import { getAirQualityLevel } from './recommendations';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

interface FetchWeatherParams {
  city?: string;
  lat?: number;
  lon?: number;
}

export async function fetchWeather(params: FetchWeatherParams): Promise<WeatherData> {
  const searchParams = new URLSearchParams();

  if (params.city) {
    searchParams.set('city', params.city);
  } else if (params.lat !== undefined && params.lon !== undefined) {
    searchParams.set('lat', params.lat.toString());
    searchParams.set('lon', params.lon.toString());
  } else {
    throw new Error('도시명 또는 위치 정보가 필요합니다.');
  }

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/weather?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '알 수 없는 오류' }));
    throw new Error(error.error || '날씨 정보를 가져오는데 실패했습니다.');
  }

  const data: WeatherApiResponse = await response.json();
  return transformWeatherData(data);
}

function transformWeatherData(api: WeatherApiResponse): WeatherData {
  const currentAqi = api.current.air_quality?.['us-epa-index'] ?? null;
  const todayForecast = api.forecast?.forecastday[0];
  const tomorrowForecast = api.forecast?.forecastday[1];

  return {
    location: {
      name: api.location.name,
      region: api.location.region,
      country: api.location.country,
      localtime: api.location.localtime,
    },
    current: {
      temp: api.current.temp_c,
      feelsLike: api.current.feelslike_c,
      humidity: api.current.humidity,
      windSpeed: api.current.wind_kph,
      windDir: api.current.wind_dir,
      precipitation: api.current.precip_mm,
      condition: api.current.condition.text,
      conditionIcon: api.current.condition.icon,
      isDay: api.current.is_day === 1,
      uv: api.current.uv,
    },
    airQuality: {
      pm25: api.current.air_quality?.pm2_5 ?? null,
      pm10: api.current.air_quality?.pm10 ?? null,
      aqiIndex: currentAqi,
      level: getAirQualityLevel(currentAqi),
    },
    forecast: {
      today: todayForecast
        ? {
            date: todayForecast.date,
            maxTemp: todayForecast.day.maxtemp_c,
            minTemp: todayForecast.day.mintemp_c,
            avgTemp: todayForecast.day.avgtemp_c,
            maxWind: todayForecast.day.maxwind_kph,
            precipitation: todayForecast.day.totalprecip_mm,
            humidity: todayForecast.day.avghumidity,
            rainChance: todayForecast.day.daily_chance_of_rain,
            snowChance: todayForecast.day.daily_chance_of_snow,
            condition: todayForecast.day.condition.text,
            conditionIcon: todayForecast.day.condition.icon,
            uv: todayForecast.day.uv,
            airQuality: {
              pm25: todayForecast.day.air_quality?.pm2_5 ?? null,
              pm10: todayForecast.day.air_quality?.pm10 ?? null,
              aqiIndex: todayForecast.day.air_quality?.['us-epa-index'] ?? null,
              level: getAirQualityLevel(todayForecast.day.air_quality?.['us-epa-index'] ?? null),
            },
          }
        : {
            date: new Date().toISOString().split('T')[0],
            maxTemp: api.current.temp_c,
            minTemp: api.current.temp_c,
            avgTemp: api.current.temp_c,
            maxWind: api.current.wind_kph,
            precipitation: api.current.precip_mm,
            humidity: api.current.humidity,
            rainChance: 0,
            snowChance: 0,
            condition: api.current.condition.text,
            conditionIcon: api.current.condition.icon,
            uv: api.current.uv,
            airQuality: {
              pm25: api.current.air_quality?.pm2_5 ?? null,
              pm10: api.current.air_quality?.pm10 ?? null,
              aqiIndex: currentAqi,
              level: getAirQualityLevel(currentAqi),
            },
          },
      tomorrow: tomorrowForecast
        ? {
            date: tomorrowForecast.date,
            maxTemp: tomorrowForecast.day.maxtemp_c,
            minTemp: tomorrowForecast.day.mintemp_c,
            avgTemp: tomorrowForecast.day.avgtemp_c,
            maxWind: tomorrowForecast.day.maxwind_kph,
            precipitation: tomorrowForecast.day.totalprecip_mm,
            humidity: tomorrowForecast.day.avghumidity,
            rainChance: tomorrowForecast.day.daily_chance_of_rain,
            snowChance: tomorrowForecast.day.daily_chance_of_snow,
            condition: tomorrowForecast.day.condition.text,
            conditionIcon: tomorrowForecast.day.condition.icon,
            uv: tomorrowForecast.day.uv,
            airQuality: {
              pm25: tomorrowForecast.day.air_quality?.pm2_5 ?? null,
              pm10: tomorrowForecast.day.air_quality?.pm10 ?? null,
              aqiIndex: tomorrowForecast.day.air_quality?.['us-epa-index'] ?? null,
              level: getAirQualityLevel(tomorrowForecast.day.air_quality?.['us-epa-index'] ?? null),
            },
          }
        : null,
    },
  };
}
