import { PrismaClient } from '../../src/generated/prisma/client';
import { seedDatabase } from './database.seed';
import { seedFlashcards } from './flashcards.seed';
import { seedUsers } from './users.seed';
import { seedWords } from './words.seed';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  console.log('🌱 Seeding database...\n');

  const users = await seedUsers(prisma);
  const words = await seedWords(prisma, users.adminUser.id);
  await seedFlashcards(prisma, users, words);
  await seedDatabase(prisma);

  console.log('\n🎉 Seeding complete!');
};

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
