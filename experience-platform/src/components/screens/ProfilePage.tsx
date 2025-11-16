import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Instagram, Youtube, Edit, LogOut, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [stats, setStats] = useState({
    completedCampaigns: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  async function fetchStats() {
    try {
      // Fetch completed campaigns count
      const { count: campaignsCount } = await supabase
        .from('campaign_applications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .eq('status', 'completed');

      // Fetch reviews count
      const { count: reviewsCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id);

      setStats({
        completedCampaigns: campaignsCount || 0,
        totalReviews: reviewsCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-500">프로필 로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-500 mb-4">로그인이 필요합니다.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-500 mb-4">프로필 정보를 찾을 수 없습니다.</p>
          <p className="text-sm text-gray-400 mb-4">
            계정: {user.email}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors mr-2"
          >
            새로고침
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 pt-12 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4">
              <User size={56} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{profile.name}</h1>
            <p className="text-white/90 mb-2">{user?.email}</p>
            <div className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{profile.level || 'Bronze'} 등급</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.completedCampaigns}</p>
            <p className="text-gray-600 text-sm">완료한 체험단</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalReviews}</p>
            <p className="text-gray-600 text-sm">작성한 리뷰</p>
          </div>
        </div>

        {/* SNS Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">SNS 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Instagram size={20} className="text-pink-500" />
              <span>{profile.instagram || '등록된 계정 없음'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Youtube size={20} className="text-red-500" />
              <span>{profile.youtube || '등록된 채널 없음'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} className="text-blue-500" />
              <span>{profile.blog || '등록된 블로그 없음'}</span>
            </div>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <button
            onClick={() => navigate('/profile/edit')}
            className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Edit size={20} className="text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">프로필 수정</p>
              <p className="text-sm text-gray-500">개인정보 및 SNS 정보 수정</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button
            onClick={() => navigate('/notifications')}
            className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">알림 설정</p>
              <p className="text-sm text-gray-500">푸시 알림 관리</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button
            className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Settings size={20} className="text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">설정</p>
              <p className="text-sm text-gray-500">앱 설정 및 약관</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          className="w-full bg-white rounded-2xl shadow-sm p-5 flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 transition-colors font-semibold"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
