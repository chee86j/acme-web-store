# ACME Web Store

## Overview

Acme Web Store, the comprehensive white-label ready e-commerce app designed to deliver a seamless and engaging shopping experience. Whether you're a customer or a developer, Acme Web Store has something extraordinary to offer.

![Acme Web Store](src/Components/assets/AcmeWebStore.gif)

For customers, Acme Web Store provides an extensive selection of products across multiple categories, ensuring that you can find exactly what you need. With an intuitive user interface, secure transactions powered by Stripe, and personalized product recommendations, your shopping experience will be convenient and tailored to your preferences. Effortless cart management and streamlined order creation further enhance the convenience and satisfaction of your online shopping journey. Plus, our exceptional customer support team is always ready to assist you every step of the way.

Developers will find Acme Web Store a powerful platform to build exceptional e-commerce solutions. Leveraging the cutting-edge PERN stack, the app offers a scalable foundation and seamless integration with essential services like Stripe for secure payments. The responsive frontend built with React and Tailwind CSS empowers developers to create stunning user interfaces that align with their branding. With extensive customization options, comprehensive documentation, and a robust debugging process, developers can confidently build and extend Acme Web Store to create unique and reliable e-commerce experiences.

Check out the Live Site here https://acme-web-store.up.railway.app/

**Key Features:**

- **White-Label E-Commerce:**
  Tailor the platform to match your brand's identity and unique requirements.
- **Responsive Design:**
  Crafted using Tailwind CSS, our app offers a mobile-friendly and visually appealing interface.
- **Technology Stack:**
  Built with the PERN stack (PostgreSQL, Express.js, React, Node.js), ensuring scalability and robustness.
- **Secure Payments:**
  Enable secure transactions through Stripe payment integration.
- **Admin Capabilities:**
  Admins enjoy comprehensive features, including inventory management, order processing, user analytics, and more.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Stripe] API keys (for payment processing)
- [Nodemailer] API keys (for email functionality)

- create a `.env` file in the root directory and add the following environment variables:
  [DATABASE_URL] = your_postgresql_connection_string
  [JWT_SECRET] = your_jwt_secret
  [STRIPE_SECRET_KEY] = your_stripe_secret_key
  [EMAIL_HOST] = your_email_host
  [EMAIL_PORT] = your_email_port
  [EMAIL_USERNAME] = your_email_username
  [EMAIL_PASSWORD] = your_email_password

### Installation & Local Deployment

- run `npm install && npm run build:dev` in the root directory
- create and connect your PostgreSQL database `acme_shopping_db`
- run `npm run dev:client` in the root directory
- run `npm run dev:server` in the root directory
- navigate to `http://localhost:3000/` in your browser
