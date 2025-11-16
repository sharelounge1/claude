import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Upload, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const MyCampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'completed'>('approved');

  const campaign = {
    id,
    name: '카페 모카',
    category: '카페',
    address: '서울시 강남구 테헤란로 123',
    visitDate: '2025-01-15',
    status,
  };

  const handleSubmitReview = () => {
    // TODO: Add review submission logic
    setStatus('completed');
    alert('리뷰가 등록되었습니다!');
  };

  const handleShowQR = () => {
    navigate(`/qr/${id}`);
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
        {/* Campaign Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-2">
                {campaign.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
            </div>
            <div>
              {status === 'pending' && (
                <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                  승인 대기중
                </span>
              )}
              {status === 'approved' && (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  승인 완료
                </span>
              )}
              {status === 'completed' && (
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                  리뷰 작성 완료
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={20} />
              <span>{campaign.address}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={20} />
              <span>방문 예정일: <strong className="text-black">{campaign.visitDate}</strong></span>
            </div>
          </div>
        </div>

        {/* QR Code Button (if approved) */}
        {status === 'approved' && (
          <button
            onClick={handleShowQR}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg mb-6 flex items-center justify-center gap-2"
          >
            <CheckCircle size={24} />
            QR 코드 보기
          </button>
        )}

        {/* Review Form */}
        {status === 'approved' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">리뷰 작성</h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                후기 내용
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="체험 후기를 작성해주세요..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none"
                rows={6}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                사진 업로드
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-black transition-colors cursor-pointer">
                <Upload size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">클릭하여 사진 업로드</p>
                <p className="text-gray-400 text-sm mt-1">최소 3장의 사진을 업로드해주세요</p>
              </div>
            </div>

            <button
              onClick={handleSubmitReview}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg"
            >
              리뷰 등록하기
            </button>
          </div>
        )}

        {/* Completed Review */}
        {status === 'completed' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">리뷰 작성 완료!</h3>
              <p className="text-gray-600">
                소중한 후기 감사합니다.<br />
                다음 체험단에서 만나요!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaignDetailPage;
