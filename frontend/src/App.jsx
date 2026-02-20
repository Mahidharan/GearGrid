import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import { useState, useEffect, useContext } from "react";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import MechanicDashboard from "./pages/MechanicDashboard";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function AppRoutes() {
  const location = useLocation();
  const { loading: authLoading } = useContext(AuthContext);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    // Show loading spinner on route change
    setRouteLoading(true);

    // Hide loading spinner after a short delay
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Show loading screen while checking authentication
  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {routeLoading && <LoadingSpinner />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />

        {/* Protected Routes - Customer */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Mechanic */}
        <Route
          path="/mechanic-dashboard"
          element={
            <ProtectedRoute allowedRole="mechanic">
              <MechanicDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Both */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
