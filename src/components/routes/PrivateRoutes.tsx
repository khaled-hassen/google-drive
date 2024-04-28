import React from "react";
import { isLoggedIn } from "../../lib/auth.ts";
import { Navigate, Outlet } from "react-router-dom";
import PageLayout from "../layout/PageLayout.tsx";

/**
 * A PrivateRoutes component that manages private routes.
 *
 * This component uses the `isLoggedIn` function from the `auth` library to check if the user is logged in. If the user is not logged in, it redirects them to the root route. Otherwise, it renders the `PageLayout` component and an `Outlet` for nested routes.
 *
 * @example
 * import PrivateRoutes from "./PrivateRoutes";
 *
 * // In a React component
 * <PrivateRoutes>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </PrivateRoutes>
 */
const PrivateRoutes: React.FC = ({}) => {
  if (!isLoggedIn()) return <Navigate to="/" replace />;

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default PrivateRoutes;
