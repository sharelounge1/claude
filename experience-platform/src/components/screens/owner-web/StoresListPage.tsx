import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Phone, Clock, Edit } from 'lucide-react';

const StoresListPage = () => {
  const navigate = useNavigate();

  const stores = [
    { id: 1, name: '카페 모카 강남점', address: '서울시 강남구 테헤란로 123', phone: '02-1234-5678', status: 'active', campaigns: 3 },
    { id: 2, name: '카페 모카 역삼점', address: '서울시 강남구 역삼동 456', phone: '02-2345-6789', status: 'active', campaigns: 2 },
    { id: 3, name: '카페 모카 판교점', address: '경기도 성남시 분당구 판교역로 789', phone: '031-3456-7890', status: 'inactive', campaigns: 0 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">내 매장</h1>
            <p className="text-gray-600">등록된 매장을 관리하세요</p>
          </div>
          <button
            onClick={() => navigate('/owner/stores/new')}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            <Plus size={20} />
            매장 등록
          </button>
        </div>

        <div className="grid gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{store.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      store.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {store.status === 'active' ? '운영중' : '휴업'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span>진행중 캠페인: {store.campaigns}개</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/owner/stores/${store.id}/edit`)}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Edit size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoresListPage;
