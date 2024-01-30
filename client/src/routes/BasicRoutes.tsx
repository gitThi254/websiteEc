import { Navigate, Outlet } from "react-router-dom";
import { useVerify } from "../hooks/auth.hook";

const BasicRoute = () => {
  const { data: user } = useVerify();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{<Outlet />}</>;
};

export default BasicRoute;
