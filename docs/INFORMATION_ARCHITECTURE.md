# 실시간 체험단 앱 - 정보구조도 (Information Architecture)

**문서 버전**: 1.0
**최종 수정일**: 2025-11-15
**작성자**: Claude Code

---

## 개요

이 문서는 실시간 체험단 앱의 전체 화면 구조와 네비게이션 경로를 정의합니다.
사용자 역할(일반 유저, 업주, 관리자)별로 접근 가능한 화면이 다르며, React Router v6 기반으로 라우팅됩니다.

---

## 사용자 역할별 접근 권한

| 역할 | 설명 | 주요 기능 |
|------|------|-----------|
| **일반 유저** (USER) | 블로거, 인스타그래머 | 캠페인 조회 및 신청, 후기 작성 |
| **업주** (OWNER) | 매장 사장님 | 매장 관리, 캠페인 생성 및 관리 |
| **관리자** (ADMIN) | 시스템 관리자 | 전체 사용자/캠페인 관리, 통계 |

---

## 전체 사이트맵 (Planned Structure)

```
실시간 체험단 앱
│
├── 🔐 인증 (Authentication) - /auth
│   ├── 로그인 (/auth/login) - LoginScreen
│   ├── 회원가입 (/auth/signup) - SignupScreen
│   └── 비밀번호 찾기 (/auth/reset-password) - ResetPasswordScreen
│
├── 🏠 메인 홈 (Home Dashboard) - /
│   └── 홈 화면 (/) - HomeScreen
│       ├── 역할별 대시보드 표시
│       └── 최근 활동 요약
│
├── 👤 일반 유저 (User) - /user
│   ├── 캠페인 목록 (/user/campaigns) - CampaignListScreen
│   │   ├── 목록 뷰 (/) - CampaignListScreen
│   │   ├── 지도 뷰 (/map) - CampaignMapScreen
│   │   └── 캠페인 상세 (/:id) - CampaignDetailScreen
│   │
│   ├── 내 활동 (/user/my-activities) - MyActivitiesScreen
│   │   ├── 신청 내역 (/applications) - MyApplicationsScreen
│   │   ├── 체험 진행 중 (/ongoing) - OngoingExperiencesScreen
│   │   └── 완료된 체험 (/completed) - CompletedExperiencesScreen
│   │
│   ├── 내 후기 (/user/reviews) - MyReviewsScreen
│   │   ├── 작성한 후기 목록 (/) - MyReviewsScreen
│   │   └── 후기 작성 (/new) - WriteReviewScreen
│   │
│   └── 내 프로필 (/user/profile) - UserProfileScreen
│       ├── 프로필 정보 (/) - UserProfileScreen
│       ├── SNS 연동 (/sns-connect) - SNSConnectScreen
│       └── 등급 정보 (/grade) - GradeInfoScreen
│
├── 🏪 업주 (Owner) - /owner
│   ├── 내 매장 (/owner/stores) - MyStoresScreen
│   │   ├── 매장 목록 (/) - MyStoresScreen
│   │   ├── 매장 등록 (/new) - CreateStoreScreen
│   │   └── 매장 상세 (/:id) - StoreDetailScreen
│   │       ├── 매장 정보 수정 (/edit) - EditStoreScreen
│   │       └── 매장 삭제 확인 모달
│   │
│   ├── 내 캠페인 (/owner/campaigns) - MyCampaignsScreen
│   │   ├── 캠페인 목록 (/) - MyCampaignsScreen
│   │   ├── 캠페인 생성 (/new) - CreateCampaignScreen
│   │   └── 캠페인 상세 (/:id) - CampaignManageScreen
│   │       ├── 캠페인 정보 (/) - CampaignManageScreen
│   │       ├── 신청자 관리 (/applicants) - ApplicantsManageScreen
│   │       └── 후기 확인 (/reviews) - CampaignReviewsScreen
│   │
│   └── 업주 대시보드 (/owner/dashboard) - OwnerDashboardScreen
│       ├── 매장/캠페인 통계
│       └── 최근 신청 현황
│
├── ⚙️ 관리자 (Admin) - /admin
│   ├── 관리자 대시보드 (/admin/dashboard) - AdminDashboardScreen
│   │   ├── 전체 통계 (가입자, 캠페인, 활성 사용자)
│   │   ├── 월별 트렌드 그래프
│   │   └── 최근 활동 로그
│   │
│   ├── 사용자 관리 (/admin/users) - UserManagementScreen
│   │   ├── 사용자 목록 (/) - UserManagementScreen
│   │   └── 사용자 상세 (/:id) - UserDetailManageScreen
│   │       ├── 사용자 정보 조회/수정
│   │       ├── 등급 수동 조정
│   │       └── 계정 정지/활성화
│   │
│   ├── 캠페인 관리 (/admin/campaigns) - CampaignManagementScreen
│   │   ├── 전체 캠페인 목록 (/) - CampaignManagementScreen
│   │   └── 캠페인 상세 (/:id) - CampaignDetailManageScreen
│   │       ├── 캠페인 정보 조회
│   │       ├── 부적절 캠페인 숨김/삭제
│   │       └── 신청자 목록 확인
│   │
│   └── 후기 품질 관리 (/admin/reviews) - ReviewQualityManagementScreen
│       ├── 후기 목록 (/) - ReviewQualityManagementScreen
│       └── 후기 상세 (/:id) - ReviewQualityDetailScreen
│           ├── 후기 검수
│           └── 품질 점수 부여 (0-10점)
│
└── 🔧 설정 (Settings) - /settings
    └── 설정 화면 (/) - SettingsScreen
        ├── 알림 설정
        ├── 개인정보 수정
        └── 로그아웃
```

---

## 화면 설명

### 1. 인증 (Authentication)

#### LoginScreen (`/auth/login`)
- **목적**: 사용자 로그인
- **기능**:
  - 이메일/비밀번호 입력
  - Supabase Auth를 통한 인증
  - 로그인 성공 시 역할별 홈 화면으로 리디렉션
  - "회원가입" 및 "비밀번호 찾기" 링크 제공

#### SignupScreen (`/auth/signup`)
- **목적**: 신규 사용자 회원가입
- **기능**:
  - 이메일, 비밀번호, 사용자명 입력
  - 역할 선택 (일반 유저 / 업주)
  - 회원가입 후 자동 로그인
  - SNS 계정 연동 옵션 (선택적)

#### ResetPasswordScreen (`/auth/reset-password`)
- **목적**: 비밀번호 분실 시 재설정
- **기능**:
  - 이메일 입력
  - Supabase Auth 비밀번호 재설정 메일 발송
  - 메일 링크 클릭 → 새 비밀번호 설정

---

### 2. 메인 홈 (Home Dashboard)

#### HomeScreen (`/`)
- **목적**: 역할별 메인 대시보드
- **기능**:
  - **일반 유저**:
    - 추천 캠페인 목록
    - 내 등급 정보 카드
    - 최근 신청 현황
  - **업주**:
    - 내 매장 요약
    - 진행 중인 캠페인 현황
    - 신규 신청 알림
  - **관리자**:
    - 전체 통계 대시보드로 리디렉션

---

### 3. 일반 유저 (User)

#### CampaignListScreen (`/user/campaigns`)
- **목적**: 현재 모집 중인 체험단 캠페인 목록 조회
- **기능**:
  - 캠페인 카드 목록 (제목, 매장명, 요구 등급, 마감일, 참여자 수)
  - 필터링:
    - 내 등급으로 참여 가능한 캠페인만
    - 지역별, 카테고리별 필터
  - 무한 스크롤 (Intersection Observer)
  - "지도 보기" 버튼 → CampaignMapScreen

#### CampaignMapScreen (`/user/campaigns/map`)
- **목적**: Naver Maps API로 주변 캠페인 지도 표시
- **기능**:
  - 현재 위치 기반 지도 표시
  - 캠페인 매장 위치 마커 표시
  - 마커 클릭 → 캠페인 정보 팝업
  - "목록 보기" 버튼 → CampaignListScreen

#### CampaignDetailScreen (`/user/campaigns/:id`)
- **목적**: 캠페인 상세 정보 및 신청
- **기능**:
  - 캠페인 상세 정보 (제목, 설명, 혜택, 조건)
  - 매장 정보 (이름, 주소, 지도)
  - 신청 조건 충족 여부 표시
  - "신청하기" 버튼 (조건 충족 시 활성화)
  - 이미 신청한 경우 "신청 완료" 표시

#### MyActivitiesScreen (`/user/my-activities`)
- **목적**: 내가 신청한 캠페인 및 체험 현황 확인
- **기능**:
  - 탭 메뉴:
    - 신청 내역 (MyApplicationsScreen)
    - 체험 진행 중 (OngoingExperiencesScreen)
    - 완료된 체험 (CompletedExperiencesScreen)

#### MyReviewsScreen (`/user/reviews`)
- **목적**: 내가 작성한 후기 목록
- **기능**:
  - 작성한 후기 카드 목록
  - 후기별 품질 점수 표시
  - "새 후기 작성" 버튼 → WriteReviewScreen

#### WriteReviewScreen (`/user/reviews/new`)
- **목적**: 체험 완료 후 후기 작성
- **기능**:
  - 별점 평가 (1-5점)
  - 텍스트 후기 입력
  - 사진 업로드 (최대 5장)
  - SNS 공유 링크 입력 (Instagram, Blog)
  - 위치 기반 체크인 인증

#### UserProfileScreen (`/user/profile`)
- **목적**: 내 프로필 정보 관리
- **기능**:
  - 프로필 사진, 이름, 이메일 표시
  - 내 등급 정보 (등급, 점수, 등급 상승 조건)
  - SNS 계정 연동 현황
  - "SNS 연동하기" 버튼 → SNSConnectScreen
  - "등급 정보 자세히 보기" → GradeInfoScreen

#### GradeInfoScreen (`/user/profile/grade`)
- **목적**: SNS 등급 시스템 상세 정보
- **기능**:
  - 현재 등급 및 점수 (0-100)
  - 다음 등급까지 필요한 조건 표시
  - 등급별 혜택 안내
  - 등급 산정 기준 설명

---

### 4. 업주 (Owner)

#### MyStoresScreen (`/owner/stores`)
- **목적**: 내가 등록한 매장 목록
- **기능**:
  - 매장 카드 목록 (이름, 주소, 활성 캠페인 수)
  - "새 매장 등록" 버튼 → CreateStoreScreen
  - 매장 카드 클릭 → StoreDetailScreen

#### CreateStoreScreen (`/owner/stores/new`)
- **목적**: 새 매장 등록
- **기능**:
  - 매장 기본 정보 입력 (이름, 주소, 전화번호, 카테고리)
  - Naver Maps API 주소 검색 → 좌표(lat, lng) 자동 입력
  - 매장 사진 업로드 (최대 10장)
  - "등록하기" 버튼 → 매장 생성 후 MyStoresScreen

#### StoreDetailScreen (`/owner/stores/:id`)
- **목적**: 매장 상세 정보 및 관리
- **기능**:
  - 매장 정보 표시
  - "수정" 버튼 → EditStoreScreen
  - "삭제" 버튼 → 삭제 확인 모달
  - 이 매장의 캠페인 목록 표시

#### MyCampaignsScreen (`/owner/campaigns`)
- **목적**: 내가 생성한 캠페인 목록
- **기능**:
  - 캠페인 카드 목록 (제목, 매장명, 상태, 신청자 수)
  - 상태별 탭 (전체 / 진행 중 / 완료 / 마감)
  - "새 캠페인 생성" 버튼 → CreateCampaignScreen

#### CreateCampaignScreen (`/owner/campaigns/new`)
- **목적**: 새 캠페인 생성
- **기능**:
  - 매장 선택 (드롭다운)
  - 캠페인 정보 입력 (제목, 설명, 제공 혜택)
  - 참여 조건 설정:
    - 최소 요구 등급 (BRONZE ~ PLATINUM)
    - 지역 제한 (선택적)
    - 연령대 제한 (선택적)
    - 최대 참여자 수
    - 모집 기간 (시작일 ~ 마감일)
  - "생성하기" 버튼 → 캠페인 생성 후 MyCampaignsScreen

#### CampaignManageScreen (`/owner/campaigns/:id`)
- **목적**: 캠페인 관리
- **기능**:
  - 캠페인 정보 표시
  - 현재 신청자 수 / 최대 참여자 수
  - "신청자 관리" 버튼 → ApplicantsManageScreen
  - "후기 확인" 버튼 → CampaignReviewsScreen

#### ApplicantsManageScreen (`/owner/campaigns/:id/applicants`)
- **목적**: 캠페인 신청자 관리
- **기능**:
  - 신청자 목록 (이름, 등급, 신청일)
  - 신청자 프로필 클릭 → 상세 정보 모달
  - 상태별 필터 (전체 / 대기 / 승인 / 거절 / 완료)

#### OwnerDashboardScreen (`/owner/dashboard`)
- **목적**: 업주 전용 통계 대시보드
- **기능**:
  - 매장 수, 캠페인 수, 총 신청자 수 표시
  - 최근 7일 신규 신청 그래프
  - 최근 활동 로그

---

### 5. 관리자 (Admin)

#### AdminDashboardScreen (`/admin/dashboard`)
- **목적**: 시스템 전체 통계
- **기능**:
  - KPI 카드 (전체 사용자, 활성 캠페인, 월별 신규 가입자)
  - 월별 가입자 추이 그래프
  - 등급별 사용자 분포 차트
  - 최근 활동 로그 (로그인, 캠페인 생성, 후기 작성)

#### UserManagementScreen (`/admin/users`)
- **목적**: 전체 사용자 관리
- **기능**:
  - 사용자 목록 테이블 (ID, 이름, 역할, 등급, 가입일)
  - 검색 (이름, 이메일)
  - 필터 (역할별, 등급별)
  - 사용자 클릭 → UserDetailManageScreen

#### UserDetailManageScreen (`/admin/users/:id`)
- **목적**: 사용자 상세 관리
- **기능**:
  - 사용자 정보 표시 (프로필, SNS 데이터, 등급)
  - 등급 수동 조정 (드롭다운 + 저장 버튼)
  - 계정 정지/활성화 토글
  - 활동 내역 (신청한 캠페인, 작성한 후기)

#### CampaignManagementScreen (`/admin/campaigns`)
- **목적**: 전체 캠페인 모니터링
- **기능**:
  - 캠페인 목록 테이블 (ID, 제목, 업주, 상태, 신청자 수)
  - 검색 (제목, 매장명)
  - 필터 (상태별)
  - 캠페인 클릭 → CampaignDetailManageScreen

#### CampaignDetailManageScreen (`/admin/campaigns/:id`)
- **목적**: 캠페인 상세 관리
- **기능**:
  - 캠페인 정보 표시
  - "숨김 처리" 버튼 (부적절한 캠페인)
  - "삭제" 버튼 (심각한 위반)
  - 신청자 목록 표시

#### ReviewQualityManagementScreen (`/admin/reviews`)
- **목적**: 후기 품질 관리
- **기능**:
  - 후기 목록 테이블 (ID, 작성자, 캠페인, 품질 점수, 작성일)
  - 필터 (미검수 / 검수 완료)
  - 후기 클릭 → ReviewQualityDetailScreen

#### ReviewQualityDetailScreen (`/admin/reviews/:id`)
- **목적**: 후기 검수 및 품질 점수 부여
- **기능**:
  - 후기 내용 표시 (텍스트, 사진, SNS 링크)
  - 품질 점수 입력 (0-10점)
  - "저장" 버튼 → 점수 반영 후 사용자 등급 재계산

---

### 6. 설정 (Settings)

#### SettingsScreen (`/settings`)
- **목적**: 앱 설정 및 개인정보 관리
- **기능**:
  - 알림 설정 (푸시 알림 on/off)
  - 개인정보 수정 (이름, 비밀번호 변경)
  - 로그아웃 버튼
  - 앱 버전 정보

---

## 라우팅 구조 (React Router v6)

```typescript
// src/router/AppRouter.tsx (예시)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';

// Auth Screens
import LoginScreen from '@/components/screens/auth/LoginScreen';
import SignupScreen from '@/components/screens/auth/SignupScreen';
import ResetPasswordScreen from '@/components/screens/auth/ResetPasswordScreen';

// Home
import HomeScreen from '@/components/screens/home/HomeScreen';

// User Screens
import CampaignListScreen from '@/components/screens/user/CampaignListScreen';
import CampaignDetailScreen from '@/components/screens/user/CampaignDetailScreen';
// ... (기타 User 화면들)

// Owner Screens
import MyStoresScreen from '@/components/screens/owner/MyStoresScreen';
// ... (기타 Owner 화면들)

// Admin Screens
import AdminDashboardScreen from '@/components/screens/admin/AdminDashboardScreen';
// ... (기타 Admin 화면들)

// Settings
import SettingsScreen from '@/components/screens/settings/SettingsScreen';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 (Public) */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginScreen />} />
          <Route path="/auth/signup" element={<SignupScreen />} />
          <Route path="/auth/reset-password" element={<ResetPasswordScreen />} />
        </Route>

        {/* 메인 (Protected) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeScreen />} />

          {/* 일반 유저 */}
          <Route path="/user/campaigns" element={<CampaignListScreen />} />
          <Route path="/user/campaigns/:id" element={<CampaignDetailScreen />} />
          {/* ... */}

          {/* 업주 */}
          <Route path="/owner/stores" element={<MyStoresScreen />} />
          {/* ... */}

          {/* 관리자 */}
          <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
          {/* ... */}

          {/* 설정 */}
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
```

---

## 네비게이션 규칙

### 1. 역할 기반 접근 제어 (RBAC)
- **일반 유저**: `/user/*` 경로만 접근 가능
- **업주**: `/owner/*` 및 `/user/*` 접근 가능
- **관리자**: 모든 경로 접근 가능

### 2. 인증 상태 확인
- 비인증 사용자가 Protected 라우트 접근 시 → `/auth/login`으로 리디렉션
- 로그인 성공 시 → 역할별 홈 화면으로 이동
  - USER: `/user/campaigns`
  - OWNER: `/owner/dashboard`
  - ADMIN: `/admin/dashboard`

### 3. 모바일 네비게이션
- **Bottom Tab Navigation** (모바일 웹 최적화):
  - 일반 유저: 홈 / 캠페인 / 내 활동 / 프로필
  - 업주: 홈 / 매장 / 캠페인 / 대시보드
  - 관리자: 대시보드 / 사용자 / 캠페인 / 후기

---

## 참고 사항

### 화면 구현 우선순위
1. **Phase 1 (MVP)**:
   - LoginScreen, SignupScreen
   - HomeScreen
   - CampaignListScreen, CampaignDetailScreen
   - UserProfileScreen

2. **Phase 2 (핵심 기능)**:
   - CreateStoreScreen, CreateCampaignScreen
   - MyActivitiesScreen, WriteReviewScreen

3. **Phase 3 (고급 기능)**:
   - CampaignMapScreen
   - AdminDashboardScreen, UserManagementScreen

### 문서 업데이트 규칙
- 새 화면 추가/삭제 시 이 문서도 함께 업데이트
- 실제 구현된 라우팅과 100% 일치 유지
- `AppRouter.tsx` 수정 시 이 문서 동기화 필수

---

**🤖 Generated with [Claude Code](https://claude.com/claude-code)**

Co-Authored-By: Claude <noreply@anthropic.com>
