#!/bin/sh
set -e

echo "í´„ Running database migrations..."
npx prisma migrate deploy

echo "âœ… Migrations completed"
echo "íº€ Starting server..."

exec node dist/server.js
