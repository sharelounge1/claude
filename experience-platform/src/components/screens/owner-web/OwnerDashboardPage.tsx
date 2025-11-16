import { useState, useEffect } from 'react';
import { Store, Megaphone, Users, Eye, MessageSquare } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

const OwnerDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    stores: 0,
    activeCampaigns: 0,
    totalParticipants: 0,
    totalReviews: 0,
  });
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  async function fetchDashboardData() {
    if (!user) return;

    try {
      // Fetch stores count
      const { count: storesCount } = await supabase
        .from('stores')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', user.id)
        .eq('status', 'active');

      // Fetch active campaigns count
      const { count: campaignsCount } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', user.id)
        .eq('status', 'active');

      // Get all owner's campaign IDs for filtering
      const { data: ownerCampaigns } = await supabase
        .from('campaigns')
        .select('id')
        .eq('owner_id', user.id);

      const campaignIds = ownerCampaigns?.map(c => c.id) || [];

      // Fetch total participants across all owner's campaigns
      let participantsCount = 0;
      if (campaignIds.length > 0) {
        const { count } = await supabase
          .from('campaign_applications')
          .select('*', { count: 'exact', head: true })
          .in('campaign_id', campaignIds);
        participantsCount = count || 0;
      }

      // Fetch total reviews across all owner's campaigns
      let reviewsCount = 0;
      if (campaignIds.length > 0) {
        const { count } = await supabase
          .from('reviews')
          .select('*', { count: 'exact', head: true })
          .in('campaign_id', campaignIds);
        reviewsCount = count || 0;
      }

      setStats({
        stores: storesCount || 0,
        activeCampaigns: campaignsCount || 0,
        totalParticipants: participantsCount,
        totalReviews: reviewsCount,
      });

      // Fetch recent campaigns with stats
      const { data: campaignsData } = await supabase
        .from('campaigns')
        .select(`
          *,
          store:stores(name)
        `)
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (campaignsData) {
        const campaignsWithStats = await Promise.all(
          campaignsData.map(async (campaign) => {
            const { count: applicantsCount } = await supabase
              .from('campaign_applications')
              .select('*', { count: 'exact', head: true })
              .eq('campaign_id', campaign.id);

            const { count: approvedCount } = await supabase
              .from('campaign_applications')
              .select('*', { count: 'exact', head: true })
              .eq('campaign_id', campaign.id)
              .eq('status', 'approved');

            const { count: completedCount } = await supabase
              .from('campaign_applications')
              .select('*', { count: 'exact', head: true })
              .eq('campaign_id', campaign.id)
              .eq('status', 'completed');

            return {
              id: campaign.id,
              name: campaign.name,
              store: campaign.store?.name || '매장명 없음',
              applicants: applicantsCount || 0,
              approved: approvedCount || 0,
              completed: completedCount || 0,
              status: campaign.status,
            };
          })
        );

        setRecentCampaigns(campaignsWithStats);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  }

  const statItems = [
    { icon: Store, label: '등록 매장', value: stats.stores.toString(), color: 'blue' },
    { icon: Megaphone, label: '진행중 캠페인', value: stats.activeCampaigns.toString(), color: 'purple' },
    { icon: Users, label: '총 참여자', value: stats.totalParticipants.toString(), color: 'green' },
    { icon: MessageSquare, label: '작성된 리뷰', value: stats.totalReviews.toString(), color: 'pink' },
  ];

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

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
          {statItems.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  'bg-pink-100'
                } rounded-xl flex items-center justify-center`}>
                  <stat.icon size={24} className={`${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    'text-pink-600'
                  }`} />
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
