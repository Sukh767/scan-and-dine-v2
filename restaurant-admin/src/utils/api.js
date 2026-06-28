import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT from localStorage automatically
api.interceptors.request.use((config) => {
  const stored = JSON.parse(localStorage.getItem('sand-auth') || '{}');
  const token  = stored?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const stored = JSON.parse(localStorage.getItem('sand-auth') || '{}');
        const refreshToken = stored?.state?.refreshToken;
        const { data } = await axios.post('/api/auth/refresh', { refreshToken });
        // Update store (import avoided to prevent circular dep — update raw storage)
        const state = JSON.parse(localStorage.getItem('sand-auth'));
        state.state.token        = data.data.token;
        state.state.refreshToken = data.data.refreshToken;
        localStorage.setItem('sand-auth', JSON.stringify(state));
        original.headers.Authorization = `Bearer ${data.data.token}`;
        return api(original);
      } catch {
        localStorage.removeItem('sand-auth');
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
