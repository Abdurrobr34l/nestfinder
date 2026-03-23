import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Menu, X, Sun, Moon, Home, Search, Info, Phone, BookOpen, User, LogOut, LayoutDashboard } from "lucide-react"
import { useTheme } from "../../Context/useTheme"
import { useAuth } from "../../Hooks/useAuth"

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate("/")
  }

  const navLinks = [
    { label: "Home", path: "/", icon: <Home size={16} /> },
    { label: "Explore", path: "/explore", icon: <Search size={16} /> },
    { label: "About", path: "/about", icon: <Info size={16} /> },
    { label: "Contact", path: "/contact", icon: <Phone size={16} /> },
    { label: "Blog", path: "/blog", icon: <BookOpen size={16} /> },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-blue-800 dark:text-blue-400">
              Nest<span className="text-amber-500">Finder</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Not logged in */}
            {!isAuthenticated && (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Logged in — profile dropdown */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <Link
                      to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/user"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-800 text-white rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar