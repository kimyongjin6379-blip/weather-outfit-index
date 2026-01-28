import { CityInfo } from './types';

// 인기 도시 20개 (SEO용 사전 생성)
export const popularCities: CityInfo[] = [
  { slug: 'seoul', name: '서울', nameEn: 'Seoul', lat: 37.5665, lon: 126.978 },
  { slug: 'busan', name: '부산', nameEn: 'Busan', lat: 35.1796, lon: 129.0756 },
  { slug: 'incheon', name: '인천', nameEn: 'Incheon', lat: 37.4563, lon: 126.7052 },
  { slug: 'daegu', name: '대구', nameEn: 'Daegu', lat: 35.8714, lon: 128.6014 },
  { slug: 'daejeon', name: '대전', nameEn: 'Daejeon', lat: 36.3504, lon: 127.3845 },
  { slug: 'gwangju', name: '광주', nameEn: 'Gwangju', lat: 35.1595, lon: 126.8526 },
  { slug: 'suwon', name: '수원', nameEn: 'Suwon', lat: 37.2636, lon: 127.0286 },
  { slug: 'ulsan', name: '울산', nameEn: 'Ulsan', lat: 35.5384, lon: 129.3114 },
  { slug: 'changwon', name: '창원', nameEn: 'Changwon', lat: 35.2281, lon: 128.6811 },
  { slug: 'seongnam', name: '성남', nameEn: 'Seongnam', lat: 37.4201, lon: 127.1265 },
  { slug: 'goyang', name: '고양', nameEn: 'Goyang', lat: 37.6584, lon: 126.832 },
  { slug: 'yongin', name: '용인', nameEn: 'Yongin', lat: 37.2411, lon: 127.1775 },
  { slug: 'cheongju', name: '청주', nameEn: 'Cheongju', lat: 36.6424, lon: 127.489 },
  { slug: 'jeonju', name: '전주', nameEn: 'Jeonju', lat: 35.8242, lon: 127.148 },
  { slug: 'cheonan', name: '천안', nameEn: 'Cheonan', lat: 36.8151, lon: 127.1139 },
  { slug: 'ansan', name: '안산', nameEn: 'Ansan', lat: 37.3219, lon: 126.8309 },
  { slug: 'jeju', name: '제주', nameEn: 'Jeju', lat: 33.4996, lon: 126.5312 },
  { slug: 'pohang', name: '포항', nameEn: 'Pohang', lat: 36.019, lon: 129.3435 },
  { slug: 'gimhae', name: '김해', nameEn: 'Gimhae', lat: 35.2286, lon: 128.8894 },
  { slug: 'wonju', name: '원주', nameEn: 'Wonju', lat: 37.3422, lon: 127.9202 },
];

export function getCityBySlug(slug: string): CityInfo | undefined {
  return popularCities.find((city) => city.slug === slug);
}

export function getCityByName(name: string): CityInfo | undefined {
  return popularCities.find(
    (city) => city.name === name || city.nameEn.toLowerCase() === name.toLowerCase()
  );
}
