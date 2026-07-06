// import { Routes, Route, Navigate } from 'react-router-dom';
// import useAuthStore from './store/authStore';

// // Pages
// import Discovery    from '../pages/Discovery';
// import Menu         from '../pages/Menu';
// import Checkout     from '../pages/Checkout';
// import Login        from '../pages/Login';
// import Register     from '../pages/Register';
// import ScanRedirect from '../pages/ScanRedirect';
// import OrderStatus  from '../pages/OrderStatus';
// import Profile      from '../pages/Profile';
// import NotFound     from '../pages/NotFound';

// // Protected route wrapper
// const ProtectedRoute = ({ children }) => {
//   const user = useAuthStore((s) => s.user);
//   return user ? children : <Navigate to="/login" replace />;
// };

// export default function App() {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/"         element={<Discovery />} />
//       <Route path="/login"    element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* QR scan redirect — keeps restaurant + table in state */}
//       <Route path="/scan/:qrToken" element={<ScanRedirect />} />

//       {/* Protected customer routes */}
//       <Route path="/menu/:sessionId" element={
//         <ProtectedRoute><Menu /></ProtectedRoute>
//       } />
//       <Route path="/checkout/:sessionId" element={
//         <ProtectedRoute><Checkout /></ProtectedRoute>
//       } />
//       <Route path="/order/:sessionId/status" element={
//         <ProtectedRoute><OrderStatus /></ProtectedRoute>
//       } />
//       <Route path="/profile" element={
//         <ProtectedRoute><Profile /></ProtectedRoute>
//       } />

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }


export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Scan and Dine!</h1>
      <p className="mt-4 text-lg text-gray-600">Your one-stop solution for restaurant ordering.</p>
    </div>
  );  
}