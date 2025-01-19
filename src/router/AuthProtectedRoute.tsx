import { Outlet } from "react-router";
import NotFoundPage from "../pages/404Page";
import { useSession } from "../contexts/SessionContext";

const AuthProtectedRoute = () => {
  const { session } = useSession();

  if (!session) return <NotFoundPage />;

  return <Outlet />;
};

export default AuthProtectedRoute;
