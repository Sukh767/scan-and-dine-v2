import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import { PageLoader } from "@/shared";

import { routes } from "./routes";

const wrapRoutes = (routes) =>
  routes.map((route) => ({
    ...route,

    element: <Suspense fallback={<PageLoader />}>{route.element}</Suspense>,

    children: route.children ? wrapRoutes(route.children) : undefined,
  }));

export const router = createBrowserRouter(wrapRoutes(routes));
