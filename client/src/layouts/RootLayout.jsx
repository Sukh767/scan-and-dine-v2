import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Preloader from '../components/preloader/Preloader';
import useUIStore from '../stores/uiStore';
import useAuthStore from '../stores/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:   1000 * 60 * 5, // 5 min
      gcTime:      1000 * 60 * 10,
      retry:       1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const { isPreloaderDone, setPreloaderDone } = useUIStore();
  const hydrate = useAuthStore((s) => s.hydrate);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Hydrate auth from token on mount
    hydrate();

    // Init Lenis smooth scroll
    const lenis = new Lenis({
      duration:   1.2,
      easing:     (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch:   false,
    });
    lenisRef.current = lenis;

    // Expose to GSAP ScrollTrigger if used
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {!isPreloaderDone && (
        <Preloader onComplete={setPreloaderDone} />
      )}
      <div className={`min-h-screen bg-dark text-text-primary font-body transition-opacity duration-500 ${isPreloaderDone ? 'opacity-100' : 'opacity-0'}`}>
        <Outlet />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color:      '#FFFFFF',
            border:     '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize:   '14px',
          },
          success: { iconTheme: { primary: '#22C55E', secondary: '#1A1A1A' } },
          error:   { iconTheme: { primary: '#EF4444', secondary: '#1A1A1A' } },
        }}
      />
    </QueryClientProvider>
  );
}