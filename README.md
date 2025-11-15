# 실시간 체험단 앱 (Real-time Experience Group App)

## 프로젝트 개요
- **목적**: 블로거/인스타 일반 유저가 매장에 등록된 체험단 조건에 해당되면 선정절차 없이 바로 신청하고 참여 가능한 실시간 체험단 참여 서비스
- **사용자**:
  - **일반 유저**: SNS 인플루언서, 블로거, 인스타그래머
  - **업주**: 매장 사장님 (캠페인 등록 및 관리)
  - **관리자**: 시스템 관리 및 사용자 등급 승인
- **환경**: 모바일 웹 (향후 React Native 또는 Capacitor로 패키징하여 앱 배포 예정)

## 기술 스택

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)](https://supabase.com/)
[![Render](https://img.shields.io/badge/Render-Hosting-46E3B7?logo=render)](https://render.com/)

### 세부 기술 스택
- **Frontend**:
  - React 18 + TypeScript
  - Vite (빌드 도구)
  - TailwindCSS (스타일링)
  - Radix UI (접근성 있는 UI 컴포넌트)
  - Zustand (상태 관리)
  - React Router v6 (라우팅)

- **Backend & Infrastructure**:
  - Supabase (PostgreSQL DB + Authentication + Storage + Realtime)
  - Render.com (프론트엔드 호스팅)

- **External APIs**:
  - Naver Maps API (매장 위치 표시)
  - Instagram API (SNS 데이터 분석 - 선택적)

## 주요 기능

### 1. 사용자 인증 및 권한 관리
- **회원가입/로그인**: Supabase Auth 기반 인증
- **SNS 연동**: Instagram, Blog 계정 연동
- **사용자 역할**: 일반 유저, 업주, 관리자 3가지 역할 관리

### 2. 사용자 등급 시스템 (가장 높은 난이도)
- **SNS 데이터 기반 등급 산정**:
  - 팔로워 수
  - 게시물 수
  - 평균 참여율 (좋아요 + 댓글 / 팔로워)
  - 후기 품질 점수 (관리자 평가)

- **등급 체계**:
  - 🥉 **BRONZE**: 신규 사용자 (팔로워 0+, 게시물 0+)
  - 🥈 **SILVER**: 일반 인플루언서 (팔로워 1,000+, 게시물 30+)
  - 🥇 **GOLD**: 중견 인플루언서 (팔로워 5,000+, 게시물 100+)
  - 💎 **PLATINUM**: 상위 인플루언서 (팔로워 10,000+, 게시물 200+)

- **등급별 혜택**:
  - 상위 등급일수록 더 많은 캠페인 참여 가능
  - 우선 선정 기회
  - 더 높은 리워드 제공

### 3. 업주 매장 등록 및 캠페인 관리
- **매장 등록**:
  - 매장 기본 정보 (이름, 주소, 연락처)
  - Naver Maps API 연동으로 위치 지도 표시
  - 매장 사진 업로드

- **캠페인 생성 및 관리**:
  - 체험단 캠페인 등록 (제목, 설명, 제공 혜택)
  - 참여 조건 설정:
    - 최소 요구 등급 (BRONZE ~ PLATINUM)
    - 지역 제한 (선택적)
    - 연령대 제한 (선택적)
    - 최대 참여자 수
    - 모집 기간 (시작일~마감일)

- **신청자 관리**:
  - 실시간 신청자 목록 확인
  - 신청자 프로필 및 등급 확인
  - 체험 완료 후 후기 확인

### 4. 실시간 매칭 및 후기 관리
- **실시간 캠페인 목록**:
  - 현재 모집 중인 캠페인 실시간 표시
  - 내 등급으로 참여 가능한 캠페인 필터링
  - 지역별, 카테고리별 필터링
  - 지도 뷰로 주변 매장 캠페인 확인

- **자동 매칭 시스템**:
  - 조건 충족 시 즉시 신청 가능 (선정 절차 없음)
  - 선착순 마감 (최대 참여자 수 도달 시 자동 마감)

- **체험 및 후기**:
  - 체험 완료 체크인 (위치 기반 인증)
  - 사진 + 텍스트 후기 작성
  - 후기 품질 평가 (관리자) → 등급 점수에 반영
  - SNS 공유 인증 (Instagram, Blog 링크)

### 5. 관리자 기능
- **사용자 관리**: 전체 사용자 목록 및 등급 수동 조정
- **캠페인 모니터링**: 부적절한 캠페인 관리
- **후기 품질 평가**: 후기 검수 및 점수 부여
- **통계 대시보드**: 월별 가입자, 캠페인 수, 활성 사용자 통계

## 프로젝트 구조

```
src/
├── components/
│   ├── ui/              # Radix UI 기반 재사용 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── common/          # 공통 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── LoadingSpinner.tsx
│   ├── screens/         # 화면 단위 컴포넌트
│   │   ├── auth/        # 로그인, 회원가입
│   │   ├── user/        # 일반 유저 화면 (캠페인 목록, 신청, 내 활동)
│   │   ├── owner/       # 업주 화면 (매장 관리, 캠페인 관리)
│   │   └── admin/       # 관리자 화면 (대시보드, 사용자 관리)
│   └── layout/          # 레이아웃 컴포넌트
│       ├── MainLayout.tsx
│       └── AuthLayout.tsx
├── stores/              # Zustand 상태 관리
│   ├── authStore.ts     # 인증 상태 (로그인 유저, 토큰)
│   ├── userStore.ts     # 사용자 정보 (프로필, 등급)
│   └── campaignStore.ts # 캠페인 상태 (목록, 필터)
├── hooks/               # 커스텀 훅
│   ├── useAuth.ts       # 인증 관련 훅
│   ├── useNaverMaps.ts  # Naver Maps 연동 훅
│   └── useSNSGrade.ts   # SNS 등급 계산 훅
├── services/            # API 통신 서비스
│   ├── supabase.ts      # Supabase 클라이언트 초기화
│   ├── authApi.ts       # 인증 API
│   ├── campaignApi.ts   # 캠페인 API
│   ├── userApi.ts       # 유저 API
│   └── storeApi.ts      # 매장 API
├── types/               # TypeScript 타입 정의
│   ├── user.ts          # User, UserRole, SNSGrade
│   ├── campaign.ts      # Campaign, Application
│   ├── store.ts         # Store (매장)
│   └── api.ts           # API 요청/응답 타입
├── utils/               # 유틸리티 함수
│   ├── validators.ts    # 폼 유효성 검사
│   ├── formatters.ts    # 날짜, 숫자 포맷팅
│   └── snsGradeCalculator.ts # SNS 등급 계산 로직
├── mocks/               # MSW 모킹 데이터 (개발용)
└── assets/              # 정적 파일 (이미지, 아이콘)
```

## 데이터 모델 개요

### 주요 테이블 (Supabase PostgreSQL)
1. **users** - 사용자 정보
   - id, email, username, role (USER/OWNER/ADMIN), grade, sns_data, created_at

2. **stores** - 매장 정보
   - id, owner_id, name, address, lat, lng, category, photos, created_at

3. **campaigns** - 체험단 캠페인
   - id, store_id, title, description, required_grade, max_participants, deadline, status

4. **applications** - 캠페인 신청
   - id, campaign_id, user_id, status (PENDING/APPROVED/COMPLETED/REJECTED), applied_at

5. **reviews** - 체험 후기
   - id, application_id, user_id, rating, content, photos, sns_links, quality_score, created_at

## 개발 가이드

### 환경 설정

#### 1. 저장소 클론 및 의존성 설치
```bash
git clone <repository-url>
cd realtime-experience-group-app
npm install
```

#### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일 생성:
```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Naver Maps API
VITE_NAVER_MAPS_CLIENT_ID=your-client-id

# 기타
VITE_API_BASE_URL=http://localhost:5173
```

#### 3. Supabase 설정
1. [Supabase](https://supabase.com/)에서 새 프로젝트 생성
2. SQL Editor에서 테이블 생성 (schema.sql 참고)
3. Authentication 설정 (Email/Password 활성화)
4. Row Level Security (RLS) 정책 설정

### 시작하기
```bash
# 개발 서버 실행 (localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 주요 명령어
```bash
npm run dev          # 개발 서버 (Vite)
npm run build        # 프로덕션 빌드
npm run test         # Vitest 유닛 테스트
npm run type-check   # TypeScript 타입 체크
npm run lint         # ESLint 린트
npm run format       # Prettier 포맷팅
```

## 문서

프로젝트의 상세 문서는 아래 링크를 참고하세요:

- [개발 규칙 및 컨벤션](./CLAUDE.md) - 코딩 스타일, 아키텍처 규칙
- [정보구조도](./docs/INFORMATION_ARCHITECTURE.md) - 전체 사이트맵 및 화면 구조
- [화면명세서](./docs/SCREEN_SPECIFICATIONS.md) - 각 화면별 기능 및 UI 명세
- [API명세서](./docs/API_SPECIFICATION.md) - Supabase API 엔드포인트 명세
- [디자인시스템](./docs/DESIGN_SYSTEM.md) - UI 컴포넌트 및 스타일 가이드

## 프로젝트 진행률

![Progress](https://img.shields.io/badge/진행률-0%25-red)

### Phase 1: 기반 구축 (예정)
- [ ] 프로젝트 초기 설정 (Vite + React + TypeScript)
- [ ] Supabase 설정 및 테이블 스키마 생성
- [ ] 인증 시스템 구현 (로그인/회원가입)
- [ ] 기본 레이아웃 및 라우팅 구조

### Phase 2: 핵심 기능 개발 (예정)
- [ ] 사용자 등급 시스템 구현
- [ ] 업주 매장 등록 및 관리
- [ ] 캠페인 생성 및 목록 표시
- [ ] Naver Maps API 연동

### Phase 3: 실시간 매칭 (예정)
- [ ] 실시간 캠페인 매칭 로직
- [ ] 신청 및 승인 프로세스
- [ ] 위치 기반 체크인 기능
- [ ] 후기 작성 및 관리

### Phase 4: 관리자 및 최적화 (예정)
- [ ] 관리자 대시보드
- [ ] 사용자/캠페인 통계
- [ ] 성능 최적화 (이미지, 번들 크기)
- [ ] 모바일 앱 패키징 (Capacitor/React Native)

---

## 라이선스

MIT License

## 기여

이 프로젝트는 현재 개발 초기 단계입니다. 기여를 원하시면 이슈를 등록해주세요.

---

**🤖 Generated with [Claude Code](https://claude.com/claude-code)**

Co-Authored-By: Claude <noreply@anthropic.com>
