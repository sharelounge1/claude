# API 명세서 (API Specification)

**문서 버전**: 1.0
**최종 수정일**: 2025-11-15
**작성자**: Claude Code

---

## 개요

이 문서는 실시간 체험단 앱에서 사용하는 Supabase 기반 API 엔드포인트를 정의합니다.
Supabase는 PostgreSQL + REST API + Auth를 제공하므로, 대부분의 API는 Supabase 클라이언트 라이브러리를 통해 호출됩니다.

**Base URL**: Supabase 프로젝트 URL (환경 변수: `VITE_SUPABASE_URL`)

---

## 공통 응답 형식

### 성공 응답 (Supabase)
```json
{
  "data": [
    {
      // 실제 데이터 객체
    }
  ],
  "error": null
}
```

### 실패 응답 (Supabase)
```json
{
  "data": null,
  "error": {
    "message": "에러 메시지",
    "details": "상세 정보 (선택적)",
    "hint": "해결 방법 힌트 (선택적)",
    "code": "에러 코드"
  }
}
```

### HTTP 상태 코드
- `200 OK`: 성공
- `201 Created`: 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패 (토큰 없음/만료)
- `403 Forbidden`: 권한 없음 (RLS 정책 위반)
- `404 Not Found`: 리소스 없음
- `500 Internal Server Error`: 서버 오류

---

## 1. 인증 API (Authentication)

Supabase Auth를 통한 인증 관리

### 1.1. 회원가입
- **Endpoint**: `POST /auth/v1/signup` (Supabase Auth)
- **설명**: 이메일/비밀번호 기반 신규 사용자 등록
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "options": {
    "data": {
      "username": "johndoe",
      "role": "USER"  // USER | OWNER | ADMIN
    }
  }
}
```
- **Response (성공)**:
```json
{
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "user_metadata": {
      "username": "johndoe",
      "role": "USER"
    },
    "created_at": "2025-11-15T10:00:00Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "dGhpcyBpcyByZWZyZXNo...",
    "expires_in": 3600,
    "token_type": "bearer"
  }
}
```
- **Response (실패)**:
```json
{
  "error": {
    "message": "User already registered",
    "status": 400
  }
}
```

### 1.2. 로그인
- **Endpoint**: `POST /auth/v1/token?grant_type=password` (Supabase Auth)
- **설명**: 이메일/비밀번호로 로그인
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response (성공)**:
```json
{
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "user_metadata": {
      "username": "johndoe",
      "role": "USER"
    }
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "dGhpcyBpcyByZWZyZXNo...",
    "expires_in": 3600
  }
}
```
- **Response (실패)**:
```json
{
  "error": {
    "message": "Invalid login credentials",
    "status": 400
  }
}
```

### 1.3. 로그아웃
- **Endpoint**: `POST /auth/v1/logout` (Supabase Auth)
- **설명**: 현재 세션 종료
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{}
```

### 1.4. 토큰 갱신
- **Endpoint**: `POST /auth/v1/token?grant_type=refresh_token` (Supabase Auth)
- **설명**: Refresh Token으로 새 Access Token 발급
- **Request Body**:
```json
{
  "refresh_token": "dGhpcyBpcyByZWZyZXNo..."
}
```
- **Response (성공)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "dGhpcyBpcyByZWZyZXNo...",
  "expires_in": 3600
}
```

### 1.5. 비밀번호 재설정 요청
- **Endpoint**: `POST /auth/v1/recover` (Supabase Auth)
- **설명**: 비밀번호 재설정 이메일 발송
- **Request Body**:
```json
{
  "email": "user@example.com"
}
```
- **Response (성공)**:
```json
{}
```

---

## 2. 사용자 API (Users)

### 2.1. 내 프로필 조회
- **Endpoint**: `GET /rest/v1/users?id=eq.{user_id}` (Supabase REST)
- **설명**: 현재 로그인 사용자의 프로필 정보 조회
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-string",
      "email": "user@example.com",
      "username": "johndoe",
      "role": "USER",
      "grade": "SILVER",
      "sns_data": {
        "instagram": {
          "username": "johndoe_insta",
          "followers": 3000,
          "posts": 50
        }
      },
      "created_at": "2025-11-15T10:00:00Z",
      "updated_at": "2025-11-15T10:00:00Z"
    }
  ],
  "error": null
}
```

### 2.2. 프로필 수정
- **Endpoint**: `PATCH /rest/v1/users?id=eq.{user_id}` (Supabase REST)
- **설명**: 사용자 프로필 정보 수정
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "username": "new_username",
  "sns_data": {
    "instagram": {
      "username": "new_insta_username",
      "followers": 3500,
      "posts": 60
    }
  }
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-string",
      "username": "new_username",
      "updated_at": "2025-11-15T11:00:00Z"
    }
  ],
  "error": null
}
```

### 2.3. 사용자 등급 조회
- **Endpoint**: `GET /rest/v1/rpc/calculate_user_grade` (Supabase RPC)
- **설명**: SNS 데이터 기반으로 사용자 등급 계산
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "user_id": "uuid-string"
}
```
- **Response (성공)**:
```json
{
  "data": {
    "grade": "SILVER",
    "score": 45,
    "criteria": {
      "followers": 3000,
      "posts": 50,
      "engagement": 0.05,
      "reviewQuality": 7.5
    }
  },
  "error": null
}
```

### 2.4. 전체 사용자 목록 (관리자 전용)
- **Endpoint**: `GET /rest/v1/users` (Supabase REST)
- **설명**: 전체 사용자 목록 조회 (관리자만 접근 가능, RLS 정책)
- **Headers**: `Authorization: Bearer {access_token}`
- **Query Parameters**:
  - `role`: 역할 필터 (USER, OWNER, ADMIN)
  - `grade`: 등급 필터 (BRONZE, SILVER, GOLD, PLATINUM)
  - `limit`: 페이지당 항목 수 (기본값: 20)
  - `offset`: 오프셋 (페이징)
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-string",
      "email": "user1@example.com",
      "username": "user1",
      "role": "USER",
      "grade": "SILVER",
      "created_at": "2025-11-15T10:00:00Z"
    },
    {
      "id": "uuid-string-2",
      "email": "user2@example.com",
      "username": "user2",
      "role": "OWNER",
      "grade": "GOLD",
      "created_at": "2025-11-14T09:00:00Z"
    }
  ],
  "error": null
}
```

---

## 3. 매장 API (Stores)

### 3.1. 매장 목록 조회
- **Endpoint**: `GET /rest/v1/stores` (Supabase REST)
- **설명**: 매장 목록 조회 (공개 또는 본인 매장만)
- **Headers**: `Authorization: Bearer {access_token}`
- **Query Parameters**:
  - `owner_id`: 업주 ID (본인 매장 필터)
  - `category`: 카테고리 필터 (음식점, 카페, 뷰티 등)
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-string",
      "owner_id": "uuid-owner",
      "name": "맛집 레스토랑",
      "address": "서울시 강남구 테헤란로 123",
      "lat": 37.5665,
      "lng": 126.9780,
      "category": "음식점",
      "photos": [
        "https://storage.supabase.co/store-photo1.jpg",
        "https://storage.supabase.co/store-photo2.jpg"
      ],
      "created_at": "2025-11-15T10:00:00Z"
    }
  ],
  "error": null
}
```

### 3.2. 매장 상세 조회
- **Endpoint**: `GET /rest/v1/stores?id=eq.{store_id}` (Supabase REST)
- **설명**: 특정 매장 상세 정보 조회
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-string",
      "owner_id": "uuid-owner",
      "name": "맛집 레스토랑",
      "address": "서울시 강남구 테헤란로 123",
      "lat": 37.5665,
      "lng": 126.9780,
      "category": "음식점",
      "phone": "02-1234-5678",
      "photos": [
        "https://storage.supabase.co/store-photo1.jpg"
      ],
      "created_at": "2025-11-15T10:00:00Z"
    }
  ],
  "error": null
}
```

### 3.3. 매장 등록
- **Endpoint**: `POST /rest/v1/stores` (Supabase REST)
- **설명**: 새 매장 등록 (업주만 가능)
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "name": "새로운 카페",
  "address": "서울시 마포구 홍대입구역 근처",
  "lat": 37.5563,
  "lng": 126.9238,
  "category": "카페",
  "phone": "02-9876-5432",
  "photos": [
    "https://storage.supabase.co/cafe-photo1.jpg"
  ]
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-new-store",
      "owner_id": "uuid-owner",
      "name": "새로운 카페",
      "created_at": "2025-11-15T11:00:00Z"
    }
  ],
  "error": null
}
```

### 3.4. 매장 수정
- **Endpoint**: `PATCH /rest/v1/stores?id=eq.{store_id}` (Supabase REST)
- **설명**: 매장 정보 수정 (본인 매장만, RLS 정책)
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "name": "수정된 매장명",
  "phone": "02-1111-2222"
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-string",
      "name": "수정된 매장명",
      "updated_at": "2025-11-15T12:00:00Z"
    }
  ],
  "error": null
}
```

### 3.5. 매장 삭제
- **Endpoint**: `DELETE /rest/v1/stores?id=eq.{store_id}` (Supabase REST)
- **설명**: 매장 삭제 (본인 매장만)
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [],
  "error": null
}
```

---

## 4. 캠페인 API (Campaigns)

### 4.1. 캠페인 목록 조회
- **Endpoint**: `GET /rest/v1/campaigns` (Supabase REST)
- **설명**: 현재 모집 중인 캠페인 목록 조회
- **Headers**: `Authorization: Bearer {access_token}`
- **Query Parameters**:
  - `status`: 상태 필터 (ACTIVE, CLOSED, COMPLETED)
  - `required_grade`: 최소 등급 필터 (BRONZE, SILVER, GOLD, PLATINUM)
  - `region`: 지역 필터
  - `limit`: 페이지당 항목 수 (기본값: 20)
  - `offset`: 오프셋
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-campaign",
      "store_id": "uuid-store",
      "title": "맛집 체험단 모집",
      "description": "신메뉴 체험 후 후기 작성",
      "required_grade": "SILVER",
      "max_participants": 10,
      "current_participants": 3,
      "deadline": "2025-12-01T23:59:59Z",
      "status": "ACTIVE",
      "created_at": "2025-11-15T10:00:00Z",
      "store": {
        "id": "uuid-store",
        "name": "맛집 레스토랑",
        "address": "서울시 강남구 테헤란로 123",
        "lat": 37.5665,
        "lng": 126.9780
      }
    }
  ],
  "error": null
}
```

### 4.2. 캠페인 상세 조회
- **Endpoint**: `GET /rest/v1/campaigns?id=eq.{campaign_id}` (Supabase REST)
- **설명**: 특정 캠페인 상세 정보 조회
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-campaign",
      "store_id": "uuid-store",
      "title": "맛집 체험단 모집",
      "description": "신메뉴 체험 후 후기 작성해주세요",
      "benefits": "무료 식사 제공 + 음료 1잔",
      "required_grade": "SILVER",
      "max_participants": 10,
      "current_participants": 3,
      "deadline": "2025-12-01T23:59:59Z",
      "status": "ACTIVE",
      "region": "서울",
      "age_range": [20, 40],
      "created_at": "2025-11-15T10:00:00Z",
      "store": {
        "id": "uuid-store",
        "name": "맛집 레스토랑",
        "address": "서울시 강남구 테헤란로 123",
        "lat": 37.5665,
        "lng": 126.9780,
        "photos": ["https://storage.supabase.co/store-photo1.jpg"]
      }
    }
  ],
  "error": null
}
```

### 4.3. 캠페인 생성
- **Endpoint**: `POST /rest/v1/campaigns` (Supabase REST)
- **설명**: 새 캠페인 생성 (업주만 가능)
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "store_id": "uuid-store",
  "title": "신규 카페 체험단",
  "description": "신규 오픈 카페 방문 후 후기 작성",
  "benefits": "아메리카노 + 디저트 무료 제공",
  "required_grade": "BRONZE",
  "max_participants": 20,
  "deadline": "2025-12-10T23:59:59Z",
  "region": "서울",
  "age_range": [18, 50]
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-new-campaign",
      "store_id": "uuid-store",
      "title": "신규 카페 체험단",
      "status": "ACTIVE",
      "current_participants": 0,
      "created_at": "2025-11-15T11:00:00Z"
    }
  ],
  "error": null
}
```

### 4.4. 캠페인 수정
- **Endpoint**: `PATCH /rest/v1/campaigns?id=eq.{campaign_id}` (Supabase REST)
- **설명**: 캠페인 정보 수정 (본인 캠페인만)
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "title": "수정된 캠페인 제목",
  "max_participants": 25
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-campaign",
      "title": "수정된 캠페인 제목",
      "updated_at": "2025-11-15T12:00:00Z"
    }
  ],
  "error": null
}
```

### 4.5. 캠페인 삭제
- **Endpoint**: `DELETE /rest/v1/campaigns?id=eq.{campaign_id}` (Supabase REST)
- **설명**: 캠페인 삭제 (본인 캠페인만)
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [],
  "error": null
}
```

---

## 5. 캠페인 신청 API (Campaign Applications)

### 5.1. 캠페인 신청
- **Endpoint**: `POST /rest/v1/campaign_applications` (Supabase REST)
- **설명**: 캠페인에 신청
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "campaign_id": "uuid-campaign",
  "user_id": "uuid-user"
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-application",
      "campaign_id": "uuid-campaign",
      "user_id": "uuid-user",
      "status": "PENDING",
      "applied_at": "2025-11-15T11:00:00Z"
    }
  ],
  "error": null
}
```

### 5.2. 내 신청 목록 조회
- **Endpoint**: `GET /rest/v1/campaign_applications?user_id=eq.{user_id}` (Supabase REST)
- **설명**: 내가 신청한 캠페인 목록
- **Headers**: `Authorization: Bearer {access_token}`
- **Query Parameters**:
  - `status`: 상태 필터 (PENDING, APPROVED, REJECTED, COMPLETED)
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-application",
      "campaign_id": "uuid-campaign",
      "user_id": "uuid-user",
      "status": "APPROVED",
      "applied_at": "2025-11-15T11:00:00Z",
      "campaign": {
        "id": "uuid-campaign",
        "title": "맛집 체험단 모집",
        "deadline": "2025-12-01T23:59:59Z",
        "store": {
          "name": "맛집 레스토랑"
        }
      }
    }
  ],
  "error": null
}
```

### 5.3. 캠페인 신청자 목록 조회 (업주/관리자)
- **Endpoint**: `GET /rest/v1/campaign_applications?campaign_id=eq.{campaign_id}` (Supabase REST)
- **설명**: 특정 캠페인의 신청자 목록 (업주 또는 관리자만)
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-application",
      "campaign_id": "uuid-campaign",
      "user_id": "uuid-user",
      "status": "PENDING",
      "applied_at": "2025-11-15T11:00:00Z",
      "user": {
        "id": "uuid-user",
        "username": "johndoe",
        "grade": "SILVER",
        "sns_data": {
          "instagram": {
            "followers": 3000
          }
        }
      }
    }
  ],
  "error": null
}
```

### 5.4. 신청 상태 변경 (업주/관리자)
- **Endpoint**: `PATCH /rest/v1/campaign_applications?id=eq.{application_id}` (Supabase REST)
- **설명**: 신청 승인/거절
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "status": "APPROVED"  // APPROVED | REJECTED | COMPLETED
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-application",
      "status": "APPROVED",
      "updated_at": "2025-11-15T12:00:00Z"
    }
  ],
  "error": null
}
```

---

## 6. 후기 API (Reviews)

### 6.1. 후기 작성
- **Endpoint**: `POST /rest/v1/reviews` (Supabase REST)
- **설명**: 체험 완료 후 후기 작성
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "application_id": "uuid-application",
  "user_id": "uuid-user",
  "rating": 5,
  "content": "정말 맛있었어요! 친절한 서비스에 감동했습니다.",
  "photos": [
    "https://storage.supabase.co/review-photo1.jpg",
    "https://storage.supabase.co/review-photo2.jpg"
  ],
  "sns_links": {
    "instagram": "https://instagram.com/p/ABC123",
    "blog": "https://blog.naver.com/user/123"
  }
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-review",
      "application_id": "uuid-application",
      "user_id": "uuid-user",
      "rating": 5,
      "content": "정말 맛있었어요!...",
      "quality_score": null,
      "created_at": "2025-11-15T12:00:00Z"
    }
  ],
  "error": null
}
```

### 6.2. 내 후기 목록 조회
- **Endpoint**: `GET /rest/v1/reviews?user_id=eq.{user_id}` (Supabase REST)
- **설명**: 내가 작성한 후기 목록
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-review",
      "application_id": "uuid-application",
      "rating": 5,
      "content": "정말 맛있었어요!...",
      "photos": ["https://storage.supabase.co/review-photo1.jpg"],
      "quality_score": 8.5,
      "created_at": "2025-11-15T12:00:00Z",
      "application": {
        "campaign": {
          "title": "맛집 체험단 모집",
          "store": {
            "name": "맛집 레스토랑"
          }
        }
      }
    }
  ],
  "error": null
}
```

### 6.3. 캠페인별 후기 목록 조회
- **Endpoint**: `GET /rest/v1/reviews?application_id=in.(select id from campaign_applications where campaign_id='{campaign_id}')` (Supabase REST)
- **설명**: 특정 캠페인의 모든 후기 조회
- **Headers**: `Authorization: Bearer {access_token}`
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-review",
      "rating": 5,
      "content": "정말 맛있었어요!...",
      "photos": ["https://storage.supabase.co/review-photo1.jpg"],
      "quality_score": 8.5,
      "created_at": "2025-11-15T12:00:00Z",
      "user": {
        "username": "johndoe",
        "grade": "SILVER"
      }
    }
  ],
  "error": null
}
```

### 6.4. 후기 품질 점수 부여 (관리자)
- **Endpoint**: `PATCH /rest/v1/reviews?id=eq.{review_id}` (Supabase REST)
- **설명**: 관리자가 후기 품질 점수 부여 (0-10점)
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "quality_score": 8.5
}
```
- **Response (성공)**:
```json
{
  "data": [
    {
      "id": "uuid-review",
      "quality_score": 8.5,
      "updated_at": "2025-11-15T13:00:00Z"
    }
  ],
  "error": null
}
```

---

## 7. 통계 API (Statistics - RPC)

### 7.1. 관리자 대시보드 통계
- **Endpoint**: `POST /rest/v1/rpc/get_admin_stats` (Supabase RPC)
- **설명**: 관리자 대시보드용 전체 통계 조회
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "date_from": "2025-11-01",
  "date_to": "2025-11-30"
}
```
- **Response (성공)**:
```json
{
  "data": {
    "total_users": 1234,
    "total_campaigns": 56,
    "active_campaigns": 12,
    "total_applications": 456,
    "total_reviews": 234,
    "grade_distribution": {
      "BRONZE": 500,
      "SILVER": 400,
      "GOLD": 250,
      "PLATINUM": 84
    },
    "monthly_signups": [
      { "month": "2025-10", "count": 123 },
      { "month": "2025-11", "count": 145 }
    ]
  },
  "error": null
}
```

### 7.2. 업주 대시보드 통계
- **Endpoint**: `POST /rest/v1/rpc/get_owner_stats` (Supabase RPC)
- **설명**: 업주용 매장/캠페인 통계
- **Headers**: `Authorization: Bearer {access_token}`
- **Request Body**:
```json
{
  "owner_id": "uuid-owner"
}
```
- **Response (성공)**:
```json
{
  "data": {
    "total_stores": 3,
    "total_campaigns": 10,
    "active_campaigns": 4,
    "total_applicants": 89,
    "total_reviews": 45,
    "avg_rating": 4.7
  },
  "error": null
}
```

---

## 8. 파일 업로드 (Storage)

Supabase Storage를 사용한 파일 업로드

### 8.1. 이미지 업로드
- **Endpoint**: `POST /storage/v1/object/{bucket_name}/{file_path}` (Supabase Storage)
- **설명**: 이미지 파일 업로드 (매장 사진, 후기 사진 등)
- **Headers**:
  - `Authorization: Bearer {access_token}`
  - `Content-Type: image/jpeg` (또는 image/png)
- **Request Body**: Binary 파일 데이터
- **Response (성공)**:
```json
{
  "Key": "store-photos/uuid-filename.jpg",
  "Bucket": "public-bucket"
}
```

### 8.2. 이미지 URL 생성
- **Endpoint**: `GET /storage/v1/object/public/{bucket_name}/{file_path}` (Supabase Storage)
- **설명**: 업로드된 이미지의 공개 URL 조회
- **Response**: 이미지 파일 (또는 리디렉션)

---

## 9. Realtime 구독 (Realtime)

Supabase Realtime을 사용한 실시간 데이터 업데이트

### 9.1. 캠페인 실시간 구독
- **Channel**: `public:campaigns`
- **설명**: 캠페인 생성/수정/삭제 실시간 감지
- **사용 예시** (JavaScript):
```javascript
const channel = supabase
  .channel('public:campaigns')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'campaigns' },
    (payload) => {
      console.log('Campaign changed:', payload);
    }
  )
  .subscribe();
```

### 9.2. 신청자 실시간 구독
- **Channel**: `public:campaign_applications`
- **설명**: 캠페인 신청 실시간 감지
- **사용 예시** (JavaScript):
```javascript
const channel = supabase
  .channel('public:campaign_applications')
  .on('postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'campaign_applications',
      filter: `campaign_id=eq.${campaignId}`
    },
    (payload) => {
      console.log('New application:', payload.new);
    }
  )
  .subscribe();
```

---

## 10. 에러 코드

### Supabase 공통 에러
| 코드 | 메시지 | 설명 |
|------|--------|------|
| `PGRST116` | Row Level Security violation | RLS 정책 위반 (권한 없음) |
| `23505` | Unique constraint violation | 중복 데이터 (이메일 중복 등) |
| `23503` | Foreign key violation | 참조 키 위반 (존재하지 않는 ID) |
| `42P01` | Undefined table | 테이블 없음 |

### 커스텀 에러 (RPC Functions)
| 코드 | 메시지 | 설명 |
|------|--------|------|
| `GRADE_INSUFFICIENT` | User grade is insufficient | 사용자 등급 부족 |
| `CAMPAIGN_FULL` | Campaign has reached max participants | 캠페인 정원 초과 |
| `CAMPAIGN_EXPIRED` | Campaign deadline has passed | 캠페인 마감 |

---

## 참고 사항

### Row Level Security (RLS) 정책
Supabase는 PostgreSQL의 RLS를 사용하여 데이터 접근을 제어합니다.

**예시**:
- **users**: 본인 프로필만 조회/수정 가능 (관리자는 전체 조회 가능)
- **stores**: 본인 매장만 수정/삭제 가능
- **campaigns**: 본인 캠페인만 수정/삭제 가능
- **reviews**: 본인 후기만 수정/삭제 가능

### API 사용 예시 (JavaScript)
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// 캠페인 목록 조회
const { data, error } = await supabase
  .from('campaigns')
  .select('*, store:stores(*)')
  .eq('status', 'ACTIVE')
  .gte('deadline', new Date().toISOString())
  .order('created_at', { ascending: false })
  .limit(20);

if (error) {
  console.error('Error:', error);
} else {
  console.log('Campaigns:', data);
}
```

---

**🤖 Generated with [Claude Code](https://claude.com/claude-code)**

Co-Authored-By: Claude <noreply@anthropic.com>
