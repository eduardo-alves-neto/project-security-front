import { Outlet } from "react-router";
import NotFoundPage from "../pages/404Page";
import { useSession } from "../contexts/sessionContext";
import { MainLayout } from "../core/main-layout";

const AuthProtectedRoute = () => {
  const { session } = useSession();

  if (!session) return <NotFoundPage />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AuthProtectedRoute;
