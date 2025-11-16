import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wjizdvrphmrgfpuicagk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqaXpkdnJwaG1yZ2ZwdWljYWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTQyMTgsImV4cCI6MjA3ODc5MDIxOH0.x4Z7F3KOYffZKGDDAjGZQUcoivrZNqRkSXxPC-2zfQY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  console.log('🔍 Supabase 데이터베이스 확인 시작...\n');

  const tables = [
    'profiles',
    'stores',
    'campaigns',
    'campaign_applications',
    'qr_codes',
    'reviews',
    'staff',
    'notifications'
  ];

  let allTablesExist = true;

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ ${table}: 테이블이 존재하지 않거나 접근 불가`);
        console.log(`   에러: ${error.message}`);
        allTablesExist = false;
      } else {
        console.log(`✅ ${table}: 정상`);
      }
    } catch (err) {
      console.log(`❌ ${table}: 확인 실패`);
      allTablesExist = false;
    }
  }

  console.log('\n' + '='.repeat(50));
  if (allTablesExist) {
    console.log('✅ 모든 테이블이 정상적으로 생성되었습니다!');
  } else {
    console.log('❌ 일부 테이블이 누락되었습니다. SQL을 다시 확인해주세요.');
  }
  console.log('='.repeat(50));
}

checkDatabase();
