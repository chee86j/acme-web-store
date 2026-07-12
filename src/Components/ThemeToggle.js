import React from "react"
import { useTheme } from "../context/ThemeContext"

/**
 * ThemeToggle Component
 * 
 * Renders a button to toggle between Classic and Modern themes.
 * - Classic: Vibrant, energetic (cyan/lime/orange)
 * - Modern: Professional, minimal (slate/indigo/emerald)
 * 
 * Features:
 * - Persists theme choice in localStorage
 * - Smooth transitions between themes
 * - Accessible (keyboard navigable, ARIA labels)
 * - Icons: ◆ (classic) ● (modern)
 */
export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Switch to ${theme === "classic" ? "modern" : "classic"} theme`}
      title={`Switch to ${theme === "classic" ? "modern" : "classic"} theme`}
    >
      {theme === "classic" ? (
        /* Modern theme icon */
        <span className="text-lg">●</span>
      ) : (
        /* Classic theme icon */
        <span className="text-lg">◆</span>
      )}
    </button>
  )
}

export default ThemeToggle
