# 오늘뭐입지 - 날씨 기반 옷차림 & 운동지수

실시간 날씨와 미세먼지 정보를 바탕으로 오늘의 옷차림과 운동 적합도를 알려주는 서비스입니다.

## 기술 스택

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Supabase Edge Function
- **Hosting**: Cloudflare Pages
- **Weather API**: WeatherAPI.com

## 주요 기능

- 도시명 검색 (자동완성 지원)
- 현재 위치 기반 날씨 검색 (Geolocation)
- 실시간 날씨 정보 (기온, 체감온도, 습도, 풍속, 강수량)
- 대기질 정보 (PM2.5, PM10, AQI)
- 옷차림 추천 (상의/아우터/하의/소품)
- 운동지수 (0~100점)
- 인기 도시 20개 SEO 페이지 (ISR)

## 프로젝트 구조

```
weather-outfit-index/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈페이지
│   ├── globals.css               # 전역 스타일
│   ├── robots.ts                 # robots.txt 생성
│   ├── sitemap.ts                # sitemap.xml 생성
│   ├── city/
│   │   ├── [slug]/               # 도시별 페이지 (ISR)
│   │   └── search/               # 검색 결과 페이지
│   ├── privacy/                  # 개인정보처리방침
│   ├── terms/                    # 이용약관
│   ├── contact/                  # 문의하기
│   └── ads/                      # 광고정책
├── components/                   # React 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── LocationButton.tsx
│   ├── WeatherCard.tsx
│   ├── OutfitCard.tsx
│   ├── ExerciseCard.tsx
│   ├── AdSlot.tsx
│   ├── CookieConsentBanner.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── PopularCities.tsx
├── lib/                          # 유틸리티
│   ├── types.ts                  # TypeScript 타입
│   ├── api.ts                    # API 호출
│   ├── cities.ts                 # 도시 목록
│   ├── recommendations.ts        # 옷차림/운동지수 로직
│   └── storage.ts                # localStorage 관리
├── supabase/
│   ├── config.toml               # Supabase 설정
│   └── functions/
│       └── weather/
│           └── index.ts          # Edge Function
├── public/
├── .env.example
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
cd weather-outfit-index
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사하여 `.env.local` 파일 생성:

```bash
cp .env.example .env.local
```

환경변수 설정:

```env
# Supabase (프로젝트 생성 후 Dashboard에서 확인)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 사이트 URL (sitemap 생성용)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 애드센스 (선택)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
```

### 3. Supabase Edge Function 설정

#### Supabase CLI 설치

```bash
npm install -g supabase
```

#### Supabase 프로젝트 연결

```bash
supabase login
supabase link --project-ref your-project-ref
```

#### WeatherAPI.com API 키 설정

1. [WeatherAPI.com](https://www.weatherapi.com/)에서 무료 계정 생성
2. API 키 발급
3. Supabase Secret으로 설정:

```bash
supabase secrets set WEATHERAPI_KEY=your-weatherapi-key
```

#### Edge Function 배포

```bash
supabase functions deploy weather
```

### 4. 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 5. (선택) Supabase Edge Function 로컬 테스트

```bash
supabase start
supabase functions serve weather --env-file ./supabase/.env.local
```

`./supabase/.env.local` 파일에 `WEATHERAPI_KEY` 설정 필요

## Cloudflare Pages 배포

### 1. GitHub 레포지토리 생성 및 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/weather-outfit-index.git
git push -u origin main
```

### 2. Cloudflare Pages 프로젝트 생성

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속
2. Workers & Pages > Pages > Create a project
3. Connect to Git > GitHub 연결
4. 레포지토리 선택

### 3. 빌드 설정

- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`

### 4. 환경변수 설정

Settings > Environment Variables에서 추가:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (배포 후 실제 도메인)
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (선택)

### 5. 배포

자동 배포됨. 이후 main 브랜치에 푸시할 때마다 자동 배포.

## Supabase Edge Function 배포 (프로덕션)

### 1. Supabase 프로젝트 설정

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. New Project 생성
3. Project Settings > API에서 URL과 anon key 확인

### 2. Edge Function 배포

```bash
supabase link --project-ref your-project-ref
supabase secrets set WEATHERAPI_KEY=your-weatherapi-key
supabase functions deploy weather
```

### 3. CORS 설정 확인

Edge Function은 이미 CORS 헤더가 설정되어 있음.
필요 시 `supabase/functions/weather/index.ts`의 `corsHeaders` 수정.

## 애드센스 설정

### 1. 애드센스 승인 후

`components/AdSlot.tsx`에서 주석 처리된 실제 애드센스 코드를 활성화:

```tsx
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
  data-ad-slot={slot}
  data-ad-format={format}
  data-full-width-responsive="true"
/>
```

### 2. 애드센스 스크립트 추가

`app/layout.tsx`의 `<head>`에 추가:

```tsx
<Script
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
  crossOrigin="anonymous"
  strategy="lazyOnload"
/>
```

## 옷차림/운동지수 로직

### 체감온도 구간별 옷차림

| 체감온도 | 상의 | 아우터 | 하의 |
|---------|------|--------|------|
| ≤0°C | 기모 맨투맨, 히트텍 | 롱패딩, 두꺼운 코트 | 기모 바지 |
| 1~8°C | 니트, 맨투맨 | 패딩, 코트 | 청바지, 슬랙스 |
| 9~16°C | 긴팔 티셔츠, 가디건 | 자켓, 트렌치코트 | 청바지, 면바지 |
| 17~22°C | 긴팔 셔츠, 얇은 니트 | 가디건, 얇은 자켓 | 청바지, 면바지 |
| 23~27°C | 반팔 티셔츠 | (아침저녁 가디건) | 반바지, 면바지 |
| ≥28°C | 반팔, 민소매 | 없음 | 반바지, 린넨 |

### 운동지수 페널티

| 조건 | 페널티 |
|------|--------|
| 비/눈 | -30~50 |
| 강풍 (>30km/h) | -15~35 |
| 극한 기온 | -15~40 |
| 대기질 나쁨 | -10~80 |

## 라이선스

MIT License

## 문의

문제가 있거나 개선 제안이 있으시면 Issue를 등록해 주세요.
