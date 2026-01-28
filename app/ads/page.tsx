import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '광고정책',
  description: '오늘뭐입지 서비스의 광고 및 쿠키 정책입니다.',
};

export default function AdsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <article className="prose card">
        <h1>광고정책</h1>
        <p className="text-gray-500">최종 수정일: 2024년 1월 1일</p>

        <p>
          오늘뭐입지(이하 &quot;서비스&quot;)는 무료 서비스 운영을 위해 광고를 게재하고 있습니다. 본
          문서는 서비스의 광고 정책 및 관련 쿠키 사용에 대해 설명합니다.
        </p>

        <h2>1. 광고 서비스 제공자</h2>
        <p>
          서비스는 Google AdSense를 통해 광고를 제공합니다. Google AdSense는 Google LLC가 제공하는
          온라인 광고 서비스입니다.
        </p>
        <ul>
          <li>
            <strong>제공자:</strong> Google LLC
          </li>
          <li>
            <strong>위치:</strong> 미국
          </li>
          <li>
            <strong>개인정보처리방침:</strong>{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              Google 개인정보처리방침
            </a>
          </li>
        </ul>

        <h2>2. 광고 유형</h2>
        <p>서비스에는 다음과 같은 유형의 광고가 게재될 수 있습니다:</p>
        <ul>
          <li>
            <strong>디스플레이 광고:</strong> 이미지, 텍스트 또는 동영상 형태의 배너 광고
          </li>
          <li>
            <strong>반응형 광고:</strong> 화면 크기에 따라 자동으로 조절되는 광고
          </li>
          <li>
            <strong>인피드 광고:</strong> 콘텐츠 사이에 자연스럽게 배치되는 광고
          </li>
        </ul>

        <h2>3. 광고 위치</h2>
        <p>광고는 다음 위치에 표시됩니다:</p>
        <ul>
          <li>페이지 상단 배너</li>
          <li>콘텐츠 중간</li>
          <li>페이지 하단</li>
          <li>사이드바 (데스크톱 환경)</li>
        </ul>

        <h2>4. 쿠키 및 추적 기술</h2>
        <p>광고 서비스를 위해 다음과 같은 기술이 사용될 수 있습니다:</p>

        <h3>4.1 쿠키</h3>
        <p>
          쿠키는 웹사이트가 사용자의 브라우저에 저장하는 작은 텍스트 파일입니다. 광고 관련 쿠키는
          다음 목적으로 사용됩니다:
        </p>
        <ul>
          <li>광고 표시 빈도 조절</li>
          <li>사용자의 관심사에 맞는 광고 제공</li>
          <li>광고 성과 측정</li>
        </ul>

        <h3>4.2 사용되는 쿠키 유형</h3>
        <table>
          <thead>
            <tr>
              <th>쿠키 유형</th>
              <th>목적</th>
              <th>보관 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>필수 쿠키</td>
              <td>서비스 기본 기능 (광고 동의 상태 저장)</td>
              <td>1년</td>
            </tr>
            <tr>
              <td>광고 쿠키</td>
              <td>맞춤형 광고 제공</td>
              <td>Google 정책에 따름</td>
            </tr>
            <tr>
              <td>분석 쿠키</td>
              <td>광고 성과 측정</td>
              <td>Google 정책에 따름</td>
            </tr>
          </tbody>
        </table>

        <h2>5. 광고 동의</h2>
        <p>
          서비스 최초 방문 시 광고 동의 배너가 표시됩니다. 사용자는 다음 중 하나를 선택할 수
          있습니다:
        </p>
        <ul>
          <li>
            <strong>동의:</strong> 맞춤형 광고가 표시됩니다. Google의 광고 쿠키가 설정됩니다.
          </li>
          <li>
            <strong>거부:</strong> 맞춤형 광고가 표시되지 않습니다. 기본 광고 영역은 유지될 수
            있습니다.
          </li>
        </ul>

        <h3>5.1 동의 철회</h3>
        <p>광고 동의는 언제든지 철회할 수 있습니다:</p>
        <ol>
          <li>브라우저의 쿠키 삭제 기능 사용</li>
          <li>브라우저 개인정보 설정에서 쿠키 차단</li>
          <li>
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              Google 광고 설정
            </a>
            에서 개인화 광고 비활성화
          </li>
        </ol>

        <h2>6. 아동 보호</h2>
        <p>
          서비스는 13세 미만 아동을 대상으로 한 광고를 의도적으로 게재하지 않습니다. Google
          AdSense의 아동 보호 정책이 적용됩니다.
        </p>

        <h2>7. 광고 콘텐츠</h2>
        <p>
          광고 콘텐츠는 Google AdSense 네트워크를 통해 제공되며, 서비스는 개별 광고 내용에 대해
          직접적인 통제권을 갖지 않습니다. 다만, 다음 카테고리의 광고는 제한됩니다:
        </p>
        <ul>
          <li>성인 콘텐츠</li>
          <li>도박</li>
          <li>불법 제품/서비스</li>
          <li>폭력적이거나 혐오스러운 콘텐츠</li>
        </ul>

        <h2>8. 부적절한 광고 신고</h2>
        <p>
          부적절하거나 불쾌한 광고를 발견하신 경우{' '}
          <a href="/contact" className="text-blue-600">
            문의하기
          </a>
          를 통해 신고해 주세요. 검토 후 Google에 보고하여 조치를 요청하겠습니다.
        </p>

        <h2>9. 광고 수익</h2>
        <p>
          광고 수익은 서비스 운영, 서버 유지, 기능 개선 등에 사용됩니다. 무료 서비스 제공을 위해
          광고 게재에 대한 이해를 부탁드립니다.
        </p>

        <h2>10. 정책 변경</h2>
        <p>
          광고 정책은 필요에 따라 변경될 수 있습니다. 중요한 변경 사항은 서비스 내 공지를 통해
          알려드립니다.
        </p>

        <h2>11. 문의</h2>
        <p>
          광고 정책에 대한 문의사항은{' '}
          <a href="/contact" className="text-blue-600">
            문의하기
          </a>{' '}
          페이지를 통해 연락해 주세요.
        </p>
      </article>
    </div>
  );
}
