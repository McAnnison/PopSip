# MixMaster Backend

Node.js + Express + MySQL backend for the MixMaster cocktail catering booking platform.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MySQL** - Database
- **mysql2** - MySQL client
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── .env.example         # Example environment variables
├── schema.sql           # Database schema
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

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

Or manually create the database and run the SQL commands in `schema.sql`.

### Running the Server

Development mode (with hot reload):
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Run production build:
```bash
npm start
```

## API Endpoints

### Packages

- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create new package

### Bookings

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking

## Database Schema

The database includes the following main tables:

- `users` - User accounts
- `bartenders` - Bartender profiles
- `packages` - Cocktail packages
- `cocktails` - Cocktail recipes
- `bookings` - Event bookings
- `staff_assignments` - Bartender assignments
- `payments` - Payment records
- `messages` - Communication between users

See `schema.sql` for the complete database structure.

## Environment Variables

Required environment variables (see `.env.example`):

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL user
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret for JWT tokens
- `CORS_ORIGIN` - Allowed CORS origin

## License

MIT
