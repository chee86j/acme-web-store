import React, { createContext, useContext, useEffect, useState } from "react"

// Create theme context
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("classic")
  const [mounted, setMounted] = useState(false)

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("acme-theme") || "classic"
    setTheme(saved)
    document.documentElement.setAttribute("data-theme", saved)
    setMounted(true)
  }, [])

  // Update theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "classic" ? "modern" : "classic"
    setTheme(newTheme)
    localStorage.setItem("acme-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  // Prevent hydration mismatch
  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
