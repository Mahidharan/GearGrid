import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import orderService from "../services/orderService";
import reminderService from "../services/reminderService";
import Navbar from "../components/Navbar";

const MechanicDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Wait for auth check to complete
    if (authLoading) return;

    if (!user || user.role !== "mechanic") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      const [remindersData, ordersData] = await Promise.all([
        reminderService.getUserReminders(user._id),
        orderService.getUserOrders(user._id),
      ]);
      setReminders(remindersData);
      setRecentOrders(ordersData.slice(0, 5));
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (reminderId) => {
    try {
      await reminderService.reorderFromReminder(reminderId);
      setSuccessMessage("Order placed successfully!");

      // Refresh data
      fetchData();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  const getDueReminders = () => {
    return reminders.filter((reminder) => {
      const nextDate = new Date(reminder.nextReminderDate);
      const today = new Date();
      return nextDate <= today;
    });
  };

  const dueReminders = getDueReminders();
  const autoOrderCount = reminders.filter((r) => r.autoOrder).length;

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
                Manage your parts inventory with wholesale pricing
              </p>
            </div>
            <span className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium shadow-lg">
              Mechanic Pro
            </span>
          </div>

          {successMessage && (
            <div className="bg-green-600/20 border border-green-600/30 text-green-400 px-6 py-4 rounded-lg mb-6 text-center font-medium shadow-lg">
              {successMessage}
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Due Reminders
                  </p>
                  <h3 className="text-3xl font-bold text-red-400">
                    {dueReminders.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔔</span>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Active Reminders
                  </p>
                  <h3 className="text-3xl font-bold text-dark-200">
                    {reminders.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-primary-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Recent Orders
                  </p>
                  <h3 className="text-3xl font-bold text-dark-200">
                    {recentOrders.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Auto-Orders
                  </p>
                  <h3 className="text-3xl font-bold text-green-400">
                    {autoOrderCount}
                  </h3>
                  <p className="text-xs text-dark-500 mt-1">Active</p>
                </div>
                <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔔</span>
                </div>
                <h2 className="text-2xl font-semibold text-dark-200">
                  Restock Reminders Due
                </h2>
              </div>
              {loading ? (
                <p className="text-dark-400">Loading reminders...</p>
              ) : dueReminders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-dark-400">
                    No reminders due at this time.
                  </p>
                  <p className="text-dark-500 text-sm mt-2">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {dueReminders.map((reminder) => (
                    <div
                      key={reminder._id}
                      className="flex justify-between items-center p-4 bg-dark-900 rounded-lg border border-red-600/30 hover:border-red-600 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-dark-200">
                            {reminder.productId?.name}
                          </p>
                          {reminder.autoOrder && (
                            <span className="px-2 py-0.5 bg-green-600/20 border border-green-600/30 text-green-400 text-xs rounded-full font-medium">
                              Auto-Order
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-dark-400 mt-1">
                          Quantity: {reminder.quantity}
                        </p>
                        <p className="text-sm text-primary-600 font-semibold mt-1">
                          Price: $
                          {(
                            reminder.productId?.mechanicPrice *
                            reminder.quantity
                          ).toFixed(2)}
                        </p>
                        {reminder.autoOrder && (
                          <p className="text-xs text-green-400 mt-1">
                            ✓ Will auto-order in background
                          </p>
                        )}
                      </div>
                      {!reminder.autoOrder && (
                        <button
                          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-900/50"
                          onClick={() => handleReorder(reminder._id)}
                        >
                          Reorder
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📅</span>
                </div>
                <h2 className="text-2xl font-semibold text-dark-200">
                  All Active Reminders
                </h2>
              </div>
              {loading ? (
                <p className="text-dark-400">Loading...</p>
              ) : reminders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-dark-400 mb-4">No reminders set.</p>
                  <button
                    onClick={() => navigate("/products")}
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Create one from product pages →
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder._id}
                      className="flex justify-between items-center p-3 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-600 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-dark-200">
                            {reminder.productId?.name}
                          </p>
                          {reminder.autoOrder && (
                            <span className="px-2 py-0.5 bg-green-600/20 border border-green-600/30 text-green-400 text-xs rounded-full font-medium">
                              🔄 Auto
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-dark-400">
                          Next:{" "}
                          {new Date(
                            reminder.nextReminderDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-dark-400 bg-dark-800 px-3 py-1 rounded-lg">
                        Every {reminder.intervalDays}d
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
                  <p className="text-dark-400">No orders yet.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
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
                        <span
                          className={`inline-block px-3 py-1 text-xs rounded-full border ${
                            order.orderType === "manual"
                              ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                              : "bg-orange-600/20 text-orange-400 border-orange-600/30"
                          }`}
                        >
                          {order.orderType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                  <span className="text-xl">🔧</span>
                  Browse Parts Catalog
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
          </div>

          <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">⭐</span>
              </div>
              <h2 className="text-2xl font-semibold text-dark-200">
                Mechanic Pro Benefits
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-primary-600 text-xl mt-1">💰</span>
                <div>
                  <h3 className="text-dark-200 font-semibold mb-1">
                    Wholesale Pricing
                  </h3>
                  <p className="text-dark-400 text-sm">
                    Exclusive discounted rates on all products
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-600 text-xl mt-1">🔔</span>
                <div>
                  <h3 className="text-dark-200 font-semibold mb-1">
                    Auto Reminders
                  </h3>
                  <p className="text-dark-400 text-sm">
                    Never run out of frequently needed parts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-600 text-xl mt-1">⚡</span>
                <div>
                  <h3 className="text-dark-200 font-semibold mb-1">
                    Priority Support
                  </h3>
                  <p className="text-dark-400 text-sm">
                    Dedicated support and bulk ordering options
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

export default MechanicDashboard;
