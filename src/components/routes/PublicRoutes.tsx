import React from "react";
import { isLoggedIn } from "../../lib/auth.ts";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes: React.FC = ({}) => {
  if (isLoggedIn()) return <Navigate to="/home" replace />;
  return <Outlet />;
};

export default PublicRoutes;
