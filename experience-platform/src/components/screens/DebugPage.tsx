import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const DebugPage = () => {
  const { user, profile, loading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    checkDatabase();
  }, [user]);

  async function checkDatabase() {
    if (!user) return;

    try {
      // profiles 테이블 직접 조회
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // campaigns 테이블 조회
      const { data: campaignsData, error: campaignsError } = await supabase
        .from('campaigns')
        .select(`
          *,
          store:stores(name, latitude, longitude, category)
        `)
        .eq('status', 'active');

      setDebugInfo({
        profileData,
        profileError,
        campaignsData,
        campaignsError,
        campaignsCount: campaignsData?.length || 0,
      });
    } catch (error) {
      console.error('디버그 에러:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">디버그 정보</h1>

        <div className="bg-white rounded-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">인증 상태</h2>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>로딩:</strong> {loading ? '예' : '아니오'}</p>
            <p><strong>사용자:</strong> {user ? user.email : '없음'}</p>
            <p><strong>사용자 ID:</strong> {user?.id || '없음'}</p>
            <p><strong>프로필:</strong> {profile ? '있음' : '없음'}</p>
            {profile && (
              <div className="ml-4 mt-2">
                <p><strong>이름:</strong> {profile.name}</p>
                <p><strong>사용자 타입:</strong> {profile.user_type}</p>
                <p><strong>상태:</strong> {profile.status}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">데이터베이스 조회</h2>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>프로필 에러:</strong> {debugInfo.profileError ? JSON.stringify(debugInfo.profileError) : '없음'}</p>
            <p><strong>프로필 데이터:</strong> {debugInfo.profileData ? '있음' : '없음'}</p>
            {debugInfo.profileData && (
              <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto">
                {JSON.stringify(debugInfo.profileData, null, 2)}
              </pre>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">캠페인 데이터</h2>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>캠페인 개수:</strong> {debugInfo.campaignsCount}</p>
            <p><strong>캠페인 에러:</strong> {debugInfo.campaignsError ? JSON.stringify(debugInfo.campaignsError) : '없음'}</p>
            {debugInfo.campaignsData && debugInfo.campaignsData.length > 0 && (
              <div className="mt-4">
                <p className="font-bold mb-2">캠페인 목록:</p>
                {debugInfo.campaignsData.slice(0, 5).map((campaign: any, idx: number) => (
                  <div key={idx} className="bg-gray-100 p-2 rounded mb-2">
                    <p><strong>캠페인 ID:</strong> {campaign.id}</p>
                    <p><strong>매장:</strong> {campaign.store?.name || '없음'}</p>
                    <p><strong>위도:</strong> {campaign.store?.latitude || '없음'}</p>
                    <p><strong>경도:</strong> {campaign.store?.longitude || '없음'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
