import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import productService from "../services/productService";
import Navbar from "../components/Navbar";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth check to complete before redirecting
    if (authLoading) return;

    // Redirect to login if user is not authenticated
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [user, authLoading, navigate]);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (product) => {
    if (user && user.role === "mechanic") {
      return product.mechanicPrice;
    }
    return product.retailPrice;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  if (loading)
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            {/* Modern spinner */}
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
              Loading Products
            </p>
            <p className="text-dark-400 text-sm">Please wait...</p>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl font-bold text-red-400">Error</h2>
            </div>
            <p className="text-dark-200 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-dark-200 mb-8">
            Our Products
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 text-dark-200 placeholder-dark-400 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-dark-800 border border-dark-700 text-dark-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent md:w-64"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-dark-800">
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-dark-800 rounded-xl shadow-xl border border-dark-700 hover:border-primary-600 transition-all cursor-pointer overflow-hidden group"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-dark-200 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-dark-400 mb-3">
                    {product.category}
                  </p>
                  <p className="text-2xl font-bold text-primary-600 mb-2">
                    ${getPrice(product).toFixed(2)}
                  </p>
                  {user && user.role === "mechanic" && (
                    <span className="inline-block px-3 py-1 bg-orange-600/20 text-orange-400 border border-orange-600/30 text-xs rounded-full mb-2">
                      Mechanic Price
                    </span>
                  )}
                  <p className="text-sm text-dark-400">
                    Stock:{" "}
                    <span
                      className={`font-semibold ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {product.stock}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-dark-400 text-xl">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
