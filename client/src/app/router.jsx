import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootLayout       from '../layouts/RootLayout';
import PublicLayout     from '../layouts/PublicLayout';
import AuthLayout       from '../layouts/AuthLayout';
import OrderingLayout   from '../layouts/OrderingLayout';
import UserLayout       from '../layouts/UserLayout';

// Lazy load all pages for code splitting
import { lazy, Suspense } from 'react';
const lazy = (fn) => React.lazy(fn);

// Landing
const LandingPage = lazy(() => import('../features/landing/LandingPage'));

// Auth
const LoginPage         = lazy(() => import('../features/auth/LoginPage'));
const RegisterPage      = lazy(() => import('../features/auth/RegisterPage'));
const EmailOTPPage      = lazy(() => import('../features/auth/EmailOTPPage'));
const ForgotPasswordPage= lazy(() => import('../features/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../features/auth/ResetPasswordPage'));

// Discovery
const RestaurantsPage       = lazy(() => import('../features/discovery/RestaurantsPage'));
const RestaurantDetailsPage = lazy(() => import('../features/discovery/RestaurantDetailsPage'));
const GalleryPage           = lazy(() => import('../features/discovery/GalleryPage'));
const ChefPage              = lazy(() => import('../features/discovery/ChefPage'));

// Reservations
const ReservationsPage      = lazy(() => import('../features/reservations/ReservationsPage'));
const ReservationSuccessPage= lazy(() => import('../features/reservations/ReservationSuccessPage'));

// Ordering (QR flow)
const QRScannerPage    = lazy(() => import('../features/ordering/QRScannerPage'));
const QRSessionPage    = lazy(() => import('../features/ordering/QRSessionPage'));
const MenuPage         = lazy(() => import('../features/ordering/MenuPage'));
const CartPage         = lazy(() => import('../features/ordering/CartPage'));
const CheckoutPage     = lazy(() => import('../features/ordering/CheckoutPage'));
const OrderTrackingPage= lazy(() => import('../features/ordering/OrderTrackingPage'));
const OrderSuccessPage = lazy(() => import('../features/ordering/OrderSuccessPage'));

// User
const ProfilePage             = lazy(() => import('../features/user/ProfilePage'));
const ReservationsHistoryPage = lazy(() => import('../features/user/ReservationsHistoryPage'));
const FavoritesPage           = lazy(() => import('../features/user/FavoritesPage'));
const NotificationsPage       = lazy(() => import('../features/user/NotificationsPage'));
const SettingsPage            = lazy(() => import('../features/user/SettingsPage'));

// Static
const AboutPage    = lazy(() => import('../features/static/AboutPage'));
const ContactPage  = lazy(() => import('../features/static/ContactPage'));
const PricingPage  = lazy(() => import('../features/static/PricingPage'));
const FeaturesPage = lazy(() => import('../features/static/FeaturesPage'));
const FAQPage      = lazy(() => import('../features/static/FAQPage'));

// Guards
import ProtectedRoute from '../components/guards/ProtectedRoute';

const PageLoader = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,       // Lenis + Preloader + Providers
    children: [
      // PUBLIC ROUTES — with Navbar + Footer
      {
        element: <PublicLayout />,
        children: [
          { index: true,                 element: <Suspense fallback={<PageLoader />}><LandingPage /></Suspense> },
          { path: 'restaurants',         element: <Suspense fallback={<PageLoader />}><RestaurantsPage /></Suspense> },
          { path: 'restaurants/:slug',   element: <Suspense fallback={<PageLoader />}><RestaurantDetailsPage /></Suspense> },
          { path: 'restaurants/:slug/gallery', element: <Suspense fallback={<PageLoader />}><GalleryPage /></Suspense> },
          { path: 'restaurants/:slug/chefs',   element: <Suspense fallback={<PageLoader />}><ChefPage /></Suspense> },
          { path: 'reservations',        element: <Suspense fallback={<PageLoader />}><ReservationsPage /></Suspense> },
          { path: 'reservations/success',element: <Suspense fallback={<PageLoader />}><ReservationSuccessPage /></Suspense> },
          { path: 'about',               element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
          { path: 'contact',             element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
          { path: 'pricing',             element: <Suspense fallback={<PageLoader />}><PricingPage /></Suspense> },
          { path: 'features',            element: <Suspense fallback={<PageLoader />}><FeaturesPage /></Suspense> },
          { path: 'faq',                 element: <Suspense fallback={<PageLoader />}><FAQPage /></Suspense> },
        ],
      },
      // AUTH ROUTES — centered card, no nav
      {
        element: <AuthLayout />,
        children: [
          { path: 'login',           element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
          { path: 'register',        element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
          { path: 'verify-email',    element: <Suspense fallback={<PageLoader />}><EmailOTPPage /></Suspense> },
          { path: 'forgot-password', element: <Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense> },
          { path: 'reset-password',  element: <Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense> },
        ],
      },
      // ORDERING ROUTES — full screen, no nav
      {
        element: <OrderingLayout />,
        children: [
          { path: 'scan',                          element: <Suspense fallback={<PageLoader />}><QRScannerPage /></Suspense> },
          { path: 'qr',                            element: <Suspense fallback={<PageLoader />}><QRSessionPage /></Suspense> },
          { path: 'session/:sessionId/menu',        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><MenuPage /></Suspense></ProtectedRoute> },
          { path: 'session/:sessionId/cart',        element: <ProtectedRoute><Suspense fallback={<PageLoader />}><CartPage /></Suspense></ProtectedRoute> },
          { path: 'session/:sessionId/checkout',    element: <ProtectedRoute><Suspense fallback={<PageLoader />}><CheckoutPage /></Suspense></ProtectedRoute> },
          { path: 'session/:sessionId/tracking',    element: <ProtectedRoute><Suspense fallback={<PageLoader />}><OrderTrackingPage /></Suspense></ProtectedRoute> },
          { path: 'session/:sessionId/success',     element: <ProtectedRoute><Suspense fallback={<PageLoader />}><OrderSuccessPage /></Suspense></ProtectedRoute> },
        ],
      },
      // USER ROUTES — sidebar layout, protected
      {
        path: 'account',
        element: <ProtectedRoute><UserLayout /></ProtectedRoute>,
        children: [
          { path: 'profile',       element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense> },
          { path: 'reservations',  element: <Suspense fallback={<PageLoader />}><ReservationsHistoryPage /></Suspense> },
          { path: 'favorites',     element: <Suspense fallback={<PageLoader />}><FavoritesPage /></Suspense> },
          { path: 'notifications', element: <Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense> },
          { path: 'settings',      element: <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense> },
        ],
      },
    ],
  },
]);

export default router;