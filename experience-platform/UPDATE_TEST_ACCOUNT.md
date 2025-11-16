# 테스트 계정 업데이트 가이드

## 🔄 test@test.com 계정 생성 방법

### 방법 1: Supabase Dashboard에서 수동 생성 (권장)

1. **Supabase Dashboard** 접속
   - URL: https://supabase.com/dashboard

2. **Authentication** 섹션으로 이동
   - 좌측 메뉴에서 "Authentication" 클릭
   - "Users" 탭 선택

3. **새 사용자 생성**
   - "Add user" 또는 "Create new user" 버튼 클릭
   - Email: `test@test.com`
   - Password: `test1234`
   - Auto Confirm User: ✅ 체크 (이메일 인증 생략)
   - "Create user" 클릭

4. **생성된 사용자 ID 복사**
   - 새로 생성된 사용자의 UUID를 복사 (예: `abc123-def456-...`)

5. **SQL Editor로 이동**
   - 좌측 메뉴에서 "SQL Editor" 클릭
   - "New query" 클릭

6. **Profile 생성 SQL 실행**
   ```sql
   -- 1단계: 위에서 복사한 UUID를 여기에 붙여넣기
   -- 예: INSERT INTO profiles (id, email, ... VALUES ('abc123-def456-...', ...

   INSERT INTO profiles (
     id,
     email,
     user_type,
     name,
     instagram,
     youtube,
     blog,
     level,
     phone,
     status,
     created_at,
     updated_at
   ) VALUES (
     '여기에_복사한_UUID_붙여넣기',  -- ⚠️ 꼭 수정하세요!
     'test@test.com',
     'influencer',
     '테스트 사용자',
     '@test_influencer',
     'Test Channel',
     'https://blog.test.com',
     'Bronze',
     '010-1234-5678',
     'active',
     NOW(),
     NOW()
   );
   ```

7. **Run 버튼 클릭**하여 실행

---

### 방법 2: 기존 influencer@test.com 계정 변경

#### 주의사항
- Supabase Auth에서 이메일을 직접 변경하는 것은 권장되지 않습니다
- 방법 1을 사용하는 것이 더 안전합니다

#### 절차 (참고용)

1. **Authentication > Users**에서 `influencer@test.com` 찾기
2. 사용자 클릭 → "Edit user" → Email을 `test@test.com`으로 변경
3. **SQL Editor**에서 profiles 테이블도 업데이트:
   ```sql
   UPDATE profiles
   SET email = 'test@test.com'
   WHERE email = 'influencer@test.com';
   ```

---

## ✅ 확인 방법

### 1. 로그인 테스트
1. 브라우저에서 `http://localhost:5173/login` 접속
2. 이메일: `test@test.com`
3. 비밀번호: `test1234`
4. 로그인 버튼 클릭
5. 홈 화면(지도)으로 이동되면 성공!

### 2. 프로필 확인
1. 로그인 후 하단 탭에서 "마이" 클릭
2. "테스트 사용자" 이름이 표시되는지 확인
3. 이메일이 `test@test.com`으로 표시되는지 확인

---

## 🚨 문제 해결

### "Invalid login credentials" 에러
- Supabase Auth에 계정이 제대로 생성되었는지 확인
- 비밀번호가 `test1234`로 정확히 설정되었는지 확인
- Email Confirmation이 활성화되어 있다면 "Auto Confirm User" 체크 확인

### "프로필을 찾을 수 없습니다" 에러
- SQL Editor에서 profiles 테이블 확인:
  ```sql
  SELECT * FROM profiles WHERE email = 'test@test.com';
  ```
- 결과가 없으면 위의 INSERT 문 다시 실행

### UUID 불일치 에러
- Auth의 user.id와 profiles의 id가 동일한지 확인:
  ```sql
  -- Auth 사용자 ID 확인
  SELECT id, email FROM auth.users WHERE email = 'test@test.com';

  -- Profiles ID 확인
  SELECT id, email FROM profiles WHERE email = 'test@test.com';

  -- 불일치 시 profiles 업데이트
  UPDATE profiles
  SET id = '(Auth에서_확인한_UUID)'
  WHERE email = 'test@test.com';
  ```

---

## 📌 참고사항

### 다른 테스트 계정들
현재 시스템에는 다음 계정들도 있습니다:
- 점주: `owner@test.com` / `test1234`
- 관리자: `admin@test.com` / `test1234`

### 계정 삭제 방법
잘못 생성한 계정을 삭제하려면:
1. **SQL Editor**에서 먼저 profile 삭제:
   ```sql
   DELETE FROM profiles WHERE email = 'test@test.com';
   ```
2. **Authentication > Users**에서 해당 사용자 클릭 → "Delete user"

---

**최종 업데이트**: 2025-01-16
