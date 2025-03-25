import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("user");
  console.log("PrivateRoute - isAuthenticated:", isAuthenticated); // Debug
  console.log("PrivateRoute - parsed user:", JSON.parse(isAuthenticated || '{}')); // Debug

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;