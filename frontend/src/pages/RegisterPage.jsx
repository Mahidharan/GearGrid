import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const user = await register(registerData);

      // Redirect based on role
      if (user.role === "customer") {
        navigate("/customer-dashboard");
      } else if (user.role === "mechanic") {
        navigate("/mechanic-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          <h2 className="text-2xl font-semibold text-dark-200">
            Create Account
          </h2>
          <p className="text-dark-400 mt-2">
            Join thousands of satisfied users
          </p>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-dark-200 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-dark-200 placeholder-dark-400 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>

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
              minLength="6"
              className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-dark-200 placeholder-dark-400 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-dark-200 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-dark-200 placeholder-dark-400 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-dark-200 mb-2"
            >
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-dark-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            >
              <option value="customer" className="bg-dark-900">
                Customer - Retail Pricing
              </option>
              <option value="mechanic" className="bg-dark-900">
                Mechanic - Wholesale Pricing
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-900/50 hover:shadow-primary-900/70"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-dark-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Sign in
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

export default RegisterPage;
