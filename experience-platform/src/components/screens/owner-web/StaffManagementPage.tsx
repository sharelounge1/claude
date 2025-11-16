import { useState } from 'react';
import { UserPlus, Trash2, User } from 'lucide-react';

const StaffManagementPage = () => {
  const [userId, setUserId] = useState('');

  const staff = [
    { id: 1, userId: 'user123', name: '김직원', email: 'staff1@example.com', addedDate: '2025-01-10' },
    { id: 2, userId: 'user456', name: '이매니저', email: 'staff2@example.com', addedDate: '2025-01-15' },
  ];

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add staff logic
    alert(`직원 등록: ${userId}`);
    setUserId('');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">직원 관리</h1>
          <p className="text-gray-600">유저 ID로 직원을 등록하고 관리하세요</p>
        </div>

        {/* Add Staff Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">직원 등록</h2>
          <form onSubmit={handleAddStaff} className="flex gap-3">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="유저 ID 입력"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              <UserPlus size={20} />
              등록
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-3">
            * 등록된 직원은 앱에서 QR 코드를 스캔하여 체험단을 승인할 수 있습니다.
          </p>
        </div>

        {/* Staff List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">등록된 직원 ({staff.length}명)</h2>
          <div className="space-y-3">
            {staff.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">ID: {member.userId}</p>
                    <p className="text-xs text-gray-400">등록일: {member.addedDate}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagementPage;
