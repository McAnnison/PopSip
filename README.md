# MixMaster Booking Platform

A full-service booking platform for cocktail catering and professional bartending services. Customers can browse cocktail packages, hire bartenders for events, customize drink menus, and manage payments and bookings through an intuitive dashboard.

---

## Project Structure

This is a monorepo containing both frontend and backend applications:

```
PopSip/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js pages and layouts
│   ├── components/   # React components (including shadcn/ui)
│   ├── lib/          # Utilities and helpers
│   └── ...
├── backend/          # Node.js + Express backend API
│   ├── src/          # TypeScript source code
│   │   ├── config/   # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Express middleware
│   │   └── ...
│   └── schema.sql    # MySQL database schema
└── README.md         # This file
```

---

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MySQL** - Relational database
- **mysql2** - MySQL client for Node.js
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

---

## Features

### Customer Features
- Browse cocktail packages
- View bartender profiles
- Customize drink menus and add-ons
- Real-time availability checking
- Event scheduling
- Booking management dashboard
- Secure online payments (deposit or full payment)
- In-app messaging and notifications
- Email/SMS updates

### Admin Features
- Manage cocktail packages and pricing
- Manage bartenders and staff
- Booking and availability calendar
- Assign staff to events
- Track payments and generate reports
- Inventory and equipment (optional)
- Customer service communication
- Analytics dashboard (revenue, usage, trends)

### Bartender/Staff Features
- View assigned events
- Receive event details and updates
- Confirm attendance
- In-app messaging with admin
- Access event checklists and requirements

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/McAnnison/PopSip.git
cd PopSip
```

2. **Set up the backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
```

3. **Create the database:**
```bash
mysql -u root -p < schema.sql
```

4. **Set up the frontend:**
```bash
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local with your backend API URL
```

### Running the Project

#### Start the backend server:
```bash
cd backend
npm run dev
```
The backend API will run on [http://localhost:5000](http://localhost:5000)

#### Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## API Documentation

### Available Endpoints

#### Packages
- `GET /api/packages` - Get all cocktail packages
- `GET /api/packages/:id` - Get specific package
- `POST /api/packages` - Create new package (admin)

#### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking

See the backend README for more details.

---

## Database Schema

The database includes the following main tables:

- **users** - User accounts
- **bartenders** - Bartender profiles
- **packages** - Cocktail packages
- **cocktails** - Cocktail recipes
- **bookings** - Event bookings
- **staff_assignments** - Bartender assignments to events
- **payments** - Payment records
- **messages** - Communication between users

See `backend/schema.sql` for the complete database structure with sample data.

---

## Development

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

### Project Conventions

- Use TypeScript for type safety
- Follow existing code structure and naming conventions
- Write meaningful commit messages
- Test your changes before committing

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mixmaster
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

---

## Contributing

1. Fork the repository
2. Create a new feature branch
3. Commit changes with clear messages
4. Submit a pull request

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Support

For questions or issues, please open an issue on GitHub or contact the development team.
