import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for map markers
  const markers = [
    { id: 1, name: '카페 모카', lat: 37.5665, lng: 126.9780, category: 'cafe', quota: '3/5' },
    { id: 2, name: '서울 고깃집', lat: 37.5635, lng: 126.9785, category: 'meat', quota: '2/3' },
    { id: 3, name: '일본 이자카야', lat: 37.5675, lng: 126.9795, category: 'izakaya', quota: '5/5' },
  ];

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div className="relative h-full">
      {/* Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-white to-transparent">
        <div className="flex gap-2">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="매장명, 지역명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm bg-white"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <SlidersHorizontal size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div
                key={filter}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-full text-sm"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveFilters([])}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
            >
              전체 해제
            </button>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="w-full h-full bg-gray-100">
        {/* Placeholder for Naver Map */}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>

          {/* Mock Map Markers */}
          <div className="relative z-10 w-full h-full">
            {markers.map((marker) => (
              <div
                key={marker.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${50 + (marker.id - 2) * 15}%`,
                  top: `${50 + (marker.id - 2) * 10}%`
                }}
              >
                {/* Marker Pin */}
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center border-4 border-white transform group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-xs">
                      {marker.category === 'cafe' ? '☕' : marker.category === 'meat' ? '🥩' : '🍶'}
                    </span>
                  </div>

                  {/* Info Card on Hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                    <div className="bg-white rounded-lg shadow-xl p-3 w-48 border border-gray-100">
                      <p className="font-semibold text-gray-900 mb-1">{marker.name}</p>
                      <p className="text-sm text-gray-600">모집: {marker.quota}명</p>
                      <button className="mt-2 w-full bg-primary text-white py-1.5 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        상세보기
                      </button>
                    </div>
                    <div className="w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-xl">
              <MapPin className="mx-auto mb-2 text-primary" size={48} />
              <p className="text-gray-600 font-medium">네이버 지도 영역</p>
              <p className="text-sm text-gray-500 mt-1">실제 구현 시 Naver Maps API 연동</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">필터</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* SNS Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">SNS 선택</h3>
              <div className="flex flex-wrap gap-2">
                {['블로그', '인스타그램', '유튜브'].map((sns) => (
                  <button
                    key={sns}
                    onClick={() => {
                      if (activeFilters.includes(sns)) {
                        setActiveFilters(activeFilters.filter((f) => f !== sns));
                      } else {
                        setActiveFilters([...activeFilters, sns]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      activeFilters.includes(sns)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {sns}
                  </button>
                ))}
              </div>
            </div>

            {/* Store Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">매장 종류</h3>
              <div className="flex flex-wrap gap-2">
                {['카페', '밥집', '고깃집', '술집', '이자카야', '분식', '베이커리', '디저트', '한식당', '중식당', '일식당', '양식당'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      if (activeFilters.includes(category)) {
                        setActiveFilters(activeFilters.filter((f) => f !== category));
                      } else {
                        setActiveFilters([...activeFilters, category]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      activeFilters.includes(category)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder icon component
const MapPin = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default HomePage;
