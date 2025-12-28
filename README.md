# ACME Web Store

## Overview

Acme Web Store, the comprehensive white-label ready e-commerce app designed to deliver a seamless and engaging shopping experience. Whether you're a customer or a developer, Acme Web Store has something extraordinary to offer.The application provides a complete shopping experience with user authentication, product management, cart functionality, and secure payment processing.

![Acme Web Store](src/Components/assets/AcmeWebStore.gif)

For customers, Acme Web Store provides an extensive selection of products across multiple categories, ensuring that you can find exactly what you need. With an intuitive user interface, secure transactions powered by For customers, Acme Web Store offers a broad, well-organized catalog with fast search and filtering so you can find what you need quickly. Checkout is secured through Stripe, with encrypted payment processing and reliable order confirmation. You also get personalized recommendations, simple cart updates, and a clean order flow from purchase to receipt. If anything comes up, customer support is available to help with accounts, orders, and returns.
For developers, Acme Web Store is a solid PERN-based e-commerce foundation designed for scale and maintainability. It integrates Stripe for payment intents, webhooks, and secure transaction handling, while the React + Tailwind CSS frontend supports responsive, brandable UI components. The architecture is built to be extended: configurable product categories, flexible data models in PostgreSQL, and clearly defined API boundaries for new features. With documentation, environment-based configuration, and a disciplined debugging workflow, teams can ship custom storefront experiences with confidence.

Check out the Live Demo here https://acme-web-store.up.railway.app/

### Features

- **User Management**
  - User authentication and authorization
  - Guest shopping support
  - Admin dashboard for store management

- **Product Management**
  - Product catalog with categories
  - Product search and filtering
  - Admin product management interface
  - Product reviews and ratings

- **Shopping Features**
  - Shopping cart with quantity management
  - Wishlist functionality
  - Order history and tracking
  - Secure checkout process

- **Admin Dashboard**
  - User management
  - Product inventory control
  - Order processing
  - Sales analytics

- **Technical Features**
  - Responsive design with Tailwind CSS
  - Redux state management
  - RESTful API architecture
  - Stripe payment integration
  - Email notifications

- **Security Features**
  - JWT-based authentication with 1-hour expiration and automatic refresh
  - HTTP-only cookies with secure flags and SameSite policy
  - Comprehensive security headers (HSTS, CSP, X-Frame-Options, XSS Protection)
  - Input validation and sanitization with XSS and SQL injection prevention
  - Secure session management with 1-hour lifetime
  - Strict CORS policy with configured origins and methods
  - Environment variable protection for sensitive data
  - Secure payment processing with Stripe
  - Production-safe error handling and logging
  - Protected admin routes with role-based access control

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Stripe] API keys (for payment processing)
- [Nodemailer] API keys (for email functionality)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
  [DATABASE_URL] = your_postgresql_connection_string
  [JWT_SECRET] = your_jwt_secret
  [STRIPE_KEY] = your_stripe_secret_key
  [EMAIL_HOST] = your_email_host
  [EMAIL_PORT] = your_email_port
  [EMAIL_USERNAME] = your_email_username
  [EMAIL_PASSWORD] = your_email_password
```

### Installation & Local Development

1. Install dependencies:
```bash
npm install
npm run build:dev
```

2. Database setup:
- Create a PostgreSQL database named `acme_shopping_db`
- Connect to your database using the DATABASE_URL in your .env file

3. Start the development servers from the root directory:
```bash
npm run dev:client  # Frontend server
npm run dev:server  # Backend server
```

4. Access the application locally at `http://localhost:3000/`
