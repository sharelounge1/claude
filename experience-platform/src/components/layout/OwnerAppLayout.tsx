import { Outlet, NavLink } from 'react-router-dom';
import { Home, QrCode, ClipboardList, User } from 'lucide-react';

const OwnerAppLayout = () => {
  const navItems = [
    { to: '/owner/app', icon: Home, label: '홈', end: true },
    { to: '/owner/qr-scan', icon: QrCode, label: 'QR 스캔' },
    { to: '/owner/app/history', icon: ClipboardList, label: '체험단 이력' },
    { to: '/owner/app/profile', icon: User, label: '마이페이지' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={24}
                    className={isActive ? 'stroke-2' : 'stroke-1'}
                  />
                  <span className="text-xs mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default OwnerAppLayout;
