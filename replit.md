# Personal CV Web Application

## Overview
A personal portfolio/CV web application with a public-facing site and admin dashboard for managing developer information, projects, and products.

## Current State
The application is fully functional with:
- Public pages (Home, Projects, Products, Contact)
- Admin dashboard with authentication
- PostgreSQL database for data persistence
- Dark/light theme toggle

## Tech Stack
- **Frontend**: React, Tailwind CSS, Shadcn UI, Wouter (routing), TanStack Query
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with environment variable credentials

## Project Structure
```
client/
  src/
    components/     # Reusable UI components
    pages/          # Page components
      dashboard/    # Admin dashboard pages
    hooks/          # Custom React hooks
    lib/            # Utility functions
server/
  routes.ts         # API endpoints
  storage.ts        # Database operations
  db.ts             # Database connection
shared/
  schema.ts         # Database schema & types
```

## Environment Variables
Required environment variables (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string (automatically set by Replit)
- `SESSION_SECRET` - Secret for session encryption
- `ADMIN_USERNAME` - Dashboard login username
- `ADMIN_PASSWORD` - Dashboard login password

## Key Features
1. **Public Pages**:
   - Home: Developer profile with photo, bio, contact info, social links
   - Projects: Grid display of projects with descriptions and links
   - Products: List of products/services offered
   - Contact: Contact information and social media links

2. **Admin Dashboard**:
   - Profile Management: Edit developer information
   - Projects Management: Add, edit, delete projects
   - Products Management: Add, edit, delete products

## API Endpoints
- `GET/POST/PUT /api/profile` - Profile operations
- `GET/POST /api/projects` - List/create projects
- `GET/PUT/DELETE /api/projects/:id` - Single project operations
- `GET/POST /api/products` - List/create products
- `GET/PUT/DELETE /api/products/:id` - Single product operations
- `POST /api/auth/login` - Dashboard login
- `POST /api/auth/logout` - Dashboard logout
- `GET /api/auth/check` - Check authentication status

## Running the Application
The application runs via the "Start application" workflow which executes `npm run dev`.

## User Preferences
- Simple authentication using environment variables
- PostgreSQL for data persistence
- Dashboard accessible at /login and /dashboard
