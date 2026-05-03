# 🍔 Best Eats — Food Delivery Web App

A modern, responsive food delivery web application built with **Next.js 13**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**. Best Eats allows users to browse a categorised menu, filter food items by type and price range, and features a full authentication flow with role-based user types.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [State Management](#state-management)
- [Data Layer](#data-layer)
- [Styling](#styling)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Known Limitations & Future Work](#known-limitations--future-work)

---

## Overview

**Best Eats** is a frontend-only food delivery application that simulates a real-world food ordering platform. The homepage showcases a visually rich landing experience — including a full-width hero banner, promotional headline cards, a fully filterable menu grid, and a food-category browser. Users can sign up and log in, with their session state persisted to `localStorage` via Redux Toolkit slices.

The application uses **Next.js 13's App Router** with a clean, component-driven architecture and client-side state managed through Redux Toolkit.

---

## Features

### 🏠 Homepage
- **Full-width hero section** with a large background food image and bold "The Best Foods Delivered" headline overlay.
- **Promotional headline cards** — a 3-column responsive grid showing featured deals (e.g. "Sun's Out, Bogo's Out", "New Restaurant", "We Deliver Desserts"), each with a hover zoom animation on the card image.
- **Top Rated Menu section** — a dynamic, filterable grid of 16 food items.
- **Food Categories browser** — an 8-item category grid (Fast Food, Pizza, Wings, Indian, Latest Deals, Restaurant Rewards, Best Overall, Shipped Free) with icons.

### 🍽️ Menu Filtering
The menu grid supports two independent filtering dimensions:
- **Filter by type:** All · Burgers · Pizza · Salad · Chicken
- **Filter by price tier:** $ · $$ · $$$ · $$$$

Filters update the displayed items instantly using React's `useState` hook with no page reload.

### 🧭 Navigation
- **Responsive Navbar** with a slide-in mobile drawer (300px wide, animated with CSS transitions).
- Desktop layout includes a **Delivery / Pickup toggle**, a **search bar**, and a **Cart button**.
- Mobile layout triggers a full-screen backdrop with a slide-out side menu containing: Orders, Favourites, Wallet, Help, Best One, Login, and conditional "Invite Friends" / Logout links (shown only when a user is authenticated).
- Built entirely with `react-icons` (AiOutlineMenu, BsFillCartFill, TbTruckDelivery, MdFavorite, FaWallet, MdHelp, BsFillSaveFill, AiFillProfile, FaUserFriends, AiOutlineClose, AiOutlineSearch, AiFillTag).

### 🔐 Authentication
- **Login page** (`/login`) — form with Username, Email, Password, and User-Type fields. Dispatches to the `userAuthSlice` Redux store and persists data to `localStorage` under the key `foodieUser`.
- **Signup page** (`/signup`) — form with Email, Password, and User-Type (Student / Vendor / Dispatcher). Shares the same Redux slice as Login.
- **Legacy `login.tsx` component** — a simpler inline login widget (used earlier in development, currently unused in the main page) that connects to the `authSlice` and supports toggling a "Moderator" role.
- Auth state is stored in Redux and survives client-side navigation. `localStorage` is cleared on logout.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 13.4.4 | React framework (App Router) |
| [React](https://react.dev/) | 18.2.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.1.3 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3.3.2 | Utility-first styling |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 1.9.5 | Global state management |
| [React Redux](https://react-redux.js.org/) | 8.1.2 | React bindings for Redux |
| [react-icons](https://react-icons.github.io/react-icons/) | 4.10.1 | Icon library |
| [Next.js Image](https://nextjs.org/docs/app/building-your-application/optimizing/images) | (built-in) | Optimised image rendering |

---

## Project Structure

```
Food-website/
├── app/                          # Next.js 13 App Router root
│   ├── layout.tsx                # Root layout — wraps all pages in Redux Provider & Inter font
│   ├── page.tsx                  # Homepage — composes Navbar, Hero, HeadlineCards, MenuList, Categories
│   ├── globals.css               # Global Tailwind imports + base button styles
│   ├── favicon.ico
│   ├── login/
│   │   └── page.tsx              # /login route — full login form page
│   ├── signup/
│   │   └── page.tsx              # /signup route — signup form page
│   ├── api/
│   │   └── login/                # (Next.js API route placeholder)
│   └── components/
│       ├── login.tsx             # Legacy inline login widget (unused in current main page)
│       ├── Navbar/
│       │   └── navbar.tsx        # Responsive navbar with mobile slide drawer
│       ├── Hero/
│       │   └── Hero.tsx          # Full-width hero image section with text overlay
│       ├── HeadlineCards/
│       │   └── HeadlineCards.tsx # 3-column promotional card grid with hover effects
│       ├── MenuList/
│       │   └── MenuList.tsx      # Filterable 4-column food menu grid
│       ├── Categories/
│       │   └── Categories.tsx    # 8-item food category browser
│       └── Data/
│           └── Data.ts           # Static data exports: `data` (16 menu items) & `categories` (8 items)
│
├── redux/
│   ├── store.ts                  # Redux store configuration — combines AuthReducer & authorizeUser
│   ├── ReducProvider.tsx         # Client-side Redux <Provider> wrapper component
│   └── features/
│       ├── authSlice.ts          # Auth slice — isAuth, username, uid, isModerator; logIn/logOut/toggleModerator
│       └── userAuthSlice.ts      # User auth slice — userName, email, password, userType; logIn/logOut
│
├── public/
│   └── assets/
│       └── images/               # Local image assets used by Hero & HeadlineCards
│           ├── pexels-robin-stickel-70497.jpg       # Main hero image
│           ├── pexels-horizon-content-3738730.jpg   # Headline card image 1
│           └── pexels-ash-376464.jpg                # Headline card image 2
│
├── next.config.js                # Allows remote images from unsplash.com, cloudfront.net, pexels.com
├── tailwind.config.js            # Tailwind config — scans app/, pages/, components/ dirs
├── tsconfig.json
├── postcss.config.js
├── package.json
└── .eslintrc.json
```

---

## Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage with Navbar, Hero, HeadlineCards, MenuList, Categories |
| `/login` | `app/login/page.tsx` | Full login form — dispatches to `userAuthSlice` |
| `/signup` | `app/signup/page.tsx` | Signup form — same slice as login |

---

## Components

### `Navbar` (`app/components/Navbar/navbar.tsx`)
The primary navigation bar rendered at the top of every page.

- **Left side:** Hamburger menu button (toggles mobile drawer), "Best Eats" brand name, and a desktop-only Delivery / Pickup pill toggle.
- **Centre:** Responsive search input with a search icon — scales from 200px on mobile to 500px on large screens.
- **Right side:** A "Cart" button (hidden on mobile, visible on `md` and above).
- **Mobile Drawer:** A 300px slide-in panel from the left with CSS `duration-300` transition. Contains a darkened full-screen backdrop overlay and a list of navigation links. Conditionally renders a "Login" link (only when a user is logged in, as a logout trigger) and "Invite Friends" / "Logout" options.
- Reads `username` and `isAuth` from the `AuthReducer` slice in the Redux store.

### `Hero` (`app/components/Hero/Hero.tsx`)
A visually impactful full-width section up to 500px tall.

- Renders a local Pexels food photograph (`pexels-robin-stickel-70497.jpg`) using Next.js `<Image>` for optimisation.
- Overlays a semi-transparent dark (`bg-black/40`) layer with two large heading lines: "The **Best**" and "**Foods** Delivered", with the accent words styled in `text-orange-500`.
- Text scales responsively from `text-4xl` (mobile) through to `text-7xl` (large screens).

### `HeadlineCards` (`app/components/HeadlineCards/HeadlineCards.tsx`)
A promotional 3-column card grid (collapses to 1 column on mobile).

- Displays three hardcoded promo items: "Sun's Out, Bogo's Out", "New Restaurant", "We Deliver Desserts".
- Each card uses a local image, a semi-transparent black overlay, bold title text, subtitle text, and an "Order Now" button positioned at the bottom of the card.
- Smooth zoom effect on the image on group hover (`group-hover:scale-105 duration-500`).
- Uses the `TopMenu` TypeScript interface (`{ name: string, comment: string, img: StaticImageData }`).

### `MenuList` (`app/components/MenuList/MenuList.tsx`)
The core interactive component of the application.

- Initialises its `foods` state with all 16 items from `Data.ts`.
- **Type filter** buttons (All, Burgers, Pizza, Salad, Chicken) call `FilterType(category)` which filters the data array by the `category` field and updates state.
- **Price filter** buttons ($, $$, $$$, $$$$) call `filterPrice(price)` which filters by the `price` field.
- Renders filtered items in a responsive grid: 2 columns on mobile, 4 columns on `lg` screens.
- Each food card shows a 200px-tall image (via Next.js `<Image>`), food name in bold, and price tier in an orange badge.
- Card hover behaviour is partially implemented (`hover:csale-105` — note: this appears to be a typo for `hover:scale-105`).

### `Categories` (`app/components/Categories/Categories.tsx`)
A scrollable browse-by-category section displayed below the menu.

- Maps over the `categories` array (8 items) from `Data.ts`.
- Renders a 2-column (mobile) / 4-column (medium+) grid of category cards.
- Each card is a `bg-gray-100` rounded panel with the category name and a remote icon image (hosted on `duyt4h9nfnj50.cloudfront.net`).

---

## State Management

The app uses **Redux Toolkit** for global state. The Redux store is configured in `redux/store.ts` and provided to the entire component tree via the `ReduxProvider` wrapper in `app/layout.tsx`.

### Store Shape

```typescript
{
  AuthReducer: {        // from authSlice.ts
    value: {
      isAuth: boolean,
      username: string,
      uid: string,
      isModerator: boolean
    }
  },
  authorizeUser: {      // from userAuthSlice.ts
    value: {
      userName: string,
      email: string,
      password: string,
      userType: string  // "Student" | "Vendor" | "Dispatcher"
    }
  }
}
```

### `authSlice` (`redux/features/authSlice.ts`)

An earlier, simpler authentication slice used by the legacy `login.tsx` component and the `Navbar`.

| Action | Behaviour |
|---|---|
| `logIn(username: string)` | Sets `isAuth: true`, stores user object in `localStorage` under key `"user"` |
| `logOut()` | Clears `localStorage`, resets state to initial |
| `toggleModerator()` | Flips the `isModerator` boolean — supports a basic role-switching UI |

### `userAuthSlice` (`redux/features/userAuthSlice.ts`)

The more complete authentication slice used by the `/login` and `/signup` pages.

| Action | Behaviour |
|---|---|
| `logIn(payload: UserValue)` | Stores full user object (`userName`, `email`, `password`, `userType`) in Redux state and persists to `localStorage` under key `"foodieUser"` |
| `logOut()` | Clears `localStorage`, resets state to initial |

### Typed Hooks

A typed `useAppSelector` hook is exported from `redux/store.ts` using `TypedUseSelectorHook<RootState>` for type-safe state access across all components.

---

## Data Layer

All application data lives in `app/components/Data/Data.ts` as static TypeScript exports — there is no backend API or database in the current version.

### `data` — Menu Items (16 total)

```typescript
{
  id: number,
  name: string,
  category: "burger" | "pizza" | "salad" | "chicken",
  image: string,   // Unsplash CDN URL
  price: "$" | "$$" | "$$$" | "$$$$"
}
```

**Items by category:**
- **Burgers (4):** Double Cheeseburger ($$$$), Bacon Cheeseburger ($), Mushroom Burger ($$), Loaded Burger ($$$)
- **Pizza (4):** Feta & Spinach ($$), Supreme Pizza ($$$), Meat Lovers ($$$$), Cheese Pizza ($)
- **Salad (4):** Kale Salad ($$), Caesar Salad ($$$), Loaded Salad ($$$$), Fruit Salad ($)
- **Chicken (4):** Wings ($$), Baked Chicken ($$$$), Chicken Tenders ($), Chicken Kabob ($$$)

### `categories` — Browse Categories (8 total)

```typescript
{
  id: number,
  name: string,
  image: string   // CloudFront CDN URL
}
```

Categories: Fast Food, Pizza, Wings, Indian, Latest Deals, Restaurant Rewards, Best Overall, Shipped Free.

---

## Styling

- **Tailwind CSS v3.3.2** is the primary styling mechanism.
- The Inter font (from Google Fonts) is loaded via `next/font/google` and applied globally through the root layout.
- A single global Tailwind base layer override in `globals.css` applies border + rounded-xl + padding styling to all `<button>` elements.
- The colour palette is predominantly:
  - **Orange** (`orange-500`, `orange-600`) for accents, headings, and interactive button borders.
  - **Black / Gray** (`black`, `gray-200`, `gray-700`) for backgrounds and text.
- Responsive breakpoints used: `sm` (640px), `md` (768px), `lg` (1024px).
- Max content width is capped at `max-w-[1200px]` with `mx-auto` for consistent centering.
- The `next.config.js` whitelists three remote image domains for Next.js `<Image>` optimisation:
  - `images.unsplash.com` (menu item photos)
  - `duyt4h9nfnj50.cloudfront.net` (category icons)
  - `pexels.com` (hero / headline images)

---

## Getting Started

### Prerequisites

- Node.js **≥ 18** (recommended)
- npm or Yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdul-luh/Food-website.git
cd Food-website

# Install dependencies (using yarn — yarn.lock is included)
yarn install

# Or with npm
npm install
```

### Running the Development Server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Start the development server with hot reload |
| `build` | `next build` | Create an optimised production build |
| `start` | `next start` | Start the production server (requires `build` first) |
| `lint` | `next lint` | Run ESLint checks across the project |

---

## Known Limitations & Future Work

This project is a **frontend prototype / learning project**. Several features are partially implemented or planned:

| Area | Current State | Notes |
|---|---|---|
| **Authentication** | Client-side only, no real backend | Credentials are stored in `localStorage` in plain text — not suitable for production |
| **Cart** | UI button exists in Navbar | No cart state, add-to-cart logic, or checkout flow implemented |
| **Search** | Input renders in Navbar | No filtering or search logic wired up |
| **Delivery / Pickup toggle** | Rendered as static UI | Not connected to any state or logic |
| **Menu item cards** | Hover scale has a typo (`csale-105`) | Should be `scale-105` for the zoom animation to work |
| **Signup page** | No password confirmation field | The signup form doesn't include a `username` input despite the Redux slice expecting one |
| **Moderator role** | `toggleModerator` action exists | No moderator-specific UI or protected route has been built |
| **API routes** | `app/api/login/` folder exists | No handler file found — no server-side API implemented |
| **`login.tsx` component** | Exists in `/components` | Commented out / unused in the current `page.tsx`; superseded by the `/login` route |
| **Routing** | Only `/`, `/login`, `/signup` routes | No dedicated pages for Orders, Favourites, Wallet, or other sidebar links |

---

## License

This project is for educational and portfolio purposes.
