import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to login after 2 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
      <div className="text-center">
        <div className="mb-8 animate-bounce">
          <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <span className="text-6xl">🎯</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 animate-fadeIn">
          체험단 플랫폼
        </h1>
        <p className="text-xl text-white/90 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          Experience Platform
        </p>
        <div className="mt-8">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
