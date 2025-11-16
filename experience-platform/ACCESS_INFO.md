# 체험단 플랫폼 접속 정보

## 🌐 기본 접속 URL
**개발 서버**: `http://localhost:5173`

---

## 👤 인플루언서 (일반 사용자)

### 접속 정보
- **이메일**: `influencer@test.com`
- **비밀번호**: `test1234`

### 접속 URL
- **홈 (지도)**: `http://localhost:5173/`
- **캠페인 리스트**: `http://localhost:5173/campaigns`
- **내 체험단**: `http://localhost:5173/my-campaigns`
- **프로필**: `http://localhost:5173/profile`
- **알림**: `http://localhost:5173/notifications`

### 사용 가능 기능
- ✅ 캠페인 검색 및 필터링
- ✅ 캠페인 신청
- ✅ QR 코드 확인
- ✅ 리뷰 작성
- ✅ 프로필 수정

---

## 🏪 점주 (웹 어드민)

### 접속 정보
- **이메일**: `owner@test.com`
- **비밀번호**: `test1234`

### 접속 URL
- **대시보드**: `http://localhost:5173/owner`
- **매장 관리**: `http://localhost:5173/owner/stores`
- **매장 등록**: `http://localhost:5173/owner/stores/new`
- **캠페인 관리**: `http://localhost:5173/owner/campaigns`
- **캠페인 생성**: `http://localhost:5173/owner/campaigns/new`
- **직원 관리**: `http://localhost:5173/owner/staff`
- **설정**: `http://localhost:5173/owner/settings`

### 사용 가능 기능
- ✅ 매장 등록/수정
- ✅ 캠페인 생성/수정
- ✅ 신청자 승인/거절
- ✅ 통계 확인
- ✅ 직원 관리

---

## 📱 점주 (모바일 앱)

### 접속 정보
- **이메일**: `owner@test.com`
- **비밀번호**: `test1234`

### 접속 URL
- **홈**: `http://localhost:5173/owner/app`
- **캠페인 히스토리**: `http://localhost:5173/owner/app/history`
- **QR 스캔**: `http://localhost:5173/owner/qr-scan`
- **프로필**: `http://localhost:5173/owner/app/profile`

### 사용 가능 기능
- ✅ QR 코드 스캔
- ✅ 방문자 확인
- ✅ 캠페인 참여자 관리

---

## 👨‍💼 관리자

### 접속 정보
- **이메일**: `admin@test.com`
- **비밀번호**: `test1234`

### 접속 URL
- **대시보드**: `http://localhost:5173/admin`
- **사용자 관리**: `http://localhost:5173/admin/users`
- **매장 관리**: `http://localhost:5173/admin/stores`
- **캠페인 관리**: `http://localhost:5173/admin/campaigns`
- **신고 관리**: `http://localhost:5173/admin/reports`
- **설정**: `http://localhost:5173/admin/settings`

### 사용 가능 기능
- ✅ 전체 사용자 관리
- ✅ 매장 승인/거절
- ✅ 캠페인 모니터링
- ✅ 신고 처리
- ✅ 시스템 설정

---

## 🔐 로그인 방법

### 1. 웹 브라우저에서 접속
```
http://localhost:5173/login
```

### 2. 이메일과 비밀번호 입력

### 3. 자동 리다이렉트
- **인플루언서** → 홈 화면 (지도)
- **점주** → 점주 대시보드
- **관리자** → 관리자 대시보드

---

## 📝 계정별 테스트 시나리오

### 인플루언서 테스트
1. `influencer@test.com`로 로그인
2. 홈 화면에서 강남 지도 확인
3. "시그니처 음료 무료 체험" 캠페인 클릭
4. 체험단 신청
5. "내 체험단" 탭에서 신청 상태 확인

### 점주 테스트
1. `owner@test.com`로 로그인
2. 대시보드에서 통계 확인
3. 캠페인 관리 → "시그니처 음료 무료 체험" 클릭
4. 진행 상황에서 신청자 확인
5. 신청자 승인/거절

### 관리자 테스트
1. `admin@test.com`로 로그인
2. 사용자 관리에서 전체 사용자 확인
3. 매장 관리에서 매장 목록 확인
4. 캠페인 관리에서 전체 캠페인 모니터링

---

## 🚨 문제 해결

### 로그인이 안 될 때
1. `.env` 파일이 있는지 확인
2. Supabase URL과 API 키가 올바른지 확인
3. 브라우저 콘솔(F12)에서 에러 확인

### 흰 화면만 보일 때
1. `.env` 파일 생성 확인
2. 개발 서버 재시작 (`Ctrl+C` 후 `npm run dev`)
3. 브라우저 캐시 삭제 (`Ctrl+Shift+R`)

### 데이터가 안 보일 때
1. Supabase에 테스트 데이터가 있는지 확인
2. DATABASE_SETUP.md의 SQL 스크립트 실행 확인
3. 브라우저 콘솔에서 네트워크 에러 확인

---

**최종 업데이트**: 2025-01-16
**작성자**: Claude Code
