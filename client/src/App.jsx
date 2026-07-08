import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './stores/auth.store.js';
import {
    setAccessToken,
    getAccessToken,
    clearAccessToken,
} from "@scan/api";

import { ApiError } from "@scan/api";

const error = new ApiError({
    message: "Unauthorized",
    statusCode: 401,
});

console.log(error);

import { request } from "@scan/api";

import { queryClient } from "@scan/query";

console.log(queryClient);

console.log(typeof request.get);
console.log(typeof request.post);
console.log(typeof request.put);
console.log(typeof request.patch);
console.log(typeof request.delete);

import { env } from "@scan/config";
// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" replace />;
};


setAccessToken("abc123");

console.log(getAccessToken());

clearAccessToken();

console.log(getAccessToken());

export default function App() {

console.log(env.apiUrl);
  return (
    <Routes>
      <Route path="/" element={<h1>Scan and Dine</h1>} />
    </Routes>
  );
}
