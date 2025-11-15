const { chromium } = require('playwright');

(async () => {
  console.log('🔍 네이버 지도 API 테스트 시작...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // 콘솔 메시지 캡처
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  // 오류 캡처
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.toString());
  });

  try {
    // 테스트 페이지 로드
    console.log('📄 테스트 페이지 접속 중...');
    await page.goto('http://localhost:5173/test-map.html', {
      waitUntil: 'networkidle',
      timeout: 15000
    });

    // 상태 메시지 대기 (최대 15초)
    await page.waitForTimeout(5000);

    // 상태 확인
    const statusText = await page.textContent('#status');
    const statusClass = await page.getAttribute('#status', 'class');

    console.log('📊 테스트 결과:');
    console.log('=====================================');
    console.log('상태 클래스:', statusClass);
    console.log('상태 메시지:', statusText.trim());
    console.log('=====================================\n');

    // naver 객체 확인
    const naverExists = await page.evaluate(() => {
      return typeof window.naver !== 'undefined';
    });

    const naverMapsExists = await page.evaluate(() => {
      return typeof window.naver !== 'undefined' && typeof window.naver.maps !== 'undefined';
    });

    console.log('🔎 API 객체 확인:');
    console.log('- window.naver 존재:', naverExists ? '✅' : '❌');
    console.log('- window.naver.maps 존재:', naverMapsExists ? '✅' : '❌');
    console.log('');

    // 네트워크 요청 확인
    const responses = [];
    page.on('response', response => {
      if (response.url().includes('naver')) {
        responses.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText()
        });
      }
    });

    // 잠시 대기 후 네트워크 요청 확인
    await page.waitForTimeout(2000);

    if (responses.length > 0) {
      console.log('🌐 네이버 API 요청:');
      responses.forEach(r => {
        console.log(`  ${r.status} ${r.statusText} - ${r.url}`);
      });
      console.log('');
    }

    // 콘솔 메시지 출력
    if (consoleMessages.length > 0) {
      console.log('📝 콘솔 메시지:');
      consoleMessages.forEach(msg => console.log(`  ${msg}`));
      console.log('');
    }

    // 오류 출력
    if (errors.length > 0) {
      console.log('❌ JavaScript 오류:');
      errors.forEach(err => console.log(`  ${err}`));
      console.log('');
    }

    // 스크린샷 저장
    await page.screenshot({
      path: 'docs/screenshots/test-map-result.png',
      fullPage: true
    });
    console.log('📸 스크린샷 저장: docs/screenshots/test-map-result.png\n');

    // 최종 결과
    if (statusClass.includes('success')) {
      console.log('✅ 결과: 네이버 지도 API가 정상적으로 작동합니다!');
    } else if (statusClass.includes('error')) {
      console.log('❌ 결과: API 연동에 실패했습니다.');
      console.log('💡 해결 방법을 확인하세요:');
      console.log('   1. NCP Console에서 Service URL 확인');
      console.log('   2. http://localhost:5173 등록 여부 확인');
      console.log('   3. Application 상태가 "사용"인지 확인');
    } else {
      console.log('⏳ 결과: 아직 로딩 중이거나 알 수 없는 상태입니다.');
    }

  } catch (error) {
    console.error('❌ 테스트 실패:', error.message);
  } finally {
    await browser.close();
  }
})();
