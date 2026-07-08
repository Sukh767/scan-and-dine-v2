import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './stores/auth.store.js';

// Pages
//import Discovery    from './pages/Discovery.jsx';
import LandingPage from './features/landing/LandingPage.jsx';

import { env } from "@scan/config";
// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {

console.log(env.apiUrl);
  return (
    <Routes>
      <Route path="/" element={<h1>Scan and Dine</h1>} />
    </Routes>
  );
}
