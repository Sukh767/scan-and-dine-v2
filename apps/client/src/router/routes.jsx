import { MainLayout } from "@/layouts";
import { lazy } from "react";

import { NotFound } from "@/shared";

const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));

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

        meta: {
          title: "Home",
        },
      },
    ],
  },

  {
    path: "*",

    element: <NotFound />,

    meta: {
      title: "404",
      layout: "main",
    },
  },
];
