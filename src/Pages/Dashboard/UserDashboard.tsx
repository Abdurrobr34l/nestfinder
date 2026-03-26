import { useState } from "react"
import { Link, useNavigate } from "react-router"
import {
  Home, User, BookOpen, Star, LogOut,
  Menu, Edit, Save, Camera
} from "lucide-react"
import { useAuth } from "../../Hooks/useAuth"
import { properties } from "../../Data/properties"
import { reviews } from "../../Data/reviews"

type ActivePage = "overview" | "profile" | "bookings" | "reviews"

// ─── Types for props ───────────────────────────────────────────────
interface SidebarProps {
  activePage: ActivePage
  setActivePage: (page: ActivePage) => void
  setSidebarOpen: (open: boolean) => void
  onLogout: () => void
}

interface OverviewPageProps {
  userName: string
  userAvatar: string
  reviewCount: number
}

interface ProfilePageProps {
  user: { name: string; email: string; avatar: string; role: string } | null
  isEditing: boolean
  setIsEditing: (v: boolean) => void
  profileData: { name: string; email: string; phone: string; city: string; bio: string }
  setProfileData: (v: ProfilePageProps["profileData"]) => void
  onSave: () => void
  saveSuccess: boolean
}

// ─── Sidebar (outside UserDashboard) ───────────────────────────────
const navItems = [
  { id: "overview", label: "Overview", icon: <Home size={18} /> },
  { id: "profile", label: "My Profile", icon: <User size={18} /> },
  { id: "bookings", label: "My Bookings", icon: <BookOpen size={18} /> },
  { id: "reviews", label: "My Reviews", icon: <Star size={18} /> },
]

const Sidebar = ({ activePage, setActivePage, setSidebarOpen, onLogout }: SidebarProps) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <Link
      to="/"
      className="flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
        <Home size={16} className="text-white" />
      </div>
      <span className="font-bold text-blue-800 dark:text-blue-400">
        Nest<span className="text-amber-500">Finder</span>
      </span>
    </Link>

    {/* Nav */}
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => {
            setActivePage(item.id as ActivePage)
            setSidebarOpen(false)
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
            activePage === item.id
              ? "bg-blue-800 text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>

    {/* Logout */}
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  </div>
)

// ─── Overview Page ──────────────────────────────────────────────────
const OverviewPage = ({ userName, reviewCount }: OverviewPageProps) => {
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 3)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back, {userName}!
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Saved Properties", value: "5", colorClass: "text-blue-800 dark:text-blue-400" },
          { label: "Tour Bookings", value: "2", colorClass: "text-amber-700 dark:text-amber-400" },
          { label: "Reviews Given", value: reviewCount.toString(), colorClass: "text-green-700 dark:text-green-400" },
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700"
          >
            <div className={`text-3xl font-bold mb-1 ${stat.colorClass}`}>{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent properties */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Featured Properties
        </h2>
        <div className="space-y-3">
          {featuredProperties.map(p => (
            <Link
              key={p.id}
              to={`/property/${p.id}`}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-800 dark:hover:border-blue-400 transition-colors"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {p.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{p.city}</div>
              </div>
              <div className="text-blue-800 dark:text-blue-400 font-semibold text-sm shrink-0">
                ৳{p.price.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Profile Page ───────────────────────────────────────────────────
const ProfilePage = ({
  user,
  isEditing,
  setIsEditing,
  profileData,
  setProfileData,
  onSave,
  saveSuccess,
}: ProfilePageProps) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-900 transition-colors"
        >
          <Edit size={16} />
          Edit Profile
        </button>
      ) : (
        <button
          onClick={onSave}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-700 transition-colors"
        >
          <Save size={16} />
          Save Changes
        </button>
      )}
    </div>

    {saveSuccess && (
      <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm text-green-600 dark:text-green-400">Profile updated successfully!</p>
      </div>
    )}

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          {isEditing && (
            <button className="absolute -bottom-2 -right-2 p-1.5 bg-blue-800 text-white rounded-lg">
              <Camera size={14} />
            </button>
          )}
        </div>
        <div>
          <div className="font-bold text-gray-900 dark:text-white text-lg">{user?.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
          <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-0.5 rounded-lg capitalize">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            { label: "Full Name", key: "name", type: "text" },
            { label: "Email", key: "email", type: "email" },
            { label: "Phone", key: "phone", type: "text" },
            { label: "City", key: "city", type: "text" },
          ] as const
        ).map(field => (
          <div key={field.key}>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
              {field.label}
            </label>
            {isEditing ? (
              <input
                type={field.type}
                value={profileData[field.key]}
                onChange={e =>
                  setProfileData({ ...profileData, [field.key]: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white text-sm outline-none focus:border-blue-800 dark:focus:border-blue-400"
              />
            ) : (
              <div className="text-sm font-medium text-gray-900 dark:text-white py-2">
                {profileData[field.key]}
              </div>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Bio</label>
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white text-sm outline-none resize-none focus:border-blue-800 dark:focus:border-blue-400"
            />
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300 py-2">{profileData.bio}</div>
          )}
        </div>
      </div>
    </div>
  </div>
)

// ─── Bookings Page ──────────────────────────────────────────────────
const BookingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your tour bookings will appear here
        </p>
      </div>
      {[0, 1].map(i => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
        >
          <img
            src={properties[i].images[0]}
            alt=""
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
              {properties[i].title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{properties[i].city}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Scheduled: 2024-04-{10 + i + 1}
            </div>
          </div>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-lg ${
              i === 0
                ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
            }`}
          >
            {i === 0 ? "Confirmed" : "Pending"}
          </span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Reviews Page ───────────────────────────────────────────────────
interface ReviewsPageProps {
  userId: string
}

const ReviewsPage = ({ userId }: ReviewsPageProps) => {
  const userReviews = reviews.filter(r => r.userId === userId)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
      {userReviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-4xl mb-3">⭐</div>
          <p className="text-gray-500 dark:text-gray-400">You haven't written any reviews yet</p>
          <Link
            to="/explore"
            className="inline-block mt-4 bg-blue-800 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-900 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userReviews.map(review => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5"
            >
              <div className="flex items-center gap-1 mb-2">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{review.comment}</p>
              <div className="text-xs text-gray-400 dark:text-gray-500">{review.createdAt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main UserDashboard ─────────────────────────────────────────────
const UserDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState<ActivePage>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+880 1700-000000",
    city: "Dhaka",
    bio: "Looking for a great property in Bangladesh.",
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const userReviews = reviews.filter(r => r.userId === user?.id)

  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return (
          <OverviewPage
            userName={user?.name || ""}
            userAvatar={user?.avatar || ""}
            reviewCount={userReviews.length}
          />
        )
      case "profile":
        return (
          <ProfilePage
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            profileData={profileData}
            setProfileData={setProfileData}
            onSave={handleSaveProfile}
            saveSuccess={saveSuccess}
          />
        )
      case "bookings":
        return <BookingsPage />
      case "reviews":
        return <ReviewsPage userId={user?.id || ""} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <Sidebar
              activePage={activePage}
              setActivePage={setActivePage}
              setSidebarOpen={setSidebarOpen}
              onLogout={handleLogout}
            />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top navbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <div className="hidden lg:block">
            <span className="text-sm text-gray-500 dark:text-gray-400">User Dashboard</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
              {user?.name}
            </span>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">{renderPage()}</div>
      </div>
    </div>
  )
}

export default UserDashboard