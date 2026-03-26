import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Mail, Lock, Eye, EyeOff, Home, User } from "lucide-react"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }, 1000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Account Created!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Your account has been created successfully.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Redirecting to login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-10">

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

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Join NestFinder and find your perfect property
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full name */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Full Name
              </label>
              <div className={`flex items-center gap-2 border rounded-xl px-3 py-3 bg-white dark:bg-gray-900 focus-within:border-blue-800 dark:focus-within:border-blue-400 transition-colors ${
                errors.name
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}>
                <User size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 bg-transparent text-gray-800 dark:text-white text-sm outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Email Address
              </label>
              <div className={`flex items-center gap-2 border rounded-xl px-3 py-3 bg-white dark:bg-gray-900 focus-within:border-blue-800 dark:focus-within:border-blue-400 transition-colors ${
                errors.email
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}>
                <Mail size={18} className="text-gray-400 shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 bg-transparent text-gray-800 dark:text-white text-sm outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Password
              </label>
              <div className={`flex items-center gap-2 border rounded-xl px-3 py-3 bg-white dark:bg-gray-900 focus-within:border-blue-800 dark:focus-within:border-blue-400 transition-colors ${
                errors.password
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}>
                <Lock size={18} className="text-gray-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
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
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                Confirm Password
              </label>
              <div className={`flex items-center gap-2 border rounded-xl px-3 py-3 bg-white dark:bg-gray-900 focus-within:border-blue-800 dark:focus-within:border-blue-400 transition-colors ${
                errors.confirmPassword
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}>
                <Lock size={18} className="text-gray-400 shrink-0" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="flex-1 bg-transparent text-gray-800 dark:text-white text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-800 text-white py-3 rounded-xl font-medium hover:bg-blue-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-800 dark:text-blue-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>

        {/* Back to home */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          <Link to="/" className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors">
            Back to Home
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register