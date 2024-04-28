import React from "react";
import { isLoggedIn } from "../../lib/auth.ts";
import { Navigate, Outlet } from "react-router-dom";

/**
 * A PublicRoutes component that manages public routes.
 *
 * This component uses the `isLoggedIn` function from the `auth` library to check if the user is logged in. If the user is logged in, it redirects them to the home route. Otherwise, it renders an `Outlet` for nested routes.
 *
 * @example
 * import PublicRoutes from "./PublicRoutes";
 *
 * // In a React component
 * <PublicRoutes>
 *   <Route path="/" element={<Login />} />
 * </PublicRoutes>
 */
const PublicRoutes: React.FC = ({}) => {
  if (isLoggedIn()) return <Navigate to="/home" replace />;
  return <Outlet />;
};

export default PublicRoutes;
