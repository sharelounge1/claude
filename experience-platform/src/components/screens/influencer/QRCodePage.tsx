import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, QrCode as QrCodeIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const QRCodePage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white font-semibold"
        >
          <ArrowLeft size={20} />
          <span>뒤로가기</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCodeIcon size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">방문 확인 QR 코드</h1>
            <p className="text-gray-500">점주님께 이 QR 코드를 보여주세요</p>
          </div>

          {/* QR Code */}
          <div className="bg-white border-4 border-gray-900 rounded-2xl p-8 mb-6">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              {/* Placeholder QR Code */}
              <div className="grid grid-cols-8 gap-1 p-4">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${
                      Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                    } rounded-sm`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Campaign ID */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">캠페인 ID</p>
            <p className="text-2xl font-mono font-bold text-gray-900">{campaignId}</p>
          </div>

          {/* Timer */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Clock size={20} />
              <span className="text-sm font-semibold">남은 시간</span>
            </div>
            <div className="text-center mt-2">
              <p className="text-3xl font-mono font-bold text-gray-900">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ QR 코드는 12시간 동안 유효합니다
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 max-w-md w-full bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-3">사용 방법</h3>
          <ol className="space-y-2 text-sm">
            <li>1. 매장을 방문하세요</li>
            <li>2. 점주님께 이 QR 코드를 보여주세요</li>
            <li>3. 스캔 후 체험을 시작하세요</li>
            <li>4. 체험 후 리뷰를 작성해주세요</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
