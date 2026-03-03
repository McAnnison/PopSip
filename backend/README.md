## Backend README

```markdown
# Popsip Backend

Node.js + Express + MySQL backend for the PopSip cocktail catering booking platform.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **JavaScript** - Programming language
- **MySQL** - Database
- **mysql2** - MySQL client
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - API rate limiting
- **multer** - File upload handling
- **nodemailer** - Email notifications
- **dotenv** - Environment configuration

## Project Structure

```

backend/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, upload, etc.)
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.js         # Application entry point
├── .env.example         # Example environment variables
├── schema.sql           # Database schema with sample data
├── package.json
└── README.md


```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and other settings.

3. Create the database and tables:

```bash
mysql -u root -p < schema.sql
```

Or using PowerShell:

```powershell
Get-Content schema.sql | mysql -u root -p
```

### Running the Server

Development mode (with hot reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication

| Method | Endpoint                  | Description                                               |
| ------ | ------------------------- | --------------------------------------------------------- |
| POST   | `/auth/register`        | begins user registration process and sends OTP via e-Mail |
| POST   | `/auth/verify-otp`      | verifies the user OTP with token                          |
| POST   | `/auth/resend-otp`      | resends OTP to user                                       |
| POST   | `/auth/login`           | User login                                                |
| POST   | `/auth/forgot-password` | sends reset OTP, returns reset token                      |
| POST   | `/auth/reset-password`  | submits OTP + token + new password                        |
| GET    | `/auth/me`              | Get current user                                          |

### Public Endpoints

| Method | Endpoint                         | Description                        |
| ------ | -------------------------------- | ---------------------------------- |
| GET    | `/packages`                    | Browse all packages with filters   |
| GET    | `/packages/:id`                | Get package details                |
| GET    | `/bartenders`                  | Browse bartenders with filters     |
| GET    | `/bartenders/:id`              | Get bartender profile with reviews |
| GET    | `/bartenders/:id/availability` | Check bartender availability       |
| GET    | `/search?q=query`              | Global search                      |

### Customer Endpoints

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | `/bookings`               | Get my bookings         |
| GET    | `/bookings/:id`           | Get booking details     |
| POST   | `/bookings`               | Create new booking      |
| PUT    | `/bookings/:id`           | Update booking          |
| DELETE | `/bookings/:id`           | Cancel booking          |
| GET    | `/favorites`              | Get favorite bartenders |
| POST   | `/favorites/:bartenderId` | Add to favorites        |
| DELETE | `/favorites/:bartenderId` | Remove from favorites   |
| POST   | `/reviews`                | Create review           |
| GET    | `/notifications`          | Get my notifications    |

### Bartender Endpoints

| Method | Endpoint                            | Description           |
| ------ | ----------------------------------- | --------------------- |
| GET    | `/bartender/dashboard`            | Dashboard stats       |
| GET    | `/bartender/bookings`             | Get assigned bookings |
| PUT    | `/bartender/bookings/:id/confirm` | Confirm booking       |
| PUT    | `/bartender/bookings/:id/decline` | Decline booking       |
| GET    | `/bartender/packages`             | Manage packages       |
| POST   | `/bartender/packages`             | Create package        |
| PUT    | `/bartender/packages/:id`         | Update package        |
| DELETE | `/bartender/packages/:id`         | Delete package        |
| GET    | `/bartender/availability`         | Get availability      |
| POST   | `/bartender/availability`         | Set availability      |
| POST   | `/bartender/reviews/:id/respond`  | Respond to review     |

### Admin Endpoints

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/admin/dashboard`        | Platform overview    |
| GET    | `/admin/users`            | Manage users         |
| PUT    | `/admin/users/:id/verify` | Verify bartender     |
| DELETE | `/admin/users/:id`        | Delete user          |
| GET    | `/admin/bookings`         | View all bookings    |
| GET    | `/admin/payments`         | View payment summary |

### Messaging Endpoints

| Method | Endpoint                        | Description          |
| ------ | ------------------------------- | -------------------- |
| GET    | `/conversations`              | Get my conversations |
| GET    | `/conversations/:id/messages` | Get messages         |
| POST   | `/conversations/:id/messages` | Send message         |

## Database Schema

The database consists of 10 core tables:

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

### Database Relationships

```
users ─┬─→ bartender_profiles
       ├─→ bookings (as customer)
       ├─→ favorites
       └─→ messages

bartender_profiles ──→ packages ──→ bookings
                    └─→ availability

bookings ──→ reviews ──→ conversations ──→ messages
```

See `schema.sql` for the complete database structure with indexes, constraints, and sample data.

## Environment Variables

Required environment variables (see `.env.example`):

```
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

## License

MIT
