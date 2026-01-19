# Contributing Guide

Thank you for your interest in contributing to Pokemon Challenge! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

---

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Yarn or npm
- Docker (optional but recommended)
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/pokemon-challenge.git
cd pokemon-challenge

# Option 1: Docker (Recommended)
docker-compose up --build

# Option 2: Local Development
# Backend
cd backend
yarn install
yarn prisma:migrate
yarn dev

# Frontend (in another terminal)
cd frontend
yarn install
yarn dev
```

---

## 💻 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch (if using)
- `feature/<name>` - New features
- `fix/<name>` - Bug fixes
- `docs/<name>` - Documentation updates

### Creating a Feature

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes
# ... edit files ...

# Test your changes
yarn test

# Commit with conventional commits
git add .
git commit -m "feat: add your feature description"

# Push and create Pull Request
git push origin feature/your-feature-name
```

---

## 🧪 Testing

### Run All Tests

```bash
# Backend
cd backend
yarn test
yarn test:coverage

# Frontend
cd frontend
yarn test
yarn test:ui
yarn test:coverage
```

### Writing Tests

**Backend (Vitest):**

```typescript
describe("FavoritesService", () => {
  test("should create a favorite list", async () => {
    const result = await service.createFavoriteList([1, 2, 3]);
    expect(result.pokemonIds).toEqual([1, 2, 3]);
  });
});
```

**Frontend (Vitest + Testing Library):**

```typescript
describe('Button', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Test Requirements

- All new features must include tests
- Maintain > 80% code coverage
- All tests must pass before merging
- Write meaningful test descriptions

---

## 📝 Commit Convention

We use **Conventional Commits** specification:

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(backend): add Pokemon type filtering
fix(frontend): resolve toast animation bug
docs: update README with Docker instructions
test(backend): add tests for favorites service
chore(deps): update dependencies to latest versions
```

### Scope (optional but recommended)

- `backend` - Backend changes
- `frontend` - Frontend changes
- `docker` - Docker configuration
- `deps` - Dependencies

---

## 🔄 Pull Request Process

### Before Creating a PR

1. ✅ Update your branch with latest main
2. ✅ Run all tests locally
3. ✅ Run linter and fix issues
4. ✅ Update documentation if needed
5. ✅ Add tests for new features

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe how you tested your changes

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Tests pass
- [ ] Linter passes
- [ ] Documentation updated
- [ ] Commits follow convention
```

### Review Process

1. Create PR with clear description
2. Wait for CI checks to pass
3. Request review from maintainers
4. Address review comments
5. Squash and merge when approved

---

## 🎨 Code Style

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types when possible
- Use interfaces for object types
- Use enums for constants

### Formatting

- **ESLint**: `yarn lint` to check
- **Prettier**: Automatic formatting
- **Line length**: Max 100 characters
- **Indentation**: 2 spaces

### Naming Conventions

```typescript
// Files: kebab-case
favorites.service.ts;
pokemon - card.tsx;

// Components: PascalCase
function PokemonCard() {}

// Functions/Variables: camelCase
const getUserData = () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_FAVORITES = 50;

// Types/Interfaces: PascalCase
interface PokemonType {}
```

### Best Practices

**Backend:**

- Use async/await over promises
- Handle errors properly
- Validate all inputs
- Use Prisma for database queries
- Write meaningful error messages

**Frontend:**

- Use functional components
- Use custom hooks for logic
- Keep components small and focused
- Use TypeScript interfaces for props
- Avoid inline styles (use Tailwind)

---

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**:
   - Step 1
   - Step 2
   - Expected result
   - Actual result
3. **Environment**:
   - OS (Windows/Mac/Linux)
   - Node version
   - Browser (if frontend)
4. **Screenshots**: If applicable
5. **Logs**: Relevant error logs

### Example

```markdown
**Bug**: Toast notifications don't disappear

**Steps to Reproduce**:

1. Add Pokemon to favorites
2. Wait for toast to appear
3. Toast stays on screen forever

**Expected**: Toast should disappear after 3 seconds
**Actual**: Toast never disappears

**Environment**:

- Windows 11
- Chrome 120
- Node 20.10
```

---

## ✨ Feature Requests

When requesting features, include:

1. **Problem**: What problem does this solve?
2. **Solution**: How should it work?
3. **Alternatives**: Other solutions considered
4. **Context**: Screenshots, mockups, examples

---

## 📚 Documentation

- Update README if adding features
- Add JSDoc comments for complex functions
- Update API documentation for endpoint changes
- Add examples for new components

---

## 🎯 Areas for Contribution

### High Priority

- [ ] User authentication system
- [ ] Pokemon battle simulator
- [ ] Team builder feature
- [ ] Dark mode support
- [ ] Progressive Web App (PWA)

### Medium Priority

- [ ] Export favorites as PDF
- [ ] Social media sharing
- [ ] Multiple language support
- [ ] Pokemon stats comparison
- [ ] Evolution chains

### Low Priority

- [ ] Pokemon of the day
- [ ] Achievements system
- [ ] Email notifications
- [ ] Advanced filters
- [ ] Custom themes

---

## 📞 Questions?

- **Issues**: Open a GitHub issue with `question` label
- **Discussions**: Use GitHub Discussions
- **Documentation**: Check README files

---

## 🙏 Thank You!

Your contributions make this project better! 🎉

Whether you're fixing bugs, adding features, improving documentation, or helping others, every contribution is valuable and appreciated.

Happy coding! 🚀
