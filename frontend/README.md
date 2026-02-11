# MixMaster Frontend

Next.js frontend application for the MixMaster cocktail catering booking platform.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library

## Project Structure

```
frontend/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
│   └── utils.ts        # Helper utilities
├── hooks/              # Custom React hooks
├── public/             # Static assets
├── .env.example        # Example environment variables
├── components.json     # shadcn/ui configuration
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API URL.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Component Library** - Pre-built UI components with shadcn/ui
- **Type Safety** - Full TypeScript support
- **Server Components** - Utilizing Next.js 16 app directory features
- **Optimized Performance** - Automatic code splitting and optimization

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Adding shadcn/ui Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

See [shadcn/ui documentation](https://ui.shadcn.com) for available components.

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000/api)

## License

MIT
