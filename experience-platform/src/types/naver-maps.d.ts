// 네이버 지도 API 타입 정의
declare global {
  interface Window {
    naver: any;
  }

  namespace naver {
    namespace maps {
      class Map {
        constructor(element: HTMLElement | string, options?: MapOptions);
        setCenter(location: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getCenter(): LatLng;
        getZoom(): number;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        getPosition(): LatLng;
        setPosition(position: LatLng | LatLngLiteral): void;
      }

      class InfoWindow {
        constructor(options: InfoWindowOptions);
        open(map: Map, anchor: Marker): void;
        close(): void;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        zoomControl?: boolean;
        zoomControlOptions?: any;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      interface MarkerOptions {
        position: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | any;
        clickable?: boolean;
      }

      interface InfoWindowOptions {
        content: string | HTMLElement;
        maxWidth?: number;
        backgroundColor?: string;
        borderColor?: string;
        borderWidth?: number;
        anchorSize?: any;
        anchorSkew?: boolean;
        anchorColor?: string;
        pixelOffset?: any;
      }

      namespace Event {
        function addListener(
          target: any,
          eventName: string,
          listener: Function
        ): any;
        function removeListener(listener: any): void;
      }
    }
  }
}

export {};
