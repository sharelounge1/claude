// 카카오 지도 API TypeScript 타입 정의
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        event: {
          addListener: (target: any, type: string, handler: () => void) => void;
        };
        Size: new (width: number, height: number) => any;
        Point: new (x: number, y: number) => any;
        MarkerImage: new (src: string, size: any, options?: any) => any;
        CustomOverlay: new (options: any) => any;
      };
    };
  }
}

export {};
