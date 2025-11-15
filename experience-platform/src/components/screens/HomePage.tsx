import { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface MarkerData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
  quota: string;
}

const HomePage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowsRef = useRef<any[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for map markers
  const markers: MarkerData[] = [
    { id: 1, name: '카페 모카', lat: 37.5665, lng: 126.9780, category: 'cafe', quota: '3/5' },
    { id: 2, name: '서울 고깃집', lat: 37.5635, lng: 126.9785, category: 'meat', quota: '2/3' },
    { id: 3, name: '일본 이자카야', lat: 37.5675, lng: 126.9795, category: 'izakaya', quota: '5/5' },
  ];

  // 카테고리별 아이콘
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cafe':
        return '☕';
      case 'meat':
        return '🥩';
      case 'izakaya':
        return '🍶';
      default:
        return '📍';
    }
  };

  // 네이버 지도 초기화
  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    // 지도 생성
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.9780),
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);
    naverMapRef.current = map;

    // 마커 생성
    markers.forEach((markerData) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(markerData.lat, markerData.lng),
        map: map,
        title: markerData.name,
        icon: {
          content: `
            <div style="
              width: 48px;
              height: 48px;
              background-color: #4A90E2;
              border: 4px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              cursor: pointer;
              transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
              ${getCategoryIcon(markerData.category)}
            </div>
          `,
          size: new window.naver.maps.Size(48, 48),
          anchor: new window.naver.maps.Point(24, 24),
        },
      });

      // InfoWindow 생성
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="
            padding: 12px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 200px;
          ">
            <p style="
              font-weight: 600;
              color: #1a202c;
              margin: 0 0 8px 0;
              font-size: 14px;
            ">${markerData.name}</p>
            <p style="
              color: #718096;
              margin: 0 0 12px 0;
              font-size: 13px;
            ">모집: ${markerData.quota}명</p>
            <button style="
              width: 100%;
              background-color: #4A90E2;
              color: white;
              padding: 8px 16px;
              border: none;
              border-radius: 6px;
              font-size: 13px;
              cursor: pointer;
              font-weight: 500;
            " onmouseover="this.style.backgroundColor='#357ABD'" onmouseout="this.style.backgroundColor='#4A90E2'">
              상세보기
            </button>
          </div>
        `,
        borderWidth: 0,
        backgroundColor: 'transparent',
        anchorSize: new window.naver.maps.Size(0, 0),
      });

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, 'click', () => {
        // 다른 InfoWindow 닫기
        infoWindowsRef.current.forEach((iw) => iw.close());

        // 현재 InfoWindow 열기
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });

      // 마커와 InfoWindow 저장
      markersRef.current.push(marker);
      infoWindowsRef.current.push(infoWindow);
    });

    // 클린업
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      infoWindowsRef.current = [];
    };
  }, []);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div className="relative h-full">
      {/* Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-white to-transparent pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
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
          <div className="mt-3 flex flex-wrap gap-2 pointer-events-auto">
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

      {/* Naver Map Container */}
      <div ref={mapRef} className="w-full h-full" />

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

export default HomePage;
