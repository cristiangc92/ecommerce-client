import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
  }, [token])

  const loginUser = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", userToken)
  }

  const logoutUser = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}