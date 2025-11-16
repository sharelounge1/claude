import { useNavigate } from 'react-router-dom';
import { Plus, Users, Calendar, Eye } from 'lucide-react';

const OwnerCampaignsPage = () => {
  const navigate = useNavigate();

  const campaigns = [
    { id: 1, name: '카페 모카 체험단', store: '강남점', applicants: 12, approved: 8, completed: 3, deadline: '2025-02-28', status: 'active' },
    { id: 2, name: '런치 세트 체험단', store: '역삼점', applicants: 20, approved: 15, completed: 12, deadline: '2025-02-15', status: 'active' },
    { id: 3, name: '디저트 신메뉴', store: '강남점', applicants: 8, approved: 8, completed: 8, deadline: '2025-01-31', status: 'completed' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">캠페인 관리</h1>
            <p className="text-gray-600">체험단 캠페인을 생성하고 관리하세요</p>
          </div>
          <button
            onClick={() => navigate('/owner/campaigns/new')}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            <Plus size={20} />
            캠페인 생성
          </button>
        </div>

        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{campaign.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status === 'active' ? '진행중' : '완료'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{campaign.store}</p>

                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye size={16} />
                      <span className="text-sm">신청 {campaign.applicants}명</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} />
                      <span className="text-sm">승인 {campaign.approved}명</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">마감 {campaign.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/owner/campaigns/${campaign.id}/status`)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-black text-sm font-semibold transition-colors"
                  >
                    진행 상황
                  </button>
                  <button
                    onClick={() => navigate(`/owner/campaigns/${campaign.id}/edit`)}
                    className="px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    수정
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <div className="flex-1 bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 font-semibold mb-1">완료율</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {campaign.approved > 0 ? Math.round((campaign.completed / campaign.approved) * 100) : 0}%
                    </p>
                  </div>
                  <div className="flex-1 bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-purple-600 font-semibold mb-1">승인율</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {campaign.applicants > 0 ? Math.round((campaign.approved / campaign.applicants) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerCampaignsPage;
