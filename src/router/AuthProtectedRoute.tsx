import { Outlet } from "react-router";
import { MainLayout } from "../core/main-layout";

const AuthProtectedRoute = () => {
  //const { isAuthenticated } = useSession();

  //if (!isAuthenticated) return <NotFoundPage />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AuthProtectedRoute;
