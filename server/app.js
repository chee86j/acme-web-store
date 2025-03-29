const express = require("express")
const session = require('express-session')
const path = require("path")
const app = express()

// Import security configurations
const { session: sessionConfig } = require('./config/security')
const securityMiddleware = require('./middleware/security')

// Apply security middleware
app.use(securityMiddleware)

// Session configuration
app.use(session(sessionConfig))

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/dist", express.static(path.join(__dirname, "../dist")))
app.use("/static", express.static(path.join(__dirname, "../static")))

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
)

app.use("/api/auth", require("./api/auth"))
app.use("/api/orders", require("./api/orders"))
app.use('/api/products', require('./api/products'))
app.use("/api/account", require('./api/account'))
app.use("/api/users", require("./api/users"))
app.use("/api/reviews", require("./api/reviews"))
app.use("/api/cart", require("./api/cart"))
app.use("/api/wishlist", require("./api/wishlist"))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'An error occurred' 
      : err.message
  })
})

module.exports = app
