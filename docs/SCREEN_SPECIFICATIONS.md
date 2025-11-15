# 화면 명세서 (Screen Specifications)

**문서 버전**: 1.0 (초기 버전 - 스크린샷 미포함)
**최종 수정일**: 2025-11-15
**작성자**: Claude Code

---

## 개요

이 문서는 실시간 체험단 앱의 각 화면별 기능, UI 구성, 사용자 프로세스를 정의합니다.
현재는 초기 버전으로, 실제 화면 구현 후 스크린샷을 추가할 예정입니다.

---

## 화면 명세서 작성 규칙

### 스크린샷 캡처 방법
화면 구현이 완료되면 다음 단계로 스크린샷을 캡처합니다:

1. **Playwright 캡처 스크립트 작성** (`scripts/capture-[기능명].mjs`)
2. **스크린샷 저장 위치**: `docs/screenshots/`
3. **명명 규칙**:
   - 기본 화면: `[기능명]-[화면명].png`
   - 스크롤 화면: `[기능명]-[화면명]-scrolled.png`
   - 모달/팝업: `[기능명]-[요소명]-modal.png`

### 명세서 자동 생성
화면 구현 후 `scripts/generate-complete-spec.cjs`를 실행하여 이 문서를 자동 업데이트합니다.

---

## 1. 인증 (Authentication)

### 1.1. 로그인 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>AUTH-001</td>
  <td><strong>로그인 화면</strong><br/><code>/auth/login</code><br/>LoginScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>이메일/비밀번호 입력 폼</li>
      <li>로그인 버튼</li>
      <li>"회원가입" 링크</li>
      <li>"비밀번호 찾기" 링크</li>
      <li>로그인 에러 메시지 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>사용자가 이메일/비밀번호 입력 → 유효성 검사</li>
      <li>"로그인" 버튼 클릭 → Supabase Auth 인증</li>
      <li>성공 시 역할별 홈 화면으로 리디렉션</li>
      <li>실패 시 에러 메시지 표시</li>
    </ol>
  </td>
</tr>
</table>

### 1.2. 회원가입 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>AUTH-002</td>
  <td><strong>회원가입 화면</strong><br/><code>/auth/signup</code><br/>SignupScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>이메일, 비밀번호, 사용자명 입력</li>
      <li>역할 선택 (일반 유저/업주)</li>
      <li>이용약관 동의 체크박스</li>
      <li>회원가입 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>사용자가 정보 입력 → 실시간 유효성 검사</li>
      <li>"회원가입" 버튼 클릭 → Supabase 계정 생성</li>
      <li>성공 시 자동 로그인 후 홈 화면</li>
      <li>실패 시 에러 메시지 (중복 이메일 등)</li>
    </ol>
  </td>
</tr>
</table>

---

## 2. 일반 유저 (User)

### 2.1. 캠페인 목록 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>USER-001</td>
  <td><strong>캠페인 목록</strong><br/><code>/user/campaigns</code><br/>CampaignListScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>현재 모집 중인 캠페인 카드 목록</li>
      <li>필터: 지역별, 카테고리별, 내 등급 가능</li>
      <li>"지도 보기" 버튼</li>
      <li>무한 스크롤 페이징</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → Supabase에서 캠페인 목록 조회</li>
      <li>사용자가 필터 선택 → 목록 재조회</li>
      <li>캠페인 카드 클릭 → 상세 화면 이동</li>
      <li>스크롤 하단 도달 → 다음 페이지 로드</li>
    </ol>
  </td>
</tr>
</table>

### 2.2. 캠페인 상세 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>USER-002</td>
  <td><strong>캠페인 상세</strong><br/><code>/user/campaigns/:id</code><br/>CampaignDetailScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>캠페인 제목, 설명, 혜택 표시</li>
      <li>매장 정보 (이름, 주소, 지도)</li>
      <li>참여 조건 및 충족 여부 표시</li>
      <li>"신청하기" 버튼 (조건 충족 시 활성)</li>
      <li>이미 신청한 경우 "신청 완료" 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → 캠페인 ID로 상세 정보 조회</li>
      <li>사용자 등급 vs 요구 등급 비교</li>
      <li>"신청하기" 클릭 → DB에 신청 정보 저장</li>
      <li>성공 시 "신청 완료" 토스트 메시지</li>
    </ol>
  </td>
</tr>
</table>

### 2.3. 내 프로필 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>USER-003</td>
  <td><strong>내 프로필</strong><br/><code>/user/profile</code><br/>UserProfileScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>프로필 사진, 이름, 이메일 표시</li>
      <li>내 등급 카드 (등급 배지, 점수)</li>
      <li>SNS 계정 연동 현황</li>
      <li>"SNS 연동하기" 버튼</li>
      <li>"등급 정보 자세히 보기" 링크</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → 현재 사용자 정보 조회</li>
      <li>SNS 연동 상태 확인 (Instagram, Blog)</li>
      <li>"SNS 연동하기" 클릭 → SNSConnectScreen 이동</li>
      <li>등급 카드 클릭 → GradeInfoScreen 이동</li>
    </ol>
  </td>
</tr>
</table>

### 2.4. 후기 작성 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>USER-004</td>
  <td><strong>후기 작성</strong><br/><code>/user/reviews/new</code><br/>WriteReviewScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>별점 평가 (1-5점)</li>
      <li>텍스트 후기 입력 (최소 100자)</li>
      <li>사진 업로드 (최대 5장)</li>
      <li>SNS 공유 링크 입력 (Instagram, Blog)</li>
      <li>"제출하기" 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>사용자가 별점 선택 → 별 아이콘 업데이트</li>
      <li>후기 텍스트 입력 → 글자 수 표시</li>
      <li>사진 선택 → 미리보기 표시</li>
      <li>"제출하기" 클릭 → 후기 DB 저장 + 등급 재계산</li>
    </ol>
  </td>
</tr>
</table>

---

## 3. 업주 (Owner)

### 3.1. 내 매장 목록

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>OWNER-001</td>
  <td><strong>내 매장 목록</strong><br/><code>/owner/stores</code><br/>MyStoresScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>내가 등록한 매장 카드 목록</li>
      <li>매장별 활성 캠페인 수 표시</li>
      <li>"새 매장 등록" 버튼</li>
      <li>매장 카드 클릭 → 상세 화면</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → 내 매장 목록 조회</li>
      <li>"새 매장 등록" 클릭 → CreateStoreScreen</li>
      <li>매장 카드 클릭 → StoreDetailScreen</li>
    </ol>
  </td>
</tr>
</table>

### 3.2. 매장 등록 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>OWNER-002</td>
  <td><strong>매장 등록</strong><br/><code>/owner/stores/new</code><br/>CreateStoreScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>매장 이름, 주소, 전화번호 입력</li>
      <li>카테고리 선택 (음식점, 카페, 뷰티 등)</li>
      <li>Naver Maps 주소 검색 → 좌표 자동 입력</li>
      <li>매장 사진 업로드 (최대 10장)</li>
      <li>"등록하기" 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>사용자가 주소 입력 → Naver Maps API 검색</li>
      <li>검색 결과 선택 → lat, lng 자동 저장</li>
      <li>사진 업로드 → Supabase Storage 저장</li>
      <li>"등록하기" 클릭 → DB에 매장 정보 저장</li>
    </ol>
  </td>
</tr>
</table>

### 3.3. 캠페인 생성 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>OWNER-003</td>
  <td><strong>캠페인 생성</strong><br/><code>/owner/campaigns/new</code><br/>CreateCampaignScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>매장 선택 (드롭다운)</li>
      <li>캠페인 제목, 설명, 혜택 입력</li>
      <li>최소 요구 등급 선택</li>
      <li>최대 참여자 수 입력</li>
      <li>모집 기간 (시작일~마감일) 선택</li>
      <li>"생성하기" 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>사용자가 매장 선택 → 해당 매장 정보 로드</li>
      <li>캠페인 정보 입력 → 유효성 검사</li>
      <li>"생성하기" 클릭 → DB에 캠페인 저장</li>
      <li>성공 시 "캠페인 생성 완료" 토스트</li>
    </ol>
  </td>
</tr>
</table>

### 3.4. 신청자 관리 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>OWNER-004</td>
  <td><strong>신청자 관리</strong><br/><code>/owner/campaigns/:id/applicants</code><br/>ApplicantsManageScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>신청자 목록 테이블 (이름, 등급, 신청일)</li>
      <li>상태별 필터 (전체/대기/승인/완료)</li>
      <li>신청자 클릭 → 프로필 상세 모달</li>
      <li>일괄 승인/거절 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → 캠페인 ID로 신청자 목록 조회</li>
      <li>신청자 클릭 → 프로필 모달 표시</li>
      <li>"승인" 버튼 클릭 → 상태 업데이트</li>
      <li>상태 변경 시 신청자에게 알림 발송</li>
    </ol>
  </td>
</tr>
</table>

---

## 4. 관리자 (Admin)

### 4.1. 관리자 대시보드

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>ADMIN-001</td>
  <td><strong>관리자 대시보드</strong><br/><code>/admin/dashboard</code><br/>AdminDashboardScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>KPI 카드 (전체 사용자, 활성 캠페인, 신규 가입자)</li>
      <li>월별 가입자 추이 그래프</li>
      <li>등급별 사용자 분포 차트</li>
      <li>최근 활동 로그 테이블</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → Supabase에서 통계 데이터 조회</li>
      <li>Chart.js 또는 Recharts로 그래프 렌더링</li>
      <li>KPI 카드 클릭 → 상세 관리 화면 이동</li>
    </ol>
  </td>
</tr>
</table>

### 4.2. 사용자 관리

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>ADMIN-002</td>
  <td><strong>사용자 관리</strong><br/><code>/admin/users</code><br/>UserManagementScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>사용자 목록 테이블 (ID, 이름, 역할, 등급)</li>
      <li>검색 (이름, 이메일)</li>
      <li>필터 (역할별, 등급별)</li>
      <li>사용자 클릭 → 상세 관리 화면</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → 전체 사용자 목록 조회</li>
      <li>검색어 입력 → 실시간 필터링</li>
      <li>사용자 클릭 → UserDetailManageScreen</li>
      <li>등급 수동 조정 → DB 업데이트</li>
    </ol>
  </td>
</tr>
</table>

### 4.3. 후기 품질 관리

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>ADMIN-003</td>
  <td><strong>후기 품질 관리</strong><br/><code>/admin/reviews</code><br/>ReviewQualityManagementScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>후기 목록 테이블 (작성자, 캠페인, 품질 점수)</li>
      <li>필터 (미검수/검수 완료)</li>
      <li>후기 클릭 → 상세 검수 화면</li>
      <li>품질 점수 입력 (0-10점)</li>
      <li>"저장" 버튼 → 등급 재계산</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → 미검수 후기 목록 조회</li>
      <li>후기 클릭 → ReviewQualityDetailScreen</li>
      <li>관리자가 후기 검수 → 품질 점수 입력</li>
      <li>"저장" 클릭 → 점수 저장 + 사용자 등급 재계산</li>
    </ol>
  </td>
</tr>
</table>

---

## 5. 설정 (Settings)

### 5.1. 설정 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>
<tr>
  <td>SETTINGS-001</td>
  <td><strong>설정 화면</strong><br/><code>/settings</code><br/>SettingsScreen</td>
  <td style="text-align: center; color: #999;">
    <div style="border: 2px dashed #ccc; padding: 40px; background: #f9f9f9;">
      스크린샷 예정<br/>
      (화면 구현 후 추가)
    </div>
  </td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>알림 설정 (푸시 알림 on/off)</li>
      <li>개인정보 수정 (이름, 비밀번호 변경)</li>
      <li>로그아웃 버튼</li>
      <li>앱 버전 정보</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 로드 → 현재 설정 정보 조회</li>
      <li>알림 토글 변경 → LocalStorage 저장</li>
      <li>"비밀번호 변경" 클릭 → 모달 표시</li>
      <li>"로그아웃" 클릭 → 인증 토큰 삭제 후 로그인 화면</li>
    </ol>
  </td>
</tr>
</table>

---

## 화면 구현 우선순위

### Phase 1 (MVP)
1. LoginScreen, SignupScreen
2. HomeScreen
3. CampaignListScreen, CampaignDetailScreen
4. UserProfileScreen

### Phase 2 (핵심 기능)
1. CreateStoreScreen, CreateCampaignScreen
2. MyActivitiesScreen, WriteReviewScreen
3. ApplicantsManageScreen

### Phase 3 (고급 기능)
1. CampaignMapScreen
2. AdminDashboardScreen
3. UserManagementScreen, ReviewQualityManagementScreen

---

## 문서 업데이트 가이드

### 화면 구현 후 업데이트 프로세스
1. **화면 구현 완료**
2. **Playwright 스크립트 작성** (`scripts/capture-[기능명].mjs`)
3. **스크린샷 캡처 실행**
4. **`scripts/generate-complete-spec.cjs`에 화면 정보 추가**
5. **명세서 자동 생성 실행** (`npm run docs:generate`)
6. **이 문서 자동 업데이트 확인**

### 스크린샷 캡처 스크립트 예시
```javascript
// scripts/capture-login.mjs
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // 모바일 뷰포트
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/auth/login');
  await page.waitForLoadState('networkidle');

  await page.screenshot({
    path: 'docs/screenshots/auth-login.png',
    fullPage: false
  });

  await browser.close();
  console.log('✅ 로그인 화면 스크린샷 캡처 완료');
})();
```

---

**🤖 Generated with [Claude Code](https://claude.com/claude-code)**

Co-Authored-By: Claude <noreply@anthropic.com>
