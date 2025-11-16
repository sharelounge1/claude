import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Campaign } from '../../lib/supabase';

interface CampaignWithStore extends Campaign {
  store?: {
    name: string;
    latitude?: number;
    longitude?: number;
    category?: string;
  };
  current_participants?: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowsRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<CampaignWithStore[]>([]);
  const [loading, setLoading] = useState(true);

  // Global navigation function that can be called from inline onclick handlers
  useEffect(() => {
    (window as any).navigateToCampaign = (campaignId: string) => {
      navigate(`/campaigns/${campaignId}`);
    };
    return () => {
      delete (window as any).navigateToCampaign;
    };
  }, [navigate]);

  // Fetch campaigns from Supabase
  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const { data: campaignsData, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          store:stores(name, latitude, longitude, category)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch current participants count for each campaign
      const campaignsWithCount = await Promise.all(
        (campaignsData || []).map(async (campaign) => {
          const { count } = await supabase
            .from('campaign_applications')
            .select('*', { count: 'exact', head: true })
            .eq('campaign_id', campaign.id)
            .in('status', ['approved', 'in_progress', 'completed']);

          return {
            ...campaign,
            current_participants: count || 0,
          };
        })
      );

      setCampaigns(campaignsWithCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setLoading(false);
    }
  }

  // 카테고리별 색상 및 초성
  const getCategoryStyle = (category?: string) => {
    if (!category) return { color: '#EC4899', initial: 'E' };

    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('카페') || lowerCategory.includes('cafe'))
      return { color: '#8B4513', initial: 'C' };
    if (lowerCategory.includes('고깃') || lowerCategory.includes('meat'))
      return { color: '#DC2626', initial: 'M' };
    if (lowerCategory.includes('이자카야') || lowerCategory.includes('izakaya'))
      return { color: '#F59E0B', initial: 'I' };
    if (lowerCategory.includes('술집') || lowerCategory.includes('bar'))
      return { color: '#3B82F6', initial: 'B' };
    if (lowerCategory.includes('밥집') || lowerCategory.includes('식당'))
      return { color: '#10B981', initial: 'R' };
    if (lowerCategory.includes('베이커리') || lowerCategory.includes('빵'))
      return { color: '#F97316', initial: 'P' };
    if (lowerCategory.includes('디저트'))
      return { color: '#EC4899', initial: 'D' };
    if (lowerCategory.includes('한식'))
      return { color: '#EF4444', initial: 'K' };
    if (lowerCategory.includes('중식'))
      return { color: '#F59E0B', initial: 'C' };
    if (lowerCategory.includes('일식'))
      return { color: '#14B8A6', initial: 'J' };
    if (lowerCategory.includes('양식'))
      return { color: '#8B5CF6', initial: 'W' };
    return { color: '#EC4899', initial: 'E' };
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

  // 카카오 지도 초기화 및 마커 생성
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !window.kakao || loading) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    infoWindowsRef.current = [];

    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 5,
      draggable: true,
      scrollwheel: true,
      disableDoubleClick: false,
      disableDoubleClickZoom: false,
      keyboardShortcuts: true,
      tileAnimation: true,
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOption);
    kakaoMapRef.current = map;

    // Filter campaigns based on search and filters
    const filteredCampaigns = campaigns.filter((campaign) => {
      // Search filter
      if (searchQuery && campaign.store) {
        const query = searchQuery.toLowerCase();
        const storeName = campaign.store.name?.toLowerCase() || '';
        const campaignName = campaign.name.toLowerCase();
        if (!storeName.includes(query) && !campaignName.includes(query)) {
          return false;
        }
      }

      // Category filter
      if (activeFilters.length > 0 && campaign.store) {
        const category = campaign.store.category || '';
        const hasMatchingCategory = activeFilters.some(filter =>
          category.toLowerCase().includes(filter.toLowerCase())
        );
        if (!hasMatchingCategory) return false;
      }

      return true;
    });

    // Create markers for filtered campaigns
    filteredCampaigns.forEach((campaign) => {
      if (!campaign.store?.latitude || !campaign.store?.longitude) return;

      const markerPosition = new window.kakao.maps.LatLng(
        campaign.store.latitude,
        campaign.store.longitude
      );

      const categoryStyle = getCategoryStyle(campaign.store.category);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: `
          <div style="
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, ${categoryStyle.color} 0%, ${categoryStyle.color}dd 100%);
            border: 3px solid rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            color: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25), 0 0 0 4px rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          "
          onmouseover="this.style.transform='scale(1.15)'; this.style.boxShadow='0 8px 30px rgba(0, 0, 0, 0.35), 0 0 0 5px rgba(255, 255, 255, 0.5)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 20px rgba(0, 0, 0, 0.25), 0 0 0 4px rgba(255, 255, 255, 0.3)'"
          id="marker-${campaign.id}">
            ${categoryStyle.initial}
          </div>
        `,
        yAnchor: 0.5,
      });

      customOverlay.setMap(map);

      const quota = `${campaign.current_participants || 0}/${campaign.total_quota}`;
      const isFull = (campaign.current_participants || 0) >= campaign.total_quota;

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="
            padding: 20px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2);
            min-width: 240px;
            border: 2px solid rgba(236, 72, 153, 0.3);
          ">
            <p style="
              font-weight: 800;
              color: #EC4899;
              margin: 0 0 4px 0;
              font-size: 17px;
              text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
            ">${campaign.store.name}</p>
            <p style="
              color: #fff;
              margin: 0 0 10px 0;
              font-size: 13px;
              font-weight: 500;
            ">${campaign.name}</p>
            <p style="
              color: ${isFull ? '#FF6B6B' : '#fff'};
              margin: 0 0 16px 0;
              font-size: 14px;
              font-weight: 600;
            ">모집: ${quota}명 ${isFull ? '(마감)' : ''}</p>
            <button
              id="detail-btn-${campaign.id}"
              style="
              width: 100%;
              background: linear-gradient(135deg, #EC4899 0%, #F97316 100%);
              color: white;
              padding: 12px 20px;
              border: none;
              border-radius: 12px;
              font-size: 14px;
              cursor: pointer;
              font-weight: 700;
              box-shadow: 0 4px 20px rgba(236, 72, 153, 0.5), 0 0 30px rgba(236, 72, 153, 0.3);
              transition: all 0.3s;
            " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 30px rgba(236, 72, 153, 0.7), 0 0 50px rgba(236, 72, 153, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(236, 72, 153, 0.5), 0 0 30px rgba(236, 72, 153, 0.3)'">
              상세보기
            </button>
          </div>
        `,
        removable: true,
      });

      setTimeout(() => {
        const markerElement = document.getElementById(`marker-${campaign.id}`);
        if (markerElement) {
          markerElement.addEventListener('click', () => {
            infoWindowsRef.current.forEach((iw) => iw.close());
            infoWindow.open(map, { lat: campaign.store!.latitude, lng: campaign.store!.longitude } as any);

            // InfoWindow가 열린 후 버튼에 이벤트 리스너 추가
            setTimeout(() => {
              const detailButton = document.getElementById(`detail-btn-${campaign.id}`);
              if (detailButton) {
                detailButton.addEventListener('click', () => {
                  navigate(`/campaigns/${campaign.id}`);
                });
              }
            }, 100);
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
  }, [mapLoaded, campaigns, loading, searchQuery, activeFilters]);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
      {/* Glassmorphism Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-5 pointer-events-none">
        <div className="flex gap-3 pointer-events-auto animate-slideDown">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-700" size={24} />
            <input
              type="text"
              placeholder="매장명, 지역명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-white/30 bg-white/90 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 shadow-2xl text-black placeholder-gray-500 text-base font-medium"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              }}
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-4 rounded-2xl bg-white/90 backdrop-blur-lg border-2 border-white/30 hover:bg-white transition-all shadow-2xl"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <SlidersHorizontal size={26} className="text-black" />
          </button>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 pointer-events-auto animate-fadeIn">
            {activeFilters.map((filter) => (
              <div
                key={filter}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md text-black rounded-full text-sm font-bold border-2 border-white/40 shadow-lg"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="hover:bg-gray-100 rounded-full p-1 transition-colors text-lg font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveFilters([])}
              className="px-5 py-2.5 bg-white/90 backdrop-blur-md text-black rounded-full text-sm hover:bg-white transition-all font-bold border-2 border-white/30 shadow-lg"
            >
              전체 해제
            </button>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full relative z-0">
        {(!mapLoaded || loading) && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg font-bold animate-pulse">
                {!mapLoaded ? '지도를 불러오는 중...' : '캠페인을 불러오는 중...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-8 max-h-[80vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-black">필터</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-black hover:text-gray-600 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-black mb-4 text-lg">SNS 선택</h3>
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
                    className={`px-6 py-3 rounded-full border-2 transition-all font-bold ${
                      activeFilters.includes(sns)
                        ? 'bg-black text-white border-black shadow-lg'
                        : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    {sns}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-black mb-4 text-lg">매장 종류</h3>
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
                    className={`px-6 py-3 rounded-full border-2 transition-all font-bold ${
                      activeFilters.includes(category)
                        ? 'bg-black text-white border-black shadow-lg'
                        : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg"
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
