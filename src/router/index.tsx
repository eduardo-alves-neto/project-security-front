import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage.tsx";
import ProtectedPage from "../pages/ProtectedPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../providers.tsx";
import { SignInComponent } from "../auth/siginin/index.tsx";
import { SignUpComponent } from "../auth/signup/index.tsx";
import Home from "../pages/home/home.tsx";
import { MainLayout } from "../core/main-layout/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // Rotas públicas
      {
        path: "/",
        element: <HomePage />,
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
                path: "protected",
                element: <ProtectedPage />,
              },
              {
                path: "home",
                element: <Home />,
              },
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
