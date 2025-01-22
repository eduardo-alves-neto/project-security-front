import { createBrowserRouter, RouteObject } from "react-router";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../providers.tsx";
import { SignInComponent } from "../auth/siginin/index.tsx";
import { SignUpComponent } from "../auth/signup/index.tsx";
import Home from "../pages/home/home.tsx";
import { routeCustomers } from "../pages/customer/routers.tsx";
import { Button, Stack } from "@mui/material";

const protectedRoutes: RouteObject[] = [
  {
    path: "home",
    element: <Home />,
  },
  ...routeCustomers,
];

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Stack
        height="100dvh"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Button
          variant="contained"
          onClick={() => window.open("/auth/sign-in")}
        >
          sign-in
        </Button>
        <Button
          variant="contained"
          onClick={() => window.open("/auth/sign-up")}
        >
          sign-up
        </Button>
      </Stack>
    ),
  },
  {
    path: "auth/sign-in",
    element: <SignInComponent />,
  },
  {
    path: "auth/sign-up",
    element: <SignUpComponent />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // Rotas públicas
      ...publicRoutes,

      // Rotas protegidas
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: protectedRoutes,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
