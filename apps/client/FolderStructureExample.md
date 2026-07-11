client/
│
├── public/
│
├── src/
│
│ ├── app/
│ │ ├── App.jsx
│ │ ├── AppProvider.jsx
│ │ └── index.js
│ │
│ ├── router/
│ │ ├── router.jsx
│ │ ├── routes.jsx
│ │ ├── ProtectedRoute.jsx
│ │ ├── GuestRoute.jsx
│ │ ├── ErrorBoundary.jsx
│ │ └── index.js
│ │
│ ├── layouts/
│ │ │
│ │ ├── MainLayout/
│ │ │ ├── MainLayout.jsx
│ │ │ ├── MainHeader.jsx
│ │ │ ├── MainFooter.jsx
│ │ │ └── index.js
│ │ │
│ │ ├── AuthLayout/
│ │ │ ├── AuthLayout.jsx
│ │ │ └── index.js
│ │ │
│ │ ├── ScanLayout/
│ │ │ ├── ScanLayout.jsx
│ │ │ └── index.js
│ │ │
│ │ └── index.js
│ │
│ ├── features/
│ │
│ │ ├── landing/
│ │ │
│ │ │ ├── api/
│ │ │ │ └── landing.api.js
│ │ │ │
│ │ │ ├── components/
│ │ │ │ ├── Hero.jsx
│ │ │ │ ├── FeatureSection.jsx
│ │ │ │ ├── Testimonials.jsx
│ │ │ │ ├── Pricing.jsx
│ │ │ │ ├── FAQ.jsx
│ │ │ │ └── CTA.jsx
│ │ │ │
│ │ │ ├── hooks/
│ │ │ │ └── useLanding.js
│ │ │ │
│ │ │ ├── services/
│ │ │ │ └── landing.service.js
│ │ │ │
│ │ │ ├── pages/
│ │ │ │ └── LandingPage.jsx
│ │ │ │
│ │ │ ├── constants/
│ │ │ ├── validation/
│ │ │ ├── utils/
│ │ │ └── index.js
│ │ │
│ │ ├── auth/
│ │ │
│ │ │ ├── api/
│ │ │ │ ├── login.api.js
│ │ │ │ ├── register.api.js
│ │ │ │ ├── forgot-password.api.js
│ │ │ │ ├── reset-password.api.js
│ │ │ │ └── verify-email.api.js
│ │ │ │
│ │ │ ├── components/
│ │ │ │ ├── LoginForm.jsx
│ │ │ │ ├── RegisterForm.jsx
│ │ │ │ ├── ForgotPasswordForm.jsx
│ │ │ │ ├── ResetPasswordForm.jsx
│ │ │ │ └── VerifyEmailForm.jsx
│ │ │ │
│ │ │ ├── hooks/
│ │ │ │ ├── useLogin.js
│ │ │ │ ├── useRegister.js
│ │ │ │ └── useLogout.js
│ │ │ │
│ │ │ ├── services/
│ │ │ │ └── auth.service.js
│ │ │ │
│ │ │ ├── validation/
│ │ │ │ ├── login.schema.js
│ │ │ │ └── register.schema.js
│ │ │ │
│ │ │ ├── pages/
│ │ │ │ ├── LoginPage.jsx
│ │ │ │ ├── RegisterPage.jsx
│ │ │ │ ├── ForgotPasswordPage.jsx
│ │ │ │ └── VerifyEmailPage.jsx
│ │ │ │
│ │ │ ├── store/
│ │ │ ├── constants/
│ │ │ ├── utils/
│ │ │ └── index.js
│ │ │
│ │ ├── restaurant/
│ │ ├── menu/
│ │ ├── cart/
│ │ ├── reservation/
│ │ ├── order/
│ │ ├── payment/
│ │ ├── profile/
│ │ ├── review/
│ │ └── notification/
│ │
│ ├── shared/
│ │
│ │ ├── components/
│ │ │ ├── Navbar/
│ │ │ ├── Footer/
│ │ │ ├── ThemeToggle/
│ │ │ ├── GlobalLoader/
│ │ │ ├── PageLoader/
│ │ │ ├── EmptyState/
│ │ │ ├── ErrorState/
│ │ │ └── OfflineBanner/
│ │ │
│ │ └── index.js
│ │
│ ├── hooks/
│ ├── stores/
│ ├── services/
│ ├── config/
│ ├── constants/
│ ├── utils/
│ ├── styles/
│ ├── assets/
│ │
│ ├── main.jsx
│ └── index.css
