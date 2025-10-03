import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PostPage from "./PostPage";
import Layout from "../layout/Layout";
import { HomePage } from "../pages/HomePage";
import { LoginForm } from "../pages/LoginPage";
import { SignupForm } from "../pages/SignupPage";
import { PublicRoute } from "./route/PublicRoute";

function AppRouter() {
  const { isAuthenticated } = useAuth();

  // If not authenticated, only allow access to login and signup routes
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupForm />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // If authenticated, render all protected routes
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupForm />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/posts" element={<Layout />}>
        <Route index element={<PostPage />} />
      </Route>
      <Route path="/profile" element={<Layout />}>
        <Route index element={<div>Profile Page</div>} />
      </Route>
      <Route path="/settings" element={<Layout />}>
        <Route index element={<div>Settings Page</div>} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default AppRouter;
