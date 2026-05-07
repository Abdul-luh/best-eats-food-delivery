# 🍔 Best Eats — Multi-Vendor Food Delivery Platform

A modern, full-stack food delivery and commerce platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **NextAuth.js**, **PostgreSQL**, and **Zustand**. This is a senior-level, production-ready architecture featuring role-based access control, real-time cart management, Stripe payment integration, and separate dashboards for customers, vendors, and administrators.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [State Management](#state-management)
- [Authentication & Authorization](#authentication--authorization)
- [Payment Integration](#payment-integration)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Styling & Design System](#styling--design-system)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Future Enhancements](#future-enhancements)

---

## Overview

**Best Eats** is a comprehensive food delivery platform that connects customers with local restaurants. The application features a polished, responsive UI with smooth animations, dark/light theme support, and a complete commerce workflow including cart management, checkout with Stripe payments, order tracking, and administrative oversight.

The platform is built with a **mobile-first** approach and includes three distinct user roles:
- **Customers** – Browse restaurants, order food, track deliveries
- **Vendors** – Manage menus, view orders, track revenue
- **Admins** – Platform oversight, user/vendor management, fraud detection

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  (Next.js 14 - App Router, React 18, TypeScript)            │
├─────────────────────────────────────────────────────────────┤
│                       State Layer                           │
│  (Zustand stores - Cart, Auth, UI with localStorage sync)   │
├─────────────────────────────────────────────────────────────┤
│                      API Layer                              │
│  (Next.js API Routes, NextAuth.js, Stripe, Prisma Client)   │
├─────────────────────────────────────────────────────────────┤
│                      Database                               │
│  (PostgreSQL via Prisma ORM with comprehensive schema)      │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

- **Next.js App Router** – Leverages React Server Components, nested layouts, and file-system routing for optimal performance and SEO
- **Prisma ORM** – Type-safe database access with auto-generated client and migrations support
- **NextAuth.js** – Full-featured authentication with JWT sessions, credential provider, and Prisma adapter
- **Zustand** – Lightweight, performant state management with middleware support (persist)
- **Stripe** – Secure payment processing with PaymentIntent workflow
- **Tailwind CSS** – Utility-first styling with custom design tokens and dark mode support

---

## Features

### 🛍️ Customer Features

- **Restaurant Discovery** – Browse restaurants with ratings, delivery times, and categories
- **Menu Browsing** – Filter items by category, view detailed product information
- **Smart Cart** – Restaurant-specific cart with quantity management, auto-clear on restaurant switch
- **Checkout Flow** – Multi-step checkout (Address → Payment → Review) with Stripe integration
- **Order Tracking** – Real-time status updates from "Order Placed" to "Delivered"
- **Favorites** – Save favorite restaurants for quick access
- **Address Management** – Multiple saved addresses with default selection

### 🏪 Vendor Features

- **Product Management** – CRUD operations for menu items with inventory tracking
- **Order Dashboard** – View and manage incoming orders with status updates
- **Analytics** – Revenue charts, order statistics, and performance metrics
- **Payout Management** – Track earnings and withdrawal requests
- **Real-time Revenue** – Daily revenue tracking displayed in sidebar

### 🛡️ Admin Features

- **Platform Overview** – GMV, active users, daily orders, security flags
- **User Management** – Full CRUD for customer and vendor accounts
- **Vendor Oversight** – Approve/disable vendors, view restaurant performance
- **Order Oversight** – Monitor all platform orders and intervene if needed
- **Fraud Center** – Flag suspicious activities and security monitoring
- **Payment Logs** – View all transactions and payout records
- **System Reports** – Generate comprehensive platform reports
- **Global Settings** – Configure platform-wide settings

### 🎨 UI/UX Features

- **Responsive Design** – Mobile-first with breakpoints at 640px, 768px, 1024px
- **Dark/Light Mode** – System-aware theme toggle with persistent preference
- **Smooth Animations** – Fade-in, slide-up, and custom keyframe animations
- **Premium Shadows** – Custom `shadow-premium` and `shadow-premium-hover` utilities
- **Glassmorphism** – Frosted glass effects for overlays and modals
- **Cart Drawer** – Slide-out cart panel with smooth transitions
- **Mobile Navigation** – Hamburger menu with slide-out drawer

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|----------|
| **Framework** | Next.js | 14.2.0 | React framework with App Router |
| **Language** | TypeScript | 6.0.3 | Type safety |
| **Styling** | Tailwind CSS | 3.3.2 | Utility-first CSS |
| **State** | Zustand | 5.0.12 | Client-side state management |
| **Database** | PostgreSQL | - | Relational database |
| **ORM** | Prisma | 7.8.0 | Type-safe database access |
| **Auth** | NextAuth.js | 4.24.14 | Authentication & sessions |
| **Payments** | Stripe | 22.1.0 | Payment processing |
| **Charts** | Recharts | 3.8.1 | Data visualization |
| **Forms** | React Hook Form | 7.75.0 | Form handling |
| **Validation** | Zod | 4.4.2 | Schema validation |
| **Icons** | Lucide React | 0.474.0 | Icon library |
| **Notifications** | React Hot Toast | 2.6.0 | Toast notifications |
| **Security** | Bcrypt.js | 3.0.3 | Password hashing |

---

## Project Structure

```
Food-website/
├── app/                              # Next.js App Router root
│   ├── (auth)/                       # Auth routes (login, signup)
│   │   ├── layout.tsx               # Auth layout (no sidebar/navbar)
│   │   ├── login/page.tsx           # Login page
│   │   └── signup/page.tsx          # Signup page
│   │
│   ├── (customer)/                  # Customer routes group
│   │   ├── restaurants/
│   │   │   └── [id]/page.tsx        # Restaurant detail page
│   │   ├── orders/
│   │   │   └── [id]/page.tsx        # Order tracking page
│   │   └── checkout/page.tsx        # Checkout page
│   │
│   ├── admin/                       # Admin dashboard
│   │   ├── layout.tsx               # Admin layout with sidebar
│   │   ├── page.tsx                 # Admin overview
│   │   ├── users/page.tsx           # User management
│   │   └── vendors/page.tsx         # Vendor management
│   │
│   ├── vendor/                      # Vendor dashboard
│   │   ├── layout.tsx               # Vendor layout with sidebar
│   │   ├── page.tsx                 # Vendor overview
│   │   └── products/page.tsx        # Product management
│   │
│   ├── api/                         # API routes
│   │   ├── auth/
│   │   │   ├── [...nextauth]/       # NextAuth.js handler
│   │   │   └── signup/route.ts      # Signup API
│   │   └── checkout/route.ts        # Stripe checkout handler
│   │
│   ├── layout.tsx                   # Root layout (with Providers)
│   ├── page.tsx                     # Homepage
│   └── globals.css                  # Global styles
│
├── components/                      # Reusable components
│   ├── cart/
│   │   └── CartDrawer.tsx           # Slide-out cart panel
│   ├── home/
│   │   ├── HeroSection.tsx          # Homepage hero
│   │   ├── PopularFoods.tsx         # Popular items section
│   │   ├── FeaturedRestaurants.tsx  # Featured restaurants
│   │   └── CategoryRow.tsx          # Category browser
│   ├── layout/
│   │   ├── Navbar.tsx               # Main navigation
│   │   ├── Footer.tsx               # Site footer
│   │   ├── AdminSidebar.tsx         # Admin navigation
│   │   └── VendorSidebar.tsx        # Vendor navigation
│   ├── restaurant/
│   │   └── RestaurantCard.tsx       # Restaurant card component
│   ├── ui/                          # Shadcn-style UI components
│   │   ├── card.tsx                 # Card component
│   │   ├── button.tsx               # Button component
│   │   ├── input.tsx                # Input component
│   │   ├── badge.tsx                # Badge component
│   │   ├── avatar.tsx               # Avatar component
│   │   ├── rating.tsx               # Rating component
│   │   ├── spinner.tsx              # Loading spinner
│   │   └── skeleton.tsx             # Skeleton loader
│   └── providers/                   # React context providers
│       ├── index.tsx                # Combined providers
│       └── theme-provider.tsx       # Dark/light theme provider
│
├── lib/                             # Core libraries and utilities
│   ├── auth.ts                      # NextAuth configuration
│   ├── db.ts                        # Prisma client instance
│   ├── store/                       # Zustand stores
│   │   ├── useCartStore.ts          # Cart state management
│   │   ├── useAuthStore.ts          # Authentication state
│   │   └── useUIStore.ts            # UI state (theme, drawers)
│   └── utils/                       # Utility functions
│       ├── cn.ts                    # Class name merging
│       ├── formatters.ts            # Price/date formatting
│       └── validators.ts            # Form validation
│
├── prisma/                          # Prisma ORM
│   └── schema.prisma                # Database schema (299 lines)
│
├── public/                          # Static assets
│   └── assets/
│       └── images/                  # Local images
│
├── .env.local                       # Environment variables
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies and scripts
```

---

## Data Models

The database schema includes 15+ models covering all aspects of the platform:

### Core Models
- **User** – Customers, vendors, dispatchers, admins with role-based access
- **Restaurant** – Vendor-owned restaurants with location, hours, and settings
- **Product** – Menu items with pricing, inventory, and category associations
- **Category** – Restaurant-specific food categories

### Commerce Models
- **Cart** & **CartItem** – Shopping cart with restaurant isolation
- **Order** – Customer orders with status tracking
- **OrderItem** – Individual items within orders
- **Payment** – Payment records linked to Stripe
- **Address** – Customer saved addresses

### Business Models
- **Review** – Customer reviews and ratings
- **Coupon** – Discount codes and promotions
- **VendorPayout** – Vendor earnings and withdrawals
- **Notification** – User notifications
- **AuditLog** – System audit trail

### Auth Models (NextAuth)
- **Account** – OAuth accounts
- **Session** – User sessions

---

## State Management

### Zustand Stores

#### 1. **Cart Store** (`useCartStore`)
- **Features**: Add/remove items, update quantities, restaurant isolation
- **Persistence**: `localStorage` (key: `cart-storage`)
- **Key Logic**: Prevents mixing items from different restaurants

```typescript
interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}
```

#### 2. **Auth Store** (`useAuthStore`)
- **Features**: User session management
- **Persistence**: `localStorage` (key: `auth-storage`)
- **Integration**: Works with NextAuth.js for server-side validation

```typescript
interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}
```

#### 3. **UI Store** (`useUIStore`)
- **Features**: Theme, cart drawer, sidebar state
- **Persistence**: `localStorage` (key: `ui-storage`)
- **Default**: Dark mode enabled

```typescript
interface UIState {
  isDarkMode: boolean;
  isCartOpen: boolean;
  isSidebarOpen: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}
```

---

## Authentication & Authorization

### Authentication Flow

1. **Credentials Provider** – Email/password login with bcrypt hashing
2. **JWT Sessions** – Stateless authentication with encrypted tokens
3. **Prisma Adapter** – Automatic session storage in database
4. **Role-Based Access** – User roles: `CUSTOMER`, `VENDOR`, `DISPATCHER`, `ADMIN`

### Auth Configuration (`lib/auth.ts`)

```typescript
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [CredentialsProvider({ ... })],
  callbacks: {
    jwt: ({ token, user }) => { /* Attach role to token */ },
    session: ({ session, token }) => { /* Pass role to session */ }
  }
}
```

### Protected Routes

- **Admin routes** (`/admin/*`) – Require `ADMIN` role
- **Vendor routes** (`/vendor/*`) – Require `VENDOR` role
- **Customer routes** – Require authentication for checkout/orders

---

## Payment Integration

### Stripe Checkout Flow

1. **Cart Review** – Customer reviews items in cart drawer
2. **Checkout Page** – Multi-step form (Address → Payment → Confirm)
3. **Order Creation** – Creates order in database with `PENDING` status
4. **Payment Intent** – Creates Stripe PaymentIntent with order metadata
5. **Payment Record** – Stores payment details linked to order
6. **Confirmation** – Redirects to order tracking page

### API Endpoint: `POST /api/checkout`

```typescript
- Validates user session
- Creates order with items, totals, and tax
- Generates Stripe PaymentIntent
- Records payment in database
- Returns `client_secret` for Stripe Elements
```

**Fee Structure**:
- Delivery Fee: $5.00 (mock)
- Tax: 10% of subtotal
- Total = Subtotal + Delivery + Tax

---

## Pages & Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Homepage with hero, menu, categories |
| `/login` | `app/(auth)/login/page.tsx` | Login form with role selection |
| `/signup` | `app/(auth)/signup/page.tsx` | Signup form (Student/Vendor/Dispatcher) |

### Customer Routes (Authenticated)

| Route | Component | Description |
|-------|-----------|-------------|
| `/restaurants/[id]` | `app/(customer)/restaurants/[id]/page.tsx` | Restaurant detail with menu |
| `/checkout` | `app/(customer)/checkout/page.tsx` | Multi-step checkout flow |
| `/orders/[id]` | `app/(customer)/orders/[id]/page.tsx` | Order tracking with timeline |

### Admin Routes (Role: ADMIN)

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin` | `app/admin/page.tsx` | Platform overview dashboard |
| `/admin/users` | `app/admin/users/page.tsx` | User management |
| `/admin/vendors` | `app/admin/vendors/page.tsx` | Vendor management |

### Vendor Routes (Role: VENDOR)

| Route | Component | Description |
|-------|-----------|-------------|
| `/vendor` | `app/vendor/page.tsx` | Vendor overview dashboard |
| `/vendor/products` | `app/vendor/products/page.tsx` | Product management |

---

## Components

### Layout Components

#### **Navbar** (`components/layout/Navbar.tsx`)
- Responsive navigation with mobile drawer
- Delivery/Pickup toggle
- Search bar with auto-focus
- Cart button (hidden on mobile)
- User authentication state integration

#### **AdminSidebar** (`components/layout/AdminSidebar.tsx`)
- Sticky sidebar navigation
- 9 menu items (Overview, Users, Vendors, Orders, etc.)
- Quick stats panel (Total GMV)
- Sign out functionality

#### **VendorSidebar** (`components/layout/VendorSidebar.tsx`)
- Vendor-specific navigation
- 6 menu items (Overview, Orders, Products, etc.)
- Daily revenue display
- Dark/light theme aware

### Cart Components

#### **CartDrawer** (`components/cart/CartDrawer.tsx`)
- Slide-out panel from right
- Cart item list with quantity controls
- Real-time subtotal calculation
- Checkout button
- Empty state handling

### Home Components

- **HeroSection** – Full-width banner with overlay text
- **PopularFoods** – Grid of trending items
- **FeaturedRestaurants** – Prominent restaurant showcases
- **CategoryRow** – Horizontal scrollable categories

### UI Components (Shadcn-style)

- **Card** – Elevated container with hover effects
- **Button** – Multiple variants (primary, secondary, ghost, brand)
- **Input** – Form inputs with validation states
- **Badge** – Status indicators and tags
- **Avatar** – User/profile images
- **Rating** – Star rating display
- **Spinner** – Loading indicator
- **Skeleton** – Content placeholders

---

## Styling & Design System

### Color Palette

**Primary**: Orange (`#f97316`, `#ea580c`, `#c2410c`)
- Used for accents, CTAs, active states

**Background**: Light/Dark adaptive
- Light: `hsl(0 0% 100%)`
- Dark: `hsl(222.2 84% 4.9%)`

**Card**: Elevated surfaces with shadows
- Light: `hsl(0 0% 100%)`
- Dark: `hsl(222.2 84% 4.9%)`

**Muted**: Subtle backgrounds
- Light: `hsl(210 40% 96.1%)`
- Dark: `hsl(217.2 32.6% 17.5%)`

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: Regular, Medium, Semibold, Bold, Black
- **Sizes**: Responsive from `text-sm` to `text-7xl`

### Shadows

- **shadow-premium**: `0 10px 30px -10px rgba(0,0,0,0.1)`
- **shadow-premium-hover**: `0 20px 40px -15px rgba(0,0,0,0.15)`

### Animations

- **fade-in**: 0.3s ease-out
- **slide-up**: 0.4s ease-out
- **bounce-slow**: 3s infinite ease-in-out
- **accordion-down/up**: 0.2s ease-out

### Responsive Breakpoints

- **sm**: 640px (mobile landscape, small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large screens)

---

## Database Schema

### Key Tables

#### Users
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String?
  role          UserRole  @default(CUSTOMER)
  restaurant    Restaurant?
  orders        Order[]
  addresses     Address[]
}
```

#### Restaurants
```prisma
model Restaurant {
  id             String   @id @default(cuid())
  name           String
  description    String?
  rating         Float    @default(0)
  deliveryFee    Float    @default(0)
  minOrder       Float    @default(0)
  deliveryTime   Int      @default(30)
  owner          User     @relation("VendorRestaurant")
  products       Product[]
  orders         Order[]
}
```

#### Products
```prisma
model Product {
  id           String   @id @default(cuid())
  name         String
  description  String?
  price        Float
  image        String?
  isAvailable  Boolean  @default(true)
  inventory    Int      @default(0)
  category     Category @relation(fields: [categoryId], references: [id])
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
}
```

#### Orders
```prisma
model Order {
  id            String      @id @default(cuid())
  orderNumber   String      @unique
  userId        String
  restaurantId  String
  status        OrderStatus @default(PENDING)
  totalAmount   Float
  subtotal      Float
  deliveryFee   Float
  tax           Float
  items         OrderItem[]
  address       Address     @relation(fields: [addressId], references: [id])
  payment       Payment?    @relation(fields: [paymentId], references: [id])
}
```

#### Order Status Enum
```prisma
enum OrderStatus {
  PENDING
  ACCEPTED
  PREPARING
  READY
  PICKED_UP
  DELIVERED
  CANCELLED
}
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (local or remote)
- **Stripe** account (for payment testing)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Abdul-luh/Food-website.git
cd Food-website
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Or run migrations (production)
npx prisma migrate dev --name init
```

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server with hot reload |
| `build` | `next build` | Create production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint checks |
| `format` | `prettier --write .` | Format code with Prettier |
| `db:push` | `prisma db push` | Push schema to database |
| `db:studio` | `prisma studio` | Open Prisma Studio GUI |
| `db:generate` | `prisma generate` | Generate Prisma client |
| `db:migrate` | `prisma migrate dev` | Run database migrations |

---

## Future Enhancements

### High Priority

- [ ] **Real-time Order Updates** – WebSocket integration for live order status
- [ ] **Payment Webhooks** – Stripe webhook handlers for payment confirmation
- [ ] **Email Notifications** – Order confirmations, status updates via Nodemailer
- [ ] **Password Reset** – Forgot password flow with email verification
- [ ] **Social Login** – Google, Facebook, Apple OAuth providers
- [ ] **Image Upload** – Cloudinary integration for product/restaurant images

### Medium Priority

- [ ] **Search & Filters** – Advanced restaurant search with filters
- [ ] **Wishlist** – Save favorite items for later
- [ ] **Referral System** – Invite friends with referral codes
- [ ] **Loyalty Program** – Points and rewards system
- [ ] **Delivery Tracking** – Real-time GPS tracking with maps
- [ ] **Reviews & Ratings** – Customer reviews for restaurants and products
- [ ] **Chat Support** – In-app messaging with vendors/support

### Low Priority

- [ ] **Multi-language** – i18n internationalization
- [ ] **Multi-currency** – Currency conversion and selection
- [ ] **Advanced Analytics** – Vendor performance dashboards
- [ ] **Promotions** – Flash sales, BOGO deals
- [ ] **Subscription Plans** – Monthly meal plans
- [ ] **API Documentation** – Swagger/OpenAPI docs
- [ ] **Mobile Apps** – React Native or Expo mobile applications

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct.

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Next.js Team** – For the incredible framework
- **Prisma Team** – For the best ORM experience
- **Tailwind CSS** – For utility-first CSS
- **Shadcn UI** – For component inspiration
- **Stripe** – For seamless payment integration
- **Vercel** – For Next.js and deployment platform

---

## Support

For support, please open an issue on the [GitHub repository](https://github.com/Abdul-luh/Food-website/issues) or contact the maintainers.

---

**Built with ❤️ for the food delivery ecosystem**