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

const HomePageV2 = () => {
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

    // 마커 생성 - Luxury Gold Theme
    markers.forEach((markerData) => {
      const markerPosition = new window.kakao.maps.LatLng(markerData.lat, markerData.lng);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: `
          <div style="
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #D4AF37 0%, #F4E5C3 100%);
            border: 3px solid #CD7F32;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.2);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          "
          onmouseover="this.style.transform='scale(1.15) translateY(-4px)'; this.style.boxShadow='0 12px 28px rgba(212, 175, 55, 0.5), 0 0 30px rgba(212, 175, 55, 0.3)'"
          onmouseout="this.style.transform='scale(1) translateY(0)'; this.style.boxShadow='0 8px 20px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.2)'"
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
            padding: 18px;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border-radius: 12px;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 175, 55, 0.3);
            min-width: 240px;
          ">
            <p style="
              font-weight: 700;
              color: #D4AF37;
              margin: 0 0 10px 0;
              font-size: 16px;
              letter-spacing: 0.5px;
            ">${markerData.name}</p>
            <p style="
              color: #C0C0C0;
              margin: 0 0 16px 0;
              font-size: 14px;
            ">모집: ${markerData.quota}명</p>
            <button style="
              width: 100%;
              background: linear-gradient(135deg, #D4AF37 0%, #CD7F32 100%);
              color: #1a1a1a;
              padding: 12px 20px;
              border: none;
              border-radius: 8px;
              font-size: 14px;
              cursor: pointer;
              font-weight: 700;
              letter-spacing: 1px;
              box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
              transition: all 0.3s;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(212, 175, 55, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(212, 175, 55, 0.3)'">
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
    <div className="relative h-full bg-gray-900">
      {/* Luxury Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-amber-400" size={22} />
            <input
              type="text"
              placeholder="매장명, 지역명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-amber-600/50 bg-black/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xl text-white placeholder-gray-400 text-lg"
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-4 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 transition-all shadow-2xl border-2 border-amber-500/50"
          >
            <SlidersHorizontal size={26} className="text-black" />
          </button>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 pointer-events-auto">
            {activeFilters.map((filter) => (
              <div
                key={filter}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-800 text-black rounded-full text-sm font-semibold shadow-lg"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="hover:bg-black/20 rounded-full p-1 transition-colors text-lg font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveFilters([])}
              className="px-5 py-2.5 bg-gray-800 text-amber-400 rounded-full text-sm hover:bg-gray-700 transition-colors font-semibold shadow-lg border border-amber-600/30"
            >
              전체 해제
            </button>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full">
        {!mapLoaded && (
          <div className="flex items-center justify-center h-full bg-black">
            <p className="text-amber-400 text-lg font-semibold">지도를 불러오는 중...</p>
          </div>
        )}
      </div>

      {/* Luxury Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl p-8 max-h-[80vh] overflow-y-auto border-t-2 border-amber-600/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-amber-400">필터</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-amber-400 hover:text-amber-300 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-amber-400 mb-4 text-lg">SNS 선택</h3>
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
                    className={`px-6 py-3 rounded-full border-2 transition-all font-semibold ${
                      activeFilters.includes(sns)
                        ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-black border-amber-500'
                        : 'bg-gray-800 text-amber-400 border-amber-600/30 hover:border-amber-500'
                    }`}
                  >
                    {sns}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-amber-400 mb-4 text-lg">매장 종류</h3>
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
                    className={`px-6 py-3 rounded-full border-2 transition-all font-semibold ${
                      activeFilters.includes(category)
                        ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-black border-amber-500'
                        : 'bg-gray-800 text-amber-400 border-amber-600/30 hover:border-amber-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-black py-5 rounded-full font-bold text-lg hover:from-amber-500 hover:to-amber-700 transition-all shadow-2xl"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageV2;
