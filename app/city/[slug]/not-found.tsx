import Link from 'next/link';

export default function CityNotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-4">도시를 찾을 수 없습니다</h1>
      <p className="text-gray-600 mb-6">
        요청하신 도시 정보를 찾을 수 없습니다. 다른 도시를 검색해보세요.
      </p>
      <Link href="/" className="btn btn-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
