import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityWeatherClient } from './CityWeatherClient';
import { popularCities, getCityBySlug } from '@/lib/cities';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

// 인기 도시 20개 사전 생성
export function generateStaticParams() {
  return popularCities.map((city) => ({
    slug: city.slug,
  }));
}

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return {
      title: '도시를 찾을 수 없습니다',
    };
  }

  const title = `${city.name} 날씨 - 오늘의 옷차림 & 운동지수`;
  const description = `${city.name}(${city.nameEn}) 실시간 날씨, 미세먼지, 옷차림 추천, 운동지수를 확인하세요. 기온, 체감온도, 대기질 정보 제공.`;

  return {
    title,
    description,
    keywords: [
      `${city.name} 날씨`,
      `${city.name} 미세먼지`,
      `${city.name} 옷차림`,
      `${city.nameEn} weather`,
      '오늘 뭐 입지',
      '운동지수',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
    },
    alternates: {
      canonical: `/city/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CityWeatherClient city={city} />

      {/* SEO용 정적 콘텐츠 */}
      <section className="card mt-8">
        <h2 className="text-xl font-semibold mb-4">{city.name} 날씨 정보</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            <strong>{city.name}</strong>의 실시간 날씨, 기온, 체감온도, 습도, 풍속, 강수량 정보를
            확인하세요. 미세먼지(PM2.5, PM10) 농도와 대기질 지수도 함께 제공됩니다.
          </p>
          <p>
            현재 날씨 상황에 맞는 <strong>옷차림 추천</strong>을 받아보세요. 상의, 아우터, 하의,
            소품까지 체감온도와 날씨 조건을 고려하여 추천해드립니다.
          </p>
          <p>
            <strong>운동지수</strong>는 기온, 강수, 바람, 대기질을 종합적으로 고려하여 0~100점으로
            표시됩니다. 70점 이상이면 야외 운동 권장, 40~69점은 주의, 40점 미만은 실내 운동을
            권장합니다.
          </p>

          <h3 className="font-semibold text-gray-800 mt-6">{city.name} 날씨 특징</h3>
          <p>
            {city.name}은(는) 대한민국에 위치하며, 사계절이 뚜렷한 온대 기후를 보입니다. 여름에는
            고온다습하고, 겨울에는 건조하고 추운 날씨가 특징입니다. 미세먼지는 봄철에 특히 높아질 수
            있으니 대기질 정보를 함께 확인하시기 바랍니다.
          </p>

          <h3 className="font-semibold text-gray-800 mt-6">계절별 옷차림 가이드</h3>
          <ul className="list-disc space-y-1">
            <li>
              <strong>봄 (3~5월):</strong> 일교차가 크므로 가벼운 아우터 필수. 미세먼지 주의.
            </li>
            <li>
              <strong>여름 (6~8월):</strong> 반팔, 반바지 위주. 장마철 우산 필수.
            </li>
            <li>
              <strong>가을 (9~11월):</strong> 자켓, 가디건 준비. 아침저녁 쌀쌀함.
            </li>
            <li>
              <strong>겨울 (12~2월):</strong> 패딩, 두꺼운 코트, 방한 소품 필수.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
