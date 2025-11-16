import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import type { Campaign } from '../../../lib/supabase';

interface StoreInfo {
  name: string;
  address?: string;
  category?: string;
}

interface CampaignWithStore extends Campaign {
  store?: StoreInfo;
  current_participants?: number;
}

const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [campaign, setCampaign] = useState<CampaignWithStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCampaign();
      checkApplication();
    }
  }, [id, user]);

  async function fetchCampaign() {
    try {
      const { data: campaignData, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          store:stores(name, address, category)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Fetch current participants count
      const { count } = await supabase
        .from('campaign_applications')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', id)
        .in('status', ['approved', 'completed']);

      setCampaign({
        ...campaignData,
        current_participants: count || 0,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaign:', error);
      setLoading(false);
    }
  }

  async function checkApplication() {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('campaign_applications')
        .select('id')
        .eq('campaign_id', id)
        .eq('user_id', user.id)
        .single();

      setHasApplied(!!data);
    } catch (error) {
      // No application found
      setHasApplied(false);
    }
  }

  const handleApply = async () => {
    if (!user || !profile) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (hasApplied) {
      alert('이미 신청한 캠페인입니다.');
      return;
    }

    if (!campaign) return;

    if ((campaign.current_participants || 0) >= campaign.total_quota) {
      alert('모집 인원이 마감되었습니다.');
      return;
    }

    setApplying(true);

    try {
      const { error } = await supabase
        .from('campaign_applications')
        .insert({
          campaign_id: campaign.id,
          user_id: user.id,
          status: 'pending',
        });

      if (error) throw error;

      alert('체험단 신청이 완료되었습니다! 승인을 기다려주세요.');
      setHasApplied(true);
      navigate('/my-campaigns');
    } catch (error: any) {
      console.error('Error applying:', error);
      alert(error.message || '신청에 실패했습니다.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">캠페인을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const isFull = (campaign.current_participants || 0) >= campaign.total_quota;

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
          <span className="text-8xl">📍</span>
        </div>

        {/* Campaign Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-2">
                {campaign.store?.category || '일반'}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{campaign.store?.name || '매장명 없음'}</h1>
              <h2 className="text-xl text-gray-600">{campaign.name}</h2>
            </div>
          </div>

          <div className="space-y-3">
            {campaign.store?.address && (
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={20} />
                <span>{campaign.store.address}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-gray-600">
              <Users size={20} />
              <span>모집 인원: <strong className={isFull ? 'text-red-500' : 'text-black'}>{campaign.current_participants}/{campaign.total_quota}명</strong> {isFull && <span className="text-red-500">(마감)</span>}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={20} />
              <span>마감일: <strong className="text-black">{new Date(campaign.end_date).toLocaleDateString('ko-KR')}</strong></span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">체험단 소개</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{campaign.description}</p>
        </div>

        {/* Requirements */}
        {campaign.required_sns && campaign.required_sns.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">신청 자격</h2>
            <ul className="space-y-2">
              {campaign.required_sns.map((sns, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700">{sns} 필수</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {campaign.benefit && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">혜택</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{campaign.benefit}</p>
          </div>
        )}

        {/* Apply Button */}
        <button
          onClick={handleApply}
          disabled={applying || hasApplied || isFull}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg sticky bottom-4 ${
            hasApplied
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : isFull
              ? 'bg-red-500 text-white cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {applying ? '신청 중...' : hasApplied ? '신청 완료' : isFull ? '모집 마감' : '신청하기'}
        </button>
      </div>
    </div>
  );
};

export default CampaignDetailPage;
