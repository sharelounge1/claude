import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Store, Gift, Users, Clock } from 'lucide-react';

interface Campaign {
  id: number;
  storeName: string;
  category: string;
  region: string;
  benefit: string;
  currentQuota: number;
  totalQuota: number;
  deadline: string;
  imageUrl: string;
  sns: string[];
}

const CampaignsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'deadline' | 'popular'>('latest');

  // Mock data
  const campaigns: Campaign[] = [
    {
      id: 1,
      storeName: '서울 카페 모카',
      category: '카페',
      region: '서울 강남구',
      benefit: '2인 무료 식사',
      currentQuota: 3,
      totalQuota: 5,
      deadline: '2025-12-31',
      imageUrl: '',
      sns: ['블로그', '인스타그램'],
    },
    {
      id: 2,
      storeName: '부산 고깃집',
      category: '고깃집',
      region: '부산 해운대구',
      benefit: '50% 할인',
      currentQuota: 5,
      totalQuota: 5,
      deadline: '2025-11-30',
      imageUrl: '',
      sns: ['블로그'],
    },
    {
      id: 3,
      storeName: '강남 이자카야',
      category: '이자카야',
      region: '서울 강남구',
      benefit: '2인 무료 + 음료',
      currentQuota: 1,
      totalQuota: 3,
      deadline: '2025-12-15',
      imageUrl: '',
      sns: ['인스타그램', '유튜브'],
    },
  ];

  const handleToggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 pt-4 pb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">체험단 리스트</h1>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="매장명, 키워드 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          {[
            { value: 'latest', label: '최신순' },
            { value: 'deadline', label: '마감 임박순' },
            { value: 'popular', label: '인기순' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                sortBy === option.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div
                key={filter}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleToggleFilter(filter)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveFilters([])}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
            >
              전체 해제
            </button>
          </div>
        )}
      </div>

      {/* Campaign List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4 max-w-lg mx-auto">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Store size={64} className="text-white/50" />
                </div>
                {/* SNS Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {campaign.sns.map((sns) => (
                    <span
                      key={sns}
                      className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700"
                    >
                      {sns}
                    </span>
                  ))}
                </div>
                {/* Quota Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-primary text-white rounded-full text-sm font-semibold">
                  {campaign.currentQuota}/{campaign.totalQuota}명
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {campaign.storeName}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{campaign.region}</span>
                    <span className="text-gray-400">|</span>
                    <Store size={16} className="text-gray-400" />
                    <span>{campaign.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Gift size={16} className="text-accent" />
                    <span className="font-semibold text-accent">
                      혜택: {campaign.benefit}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} className="text-gray-400" />
                    <span>
                      모집: {campaign.currentQuota}/{campaign.totalQuota}명
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    <span>마감: {campaign.deadline}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    campaign.currentQuota >= campaign.totalQuota
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-blue-600'
                  }`}
                  disabled={campaign.currentQuota >= campaign.totalQuota}
                >
                  {campaign.currentQuota >= campaign.totalQuota ? '마감됨' : '신청하기'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">필터</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Search Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">검색어</h3>
              <input
                type="text"
                placeholder="매장명, 키워드 입력"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Region Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">지역</h3>
              <div className="flex flex-wrap gap-2">
                {['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산'].map((region) => (
                  <button
                    key={region}
                    onClick={() => handleToggleFilter(region)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      activeFilters.includes(region)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* SNS Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">SNS</h3>
              <div className="flex flex-wrap gap-2">
                {['블로그', '인스타그램', '유튜브'].map((sns) => (
                  <button
                    key={sns}
                    onClick={() => handleToggleFilter(sns)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      activeFilters.includes(sns)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {sns}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">매장 종류</h3>
              <div className="flex flex-wrap gap-2">
                {['카페', '밥집', '고깃집', '술집', '이자카야', '분식', '베이커리', '디저트', '한식당', '중식당', '일식당', '양식당'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleToggleFilter(category)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      activeFilters.includes(category)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsListPage;
