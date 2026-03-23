import { createContext, useState } from "react"
import type { User } from "../Types"

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const demoUsers: User[] = [
  {
    id: "u1",
    name: "Demo User",
    email: "user@nestfinder.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    createdAt: "2024-01-01"
  },
  {
    id: "u2",
    name: "Demo Admin",
    email: "admin@nestfinder.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    createdAt: "2024-01-01"
  }
]

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  const login = (email: string, password: string): boolean => {
    const found = demoUsers.find(u => u.email === email)
    if (found && password === "123456") {
      setUser(found)
      localStorage.setItem("user", JSON.stringify(found))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}