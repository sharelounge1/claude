import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Store, Megaphone, Users, Settings, LogOut } from 'lucide-react';

const OwnerWebLayout = () => {
  const navItems = [
    { to: '/owner', icon: LayoutDashboard, label: '대시보드', end: true },
    { to: '/owner/stores', icon: Store, label: '내 매장' },
    { to: '/owner/campaigns', icon: Megaphone, label: '캠페인 관리' },
    { to: '/owner/staff', icon: Users, label: '직원 관리' },
    { to: '/owner/settings', icon: Settings, label: '설정' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">점주 관리</h1>
          <p className="text-sm text-gray-500 mt-1">Owner Dashboard</p>
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
                        ? 'bg-black text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
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
        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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

export default OwnerWebLayout;
