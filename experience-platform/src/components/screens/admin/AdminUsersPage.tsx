import { useState } from 'react';
import { Search, Filter, User, Ban, CheckCircle } from 'lucide-react';

const AdminUsersPage = () => {
  const [filter, setFilter] = useState('all');

  const users = [
    { id: 1, name: '김인플', type: 'influencer', email: 'user1@example.com', status: 'active', campaigns: 12, reviews: 24 },
    { id: 2, name: '이점주', type: 'owner', email: 'owner1@example.com', status: 'active', stores: 3, campaigns: 5 },
    { id: 3, name: '박블로거', type: 'influencer', email: 'user2@example.com', status: 'inactive', campaigns: 0, reviews: 0 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">사용자 관리</h1>
          <p className="text-gray-600">전체 사용자를 조회하고 관리하세요</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="이름, 이메일 검색"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
              <Filter size={20} />
              필터
            </button>
          </div>

          <div className="flex gap-2">
            {['all', 'influencer', 'owner'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  filter === type
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? '전체' : type === 'influencer' ? '인플루언서' : '점주'}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">사용자</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">유형</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">활동</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">상태</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.type === 'owner'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.type === 'owner' ? '점주' : '인플루언서'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.type === 'owner'
                      ? `매장 ${user.stores}개, 캠페인 ${user.campaigns}개`
                      : `체험단 ${user.campaigns}개, 리뷰 ${user.reviews}개`
                    }
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {user.status === 'active' ? (
                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                          <Ban size={18} />
                        </button>
                      ) : (
                        <button className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors">
                          <CheckCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
