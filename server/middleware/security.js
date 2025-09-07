const cors = require('cors');
const helmet = require('helmet');
const { cors: corsConfig } = require('../config/security');

const securityMiddleware = [
  // Apply Helmet with proper CSP configuration following best practices
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }),
  
  // CORS configuration
  cors(corsConfig),
  
  // Cache-busting headers to prevent browser cache issues
  (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  },
  
  // XSS Protection
  (req, res, next) => {
    if (req.body) {
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          req.body[key] = req.body[key].replace(/[<>]/g, '');
        }
      });
    }
    next();
  },
  
  // SQL Injection Protection (assuming you're using parameterized queries already)
  (req, res, next) => {
    if (req.body) {
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          // Basic SQL injection prevention
          if (req.body[key].toLowerCase().includes('select') ||
              req.body[key].toLowerCase().includes('insert') ||
              req.body[key].toLowerCase().includes('update') ||
              req.body[key].toLowerCase().includes('delete') ||
              req.body[key].toLowerCase().includes('drop')) {
            return res.status(403).json({ error: 'Invalid input detected' });
          }
        }
      });
    }
    next();
  }
];

module.exports = securityMiddleware; 