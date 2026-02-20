import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navbar */}
      <nav className="bg-dark-900 border-b border-dark-700 py-3 sm:py-4 shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-dark-900/95">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/geargridlogo.png"
                alt="GearGrid"
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/login"
                className="text-dark-200 hover:text-primary-600 transition-colors px-3 sm:px-6 py-2 font-semibold text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold shadow-lg shadow-primary-900/50 hover:shadow-xl hover:shadow-primary-900/60 transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Get Started Free</span>
                <span className="sm:hidden">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 text-white py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-600/20 border border-primary-600/30 rounded-full text-primary-400 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">Trusted by 5,000+ Mechanics & Car Enthusiasts</span>
              <span className="sm:hidden">5,000+ Happy Customers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 text-dark-100 leading-tight px-2">
              Premium Auto Parts{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                Delivered Fast
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-dark-300 max-w-3xl mx-auto leading-relaxed px-4">
              Get wholesale pricing as a mechanic or retail prices as a
              customer. Quality parts, competitive pricing, and lightning-fast
              delivery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0 gap-0 sm:gap-4 mb-6 sm:mb-8 px-4">
              <Link
                to="/register"
                className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all font-bold text-base sm:text-lg shadow-2xl shadow-primary-900/50 hover:shadow-primary-900/70 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span>Start Shopping Now</span>
                <span className="text-xl sm:text-2xl">→</span>
              </Link>
              <Link
                to="/login"
                className="px-8 sm:px-10 py-4 sm:py-5 bg-dark-800 border-2 border-dark-600 text-dark-200 rounded-xl hover:border-primary-600 hover:bg-dark-700 transition-all font-bold text-base sm:text-lg"
              >
                Sign In
              </Link>
            </div>
            <p className="text-dark-400 text-xs sm:text-sm px-4">
              ✓ No credit card required • ✓ Free account • ✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 text-center hover:border-primary-600/50 transition-all group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-500 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                10K+
              </div>
              <p className="text-dark-300 font-semibold text-sm sm:text-base md:text-lg">
                Quality Parts
              </p>
              <p className="text-dark-500 text-xs sm:text-sm mt-1">In Stock</p>
            </div>
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 text-center hover:border-green-600/50 transition-all group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                5K+
              </div>
              <p className="text-dark-300 font-semibold text-sm sm:text-base md:text-lg">
                Happy Clients
              </p>
              <p className="text-dark-500 text-xs sm:text-sm mt-1">And Growing</p>
            </div>
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 text-center hover:border-orange-600/50 transition-all group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <p className="text-dark-300 font-semibold text-sm sm:text-base md:text-lg">Support</p>
              <p className="text-dark-500 text-xs sm:text-sm mt-1">Always Available</p>
            </div>
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 text-center hover:border-purple-600/50 transition-all group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                99.8%
              </div>
              <p className="text-dark-300 font-semibold text-sm sm:text-base md:text-lg">
                Satisfaction
              </p>
              <p className="text-dark-500 text-xs sm:text-sm mt-1">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-100 mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-400">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="relative">
              <div className="bg-dark-800 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-primary-600 transition-all text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl sm:text-4xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark-100 mb-3 sm:mb-4">
                  Create Account
                </h3>
                <p className="text-dark-400 leading-relaxed text-sm sm:text-base md:text-lg">
                  Sign up as a customer or mechanic. Choose wholesale or retail
                  pricing options.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-1 bg-gradient-to-r from-primary-600 to-purple-600"></div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-dark-800 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-primary-600 transition-all text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl sm:text-4xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark-100 mb-3 sm:mb-4">
                  Browse Parts
                </h3>
                <p className="text-dark-400 leading-relaxed text-sm sm:text-base md:text-lg">
                  Search thousands of quality auto parts with advanced filters
                  and instant search.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
              </div>
            </div>
            <div className="bg-dark-800 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-primary-600 transition-all text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl sm:text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark-100 mb-3 sm:mb-4">
                Order & Deliver
              </h3>
              <p className="text-dark-400 leading-relaxed text-sm sm:text-base md:text-lg">
                Place your order and get fast delivery. Track shipments in
                real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-100 mb-3 sm:mb-4">
              Why Choose GearGrid?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-400">
              Built for professionals, designed for everyone
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-primary-600 transition-all group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary-600/20 transition-all shadow-lg">
                <span className="text-4xl sm:text-5xl">💼</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark-100 mb-3 sm:mb-4">
                Wholesale for Mechanics
              </h3>
              <p className="text-dark-400 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                Exclusive wholesale pricing, automated restock reminders, and
                bulk ordering options.
              </p>
              <ul className="space-y-2 text-dark-400 text-sm sm:text-base">
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span> Up to 40% off
                  retail
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span> Auto restock
                  alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span> Priority shipping
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-green-600 transition-all group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-green-600/20 transition-all shadow-lg">
                <span className="text-4xl sm:text-5xl">🛒</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark-100 mb-3 sm:mb-4">
                Retail for Everyone
              </h3>
              <p className="text-dark-400 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                High-quality parts at competitive prices with fast delivery and
                easy returns.
              </p>
              <ul className="space-y-2 text-dark-400 text-sm sm:text-base">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Competitive pricing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> 30-day returns
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Free shipping over
                  $50
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-dark-800 to-dark-800/50 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-purple-600 transition-all group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-purple-600/20 transition-all shadow-lg">
                <span className="text-4xl sm:text-5xl">📦</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark-100 mb-3 sm:mb-4">
                Massive Inventory
              </h3>
              <p className="text-dark-400 leading-relaxed text-sm sm:text-base md:text-lg mb-4">
                Thousands of genuine parts for all makes and models, always in
                stock.
              </p>
              <ul className="space-y-2 text-dark-400 text-sm sm:text-base">
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span> OEM & aftermarket
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span> All car brands
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span> Quality guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-100 mb-3 sm:mb-4">
              Loved by Thousands
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-400">
              See what our customers have to say
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-dark-800 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-primary-600/50 transition-all">
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                <span className="text-yellow-400 text-xl sm:text-2xl">★★★★★</span>
              </div>
              <p className="text-dark-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed italic">
                "Best auto parts supplier I've worked with. Wholesale pricing
                saves my shop thousands every month!"
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  M
                </div>
                <div>
                  <p className="text-dark-100 font-bold text-sm sm:text-base">Vikash</p>
                  <p className="text-dark-500 text-xs sm:text-sm">Professional Mechanic</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-primary-600/50 transition-all">
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                <span className="text-yellow-400 text-xl sm:text-2xl">★★★★★</span>
              </div>
              <p className="text-dark-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed italic">
                "Fast shipping, great prices, and quality parts. Fixed my car
                myself thanks to GearGrid!"
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  S
                </div>
                <div>
                  <p className="text-dark-100 font-bold text-sm sm:text-base">Mathan Kumar</p>
                  <p className="text-dark-500 text-xs sm:text-sm">Car Enthusiast</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-dark-700 hover:border-primary-600/50 transition-all">
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                <span className="text-yellow-400 text-xl sm:text-2xl">★★★★★</span>
              </div>
              <p className="text-dark-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed italic">
                "The restock reminder feature is a game-changer. Never run out
                of essential parts anymore!"
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  D
                </div>
                <div>
                  <p className="text-dark-100 font-bold text-sm sm:text-base">Kandasamy</p>
                  <p className="text-dark-500 text-xs sm:text-sm">Auto Shop Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="bg-gradient-to-br from-primary-600/20 to-purple-600/20 border border-primary-600/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl backdrop-blur-sm">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-100 mb-4 sm:mb-6 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-dark-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4">
              Join thousands of satisfied customers and mechanics today. Start
              saving on quality auto parts right now!
            </p>
            <div className="flex justify-center gap-4 flex-wrap mb-4 sm:mb-6 px-4">
              <Link
                to="/register"
                className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all font-bold text-base sm:text-lg md:text-xl shadow-2xl shadow-primary-900/50 hover:shadow-primary-900/70 transform hover:-translate-y-1 flex items-center gap-3"
              >
                <span>Create Free Account</span>
                <span>→</span>
              </Link>
            </div>
            <p className="text-dark-400 text-xs sm:text-sm">
              No credit card required • Free forever • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 text-dark-400 py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="mb-4 sm:mb-6">
              <img
                src="/geargridlogo.png"
                alt="GearGrid"
                className="h-12 sm:h-14 md:h-16 w-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 text-xs sm:text-sm">
              <Link
                to="/login"
                className="hover:text-primary-600 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-primary-600 transition-colors font-medium"
              >
                Register
              </Link>
              <span className="hover:text-primary-600 transition-colors cursor-pointer font-medium">
                Support
              </span>
              <span className="hover:text-primary-600 transition-colors cursor-pointer font-medium">
                About
              </span>
            </div>
            <div className="text-center space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm text-dark-500">
                &copy; 2026 GearGrid. All rights reserved.
              </p>
              <p className="text-xs text-dark-600">
                Built for mechanics and car enthusiasts worldwide.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                <span className="text-dark-600">Built by</span>
                <span className="text-primary-500 font-semibold">Jeevanantham</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
