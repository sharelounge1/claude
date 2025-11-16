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
  const clustererRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(5);

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

  // 카테고리별 귀여운 아이콘
  const getCategoryIcon = (category?: string) => {
    if (!category) return '🎪';

    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('카페') || lowerCategory.includes('cafe')) return '☕';
    if (lowerCategory.includes('고깃') || lowerCategory.includes('meat')) return '🍖';
    if (lowerCategory.includes('이자카야') || lowerCategory.includes('izakaya')) return '🍶';
    if (lowerCategory.includes('술집') || lowerCategory.includes('bar')) return '🍺';
    if (lowerCategory.includes('밥집') || lowerCategory.includes('식당')) return '🍚';
    if (lowerCategory.includes('베이커리') || lowerCategory.includes('빵')) return '🥐';
    if (lowerCategory.includes('디저트')) return '🧁';
    if (lowerCategory.includes('한식')) return '🍲';
    if (lowerCategory.includes('중식')) return '🥟';
    if (lowerCategory.includes('일식')) return '🍱';
    if (lowerCategory.includes('양식')) return '🍝';
    return '🎪';
  };

  // 카카오 지도 SDK 동적 로드 (클러스터링 라이브러리 포함)
  useEffect(() => {
    const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_APP_KEY || '233d6ee177d8f2809ac5c0af8f819b28';

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=clusterer`;
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

    // 줌 레벨 변경 이벤트 리스너
    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const level = map.getLevel();
      setCurrentZoomLevel(level);
      console.log('🔍 Zoom level changed:', level);
    });

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
    const markers: any[] = [];

    filteredCampaigns.forEach((campaign) => {
      if (!campaign.store?.latitude || !campaign.store?.longitude) return;

      const markerPosition = new window.kakao.maps.LatLng(
        campaign.store.latitude,
        campaign.store.longitude
      );

      const categoryIcon = getCategoryIcon(campaign.store.category);

      // 줌 레벨에 따라 다른 마커 사용
      if (currentZoomLevel <= 7) {
        // 줌 아웃 상태: 기본 마커 사용 (클러스터링 적용)
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: campaign.store.name,
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          console.log('📍 Marker clicked, navigating to campaign:', campaign.id);
          navigate(`/campaigns/${campaign.id}`);
        });

        markers.push(marker);
        markersRef.current.push(marker);
      } else {
        // 줌 인 상태: 커스텀 오버레이 사용
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: `
            <div style="
              width: 64px;
              height: 64px;
              background: linear-gradient(135deg, #EC4899 0%, #F97316 100%);
              border: 4px solid rgba(255, 255, 255, 0.95);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              box-shadow: 0 6px 24px rgba(236, 72, 153, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.4);
              cursor: pointer;
              transition: all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55);
              animation: pinBounce 2s ease-in-out infinite;
            "
            onmouseover="this.style.transform='scale(1.2) rotate(5deg)'; this.style.boxShadow='0 10px 35px rgba(236, 72, 153, 0.7), 0 0 0 4px rgba(255, 255, 255, 0.6)'"
            onmouseout="this.style.transform='scale(1) rotate(0deg)'; this.style.boxShadow='0 6px 24px rgba(236, 72, 153, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.4)'"
            id="marker-${campaign.id}">
              ${categoryIcon}
            </div>
            <style>
              @keyframes pinBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
             }
            </style>
          `,
          yAnchor: 0.5,
        });

        customOverlay.setMap(map);
        markersRef.current.push(customOverlay);

        setTimeout(() => {
          const markerElement = document.getElementById(`marker-${campaign.id}`);
          if (markerElement) {
            markerElement.addEventListener('click', () => {
              console.log('📍 Marker clicked, navigating to campaign:', campaign.id);
              navigate(`/campaigns/${campaign.id}`);
            });
          }
        }, 100);
      }
    });

    // MarkerClusterer 적용 (줌 아웃 상태일 때만)
    if (currentZoomLevel <= 7 && markers.length > 0) {
      if (clustererRef.current) {
        clustererRef.current.clear();
      }

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map,
        markers: markers,
        gridSize: 60,
        averageCenter: true,
        minLevel: 1,
        styles: [{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
          borderRadius: '50%',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '60px',
          fontSize: '16px',
          border: '4px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 6px 24px rgba(236, 72, 153, 0.5)',
        }],
      });

      clustererRef.current = clusterer;
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap ? marker.setMap(null) : null);
      markersRef.current = [];
      if (clustererRef.current) {
        clustererRef.current.clear();
      }
    };
  }, [mapLoaded, campaigns, loading, searchQuery, activeFilters, currentZoomLevel]);

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
