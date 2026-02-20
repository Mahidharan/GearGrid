import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(formData);

      // Redirect based on role
      if (user.role === "customer") {
        navigate("/customer-dashboard");
      } else if (user.role === "mechanic") {
        navigate("/mechanic-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-dark-800 border border-dark-700 rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/geargridlogo.png"
              alt="GearGrid"
              className="h-24 w-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold text-dark-200">Welcome Back</h2>
          <p className="text-dark-400 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-dark-200 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-dark-200 placeholder-dark-400 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-dark-200 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-dark-200 placeholder-dark-400 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-900/50 hover:shadow-primary-900/70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-dark-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Sign up
            </Link>
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-dark-400 hover:text-dark-300 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
