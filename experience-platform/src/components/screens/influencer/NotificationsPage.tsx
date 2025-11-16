import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: '체험단 승인 완료',
      message: '카페 모카 체험단 신청이 승인되었습니다.',
      time: '2시간 전',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: '새로운 체험단',
      message: '근처에 새로운 체험단이 등록되었습니다.',
      time: '5시간 전',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: '리뷰 작성 필요',
      message: '서울 고깃집 체험 후 리뷰를 작성해주세요.',
      time: '1일 전',
      read: true,
    },
    {
      id: 4,
      type: 'success',
      title: '리뷰 등록 완료',
      message: '일본 이자카야 리뷰가 등록되었습니다.',
      time: '2일 전',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} className="text-green-500" />;
      case 'warning':
        return <AlertCircle size={24} className="text-yellow-500" />;
      case 'info':
        return <Info size={24} className="text-blue-500" />;
      default:
        return <Bell size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">뒤로가기</span>
            </button>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
              모두 읽음 표시
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">알림</h1>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm p-4 transition-all hover:shadow-md cursor-pointer ${
                !notification.read ? 'border-l-4 border-purple-500' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {notification.message}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">알림이 없습니다</h3>
            <p className="text-gray-500">새로운 알림이 도착하면 여기에 표시됩니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
