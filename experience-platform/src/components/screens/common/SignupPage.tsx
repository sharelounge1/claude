import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, Store } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-4xl">🎯</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
            <p className="text-gray-500 mt-2">가입 유형을 선택해주세요</p>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Influencer Option */}
            <button
              onClick={() => navigate('/signup/influencer')}
              className="group relative bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-purple-200 hover:border-purple-400 rounded-2xl p-8 transition-all hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <UserCircle size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">인플루언서</h2>
                <p className="text-gray-600 text-sm">
                  체험단에 참여하고
                  <br />
                  리뷰를 작성해보세요
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300 group-hover:border-purple-500 group-hover:bg-purple-500 transition-all" />
              </div>
            </button>

            {/* Owner Option */}
            <button
              onClick={() => navigate('/signup/owner')}
              className="group relative bg-gradient-to-br from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 border-2 border-orange-200 hover:border-orange-400 rounded-2xl p-8 transition-all hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Store size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">점주</h2>
                <p className="text-gray-600 text-sm">
                  매장을 등록하고
                  <br />
                  체험단을 모집하세요
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300 group-hover:border-orange-500 group-hover:bg-orange-500 transition-all" />
              </div>
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-gray-600 hover:text-black font-medium transition-colors"
            >
              이미 계정이 있으신가요? <span className="font-bold">로그인</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
