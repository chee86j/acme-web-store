const express = require("express")
const jwt = require('jsonwebtoken')
const app = express.Router()
const { User } = require("../db")
const { jwt: jwtConfig } = require('../config/security')

// JWT token generation
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  )
}

// Token refresh middleware
const refreshToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) return next()

    const decoded = jwt.verify(token, jwtConfig.secret)
    const timeLeft = decoded.exp - Math.floor(Date.now() / 1000)

    // If token is close to expiring (less than 5 minutes), refresh it
    if (timeLeft < 300) {
      const user = await User.findByPk(decoded.id)
      const newToken = generateToken(user)
      res.setHeader('X-New-Token', newToken)
    }
    next()
  } catch (error) {
    next()
  }
}

// User authentication
app.post("/", async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    
    // Input validation
    if ((!username && !email) || !password) {
      return res.status(400).json({ error: 'Username/Email and password are required' })
    }
    
    // Try authenticating with username if provided, otherwise use email
    const credentials = username ? { username, password } : { username: email, password }
    const token = await User.authenticate(credentials)

    // Set HTTP-only cookie with JWT
    res.cookie('token', token, {
      ...jwtConfig.cookie,
      path: '/'
    })

    res.json({ token })
  } catch (ex) {
    next(ex)
  }
})

// Get user information with token refresh
app.get("/me", refreshToken, async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const user = await User.findByToken(token, {
      attributes: ["id", "username", "email", "createdAt", "isAdmin", "avatar"],
    })

    if (req.session?.cartId) {
      const guestCart = await User.getGuestCart(req.session.cartId)
      if (guestCart) {
        await user.mergeGuestCart(guestCart)
      }
      req.session.cartId = null
    }

    res.json(user)
  } catch (ex) {
    next(ex)
  }
})

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' })
  res.json({ message: 'Logged out successfully' })
})

module.exports = app
