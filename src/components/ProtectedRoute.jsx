import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ roles, user }) => {
  if (!user) {
    return <Navigate to="/DangNhap" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
