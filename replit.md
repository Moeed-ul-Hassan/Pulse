# Pulse HMS - AI Hospital Management System

## Overview

Pulse HMS is an AI-powered hospital management system built with a modern full-stack architecture. The application features a React frontend with TypeScript, an Express.js backend, and PostgreSQL database with Drizzle ORM. The system is designed for healthcare operations with role-based access control, patient management, appointment scheduling, and comprehensive security features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens and dark mode support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with consistent error handling
- **Middleware**: Custom logging, CORS, and request/response interceptors
- **Development**: Hot reload with tsx and Vite integration

### Database & ORM
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with type-safe queries
- **Connection**: Neon Database serverless PostgreSQL
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Shared schema definitions between client and server

## Key Components

### Authentication System
- **Multi-role authentication**: Admin, Doctor, Receptionist roles
- **Patient portal**: Phone + access code authentication
- **Session management**: Secure cookie-based sessions with connect-pg-simple
- **Seven-layer security**: Rate limiting, CSRF protection, input validation, encryption, audit trails, and threat detection

### UI Component System
- **Design System**: shadcn/ui components built on Radix UI primitives
- **Theming**: CSS custom properties with light/dark mode support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WAI-ARIA compliant components from Radix UI
- **Icons**: Lucide React icon library

### Patient Management
- **Patient records**: Comprehensive demographic and medical data
- **Unique patient IDs**: Auto-generated identification system
- **Search and filtering**: Advanced patient lookup capabilities
- **Medical history**: Complete patient care timeline

### Appointment System
- **Scheduling**: Flexible appointment booking with duration management
- **QR codes**: Digital check-in system
- **Status tracking**: Complete appointment lifecycle management
- **Integration**: Connected with patient and provider records

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express.js routes handle authentication and business logic
3. **Database Operations**: Drizzle ORM manages type-safe database interactions
4. **Response Handling**: Structured JSON responses with consistent error formats
5. **State Updates**: TanStack Query updates UI components automatically

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@tanstack/react-query**: Server state management
- **drizzle-orm & drizzle-zod**: Database ORM and validation
- **@radix-ui/***: Headless UI component primitives
- **react-hook-form**: Form state management
- **date-fns**: Date manipulation utilities

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast JavaScript bundling for production

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with HMR for frontend
- **Server Restart**: tsx for automatic backend reloading
- **Database**: Drizzle migrations for schema updates
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Production Build
- **Frontend**: Vite build generates optimized static assets
- **Backend**: ESBuild bundles server code for Node.js
- **Database**: Production PostgreSQL via Neon Database
- **Static Serving**: Express serves built frontend assets

### Configuration
- **TypeScript**: Shared tsconfig.json with path mapping
- **Module System**: ES modules throughout the stack
- **Build Scripts**: Separate dev, build, and start commands
- **Database Migrations**: Drizzle Kit handles schema versioning

The application follows a monorepo structure with clear separation between client, server, and shared code, enabling type safety across the entire stack while maintaining development efficiency.