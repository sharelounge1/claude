# 개발 일지 (Development Log)

네이버 지도 기반 체험단 플랫폼 - 실시간 체험단 매칭 서비스

---

## 📅 2025-01-15 - Phase 1: 프로젝트 초기 설정 및 메인 화면 구현

### 1. 프로젝트 초기 설정

#### 1.1. 프로젝트 생성
- **명령어**: `npm create vite@latest experience-platform -- --template react-ts`
- **기술 스택**:
  - Runtime: React 18 + TypeScript
  - Build Tool: Vite 7.2.2
  - Package Manager: npm

#### 1.2. 필수 라이브러리 설치

**개발 의존성 (devDependencies)**:
```bash
npm install -D tailwindcss postcss autoprefixer
```
- `tailwindcss`: 유틸리티 기반 CSS 프레임워크
- `postcss`: CSS 전처리기
- `autoprefixer`: 크로스 브라우저 CSS 호환성

**운영 의존성 (dependencies)**:
```bash
npm install react-router-dom lucide-react zustand
```
- `react-router-dom` (v6): 라우팅 관리
- `lucide-react`: 아이콘 라이브러리
- `zustand`: 상태 관리 라이브러리 (향후 사용)

#### 1.3. TailwindCSS 설정

**tailwind.config.js**:
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',    // 파란색 - 신뢰감
        secondary: '#50E3C2',  // 민트색 - 신선함
        accent: '#F5A623',     // 주황색 - 긴급/강조
        error: '#E74C3C',      // 빨간색 - 경고
        success: '#2ECC71',    // 초록색 - 완료
      },
    },
  },
  plugins: [],
}
```

**postcss.config.js**:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**src/index.css**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### 1.4. 프로젝트 폴더 구조

```
src/
├── components/
│   ├── ui/              # 재사용 가능한 UI 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   ├── screens/         # 페이지 컴포넌트
│   └── layout/          # 레이아웃 컴포넌트
├── stores/              # Zustand 스토어
├── hooks/               # 커스텀 훅
├── services/            # API 서비스
├── types/               # TypeScript 타입 정의
├── utils/               # 유틸리티 함수
└── assets/              # 정적 자산
```

---

### 2. 라우팅 설정

#### 2.1. App.tsx 구조

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="campaigns" element={<CampaignsListPage />} />
          <Route path="my-campaigns" element={<MyCampaignsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

#### 2.2. 라우트 구조

| 경로 | 컴포넌트 | 설명 |
|------|---------|------|
| `/` | `HomePage` | 메인 화면 (네이버 지도) |
| `/campaigns` | `CampaignsListPage` | 체험단 리스트 |
| `/my-campaigns` | `MyCampaignsPage` | 진행중 체험단 |
| `/profile` | `ProfilePage` | 마이페이지 |

---

### 3. 레이아웃 컴포넌트

#### 3.1. MainLayout
- **파일**: `src/components/layout/MainLayout.tsx`
- **역할**: 전체 레이아웃 구조 정의
- **구성 요소**:
  - Main Content Area (Outlet)
  - Bottom Navigation

```typescript
const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
```

#### 3.2. BottomNav (하단 네비게이션)
- **파일**: `src/components/layout/BottomNav.tsx`
- **역할**: 하단 탭 네비게이션 바
- **메뉴 항목**:
  1. 홈 (지도) - MapPin 아이콘
  2. 체험단 리스트 - List 아이콘
  3. 진행중 체험단 - Clock 아이콘
  4. 마이페이지 - User 아이콘

**주요 기능**:
- `NavLink` 사용으로 활성 상태 자동 관리
- 활성 탭: 파란색 (primary) + 두꺼운 아이콘
- 비활성 탭: 회색 + 얇은 아이콘
- Hover 효과

---

### 4. 메인 페이지 (HomePage) 구현

#### 4.1. 개요
- **화면 ID**: INF-001
- **파일**: `src/components/screens/HomePage.tsx`
- **주요 기능**: 네이버 지도 기반 매장 표시, 검색, 필터

#### 4.2. UI 구성

**1. 검색 영역 (상단 고정)**
```typescript
// 검색바 + 필터 버튼
<div className="flex gap-2">
  <div className="flex-1 relative">
    <Search icon />
    <input placeholder="매장명, 지역명 검색" />
  </div>
  <button onClick={() => setIsFilterOpen(true)}>
    <SlidersHorizontal icon />
  </button>
</div>
```

**2. 활성 필터 태그**
- 선택된 필터를 태그 형태로 표시
- 각 태그 클릭 시 해당 필터 제거
- "전체 해제" 버튼으로 모든 필터 초기화

**3. 지도 영역**
- 현재는 Placeholder로 구현
- 실제 구현 시 Naver Maps API 연동 예정
- 배경: 그라데이션 (blue-50 → green-50)

**4. 지도 마커 (Mock Data)**
```typescript
const markers = [
  { id: 1, name: '카페 모카', category: 'cafe', quota: '3/5' },
  { id: 2, name: '서울 고깃집', category: 'meat', quota: '2/3' },
  { id: 3, name: '일본 이자카야', category: 'izakaya', quota: '5/5' },
];
```

**마커 UI**:
- 둥근 핀 (48px × 48px)
- 카테고리별 이모지 (☕ 카페, 🥩 고깃집, 🍶 이자카야)
- Hover 시 정보 카드 표시:
  - 매장명
  - 모집 인원
  - "상세보기" 버튼

#### 4.3. 필터 모달

**트리거**: 필터 버튼 클릭 시 `isFilterOpen = true`

**모달 구조**:
```typescript
<div className="fixed inset-0 z-50 bg-black/50">
  <div className="absolute bottom-0 bg-white rounded-t-3xl">
    {/* Header */}
    <h2>필터</h2>
    <button onClick={close}>×</button>

    {/* SNS 필터 */}
    <div>블로그, 인스타그램, 유튜브</div>

    {/* 매장 종류 필터 */}
    <div>카페, 밥집, 고깃집, ...</div>

    {/* 적용 버튼 */}
    <button>적용하기</button>
  </div>
</div>
```

**필터 옵션**:
1. **SNS 선택**: 블로그, 인스타그램, 유튜브
2. **매장 종류**: 카페, 밥집, 고깃집, 술집, 이자카야, 분식, 베이커리, 디저트, 한식당, 중식당, 일식당, 양식당

**동작**:
- 버튼 클릭 시 `activeFilters` 배열에 추가/제거
- 선택된 버튼: 파란색 배경 + 흰색 텍스트
- 미선택 버튼: 흰색 배경 + 회색 테두리

#### 4.4. 상태 관리

```typescript
const [searchQuery, setSearchQuery] = useState('');
const [activeFilters, setActiveFilters] = useState<string[]>([]);
const [isFilterOpen, setIsFilterOpen] = useState(false);
```

---

### 5. 체험단 리스트 페이지 (CampaignsListPage) 구현

#### 5.1. 개요
- **화면 ID**: INF-002
- **파일**: `src/components/screens/CampaignsListPage.tsx`
- **주요 기능**: 체험단 리스트 표시, 검색, 필터, 정렬

#### 5.2. UI 구성

**1. Header 영역**
```typescript
<div className="bg-white border-b px-4 pt-4 pb-3">
  <h1>체험단 리스트</h1>

  {/* 검색바 + 필터 버튼 */}
  <div className="flex gap-2">
    <input placeholder="매장명, 키워드 검색" />
    <button>필터</button>
  </div>

  {/* 정렬 옵션 */}
  <div className="flex gap-2">
    <button>최신순</button>
    <button>마감 임박순</button>
    <button>인기순</button>
  </div>

  {/* 활성 필터 태그 */}
  {activeFilters.map(...)}
</div>
```

**2. 캠페인 카드 리스트**

Mock 데이터:
```typescript
const campaigns: Campaign[] = [
  {
    id: 1,
    storeName: '서울 카페 모카',
    category: '카페',
    region: '서울 강남구',
    benefit: '2인 무료 식사',
    currentQuota: 3,
    totalQuota: 5,
    deadline: '2025-12-31',
    sns: ['블로그', '인스타그램'],
  },
  // ...
];
```

**카드 UI 구성**:
```
┌─────────────────────────────────┐
│ [이미지 영역 - 그라데이션]       │ ← 상단: SNS 배지 (블로그, 인스타)
│                                 │ ← 우측 상단: 모집 인원 (3/5명)
├─────────────────────────────────┤
│ 서울 카페 모카                   │
│ 📍 서울 강남구 | 🏪 카페         │
│ 🎁 혜택: 2인 무료 식사           │
│ 👥 모집: 3/5명                  │
│ ⏰ 마감: 2025-12-31             │
│ [신청하기] 버튼                  │
└─────────────────────────────────┘
```

**카드 상태**:
- 모집 중: 파란색 "신청하기" 버튼
- 마감됨: 회색 "마감됨" 버튼 (비활성)

**아이콘 사용**:
- `MapPin`: 지역
- `Store`: 매장 종류
- `Gift`: 혜택
- `Users`: 모집 인원
- `Clock`: 마감일

#### 5.3. 필터 모달

**필터 카테고리**:
1. **검색어**: 텍스트 입력
2. **지역**: 서울, 경기, 인천, 부산, 대구, 광주, 대전, 울산
3. **SNS**: 블로그, 인스타그램, 유튜브
4. **매장 종류**: 카페, 밥집, 고깃집, 술집, 이자카야, 분식, 베이커리, 디저트, 한식당, 중식당, 일식당, 양식당

#### 5.4. 정렬 기능

```typescript
const [sortBy, setSortBy] = useState<'latest' | 'deadline' | 'popular'>('latest');
```

- **최신순**: 등록일 기준 내림차순
- **마감 임박순**: 마감일 가까운 순
- **인기순**: 신청자 많은 순

#### 5.5. 상태 관리

```typescript
const [searchQuery, setSearchQuery] = useState('');
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [activeFilters, setActiveFilters] = useState<string[]>([]);
const [sortBy, setSortBy] = useState<'latest' | 'deadline' | 'popular'>('latest');
```

---

### 6. Placeholder 페이지

#### 6.1. MyCampaignsPage
- **파일**: `src/components/screens/MyCampaignsPage.tsx`
- **내용**: "진행중 체험단 - 추후 개발 예정"

#### 6.2. ProfilePage
- **파일**: `src/components/screens/ProfilePage.tsx`
- **내용**: "마이페이지 - 추후 개발 예정"

---

### 7. 디자인 시스템

#### 7.1. 색상 팔레트
```typescript
colors: {
  primary: '#4A90E2',    // 파란색 - 메인 액션, 활성 상태
  secondary: '#50E3C2',  // 민트색 - 부가 정보
  accent: '#F5A623',     // 주황색 - 혜택, 강조
  error: '#E74C3C',      // 빨간색 - 경고, 에러
  success: '#2ECC71',    // 초록색 - 완료, 성공
}
```

#### 7.2. 타이포그래피
- **제목 (h1)**: 2xl (24px), font-bold
- **부제목 (h2)**: xl (20px), font-bold
- **본문**: base (16px), font-medium
- **캡션**: sm (14px), text-gray-600

#### 7.3. 컴포넌트 스타일
- **카드**: `rounded-2xl shadow-sm border border-gray-100`
- **버튼**: `rounded-xl py-3 font-semibold`
- **입력 필드**: `rounded-lg border focus:ring-2 focus:ring-primary`
- **모달**: `rounded-t-3xl` (하단에서 올라오는 형태)

#### 7.4. 간격 및 레이아웃
- 페이지 패딩: `px-4 py-4`
- 카드 간격: `space-y-4`
- 섹션 간격: `mb-6`

---

### 8. 개발 환경 실행

#### 8.1. 개발 서버
```bash
npm run dev
```
- URL: http://localhost:5173/
- Hot Module Replacement (HMR) 지원

#### 8.2. 빌드
```bash
npm run build
```

---

### 9. 향후 개발 계획

#### Phase 2 (다음 단계):
1. ✅ 메인 페이지 (지도) - 완료
2. ✅ 체험단 리스트 - 완료
3. ⏳ 진행중 체험단 페이지
4. ⏳ 마이페이지
5. ⏳ 체험단 상세 페이지
6. ⏳ QR 코드 화면

#### Phase 3 (백엔드 연동):
1. Supabase 프로젝트 생성
2. 데이터베이스 테이블 생성
3. API 서비스 구현
4. Naver Maps API 연동

---

### 10. 개발 완료 항목

- [x] 프로젝트 초기 설정
- [x] TailwindCSS 설정
- [x] React Router 설정
- [x] 레이아웃 구조 (MainLayout, BottomNav)
- [x] 메인 페이지 (지도 화면) UI
- [x] 체험단 리스트 페이지 UI
- [x] 검색 기능 UI
- [x] 필터 모달 UI
- [x] 정렬 기능 UI

---

### 11. 개발 중 발생한 이슈 및 해결

#### 이슈 1: TailwindCSS 초기화 실패
```bash
npm error could not determine executable to run
```
**해결**: 수동으로 `tailwind.config.js`, `postcss.config.js` 파일 생성

#### 이슈 2: cd 경로 문제
- 현재 작업 디렉토리가 이미 `experience-platform` 내부였음
- `cd experience-platform` 없이 바로 명령어 실행

---

### 12. 파일 구조 (현재)

```
experience-platform/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   └── BottomNav.tsx
│   │   └── screens/
│   │       ├── HomePage.tsx
│   │       ├── CampaignsListPage.tsx
│   │       ├── MyCampaignsPage.tsx
│   │       └── ProfilePage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── docs/
│   └── DEVELOPMENT_LOG.md (이 파일)
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── package.json
```

---

## 📝 개발 메모

### 디자인 컨셉
- **현대적이고 깔끔한 UI**: 둥근 모서리, 부드러운 그림자
- **모바일 최적화**: 터치 친화적인 큰 버튼, 넉넉한 간격
- **직관적인 네비게이션**: 하단 탭바로 주요 메뉴 접근
- **시각적 피드백**: Hover, Active 상태 명확히 표시

### 코드 품질
- TypeScript로 타입 안전성 확보
- 컴포넌트 재사용성 고려
- 명확한 파일/폴더 구조
- 일관된 네이밍 컨벤션

---

**최종 업데이트**: 2025-01-15
**작성자**: Claude
**다음 작업**: 진행중 체험단 페이지 구현
