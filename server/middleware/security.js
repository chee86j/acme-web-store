const cors = require('cors');
const helmet = require('helmet');
const { cors: corsConfig, securityHeaders } = require('../config/security');

const securityMiddleware = [
  // Apply Helmet for basic security headers
  helmet(),
  
  // Custom security headers
  (req, res, next) => {
    Object.entries(securityHeaders).forEach(([header, value]) => {
      res.setHeader(header, value);
    });
    next();
  },
  
  // CORS configuration
  cors(corsConfig),
  
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