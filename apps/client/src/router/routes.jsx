import { lazy } from "react";

import { BlankLayout, MainLayout } from "@/layouts";

import { GuestRoute, ProtectedRoute } from "@/router/guards";

import { NotFound } from "@/shared";
const RestaurantDetailsPage = lazy(() => import("@/features/restaurant/pages/RestaurantDetailsPage"));
const ShowRestaurants = lazy(() => import("@/features/discovery-restaurant/pages/ShowRestaurant"));

/* -------------------------------------------------------------------------- */
/*                               Public Pages                                 */
/* -------------------------------------------------------------------------- */

const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));

/* -------------------------------------------------------------------------- */
/*                              Authentication                                */
/* -------------------------------------------------------------------------- */

const LoginPage = lazy(
  () => import("@/features/navigation/components/AuthModal/LoginPage"),
);

const RegisterPage = lazy(
  () => import("@/features/navigation/components/AuthModal/RegisterPage"),
);

const ResetPasswordPage = lazy(
  () => import("@/features/navigation/page/ResetPasswordPage"),
);

/* -------------------------------------------------------------------------- */
/*                             Customer Account                               */
/* -------------------------------------------------------------------------- */

const ProfilePage = lazy(() => import("@/features/profile/pages/UserProfile"));

// const OrdersPage = lazy(() => import("@/features/orders/pages/OrdersPage"));

// const BookingsPage = lazy(
//   () => import("@/features/bookings/pages/BookingsPage"),
// );

/* -------------------------------------------------------------------------- */
/*                                  Routes                                    */
/* -------------------------------------------------------------------------- */

export const routes = [
  /* ======================================================================== */
  /* PUBLIC ROUTES                                                            */
  /* Accessible by everyone                                                   */
  /* ======================================================================== */
  {
    path: "/",

    element: <MainLayout />,

    meta: {
      title: "Scan & Dine",
      layout: "main",
      requiresAuth: false,
    },

    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },

  /* ======================================================================== */
  /* GUEST ROUTES                                                             */
  /* Only accessible when NOT logged in                                       */
  /* ======================================================================== */
  {
    path: "/",

    element: <BlankLayout />,

    meta: {
      title: "Authentication",
      layout: "auth",
      requiresAuth: false,
    },

    children: [
      {
        path: "login",

        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },

      {
        path: "register",

        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },

      {
        path: "auth/reset-password",

        element: (
          <GuestRoute>
            <ResetPasswordPage />
          </GuestRoute>
        ),
      },

      {
        path: 'restaurants',

        element: (
          <GuestRoute>
            <ShowRestaurants />
          </GuestRoute>
        ),
      },

      {
        path: 'restaurants/:slug',

        element: (
          <GuestRoute>
            <RestaurantDetailsPage />
          </GuestRoute>
        ),
      },
    ],
  },

  /* ======================================================================== */
  /* CUSTOMER PROTECTED ROUTES                                                */
  /* Requires authentication                                                  */
  /* ======================================================================== */
  {
    path: "/",

    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    meta: {
      title: "Customer Area",
      layout: "main",
      requiresAuth: true,
    },

    children: [
      /* -------------------------------------------------------------------- */
      /* Profile                                                              */
      /* -------------------------------------------------------------------- */
      {
        path: "profile",
        element: <ProfilePage />,
      },

      /* -------------------------------------------------------------------- */
      /* Orders                                                               */
      /* -------------------------------------------------------------------- */
      // {
      //   path: "orders",
      //   element: <OrdersPage />,
      // },

      /* -------------------------------------------------------------------- */
      /* Bookings                                                             */
      /* -------------------------------------------------------------------- */
      //   {
      //     path: "bookings",
      //     element: <BookingsPage />,
      //   },
    ],
  },

  /* ======================================================================== */
  /* 404                                                                      */
  /* ======================================================================== */
  {
    path: "*",
    element: <NotFound />,
  },
];
