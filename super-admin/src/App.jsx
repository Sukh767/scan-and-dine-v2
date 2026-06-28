import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

import Login            from './pages/Login';
import Dashboard        from './pages/Dashboard';
import TenantManagement from './pages/TenantManagement';
import Billing          from './pages/Billing';
import Users            from './pages/Users';
import Subscriptions    from './pages/Subscriptions';
import Revenue          from './pages/Revenue';
import Support          from './pages/Support';
import Reports          from './pages/Reports';
import PlatformSettings from './pages/PlatformSettings';

import AdminLayout from './components/AdminLayout';

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'super_admin') return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index                    element={<Dashboard />} />
        <Route path="restaurants"       element={<TenantManagement />} />
        <Route path="users"             element={<Users />} />
        <Route path="subscriptions"     element={<Subscriptions />} />
        <Route path="billing"           element={<Billing />} />
        <Route path="revenue"           element={<Revenue />} />
        <Route path="support"           element={<Support />} />
        <Route path="reports"           element={<Reports />} />
        <Route path="settings"          element={<PlatformSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
