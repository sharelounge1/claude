import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, QrCode as QrCodeIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

const QRCodePage = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (applicationId && user) {
      fetchQRCode();
    }
  }, [applicationId, user]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  async function fetchQRCode() {
    try {
      // Fetch application
      const { data: appData, error: appError } = await supabase
        .from('campaign_applications')
        .select(`
          *,
          campaign:campaigns(
            name,
            store:stores(name)
          )
        `)
        .eq('id', applicationId)
        .eq('user_id', user!.id)
        .single();

      if (appError) throw appError;
      setApplication(appData);

      // Fetch QR code
      const { data: qrData, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (qrError) {
        // No QR code found, create one
        if (appData.status === 'approved') {
          await createQRCode();
        } else {
          setLoading(false);
        }
      } else {
        setQrCode(qrData);
        // Calculate time left
        const expiresAt = new Date(qrData.expires_at).getTime();
        const now = Date.now();
        const secondsLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
        setTimeLeft(secondsLeft);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
      setLoading(false);
    }
  }

  async function createQRCode() {
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 12);

      const { data, error } = await supabase
        .from('qr_codes')
        .insert({
          application_id: applicationId,
          user_id: user!.id,
          campaign_id: application!.campaign_id,
          code: crypto.randomUUID(),
          expires_at: expiresAt.toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setQrCode(data);
      setTimeLeft(12 * 60 * 60); // 12 hours
      setLoading(false);
    } catch (error) {
      console.error('Error creating QR code:', error);
      setLoading(false);
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
        <div className="text-white text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">신청 정보를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/my-campaigns')}
            className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold"
          >
            내 체험단으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (application.status !== 'approved' || !qrCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">
            {application.status === 'pending' ? '승인 대기 중입니다.' : 'QR 코드를 생성할 수 없습니다.'}
          </p>
          <button
            onClick={() => navigate('/my-campaigns')}
            className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold"
          >
            내 체험단으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

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
            <p className="text-gray-500">{application.campaign?.store?.name || '매장'} 방문 시 제시</p>
          </div>

          {/* QR Code Display Area */}
          <div className="bg-white border-4 border-gray-900 rounded-2xl p-6 mb-6">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-xs text-gray-500 mb-2">QR Code</p>
                <p className="font-mono text-xs break-all text-gray-700 mb-2">{qrCode.code}</p>
                {qrCode.is_used && (
                  <div className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    ✓ 사용 완료
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Campaign Info */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">캠페인</p>
            <p className="text-lg font-bold text-gray-900">{application.campaign?.name}</p>
          </div>

          {/* Timer */}
          {!qrCode.is_used && (
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
          )}

          {/* Info */}
          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-800 text-center">
              {qrCode.is_used
                ? '✓ 이 QR 코드는 이미 사용되었습니다'
                : timeLeft === 0
                ? '⚠️ QR 코드가 만료되었습니다'
                : '⚠️ QR 코드는 12시간 동안 유효합니다'}
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
