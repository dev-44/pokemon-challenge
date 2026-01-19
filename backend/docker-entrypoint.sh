#!/bin/sh
set -e

echo "🔄 Syncing database schema..."
# db push crea las tablas inmediatamente basándose en tu schema.prisma
npx prisma db push --accept-data-loss

echo "✅ Database schema synced"
echo "🚀 Starting server..."

exec node dist/server.js