import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const navItems = [
  { to: '/',              label: 'Overview',      icon: '🏠' },
  { to: '/sessions',      label: 'Live Sessions', icon: '🔴' },
  { to: '/orders',        label: 'Orders',        icon: '📋' },
  { to: '/tables',        label: 'Tables',        icon: '🪑' },
  { to: '/reservations',  label: 'Reservations',  icon: '📅' },
  { to: '/menu',          label: 'Menu',          icon: '🍽️' },
  { to: '/categories',    label: 'Categories',    icon: '📂' },
  { to: '/offers',        label: 'Offers',        icon: '🏷️' },
  { to: '/payments',      label: 'Payments',      icon: '💳' },
  { to: '/reviews',       label: 'Reviews',       icon: '⭐' },
  { to: '/analytics',     label: 'Analytics',     icon: '📊' },
  { to: '/settings',      label: 'Settings',      icon: '⚙️' },
];

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
        <div className="px-6 py-5 border-b border-neutral-100">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">Scan & Dine</p>
          <p className="font-semibold text-neutral-900 mt-0.5 truncate">{user?.name}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`
              }
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="px-6 py-4 text-sm text-neutral-500 hover:text-red-600 text-left border-t border-neutral-100 transition-colors"
        >
          Sign out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
