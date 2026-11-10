import fs from 'fs';
import path from 'path';
import { Item, ItemType, AssignmentStatus } from './types';
import { defaultItems } from './defaultData';
import { getPrismaClient } from './prisma';

const DATA_DIR = path.join(process.cwd(), 'data');
const JSON_FILE = path.join(DATA_DIR, 'items.json');

function ensureLocalDataFile(): Item[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(JSON_FILE)) {
      fs.writeFileSync(JSON_FILE, JSON.stringify(defaultItems, null, 2), 'utf-8');
      return defaultItems;
    }
    const raw = fs.readFileSync(JSON_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Error reading local data file, using default data:', error);
    return defaultItems;
  }
}

function saveLocalDataFile(items: Item[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(JSON_FILE, JSON.stringify(items, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving local data file:', error);
  }
}

export async function getDbStatus(): Promise<{
  isDatabaseConnected: boolean;
  driver: 'neon' | 'local';
}> {
  const prisma = getPrismaClient();
  if (!prisma) {
    return { isDatabaseConnected: false, driver: 'local' };
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { isDatabaseConnected: true, driver: 'neon' };
  } catch {
    return { isDatabaseConnected: false, driver: 'local' };
  }
}

export async function getAllItems(): Promise<Item[]> {
  const prisma = getPrismaClient();
  if (prisma) {
    try {
      const items = await prisma.item.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (items.length === 0) {
        // Auto seed default items into Neon
        for (const it of defaultItems) {
          await prisma.item.create({
            data: {
              title: it.title,
              slug: it.slug,
              type: it.type,
              summary: it.summary,
              description: it.description,
              category: it.category,
              subject: it.subject,
              lecturer: it.lecturer,
              semester: it.semester,
              status: it.status,
              grade: it.grade,
              lecturerFeedback: it.lecturerFeedback,
              repoUrl: it.repoUrl,
              demoUrl: it.demoUrl,
              fileUrl: it.fileUrl,
              coverImage: it.coverImage,
              techStack: it.techStack,
              featured: it.featured,
              createdAt: new Date(it.createdAt),
            },
          });
        }
        const seeded = await prisma.item.findMany({ orderBy: { createdAt: 'desc' } });
        return seeded as unknown as Item[];
      }
      return items as unknown as Item[];
    } catch (error) {
      console.warn('Prisma query failed, falling back to local file storage:', error);
    }
  }

  // Fallback to local file store
  return ensureLocalDataFile();
}

export async function getItemBySlug(slug: string): Promise<Item | null> {
  const prisma = getPrismaClient();
  if (prisma) {
    try {
      const item = await prisma.item.findUnique({
        where: { slug },
      });
      if (item) return item as unknown as Item;
    } catch (error) {
      console.warn('Prisma getItemBySlug failed:', error);
    }
  }

  const items = ensureLocalDataFile();
  return items.find((i) => i.slug === slug) || null;
}

export async function getItemById(id: string): Promise<Item | null> {
  const prisma = getPrismaClient();
  if (prisma) {
    try {
      const item = await prisma.item.findUnique({
        where: { id },
      });
      if (item) return item as unknown as Item;
    } catch (error) {
      console.warn('Prisma getItemById failed:', error);
    }
  }

  const items = ensureLocalDataFile();
  return items.find((i) => i.id === id) || null;
}

export async function createItem(data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> {
  const prisma = getPrismaClient();
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (prisma) {
    try {
      const created = await prisma.item.create({
        data: {
          title: data.title,
          slug,
          type: data.type,
          summary: data.summary,
          description: data.description,
          category: data.category,
          subject: data.subject,
          lecturer: data.lecturer,
          semester: data.semester,
          status: data.status,
          grade: data.grade,
          lecturerFeedback: data.lecturerFeedback,
          repoUrl: data.repoUrl,
          demoUrl: data.demoUrl,
          fileUrl: data.fileUrl,
          coverImage: data.coverImage,
          techStack: data.techStack,
          featured: data.featured,
        },
      });
      return created as unknown as Item;
    } catch (error) {
      console.warn('Prisma create failed, falling back to local file:', error);
    }
  }

  const items = ensureLocalDataFile();
  const newItem: Item = {
    ...data,
    id: `item-${Date.now()}`,
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  items.unshift(newItem);
  saveLocalDataFile(items);
  return newItem;
}

export async function updateItem(
  id: string,
  data: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Item | null> {
  const prisma = getPrismaClient();
  if (prisma) {
    try {
      const updated = await prisma.item.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
      return updated as unknown as Item;
    } catch (error) {
      console.warn('Prisma update failed, falling back to local file:', error);
    }
  }

  const items = ensureLocalDataFile();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  saveLocalDataFile(items);
  return items[index];
}

export async function deleteItem(id: string): Promise<boolean> {
  const prisma = getPrismaClient();
  if (prisma) {
    try {
      await prisma.item.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.warn('Prisma delete failed, falling back to local file:', error);
    }
  }

  const items = ensureLocalDataFile();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;

  saveLocalDataFile(filtered);
  return true;
}
