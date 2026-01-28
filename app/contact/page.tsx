import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의하기',
  description: '오늘뭐입지 서비스에 대한 문의사항을 남겨주세요.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <article className="prose card">
        <h1>문의하기</h1>

        <p>
          오늘뭐입지 서비스를 이용해 주셔서 감사합니다. 서비스 이용 중 궁금한 점이나 건의사항이
          있으시면 아래 방법으로 연락해 주세요.
        </p>

        <h2>문의 방법</h2>

        <h3>이메일 문의</h3>
        <p>
          일반적인 문의사항, 서비스 개선 제안, 버그 신고 등은 이메일로 보내주세요.
        </p>
        <p>
          <strong>이메일:</strong> contact@example.com
        </p>
        <p className="text-sm text-gray-500">
          * 답변은 영업일 기준 1~3일 이내에 드리도록 하겠습니다.
        </p>

        <h3>자주 묻는 질문</h3>
        <p>문의 전에 아래 자주 묻는 질문을 확인해 주세요.</p>

        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Q. 날씨 정보는 어디서 제공받나요?</p>
            <p className="text-gray-600 mt-1">
              A. 날씨 데이터는 WeatherAPI.com에서 제공받고 있습니다. 실시간으로 업데이트되며,
              대기질 정보(PM2.5, PM10)도 함께 제공됩니다.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Q. 현재 위치 검색이 작동하지 않아요.</p>
            <p className="text-gray-600 mt-1">
              A. 브라우저에서 위치 권한을 허용해야 합니다. 브라우저 주소창 왼쪽의 자물쇠/정보
              아이콘을 클릭하여 위치 권한을 허용해 주세요.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Q. 옷차림 추천 기준은 무엇인가요?</p>
            <p className="text-gray-600 mt-1">
              A. 체감온도를 기준으로 6단계(영하, 추움, 쌀쌀, 선선, 따뜻, 더움)로 나누어 추천합니다.
              또한 비/눈 예보, 풍속, 대기질 상황도 고려됩니다.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Q. 운동지수는 어떻게 계산되나요?</p>
            <p className="text-gray-600 mt-1">
              A. 기본 100점에서 기온, 강수, 바람, 대기질에 따라 페널티를 적용합니다. 70점 이상은
              운동 권장, 40~69점은 주의, 40점 미만은 실내 운동 권장입니다.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Q. 광고를 끌 수 있나요?</p>
            <p className="text-gray-600 mt-1">
              A. 페이지 하단의 쿠키 동의 배너에서 &quot;거부&quot;를 선택하시면 맞춤형 광고가
              표시되지 않습니다. 다만, 기본 광고 영역은 유지될 수 있습니다.
            </p>
          </div>
        </div>

        <h2>제휴 및 광고 문의</h2>
        <p>
          광고 게재, 제휴, 협업 관련 문의는 별도로 연락 부탁드립니다.
        </p>
        <p>
          <strong>이메일:</strong> partnership@example.com
        </p>

        <h2>신고</h2>
        <p>
          부적절한 콘텐츠나 서비스 오류를 발견하셨다면 신고해 주세요. 빠르게 확인하고
          조치하겠습니다.
        </p>
        <ul>
          <li>날씨 정보 오류</li>
          <li>서비스 버그/오류</li>
          <li>부적절한 광고</li>
          <li>기타 문제 사항</li>
        </ul>

        <h2>운영 시간</h2>
        <p>
          서비스는 24시간 운영되며, 문의 답변은 평일 오전 10시 ~ 오후 6시에 처리됩니다. 주말 및
          공휴일에 접수된 문의는 다음 영업일에 답변드립니다.
        </p>
      </article>
    </div>
  );
}
