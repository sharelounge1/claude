# 디자인 시스템 (Design System)

**문서 버전**: 1.0
**최종 수정일**: 2025-11-15
**작성자**: Claude Code

---

## 개요

이 문서는 실시간 체험단 앱의 디자인 시스템을 정의합니다.
TailwindCSS와 Radix UI를 기반으로 일관된 UI/UX를 제공하기 위한 색상, 타이포그래피, 컴포넌트 규칙을 포함합니다.

---

## 1. 색상 팔레트 (Color Palette)

### 1.1. 브랜드 색상 (Brand Colors)

```css
/* Primary: 체험단 메인 컬러 */
--primary: #FF6B6B;           /* 코랄 레드 */
--primary-dark: #E85555;
--primary-light: #FF8A8A;

/* Secondary: 서브 컬러 */
--secondary: #4ECDC4;         /* 민트 그린 */
--secondary-dark: #3AB8AF;
--secondary-light: #6FD9D2;
```

### 1.2. 상태 색상 (Status Colors)

```css
/* Success: 승인, 완료 */
--success: #95E1D3;
--success-dark: #7CD4C5;
--success-light: #ADECDF;

/* Warning: 대기, 검토 중 */
--warning: #F9CA24;
--warning-dark: #E0B61F;
--warning-light: #FAD55A;

/* Error: 거절, 실패 */
--error: #EE5A6F;
--error-dark: #D64A5E;
--error-light: #F37888;

/* Info: 알림 */
--info: #3498DB;
--info-dark: #2980B9;
--info-light: #5DADE2;
```

### 1.3. 등급 색상 (Grade Colors)

```css
/* BRONZE: 브론즈 등급 */
--grade-bronze: #CD7F32;
--grade-bronze-bg: rgba(205, 127, 50, 0.1);

/* SILVER: 실버 등급 */
--grade-silver: #C0C0C0;
--grade-silver-bg: rgba(192, 192, 192, 0.1);

/* GOLD: 골드 등급 */
--grade-gold: #FFD700;
--grade-gold-bg: rgba(255, 215, 0, 0.1);

/* PLATINUM: 플래티넘 등급 */
--grade-platinum: #E5E4E2;
--grade-platinum-bg: rgba(229, 228, 226, 0.1);
```

### 1.4. 그레이스케일 (Grayscale)

```css
/* Background & Text */
--white: #FFFFFF;
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
--black: #000000;
```

### 1.5. TailwindCSS 설정

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#E85555',
          light: '#FF8A8A',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          dark: '#3AB8AF',
          light: '#6FD9D2',
        },
        success: {
          DEFAULT: '#95E1D3',
          dark: '#7CD4C5',
          light: '#ADECDF',
        },
        warning: {
          DEFAULT: '#F9CA24',
          dark: '#E0B61F',
          light: '#FAD55A',
        },
        error: {
          DEFAULT: '#EE5A6F',
          dark: '#D64A5E',
          light: '#F37888',
        },
        grade: {
          bronze: '#CD7F32',
          silver: '#C0C0C0',
          gold: '#FFD700',
          platinum: '#E5E4E2',
        },
      },
    },
  },
};
```

---

## 2. 타이포그래피 (Typography)

### 2.1. 폰트 패밀리

```css
/* 한글 + 영문 */
--font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* 숫자 (모노스페이스) */
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### 2.2. 폰트 크기 (Font Sizes)

```css
/* Heading */
--text-h1: 2rem;      /* 32px - 페이지 타이틀 */
--text-h2: 1.5rem;    /* 24px - 섹션 타이틀 */
--text-h3: 1.25rem;   /* 20px - 카드 타이틀 */
--text-h4: 1.125rem;  /* 18px - 서브 타이틀 */

/* Body */
--text-base: 1rem;    /* 16px - 본문 텍스트 */
--text-sm: 0.875rem;  /* 14px - 작은 텍스트 */
--text-xs: 0.75rem;   /* 12px - 캡션, 라벨 */

/* Large */
--text-lg: 1.125rem;  /* 18px - 강조 텍스트 */
--text-xl: 1.25rem;   /* 20px - 큰 텍스트 */
```

### 2.3. 폰트 굵기 (Font Weights)

```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### 2.4. 행간 (Line Heights)

```css
--leading-tight: 1.25;   /* 타이틀용 */
--leading-normal: 1.5;   /* 본문용 */
--leading-relaxed: 1.75; /* 긴 텍스트용 */
```

### 2.5. TailwindCSS 설정

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        primary: ['Pretendard', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': '2rem',
        'h2': '1.5rem',
        'h3': '1.25rem',
        'h4': '1.125rem',
      },
    },
  },
};
```

---

## 3. 간격 (Spacing)

### 3.1. 패딩 & 마진

TailwindCSS 기본 스케일 사용 (4px 단위)

```
p-1  = 4px
p-2  = 8px
p-3  = 12px
p-4  = 16px
p-5  = 20px
p-6  = 24px
p-8  = 32px
p-10 = 40px
p-12 = 48px
```

### 3.2. 컴포넌트별 간격 규칙

```css
/* 카드 패딩 */
--card-padding: 1rem;       /* 16px */
--card-padding-lg: 1.5rem;  /* 24px */

/* 섹션 간격 */
--section-gap: 2rem;        /* 32px */
--section-gap-lg: 3rem;     /* 48px */

/* 요소 간격 */
--element-gap: 0.5rem;      /* 8px */
--element-gap-md: 1rem;     /* 16px */
```

---

## 4. 모서리 반경 (Border Radius)

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px - 작은 요소 */
--radius-md: 0.5rem;    /* 8px - 버튼, 입력창 */
--radius-lg: 0.75rem;   /* 12px - 카드 */
--radius-xl: 1rem;      /* 16px - 큰 카드 */
--radius-full: 9999px;  /* 완전한 원형 */
```

---

## 5. 그림자 (Shadows)

```css
/* 카드 그림자 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* 호버 효과 */
--shadow-hover: 0 12px 20px rgba(0, 0, 0, 0.12);
```

---

## 6. 애니메이션 & 트랜지션 (Animations & Transitions)

### 6.1. 트랜지션 속도

```css
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;
```

### 6.2. 이징 함수

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### 6.3. 공통 트랜지션

```css
/* 버튼 호버 */
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* 모달 페이드 인 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 토스트 슬라이드 업 */
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

---

## 7. UI 컴포넌트 (Components)

### 7.1. 버튼 (Button)

#### Primary Button
```tsx
<button className="
  px-4 py-2
  bg-primary hover:bg-primary-dark
  text-white font-medium
  rounded-md
  transition-all duration-200
  shadow-md hover:shadow-lg
">
  신청하기
</button>
```

#### Secondary Button
```tsx
<button className="
  px-4 py-2
  bg-secondary hover:bg-secondary-dark
  text-white font-medium
  rounded-md
  transition-all duration-200
">
  자세히 보기
</button>
```

#### Outline Button
```tsx
<button className="
  px-4 py-2
  border-2 border-primary text-primary
  hover:bg-primary hover:text-white
  font-medium rounded-md
  transition-all duration-200
">
  취소
</button>
```

#### Icon Button
```tsx
<button className="
  w-10 h-10
  flex items-center justify-center
  bg-gray-100 hover:bg-gray-200
  rounded-full
  transition-all duration-200
">
  <IconHeart />
</button>
```

### 7.2. 카드 (Card)

#### Basic Card
```tsx
<div className="
  bg-white
  rounded-lg shadow-md
  p-6
  hover:shadow-lg
  transition-shadow duration-200
">
  <h3 className="text-h3 font-semibold mb-2">카드 타이틀</h3>
  <p className="text-sm text-gray-600">카드 설명</p>
</div>
```

#### Campaign Card
```tsx
<div className="
  bg-white rounded-lg shadow-md
  overflow-hidden
  hover:shadow-xl transition-shadow duration-200
">
  <img src="..." className="w-full h-48 object-cover" />
  <div className="p-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="px-2 py-1 bg-grade-gold text-xs font-medium rounded">GOLD</span>
      <span className="text-xs text-gray-500">마감 D-3</span>
    </div>
    <h3 className="text-h4 font-semibold mb-1">맛집 체험단 모집</h3>
    <p className="text-sm text-gray-600 mb-3">매장명: 맛집 레스토랑</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">3/10명 참여</span>
      <button className="px-3 py-1 bg-primary text-white text-sm rounded-md">
        신청하기
      </button>
    </div>
  </div>
</div>
```

### 7.3. 입력 필드 (Input)

#### Text Input
```tsx
<input
  type="text"
  placeholder="이메일을 입력하세요"
  className="
    w-full px-4 py-2
    border border-gray-300 rounded-md
    focus:outline-none focus:ring-2 focus:ring-primary
    transition-all duration-200
  "
/>
```

#### Textarea
```tsx
<textarea
  placeholder="후기를 작성하세요 (최소 100자)"
  rows={5}
  className="
    w-full px-4 py-2
    border border-gray-300 rounded-md
    focus:outline-none focus:ring-2 focus:ring-primary
    resize-none
  "
/>
```

### 7.4. 배지 (Badge)

#### Grade Badge
```tsx
// BRONZE
<span className="
  px-2 py-1
  bg-grade-bronze text-white
  text-xs font-semibold
  rounded
">
  BRONZE
</span>

// SILVER
<span className="px-2 py-1 bg-grade-silver text-gray-800 text-xs font-semibold rounded">
  SILVER
</span>

// GOLD
<span className="px-2 py-1 bg-grade-gold text-gray-800 text-xs font-semibold rounded">
  GOLD
</span>

// PLATINUM
<span className="px-2 py-1 bg-grade-platinum text-gray-800 text-xs font-semibold rounded">
  PLATINUM
</span>
```

#### Status Badge
```tsx
// ACTIVE (활성)
<span className="px-2 py-1 bg-success text-gray-800 text-xs font-medium rounded">
  진행 중
</span>

// PENDING (대기)
<span className="px-2 py-1 bg-warning text-gray-800 text-xs font-medium rounded">
  검토 중
</span>

// REJECTED (거절)
<span className="px-2 py-1 bg-error text-white text-xs font-medium rounded">
  거절됨
</span>
```

### 7.5. 모달 (Modal)

```tsx
<div className="
  fixed inset-0
  bg-black bg-opacity-50
  flex items-center justify-center
  z-50
  animate-fadeIn
">
  <div className="
    bg-white
    rounded-xl
    shadow-xl
    p-6
    max-w-md w-full
    animate-slideUp
  ">
    <h2 className="text-h3 font-semibold mb-4">모달 타이틀</h2>
    <p className="text-sm text-gray-600 mb-6">모달 내용...</p>
    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 border border-gray-300 rounded-md">
        취소
      </button>
      <button className="px-4 py-2 bg-primary text-white rounded-md">
        확인
      </button>
    </div>
  </div>
</div>
```

### 7.6. 토스트 (Toast)

```tsx
// Success Toast
<div className="
  fixed bottom-4 right-4
  bg-success text-gray-800
  px-4 py-3 rounded-lg shadow-lg
  flex items-center gap-2
  animate-slideUp
  z-50
">
  <IconCheckCircle className="w-5 h-5" />
  <span className="text-sm font-medium">신청이 완료되었습니다!</span>
</div>

// Error Toast
<div className="
  fixed bottom-4 right-4
  bg-error text-white
  px-4 py-3 rounded-lg shadow-lg
  flex items-center gap-2
  animate-slideUp
">
  <IconXCircle className="w-5 h-5" />
  <span className="text-sm font-medium">오류가 발생했습니다.</span>
</div>
```

### 7.7. 탭 (Tabs)

```tsx
<div className="border-b border-gray-200">
  <nav className="flex gap-4">
    <button className="
      px-4 py-2
      border-b-2 border-primary
      text-primary font-medium
      transition-colors duration-200
    ">
      전체
    </button>
    <button className="
      px-4 py-2
      border-b-2 border-transparent
      text-gray-500 hover:text-gray-700
      transition-colors duration-200
    ">
      진행 중
    </button>
    <button className="
      px-4 py-2
      border-b-2 border-transparent
      text-gray-500 hover:text-gray-700
      transition-colors duration-200
    ">
      완료
    </button>
  </nav>
</div>
```

---

## 8. 아이콘 (Icons)

### 8.1. 아이콘 라이브러리

**추천**: [Lucide Icons](https://lucide.dev/) (React Icons 대체)

```bash
npm install lucide-react
```

### 8.2. 아이콘 사용 예시

```tsx
import {
  Heart,
  MapPin,
  Calendar,
  User,
  Settings,
  ChevronRight,
  Star,
  Camera,
  Search,
  Filter,
} from 'lucide-react';

// 사용 예시
<Heart className="w-5 h-5 text-primary" />
<MapPin className="w-4 h-4 text-gray-500" />
```

### 8.3. 아이콘 크기 규칙

```css
/* 작은 아이콘 */
--icon-sm: 1rem;   /* 16px */

/* 중간 아이콘 */
--icon-md: 1.25rem; /* 20px */

/* 큰 아이콘 */
--icon-lg: 1.5rem;  /* 24px */

/* 매우 큰 아이콘 */
--icon-xl: 2rem;    /* 32px */
```

---

## 9. 레이아웃 (Layout)

### 9.1. 컨테이너

```tsx
<div className="
  max-w-7xl mx-auto
  px-4 sm:px-6 lg:px-8
  py-6
">
  {/* 콘텐츠 */}
</div>
```

### 9.2. 그리드 레이아웃

```tsx
// 캠페인 카드 그리드 (반응형)
<div className="
  grid
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-4
">
  {campaigns.map(campaign => (
    <CampaignCard key={campaign.id} campaign={campaign} />
  ))}
</div>
```

### 9.3. 플렉스 레이아웃

```tsx
// 수평 정렬
<div className="flex items-center justify-between">
  <span>왼쪽</span>
  <span>오른쪽</span>
</div>

// 수직 정렬
<div className="flex flex-col gap-4">
  <div>항목 1</div>
  <div>항목 2</div>
</div>
```

---

## 10. 반응형 디자인 (Responsive Design)

### 10.1. 브레이크포인트

```css
/* 모바일 (기본) */
/* ~ 639px */

/* 태블릿 */
sm: 640px

/* 노트북 */
md: 768px
lg: 1024px

/* 데스크톱 */
xl: 1280px
2xl: 1536px
```

### 10.2. 반응형 유틸리티 사용 예시

```tsx
<div className="
  text-sm sm:text-base lg:text-lg
  p-4 sm:p-6 lg:p-8
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
">
  반응형 콘텐츠
</div>
```

---

## 11. 접근성 (Accessibility)

### 11.1. 포커스 링

```tsx
<button className="
  focus:outline-none
  focus:ring-2 focus:ring-primary focus:ring-offset-2
">
  버튼
</button>
```

### 11.2. ARIA 레이블

```tsx
<button aria-label="좋아요" className="...">
  <Heart />
</button>

<input
  type="text"
  aria-label="검색어 입력"
  placeholder="검색..."
/>
```

### 11.3. 키보드 네비게이션

- 모든 인터랙티브 요소는 Tab 키로 포커스 가능
- Enter/Space 키로 버튼 활성화
- Esc 키로 모달 닫기

---

## 12. 다크 모드 (Dark Mode) - 향후 지원 예정

```css
/* 다크 모드 색상 (예시) */
.dark {
  --bg-primary: #1F2937;
  --bg-secondary: #111827;
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
}
```

---

## 13. 컴포넌트 라이브러리

### 13.1. Radix UI

모달, 드롭다운, 툴팁 등 접근성 있는 기본 컴포넌트 제공

```bash
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-toast
```

### 13.2. Radix UI 사용 예시

```tsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button className="...">모달 열기</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
      <Dialog.Title className="text-h3 font-semibold">타이틀</Dialog.Title>
      <Dialog.Description className="text-sm text-gray-600">설명</Dialog.Description>
      <Dialog.Close asChild>
        <button className="...">닫기</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

---

## 14. 파일 구조

### 14.1. 스타일 파일 구조

```
src/
├── styles/
│   ├── globals.css          # 전역 스타일
│   ├── tailwind.css         # TailwindCSS 진입점
│   └── animations.css       # 커스텀 애니메이션
├── components/
│   └── ui/
│       ├── Button.tsx       # 재사용 가능한 버튼 컴포넌트
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       └── Toast.tsx
```

### 14.2. globals.css 예시

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-primary text-gray-900 bg-gray-50;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-all duration-200 shadow-md hover:shadow-lg;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent;
  }
}
```

---

## 참고 사항

### 디자인 시스템 업데이트 규칙
- 새로운 컴포넌트 추가 시 이 문서에 명세 추가
- 색상 변경 시 `tailwind.config.js`와 이 문서 동기화
- 모든 컴포넌트는 접근성 (a11y) 준수 필수

### 디자인 도구
- **Figma**: UI/UX 디자인 및 프로토타입 (선택적)
- **TailwindCSS IntelliSense**: VSCode 확장 프로그램 (필수)
- **Prettier Plugin for Tailwind**: 클래스명 자동 정렬

---

**🤖 Generated with [Claude Code](https://claude.com/claude-code)**

Co-Authored-By: Claude <noreply@anthropic.com>
