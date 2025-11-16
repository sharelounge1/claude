import { useNavigate } from 'react-router-dom';
import { QrCode, ClipboardList, Store, BarChart3 } from 'lucide-react';

const OwnerAppHomePage = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: QrCode, label: 'QR 스캔', desc: '방문 확인', path: '/owner/qr-scan', color: 'purple' },
    { icon: ClipboardList, label: '체험단 이력', desc: '참여 내역', path: '/owner/app/history', color: 'blue' },
    { icon: Store, label: '내 매장', desc: '매장 관리', path: '/owner/stores', color: 'green' },
    { icon: BarChart3, label: '통계', desc: '현황 보기', path: '/owner', color: 'orange' },
  ];

  const recentActivities = [
    { id: 1, user: '김인플', action: 'QR 스캔 완료', time: '10분 전', campaign: '카페 모카 체험단' },
    { id: 2, user: '이블로거', action: '리뷰 작성 완료', time: '1시간 전', campaign: '런치 세트 체험단' },
    { id: 3, user: '박유튜버', action: 'QR 스캔 완료', time: '2시간 전', campaign: '디저트 신메뉴' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 pb-12">
        <h1 className="text-2xl font-bold mb-2">점주 앱</h1>
        <p className="text-white/90">빠른 메뉴로 쉽게 관리하세요</p>
      </div>

      <div className="px-4 -mt-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 bg-${action.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                <action.icon size={28} className={`text-${action.color}-600`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{action.label}</h3>
              <p className="text-sm text-gray-500">{action.desc}</p>
            </button>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 활동</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">👤</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.campaign}</p>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAppHomePage;
