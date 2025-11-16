import { Users, Store, Megaphone, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

const AdminDashboardPage = () => {
  const stats = [
    { icon: Users, label: '전체 사용자', value: '1,234', trend: '+123', color: 'blue' },
    { icon: Store, label: '등록 매장', value: '456', trend: '+45', color: 'green' },
    { icon: Megaphone, label: '진행중 캠페인', value: '89', trend: '+12', color: 'purple' },
    { icon: AlertTriangle, label: '미처리 신고', value: '3', trend: '-2', color: 'red' },
  ];

  const recentUsers = [
    { id: 1, name: '김인플', type: '인플루언서', email: 'user1@example.com', joinDate: '2025-01-20' },
    { id: 2, name: '이점주', type: '점주', email: 'owner1@example.com', joinDate: '2025-01-19' },
    { id: 3, name: '박블로거', type: '인플루언서', email: 'user2@example.com', joinDate: '2025-01-18' },
  ];

  const systemActivity = [
    { id: 1, action: '신규 캠페인 등록', user: '이점주', time: '10분 전' },
    { id: 2, action: '리뷰 작성 완료', user: '김인플', time: '30분 전' },
    { id: 3, action: '매장 등록', user: '박사장', time: '1시간 전' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 대시보드</h1>
          <p className="text-gray-600">전체 시스템 현황을 모니터링하세요</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon size={24} className={`text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 ${
                  stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                } text-sm font-semibold`}>
                  <TrendingUp size={16} />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">최근 가입 사용자</h2>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{user.joinDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.type === '점주'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={24} className="text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">시스템 활동</h2>
            </div>
            <div className="space-y-3">
              {systemActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity size={20} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
