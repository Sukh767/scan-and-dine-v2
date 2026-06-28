import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const navItems = [
  { to: '/',              label: 'Dashboard',        icon: '🏠' },
  { to: '/restaurants',   label: 'Restaurants',      icon: '🍴' },
  { to: '/users',         label: 'Users',            icon: '👥' },
  { to: '/subscriptions', label: 'Subscriptions',    icon: '📦' },
  { to: '/billing',       label: 'Billing',          icon: '💰' },
  { to: '/revenue',       label: 'Revenue',          icon: '📈' },
  { to: '/support',       label: 'Support',          icon: '🎧' },
  { to: '/reports',       label: 'Reports',          icon: '📄' },
  { to: '/settings',      label: 'Platform Settings',icon: '⚙️' },
];

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate          = useNavigate();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="px-6 py-5 border-b border-slate-700">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Platform Admin</p>
          <p className="font-semibold mt-0.5 text-white truncate">{user?.name}</p>
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
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`
              }
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="px-6 py-4 text-sm text-slate-400 hover:text-red-400 text-left border-t border-slate-700 transition-colors"
        >
          Sign out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
