const RECENT_SEARCHES_KEY = 'weather_recent_searches';
const MAX_RECENT_SEARCHES = 5;
const COOKIE_CONSENT_KEY = 'cookie_consent';

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function addRecentSearch(city: string): void {
  if (typeof window === 'undefined') return;

  try {
    const searches = getRecentSearches();
    // 중복 제거 후 앞에 추가
    const filtered = searches.filter((s) => s.toLowerCase() !== city.toLowerCase());
    const updated = [city, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // localStorage 접근 실패 시 무시
  }
}

export function getCookieConsent(): boolean | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === null) return null;
    return stored === 'true';
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: boolean): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent.toString());
  } catch {
    // localStorage 접근 실패 시 무시
  }
}
