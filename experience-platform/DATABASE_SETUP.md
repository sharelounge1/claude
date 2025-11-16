# 데이터베이스 설정 문서

## 📊 Supabase 프로젝트 정보

**프로젝트 URL**: `https://wjizdvrphmrgfpuicagk.supabase.co`

**환경 변수 설정** (`.env` 파일):
```env
# 카카오 지도 API
VITE_KAKAO_MAP_APP_KEY=233d6ee177d8f2809ac5c0af8f819b28
VITE_KAKAO_REST_API_KEY=68783bc180a311d096a346621b893f6e

# Supabase
VITE_SUPABASE_URL=https://wjizdvrphmrgfpuicagk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqaXpkdnJwaG1yZ2ZwdWljYWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTQyMTgsImV4cCI6MjA3ODc5MDIxOH0.x4Z7F3KOYffZKGDDAjGZQUcoivrZNqRkSXxPC-2zfQY
```

---

## 🗄️ 데이터베이스 스키마

### 1. **profiles** (사용자 프로필)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | 사용자 고유 ID (auth.users.id와 동일) |
| `email` | VARCHAR | 이메일 주소 |
| `name` | VARCHAR | 사용자 이름 |
| `user_type` | VARCHAR | 'influencer', 'owner', 'admin' |
| `instagram` | VARCHAR | 인스타그램 계정 |
| `youtube` | VARCHAR | 유튜브 채널 |
| `blog` | VARCHAR | 블로그 URL |
| `level` | VARCHAR | 'Bronze', 'Silver', 'Gold', 'Platinum' |
| `business_name` | VARCHAR | 사업자명 (점주 전용) |
| `business_number` | VARCHAR | 사업자번호 (점주 전용) |
| `phone` | VARCHAR | 전화번호 |
| `avatar_url` | VARCHAR | 프로필 이미지 URL |
| `status` | VARCHAR | 'active', 'inactive', 'banned' |
| `created_at` | TIMESTAMP | 생성일시 |
| `updated_at` | TIMESTAMP | 수정일시 |

**주요 필드 사용:**
- **인플루언서**: `name`, `user_type`, `instagram`, `youtube`, `blog`, `phone`
- **점주**: `name`, `user_type`, `business_name`, `business_number`, `phone`
- **관리자**: `name`, `user_type`, `phone`

---

### 2. **stores** (매장 정보)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | 매장 고유 ID |
| `owner_id` | UUID (FK) | 점주 ID (profiles.id) |
| `name` | VARCHAR | 매장명 |
| `address` | VARCHAR | 주소 |
| `phone` | VARCHAR | 전화번호 |
| `category` | VARCHAR | 'cafe', 'restaurant', 'bar', 'bakery' 등 |
| `latitude` | DECIMAL | 위도 |
| `longitude` | DECIMAL | 경도 |
| `open_time` | TIME | 영업 시작 시간 |
| `close_time` | TIME | 영업 종료 시간 |
| `status` | VARCHAR | 'active', 'inactive' |
| `created_at` | TIMESTAMP | 생성일시 |
| `updated_at` | TIMESTAMP | 수정일시 |

---

### 3. **campaigns** (체험단 캠페인)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | 캠페인 고유 ID |
| `store_id` | UUID (FK) | 매장 ID (stores.id) |
| `owner_id` | UUID (FK) | 점주 ID (profiles.id) |
| `name` | VARCHAR | 캠페인명 |
| `description` | TEXT | 캠페인 설명 |
| `benefit` | VARCHAR | 제공 혜택 |
| `total_quota` | INTEGER | 총 모집 인원 |
| `current_quota` | INTEGER | 현재 신청 인원 |
| `required_sns` | VARCHAR[] | 필수 SNS ['인스타그램', '블로그'] |
| `start_date` | DATE | 캠페인 시작일 |
| `end_date` | DATE | 캠페인 종료일 |
| `deadline` | DATE | 신청 마감일 |
| `status` | VARCHAR | 'active', 'completed', 'cancelled' |
| `created_at` | TIMESTAMP | 생성일시 |
| `updated_at` | TIMESTAMP | 수정일시 |

---

### 4. **campaign_applications** (캠페인 신청)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | 신청 고유 ID |
| `campaign_id` | UUID (FK) | 캠페인 ID (campaigns.id) |
| `user_id` | UUID (FK) | 신청자 ID (profiles.id) |
| `status` | VARCHAR | 'pending', 'approved', 'rejected', 'completed' |
| `visit_date` | DATE | 방문 날짜 |
| `qr_code_used` | BOOLEAN | QR 코드 사용 여부 |
| `qr_code_used_at` | TIMESTAMP | QR 코드 사용 시각 |
| `created_at` | TIMESTAMP | 신청일시 |
| `updated_at` | TIMESTAMP | 수정일시 |

**상태 흐름:**
1. `pending`: 신청 대기
2. `approved`: 승인됨 → QR 코드 생성
3. `completed`: 방문 완료 → 리뷰 작성 가능
4. `rejected`: 거절됨

---

### 5. **qr_codes** (QR 코드)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | QR 코드 고유 ID |
| `application_id` | UUID (FK) | 신청 ID (campaign_applications.id) |
| `user_id` | UUID (FK) | 사용자 ID (profiles.id) |
| `campaign_id` | UUID (FK) | 캠페인 ID (campaigns.id) |
| `code` | VARCHAR | QR 코드 값 (UUID) |
| `expires_at` | TIMESTAMP | 만료 시각 (생성 후 12시간) |
| `is_used` | BOOLEAN | 사용 여부 |
| `used_at` | TIMESTAMP | 사용 시각 |
| `scanned_by` | UUID | 스캔한 직원 ID |
| `created_at` | TIMESTAMP | 생성일시 |

**주요 로직:**
- QR 코드는 신청이 `approved` 상태일 때 자동 생성
- 유효기간 12시간
- 한 번 사용하면 `is_used = true`, 재사용 불가

---

### 6. **reviews** (리뷰)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | 리뷰 고유 ID |
| `application_id` | UUID (FK) | 신청 ID (campaign_applications.id) |
| `user_id` | UUID (FK) | 작성자 ID (profiles.id) |
| `campaign_id` | UUID (FK) | 캠페인 ID (campaigns.id) |
| `store_id` | UUID (FK) | 매장 ID (stores.id) |
| `rating` | INTEGER | 별점 (1~5) |
| `content` | TEXT | 리뷰 내용 |
| `images` | VARCHAR[] | 이미지 URL 배열 |
| `sns_links` | JSONB | SNS 링크 {'instagram': 'url', 'blog': 'url'} |
| `created_at` | TIMESTAMP | 작성일시 |
| `updated_at` | TIMESTAMP | 수정일시 |

---

### 7. **staff** (직원 관리)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | 직원 고유 ID |
| `owner_id` | UUID (FK) | 점주 ID (profiles.id) |
| `user_id` | UUID (FK) | 직원 사용자 ID (profiles.id) |
| `store_ids` | UUID[] | 담당 매장 ID 배열 |
| `role` | VARCHAR | 'manager', 'staff' |
| `created_at` | TIMESTAMP | 등록일시 |

---

### 8. **notifications** (알림)

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID (PK) | 알림 고유 ID |
| `user_id` | UUID (FK) | 수신자 ID (profiles.id) |
| `type` | VARCHAR | 'info', 'success', 'warning', 'error' |
| `title` | VARCHAR | 알림 제목 |
| `message` | TEXT | 알림 내용 |
| `link` | VARCHAR | 연결 링크 |
| `is_read` | BOOLEAN | 읽음 여부 |
| `created_at` | TIMESTAMP | 생성일시 |

---

## 🔐 Row Level Security (RLS) 정책

각 테이블에 대한 RLS 정책이 설정되어 있어야 합니다:

### profiles
- 본인 프로필 조회/수정 가능
- 관리자는 모든 프로필 조회 가능

### stores
- 점주는 본인 매장만 조회/수정 가능
- 모든 사용자는 활성 매장 조회 가능

### campaigns
- 점주는 본인 캠페인만 조회/수정 가능
- 모든 사용자는 활성 캠페인 조회 가능
- 인플루언서는 신청 가능

### campaign_applications
- 본인 신청만 조회 가능
- 점주는 자신의 캠페인 신청 조회/승인 가능

### qr_codes
- 본인 QR 코드만 조회 가능
- 점주/직원은 스캔 가능

### reviews
- 본인 리뷰만 작성/수정 가능
- 모든 사용자는 리뷰 조회 가능

---

## 📝 주요 실행된 SQL 명령어

### 1. 초기 테이블 생성
```sql
-- profiles, stores, campaigns, campaign_applications,
-- qr_codes, reviews, staff, notifications 테이블 생성
-- (SQL Editor에서 실행됨)
```

### 2. RLS 정책 설정
```sql
-- 각 테이블에 대한 RLS 정책 활성화 및 정책 생성
-- (SQL Editor에서 실행됨)
```

---

## 👥 테스트 계정 정보

### 인플루언서 계정
- **이메일**: `influencer@test.com`
- **비밀번호**: `test1234`
- **이름**: 김인플
- **인스타그램**: @test_influencer
- **블로그**: https://blog.naver.com/test_influencer

### 점주 계정
- **이메일**: `owner@test.com`
- **비밀번호**: `test1234`
- **이름**: 이점주
- **사업자명**: 카페 모카

### 관리자 계정
- **이메일**: `admin@test.com`
- **비밀번호**: `test1234`
- **이름**: 관리자

---

## 🏪 테스트 데이터

### 강남 테스트 매장
- **매장명**: 카페 모카 강남점
- **주소**: 서울시 강남구 테헤란로 123
- **전화번호**: 02-1234-5678
- **카테고리**: cafe
- **위치**: 위도 37.4979, 경도 127.0276
- **영업시간**: 09:00 - 22:00

### 테스트 캠페인
- **캠페인명**: 시그니처 음료 무료 체험
- **설명**: 카페 모카의 인기 메뉴를 무료로 체험하고 솔직한 리뷰를 남겨주세요! 아메리카노, 라떼, 디저트 중 원하는 메뉴를 선택하실 수 있습니다.
- **혜택**: 시그니처 음료 1잔 + 디저트 1개 무료
- **모집 인원**: 10명
- **필수 SNS**: 인스타그램, 블로그
- **기간**: 2025-01-20 ~ 2025-02-28
- **신청 마감**: 2025-02-15

---

## 🚀 데이터 초기화 및 설정 순서

1. **Supabase Dashboard에서 Auth 계정 생성** (3개)
   - influencer@test.com
   - owner@test.com
   - admin@test.com

2. **SQL Editor에서 프로필 + 매장 + 캠페인 생성 스크립트 실행**
   - 제공된 SQL 스크립트 실행

3. **테스트 계정으로 로그인 확인**
   - http://localhost:5173/login

4. **기능 테스트**
   - 인플루언서: 캠페인 신청
   - 점주: 신청 승인, QR 스캔
   - 리뷰 작성

---

## 📌 중요 참고사항

### 필드명 매핑 (DB ↔ 코드)

| 코드 (이전) | DB 실제 | 비고 |
|------------|---------|------|
| `full_name` | `name` | ❌ 변경됨 |
| `role` | `user_type` | ❌ 변경됨 |
| `instagram_handle` | `instagram` | ❌ 변경됨 |
| `youtube_channel` | `youtube` | ❌ 변경됨 |
| `blog_url` | `blog` | ❌ 변경됨 |

**모든 코드는 실제 DB 스키마에 맞춰 수정 완료**

---

## 🔧 트러블슈팅

### 문제: "column does not exist" 오류
**해결**: DB와 코드의 필드명이 일치하는지 확인

### 문제: RLS 정책으로 인한 조회 실패
**해결**: Supabase Dashboard에서 해당 테이블의 RLS 정책 확인

### 문제: QR 코드가 생성되지 않음
**해결**: `campaign_applications.status`가 'approved'인지 확인

---

**최종 업데이트**: 2025-01-16
**작성자**: Claude Code
