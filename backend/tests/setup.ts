import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Global test setup
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Keep error and warn for debugging
  error: jest.fn(),
  warn: jest.fn(),
  // Mock info and log
  info: jest.fn(),
  log: jest.fn(),
};

// Remove old test database if exists
const testDbPath = path.join(__dirname, '..', 'test.db');
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
}

// Create test database with migrations
try {
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: 'file:./test.db' },
    stdio: 'ignore',
  });
} catch (error) {
  console.error(
    'Failed to setup test database. Run: DATABASE_URL="file:./test.db" npx prisma migrate deploy'
  );
}
