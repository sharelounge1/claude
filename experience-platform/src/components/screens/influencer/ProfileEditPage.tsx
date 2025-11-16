import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Instagram, Youtube, Save } from 'lucide-react';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '김인플',
    email: 'influencer@example.com',
    instagram: '@myinstagram',
    youtube: 'My YouTube Channel',
    blog: 'https://myblog.com',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add save logic
    alert('프로필이 수정되었습니다!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">뒤로가기</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">프로필 수정</h1>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <button
                type="button"
                className="px-6 py-2 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-black hover:text-black transition-colors"
              >
                사진 변경
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이름
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  disabled
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">이메일은 변경할 수 없습니다</p>
            </div>

            {/* SNS Info */}
            <div className="border-t-2 border-gray-200 pt-6">
              <h3 className="font-bold text-gray-900 mb-4">SNS 정보</h3>

              <div className="space-y-4">
                {/* Instagram */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instagram
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="Instagram 계정"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    YouTube
                  </label>
                  <div className="relative">
                    <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.youtube}
                      onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                      placeholder="YouTube 채널"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Blog */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    블로그
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      value={formData.blog}
                      onChange={(e) => setFormData({ ...formData, blog: e.target.value })}
                      placeholder="블로그 주소"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Save size={24} />
              저장하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
