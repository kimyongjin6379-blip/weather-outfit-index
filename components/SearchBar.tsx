'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getRecentSearches, addRecentSearch } from '@/lib/storage';
import { popularCities } from '@/lib/cities';

interface SearchBarProps {
  onSearch?: (city: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = '도시명을 입력하세요 (예: 서울, Seoul)' }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    // 클릭 외부 감지
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      // 도시 목록에서 필터링
      const filtered = popularCities
        .filter(
          (city) =>
            city.name.includes(value) || city.nameEn.toLowerCase().includes(value.toLowerCase())
        )
        .map((city) => city.name);

      // 최근 검색에서 필터링
      const recentFiltered = recentSearches.filter(
        (s) => s.includes(value) || s.toLowerCase().includes(value.toLowerCase())
      );

      // 중복 제거 후 합치기
      const combined = [...new Set([...recentFiltered, ...filtered])].slice(0, 6);
      setSuggestions(combined);
      setShowSuggestions(true);
    } else {
      setSuggestions(recentSearches);
      setShowSuggestions(recentSearches.length > 0);
    }
  };

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    addRecentSearch(trimmed);
    setRecentSearches(getRecentSearches());
    setShowSuggestions(false);
    setQuery('');

    if (onSearch) {
      onSearch(trimmed);
    } else {
      // 도시 슬러그 찾기
      const city = popularCities.find(
        (c) => c.name === trimmed || c.nameEn.toLowerCase() === trimmed.toLowerCase()
      );
      if (city) {
        router.push(`/city/${city.slug}`);
      } else {
        // 알 수 없는 도시는 쿼리 파라미터로 전달
        router.push(`/city/search?q=${encodeURIComponent(trimmed)}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const handleFocus = () => {
    if (query.trim()) {
      setShowSuggestions(suggestions.length > 0);
    } else if (recentSearches.length > 0) {
      setSuggestions(recentSearches);
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            className="input flex-1"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary">
            검색
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {!query.trim() && recentSearches.length > 0 && (
            <li className="px-4 py-2 text-xs text-gray-500 bg-gray-50">최근 검색</li>
          )}
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
