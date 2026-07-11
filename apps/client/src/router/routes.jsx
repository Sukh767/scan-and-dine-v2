import { MainLayout } from "@/layouts";
import { LandingPage } from "@/features/landing";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
];
