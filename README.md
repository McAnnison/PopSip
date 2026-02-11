<div align="center">

# 🍹 PopSip

### Professional Cocktail Catering & Bartending Booking Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-lightgrey.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

*A full-service booking platform for cocktail catering and professional bartending services. Browse packages, hire bartenders, customize menus, and manage events with ease.*

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

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

## 🎯 Overview

**PopSip** is a comprehensive booking platform designed for cocktail catering and professional bartending services. The platform enables customers to browse cocktail packages, hire experienced bartenders for events, customize drink menus with add-ons, and manage their bookings through an intuitive dashboard. Administrators gain access to powerful management tools including booking calendars, staff assignments, payment tracking, and analytics. Bartenders can view their assigned events, confirm attendance, and communicate with admins seamlessly.

Built as a modern monorepo with TypeScript throughout, PopSip leverages Next.js 16 for the frontend and Express for the backend, with MySQL powering the data layer.

---

## ✨ Features

### 🛍️ Customer Experience
- **Browse Packages** - Explore curated cocktail packages for any occasion
- **Bartender Profiles** - View detailed profiles of professional bartenders
- **Menu Customization** - Personalize drink menus and select add-ons
- **Real-Time Availability** - Check bartender and package availability instantly
- **Event Scheduling** - Schedule events with ease and flexibility
- **Booking Dashboard** - Manage all your bookings in one place
- **Secure Payments** - Choose deposit or full payment options
- **Messaging & Notifications** - Stay connected via in-app messaging
- **Updates** - Receive email and SMS notifications

### 👨‍💼 Admin Capabilities
- **Package Management** - Create and manage cocktail packages and pricing
- **Staff Management** - Oversee bartenders and staff profiles
- **Calendar View** - Visual booking and availability calendar
- **Staff Assignment** - Assign bartenders to events efficiently
- **Payment Tracking** - Monitor payments and generate financial reports
- **Inventory Control** - Optional equipment and inventory management
- **Customer Service** - Built-in communication tools
- **Analytics Dashboard** - Track revenue, usage patterns, and trends

### 🍸 Bartender/Staff Tools
- **Event Overview** - View all assigned events and schedules
- **Event Details** - Access complete event information and requirements
- **Attendance Confirmation** - Confirm or update attendance status
- **Admin Messaging** - Direct communication with administrators
- **Checklists** - Access event-specific checklists and requirements

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1 | React framework with App Router |
| **React** | 19.2 | UI library |
| **TypeScript** | 5.0+ | Type safety and developer experience |
| **Tailwind CSS** | 4.0 | Utility-first CSS framework |
| **shadcn/ui** | Latest | Component library built on Radix UI |
| **Lucide React** | 0.563 | Modern icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | 5.2 | Web application framework |
| **TypeScript** | 5.9+ | Type safety |
| **MySQL** | 8.0+ | Relational database |
| **mysql2** | 3.17 | MySQL client for Node.js |
| **Helmet** | 8.1 | Security middleware |
| **CORS** | 2.8 | Cross-origin resource sharing |
| **express-rate-limit** | 8.2 | API rate limiting |

---

## 📁 Project Structure

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
│   ├── src/                # TypeScript source code
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Application entry point
│   ├── schema.sql          # MySQL database schema with sample data
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript configuration
│
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 18 or higher ([Download](https://nodejs.org/))
- **MySQL** version 8.0 or higher ([Download](https://dev.mysql.com/downloads/))
- **npm** or **yarn** package manager

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

> **Note:** Update the database name in `schema.sql` from `mixmaster` to `popsip` if needed for consistency.

#### 4. Set Up the Frontend

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env.local

# Edit .env.local with your backend API URL
# nano .env.local  # or use your preferred editor
```

### Quick Start

Get the application running in development mode in under a minute:

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

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) in your browser to see PopSip in action.

---

## 📚 Documentation

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
```

> ⚠️ **Security Note:** Never commit `.env` files to version control. Always use `.env.example` as a template.

### Running the Project

#### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```
The backend API will run on [http://localhost:5000](http://localhost:5000)

**Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run on [http://localhost:3000](http://localhost:3000)

#### Production Mode

See [Building for Production](#building-for-production) section below.

### Building for Production

#### Frontend Build

```bash
cd frontend

# Create optimized production build
npm run build

# Start production server
npm start
```

#### Backend Build

```bash
cd backend

# Compile TypeScript to JavaScript
npm run build

# Start production server
npm start
```

---

## 🔌 API Reference

### Base URL

```
http://localhost:5000/api
```

### Available Endpoints

#### 📦 Packages

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/packages` | Retrieve all cocktail packages | No |
| `GET` | `/api/packages/:id` | Get specific package details | No |
| `POST` | `/api/packages` | Create new package | Admin |
| `PUT` | `/api/packages/:id` | Update existing package | Admin |
| `DELETE` | `/api/packages/:id` | Delete a package | Admin |

**Example Request:**
```bash
curl http://localhost:5000/api/packages
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Classic Cocktail Package",
    "description": "Perfect for intimate gatherings",
    "price": 299.99,
    "duration": 3,
    "max_guests": 25
  }
]
```

#### 📅 Bookings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/bookings` | Retrieve all bookings | User |
| `GET` | `/api/bookings/:id` | Get specific booking | User |
| `POST` | `/api/bookings` | Create new booking | User |
| `PUT` | `/api/bookings/:id` | Update booking | User |
| `DELETE` | `/api/bookings/:id` | Cancel booking | User |

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "package_id": 1,
    "event_date": "2026-06-15",
    "guests": 20
  }'
```

> 📖 For complete API documentation, see the backend README or explore the `/api` endpoints in your development environment.

---

## 🗄️ Database Schema

PopSip uses MySQL with the following main tables:

| Table | Description |
|-------|-------------|
| **users** | User accounts (customers, bartenders, admins) |
| **bartenders** | Bartender profiles and availability |
| **packages** | Cocktail packages and pricing |
| **cocktails** | Cocktail recipes and ingredients |
| **bookings** | Event bookings and details |
| **staff_assignments** | Bartender assignments to events |
| **payments** | Payment records and transactions |
| **messages** | In-app communication between users |

### Database Relationships

```
users ─┬─→ bartenders
       ├─→ bookings
       └─→ messages

packages ─→ bookings ─→ staff_assignments ─→ bartenders

bookings ─→ payments
```

> 📄 **Full Schema:** See `backend/schema.sql` for the complete database structure, including indexes, constraints, and sample data.

---

## 💻 Development

### Project Conventions

- ✅ Use **TypeScript** for all new code
- ✅ Follow existing code structure and naming conventions
- ✅ Write **meaningful commit messages** using conventional commits
- ✅ Test your changes before committing
- ✅ Keep components small and focused
- ✅ Use existing UI components from shadcn/ui when possible
- ✅ Document complex logic with comments

### Code Style

The project uses ESLint for code quality. Run linting with:

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run lint  # if configured
```

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

## 🚢 Deployment

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

## 🔧 Troubleshooting

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

#### TypeScript Compilation Errors

**Problem:** Type errors preventing compilation

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript version
npx tsc --version
```

### Getting Help

- 📖 Check the [backend README](backend/README.md) for API-specific issues
- 🐛 [Open an issue](https://github.com/McAnnison/PopSip/issues) on GitHub
- 💬 Contact the development team

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] **Payment Integration** - Stripe/PayPal integration for online payments
- [ ] **Photo Galleries** - Bartender portfolio photos and event galleries
- [ ] **Review System** - Customer reviews and ratings for bartenders
- [ ] **Calendar Integration** - Google Calendar and iCal sync
- [ ] **Mobile App** - React Native mobile application
- [ ] **Advanced Analytics** - Enhanced reporting and data visualization
- [ ] **Multi-language Support** - Internationalization (i18n)
- [ ] **Email Templates** - Branded email notifications
- [ ] **SMS Notifications** - Twilio integration for text updates
- [ ] **Inventory Management** - Full equipment and supply tracking

### Future Enhancements

- Real-time chat using WebSockets
- Advanced search and filtering
- Recommendation engine
- Social media integration
- Promotional codes and discounts
- Loyalty rewards program

---

## 🤝 Contributing

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
- Add tests for new features when applicable
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Code of Conduct

Please be respectful and constructive in all interactions. We're building a welcoming community for everyone.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2026 PopSip
Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

## 💬 Support

Need help or have questions?

- 📧 **Email:** support@popsip.com (if available)
- 🐛 **Issues:** [GitHub Issues](https://github.com/McAnnison/PopSip/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/McAnnison/PopSip/discussions)
- 📖 **Documentation:** Check our [Wiki](https://github.com/McAnnison/PopSip/wiki) (if available)

---

## 🙏 Acknowledgments

PopSip is built with amazing open-source technologies:

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Express](https://expressjs.com/) - Fast, unopinionated web framework
- [MySQL](https://www.mysql.com/) - Reliable database system

Special thanks to all contributors who have helped make PopSip better!

---

<div align="center">

**[⬆ Back to Top](#-popsip)**

Made with ❤️ by the PopSip Team

</div>
