# Pokemon Challenge - Backend

REST API for managing Pokemon favorite lists with shareable codes.

## 🚀 Quick Start

### Docker (Recommended)

```bash
# From project root
docker-compose up --build
```

### Local Development

```bash
yarn install
yarn prisma:migrate
yarn dev
```

## 📡 API Endpoints

### Health Check

```
GET /health
```

### Create Favorite List

```
POST /api/favorites
Content-Type: application/json

{
  "pokemonIds": [1, 4, 7, 25, 150]
}

Response: { "uniqueCode": "ABC12345", "pokemonIds": [...] }
```

### Get Favorite List

```
GET /api/favorites/:code

Response: { "uniqueCode": "ABC12345", "pokemonIds": [...] }
```

## 🏗️ Architecture

**Clean Architecture:**

```
Controllers → Services → Repositories → Database
```

- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and validation
- **Repositories**: Data access layer
- **Database**: Prisma ORM + SQLite

## 📁 Structure

```
src/
├── controllers/        # HTTP handlers
├── services/          # Business logic
├── repositories/      # Data access
├── routes/            # API routes
├── middlewares/       # Error handling, CORS
├── config/            # Database, environment
├── types/             # TypeScript types
└── utils/             # Helpers

tests/                 # 63 tests (81% coverage)
prisma/               # Database schema
```

## 🧪 Testing

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

**Coverage:** 81.62%

- Repositories: 95%
- Services: 90%
- Controllers: 85%
- Utils: 100%

## 🛠️ Scripts

```bash
yarn dev              # Development server
yarn build            # Build for production
yarn start            # Run production server
yarn test             # Run tests
yarn prisma:migrate   # Run database migrations
yarn prisma:studio    # Open Prisma Studio
yarn lint             # Run ESLint
```

## ⚙️ Environment Variables

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
NODE_ENV=development
PORT=3001
```

## 🐳 Docker

The backend runs in a multi-stage Docker container:

1. **Build stage**: Compiles TypeScript, generates Prisma Client
2. **Production stage**: Runs migrations and starts server

## 📦 Dependencies

**Production:**

- express - Web framework
- @prisma/client - Database ORM
- cors - CORS middleware
- helmet - Security headers
- zod - Validation
- nanoid - Unique code generation

**Development:**

- typescript - Type safety
- jest - Testing framework
- ts-node - Development server
- prisma - Database management

## 🎯 Code Generation

Unique codes are:

- 8 characters long
- Alphanumeric (A-Z, 0-9)
- URL-safe
- Case-insensitive (stored as uppercase)

## 📊 Database Schema

```prisma
model FavoriteList {
  id          String   @id @default(uuid())
  uniqueCode  String   @unique
  pokemonIds  String   // JSON array
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔒 Security

- CORS enabled for localhost
- Helmet for security headers
- Input validation with Zod
- SQL injection prevention via Prisma
- Rate limiting configured (optional)

## 📈 Performance

- SQLite for fast local storage
- Prisma connection pooling
- Indexed unique codes
- Efficient JSON storage

---

**Part of the Pokemon Challenge project**
