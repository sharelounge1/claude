-- 서울 50개 지점 샘플 데이터 생성 스크립트
-- Supabase SQL Editor에서 실행하세요

-- 1. 먼저 owner (점주) 계정의 ID를 확인합니다
-- SELECT id FROM auth.users WHERE email = 'owner@test.com';
-- 아래 {owner_user_id}를 실제 UUID로 교체하세요

-- 2. 50개의 매장 생성 (서울 전역)
INSERT INTO stores (owner_id, name, category, address, latitude, longitude, phone, description, status, created_at, updated_at)
VALUES
-- 강남구 (10개)
('{owner_user_id}', '카페 모카 강남점', 'cafe', '서울 강남구 테헤란로 123', 37.5012, 127.0396, '02-1234-5001', '강남 중심부의 프리미엄 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '고깃집 강남', 'meat', '서울 강남구 역삼동 456', 37.4989, 127.0369, '02-1234-5002', '최고급 한우 전문점', 'active', NOW(), NOW()),
('{owner_user_id}', '이자카야 토쿄', 'izakaya', '서울 강남구 논현동 789', 37.5056, 127.0329, '02-1234-5003', '정통 일본식 선술집', 'active', NOW(), NOW()),
('{owner_user_id}', '베이커리 파리', 'bakery', '서울 강남구 삼성동 101', 37.5145, 127.0595, '02-1234-5004', '프랑스 빵 전문점', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 한강뷰', 'bar', '서울 강남구 청담동 202', 37.5219, 127.0475, '02-1234-5005', '한강이 보이는 루프탑 바', 'active', NOW(), NOW()),
('{owner_user_id}', '한식당 궁', 'korean', '서울 강남구 대치동 303', 37.4947, 127.0635, '02-1234-5006', '전통 한정식', 'active', NOW(), NOW()),
('{owner_user_id}', '일식당 스시', 'japanese', '서울 강남구 도곡동 404', 37.4889, 127.0567, '02-1234-5007', '오마카세 전문', 'active', NOW(), NOW()),
('{owner_user_id}', '양식당 비스트로', 'western', '서울 강남구 개포동 505', 37.4817, 127.0555, '02-1234-5008', '유러피안 레스토랑', 'active', NOW(), NOW()),
('{owner_user_id}', '중식당 차이나', 'chinese', '서울 강남구 일원동 606', 37.4865, 127.0862, '02-1234-5009', '정통 사천요리', 'active', NOW(), NOW()),
('{owner_user_id}', '디저트 카페 스위트', 'dessert', '서울 강남구 수서동 707', 37.4850, 127.1016, '02-1234-5010', '수제 디저트 카페', 'active', NOW(), NOW()),

-- 서초구 (5개)
('{owner_user_id}', '카페 라떼 서초', 'cafe', '서울 서초구 서초동 111', 37.4838, 127.0324, '02-1234-5011', '조용한 동네 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '밥집 서초', 'restaurant', '서울 서초구 방배동 222', 37.4813, 126.9972, '02-1234-5012', '가정식 백반', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 강남대로', 'bar', '서울 서초구 양재동 333', 37.4689, 127.0380, '02-1234-5013', '분위기 좋은 펍', 'active', NOW(), NOW()),
('{owner_user_id}', '베이커리 브레드', 'bakery', '서울 서초구 잠원동 444', 37.5151, 127.0107, '02-1234-5014', '건강빵 전문점', 'active', NOW(), NOW()),
('{owner_user_id}', '카페 아메리카노', 'cafe', '서울 서초구 반포동 555', 37.5047, 127.0089, '02-1234-5015', '스페셜티 커피', 'active', NOW(), NOW()),

-- 송파구 (5개)
('{owner_user_id}', '카페 롯데월드', 'cafe', '서울 송파구 잠실동 666', 37.5141, 127.1025, '02-1234-5016', '롯데타워 근처 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '한식당 송파', 'korean', '서울 송파구 문정동 777', 37.4854, 127.1225, '02-1234-5017', '가마솥 백반', 'active', NOW(), NOW()),
('{owner_user_id}', '일식당 가든파이브', 'japanese', '서울 송파구 거여동 888', 37.4949, 127.1426, '02-1234-5018', '회전초밥', 'active', NOW(), NOW()),
('{owner_user_id}', '고깃집 올림픽', 'meat', '서울 송파구 방이동 999', 37.5141, 127.1193, '02-1234-5019', '숯불구이 전문', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 석촌호수', 'bar', '서울 송파구 석촌동 1001', 37.5061, 127.1019, '02-1234-5020', '호수뷰 와인바', 'active', NOW(), NOW()),

-- 광진구 (5개)
('{owner_user_id}', '카페 건대', 'cafe', '서울 광진구 자양동 1111', 37.5349, 127.0701, '02-1234-5021', '건국대 앞 핫플', 'active', NOW(), NOW()),
('{owner_user_id}', '밥집 군자', 'restaurant', '서울 광진구 군자동 1222', 37.5507, 127.0748, '02-1234-5022', '학생 맛집', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 구의', 'bar', '서울 광진구 구의동 1333', 37.5393, 127.0907, '02-1234-5023', '대학생 술집', 'active', NOW(), NOW()),
('{owner_user_id}', '베이커리 광나루', 'bakery', '서울 광진구 광장동 1444', 37.5449, 127.1054, '02-1234-5024', '아침빵 맛집', 'active', NOW(), NOW()),
('{owner_user_id}', '이자카야 화양동', 'izakaya', '서울 광진구 화양동 1555', 37.5457, 127.0701, '02-1234-5025', '가성비 이자카야', 'active', NOW(), NOW()),

-- 마포구 (5개)
('{owner_user_id}', '카페 홍대', 'cafe', '서울 마포구 서교동 1666', 37.5561, 126.9229, '02-1234-5026', '홍대 감성 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '양식당 연남동', 'western', '서울 마포구 연남동 1777', 37.5641, 126.9258, '02-1234-5027', '브런치 맛집', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 상수', 'bar', '서울 마포구 상수동 1888', 37.5478, 126.9222, '02-1234-5028', '수제맥주 전문', 'active', NOW(), NOW()),
('{owner_user_id}', '디저트 합정', 'dessert', '서울 마포구 합정동 1999', 37.5490, 126.9139, '02-1234-5029', '케이크 맛집', 'active', NOW(), NOW()),
('{owner_user_id}', '한식당 망원', 'korean', '서울 마포구 망원동 2001', 37.5564, 126.9044, '02-1234-5030', '한식 뷔페', 'active', NOW(), NOW()),

-- 용산구 (5개)
('{owner_user_id}', '카페 이태원', 'cafe', '서울 용산구 이태원동 2111', 37.5346, 126.9946, '02-1234-5031', '글로벌 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '양식당 한남동', 'western', '서울 용산구 한남동 2222', 37.5351, 127.0030, '02-1234-5032', '파인다이닝', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 해방촌', 'bar', '서울 용산구 용산동2가 2333', 37.5415, 126.9892, '02-1234-5033', '하이볼 바', 'active', NOW(), NOW()),
('{owner_user_id}', '일식당 용산', 'japanese', '서울 용산구 문배동 2444', 37.5228, 126.9647, '02-1234-5034', '라멘 전문점', 'active', NOW(), NOW()),
('{owner_user_id}', '베이커리 삼각지', 'bakery', '서울 용산구 원효로1가 2555', 37.5341, 126.9729, '02-1234-5035', '유럽식 빵집', 'active', NOW(), NOW()),

-- 종로구 (5개)
('{owner_user_id}', '한식당 인사동', 'korean', '서울 종로구 인사동 2666', 37.5718, 126.9857, '02-1234-5036', '전통 한식', 'active', NOW(), NOW()),
('{owner_user_id}', '카페 삼청동', 'cafe', '서울 종로구 삼청동 2777', 37.5862, 126.9814, '02-1234-5037', '한옥 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 광화문', 'bar', '서울 종로구 세종로 2888', 37.5720, 126.9769, '02-1234-5038', '직장인 맛집', 'active', NOW(), NOW()),
('{owner_user_id}', '일식당 익선동', 'japanese', '서울 종로구 익선동 2999', 37.5722, 126.9850, '02-1234-5039', '모던 일식', 'active', NOW(), NOW()),
('{owner_user_id}', '베이커리 북촌', 'bakery', '서울 종로구 북촌로 3001', 37.5834, 126.9853, '02-1234-5040', '고급 베이커리', 'active', NOW(), NOW()),

-- 성동구 (5개)
('{owner_user_id}', '카페 성수', 'cafe', '서울 성동구 성수동1가 3111', 37.5446, 127.0558, '02-1234-5041', '공장 개조 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '양식당 성수', 'western', '서울 성동구 성수동2가 3222', 37.5435, 127.0556, '02-1234-5042', '트렌디 레스토랑', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 왕십리', 'bar', '서울 성동구 행당동 3333', 37.5630, 127.0312, '02-1234-5043', '와인 맛집', 'active', NOW(), NOW()),
('{owner_user_id}', '베이커리 뚝섬', 'bakery', '서울 성동구 옥수동 3444', 37.5403, 127.0170, '02-1234-5044', '베이글 전문', 'active', NOW(), NOW()),
('{owner_user_id}', '고깃집 금호', 'meat', '서울 성동구 금호동1가 3555', 37.5478, 127.0196, '02-1234-5045', '고기 뷔페', 'active', NOW(), NOW()),

-- 영등포구 (3개)
('{owner_user_id}', '카페 여의도', 'cafe', '서울 영등포구 여의도동 3666', 37.5219, 126.9245, '02-1234-5046', '금융가 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '한식당 영등포', 'korean', '서울 영등포구 영등포동 3777', 37.5150, 126.9072, '02-1234-5047', '백반 전문점', 'active', NOW(), NOW()),
('{owner_user_id}', '술집 당산', 'bar', '서울 영등포구 당산동 3888', 37.5345, 126.9024, '02-1234-5048', '칵테일 바', 'active', NOW(), NOW()),

-- 동작구 (2개)
('{owner_user_id}', '카페 흑석', 'cafe', '서울 동작구 흑석동 3999', 37.5065, 126.9618, '02-1234-5049', '대학가 카페', 'active', NOW(), NOW()),
('{owner_user_id}', '밥집 노량진', 'restaurant', '서울 동작구 노량진동 4001', 37.5133, 126.9427, '02-1234-5050', '수험생 밥집', 'active', NOW(), NOW());

-- 3. 각 매장마다 캠페인 생성 (50개)
-- 먼저 생성된 매장 ID를 확인한 후 아래 스크립트 실행
INSERT INTO campaigns (store_id, name, description, benefit, required_sns, required_followers, total_quota, start_date, end_date, deadline, status, created_at, updated_at)
SELECT
  s.id as store_id,
  CONCAT(s.name, ' 체험단') as name,
  CONCAT(s.name, '에서 특별한 체험을 제공합니다. 방문 후 SNS에 리뷰를 작성해주세요!') as description,
  CASE
    WHEN s.category = 'cafe' THEN '음료 2잔 무료'
    WHEN s.category = 'meat' THEN '고기 1인분 무료'
    WHEN s.category = 'bakery' THEN '빵 3개 무료'
    WHEN s.category = 'bar' THEN '맥주 2잔 무료'
    WHEN s.category = 'izakaya' THEN '안주 1접시 무료'
    WHEN s.category = 'restaurant' THEN '식사 1인분 무료'
    WHEN s.category = 'dessert' THEN '디저트 1개 무료'
    WHEN s.category IN ('korean', 'japanese', 'western', 'chinese') THEN '식사 1인분 무료'
    ELSE '상품 무료 체험'
  END as benefit,
  ARRAY['인스타그램', '블로그'] as required_sns,
  100 as required_followers,
  10 as total_quota,
  NOW() as start_date,
  NOW() + INTERVAL '30 days' as end_date,
  NOW() + INTERVAL '14 days' as deadline,
  'active' as status,
  NOW() as created_at,
  NOW() as updated_at
FROM stores s
WHERE s.owner_id = '{owner_user_id}'
ORDER BY s.created_at;

-- 완료!
-- 이제 지도에서 서울 전역에 50개의 핀포인트가 표시됩니다.
