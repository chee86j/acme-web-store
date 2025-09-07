const { config } = require('dotenv');
config();

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-in-env',
    expiresIn: '1h',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000 // 1 hour
    }
  },
  session: {
    secret: process.env.SESSION_SECRET || 'session-secret-in-env',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000 // 1 hour
    }
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range', 'X-New-Token'],
    credentials: true,
    maxAge: 86400 // 24 hours
  },
}; 