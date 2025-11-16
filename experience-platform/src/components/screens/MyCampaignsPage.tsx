import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { CampaignApplication } from '../../lib/supabase';

interface StoreInfo {
  name: string;
  address?: string;
  category?: string;
}

interface CampaignInfo {
  name: string;
  end_date: string;
  store?: StoreInfo;
}

interface ApplicationWithCampaign extends CampaignApplication {
  campaign?: CampaignInfo;
}

const MyCampaignsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [ongoingCampaigns, setOngoingCampaigns] = useState<ApplicationWithCampaign[]>([]);
  const [completedCampaigns, setCompletedCampaigns] = useState<ApplicationWithCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyCampaigns();
    }
  }, [user]);

  async function fetchMyCampaigns() {
    if (!user) return;

    try {
      // Fetch ongoing campaigns (pending, approved)
      const { data: ongoing, error: ongoingError } = await supabase
        .from('campaign_applications')
        .select(`
          *,
          campaign:campaigns(
            name,
            end_date,
            store:stores(name, address, category)
          )
        `)
        .eq('user_id', user.id)
        .in('status', ['pending', 'approved'])
        .order('created_at', { ascending: false });

      if (ongoingError) throw ongoingError;

      // Fetch completed campaigns
      const { data: completed, error: completedError } = await supabase
        .from('campaign_applications')
        .select(`
          *,
          campaign:campaigns(
            name,
            end_date,
            store:stores(name, address, category)
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('updated_at', { ascending: false });

      if (completedError) throw completedError;

      setOngoingCampaigns(ongoing || []);
      setCompletedCampaigns(completed || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching my campaigns:', error);
      setLoading(false);
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '승인 대기중';
      case 'approved':
        return '승인 완료';
      case 'completed':
        return '완료';
      case 'rejected':
        return '거절됨';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

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
              ongoingCampaigns.map((application) => (
                <div
                  key={application.id}
                  onClick={() => navigate(`/my-campaigns/${application.id}`)}
                  className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-2">
                        {application.campaign?.store?.category || '일반'}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {application.campaign?.store?.name || '매장명 없음'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{application.campaign?.name}</p>
                    </div>
                    <div>
                      {application.status === 'approved' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          ✓ {getStatusText(application.status)}
                        </span>
                      ) : application.status === 'pending' ? (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                          ⏳ {getStatusText(application.status)}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                          ✗ {getStatusText(application.status)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    {application.campaign?.store?.address && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{application.campaign.store.address}</span>
                      </div>
                    )}
                    {application.campaign?.end_date && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>마감일: {new Date(application.campaign.end_date).toLocaleDateString('ko-KR')}</span>
                      </div>
                    )}
                  </div>

                  {application.status === 'approved' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/qr/${application.id}`);
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
              completedCampaigns.map((application) => (
                <div
                  key={application.id}
                  onClick={() => navigate(`/my-campaigns/${application.id}`)}
                  className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold mb-2">
                        {application.campaign?.store?.category || '일반'}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {application.campaign?.store?.name || '매장명 없음'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{application.campaign?.name}</p>
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        <CheckCircle size={12} className="inline mr-1" />
                        완료
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    {application.campaign?.store?.address && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{application.campaign.store.address}</span>
                      </div>
                    )}
                    {application.updated_at && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>완료일: {new Date(application.updated_at).toLocaleDateString('ko-KR')}</span>
                      </div>
                    )}
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
