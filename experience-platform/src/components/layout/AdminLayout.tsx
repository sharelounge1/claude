import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Store, Megaphone, AlertTriangle, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: '대시보드', end: true },
    { to: '/admin/users', icon: Users, label: '사용자 관리' },
    { to: '/admin/stores', icon: Store, label: '매장 관리' },
    { to: '/admin/campaigns', icon: Megaphone, label: '캠페인 관리' },
    { to: '/admin/reports', icon: AlertTriangle, label: '신고 관리' },
    { to: '/admin/settings', icon: Settings, label: '설정' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">슈퍼 관리자</h1>
          <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white text-gray-900 font-semibold'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            onClick={() => {/* Add logout logic */}}
          >
            <LogOut size={20} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
