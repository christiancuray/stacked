import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = React.memo(
  ({ children }) => {
    const { isAuthenticated } = useAuth();

    // Return redirect immediately without rendering children if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    // Only render children if authenticated
    return children ? <>{children}</> : <Outlet />;
  }
);
