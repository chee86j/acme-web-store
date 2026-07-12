# 🚀 Theme Implementation Guide for ACME Web Store

## Overview

The ACME Web Store now supports **two complete UI/UX themes**:

1. **Classic Theme** (Default) — Vibrant, energetic, playful
2. **Modern Theme** — Professional, minimal, premium

Users can toggle between themes instantly via a button in the navbar.

---

## 📁 Files Created

### 1. **Theme Context**
```
src/context/ThemeContext.js
```
- Provides theme state management
- Handles theme persistence (localStorage)
- Exports `useTheme()` hook for components

### 2. **Theme Styles**
```
src/styles/themes.css
```
- CSS custom properties for both themes
- Component utility classes (.btn-primary, .card, etc.)
- Smooth transitions between themes
- Responsive design utilities

### 3. **Theme Toggle Component**
```
src/Components/ThemeToggle.js
```
- Renders toggle button (◆ for classic, ● for modern)
- Accessible (keyboard, screen readers, ARIA labels)
- Icons provide visual feedback

### 4. **Design Documentation**
```
MODERN_UI_DESIGN.md
```
- Complete design system specification
- Color palettes, typography, component designs
- Accessibility standards (WCAG AA+)
- Responsive breakpoints

---

## 🔧 Integration Steps

### Step 1: Update `index.js`

Wrap your app with `ThemeProvider`:

```javascript
import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "./context/ThemeContext"
import App from "./Components/App"
import "./styles/themes.css" // Add this import
import "./styles.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
```

### Step 2: Update `Navbar.js`

Add the ThemeToggle button to your navbar:

```javascript
import { ThemeToggle } from "./ThemeToggle"

export const Navbar = ({ auth }) => {
  return (
    <nav className="navbar">
      {/* Existing navbar content */}
      
      {/* Add this in the right section, before cart/account */}
      <ThemeToggle className="ml-4" />
      
      {/* Cart and account buttons */}
    </nav>
  )
}
```

### Step 3: Update Component Styles

Replace inline styles with theme-aware CSS variables:

**Before:**
```jsx
<button style={{ backgroundColor: "#22d3ee" }}>Add to Cart</button>
```

**After:**
```jsx
<button className="btn-primary">Add to Cart</button>
```

---

## 🎨 Using Theme Variables

### In CSS Files

```css
/* Use CSS custom properties */
.my-component {
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-base) var(--easing);
}

.my-component:hover {
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-lg);
}
```

### Available Variables

**Colors:**
- `--color-primary`, `--color-secondary`, `--color-accent`
- `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-light`
- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
- `--color-border`, `--color-border-light`

**Effects:**
- `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`

**Spacing:**
- `--space-xs` (4px), `--space-sm` (8px), `--space-md` (16px), `--space-lg` (24px), `--space-xl` (32px), `--space-2xl` (48px)

**Transitions:**
- `--duration-fast` (75ms), `--duration-base` (150ms), `--duration-slow` (300ms)
- `--easing` (cubic-bezier(0.4, 0, 0.2, 1))

---

## 🎛️ Using the `useTheme()` Hook

In any React component:

```javascript
import { useTheme } from "../context/ThemeContext"

export const MyComponent = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
```

---

## 📐 Component Updates (Priority Order)

### Priority 1: Foundation Components
- [ ] Button styles (primary, secondary, ghost)
- [ ] Input fields (form-input, form-select)
- [ ] Cards (product cards, info cards)

### Priority 2: Page-Level Components
- [ ] Navbar (spacing, colors, shadows)
- [ ] Hero section (typography, spacing)
- [ ] Product grid (responsive, hover states)
- [ ] Footer (background, links)

### Priority 3: Feature Components
- [ ] Cart page (two-column layout, summary styling)
- [ ] Checkout (form styling, progress indicator)
- [ ] Product detail (images, pricing, reviews)
- [ ] Account pages (forms, panels)

### Priority 4: Polish
- [ ] Loading skeletons (animation)
- [ ] Error states (red borders, messages)
- [ ] Success states (green checkmarks)
- [ ] Animations (micro-interactions)

---

## 🧪 Testing Checklist

### Visual Testing
- [ ] Classic theme looks correct
- [ ] Modern theme looks correct
- [ ] Smooth transition when toggling
- [ ] All text colors meet WCAG AA contrast

### Functional Testing
- [ ] Theme toggle button works
- [ ] Theme persists after refresh
- [ ] Theme applies to all pages
- [ ] No console errors

### Responsive Testing
- [ ] Mobile (320px): Single column, compact spacing
- [ ] Tablet (768px): Two-column layout
- [ ] Desktop (1024px+): Full multi-column layout
- [ ] All breakpoints work in both themes

### Accessibility Testing
- [ ] Keyboard navigation (Tab, Enter)
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Screen reader friendly
- [ ] Color contrast ≥ 4.5:1

---

## 🔄 Theme Switching Technical Details

### How It Works

1. **ThemeProvider** wraps the app and manages theme state
2. **localStorage** persists user choice (`acme-theme`)
3. **data-theme attribute** on `<html>` element controls CSS variables
4. **CSS custom properties** automatically update all colors/styles
5. **No component re-render** needed (pure CSS solution)

### Data Flow

```
User clicks toggle button
    ↓
toggleTheme() fires
    ↓
localStorage updated
    ↓
data-theme attribute updated
    ↓
CSS variables recalculate
    ↓
UI instantly updates (no JS needed)
```

---

## 🎯 Design System Reference

### Color Comparison

**Classic Theme:**
- Primary: Cyan (#22d3ee)
- Secondary: Lime (#84cc16)
- Accent: Orange (#ff7000)

**Modern Theme:**
- Primary: Slate (#1e293b)
- Secondary: Indigo (#6366f1)
- Accent: Emerald (#10b981)

### Font Sizes

```
H1: 48px (hero), 36px (page title)
H2: 32px (section)
H3: 24px (subsection)
Body: 16px
Small: 14px
```

### Spacing Scale

```
4px → 8px → 16px → 24px → 32px → 48px
(xs)   (sm)  (md)   (lg)   (xl)   (2xl)
```

---

## 🐛 Troubleshooting

### Theme not persisting after refresh
- Check browser localStorage is enabled
- Check `localStorage.getItem("acme-theme")` in console
- Verify `useEffect` in ThemeContext.js is firing

### Styles not updating when theme toggles
- Check `data-theme` attribute on `<html>` element
- Verify CSS custom properties are prefixed with `--`
- Check for !important rules overriding theme colors

### Components not using theme variables
- Convert hex colors to `var(--color-*)` format
- Check CSS file imports theme styles
- Clear browser cache and hard refresh

---

## 📚 Additional Resources

- See `MODERN_UI_DESIGN.md` for complete design system
- See `src/styles/themes.css` for all CSS variables
- See `src/context/ThemeContext.js` for theme logic
- See `src/Components/ThemeToggle.js` for toggle implementation

---

## ✅ Implementation Checklist

- [ ] Install theme context and toggle component
- [ ] Update index.js with ThemeProvider
- [ ] Add theme CSS file import
- [ ] Update Navbar with ThemeToggle button
- [ ] Convert button styles to use CSS variables
- [ ] Convert product card styles to use variables
- [ ] Test theme toggle functionality
- [ ] Test localStorage persistence
- [ ] Test responsive design in both themes
- [ ] Verify accessibility (contrast, keyboard nav)
- [ ] Test on mobile, tablet, desktop
- [ ] Update any hardcoded colors to variables
- [ ] Document any custom component themes
- [ ] Deploy and monitor for issues

---

**Start small:** Pick one component (e.g., buttons) and update all its styles to use theme variables. Then move to the next component. This iterative approach is safer and easier to test.
