import { Navigate, useLocation, Outlet } from "react-router";

function ProtectedRoute() {
  const location = useLocation();
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    (user && user.firstName)
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default ProtectedRoute;
