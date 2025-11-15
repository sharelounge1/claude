const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 } // iPhone X size
  });
  const page = await context.newPage();

  // 개발 서버 접속
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');

  // 1. 메인 페이지 (홈) 스크린샷
  await page.screenshot({
    path: 'docs/screenshots/homepage.png',
    fullPage: false
  });

  console.log('✅ 메인 페이지 스크린샷 완료');

  // 2. 필터 모달 열기
  await page.click('button:has-text("")'); // 필터 버튼 클릭 (SlidersHorizontal 아이콘)
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'docs/screenshots/homepage-filter.png',
    fullPage: false
  });

  console.log('✅ 필터 모달 스크린샷 완료');

  // 3. 체험단 리스트 페이지로 이동
  await page.click('a[href="/campaigns"]');
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: 'docs/screenshots/campaigns-list.png',
    fullPage: false
  });

  console.log('✅ 체험단 리스트 페이지 스크린샷 완료');

  // 4. 체험단 리스트 - 스크롤 후
  await page.evaluate(() => {
    window.scrollTo(0, 400);
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'docs/screenshots/campaigns-list-scrolled.png',
    fullPage: false
  });

  console.log('✅ 체험단 리스트 (스크롤) 스크린샷 완료');

  await browser.close();
  console.log('🎉 모든 스크린샷 캡처 완료!');
})();
