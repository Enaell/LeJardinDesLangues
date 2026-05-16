import { PrismaClient, Role } from '../../src/generated/prisma/client';
import * as argon2 from 'argon2';

export type SeededUsers = {
  adminUser: { id: string; };
  johnDoe: { id: string; };
  janeSmith: { id: string; };
  aliceJones: { id: string; };
  bobBrown: { id: string; };
  googleUser: { id: string; };
};

export const seedUsers = async (prisma: PrismaClient): Promise<SeededUsers> => {
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@lejardin.com' },
    update: {},
    create: {
      username: 'admin_user',
      email: 'admin@lejardin.com',
      emailVerified: true,
      passwordHash: await argon2.hash('Admin@1234!', { type: argon2.argon2id }),
      name: 'Admin User',
      nativeLanguage: 'fr',
      targetLanguage: 'en',
      timezone: 'UTC',
      preferences: { dailyGoal: 0, notifications: false, theme: 'light' },
      role: Role.ADMIN,
    },
  });

  const johnDoe = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      username: 'john_doe',
      email: 'john@example.com',
      emailVerified: true,
      passwordHash: await argon2.hash('John@1234!', { type: argon2.argon2id }),
      name: 'John Doe',
      nativeLanguage: 'en',
      targetLanguage: 'fr',
      timezone: 'America/New_York',
      preferences: { dailyGoal: 30, notifications: true, theme: 'light' },
    },
  });

  const janeSmith = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      username: 'jane_smith',
      email: 'jane@example.com',
      emailVerified: true,
      passwordHash: await argon2.hash('Jane@1234!', { type: argon2.argon2id }),
      name: 'Jane Smith',
      nativeLanguage: 'fr',
      targetLanguage: 'zh',
      timezone: 'Europe/Paris',
      preferences: { dailyGoal: 45, notifications: true, theme: 'dark' },
    },
  });

  const aliceJones = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      username: 'alice_jones',
      email: 'alice@example.com',
      emailVerified: true,
      passwordHash: await argon2.hash('Alice@1234!', { type: argon2.argon2id }),
      name: 'Alice Jones',
      nativeLanguage: 'en',
      targetLanguage: 'zh',
      timezone: 'UTC',
      preferences: { dailyGoal: 20, notifications: false, theme: 'light' },
    },
  });

  const bobBrown = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      username: 'bob_brown',
      email: 'bob@example.com',
      emailVerified: false,
      passwordHash: await argon2.hash('Bob@1234!', { type: argon2.argon2id }),
      name: 'Bob Brown',
      nativeLanguage: 'zh',
      targetLanguage: 'en',
      timezone: 'Asia/Shanghai',
      preferences: { dailyGoal: 60, notifications: true, theme: 'dark' },
    },
  });

  const googleUser = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      username: 'google_user',
      email: 'user@gmail.com',
      emailVerified: true,
      name: 'Google User',
      nativeLanguage: 'en',
      targetLanguage: 'fr',
      timezone: 'America/Los_Angeles',
      preferences: { dailyGoal: 25, notifications: true, theme: 'light' },
      oauthProvider: 'google',
      oauthId: '123456789',
    },
  });

  console.log('✅ Users seeded');

  // ─── User Language Levels ─────────────────────────────────────────────────

  const languageLevels = [
    // John Doe – native EN, learning FR
    { userId: johnDoe.id, languageCode: 'en', level: '10' },
    { userId: johnDoe.id, languageCode: 'fr', level: '3' },
    // Jane Smith – native FR, learning ZH, speaks EN
    { userId: janeSmith.id, languageCode: 'fr', level: '10' },
    { userId: janeSmith.id, languageCode: 'zh', level: '2' },
    { userId: janeSmith.id, languageCode: 'en', level: '7' },
    // Alice Jones – native EN, learning ZH
    { userId: aliceJones.id, languageCode: 'en', level: '10' },
    { userId: aliceJones.id, languageCode: 'zh', level: '4' },
    // Bob Brown – native ZH, learning EN
    { userId: bobBrown.id, languageCode: 'zh', level: '10' },
    { userId: bobBrown.id, languageCode: 'en', level: '5' },
    // Admin – native FR, speaks EN
    { userId: adminUser.id, languageCode: 'fr', level: '10' },
    { userId: adminUser.id, languageCode: 'en', level: '9' },
    // Google User – native EN, learning FR
    { userId: googleUser.id, languageCode: 'en', level: '10' },
    { userId: googleUser.id, languageCode: 'fr', level: '1' },
  ];

  for (const level of languageLevels) {
    await prisma.userLanguageLevel.upsert({
      where: { userId_languageCode: { userId: level.userId, languageCode: level.languageCode } },
      update: {},
      create: level,
    });
  }

  console.log('✅ Language levels seeded');

  return { adminUser, johnDoe, janeSmith, aliceJones, bobBrown, googleUser };
};
