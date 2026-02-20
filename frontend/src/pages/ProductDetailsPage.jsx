import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import productService from "../services/productService";
import orderService from "../services/orderService";
import reminderService from "../services/reminderService";
import Navbar from "../components/Navbar";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState("");

  // Reminder form state
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderData, setReminderData] = useState({
    quantity: 1,
    intervalDays: 30,
    autoOrder: false,
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const getPrice = () => {
    if (user && user.role === "mechanic") {
      return product.mechanicPrice;
    }
    return product.retailPrice;
  };

  const handleOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setOrderLoading(true);
    setError("");
    setOrderSuccess("");

    try {
      await orderService.createOrder({
        productId: product._id,
        quantity,
        orderType: "manual",
      });
      setOrderSuccess("Order placed successfully!");
      setQuantity(1);

      // Refresh product to update stock
      fetchProduct();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  const handleCreateReminder = async () => {
    if (!user || user.role !== "mechanic") {
      return;
    }

    try {
      await reminderService.createReminder({
        productId: product._id,
        quantity: reminderData.quantity,
        intervalDays: reminderData.intervalDays,
        autoOrder: reminderData.autoOrder,
      });
      setShowReminderForm(false);
      setOrderSuccess(
        reminderData.autoOrder
          ? "Auto-order reminder created successfully! Orders will be placed automatically."
          : "Reminder created successfully!",
      );
      setReminderData({ quantity: 1, intervalDays: 30, autoOrder: false });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create reminder");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-dark-900 text-xl text-dark-200">
        Loading product...
      </div>
    );
  if (error && !product)
    return (
      <div className="flex justify-center items-center h-screen bg-dark-900 text-xl text-red-400">
        {error}
      </div>
    );
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen bg-dark-900 text-xl text-red-400">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            className="mb-6 text-primary-600 hover:text-primary-500 font-medium flex items-center"
            onClick={() => navigate("/products")}
          >
            ← Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl p-8">
            <div className="flex items-center justify-center">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/30 to-transparent rounded-lg"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-dark-200 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-dark-400">{product.category}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-4xl font-bold text-primary-600">
                  ${getPrice().toFixed(2)}
                </p>
                {user && user.role === "mechanic" && (
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-400 border border-orange-600/30 text-sm rounded-full">
                    Mechanic Price
                  </span>
                )}
              </div>

              <p
                className={`text-lg font-medium ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {product.stock > 0
                  ? `In Stock: ${product.stock} units`
                  : "Out of Stock"}
              </p>

              <p className="text-dark-300 leading-relaxed">
                {product.description}
              </p>

              {orderSuccess && (
                <div className="bg-green-600/20 border border-green-600/30 text-green-400 px-4 py-3 rounded-lg">
                  {orderSuccess}
                </div>
              )}
              {error && (
                <div className="bg-red-600/20 border border-red-600/30 text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-dark-200 font-medium">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-24 px-4 py-2 bg-dark-900 border border-dark-700 text-dark-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleOrder}
                  disabled={orderLoading || product.stock === 0}
                  className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-900/50 hover:shadow-primary-900/70"
                >
                  {orderLoading ? "Processing..." : "Order Now"}
                </button>
              </div>

              {user && user.role === "mechanic" && (
                <div className="border-t border-dark-700 pt-6">
                  {!showReminderForm ? (
                    <button
                      onClick={() => setShowReminderForm(true)}
                      className="w-full py-3 px-6 border-2 border-primary-600 text-primary-600 hover:bg-primary-600/10 font-semibold rounded-lg transition-all"
                    >
                      Set Restock Reminder
                    </button>
                  ) : (
                    <div className="bg-dark-900 p-6 rounded-lg space-y-4 border border-dark-700">
                      <h3 className="text-xl font-semibold text-dark-200">
                        Create Restock Reminder
                      </h3>

                      <div>
                        <label className="block text-dark-200 font-medium mb-2">
                          Quantity:
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={reminderData.quantity}
                          onChange={(e) =>
                            setReminderData({
                              ...reminderData,
                              quantity: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-900 border border-dark-700 text-dark-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-dark-200 font-medium mb-2">
                          Interval (days):
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={reminderData.intervalDays}
                          onChange={(e) =>
                            setReminderData({
                              ...reminderData,
                              intervalDays: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-900 border border-dark-700 text-dark-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        />
                      </div>

                      <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reminderData.autoOrder}
                            onChange={(e) =>
                              setReminderData({
                                ...reminderData,
                                autoOrder: e.target.checked,
                              })
                            }
                            className="w-5 h-5 mt-0.5 bg-dark-900 border-2 border-dark-600 rounded focus:ring-2 focus:ring-primary-600 text-primary-600"
                          />
                          <div className="flex-1">
                            <span className="block text-dark-200 font-semibold mb-1">
                              Enable Automatic Ordering
                            </span>
                            <p className="text-sm text-dark-400 leading-relaxed">
                              Orders will be placed automatically every{" "}
                              {reminderData.intervalDays} days. You'll receive
                              notifications for each automatic order.
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={handleCreateReminder}
                          className="flex-1 py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-900/50"
                        >
                          Create Reminder
                        </button>
                        <button
                          onClick={() => setShowReminderForm(false)}
                          className="flex-1 py-2 px-4 border-2 border-dark-700 text-dark-300 hover:bg-dark-800 font-semibold rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
