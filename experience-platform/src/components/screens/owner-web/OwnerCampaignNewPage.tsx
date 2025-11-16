import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

const OwnerCampaignNewPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stores, setStores] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    store_id: '',
    name: '',
    description: '',
    benefit: '',
    total_quota: 5,
    required_sns: [] as string[],
    start_date: '',
    end_date: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStores();
    }
  }, [user]);

  async function fetchStores() {
    const { data } = await supabase
      .from('stores')
      .select('*')
      .eq('owner_id', user!.id)
      .eq('status', 'active');

    setStores(data || []);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase.from('campaigns').insert({
        store_id: formData.store_id,
        owner_id: user.id,
        name: formData.name,
        description: formData.description,
        benefit: formData.benefit,
        total_quota: formData.total_quota,
        current_quota: 0,
        required_sns: formData.required_sns,
        start_date: formData.start_date,
        end_date: formData.end_date,
        deadline: formData.deadline,
        status: 'active',
      });

      if (error) throw error;

      alert('캠페인이 생성되었습니다!');
      navigate('/owner/campaigns');
    } catch (error: any) {
      alert(error.message || '캠페인 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSNS = (sns: string) => {
    if (formData.required_sns.includes(sns)) {
      setFormData({ ...formData, required_sns: formData.required_sns.filter(s => s !== sns) });
    } else {
      setFormData({ ...formData, required_sns: [...formData.required_sns, sns] });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">뒤로가기</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">캠페인 생성</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                매장 선택 *
              </label>
              <select
                value={formData.store_id}
                onChange={(e) => setFormData({ ...formData, store_id: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                required
              >
                <option value="">매장을 선택하세요</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                캠페인명 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="예: 시그니처 메뉴 무료 체험"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                캠페인 설명 *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="캠페인에 대한 자세한 설명을 입력하세요"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                제공 혜택 *
              </label>
              <textarea
                value={formData.benefit}
                onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="예: 시그니처 음료 1잔 무료, 디저트 1개 무료"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                모집 인원 *
              </label>
              <input
                type="number"
                value={formData.total_quota}
                onChange={(e) => setFormData({ ...formData, total_quota: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                min="1"
                max="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                필수 SNS
              </label>
              <div className="flex flex-wrap gap-3">
                {['인스타그램', '블로그', '유튜브'].map((sns) => (
                  <button
                    key={sns}
                    type="button"
                    onClick={() => toggleSNS(sns)}
                    className={`px-6 py-3 rounded-full border-2 transition-all font-bold ${
                      formData.required_sns.includes(sns)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-300 hover:border-black'
                    }`}
                  >
                    {sns}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  시작일 *
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  종료일 *
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  신청 마감일 *
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={24} />
              {loading ? '생성 중...' : '캠페인 생성'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerCampaignNewPage;
