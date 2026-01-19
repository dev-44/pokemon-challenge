import { PrismaClient } from '@prisma/client';
import { config } from './environment';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: config.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (config.nodeEnv !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;

// Graceful shutdown
process.on('beforeExit', () => {
  void (async () => {
    await prisma.$disconnect();
  })();
});
