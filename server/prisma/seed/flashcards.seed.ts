import { PrismaClient, Visibility, ValidationStatus, InteractionType, ShareType } from '../../src/generated/prisma/client';
import type { SeededUsers } from './users.seed';
import type { SeededWords } from './words.seed';

export type SeededFlashcards = { id: string; }[];

type FlashcardDef = {
  userKey: keyof SeededUsers;
  sourceWord: string;
  targetWord: string;
  title: string;
  personalNote: string;
  mnemonic: string;
  personalExamples: string[];
  tags: string[];
  deckName: string;
  visibility: Visibility;
  validationStatus: ValidationStatus;
  validatedBy: keyof SeededUsers | null;
  likesCount: number;
  downloadsCount: number;
};

const FLASHCARD_DEFS: FlashcardDef[] = [
  // ── John Doe (EN → FR) ───────────────────────────────────────────────────
  {
    userKey: 'johnDoe', sourceWord: 'Hello', targetWord: 'Bonjour',
    title: 'Hello -> Bonjour', personalNote: 'Salutation formelle en français',
    mnemonic: 'Bon + jour = good day',
    personalExamples: ['Hello, how are you? -> Bonjour, comment allez-vous?'],
    tags: ['greetings', 'basic'], deckName: 'Mes premiers mots français',
    visibility: Visibility.PUBLIC, validationStatus: ValidationStatus.APPROVED, validatedBy: 'adminUser',
    likesCount: 12, downloadsCount: 8,
  },
  {
    userKey: 'johnDoe', sourceWord: 'Cat', targetWord: 'Chat',
    title: 'Cat -> Chat', personalNote: 'Mon animal préféré !',
    mnemonic: 'Chat sounds like "sha"',
    personalExamples: ['My cat is sleeping -> Mon chat dort'],
    tags: ['animals', 'pets'], deckName: 'Mes premiers mots français',
    visibility: Visibility.PUBLIC, validationStatus: ValidationStatus.APPROVED, validatedBy: 'adminUser',
    likesCount: 15, downloadsCount: 12,
  },
  {
    userKey: 'johnDoe', sourceWord: 'Dog', targetWord: 'Chien',
    title: 'Dog -> Chien', personalNote: 'Attention à la prononciation',
    mnemonic: 'Chien = shee-AN',
    personalExamples: ['The dog is big -> Le chien est grand'],
    tags: ['animals', 'pets'], deckName: 'Mes premiers mots français',
    visibility: Visibility.PRIVATE, validationStatus: ValidationStatus.DRAFT, validatedBy: null,
    likesCount: 0, downloadsCount: 0,
  },
  // ── Jane Smith (FR → ZH) ─────────────────────────────────────────────────
  {
    userKey: 'janeSmith', sourceWord: 'Bonjour', targetWord: '你好',
    title: 'Bonjour -> 你好', personalNote: 'Premier mot en chinois !',
    mnemonic: 'ni = you, hao = good',
    personalExamples: ['Bonjour tout le monde -> 你好大家'],
    tags: ['greetings', 'chinese'], deckName: 'Chinois débutant',
    visibility: Visibility.PENDING, validationStatus: ValidationStatus.PENDING_REVIEW, validatedBy: null,
    likesCount: 0, downloadsCount: 0,
  },
  {
    userKey: 'janeSmith', sourceWord: 'Chat', targetWord: '猫',
    title: 'Chat -> 猫', personalNote: "J'adore les chats",
    mnemonic: 'Mao sounds like meow!',
    personalExamples: ["J'ai trois chats -> 我有三只猫"],
    tags: ['animals', 'chinese'], deckName: 'Chinois débutant',
    visibility: Visibility.PRIVATE, validationStatus: ValidationStatus.DRAFT, validatedBy: null,
    likesCount: 0, downloadsCount: 0,
  },
  // ── Alice Jones (EN → ZH) ────────────────────────────────────────────────
  {
    userKey: 'aliceJones', sourceWord: 'Water', targetWord: '水',
    title: 'Water -> 水', personalNote: 'Caractère simple à retenir',
    mnemonic: 'The character looks like flowing water',
    personalExamples: ['I drink water -> 我喝水'],
    tags: ['nature', 'basic'], deckName: 'Essential Chinese',
    visibility: Visibility.PUBLIC, validationStatus: ValidationStatus.APPROVED, validatedBy: 'adminUser',
    likesCount: 25, downloadsCount: 18,
  },
  {
    userKey: 'aliceJones', sourceWord: 'House', targetWord: '房子',
    title: 'House -> 房子', personalNote: 'Caractère composé intéressant',
    mnemonic: 'Fang = house, zi = suffix',
    personalExamples: ['My house is big -> 我的房子很大'],
    tags: ['housing', 'daily'], deckName: 'Essential Chinese',
    visibility: Visibility.PUBLIC, validationStatus: ValidationStatus.APPROVED, validatedBy: 'adminUser',
    likesCount: 18, downloadsCount: 14,
  },
  // ── Bob Brown (ZH → EN) ──────────────────────────────────────────────────
  {
    userKey: 'bobBrown', sourceWord: '你好', targetWord: 'Hello',
    title: '你好 -> Hello', personalNote: '最基本的英语问候',
    mnemonic: 'Hello sounds like he-low',
    personalExamples: ['你好，你好吗？ -> Hello, how are you?'],
    tags: ['greetings', 'english'], deckName: '英语学习',
    visibility: Visibility.PRIVATE, validationStatus: ValidationStatus.DRAFT, validatedBy: null,
    likesCount: 0, downloadsCount: 0,
  },
  {
    userKey: 'bobBrown', sourceWord: '水', targetWord: 'Water',
    title: '水 -> Water', personalNote: '生活必需词汇',
    mnemonic: 'Water sounds like wo-ter',
    personalExamples: ['我喝水 -> I drink water'],
    tags: ['nature', 'basic'], deckName: '英语学习',
    visibility: Visibility.PENDING, validationStatus: ValidationStatus.PENDING_REVIEW, validatedBy: null,
    likesCount: 0, downloadsCount: 0,
  },
];

// [flashcardIdx, userKey, interactionType]
type InteractionDef = [number, keyof SeededUsers, InteractionType];

const INTERACTION_DEFS: InteractionDef[] = [
  // fc[0] = Hello->Bonjour
  [0, 'janeSmith', InteractionType.LIKE], [0, 'aliceJones', InteractionType.LIKE], [0, 'bobBrown', InteractionType.LIKE],
  [0, 'janeSmith', InteractionType.DOWNLOAD], [0, 'aliceJones', InteractionType.DOWNLOAD],
  [0, 'janeSmith', InteractionType.FAVORITE],
  // fc[1] = Cat->Chat
  [1, 'janeSmith', InteractionType.LIKE], [1, 'bobBrown', InteractionType.LIKE],
  [1, 'janeSmith', InteractionType.DOWNLOAD],
  [1, 'aliceJones', InteractionType.REPORT],
  // fc[5] = Water->水
  [5, 'johnDoe', InteractionType.LIKE], [5, 'janeSmith', InteractionType.LIKE],
  [5, 'johnDoe', InteractionType.DOWNLOAD], [5, 'janeSmith', InteractionType.DOWNLOAD],
  [5, 'johnDoe', InteractionType.FAVORITE],
  // fc[6] = House->房子
  [6, 'johnDoe', InteractionType.LIKE],
  [6, 'johnDoe', InteractionType.DOWNLOAD],
  [6, 'johnDoe', InteractionType.FAVORITE],
];

// [flashcardIdx, userKey, shareType]
type ShareDef = [number, keyof SeededUsers, ShareType];

const SHARE_DEFS: ShareDef[] = [
  [0, 'johnDoe', ShareType.PUBLIC],
  [0, 'johnDoe', ShareType.COMMUNITY],
  [1, 'johnDoe', ShareType.PUBLIC],
  [5, 'aliceJones', ShareType.PUBLIC],
  [5, 'aliceJones', ShareType.COMMUNITY],
  [6, 'aliceJones', ShareType.PUBLIC],
];

export const seedFlashcards = async (
  prisma: PrismaClient,
  users: SeededUsers,
  words: SeededWords,
): Promise<SeededFlashcards> => {
  const flashcards: SeededFlashcards = [];

  for (const def of FLASHCARD_DEFS) {
    const userId = users[def.userKey].id;
    const sourceWordId = words[def.sourceWord].id;
    const targetWordId = def.targetWord ? words[def.targetWord]?.id ?? null : null;
    const validatedBy = def.validatedBy ? users[def.validatedBy].id : null;

    const existing = await prisma.flashcard.findFirst({
      where: { userId, sourceWordId, title: def.title },
    });

    if (existing) {
      flashcards.push(existing);
    } else {
      const fc = await prisma.flashcard.create({
        data: {
          userId,
          sourceWordId,
          targetWordId,
          title: def.title,
          personalNote: def.personalNote,
          mnemonic: def.mnemonic,
          personalExamples: def.personalExamples,
          tags: def.tags,
          deckName: def.deckName,
          visibility: def.visibility,
          validationStatus: def.validationStatus,
          validatedBy,
          validatedAt: validatedBy ? new Date() : null,
          likesCount: def.likesCount,
          downloadsCount: def.downloadsCount,
        },
      });
      flashcards.push(fc);
    }
  }

  console.log('✅ Flashcards seeded');

  // ─── Interactions ────────────────────────────────────────────────────────

  for (const [fcIdx, userKey, interactionType] of INTERACTION_DEFS) {
    const flashcardId = flashcards[fcIdx].id;
    const userId = users[userKey].id;
    await prisma.flashcardInteraction.upsert({
      where: { flashcardId_userId_interactionType: { flashcardId, userId, interactionType } },
      update: {},
      create: { flashcardId, userId, interactionType },
    });
  }

  console.log('✅ Flashcard interactions seeded');

  // ─── Shares ──────────────────────────────────────────────────────────────

  for (const [fcIdx, userKey, shareType] of SHARE_DEFS) {
    const flashcardId = flashcards[fcIdx].id;
    const sharedByUserId = users[userKey].id;
    const existing = await prisma.flashcardShare.findFirst({
      where: { flashcardId, sharedByUserId, shareType },
    });
    if (!existing) {
      await prisma.flashcardShare.create({
        data: { flashcardId, sharedByUserId, shareType },
      });
    }
  }

  console.log('✅ Flashcard shares seeded');

  return flashcards;
};
