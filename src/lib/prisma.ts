import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

export function getPrismaClient(): PrismaClient | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim() === '' || dbUrl.includes('randompassword')) {
    return null;
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  try {
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: dbUrl.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
    });
    const adapter = new PrismaPg(pool);
    const client = new PrismaClient({ adapter });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = client;
      globalForPrisma.pool = pool;
    }

    return client;
  } catch (error) {
    console.warn('Prisma initialization fallback:', error);
    return null;
  }
}
