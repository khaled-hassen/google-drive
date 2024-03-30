import React from "react";
import { isLoggedIn } from "../../lib/auth.ts";
import { Navigate, Outlet } from "react-router-dom";
import PageLayout from "../layout/PageLayout.tsx";

const PrivateRoutes: React.FC = ({}) => {
  if (!isLoggedIn()) return <Navigate to="/" replace />;

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default PrivateRoutes;
