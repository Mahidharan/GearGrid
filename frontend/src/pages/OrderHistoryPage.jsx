import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import orderService from "../services/orderService";
import Navbar from "../components/Navbar";

const OrderHistoryPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, manual, reminder

  useEffect(() => {
    // Wait for auth check to complete
    if (authLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getUserOrders(user._id);
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.orderType === filter;
  });

  const getTotalSpent = () => {
    return orders.reduce((total, order) => {
      const price =
        user.role === "mechanic"
          ? order.productId?.mechanicPrice || 0
          : order.productId?.retailPrice || 0;
      return total + price * order.quantity;
    }, 0);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            {/* Modern spinner matching ProductListPage */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-600 via-primary-500 to-blue-400 opacity-20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-4 border-dark-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-600 animate-spin"></div>
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 shadow-lg shadow-primary-600/50 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "2s",
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-dark-200 font-semibold text-lg">
              Loading Orders
            </p>
            <p className="text-dark-400 text-sm">Please wait...</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-dark-200 mb-6">
            Order History
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark-800 p-6 rounded-xl shadow-xl border border-dark-700 text-center hover:border-primary-600 transition-all">
              <h3 className="text-3xl font-bold text-purple-400 mb-2">
                {orders.length}
              </h3>
              <p className="text-dark-400">Total Orders</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-xl shadow-xl border border-dark-700 text-center hover:border-primary-600 transition-all">
              <h3 className="text-3xl font-bold text-green-400 mb-2">
                ${getTotalSpent().toFixed(2)}
              </h3>
              <p className="text-dark-400">Total Spent</p>
            </div>
            {user.role === "mechanic" && (
              <div className="bg-dark-800 p-6 rounded-xl shadow-xl border border-dark-700 text-center hover:border-primary-600 transition-all">
                <h3 className="text-3xl font-bold text-indigo-400 mb-2">
                  {orders.filter((o) => o.orderType === "reminder").length}
                </h3>
                <p className="text-dark-400">Reminder Orders</p>
              </div>
            )}
          </div>

          <div className="bg-dark-800 p-4 rounded-xl shadow-xl border border-dark-700 mb-6 flex items-center gap-4">
            <label className="font-semibold text-dark-200">Filter by:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-dark-900 border border-dark-700 text-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="all" className="bg-dark-900">
                All Orders
              </option>
              <option value="manual" className="bg-dark-900">
                Manual Orders
              </option>
              <option value="reminder" className="bg-dark-900">
                Reminder Orders
              </option>
            </select>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-dark-800 p-12 rounded-xl shadow-xl border border-dark-700 text-center">
              <p className="text-dark-400 text-lg mb-4">No orders found.</p>
              <button
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-900/50"
                onClick={() => navigate("/products")}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="bg-dark-800 rounded-xl shadow-xl border border-dark-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-900 border-b-2 border-dark-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-dark-200 font-semibold">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-dark-200 font-semibold">
                        Order Date
                      </th>
                      <th className="px-6 py-4 text-left text-dark-200 font-semibold">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-dark-200 font-semibold">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-dark-200 font-semibold">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-dark-200 font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-dark-200 font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700">
                    {filteredOrders.map((order) => {
                      const price =
                        user.role === "mechanic"
                          ? order.productId?.mechanicPrice || 0
                          : order.productId?.retailPrice || 0;
                      const total = price * order.quantity;

                      return (
                        <tr
                          key={order._id}
                          className="hover:bg-dark-900 transition"
                        >
                          <td className="px-6 py-4">
                            <strong className="text-dark-200">
                              {order.productId?.name || "Product Unavailable"}
                            </strong>
                          </td>
                          <td className="px-6 py-4 text-dark-400">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-dark-400">
                            {order.quantity}
                          </td>
                          <td className="px-6 py-4 text-dark-400">
                            ${price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                                order.orderType === "manual"
                                  ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                                  : "bg-orange-600/20 text-orange-400 border-orange-600/30"
                              }`}
                            >
                              {order.orderType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-600/20 text-green-400 border border-green-600/30">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-primary-600">
                            ${total.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
