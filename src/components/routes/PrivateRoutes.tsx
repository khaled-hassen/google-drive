import React from "react";
import { isLoggedIn } from "../../lib/auth.ts";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = ({}) => {
  if (isLoggedIn()) return <Outlet />;
  return <Navigate to="/" replace />;
};

export default PrivateRoutes;
