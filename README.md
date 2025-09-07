# ACME Web Store

## Overview

Acme Web Store, the comprehensive white-label ready e-commerce app designed to deliver a seamless and engaging shopping experience. Whether you're a customer or a developer, Acme Web Store has something extraordinary to offer.The application provides a complete shopping experience with user authentication, product management, cart functionality, and secure payment processing.

![Acme Web Store](src/Components/assets/AcmeWebStore.gif)

For customers, Acme Web Store provides an extensive selection of products across multiple categories, ensuring that you can find exactly what you need. With an intuitive user interface, secure transactions powered by Stripe, and personalized product recommendations, your shopping experience will be convenient and tailored to your preferences. Effortless cart management and streamlined order creation further enhance the convenience and satisfaction of your online shopping journey. Plus, our exceptional customer support team is always ready to assist you every step of the way.

Developers will find Acme Web Store a powerful platform to build exceptional e-commerce solutions. Leveraging the cutting-edge PERN stack, the app offers a scalable foundation and seamless integration with essential services like Stripe for secure payments. The responsive frontend built with React and Tailwind CSS empowers developers to create stunning user interfaces that align with their branding. With extensive customization options, comprehensive documentation, and a robust debugging process, developers can confidently build and extend Acme Web Store to create unique and reliable e-commerce experiences.

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
