# CLAUDE.md - 프로젝트 개발 규칙 및 산출물 생성 템플릿

> 실시간 체험단 앱 개발 가이드

## 사용 방법

1. 이 문서는 실시간 체험단 앱 프로젝트의 개발 규칙을 정의합니다
2. 모든 개발자는 이 규칙을 준수해야 합니다
3. 개발 진행하면서 지속적으로 업데이트합니다

---

# Part 1: 프로젝트 규칙

## 프로젝트 개요
- **프로젝트명**: 실시간 체험단 앱 (Real-time Experience Group App)
- **목적**: 블로거/인스타 일반 유저가 매장에 등록된 체험단 조건에 해당되면 선정절차 없이 바로 신청하고 참여 가능한 실시간 체험단 참여 서비스
- **기술스택**:
  - Frontend: React + TypeScript + Vite
  - Backend: Supabase (PostgreSQL + Auth)
  - Hosting: Render.com
  - Maps: Naver Maps API
  - State: Zustand
  - Style: TailwindCSS + Radix UI
- **배포**: 모바일 웹 → 향후 패키징하여 앱으로 배포 예정
- **포트**: 5173 (개발 서버)

## 핵심 개발 철학

### 1. 모바일 우선 (Mobile-First) 원칙
- **반응형 디자인**: 모바일 뷰포트 기준으로 개발 (375px~414px)
- **터치 친화적 UI**: 최소 터치 영역 44x44px 이상
- **성능 최적화**: 번들 크기 최소화, 이미지 lazy loading, code splitting

### 2. FE/BE 책임 범위
```
✅ FE 담당:
- UI/UX 렌더링 및 인터랙션
- 클라이언트 사이드 유효성 검사
- Naver Maps API 연동 (매장 위치 표시)
- SNS 데이터 분석 로직 (팔로워, 게시물 수 검증)
- 사용자 등급 계산 로직 (UI 표시용)
- LocalStorage 기반 임시 데이터 저장

❌ BE 담당 (FE에서 구현 금지):
- 인증/인가 처리 (Supabase Auth)
- 데이터베이스 CRUD (Supabase PostgreSQL)
- 사용자 등급 실제 저장 및 검증 (DB Row Level Security)
- 캠페인 매칭 로직의 최종 검증
- 결제 처리 (향후 추가 시)
```

## 기술 스택 & 구조

### 필수 기술 스택
```
Runtime: React 18 + TypeScript + Vite
State: Zustand (경량 상태관리)
Style: TailwindCSS + Radix UI
Router: React Router v6
Maps: Naver Maps API
Backend: Supabase (PostgreSQL + Auth + Storage)
Hosting: Render.com
```

### 프로젝트 구조
```
src/
├── components/
│   ├── ui/              # Radix UI 기반 재사용 컴포넌트
│   ├── common/          # 공통 컴포넌트 (Header, Footer, Navigation)
│   ├── screens/         # 화면 단위 컴포넌트
│   │   ├── auth/        # 로그인, 회원가입
│   │   ├── user/        # 일반 유저 화면
│   │   ├── owner/       # 업주 화면
│   │   └── admin/       # 관리자 화면
│   └── layout/          # 레이아웃 컴포넌트
├── stores/              # Zustand 상태 관리
│   ├── authStore.ts     # 인증 상태
│   ├── userStore.ts     # 사용자 정보
│   └── campaignStore.ts # 캠페인 상태
├── hooks/               # 커스텀 훅
│   ├── useAuth.ts
│   ├── useNaverMaps.ts
│   └── useSNSGrade.ts
├── services/            # API 통신 서비스
│   ├── supabase.ts      # Supabase 클라이언트
│   ├── authApi.ts       # 인증 API
│   ├── campaignApi.ts   # 캠페인 API
│   └── userApi.ts       # 유저 API
├── types/               # TypeScript 타입 정의
│   ├── user.ts
│   ├── campaign.ts
│   └── api.ts
├── utils/               # 유틸리티 함수
│   ├── validators.ts    # 유효성 검사
│   ├── formatters.ts    # 데이터 포맷팅
│   └── snsGradeCalculator.ts # SNS 등급 계산
├── mocks/               # MSW 모킹 데이터
└── assets/              # 정적 파일
```

## 코딩 컨벤션

### 1. 명명 규칙
```typescript
// 컴포넌트: PascalCase
const LoginScreen = () => { };
const CampaignCard = () => { };

// 변수/함수: camelCase
const userName = 'john';
const handleSubmit = () => { };

// 이벤트 핸들러: on[Action] 형태
const onLogin = () => { };
const onApplyCampaign = () => { };

// 상수: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_CAMPAIGN_APPLY = 5;

// 파일명:
// - 컴포넌트: PascalCase.tsx (LoginScreen.tsx)
// - 훅: camelCase.ts (useAuth.ts)
// - 기타: camelCase.ts (supabase.ts)
```

### 2. 컴포넌트 작성 규칙
```typescript
// ✅ 반드시 이 구조 준수
import { useState, useEffect, useMemo, useCallback } from 'react';

interface ComponentProps {
  // Props 타입 명시적 정의 (필수)
  campaignId: string;
  onApply?: () => void;
}

export const CampaignDetail = ({ campaignId, onApply }: ComponentProps) => {
  // 1. State 변수들
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. 커스텀 훅들
  const { user } = useAuth();
  const { calculateGrade } = useSNSGrade();

  // 3. 계산된 값들 (useMemo)
  const isEligible = useMemo(() => {
    if (!user || !campaign) return false;
    return user.grade >= campaign.requiredGrade;
  }, [user, campaign]);

  // 4. 이벤트 핸들러들 (useCallback)
  const handleApply = useCallback(() => {
    if (!isEligible) return;
    // 신청 로직...
    onApply?.();
  }, [isEligible, onApply]);

  // 5. 사이드 이펙트들 (useEffect)
  useEffect(() => {
    // 캠페인 데이터 로드...
  }, [campaignId]);

  // 6. 렌더링
  return <div>{/* JSX */}</div>;
};
```

### 3. 스타일링 규칙
```typescript
// ✅ TailwindCSS + Radix UI 사용
import { Button } from '@/components/ui/button';

// ✅ 프로젝트 전용 색상 정의 (tailwind.config.js)
const colors = {
  'primary': '#FF6B6B',      // 체험단 메인 컬러
  'secondary': '#4ECDC4',    // 서브 컬러
  'success': '#95E1D3',      // 성공 (승인, 완료)
  'warning': '#F9CA24',      // 경고 (대기, 검토중)
  'error': '#EE5A6F',        // 에러 (거절, 실패)
  'grade-bronze': '#CD7F32', // 브론즈 등급
  'grade-silver': '#C0C0C0', // 실버 등급
  'grade-gold': '#FFD700',   // 골드 등급
  'grade-platinum': '#E5E4E2', // 플래티넘 등급
};
```

## 프로젝트별 특화 규칙

### 1. 사용자 등급 시스템 규칙
```typescript
// ✅ SNS 등급 계산 로직
export interface SNSGrade {
  grade: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  score: number; // 0-100
  criteria: {
    followers: number;      // 팔로워 수
    posts: number;          // 게시물 수
    engagement: number;     // 평균 참여율 (좋아요+댓글/팔로워)
    reviewQuality: number;  // 후기 품질 점수 (관리자 평가)
  };
}

// 등급 기준
const GRADE_CRITERIA = {
  BRONZE: { minFollowers: 0, minPosts: 0, minScore: 0 },
  SILVER: { minFollowers: 1000, minPosts: 30, minScore: 30 },
  GOLD: { minFollowers: 5000, minPosts: 100, minScore: 60 },
  PLATINUM: { minFollowers: 10000, minPosts: 200, minScore: 80 },
};

// ❌ FE에서 등급 계산 후 직접 DB 저장 금지
// ✅ FE에서는 UI 표시만, 실제 저장은 Supabase Function에서 처리
```

### 2. 캠페인 매칭 규칙
```typescript
// ✅ 실시간 매칭 조건 검증
export interface CampaignMatchCriteria {
  requiredGrade: SNSGrade['grade'];  // 최소 요구 등급
  region?: string;                   // 지역 제한 (optional)
  ageRange?: [number, number];       // 연령대 제한 (optional)
  maxParticipants: number;           // 최대 참여자 수
  currentParticipants: number;       // 현재 참여자 수
  deadline: Date;                    // 마감일
}

// ✅ 자동 매칭 조건 체크
const canApply = (user: User, campaign: Campaign) => {
  return (
    user.grade >= campaign.requiredGrade &&
    campaign.currentParticipants < campaign.maxParticipants &&
    campaign.deadline > new Date() &&
    (!campaign.region || user.region === campaign.region)
  );
};
```

### 3. Naver Maps API 연동 규칙
```typescript
// ✅ 매장 위치 표시
export const useNaverMaps = (containerId: string) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const mapInstance = new naver.maps.Map(containerId, {
      center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 기본 위치
      zoom: 15,
    });
    setMap(mapInstance);
  }, [containerId]);

  const addMarker = (lat: number, lng: number, storeName: string) => {
    if (!map) return;
    new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map,
      title: storeName,
    });
  };

  return { map, addMarker };
};
```

## API 통신 규칙

```typescript
// ✅ Supabase 클라이언트 설정
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ 타입 우선 정의
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// ✅ 모듈별 API 서비스
export const campaignApi = {
  getList: async (filters: CampaignFilters) => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('status', 'active')
      .gte('deadline', new Date().toISOString());

    if (error) throw error;
    return data;
  },

  apply: async (campaignId: string, userId: string) => {
    const { data, error } = await supabase
      .from('campaign_applications')
      .insert({ campaign_id: campaignId, user_id: userId });

    if (error) throw error;
    return data;
  },
};
```

## 테스트 & 품질 관리

```typescript
// ✅ 컴포넌트 테스트 (Vitest + React Testing Library)
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CampaignCard } from './CampaignCard';

describe('CampaignCard', () => {
  it('캠페인 정보를 올바르게 표시한다', () => {
    const campaign = {
      id: '1',
      title: '맛집 체험단',
      requiredGrade: 'SILVER',
      maxParticipants: 10,
    };

    render(<CampaignCard campaign={campaign} />);
    expect(screen.getByText('맛집 체험단')).toBeInTheDocument();
  });
});

// ✅ API 모킹 (MSW)
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/campaigns', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [
          { id: '1', title: '맛집 체험단', requiredGrade: 'SILVER' },
        ],
      })
    );
  }),
];
```

## 개발 명령어

```bash
npm run dev          # 개발 서버 (localhost:5173)
npm run build        # 프로덕션 빌드
npm run test         # Vitest 테스트
npm run type-check   # TypeScript 타입 체크
npm run lint         # ESLint 린트
```

## 주의사항

### ❌ 금지 사항
- **console.log 운영 코드 포함 금지** (개발 중에만 사용, 커밋 전 제거)
- **any 타입 사용 금지** (unknown 사용 후 타입 가드 적용)
- **직접 DB 쿼리 작성 금지** (Supabase RPC/Functions 사용)
- **하드코딩된 API 키 금지** (환경 변수 사용)
- **인라인 스타일 사용 금지** (TailwindCSS 클래스 사용)

### ✅ 준수 사항
- **모든 API 호출에 에러 핸들링 필수**
- **로딩 상태 UI 표시 필수** (Skeleton, Spinner)
- **무한 스크롤 적용 시 성능 최적화** (Intersection Observer)
- **이미지 최적화 필수** (WebP 포맷, lazy loading)
- **접근성 준수** (ARIA 레이블, 키보드 네비게이션)

---

# Part 2: 산출물 생성 가이드 (모든 프로젝트 공통)

## 문서 관리 규칙

### 화면 변경 시 문서 업데이트 (필수)
**화면이 업데이트, 추가, 삭제될 때마다 반드시 관련 .md 문서들을 함께 업데이트해야 합니다.**

```
화면 변경 시 업데이트 대상 문서:
├── docs/INFORMATION_ARCHITECTURE.md    # IA 구조, 사이트맵
├── docs/SCREEN_SPECIFICATIONS.md       # 화면별 기능 명세
├── docs/API_SPECIFICATION.md           # 연관 API 엔드포인트
├── docs/DESIGN_SYSTEM.md              # 새로운 UI 패턴 (필요시)
└── README.md                          # 전체 기능 목록
```

### 문서 동기화 체크리스트
- [ ] IA 문서의 사이트맵이 실제 라우팅과 일치하는가?
- [ ] 화면 명세가 실제 구현된 기능과 일치하는가?
- [ ] API 명세가 실제 사용되는 엔드포인트와 일치하는가?
- [ ] README의 기능 목록이 최신 상태인가?

## 프로젝트 산출물 생성 가이드

**새 프로젝트에서 동일한 산출물 구조를 만들기 위한 가이드입니다.**

### 1. README.md 작성 규칙

README.md는 프로젝트의 첫인상이자 전체 개요를 제공합니다.

```markdown
# [프로젝트명]

## 프로젝트 개요
- **목적**: 한 줄 요약
- **사용자**: 대상 사용자군
- **환경**: 배포 환경 (모바일, 데스크톱, 하이브리드 등)

## 기술 스택
[![기술명](https://img.shields.io/badge/기술명-버전-색상코드?logo=로고명)](링크)
- shields.io를 활용한 배지 형식으로 주요 기술 스택 표시
- 예: React, TypeScript, Vite, TailwindCSS, Radix UI 등

## 주요 기능
- **기능 1**: 설명
- **기능 2**: 설명
- 업무 모듈별로 계층 구조로 정리

## 프로젝트 구조
```
src/
├── components/
│   ├── ui/
│   ├── common/
│   ├── screens/
│   └── layout/
├── stores/
├── hooks/
...
```

## 개발 가이드
### 시작하기
```bash
npm install
npm run dev
```

### 주요 명령어
- `npm run dev`: 개발 서버
- `npm run build`: 프로덕션 빌드
- `npm run test`: 테스트 실행

## 문서
- [정보구조도](./docs/INFORMATION_ARCHITECTURE.md)
- [화면명세서](./docs/SCREEN_SPECIFICATIONS.md)
- [API명세서](./docs/API_SPECIFICATION.md)
- [디자인시스템](./docs/DESIGN_SYSTEM.md)

## 프로젝트 진행률
![Progress](https://img.shields.io/badge/진행률-XX%25-색상코드)
- 완료된 모듈: N/M
- 현재 진행 중: Phase X
```

### 2. 정보구조도 (INFORMATION_ARCHITECTURE.md) 작성 규칙

**목적**: 전체 사이트맵과 화면 간 네비게이션 구조를 명확히 정의

```markdown
# [프로젝트명] 정보구조도

## 개요
시스템의 전체 화면 구조와 네비게이션 경로를 정의합니다.

## 홈 화면 메뉴 구조 (X개 메뉴)
```
홈 화면 (HomeScreen)
├── 메뉴1 (/path1)
├── 메뉴2 (/path2)
└── 메뉴N (/pathN)
```

## 전체 사이트맵 (Implemented Features Only)
```
[앱명]
├── 인증 (Authentication)
│   └── 로그인 (/login) - LoginScreen
│
├── 메인 홈 (Home Dashboard)
│   └── 런처 (/home) - HomeScreen
│
├── 업무모듈1 (Module 1) - /module1
│   ├── 목록 (/) - Module1ListScreen
│   └── 상세 (/:id)
│       ├── 상세 정보 (/) - Module1DetailScreen
│       ├── 하위기능1 (/sub1) - Sub1Screen
│       └── 하위기능2 (/sub2) - Sub2Screen
│
└── 설정 (Settings) - /settings
    └── 설정 화면 (/) - SettingsScreen
```

## 화면 설명

### 인증 및 홈
- **LoginScreen**: 로그인 화면 설명
- **HomeScreen**: 메인 런처 화면 설명

### 업무모듈1
- **Module1ListScreen**: 목록 화면 설명
- **Module1DetailScreen**: 상세 화면 설명
- 각 화면의 역할과 주요 기능 간략 설명

---
*참고: 특별한 네비게이션 규칙이 있다면 여기에 명시*
```

**작성 규칙**:
- 반드시 실제 구현된 화면만 포함 (플레이스홀더 제외)
- 라우트 경로와 컴포넌트명을 정확히 매칭
- AppRouter.tsx의 실제 라우팅 구조와 100% 일치해야 함
- 화면명은 [기능명]Screen 형태로 통일

### 3. 화면명세서 (SCREEN_SPECIFICATIONS.md) 생성 규칙

**목적**: 각 화면의 UI, 기능, 프로세스를 스크린샷과 함께 문서화

#### 3.1. 스크린샷 캡처 자동화

**scripts/capture-[기능명].mjs 패턴**:
```javascript
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // 모바일 뷰포트 (프로젝트에 맞게 조정)
  });
  const page = await context.newPage();

  // 개발 서버 접속
  await page.goto('http://localhost:[포트]/[경로]');
  await page.waitForLoadState('networkidle');

  // 1. 초기 화면 캡처
  await page.screenshot({
    path: 'docs/screenshots/feature-screen.png',
    fullPage: false
  });

  // 2. 인터랙션 후 캡처 (필요시)
  await page.click('button#some-button');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'docs/screenshots/feature-modal.png',
    fullPage: false
  });

  // 3. 스크롤 화면 캡처 (긴 페이지용)
  await page.evaluate(() => {
    const scrollContainers = document.querySelectorAll('div');
    for (const container of scrollContainers) {
      const style = window.getComputedStyle(container);
      if (style.overflowY === 'auto' || style.overflow === 'auto') {
        container.scrollTop = container.scrollHeight;
      }
    }
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'docs/screenshots/feature-screen-scrolled.png',
    fullPage: false
  });

  await browser.close();
  console.log('✅ 스크린샷 캡처 완료');
})();
```

**스크린샷 명명 규칙**:
- 기본 화면: `[기능명]-[화면명].png` (예: settings-main.png)
- 스크롤 화면: `[기능명]-[화면명]-scrolled.png` (예: settings-main-scrolled.png)
- 모달/팝업: `[기능명]-[요소명]-modal.png` (예: settings-printer-modal.png)
- 저장 위치: `docs/screenshots/`

**스크린샷 캡처 시기**:
- 세로로 긴 화면: 상단/하단 2장 캡처 (dual screenshot)
- 모달/드롭다운: 열린 상태 캡처
- 탭 전환: 각 탭별 캡처
- 상태 변화: 변화 전/후 캡처

#### 3.2. 화면명세서 자동 생성 스크립트

**scripts/generate-complete-spec.cjs 패턴**:
```javascript
const fs = require('fs');
const path = require('path');

const screens = [
  {
    id: 'PD-XXX-001',
    category: '카테고리명',
    name: '화면명',
    route: '/route/path',
    component: 'ScreenName',
    screenshot: 'screenshot-name.png',
    screenshotScrolled: 'screenshot-name-scrolled.png', // 선택적
    features: [
      '주요 기능 1',
      '주요 기능 2',
      '주요 기능 3'
    ],
    process: [
      { step: 1, action: '사용자가 수행하는 액션', result: '시스템 반응' },
      { step: 2, action: '다음 액션', result: '다음 반응' }
    ]
  },
  // ... 모든 화면 정의
];

function generateMarkdown() {
  let markdown = `# 화면 명세서\n\n`;
  markdown += `**문서 버전**: 1.0\n`;
  markdown += `**최종 수정일**: ${new Date().toISOString().split('T')[0]}\n\n`;

  // 카테고리별 그룹화
  const categories = {};
  screens.forEach(screen => {
    if (!categories[screen.category]) {
      categories[screen.category] = [];
    }
    categories[screen.category].push(screen);
  });

  // 각 카테고리별 테이블 생성
  Object.keys(categories).forEach(category => {
    markdown += `## ${category}\n\n`;
    markdown += `<table>\n`;
    markdown += `<tr>\n`;
    markdown += `  <th style="width: 10%;">화면 ID</th>\n`;
    markdown += `  <th style="width: 15%;">화면명</th>\n`;
    markdown += `  <th style="width: 50%;">화면 이미지</th>\n`;
    markdown += `  <th style="width: 25%;">주요 기능</th>\n`;
    markdown += `</tr>\n`;

    categories[category].forEach(screen => {
      markdown += `<tr>\n`;
      markdown += `  <td>${screen.id}</td>\n`;
      markdown += `  <td><strong>${screen.name}</strong><br/><code>${screen.route}</code></td>\n`;

      // 스크린샷 처리 (dual screenshot 지원)
      if (screen.screenshotScrolled) {
        markdown += `  <td style="width: 50%;">\n`;
        markdown += `    <div style="display: flex; gap: 10px;">\n`;
        markdown += `      <div style="text-align: center;">\n`;
        markdown += `        <img src="./screenshots/${screen.screenshot}" style="height: 200px;" alt="${screen.name} (상단)" />\n`;
        markdown += `        <div>상단 화면</div>\n`;
        markdown += `      </div>\n`;
        markdown += `      <div style="text-align: center;">\n`;
        markdown += `        <img src="./screenshots/${screen.screenshotScrolled}" style="height: 200px;" alt="${screen.name} (하단)" />\n`;
        markdown += `        <div>하단 화면</div>\n`;
        markdown += `      </div>\n`;
        markdown += `    </div>\n`;
        markdown += `  </td>\n`;
      } else {
        markdown += `  <td><img src="./screenshots/${screen.screenshot}" alt="${screen.name}" style="max-width: 100%; height: auto;" /></td>\n`;
      }

      markdown += `  <td>\n`;
      markdown += `    <strong>주요 기능:</strong>\n`;
      markdown += `    <ul>\n`;
      screen.features.forEach(feature => {
        markdown += `      <li>${feature}</li>\n`;
      });
      markdown += `    </ul>\n`;
      markdown += `    <strong>프로세스:</strong>\n`;
      markdown += `    <ol>\n`;
      screen.process.forEach(p => {
        markdown += `      <li>${p.action} → ${p.result}</li>\n`;
      });
      markdown += `    </ol>\n`;
      markdown += `  </td>\n`;
      markdown += `</tr>\n`;
    });

    markdown += `</table>\n\n`;
  });

  return markdown;
}

// 파일 생성
const markdown = generateMarkdown();
fs.writeFileSync(
  path.join(__dirname, '../docs/SCREEN_SPECIFICATIONS.md'),
  markdown,
  'utf8'
);
console.log('✅ SCREEN_SPECIFICATIONS.md 생성 완료');
```

**실행 방법**:
```bash
# 1. 스크린샷 캡처
node scripts/capture-login.mjs
node scripts/capture-settings.mjs
# ... 모든 화면 캡처

# 2. 명세서 생성
node scripts/generate-complete-spec.cjs
```

### 4. API 명세서 (API_SPECIFICATION.md) 작성 규칙

**목적**: 프론트엔드에서 호출하는 모든 API 엔드포인트 문서화

```markdown
# API 명세서

**Base URL**: `https://api.example.com/api/v1`

## 1. 인증 API

### 1.1. 일반 로그인
- **Endpoint**: `POST /auth/login`
- **설명**: 사용자명/비밀번호 기반 로그인
- **Request**:
```json
{
  "username": "user001",
  "password": "password123"
}
```
- **Response (성공)**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "dGhpcyBpcyByZWZyZXNo...",
    "user": {
      "id": "U001",
      "username": "user001",
      "name": "홍길동",
      "department": "개발팀"
    }
  },
  "timestamp": "2025-01-07T10:30:00Z"
}
```
- **Response (실패)**:
```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "아이디 또는 비밀번호가 올바르지 않습니다."
  },
  "timestamp": "2025-01-07T10:30:00Z"
}
```

### 1.2. [다른 API]
- **Endpoint**: `[METHOD] /path`
- **설명**: ...
- **Request**: ...
- **Response**: ...

## 2. [모듈명] API

### 2.1. [기능명]
- **Endpoint**: `[METHOD] /path`
- **Query Parameters**:
  - `param1`: 설명
  - `param2`: 설명
- **Response**: ...

## 공통 응답 형식

모든 API는 다음 형식을 따릅니다:

**성공 응답**:
```json
{
  "success": true,
  "data": { /* 실제 데이터 */ },
  "message": "선택적 메시지",
  "timestamp": "ISO 8601 형식",
  "requestId": "요청 추적용 UUID"
}
```

**실패 응답**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자 친화적 오류 메시지",
    "details": "개발자용 상세 정보 (선택적)"
  },
  "timestamp": "ISO 8601 형식",
  "requestId": "요청 추적용 UUID"
}
```

## HTTP 상태 코드
- `200 OK`: 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스 없음
- `500 Internal Server Error`: 서버 오류
```

**작성 규칙**:
- 업무 모듈별로 섹션 분리
- 각 엔드포인트마다 Request/Response 예시 필수
- 에러 코드와 메시지 명시
- 인증 헤더 요구사항 명시 (JWT 등)

### 5. 산출물 생성 워크플로우

**새 프로젝트 시작 시**:
```bash
# 1. 프로젝트 구조 생성
npm create vite@latest project-name -- --template react-ts
cd project-name

# 2. 문서 디렉토리 생성
mkdir -p docs/screenshots scripts

# 3. 기본 문서 파일 생성
touch docs/INFORMATION_ARCHITECTURE.md
touch docs/SCREEN_SPECIFICATIONS.md
touch docs/API_SPECIFICATION.md
touch docs/DESIGN_SYSTEM.md

# 4. 스크립트 디렉토리 생성
touch scripts/generate-complete-spec.cjs

# 5. README.md 작성 (위 템플릿 참고)
```

**화면 구현 후 문서 생성 프로세스**:
1. 화면 구현 완료
2. 스크린샷 캡처 스크립트 작성 (`scripts/capture-[기능명].mjs`)
3. 스크린샷 캡처 실행
4. `generate-complete-spec.cjs`의 screens 배열에 화면 정보 추가
5. 명세서 자동 생성 실행
6. IA 문서에 라우팅 정보 수동 업데이트
7. API 명세서에 사용된 엔드포인트 추가
8. README.md의 기능 목록 업데이트

**Git 커밋 패턴**:
```bash
git add docs/ scripts/
git commit -m "docs: [기능명] 화면 명세서 및 스크린샷 추가

- [기능명] 스크린샷 캡처 (N개)
- SCREEN_SPECIFICATIONS.md 업데이트
- INFORMATION_ARCHITECTURE.md 사이트맵 추가
- API_SPECIFICATION.md [기능명] API 추가

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 6. 자동화 팁

**package.json에 스크립트 추가**:
```json
{
  "scripts": {
    "capture:all": "node scripts/capture-login.mjs && node scripts/capture-home.mjs && ...",
    "docs:generate": "node scripts/generate-complete-spec.cjs",
    "docs:update": "npm run capture:all && npm run docs:generate"
  }
}
```

**실행**:
```bash
npm run docs:update  # 모든 스크린샷 재캡처 + 명세서 재생성
```

---

**이 템플릿을 활용하여 어떤 프로젝트에서도 일관된 품질의 문서 산출물을 생성하세요.**
