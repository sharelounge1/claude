import { TrendingUp, Store, Megaphone, Users, Eye, MessageSquare, Star, Calendar } from 'lucide-react';

const OwnerDashboardPage = () => {
  const stats = [
    { icon: Store, label: '등록 매장', value: '3', color: 'blue', trend: '+1' },
    { icon: Megaphone, label: '진행중 캠페인', value: '5', color: 'purple', trend: '+2' },
    { icon: Users, label: '총 참여자', value: '127', color: 'green', trend: '+15' },
    { icon: MessageSquare, label: '작성된 리뷰', value: '89', color: 'pink', trend: '+8' },
  ];

  const recentCampaigns = [
    { id: 1, name: '카페 모카 체험단', store: '강남점', applicants: 12, approved: 8, completed: 3, status: 'active' },
    { id: 2, name: '런치 세트 체험단', store: '역삼점', applicants: 20, approved: 15, completed: 12, status: 'active' },
    { id: 3, name: '디저트 신메뉴', store: '강남점', applicants: 8, approved: 8, completed: 8, status: 'completed' },
  ];

  const recentReviews = [
    { id: 1, user: '김인플', campaign: '카페 모카 체험단', rating: 5, date: '2시간 전' },
    { id: 2, user: '이유튜버', campaign: '런치 세트 체험단', rating: 4, date: '5시간 전' },
    { id: 3, user: '박블로거', campaign: '디저트 신메뉴', rating: 5, date: '1일 전' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
          <p className="text-gray-600">전체 현황을 한눈에 확인하세요</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon size={24} className={`text-${stat.color}-600`} />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp size={16} />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Campaigns */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">최근 캠페인</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                전체보기 →
              </button>
            </div>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">{campaign.store}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status === 'active' ? '진행중' : '완료'}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Eye size={16} />
                      <span>신청 {campaign.applicants}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users size={16} />
                      <span>승인 {campaign.approved}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MessageSquare size={16} />
                      <span>완료 {campaign.completed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">최근 리뷰</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                전체보기 →
              </button>
            </div>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{review.user}</h3>
                      <p className="text-sm text-gray-500">{review.campaign}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">빠른 작업</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
              <Store size={32} className="mx-auto mb-3 text-gray-400 group-hover:text-blue-600" />
              <p className="font-semibold text-gray-900">매장 등록</p>
            </button>
            <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group">
              <Megaphone size={32} className="mx-auto mb-3 text-gray-400 group-hover:text-purple-600" />
              <p className="font-semibold text-gray-900">캠페인 생성</p>
            </button>
            <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group">
              <Users size={32} className="mx-auto mb-3 text-gray-400 group-hover:text-green-600" />
              <p className="font-semibold text-gray-900">직원 관리</p>
            </button>
            <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all group">
              <MessageSquare size={32} className="mx-auto mb-3 text-gray-400 group-hover:text-pink-600" />
              <p className="font-semibold text-gray-900">리뷰 확인</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
