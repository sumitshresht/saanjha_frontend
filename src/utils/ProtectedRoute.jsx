import{Navigate, useLocation, Outlet} from "react-router";
function ProtectedRoute(){
const location = useLocation();
const user = sessionStorage.getItem("user");
    return (
        (user !== null && user !== undefined) ? 
        <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
}
export default ProtectedRoute;