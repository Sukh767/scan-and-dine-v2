import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Pages
import Login          from './pages/Login';
import Dashboard      from './pages/Dashboard';
import ActiveSessions from './pages/ActiveSessions';
import Tables         from './pages/Tables';
import MenuBuilder    from './pages/MenuBuilder';
import Categories     from './pages/Categories';
import Orders         from './pages/Orders';
import Reservations   from './pages/Reservations';
import Offers         from './pages/Offers';
import Payments       from './pages/Payments';
import Reviews        from './pages/Reviews';
import Analytics      from './pages/Analytics';
import Settings       from './pages/Settings';

// Layout
import DashboardLayout from './components/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'restaurant') return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index                element={<Dashboard />} />
        <Route path="sessions"      element={<ActiveSessions />} />
        <Route path="tables"        element={<Tables />} />
        <Route path="menu"          element={<MenuBuilder />} />
        <Route path="categories"    element={<Categories />} />
        <Route path="orders"        element={<Orders />} />
        <Route path="reservations"  element={<Reservations />} />
        <Route path="offers"        element={<Offers />} />
        <Route path="payments"      element={<Payments />} />
        <Route path="reviews"       element={<Reviews />} />
        <Route path="analytics"     element={<Analytics />} />
        <Route path="settings"      element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
