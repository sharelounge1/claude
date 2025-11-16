import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store, FileText, Phone } from 'lucide-react';

const SignupOwnerPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessNumber: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add registration logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">점주 회원가입</h1>
            <p className="text-gray-500 mt-2">사업자 정보를 입력해주세요</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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
                    placeholder="이름"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    required
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
                    placeholder="이메일"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="비밀번호"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="비밀번호 확인"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="border-t-2 border-gray-200 pt-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4">사업자 정보</h3>
              <div className="space-y-4">
                {/* Business Name */}
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="사업자명"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                {/* Business Number */}
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.businessNumber}
                    onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                    placeholder="사업자등록번호 (123-45-67890)"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="연락처 (010-1234-5678)"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              회원가입
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              to="/signup"
              className="text-gray-600 hover:text-black font-medium transition-colors"
            >
              ← 가입 유형 선택으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOwnerPage;
