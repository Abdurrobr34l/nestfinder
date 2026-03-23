import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { useAuth } from "./Hooks/useAuth"
import { Contact, Home } from "lucide-react"
import Explore from "./Pages/Explore"
import PropertyDetails from "./Pages/PropertyDetails"
import About from "./Pages/About"
import Blog from "./Pages/Blog"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import UserDashboard from "./Pages/Dashboard/UserDashboard"
import AdminDashboard from "./Pages/Dashboard/AdminDashboard"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  return user?.role === "admin" ? <>{children}</> : <Navigate to="/" />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/user" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App