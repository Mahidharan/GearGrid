import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import orderService from "../services/orderService";
import Navbar from "../components/Navbar";

const CustomerDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth check to complete
    if (authLoading) return;

    if (!user || user.role !== "customer") {
      navigate("/login");
      return;
    }
    fetchRecentOrders();
  }, [user, authLoading, navigate]);

  const fetchRecentOrders = async () => {
    try {
      const orders = await orderService.getUserOrders(user._id);
      setRecentOrders(orders.slice(0, 5)); // Get latest 5 orders
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-dark-200 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-dark-400 text-lg">
                Let's find the perfect parts for your vehicle
              </p>
            </div>
            <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium shadow-lg">
              Customer Account
            </span>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Total Orders
                  </p>
                  <h3 className="text-3xl font-bold text-dark-200">
                    {recentOrders.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-primary-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Active Orders
                  </p>
                  <h3 className="text-3xl font-bold text-dark-200">
                    {recentOrders.filter((o) => o.status === "pending").length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Quick Access
                  </p>
                  <h3 className="text-lg font-bold text-dark-200">Dashboard</h3>
                </div>
                <div className="w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-2xl font-semibold text-dark-200">
                  Quick Actions
                </h2>
              </div>
              <div className="space-y-4">
                <button
                  className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-900/50 hover:shadow-primary-900/70 flex items-center justify-center gap-2"
                  onClick={() => navigate("/products")}
                >
                  <span className="text-xl">🔍</span>
                  Browse Products
                </button>
                <button
                  className="w-full py-4 px-6 border-2 border-primary-600 text-primary-600 hover:bg-primary-600/10 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                  onClick={() => navigate("/orders")}
                >
                  <span className="text-xl">📋</span>
                  View All Orders
                </button>
              </div>
            </div>

            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📦</span>
                </div>
                <h2 className="text-2xl font-semibold text-dark-200">
                  Recent Orders
                </h2>
              </div>
              {loading ? (
                <p className="text-dark-400">Loading orders...</p>
              ) : recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-dark-400 mb-4">
                    No orders yet. Start shopping!
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Browse Products →
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex justify-between items-center p-4 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-600 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-dark-200">
                          {order.productId?.name}
                        </p>
                        <p className="text-sm text-dark-400">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-dark-400 mb-1">
                          Qty: {order.quantity}
                        </p>
                        <span className="inline-block px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-600/30">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">ℹ️</span>
              </div>
              <h2 className="text-2xl font-semibold text-dark-200">
                Account Benefits
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-primary-600 text-xl mt-1">✓</span>
                <div>
                  <h3 className="text-dark-200 font-semibold mb-1">
                    Quality Parts
                  </h3>
                  <p className="text-dark-400 text-sm">
                    Access to premium car parts at competitive retail prices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-600 text-xl mt-1">✓</span>
                <div>
                  <h3 className="text-dark-200 font-semibold mb-1">
                    Fast Delivery
                  </h3>
                  <p className="text-dark-400 text-sm">
                    Quick shipping on all orders with tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
