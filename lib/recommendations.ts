import { WeatherData, OutfitRecommendation, ExerciseIndex, AirQualityLevel } from './types';

// 체감온도 구간별 옷차림 기본 추천
const OUTFIT_BY_TEMP: Record<string, { top: string; outer: string; bottom: string; accessory: string }> = {
  freezing: {
    top: '기모 맨투맨, 히트텍',
    outer: '롱패딩, 두꺼운 코트',
    bottom: '기모 바지, 방한 레깅스',
    accessory: '목도리, 장갑, 귀마개',
  },
  cold: {
    top: '니트, 맨투맨',
    outer: '패딩, 두꺼운 코트',
    bottom: '청바지, 슬랙스',
    accessory: '목도리, 장갑',
  },
  chilly: {
    top: '긴팔 티셔츠, 가디건',
    outer: '자켓, 트렌치코트',
    bottom: '청바지, 면바지',
    accessory: '얇은 스카프',
  },
  mild: {
    top: '긴팔 셔츠, 얇은 니트',
    outer: '가디건, 얇은 자켓',
    bottom: '청바지, 면바지',
    accessory: '없음',
  },
  warm: {
    top: '반팔 티셔츠, 얇은 긴팔',
    outer: '없음 (아침저녁엔 얇은 가디건)',
    bottom: '반바지, 면바지',
    accessory: '없음',
  },
  hot: {
    top: '반팔 티셔츠, 민소매',
    outer: '없음',
    bottom: '반바지, 린넨 바지',
    accessory: '모자, 선글라스',
  },
};

function getTemperatureCategory(feelsLike: number): string {
  if (feelsLike <= 0) return 'freezing';
  if (feelsLike <= 8) return 'cold';
  if (feelsLike <= 16) return 'chilly';
  if (feelsLike <= 22) return 'mild';
  if (feelsLike <= 27) return 'warm';
  return 'hot';
}

function getAirQualityPenalty(level: AirQualityLevel): number {
  switch (level) {
    case 'good':
      return 0;
    case 'moderate':
      return 10;
    case 'unhealthy-sensitive':
      return 25;
    case 'unhealthy':
      return 40;
    case 'very-unhealthy':
      return 60;
    case 'hazardous':
      return 80;
    default:
      return 0;
  }
}

function getAirQualityLevelKorean(level: AirQualityLevel): string {
  switch (level) {
    case 'good':
      return '좋음';
    case 'moderate':
      return '보통';
    case 'unhealthy-sensitive':
      return '민감군 영향';
    case 'unhealthy':
      return '나쁨';
    case 'very-unhealthy':
      return '매우 나쁨';
    case 'hazardous':
      return '위험';
    default:
      return '정보 없음';
  }
}

export function getOutfitRecommendation(weather: WeatherData): OutfitRecommendation {
  const feelsLike = weather.current.feelsLike;
  const precipitation = weather.current.precipitation;
  const windSpeed = weather.current.windSpeed;
  const airQuality = weather.airQuality.level;

  // 기본 옷차림 가져오기
  let tempCategory = getTemperatureCategory(feelsLike);

  // 바람이 강하면 한 단계 따뜻하게
  if (windSpeed > 30 && tempCategory !== 'freezing') {
    const categories = ['hot', 'warm', 'mild', 'chilly', 'cold', 'freezing'];
    const currentIndex = categories.indexOf(tempCategory);
    if (currentIndex < categories.length - 1) {
      tempCategory = categories[currentIndex + 1];
    }
  }

  const baseOutfit = OUTFIT_BY_TEMP[tempCategory];
  const outfit: OutfitRecommendation = { ...baseOutfit, summary: '' };

  // 비/눈 대비
  const hasRain = precipitation > 0 || weather.current.condition.includes('비') || weather.current.condition.includes('Rain');
  const hasSnow = weather.current.condition.includes('눈') || weather.current.condition.includes('Snow');

  if (hasRain || hasSnow) {
    outfit.accessory = outfit.accessory === '없음'
      ? '우산, 방수 신발'
      : outfit.accessory + ', 우산';
    outfit.outer = outfit.outer.includes('없음')
      ? '방수 자켓'
      : outfit.outer + ' (방수 추천)';
  }

  // 대기질 나쁘면 마스크
  if (airQuality === 'unhealthy' || airQuality === 'very-unhealthy' || airQuality === 'hazardous') {
    outfit.accessory = outfit.accessory === '없음'
      ? 'KF94 마스크'
      : outfit.accessory + ', KF94 마스크';
  } else if (airQuality === 'unhealthy-sensitive') {
    outfit.accessory = outfit.accessory === '없음'
      ? '마스크 (민감자)'
      : outfit.accessory + ', 마스크 (민감자)';
  }

  // 요약 문장 생성
  const summaryParts: string[] = [];

  if (feelsLike <= 0) summaryParts.push('매우 추운 날씨, 방한 필수');
  else if (feelsLike <= 8) summaryParts.push('쌀쌀한 날씨, 따뜻하게 입으세요');
  else if (feelsLike <= 16) summaryParts.push('선선한 날씨, 겉옷 챙기세요');
  else if (feelsLike <= 22) summaryParts.push('외출하기 좋은 날씨');
  else if (feelsLike <= 27) summaryParts.push('따뜻한 날씨, 가볍게 입으세요');
  else summaryParts.push('더운 날씨, 시원하게 입으세요');

  if (hasRain) summaryParts.push('우산 필수');
  if (hasSnow) summaryParts.push('눈 대비');
  if (windSpeed > 40) summaryParts.push('강풍 주의');
  if (airQuality === 'unhealthy' || airQuality === 'very-unhealthy' || airQuality === 'hazardous') {
    summaryParts.push('대기질 나쁨, 마스크 착용');
  }

  outfit.summary = summaryParts.join('. ') + '.';

  return outfit;
}

export function getExerciseIndex(weather: WeatherData): ExerciseIndex {
  let score = 100;
  const penalties: string[] = [];

  const feelsLike = weather.current.feelsLike;
  const precipitation = weather.current.precipitation;
  const windSpeed = weather.current.windSpeed;
  const airQuality = weather.airQuality.level;
  const condition = weather.current.condition.toLowerCase();

  // 기온 페널티
  if (feelsLike < -10) {
    score -= 40;
    penalties.push('극심한 추위');
  } else if (feelsLike < 0) {
    score -= 25;
    penalties.push('추운 날씨');
  } else if (feelsLike < 5) {
    score -= 15;
    penalties.push('쌀쌀한 기온');
  } else if (feelsLike > 35) {
    score -= 40;
    penalties.push('극심한 더위');
  } else if (feelsLike > 32) {
    score -= 30;
    penalties.push('매우 더운 날씨');
  } else if (feelsLike > 28) {
    score -= 15;
    penalties.push('더운 날씨');
  }

  // 강수 페널티
  if (precipitation > 10 || condition.includes('heavy rain') || condition.includes('폭우')) {
    score -= 50;
    penalties.push('강한 비');
  } else if (precipitation > 0 || condition.includes('rain') || condition.includes('비')) {
    score -= 30;
    penalties.push('비 예보');
  }

  if (condition.includes('snow') || condition.includes('눈')) {
    score -= 35;
    penalties.push('눈 예보');
  }

  // 바람 페널티
  if (windSpeed > 50) {
    score -= 35;
    penalties.push('강풍');
  } else if (windSpeed > 30) {
    score -= 15;
    penalties.push('바람');
  }

  // 대기질 페널티
  const aqPenalty = getAirQualityPenalty(airQuality);
  if (aqPenalty > 0) {
    score -= aqPenalty;
    penalties.push(`대기질 ${getAirQualityLevelKorean(airQuality)}`);
  }

  // 최소 0점
  score = Math.max(0, score);

  // 라벨 결정
  let label: '권장' | '주의' | '비권장';
  let baseComment: string;

  if (score >= 70) {
    label = '권장';
    baseComment = '야외 운동하기 좋은 날씨입니다.';
  } else if (score >= 40) {
    label = '주의';
    baseComment = '운동 시 주의가 필요합니다.';
  } else {
    label = '비권장';
    baseComment = '실내 운동을 권장합니다.';
  }

  // 페널티 이유 추가
  const comment = penalties.length > 0
    ? `${baseComment} (${penalties.join(', ')})`
    : baseComment;

  return { score, label, comment };
}

export function getAirQualityLevel(aqiIndex: number | null): AirQualityLevel {
  if (aqiIndex === null) return 'unknown';
  // US EPA 기준
  if (aqiIndex === 1) return 'good';
  if (aqiIndex === 2) return 'moderate';
  if (aqiIndex === 3) return 'unhealthy-sensitive';
  if (aqiIndex === 4) return 'unhealthy';
  if (aqiIndex === 5) return 'very-unhealthy';
  if (aqiIndex === 6) return 'hazardous';
  return 'unknown';
}
