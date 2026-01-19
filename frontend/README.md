# Pokemon Challenge - Frontend

Modern React application for browsing Pokemon and managing favorites.

## 🚀 Quick Start

### Docker (Recommended)

```bash
# From project root
docker-compose up --build
```

### Local Development

```bash
yarn install
yarn dev  # http://localhost:5173
```

## ✨ Features

- 🔍 Search Pokemon by name (debounced)
- 🎨 Filter by 18 types
- ⭐ Save up to 50 favorites (localStorage)
- 🔗 Share lists via unique codes
- 📱 Fully responsive
- 🎨 Pokemon-themed colors
- 🧪 43 unit tests

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- Tailwind CSS
- Zustand (state management)
- React Router
- Axios (HTTP client)
- Vitest + Testing Library

## 📁 Structure

```
src/
├── pages/              # HomePage, FavoritesPage, SharePage
├── components/
│   ├── layout/         # Header, Layout
│   ├── shared/         # Button, Toast, Modal
│   └── pokemon/        # PokemonCard, Grid, Search
├── stores/            # Zustand stores
├── hooks/             # Custom React hooks
├── api/               # API clients
├── types/             # TypeScript types
├── utils/             # Helper functions
└── test/              # Test utilities
```

## 🎨 Custom Theme

Pokemon-themed Tailwind colors:

```javascript
colors: {
  pokemon: {
    red: '#EE1515',
    blue: '#0075BE',
    yellow: '#FFCB05',
  },
  type: {
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    // ... all 18 types
  }
}
```

## 📱 Pages

### Home (`/`)

- Browse all Pokemon
- Infinite scroll
- Search and filter
- Add/remove favorites

### Favorites (`/favorites`)

- View saved Pokemon
- Remove favorites
- Clear all (with modal)
- Save & share button

### Share (`/share`)

- Display your code
- Copy to clipboard
- Load favorites from code
- URL support: `/share?code=ABC12345`

## 🧪 Testing

```bash
# Run tests
yarn test

# UI mode (interactive)
yarn test:ui

# Coverage report
yarn test:coverage
```

**43 tests covering:**

- Utility functions (16 tests)
- Zustand store (13 tests)
- Button component (8 tests)
- PokemonCard component (6 tests)

## 🛠️ Scripts

```bash
yarn dev          # Development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn test         # Run tests
yarn lint         # Run ESLint
```

## 🏗️ Architecture

**Clean Architecture:**

```
Components (UI)
    ↓
Hooks (Application Logic)
    ↓
Stores (State Management)
    ↓
API (Infrastructure)
```

## 🔌 API Integration

Connects to backend at `http://localhost:3001/api`

Configure via `.env`:

```env
VITE_BACKEND_URL=http://localhost:3001/api
```

## 📦 Key Dependencies

**Production:**

- react, react-dom - UI framework
- react-router-dom - Routing
- zustand - State management
- axios - HTTP client
- lucide-react - Icons
- tailwindcss - Styling

**Development:**

- vite - Build tool
- typescript - Type safety
- vitest - Testing
- @testing-library/react - Component testing
- eslint, prettier - Code quality

## 🎯 State Management

Using Zustand for simplicity:

```typescript
// favorites.store.ts
const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  addFavorite: (pokemon) => { ... },
  removeFavorite: (id) => { ... },
  // ...
}));
```

## 🔄 Custom Hooks

```typescript
usePokemon(); // Fetch Pokemon data
useFavorites(); // Manage favorites
useDebounce(); // Debounced values
```

## 🎨 Components

**Shared:**

- Button, Toast, Modal, LoadingSpinner, ErrorMessage

**Pokemon:**

- PokemonCard, PokemonGrid, SearchBar, TypeFilter

**Layout:**

- Header, Footer, Layout

## 📱 Responsive Design

Breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🐳 Docker

Nginx serves the built static files:

- Multi-stage build
- Optimized bundle size
- Custom nginx config
- Health checks

---

**Part of the Pokemon Challenge project**
