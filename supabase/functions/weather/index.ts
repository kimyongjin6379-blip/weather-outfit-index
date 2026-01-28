// Supabase Edge Function: 날씨 API 호출
// 환경변수: WEATHERAPI_KEY

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const WEATHERAPI_KEY = Deno.env.get('WEATHERAPI_KEY') || '';
const WEATHERAPI_BASE = 'https://api.weatherapi.com/v1';

// 간단한 rate limit (IP 기준, 메모리 캐시)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1분
const RATE_LIMIT_MAX = 30; // 1분에 30회

// 응답 캐시 (5분)
const responseCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5분

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

function getCacheKey(query: string): string {
  return `weather:${query}`;
}

function getFromCache(key: string): unknown | null {
  const entry = responseCache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_TTL) {
    responseCache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache(key: string, data: unknown): void {
  responseCache.set(key, { data, timestamp: Date.now() });

  // 캐시 크기 제한 (최대 100개)
  if (responseCache.size > 100) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) responseCache.delete(firstKey);
  }
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // GET 요청만 허용
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Rate limit 체크
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(clientIp)) {
    return new Response(JSON.stringify({ error: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // URL 파라미터 파싱
  const url = new URL(req.url);
  const city = url.searchParams.get('city');
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');

  let query: string;
  if (city) {
    query = city;
  } else if (lat && lon) {
    query = `${lat},${lon}`;
  } else {
    return new Response(JSON.stringify({ error: '도시명(city) 또는 위경도(lat, lon)가 필요합니다.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // 캐시 확인
  const cacheKey = getCacheKey(query);
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'HIT',
      },
    });
  }

  // WeatherAPI.com 호출
  try {
    const apiUrl = `${WEATHERAPI_BASE}/forecast.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(query)}&days=2&aqi=yes&lang=ko`;

    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || '날씨 정보를 가져오는데 실패했습니다.';

      // WeatherAPI 에러 코드에 따른 처리
      if (apiResponse.status === 400) {
        return new Response(JSON.stringify({ error: '도시를 찾을 수 없습니다. 다른 검색어를 시도해보세요.' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: apiResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await apiResponse.json();

    // 캐시 저장
    setCache(cacheKey, data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return new Response(JSON.stringify({ error: '날씨 정보를 가져오는 중 오류가 발생했습니다.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
