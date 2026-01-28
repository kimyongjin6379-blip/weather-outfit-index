import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const GA_ID = 'G-FE5VVTFYSM';
const ADSENSE_ID = 'ca-pub-1183326108611020';

export const metadata: Metadata = {
  title: {
    default: '오늘뭐입지 - 날씨 기반 옷차림 & 운동지수',
    template: '%s | 오늘뭐입지',
  },
  description:
    '실시간 날씨와 미세먼지 정보를 바탕으로 오늘의 옷차림과 운동 적합도를 알려드립니다. 기온, 강수, 대기질을 고려한 맞춤 추천!',
  keywords: ['날씨', '옷차림', '미세먼지', '운동지수', '기온', '코디 추천'],
  authors: [{ name: '오늘뭐입지' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '오늘뭐입지',
    title: '오늘뭐입지 - 날씨 기반 옷차림 & 운동지수',
    description:
      '실시간 날씨와 미세먼지 정보를 바탕으로 오늘의 옷차림과 운동 적합도를 알려드립니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </div>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
