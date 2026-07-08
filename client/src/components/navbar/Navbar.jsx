import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, QrCode, Search, Menu, X, Bell, ChevronDown } from 'lucide-react';
import { cn } from '@scan-dine/utils';
import useAuthStore from '../../stores/authStore';
import useCartStore from '../../stores/cartStore';
import useUIStore   from '../../stores/uiStore';

const NAV_LINKS = [
  { label: 'Restaurants', href: '/restaurants' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [profileOpen,  setProfileOpen]  = useState(false);
  const navigate = useNavigate();

  const { user, logout, isLoggedIn } = useAuthStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const { openCart, openMobileNav, isMobileNavOpen, closeMobileNav } = useUIStore();

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-dark/90 backdrop-blur-xl border-b border-surface-border shadow-card'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2">
            <span className="font-display font-black text-xl text-white tracking-tight">
              Scan <span className="text-primary">&amp;</span> Dine
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-text-secondary hover:text-white hover:bg-surface-raised'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Search */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:flex overflow-hidden"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate(`/restaurants?q=${searchQuery}`);
                        setSearchOpen(false);
                      }
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                    placeholder="Search restaurants..."
                    className="w-full px-4 py-2 bg-surface-raised border border-surface-border rounded-lg text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-surface-raised transition-colors"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* QR Scan */}
            <Link
              to="/scan"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-surface-raised transition-colors"
              title="Scan QR"
            >
              <QrCode size={18} />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex w-9 h-9 items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-surface-raised transition-colors"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Notifications (logged in) */}
            {isLoggedIn && (
              <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-surface-raised transition-colors">
                <Bell size={18} />
              </button>
            )}

            {/* Auth */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-border bg-surface-raised hover:border-primary/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-text-secondary font-medium">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className={cn('text-text-muted transition-transform', profileOpen && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-surface-raised border border-surface-border rounded-xl shadow-card overflow-hidden z-50"
                    >
                      {[
                        { label: 'My Profile', href: '/account/profile' },
                        { label: 'Reservations', href: '/account/reservations' },
                        { label: 'Favorites', href: '/account/favorites' },
                        { label: 'Settings', href: '/account/settings' },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-surface-overlay transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-surface-border" />
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-colors shadow-glow-primary"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={openMobileNav}
              className="flex md:hidden w-9 h-9 items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-surface-raised transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileNav}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-surface-raised border-l border-surface-border md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-surface-border">
                <span className="font-display font-black text-lg text-white">Menu</span>
                <button onClick={closeMobileNav} className="p-1 text-text-secondary hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={closeMobileNav}
                    className="flex items-center px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-surface-overlay transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/scan"
                  onClick={closeMobileNav}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-surface-overlay transition-colors"
                >
                  <QrCode size={16} />
                  Scan QR Code
                </Link>
              </nav>
              <div className="p-4 border-t border-surface-border space-y-2">
                {isLoggedIn ? (
                  <button onClick={logout} className="w-full py-2.5 rounded-lg border border-surface-border text-error text-sm font-medium">
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMobileNav} className="block text-center py-2.5 rounded-lg border border-surface-border text-text-secondary text-sm">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={closeMobileNav} className="block text-center py-2.5 rounded-lg bg-primary text-white text-sm font-bold">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}