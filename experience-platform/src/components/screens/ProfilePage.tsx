import { useNavigate } from 'react-router-dom';
import { User, Mail, Instagram, Youtube, Edit, LogOut, Bell, Settings } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();

  const userInfo = {
    name: '김인플',
    email: 'influencer@example.com',
    instagram: '@myinstagram',
    youtube: 'My YouTube Channel',
    blog: 'https://myblog.com',
    level: 'Gold',
    completedCampaigns: 12,
    totalReviews: 24,
  };

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
            <h1 className="text-2xl font-bold text-white mb-1">{userInfo.name}</h1>
            <p className="text-white/90 mb-2">{userInfo.email}</p>
            <div className="px-4 py-1.5 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold shadow-lg">
              ⭐ {userInfo.level} 등급
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{userInfo.completedCampaigns}</p>
            <p className="text-gray-600 text-sm">완료한 체험단</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{userInfo.totalReviews}</p>
            <p className="text-gray-600 text-sm">작성한 리뷰</p>
          </div>
        </div>

        {/* SNS Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">SNS 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Instagram size={20} className="text-pink-500" />
              <span>{userInfo.instagram || '등록된 계정 없음'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Youtube size={20} className="text-red-500" />
              <span>{userInfo.youtube || '등록된 채널 없음'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} className="text-blue-500" />
              <span>{userInfo.blog || '등록된 블로그 없음'}</span>
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
          onClick={() => {
            // TODO: Add logout logic
            navigate('/login');
          }}
        >
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
