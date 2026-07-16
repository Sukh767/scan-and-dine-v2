import { BlankLayout, MainLayout } from "@/layouts";
import { lazy } from "react";

import { GuestRoute } from "@/router/guards";

import { NotFound } from "@/shared";

const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));

const LoginPage = lazy(
  () => import("@/features/navigation/components/AuthModal/LoginPage"),
);

const RegisterPage = lazy(
  () => import("@/features/navigation/components/AuthModal/RegisterPage"),
);

export const routes = [
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
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];
