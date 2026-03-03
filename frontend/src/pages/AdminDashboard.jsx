import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import adminService from "../services/adminService";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // users or products
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    retailPrice: "",
    mechanicPrice: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      const [usersData, productsData] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllProducts(),
      ]);
      setUsers(usersData);
      setProducts(productsData);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await adminService.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await adminService.deleteProduct(productId);
      setProducts(products.filter((p) => p._id !== productId));
      alert("Product deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...newProduct,
        retailPrice: parseFloat(newProduct.retailPrice),
        mechanicPrice: parseFloat(newProduct.mechanicPrice),
        stock: parseInt(newProduct.stock) || 0,
      };

      const addedProduct = await adminService.addProduct(productData);
      setProducts([...products, addedProduct]);
      setShowAddProduct(false);
      setNewProduct({
        name: "",
        description: "",
        retailPrice: "",
        mechanicPrice: "",
        category: "",
        brand: "",
        stock: "",
        image: "",
      });
      alert("Product added successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-dark-200 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-dark-200 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-dark-400 text-lg">Manage users and products</p>
            </div>
            <span className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium shadow-lg">
              Admin Account
            </span>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Total Users
                  </p>
                  <h3 className="text-3xl font-bold text-dark-200">
                    {users.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-primary-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl shadow-xl p-6 border border-dark-700 hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium mb-1">
                    Total Products
                  </p>
                  <h3 className="text-3xl font-bold text-dark-200">
                    {products.length}
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
                    Low Stock Items
                  </p>
                  <h3 className="text-3xl font-bold text-dark-200">
                    {products.filter((p) => p.stock < 10).length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-primary-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-dark-700">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("users")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "users"
                      ? "border-primary-500 text-primary-500"
                      : "border-transparent text-dark-400 hover:text-dark-200 hover:border-dark-500"
                  }`}
                >
                  Users ({users.length})
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "products"
                      ? "border-primary-500 text-primary-500"
                      : "border-transparent text-dark-400 hover:text-dark-200 hover:border-dark-500"
                  }`}
                >
                  Products ({products.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-dark-800 rounded-xl shadow-xl border border-dark-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-dark-700">
                <h2 className="text-xl font-semibold text-dark-200">
                  User Management
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-dark-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-200">
                          {u.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-200">
                          {u.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              u.role === "admin"
                                ? "bg-red-600/20 text-red-400"
                                : u.role === "mechanic"
                                  ? "bg-blue-600/20 text-blue-400"
                                  : "bg-green-600/20 text-green-400"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              u.isVerified
                                ? "bg-green-600/20 text-green-400"
                                : "bg-yellow-600/20 text-yellow-400"
                            }`}
                          >
                            {u.isVerified ? "Verified" : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            disabled={u._id === user._id}
                            className={`text-red-400 hover:text-red-300 font-medium transition-colors ${
                              u._id === user._id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  {showAddProduct ? "Cancel" : "+ Add Product"}
                </button>
              </div>

              {/* Add Product Form */}
              {showAddProduct && (
                <div className="bg-dark-800 rounded-xl shadow-xl border border-dark-700 p-6 mb-6">
                  <h2 className="text-xl font-semibold text-dark-200 mb-4">
                    Add New Product
                  </h2>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Brand *
                        </label>
                        <input
                          type="text"
                          required
                          value={newProduct.brand}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              brand: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Retail Price *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newProduct.retailPrice}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              retailPrice: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Mechanic Price *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newProduct.mechanicPrice}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              mechanicPrice: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Stock
                        </label>
                        <input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Category *
                        </label>
                        <input
                          type="text"
                          required
                          value={newProduct.category}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={newProduct.image}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              image: e.target.value,
                            })
                          }
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-dark-300 mb-1">
                          Description *
                        </label>
                        <textarea
                          required
                          rows="3"
                          value={newProduct.description}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products List */}
              <div className="bg-dark-800 rounded-xl shadow-xl border border-dark-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-dark-700">
                  <h2 className="text-xl font-semibold text-dark-200">
                    Product Management
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-300 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-dark-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-dark-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-dark-200">
                                  {product.name}
                                </div>
                                <div className="text-xs text-dark-400">
                                  {product.brand}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-200">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-200">
                            <div className="flex flex-col">
                              <span className="text-green-400">
                                ₹{product.retailPrice?.toLocaleString()}
                              </span>
                              <span className="text-xs text-dark-400">
                                M: ₹{product.mechanicPrice?.toLocaleString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                product.stock < 10
                                  ? "bg-red-600/20 text-red-400"
                                  : product.stock < 50
                                    ? "bg-yellow-600/20 text-yellow-400"
                                    : "bg-green-600/20 text-green-400"
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="text-red-400 hover:text-red-300 font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
