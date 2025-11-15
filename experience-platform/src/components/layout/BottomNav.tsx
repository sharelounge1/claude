import { NavLink } from 'react-router-dom';
import { MapPin, List, Clock, User } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: MapPin, label: '홈' },
    { to: '/campaigns', icon: List, label: '체험단 리스트' },
    { to: '/my-campaigns', icon: Clock, label: '진행중 체험단' },
    { to: '/profile', icon: User, label: '마이페이지' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary'
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
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
