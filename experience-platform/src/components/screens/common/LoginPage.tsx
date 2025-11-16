import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic
    // For now, redirect to home
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-4xl">🎯</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
            <p className="text-gray-500 mt-2">체험단 플랫폼에 오신 것을 환영합니다</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              로그인
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <Link
              to="/signup"
              className="block text-gray-600 hover:text-black font-medium transition-colors"
            >
              계정이 없으신가요? <span className="font-bold">회원가입</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
