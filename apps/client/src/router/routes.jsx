import { lazy } from "react";

import { BlankLayout, MainLayout } from "@/layouts";

import { GuestRoute, ProtectedRoute } from "@/router/guards";

import { NotFound } from "@/shared";

/* -------------------------------------------------------------------------- */
/*                               Public Pages                                 */
/* -------------------------------------------------------------------------- */

const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));

const ShowRestaurants = lazy(
  () => import("@/features/discovery-restaurant/pages/ShowRestaurant"),
);

const RestaurantDetailsPage = lazy(
  () => import("@/features/restaurant/pages/RestaurantDetailsPage"),
);

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

      /* -------------------------------------------------------------------- */
      /* Restaurant Discovery                                                 */
      /* -------------------------------------------------------------------- */

      {
        path: "restaurants",

        element: <ShowRestaurants />,

        meta: {
          title: "Restaurants",
        },
      },

      {
        path: "restaurants/:slug",

        element: <RestaurantDetailsPage />,

        meta: {
          title: "Restaurant Details",
        },
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
    ],
  },

  /* ======================================================================== */
  /* PROTECTED ROUTES                                                         */
  /* Only accessible when logged in                                           */
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
      {
        path: "profile",

        element: <ProfilePage />,

        meta: {
          title: "My Profile",
        },
      },

      // {
      //   path: "orders",
      //   element: <OrdersPage />,
      // },

      // {
      //   path: "bookings",
      //   element: <BookingsPage />,
      // },
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
