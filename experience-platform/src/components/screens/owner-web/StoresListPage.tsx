import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Phone, Clock, Edit } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

const StoresListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStores();
    }
  }, [user]);

  async function fetchStores() {
    if (!user) return;

    try {
      // Fetch all stores for the owner
      const { data: storesData, error } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // For each store, count active campaigns
      const storesWithCampaigns = await Promise.all(
        (storesData || []).map(async (store) => {
          const { count } = await supabase
            .from('campaigns')
            .select('*', { count: 'exact', head: true })
            .eq('store_id', store.id)
            .eq('status', 'active');

          return {
            ...store,
            campaigns: count || 0,
          };
        })
      );

      setStores(storesWithCampaigns);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

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

        {stores.length > 0 ? (
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
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">등록된 매장이 없습니다</h3>
              <p className="text-gray-500 mb-6">매장을 등록하고 캠페인을 시작해보세요!</p>
              <button
                onClick={() => navigate('/owner/stores/new')}
                className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                매장 등록하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresListPage;
