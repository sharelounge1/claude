import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, CheckCircle } from 'lucide-react';

const QRScanPage = () => {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState({ user: '', campaign: '' });

  const handleScan = () => {
    // Mock QR scan
    setScannedData({ user: '김인플', campaign: '카페 모카 체험단' });
    setScanned(true);

    setTimeout(() => {
      setScanned(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">뒤로가기</span>
        </button>
      </div>

      {/* Scanner */}
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-2">QR 코드 스캔</h1>
          <p className="text-center text-gray-400 mb-8">
            고객의 QR 코드를 스캔하여 방문을 확인하세요
          </p>

          {/* QR Scanner Frame */}
          <div className="relative aspect-square bg-gray-800 rounded-3xl overflow-hidden mb-8 border-4 border-white/20">
            <div className="absolute inset-0 flex items-center justify-center">
              {!scanned ? (
                <Camera size={80} className="text-white/40" />
              ) : (
                <div className="text-center">
                  <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
                  <p className="text-xl font-bold text-white">{scannedData.user}</p>
                  <p className="text-gray-400">{scannedData.campaign}</p>
                </div>
              )}
            </div>

            {/* Scanner corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl" />
          </div>

          <button
            onClick={handleScan}
            className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            {scanned ? '승인 완료!' : '테스트 스캔'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            카메라를 QR 코드에 맞춰주세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanPage;
