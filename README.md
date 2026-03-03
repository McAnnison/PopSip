# PopSip

### Professional Cocktail Catering & Bartending Booking Platform

*A full-service booking platform for cocktail catering and professional bartending services. Browse packages, hire bartenders, customize menus, and manage events with ease.*

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-reference) • [Contributing](#-contributing)

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
- [Documentation](#-documentation)
  - [Environment Variables](#environment-variables)
  - [Running the Project](#running-the-project)
  - [Building for Production](#building-for-production)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## Overview

<<<<<<< HEAD
**PopSip** is a comprehensive booking platform designed for cocktail catering and professional bartending services. The platform enables customers to browse cocktail packages, hire experienced bartenders for events, customize drink menus, and manage their bookings through an intuitive dashboard. Administrators gain access to powerful management tools including booking calendars, user management, payment tracking, and analytics. Bartenders can view their assigned events, manage availability, confirm attendance, and communicate with customers seamlessly.
=======
**PopSip** is a revolutionary two-sided marketplace connecting professional bartenders with customers seeking exceptional cocktail services for their events. The platform empowers bartenders to create their own booking business by building custom profiles, showcasing their skills, setting their own prices, and publishing unique service packages. Customers can browse a vibrant marketplace of talented mixologists, compare services, read reviews, and book the perfect bartender for their party or celebration.

The platform features a modern, energetic design with a party vibe that reflects the excitement of the cocktail and entertainment industry. With its purple-pink gradient theme and intuitive interface, PopSip makes it easy for both bartenders to grow their business and customers to find exceptional service.
>>>>>>> main

Built as a modern monorepo, PopSip leverages Next.js 16 for the frontend and Express for the backend, with MySQL powering the data layer.

---

## Features

### Customer Experience

<<<<<<< HEAD
- **Browse Packages** - Explore curated cocktail packages for any occasion
- **Bartender Profiles** - View detailed profiles with photos, experience, and reviews
- **Menu Customization** - Personalize drink menus with special requests
- **Real-Time Availability** - Check bartender availability instantly
- **Event Scheduling** - Schedule events with ease and flexibility
- **Booking Dashboard** - Manage all your bookings in one place
- **Secure Payments** - Choose deposit or full payment options
- **Favorites** - Save your favorite bartenders for future events
- **Messaging** - Chat directly with your booked bartender
- **Reviews & Ratings** - Leave feedback after your event
- **Notifications** - Stay updated on booking status changes

### Admin Capabilities

- **Dashboard** - Quick overview of platform activity
- **User Management** - Manage customers and bartenders
- **Booking Oversight** - View and manage all bookings
- **Verification System** - Verify bartender credentials
- **Payment Tracking** - Monitor payments across all bookings
- **Analytics** - Track platform growth and revenue

### Bartender/Staff Tools

- **Profile Management** - Showcase experience, photos, and specialties
- **Package Management** - Create and update service packages
- **Availability Calendar** - Set available dates for bookings
- **Booking Dashboard** - View upcoming and past events
- **Attendance Confirmation** - Confirm or decline booking requests
- **Customer Communication** - Chat with customers before events
- **Review Responses** - Respond to customer feedback
- **Earnings Overview** - Track completed bookings and earnings
=======
### 🍹 For Customers
- **Browse Bartenders** - Explore a vibrant marketplace of professional bartenders and mixologists
- **Advanced Filtering** - Search by location, specialties, rating, and price range
- **Bartender Profiles** - View detailed profiles with experience, ratings, reviews, and portfolios
- **Service Packages** - Compare custom service offerings from each bartender
- **Real-Time Reviews** - Read authentic reviews from past clients
- **Easy Booking** - Simple booking process with instant requests
- **Party-Themed UI** - Energetic, colorful design that matches the celebration vibe

### 🍸 For Bartenders
- **Create Your Profile** - Build a professional profile showcasing your skills and experience
- **Multi-Step Onboarding** - Guided 3-step registration process (Profile → Services → Review)
- **Custom Service Packages** - Create and price your own unique service offerings
- **Flexible Pricing** - Set your hourly rate and package prices
- **Portfolio Showcase** - Upload images of your work and past events
- **Availability Management** - Control your schedule and service area
- **Publish When Ready** - Preview and edit before going live
- **Booking Management** - Receive and manage booking requests
- **Build Your Reputation** - Collect reviews and ratings from satisfied clients
- **Grow Your Business** - Reach more customers through the marketplace

### 👨‍💼 Platform Features
- **Two-Sided Marketplace** - Connects bartenders with customers seamlessly
- **Rating & Review System** - Build trust through authentic customer feedback
- **Location-Based Services** - Find bartenders in your area or willing to travel
- **Responsive Design** - Beautiful experience on desktop, tablet, and mobile
- **Vibrant UI/UX** - Purple-pink gradient theme with party atmosphere
- **Secure Platform** - Built with security best practices
>>>>>>> main

---

## Tech Stack

### Frontend

| Technology             | Version | Purpose                              |
| ---------------------- | ------- | ------------------------------------ |
| **Next.js**      | 16.1    | React framework with App Router      |
| **React**        | 19.2    | UI library                           |
| **TypeScript**   | 5.0+    | Type safety and developer experience |
| **Tailwind CSS** | 4.0     | Utility-first CSS framework          |
| **shadcn/ui**    | Latest  | Component library built on Radix UI  |
| **Lucide React** | 0.563   | Modern icon library                  |

### Backend

| Technology                   | Version | Purpose                       |
| ---------------------------- | ------- | ----------------------------- |
| **Node.js**            | 18+     | JavaScript runtime            |
| **Express**            | 5.2     | Web application framework     |
| **JavaScript**         | ES6+    | Programming language          |
| **MySQL**              | 8.0+    | Relational database           |
| **mysql2**             | 3.17    | MySQL client for Node.js      |
| **bcrypt**             | 6.0     | Password hashing              |
| **jsonwebtoken**       | 9.0     | JWT authentication            |
| **helmet**             | 8.1     | Security middleware           |
| **cors**               | 2.8     | Cross-origin resource sharing |
| **express-rate-limit** | 8.2     | API rate limiting             |
| **multer**             | 2.0     | File upload handling          |
| **nodemailer**         | 8.0     | Email notifications           |
| **dotenv**             | 17.3    | Environment variables         |

---

## Project Structure

This is a **monorepo** containing both frontend and backend applications:

```
PopSip/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js App Router pages and layouts
│   ├── components/          # React components (including shadcn/ui)
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Utilities and helper functions
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
│
├── backend/                 # Node.js + Express backend API
│   ├── src/                # JavaScript source code
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware (auth, upload, etc.)
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── index.js        # Application entry point
│   ├── schema.sql          # MySQL database schema with sample data
│   ├── .env.example        # Example environment variables
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
│
└── README.md               # This file
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 18 or higher ([Download](https://nodejs.org/))
- **MySQL** version 8.0 or higher ([Download](https://dev.mysql.com/downloads/))
- **npm** package manager

### Installation

Follow these steps to set up the project locally:

#### 1. Clone the Repository

```bash
git clone https://github.com/McAnnison/PopSip.git
cd PopSip
```

#### 2. Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env

# Edit .env with your configuration
# nano .env  # or use your preferred editor
```

#### 3. Set Up the Database

```bash
# Create the database and tables (from the backend directory)
mysql -u root -p < schema.sql

# This will create the 'popsip' database with all necessary tables and sample data
```

#### 4. Set Up the Frontend

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env.local

# Edit .env.local with your backend API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Quick Start

Get the application running in development mode:

```bash
# Terminal 1 - Start the backend server
cd backend
npm run dev
# Backend runs on http://localhost:5000

# Terminal 2 - Start the frontend
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

🎉 **Open [http://localhost:3000](http://localhost:3000)** to see PopSip in action!

---

## Documentation

### Environment Variables

#### Frontend Configuration (`.env.local`)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend Configuration (`.env`)

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=popsip

# Security
JWT_SECRET=your_jwt_secret_key_here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

> ⚠️ **Security Note:** Never commit `.env` files to version control. Always use `.env.example` as a template.

### Running the Project

#### Development Mode

**Backend:**

```bash
cd backend
npm run dev
# API available at http://localhost:5000
```

**Frontend:**

```bash
cd frontend
npm run dev
# App available at http://localhost:3000
```

#### Production Mode

**Backend Build:**

```bash
cd backend
npm start
```

**Frontend Build:**

```bash
cd frontend
npm run build
npm start
```

---

## API Reference

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

<<<<<<< HEAD
| Method   | Endpoint           | Description       | Auth     |
| -------- | ------------------ | ----------------- | -------- |
| `POST` | `/auth/register` | Register new user | Public   |
| `POST` | `/auth/login`    | User login        | Public   |
| `GET`  | `/auth/me`       | Get current user  | Required |
=======
#### 🍹 Bartenders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/bartenders` | Get all published bartenders (with filters) | No |
| `GET` | `/api/bartenders/:id` | Get specific bartender with services, reviews, portfolio | No |
| `POST` | `/api/bartenders` | Create new bartender profile | User |
| `PUT` | `/api/bartenders/:id` | Update bartender profile | Bartender |
| `POST` | `/api/bartenders/:id/publish` | Publish bartender profile to marketplace | Bartender |
| `POST` | `/api/bartenders/services` | Add service package to bartender | Bartender |
| `POST` | `/api/bartenders/bookings` | Create booking request for bartender | Customer |
| `POST` | `/api/bartenders/reviews` | Add review for bartender | Customer |

**Filter Parameters for `/api/bartenders`:**
- `location` - Filter by location (partial match)
- `specialties` - Filter by specialties (partial match)
- `minRating` - Minimum rating (e.g., 4.5)
- `maxPrice` - Maximum hourly rate

**Example Request:**
```bash
curl "http://localhost:5000/api/bartenders?location=Los Angeles&minRating=4.5"
```

**Example Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "business_name": "Elite Mixology",
      "bio": "Award-winning bartender...",
      "experience_years": 10,
      "specialties": "Craft Cocktails, Molecular Mixology",
      "hourly_rate": 75.00,
      "location": "Los Angeles, CA",
      "rating": 4.8,
      "total_bookings": 127,
      "review_count": 45
    }
  ]
}
```

#### 📦 Packages
>>>>>>> main

### Public Endpoints

| Method  | Endpoint                         | Description                        |
| ------- | -------------------------------- | ---------------------------------- |
| `GET` | `/packages`                    | Browse all packages with filters   |
| `GET` | `/packages/:id`                | Get package details                |
| `GET` | `/bartenders`                  | Browse bartenders with filters     |
| `GET` | `/bartenders/:id`              | Get bartender profile with reviews |
| `GET` | `/bartenders/:id/availability` | Check bartender availability       |
| `GET` | `/search?q=query`              | Global search                      |

### Customer Endpoints

| Method     | Endpoint                    | Description             |
| ---------- | --------------------------- | ----------------------- |
| `GET`    | `/bookings`               | Get my bookings         |
| `GET`    | `/bookings/:id`           | Get booking details     |
| `POST`   | `/bookings`               | Create new booking      |
| `PUT`    | `/bookings/:id`           | Update booking          |
| `DELETE` | `/bookings/:id`           | Cancel booking          |
| `GET`    | `/favorites`              | Get favorite bartenders |
| `POST`   | `/favorites/:bartenderId` | Add to favorites        |
| `DELETE` | `/favorites/:bartenderId` | Remove from favorites   |
| `POST`   | `/reviews`                | Create review           |
| `GET`    | `/notifications`          | Get my notifications    |

### Bartender Endpoints

| Method     | Endpoint                            | Description           |
| ---------- | ----------------------------------- | --------------------- |
| `GET`    | `/bartender/dashboard`            | Dashboard stats       |
| `GET`    | `/bartender/bookings`             | Get assigned bookings |
| `PUT`    | `/bartender/bookings/:id/confirm` | Confirm booking       |
| `PUT`    | `/bartender/bookings/:id/decline` | Decline booking       |
| `GET`    | `/bartender/packages`             | Manage packages       |
| `POST`   | `/bartender/packages`             | Create package        |
| `PUT`    | `/bartender/packages/:id`         | Update package        |
| `DELETE` | `/bartender/packages/:id`         | Delete package        |
| `GET`    | `/bartender/availability`         | Get availability      |
| `POST`   | `/bartender/availability`         | Set availability      |
| `POST`   | `/bartender/reviews/:id/respond`  | Respond to review     |

### Admin Endpoints

| Method     | Endpoint                    | Description          |
| ---------- | --------------------------- | -------------------- |
| `GET`    | `/admin/dashboard`        | Platform overview    |
| `GET`    | `/admin/users`            | Manage users         |
| `PUT`    | `/admin/users/:id/verify` | Verify bartender     |
| `DELETE` | `/admin/users/:id`        | Delete user          |
| `GET`    | `/admin/bookings`         | View all bookings    |
| `GET`    | `/admin/payments`         | View payment summary |

### Messaging Endpoints

| Method   | Endpoint                        | Description          |
| -------- | ------------------------------- | -------------------- |
| `GET`  | `/conversations`              | Get my conversations |
| `GET`  | `/conversations/:id/messages` | Get messages         |
| `POST` | `/conversations/:id/messages` | Send message         |

---

## Database Schema

PopSip uses a simplified but powerful MySQL schema with 10 core tables:

<<<<<<< HEAD
| Table                        | Description                                   |
| ---------------------------- | --------------------------------------------- |
| **users**              | User accounts (customers, bartenders, admins) |
| **bartender_profiles** | Extended bartender information                |
| **packages**           | Cocktail packages offered by bartenders       |
| **bookings**           | Event bookings with payment tracking          |
| **reviews**            | Customer feedback and bartender responses     |
| **conversations**      | Chat sessions per booking                     |
| **messages**           | Individual chat messages                      |
| **availability**       | Bartender available dates                     |
| **favorites**          | Customer favorite bartenders                  |
| **notifications**      | In-app notifications                          |

### Key Design Choices

- **JSON fields** for flexible data (menu customizations stored in bookings)
- **Simple availability** - date-based instead of complex recurring schedules
- **Payment info** stored directly in bookings (no separate payments table)
- **Menu customization** handled via JSON in bookings
=======
| Table | Description |
|-------|-------------|
| **users** | User accounts (customers, bartenders, admins) |
| **bartenders** | Enhanced bartender profiles with business details, images, ratings |
| **bartender_services** | Custom service packages offered by each bartender |
| **bartender_portfolio** | Portfolio images and work showcases |
| **bartender_availability** | Weekly availability schedules |
| **bartender_reviews** | Customer reviews and ratings |
| **bartender_bookings** | Direct bookings between customers and bartenders |
| **packages** | Cocktail packages and pricing (legacy) |
| **cocktails** | Cocktail recipes and ingredients |
| **bookings** | Event bookings and details (legacy) |
| **staff_assignments** | Bartender assignments to events |
| **payments** | Payment records and transactions |
| **messages** | In-app communication between users |
>>>>>>> main

### Database Relationships

```
<<<<<<< HEAD
users ─┬─→ bartender_profiles
       ├─→ bookings (as customer)
       ├─→ favorites
       └─→ messages

bartender_profiles ──→ packages ──→ bookings
                    └─→ availability

bookings ──→ reviews ──→ conversations ──→ messages
=======
users ─┬─→ bartenders ─┬─→ bartender_services
       │                ├─→ bartender_portfolio
       │                ├─→ bartender_availability
       │                ├─→ bartender_reviews
       │                └─→ bartender_bookings
       ├─→ bookings
       └─→ messages

bartender_bookings ─→ bartender_services
bartender_reviews ─→ bartender_bookings (optional)
>>>>>>> main
```

> 📄 **Full Schema:** See `backend/schema.sql` for the complete database structure, including indexes, constraints, and sample data.

---

## Development

### Project Conventions

- ✅ Follow existing code structure and naming conventions
- ✅ Write meaningful commit messages
- ✅ Test your changes before committing
- ✅ Keep components small and focused
- ✅ Use existing UI components from shadcn/ui when possible
- ✅ Document complex logic with comments

### Git Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature-name

# 2. Make your changes and commit
git add .
git commit -m "feat: add your feature"

# 3. Push to your fork
git push origin feature/your-feature-name

# 4. Create a pull request on GitHub
```

---

## Deployment

### Frontend Deployment (Vercel)

PopSip's Next.js frontend is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Backend Deployment

The Express backend can be deployed to various platforms:

- **Railway** - Simple deployment with MySQL support
- **Heroku** - Traditional PaaS option
- **DigitalOcean App Platform** - Managed container deployment
- **AWS EC2** - Full control deployment

### Database Deployment

For production, consider:

- **PlanetScale** - Serverless MySQL platform
- **AWS RDS** - Managed MySQL service
- **DigitalOcean Managed Databases** - Simple managed MySQL

> 🔒 **Security:** Always use environment variables for sensitive data and enable HTTPS in production.

---

## Troubleshooting

### Common Issues

#### Database Connection Errors

**Problem:** `ER_ACCESS_DENIED_ERROR` or connection refused

**Solution:**

```bash
# Verify MySQL is running
mysql --version

# Check credentials in .env
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=popsip

# Test connection
mysql -u root -p -e "SHOW DATABASES;"
```

#### Port Already in Use

**Problem:** `EADDRINUSE: address already in use :::5000`

**Solution:**

```bash
# Find and kill the process using the port
lsof -ti:5000 | xargs kill -9

# Or use a different port in .env
PORT=5001
```

#### Frontend API Connection Issues

**Problem:** API requests failing from frontend

**Solution:**

1. Verify backend is running on `http://localhost:5000`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Ensure CORS is properly configured in backend

### Getting Help

- 📖 Check the [backend README](backend/README.md) for API-specific issues
- 🐛 [Open an issue](https://github.com/McAnnison/PopSip/issues) on GitHub
- 💬 Contact the development team

---

## Roadmap

### Upcoming Features

- [ ] **Payment Integration** - Stripe/PayPal integration for online payments
- [ ] **Photo Galleries** - Bartender portfolio photos and event galleries
- [ ] **Calendar Integration** - Google Calendar and iCal sync
- [ ] **Mobile App** - React Native mobile application
- [ ] **Advanced Analytics** - Enhanced reporting and data visualization
- [ ] **Email Templates** - Branded email notifications
- [ ] **SMS Notifications** - Twilio integration for text updates

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/PopSip.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and commit: `git commit -m 'feat: add amazing feature'`
5. **Push** to your branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes before submitting
- Update documentation as needed

---

## License

This project is licensed under the **MIT License**.

```
MIT License - Copyright (c) 2026 PopSip
Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

## Support

Need help or have questions?

- 📧 **Email:** support@popsip.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/McAnnison/PopSip/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/McAnnison/PopSip/discussions)

---

## Acknowledgments

PopSip is built with amazing open-source technologies:

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Express](https://expressjs.com/) - Fast, unopinionated web framework
- [MySQL](https://www.mysql.com/) - Reliable database system

---

<div align="center">

**[⬆ Back to Top](#popsip)**

Made with ❤️ by the PopSip Team
