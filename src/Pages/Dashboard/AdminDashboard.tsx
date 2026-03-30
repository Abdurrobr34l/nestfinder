import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import {
  Home, Users, Building2, BarChart3, Settings,
  LogOut, Menu, ChevronDown, Search, Edit2, Trash2,
  TrendingUp, DollarSign, BookOpen, X, Check,
  Bell, Moon, Sun, ChevronLeft, ChevronRight
} from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { useAuth } from "../../Hooks/useAuth"
import { useTheme } from "../../Context/useTheme"
import { propertyAPI, userAPI, dashboardAPI } from "../../lib/api"
import type { Property, User, DashboardStats } from "../../Types/index"

type AdminPage = "overview" | "properties" | "users" | "analytics" | "settings"

// ─── Static chart data (kept as-is, visual only) ────────────────────
const barData = [
  { month: "Jan", listings: 12 }, { month: "Feb", listings: 19 },
  { month: "Mar", listings: 15 }, { month: "Apr", listings: 28 },
  { month: "May", listings: 24 }, { month: "Jun", listings: 33 },
  { month: "Jul", listings: 29 }, { month: "Aug", listings: 38 },
]
const lineData = [
  { month: "Jan", users: 40 }, { month: "Feb", users: 75 },
  { month: "Mar", users: 110 }, { month: "Apr", users: 160 },
  { month: "May", users: 210 }, { month: "Jun", users: 290 },
  { month: "Jul", users: 370 }, { month: "Aug", users: 450 },
]
const pieData = [
  { name: "Apartment", value: 45 }, { name: "House", value: 30 },
  { name: "Commercial", value: 15 }, { name: "Land", value: 10 },
]
const PIE_COLORS = ["#1D4ED8", "#F59E0B", "#10B981", "#6366F1"]

// ─── Sidebar ─────────────────────────────────────────────────────────
const navItems = [
  { id: "overview",    label: "Overview",    icon: <BarChart3 size={18} /> },
  { id: "properties", label: "Properties",  icon: <Building2 size={18} /> },
  { id: "users",      label: "Users",       icon: <Users size={18} /> },
  { id: "analytics",  label: "Analytics",   icon: <TrendingUp size={18} /> },
  { id: "settings",   label: "Settings",    icon: <Settings size={18} /> },
]

interface SidebarProps {
  activePage: AdminPage
  setActivePage: (p: AdminPage) => void
  setSidebarOpen: (v: boolean) => void
  onLogout: () => void
}

const Sidebar = ({ activePage, setActivePage, setSidebarOpen, onLogout }: SidebarProps) => (
  <div className="flex flex-col h-full">
    <Link to="/" className="flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
        <Home size={16} className="text-white" />
      </div>
      <span className="font-bold text-blue-800 dark:text-blue-400">
        Nest<span className="text-amber-500">Finder</span>
      </span>
      <span className="ml-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 px-1.5 py-0.5 rounded font-medium">Admin</span>
    </Link>
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => { setActivePage(item.id as AdminPage); setSidebarOpen(false) }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
            activePage === item.id ? "bg-blue-800 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {item.icon}{item.label}
        </button>
      ))}
    </nav>
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
        <LogOut size={18} /> Logout
      </button>
    </div>
  </div>
)

// ─── Top Navbar ───────────────────────────────────────────────────────
interface TopNavProps {
  user: { name: string; avatar: string; email: string } | null
  onMenuClick: () => void
  onLogout: () => void
  setActivePage: (p: AdminPage) => void
}

const TopNav = ({ user, onMenuClick, onLogout, setActivePage }: TopNavProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropdownOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <Menu size={20} className="text-gray-600 dark:text-gray-300" />
      </button>
      <div className="hidden lg:block">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Admin Dashboard</span>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="relative" ref={dropRef}>
          <button onClick={() => setDropdownOpen(v => !v)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{user?.name}</span>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 py-2 overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <div className="text-sm font-semibold text-gray-800 dark:text-white">{user?.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</div>
              </div>
              <button onClick={() => { setActivePage("settings"); setDropdownOpen(false) }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Settings size={15} /> Settings
              </button>
              <button onClick={() => { onLogout(); setDropdownOpen(false) }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Overview Page ────────────────────────────────────────────────────
const OverviewPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardAPI.getStats()
        setStats(res.data.data.stats)
      } catch (error) {
        console.error("Failed to fetch stats", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: "Total Users", value: isLoading ? "..." : stats?.totalUsers.toString() || "0", icon: <Users size={20} />, color: "text-blue-800 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Total Listings", value: isLoading ? "..." : stats?.totalProperties.toString() || "0", icon: <Building2 size={20} />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "Total Bookings", value: isLoading ? "..." : stats?.totalBookings.toString() || "0", icon: <BookOpen size={20} />, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
    { label: "Total Reviews", value: isLoading ? "..." : stats?.totalReviews.toString() || "0", icon: <DollarSign size={20} />, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
            <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Monthly Listings</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="listings" fill="#1D4ED8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Property Types</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 shrink-0">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                <span className="text-gray-600 dark:text-gray-300">{d.name}</span>
                <span className="font-semibold text-gray-800 dark:text-white ml-1">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Manage Properties Page ───────────────────────────────────────────
const ManagePropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const ITEMS_PER_PAGE = 5

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        const params: Record<string, string> = {
          page: String(currentPage),
          limit: String(ITEMS_PER_PAGE)
        }
        if (search) params.search = search
        if (filterType !== "all") params.category = filterType
        const res = await propertyAPI.getAll(params)
        setProperties(res.data.data.data)
        setTotal(res.data.data.meta.total)
      } catch (error) {
        console.error("Failed to fetch properties", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProperties()
  }, [currentPage, filterType, search])

  useEffect(() => {
    const timer = setTimeout(() => { setCurrentPage(1) }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await propertyAPI.delete(deleteId)
      setDeleteId(null)
      // fetchProperties()
    } catch (error) {
      console.error("Failed to delete property", error)
    }
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Properties</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or city..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none focus:border-blue-800 dark:focus:border-blue-400"
          />
        </div>
        <select
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setCurrentPage(1) }}
          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none"
        >
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </select>
      </div>

      {deleteId && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center justify-between">
          <span className="text-sm text-red-700 dark:text-red-400">Are you sure you want to delete this property?</span>
          <div className="flex gap-2">
            <button onClick={() => setDeleteId(null)} className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs">
              <X size={14} /> Cancel
            </button>
            <button onClick={handleDelete} className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs">
              <Check size={14} /> Confirm Delete
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">Loading properties...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {["Property", "City", "Type", "Price", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {properties.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <span className="font-medium text-gray-900 dark:text-white truncate max-w-40">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.city}</td>
                    <td className="px-4 py-3 capitalize text-gray-600 dark:text-gray-300">{p.category}</td>
                    <td className="px-4 py-3 font-medium text-blue-800 dark:text-blue-400">৳{p.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                        p.status === "available" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : p.status === "sold" ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/property/${p._id}`} className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition-colors">
                          <Edit2 size={14} />
                        </Link>
                        <button onClick={() => setDeleteId(p._id)} className="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">{total} properties total</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 text-gray-600 dark:text-gray-300">
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${currentPage === page ? "bg-blue-800 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 text-gray-600 dark:text-gray-300">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Manage Users Page ────────────────────────────────────────────────
const ManageUsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const ITEMS_PER_PAGE = 5

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const res = await userAPI.getAll()
        setUsers(res.data.data)
      } catch (error) {
        console.error("Failed to fetch users", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = filterRole === "all" || u.role === filterRole
    return matchSearch && matchRole
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "user" ? "admin" : "user"
    try {
      await userAPI.updateRole(userId, newRole)
      setUsers(prev => prev.map(u => u.id === userId || u._id === userId ? { ...u, role: newRole as "user" | "admin" } : u))
    } catch (error) {
      console.error("Failed to update role", error)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      await userAPI.delete(userId)
      setUsers(prev => prev.filter(u => u.id !== userId && u._id !== userId))
    } catch (error) {
      console.error("Failed to delete user", error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none focus:border-blue-800"
          />
        </div>
        <select
          value={filterRole}
          onChange={e => { setFilterRole(e.target.value); setCurrentPage(1) }}
          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {["User", "Email", "City", "Role", "Joined", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginated.map(u => {
                  const uid = u._id || u.id
                  return (
                    <tr key={uid} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{u.email}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{u.city || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                          u.role === "admin" ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                          : "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRoleChange(uid, u.role)}
                            className="text-xs px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 transition-colors"
                          >
                            {u.role === "user" ? "Make Admin" : "Make User"}
                          </button>
                          <button
                            onClick={() => handleDelete(uid)}
                            className="text-xs px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 text-gray-600 dark:text-gray-300">
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${currentPage === page ? "bg-blue-800 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 text-gray-600 dark:text-gray-300">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Analytics Page ───────────────────────────────────────────────────
const AnalyticsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Avg. Listing Price", value: "৳18,500", sub: "Per month (rent)" },
        { label: "Conversion Rate", value: "4.2%", sub: "Visitors to bookings" },
        { label: "Avg. Rating", value: "4.6 ⭐", sub: "Across all properties" },
      ].map(s => (
        <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-400">{s.value}</div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-1">{s.label}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Monthly Listings vs User Growth</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={barData.map((b, i) => ({ ...b, users: lineData[i].users }))}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip /><Legend />
          <Bar dataKey="listings" fill="#1D4ED8" radius={[4, 4, 0, 0]} name="Listings" />
          <Bar dataKey="users" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Users" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={lineData.map(d => ({ ...d, revenue: d.users * 1500 }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name="Revenue (৳)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Property Type Breakdown</h2>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
)

// ─── Settings Page ────────────────────────────────────────────────────
interface SettingsPageProps {
  user: { name: string; email: string; avatar: string; role: string } | null
}

const SettingsPage = ({ user }: SettingsPageProps) => {
  const { isDark, toggleTheme } = useTheme()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    siteName: "NestFinder",
    contactEmail: "support@nestfinder.com",
  })

  const handleSave = async () => {
    try {
      await userAPI.updateMyProfile({ name: form.name, phone: form.phone })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Failed to save settings", error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      {saved && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <p className="text-sm text-green-600 dark:text-green-400">Settings saved successfully!</p>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user?.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover" />
            <button className="absolute -bottom-1 -right-1 p-1 bg-blue-800 text-white rounded-lg">
              <Edit2 size={12} />
            </button>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">{user?.name}</div>
            <span className="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-600 px-2 py-0.5 rounded-lg capitalize">{user?.role}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ label: "Full Name", key: "name" }, { label: "Email", key: "email" }, { label: "Phone", key: "phone" }].map(f => (
            <div key={f.key}>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{f.label}</label>
              <input
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white text-sm outline-none focus:border-blue-800"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Site Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ label: "Site Name", key: "siteName" }, { label: "Contact Email", key: "contactEmail" }].map(f => (
            <div key={f.key}>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{f.label}</label>
              <input
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white text-sm outline-none focus:border-blue-800"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">Dark Mode</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Toggle site appearance</div>
          </div>
          <button onClick={toggleTheme} className={`relative w-11 h-6 rounded-full transition-colors ${isDark ? "bg-blue-800" : "bg-gray-300"}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDark ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>
      <button onClick={handleSave} className="bg-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-900 transition-colors">
        Save All Settings
      </button>
    </div>
  )
}

// ─── Main AdminDashboard ──────────────────────────────────────────────
const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState<AdminPage>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => { logout(); navigate("/") }

  const renderPage = () => {
    switch (activePage) {
      case "overview":   return <OverviewPage />
      case "properties": return <ManagePropertiesPage />
      case "users":      return <ManageUsersPage />
      case "analytics":  return <AnalyticsPage />
      case "settings":   return <SettingsPage user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <div className="hidden lg:flex w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
        <Sidebar activePage={activePage} setActivePage={setActivePage} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
      </div>
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <Sidebar activePage={activePage} setActivePage={setActivePage} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout} setActivePage={setActivePage} />
        <div className="flex-1 p-6 overflow-auto">{renderPage()}</div>
      </div>
    </div>
  )
}

export default AdminDashboard