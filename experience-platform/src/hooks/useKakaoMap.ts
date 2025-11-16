import { useState, useEffect, useRef } from 'react';

export interface MarkerData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
  quota: string;
}

export const useKakaoMap = (markers: MarkerData[], markerColor = '#4A90E2') => {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowsRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

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

    // 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
      });
      return;
    }

    // 카카오 지도 SDK 스크립트 동적 로드
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

    // 지도 생성 - 성능 최적화 옵션 추가
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
      draggable: true, // 드래그 가능
      scrollwheel: true, // 마우스 휠 줌 가능
      disableDoubleClick: false, // 더블클릭 줌 허용
      disableDoubleClickZoom: false,
      keyboardShortcuts: true, // 키보드 단축키 사용
      tileAnimation: true, // 타일 애니메이션 활성화 (부드러운 전환)
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOption);

    // 지도 타입을 Skyview/Hybrid로 설정하면 더 부드러울 수 있음 (선택사항)
    // map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);

    kakaoMapRef.current = map;

    // 마커 생성
    markers.forEach((markerData) => {
      const markerPosition = new window.kakao.maps.LatLng(markerData.lat, markerData.lng);

      // 커스텀 오버레이로 마커 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: `
          <div style="
            width: 48px;
            height: 48px;
            background-color: ${markerColor};
            border: 4px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: transform 0.2s;
          "
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'"
          id="marker-${markerData.id}">
            ${getCategoryIcon(markerData.category)}
          </div>
        `,
        yAnchor: 0.5,
      });

      customOverlay.setMap(map);

      // InfoWindow 생성
      const infoWindow = new window.kakao.maps.InfoWindow({
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
              background-color: ${markerColor};
              color: white;
              padding: 8px 16px;
              border: none;
              border-radius: 6px;
              font-size: 13px;
              cursor: pointer;
              font-weight: 500;
            " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              상세보기
            </button>
          </div>
        `,
        removable: true,
      });

      // 마커 클릭 이벤트
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
  }, [mapLoaded, markers, markerColor]);

  return { mapRef, mapLoaded };
};
