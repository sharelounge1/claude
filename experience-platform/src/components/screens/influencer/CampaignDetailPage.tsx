import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, Star } from 'lucide-react';

const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const campaign = {
    id,
    name: '카페 모카',
    category: '카페',
    address: '서울시 강남구 테헤란로 123',
    quota: '3/5',
    endDate: '2025-01-31',
    description: '강남 한복판에 위치한 모던한 카페입니다. 시그니처 메뉴인 카라멜 마키아토를 무료로 체험하실 수 있습니다.',
    requirements: ['인스타그램 팔로워 1,000명 이상', '블로그 이웃 500명 이상', '리뷰 최소 3장의 사진 포함'],
    benefits: ['시그니처 메뉴 1잔 무료', '디저트 1개 무료', '매장 사진 촬영 가능'],
    rating: 4.5,
  };

  const handleApply = () => {
    // TODO: Add application logic
    alert('체험단 신청이 완료되었습니다!');
    navigate('/my-campaigns');
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
        {/* Campaign Image */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl h-64 mb-6 flex items-center justify-center">
          <span className="text-8xl">☕</span>
        </div>

        {/* Campaign Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-2">
                {campaign.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
            </div>
            <div className="flex items-center gap-1">
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-lg">{campaign.rating}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={20} />
              <span>{campaign.address}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Users size={20} />
              <span>모집 인원: <strong className="text-black">{campaign.quota}명</strong></span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={20} />
              <span>마감일: <strong className="text-black">{campaign.endDate}</strong></span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">체험단 소개</h2>
          <p className="text-gray-700 leading-relaxed">{campaign.description}</p>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">신청 자격</h2>
          <ul className="space-y-2">
            {campaign.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">혜택</h2>
          <ul className="space-y-2">
            {campaign.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg sticky bottom-4"
        >
          신청하기
        </button>
      </div>
    </div>
  );
};

export default CampaignDetailPage;
