import { createBrowserRouter } from "react-router";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../providers.tsx";
import { SignInComponent } from "../auth/siginin/index.tsx";
import { SignUpComponent } from "../auth/signup/index.tsx";
import Home from "../pages/home/home.tsx";
import { MainLayout } from "../core/main-layout/index.tsx";
import { routeCustomers } from "../pages/customer/routers.tsx";
import { Link } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // Rotas públicas
      {
        path: "/",
        element: (
          <>
            <Link  to="auth/sign-in" />
            <Link to="auth/sign-in" />
          </>
        ), // usar para mostrar uma landing page do sistema
      },
      {
        path: "auth/sign-in",
        element: <SignInComponent />,
      },
      {
        path: "auth/sign-up",
        element: <SignUpComponent />,
      },
      // Rotas protegidas por autenticação
      {
        path: "/main",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "",
            element: <MainLayout />,
            children: [
              {
                path: "home",
                element: <Home />,
              },
              ...routeCustomers,
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
