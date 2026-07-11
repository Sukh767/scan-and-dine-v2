import { MainLayout } from "@/layouts";
import { LandingPage } from "@/features/landing";
import { NotFound } from "@/shared";

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
