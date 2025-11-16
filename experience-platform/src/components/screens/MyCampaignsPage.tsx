import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';

const MyCampaignsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const ongoingCampaigns = [
    {
      id: 1,
      name: '카페 모카',
      category: '카페',
      address: '서울시 강남구 테헤란로 123',
      visitDate: '2025-01-20',
      status: 'approved',
      statusText: '승인 완료',
    },
    {
      id: 2,
      name: '서울 고깃집',
      category: '고깃집',
      address: '서울시 강남구 역삼동 456',
      visitDate: '2025-01-22',
      status: 'pending',
      statusText: '승인 대기중',
    },
  ];

  const completedCampaigns = [
    {
      id: 3,
      name: '일본 이자카야',
      category: '이자카야',
      address: '서울시 강남구 논현동 789',
      completedDate: '2025-01-10',
      reviewStatus: 'completed',
    },
    {
      id: 4,
      name: '프렌치 레스토랑',
      category: '양식',
      address: '서울시 강남구 청담동 321',
      completedDate: '2025-01-05',
      reviewStatus: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">내 체험단</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`py-4 font-semibold relative ${
                activeTab === 'ongoing'
                  ? 'text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              진행중
              {activeTab === 'ongoing' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 font-semibold relative ${
                activeTab === 'completed'
                  ? 'text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              완료
              {activeTab === 'completed' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'ongoing' && (
          <div className="space-y-4">
            {ongoingCampaigns.length > 0 ? (
              ongoingCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => navigate(`/my-campaigns/${campaign.id}`)}
                  className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-2">
                        {campaign.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {campaign.name}
                      </h3>
                    </div>
                    <div>
                      {campaign.status === 'approved' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          ✓ {campaign.statusText}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                          ⏳ {campaign.statusText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{campaign.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>방문 예정일: {campaign.visitDate}</span>
                    </div>
                  </div>

                  {campaign.status === 'approved' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/qr/${campaign.id}`);
                        }}
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                      >
                        QR 코드 보기
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  진행중인 체험단이 없습니다
                </h3>
                <p className="text-gray-500 mb-6">
                  새로운 체험단에 신청해보세요!
                </p>
                <button
                  onClick={() => navigate('/campaigns')}
                  className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  체험단 둘러보기
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedCampaigns.length > 0 ? (
              completedCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => navigate(`/my-campaigns/${campaign.id}`)}
                  className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold mb-2">
                        {campaign.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {campaign.name}
                      </h3>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        <CheckCircle size={12} className="inline mr-1" />
                        완료
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{campaign.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>완료일: {campaign.completedDate}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  완료한 체험단이 없습니다
                </h3>
                <p className="text-gray-500">
                  체험단을 완료하고 리뷰를 작성해보세요!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaignsPage;
