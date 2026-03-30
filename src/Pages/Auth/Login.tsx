import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Home } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: "user" | "admin") => {
    const credentials = {
      user: { email: "user@nestfinder.com", password: "123456" },
      admin: { email: "admin@nestfinder.com", password: "123456" },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 bg-blue-800 rounded-xl flex items-center justify-center">
            <Home size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-800 dark:text-blue-400">
            Nest<span className="text-amber-500">Finder</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Welcome back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Sign in to your NestFinder account
          </p>

          {/* Demo login buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleDemoLogin("user")}
              className="flex-1 py-2 rounded-xl border border-blue-800 text-blue-800 dark:text-blue-400 dark:border-blue-400 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Demo User
            </button>
            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 py-2 rounded-xl border border-amber-500 text-amber-600 dark:text-amber-400 text-sm font-medium hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              Demo Admin
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              or sign in manually
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Email Address
              </label>
              <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-3 bg-white dark:bg-gray-900 focus-within:border-blue-800 dark:focus-within:border-blue-400 transition-colors">
                <Mail size={18} className="text-gray-400 shrink-0" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-gray-800 dark:text-white text-sm outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Password
              </label>
              <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-3 bg-white dark:bg-gray-900 focus-within:border-blue-800 dark:focus-within:border-blue-400 transition-colors">
                <Lock size={18} className="text-gray-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-gray-800 dark:text-white text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-800 text-white py-3 rounded-xl font-medium hover:bg-blue-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-800 dark:text-blue-400 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          <Link
            to="/"
            className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
          >
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
