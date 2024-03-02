import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {//Because refresh After Not Navigate To Home Page
    return <Outlet />;//outlet mean render all Child routes
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;