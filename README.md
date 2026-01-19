# 🎮 Pokemon Challenge

Full-stack application for browsing Pokemon, managing favorites, and sharing lists with unique codes.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-20-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

## ✨ Features

- 🔍 Search Pokemon by name with debounced input
- 🎨 Filter by 18 Pokemon types
- ⭐ Save up to 50 favorite Pokemon (localStorage)
- 🔗 Share favorites via unique 8-character codes
- 📱 Responsive design (mobile, tablet, desktop)
- 🐳 Fully Dockerized
- 🧪 106 tests (63 backend + 43 frontend)

## 🚀 Quick Start (Docker - Recommended)

```bash
# Clone repository
git clone https://github.com/yourusername/pokemon-challenge.git
cd pokemon-challenge

# Start with Docker Compose
docker-compose up --build

# Access the app
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001
```

**That's it!** 🎉 No need to install Node, dependencies, or setup database.

## 🛠️ Tech Stack

**Backend:**

- Node.js 20 + Express + TypeScript
- Prisma ORM + SQLite
- Clean Architecture
- 63 tests (81% coverage)

**Frontend:**

- React 18 + TypeScript + Vite
- Tailwind CSS (Pokemon-themed colors)
- Zustand (state management)
- React Router
- 43 tests

**DevOps:**

- Docker + Docker Compose
- Multi-stage builds
- Health checks
- Volume persistence

## 📁 Project Structure

```
pokemon-challenge/
├── backend/              # Node.js API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── ...
│   ├── prisma/           # Database schema
│   └── tests/            # 63 tests
│
├── frontend/             # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── ...
│   └── src/test/         # 43 tests
│
└── docker-compose.yml    # Docker orchestration
```

## 📖 Local Development (Without Docker)

### Backend

```bash
cd backend
yarn install
yarn prisma:migrate
yarn dev  # http://localhost:3001
```

### Frontend

```bash
cd frontend
yarn install
yarn dev  # http://localhost:5173
```

## 🧪 Testing

```bash
# Backend
cd backend
yarn test
yarn test:coverage

# Frontend
cd frontend
yarn test
yarn test:ui
```

## 🐳 Docker Commands

```bash
# Start
docker-compose up

# Start with rebuild
docker-compose up --build

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Stop and remove volumes (⚠️ deletes database)
docker-compose down -v
```

## 📚 Documentation

- [Backend README](./backend/README.md) - API documentation
- [Frontend README](./frontend/README.md) - Component documentation
- [Docker Guide](./DOCKER_GUIDE.md) - Detailed Docker setup

## 🎯 Features Showcase

### Home Page

- Browse all Pokemon with infinite scroll
- Search by name (debounced)
- Filter by type
- Add/remove favorites with toast notifications

### Favorites Page

- View saved Pokemon (max 50)
- Remove individual favorites
- Clear all with confirmation modal
- Save and generate shareable code

### Share Page

- Display your saved code
- Copy code to clipboard
- Load favorites from code
- URL support: `/share?code=ABC12345`

## 🏗️ Architecture

Both frontend and backend follow **Clean Architecture**:

```
Presentation (UI/Controllers)
        ↓
Application (Hooks/Services)
        ↓
Domain (Business Logic)
        ↓
Infrastructure (API/Repositories)
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 👨‍💻 Developer

Oscar Armoa
Developed for **FullTimeForce Challenge** - January 2026

---

**⭐ If you found this project useful, give it a star!**
