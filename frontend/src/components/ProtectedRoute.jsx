import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useContext(AuthContext);

  // Loading state is now handled in App.jsx
  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to appropriate dashboard if wrong role
    if (user.role === "customer") {
      return <Navigate to="/customer-dashboard" replace />;
    } else if (user.role === "mechanic") {
      return <Navigate to="/mechanic-dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
