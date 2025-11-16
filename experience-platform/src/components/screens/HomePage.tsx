import { useState } from 'react';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import HomePageV1 from './HomePageV1';
import HomePageV2 from './HomePageV2';
import HomePageV3 from './HomePageV3';
import HomePageV4 from './HomePageV4';
import HomePageV5 from './HomePageV5';

const designs = [
  { id: 1, name: '기본 디자인', description: '심플하고 깔끔한 블루 톤', component: HomePageV1 },
  { id: 2, name: '럭셔리 다크', description: '고급스럽고 우아한 느낌', component: HomePageV2 },
  { id: 3, name: '모던 글래스', description: '세련되고 생동감 있는 디자인', component: HomePageV3 },
  { id: 4, name: '미니멀 화이트', description: '심플하고 여백이 넓은 디자인', component: HomePageV4 },
  { id: 5, name: 'UX 최적화', description: 'UI/UX에 초점을 맞춘 디자인', component: HomePageV5 },
];

const HomePage = () => {
  const [currentDesign, setCurrentDesign] = useState(0);
  const [showSwitcher, setShowSwitcher] = useState(true);

  const CurrentComponent = designs[currentDesign].component;

  const nextDesign = () => {
    setCurrentDesign((prev) => (prev + 1) % designs.length);
  };

  const prevDesign = () => {
    setCurrentDesign((prev) => (prev - 1 + designs.length) % designs.length);
  };

  const goToDesign = (index: number) => {
    setCurrentDesign(index);
  };

  return (
    <div className="relative h-full">
      {/* Design Component */}
      <CurrentComponent />

      {/* Design Switcher UI */}
      {showSwitcher && (
        <>
          {/* Top Bar - Design Info */}
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full px-6 py-3 flex items-center gap-3">
            <Palette size={20} className="text-gray-700" />
            <div className="text-sm">
              <div className="font-bold text-gray-900">{designs[currentDesign].name}</div>
              <div className="text-xs text-gray-500">{designs[currentDesign].description}</div>
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevDesign}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full p-4 hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="이전 디자인"
          >
            <ChevronLeft size={28} className="text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextDesign}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full p-4 hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="다음 디자인"
          >
            <ChevronRight size={28} className="text-gray-700" />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full px-6 py-3 flex items-center gap-3">
            {designs.map((design, index) => (
              <button
                key={design.id}
                onClick={() => goToDesign(index)}
                className={`transition-all ${
                  index === currentDesign
                    ? 'w-8 h-3 bg-blue-600 rounded-full'
                    : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
                aria-label={`${design.name} 디자인으로 전환`}
              />
            ))}
          </div>

          {/* Toggle Switcher Button */}
          <button
            onClick={() => setShowSwitcher(false)}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
          >
            전환 UI 숨기기
          </button>
        </>
      )}

      {/* Show Switcher Button (when hidden) */}
      {!showSwitcher && (
        <button
          onClick={() => setShowSwitcher(true)}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white text-xs px-4 py-2 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <Palette size={16} />
          전환 UI 보이기
        </button>
      )}
    </div>
  );
};

export default HomePage;
