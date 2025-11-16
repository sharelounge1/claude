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

const HomePageV5 = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowsRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  // 카카오 지도 SDK 동적 로드
  useEffect(() => {
    const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_APP_KEY || '233d6ee177d8f2809ac5c0af8f819b28';

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setMapLoaded(true);
        });
      }
    };

    script.onerror = (error) => {
      console.error('❌ 카카오 지도 SDK 로드 실패:', error);
    };

    document.head.appendChild(script);
  }, []);

  // 카카오 지도 초기화
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !window.kakao) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOption);
    kakaoMapRef.current = map;

    // 마커 생성 - Accessibility Green Theme
    markers.forEach((markerData) => {
      const markerPosition = new window.kakao.maps.LatLng(markerData.lat, markerData.lng);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: `
          <div style="
            width: 64px;
            height: 64px;
            background-color: #10B981;
            border: 4px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: all 0.2s;
          "
          onmouseover="this.style.transform='scale(1.1)'; this.style.backgroundColor='#059669'"
          onmouseout="this.style.transform='scale(1)'; this.style.backgroundColor='#10B981'"
          id="marker-${markerData.id}">
            ${getCategoryIcon(markerData.category)}
          </div>
        `,
        yAnchor: 0.5,
      });

      customOverlay.setMap(map);

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            min-width: 260px;
            border: 3px solid #10B981;
          ">
            <p style="
              font-weight: 700;
              color: #111827;
              margin: 0 0 12px 0;
              font-size: 18px;
              line-height: 1.4;
            ">${markerData.name}</p>
            <p style="
              color: #4B5563;
              margin: 0 0 16px 0;
              font-size: 16px;
              font-weight: 600;
            ">모집: ${markerData.quota}명</p>
            <button style="
              width: 100%;
              background-color: #10B981;
              color: white;
              padding: 16px 24px;
              border: none;
              border-radius: 10px;
              font-size: 16px;
              cursor: pointer;
              font-weight: 700;
              box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
              transition: all 0.2s;
            " onmouseover="this.style.backgroundColor='#059669'; this.style.transform='translateY(-2px)'" onmouseout="this.style.backgroundColor='#10B981'; this.style.transform='translateY(0)'">
              상세보기
            </button>
          </div>
        `,
        removable: true,
      });

      setTimeout(() => {
        const markerElement = document.getElementById(`marker-${markerData.id}`);
        if (markerElement) {
          markerElement.addEventListener('click', () => {
            infoWindowsRef.current.forEach((iw) => iw.close());
            infoWindow.open(map, { lat: markerData.lat, lng: markerData.lng } as any);
          });
        }
      }, 100);

      markersRef.current.push(customOverlay);
      infoWindowsRef.current.push(infoWindow);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      infoWindowsRef.current = [];
    };
  }, [mapLoaded]);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div className="relative h-full bg-gray-50">
      {/* Accessibility Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-5 bg-white shadow-md pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600" size={26} />
            <input
              type="text"
              placeholder="매장명, 지역명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-2xl border-3 border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-500 shadow-sm bg-white text-gray-900 text-lg font-semibold placeholder-gray-500"
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-6 py-5 rounded-2xl bg-green-500 hover:bg-green-600 transition-colors shadow-md border-3 border-green-600"
          >
            <SlidersHorizontal size={28} className="text-white" />
          </button>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 pointer-events-auto">
            {activeFilters.map((filter) => (
              <div
                key={filter}
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-xl text-base font-bold shadow-md"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="hover:bg-green-600 rounded-full p-1.5 transition-colors text-xl font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveFilters([])}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl text-base hover:bg-gray-400 transition-colors font-bold shadow-md"
            >
              전체 해제
            </button>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full">
        {!mapLoaded && (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-700 text-xl font-bold">지도를 불러오는 중...</p>
          </div>
        )}
      </div>

      {/* Bottom Fixed Filter Button */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-full bg-green-500 text-white py-6 rounded-2xl font-bold text-xl hover:bg-green-600 transition-colors shadow-2xl pointer-events-auto border-3 border-green-600"
        >
          필터 열기
        </button>
      </div>

      {/* Accessibility Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">필터</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-600 hover:text-gray-900 text-4xl font-bold w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5 text-xl">SNS 선택</h3>
              <div className="flex flex-wrap gap-4">
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
                    className={`px-8 py-4 rounded-xl border-3 transition-colors font-bold text-lg ${
                      activeFilters.includes(sns)
                        ? 'bg-green-500 text-white border-green-600 shadow-lg'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {sns}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5 text-xl">매장 종류</h3>
              <div className="flex flex-wrap gap-4">
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
                    className={`px-8 py-4 rounded-xl border-3 transition-colors font-bold text-lg ${
                      activeFilters.includes(category)
                        ? 'bg-green-500 text-white border-green-600 shadow-lg'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-green-500 text-white py-6 rounded-2xl font-bold text-xl hover:bg-green-600 transition-colors shadow-xl border-3 border-green-600"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageV5;
