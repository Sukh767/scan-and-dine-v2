import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../utils/api';

/**
 * ScanRedirect
 * ─────────────
 * Entry point when a customer scans a table QR code.
 * URL: /scan/:qrToken
 *
 * Flow:
 * 1. Not logged in → save qrToken to sessionStorage → go to /login → come back here after
 * 2. Logged in     → POST /api/sessions/scan → redirect to /menu/:sessionId
 */
export default function ScanRedirect() {
  const { qrToken } = useParams();
  const navigate    = useNavigate();
  const user        = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!qrToken) return navigate('/');

    if (!user) {
      // Persist QR token so we can resume after login/register
      sessionStorage.setItem('pendingQrToken', qrToken);
      return navigate('/login?redirect=/scan/' + qrToken);
    }

    (async () => {
      try {
        const { data } = await api.post('/sessions/scan', { qrToken });
        navigate(`/menu/${data.data.session._id}`, { replace: true });
      } catch (err) {
        const msg = err.response?.data?.message || 'Could not start session';
        navigate(`/?error=${encodeURIComponent(msg)}`);
      }
    })();
  }, [qrToken, user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
      <p className="text-lg animate-pulse">Opening your table…</p>
    </div>
  );
}
