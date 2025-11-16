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

const HomePageV4 = () => {
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
      draggable: true,
      scrollwheel: true,
      disableDoubleClick: false,
      disableDoubleClickZoom: false,
      keyboardShortcuts: true,
      tileAnimation: true, // 부드러운 타일 전환 애니메이션
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOption);
    kakaoMapRef.current = map;

    // 마커 생성 - Minimal Black Theme
    markers.forEach((markerData) => {
      const markerPosition = new window.kakao.maps.LatLng(markerData.lat, markerData.lng);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: `
          <div style="
            width: 44px;
            height: 44px;
            background-color: #111827;
            border: 2px solid #E5E7EB;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.2s ease;
          "
          onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='#111827'"
          onmouseout="this.style.transform='scale(1)'; this.style.borderColor='#E5E7EB'"
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
            padding: 24px;
            background: white;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            border: 1px solid #E5E7EB;
          ">
            <p style="
              font-weight: 600;
              color: #111827;
              margin: 0 0 16px 0;
              font-size: 18px;
              letter-spacing: -0.5px;
              line-height: 1.4;
            ">${markerData.name}</p>
            <p style="
              color: #6B7280;
              margin: 0 0 24px 0;
              font-size: 14px;
              letter-spacing: -0.3px;
            ">모집 ${markerData.quota}명</p>
            <button style="
              width: 100%;
              background-color: #111827;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 0;
              font-size: 13px;
              cursor: pointer;
              font-weight: 500;
              letter-spacing: 0.5px;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#374151'" onmouseout="this.style.backgroundColor='#111827'">
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
    <div className="relative h-full bg-white">
      {/* Minimal Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 pointer-events-none">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 pointer-events-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="매장명, 지역명 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-0 py-4 border-b-2 border-gray-200 focus:outline-none focus:border-gray-900 bg-transparent text-gray-900 placeholder-gray-400 text-base transition-colors"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-5 border-b-2 border-gray-200 hover:border-gray-900 transition-colors"
            >
              <SlidersHorizontal size={20} className="text-gray-900" />
            </button>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
              {activeFilters.map((filter) => (
                <div
                  key={filter}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-white text-gray-900 border border-gray-900 text-sm font-medium"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => handleRemoveFilter(filter)}
                    className="hover:text-gray-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => setActiveFilters([])}
                className="px-4 py-2 bg-white text-gray-500 border border-gray-200 text-sm hover:border-gray-400 transition-colors font-medium"
              >
                전체 해제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full">
        {!mapLoaded && (
          <div className="flex items-center justify-center h-full bg-white">
            <p className="text-gray-400 text-sm tracking-wide">지도를 불러오는 중</p>
          </div>
        )}
      </div>

      {/* Minimal Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white p-12 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-start mb-12">
                <h2 className="text-3xl font-light text-gray-900 tracking-tight">필터</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-400 hover:text-gray-900 text-2xl transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="mb-12">
                <h3 className="font-medium text-gray-900 mb-6 text-sm tracking-wide uppercase">SNS 선택</h3>
                <div className="flex flex-wrap gap-3">
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
                      className={`px-6 py-3 border transition-colors font-medium ${
                        activeFilters.includes(sns)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-900 border-gray-200 hover:border-gray-900'
                      }`}
                    >
                      {sns}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h3 className="font-medium text-gray-900 mb-6 text-sm tracking-wide uppercase">매장 종류</h3>
                <div className="flex flex-wrap gap-3">
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
                      className={`px-6 py-3 border transition-colors font-medium ${
                        activeFilters.includes(category)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-900 border-gray-200 hover:border-gray-900'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-gray-900 text-white py-5 font-medium hover:bg-gray-800 transition-colors tracking-wide"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageV4;
