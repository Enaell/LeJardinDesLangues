import { PrismaClient } from '../../src/generated/prisma/client';

export type SeededWords = Record<string, { id: string; }>;

type WordDef = {
  text: string;
  internationalName: string;
  languageCode: string;
  partOfSpeech: string;
  definition: string;
  pronunciation: string;
  difficultyLevel: number;
  frequencyRank: number;
  subjectTags: string[];
};

const WORD_DEFS: WordDef[] = [
  // ── Français ────────────────────────────────────────────────────────────────
  { text: 'Bonjour', internationalName: 'bonjour', languageCode: 'fr', partOfSpeech: 'interjection', definition: 'Salutation utilisée en français signifiant "hello" ou "good morning"', pronunciation: '/bon-ZHOOR/', difficultyLevel: 1, frequencyRank: 100, subjectTags: ['salutations', 'politesse'] },
  { text: 'Merci', internationalName: 'merci', languageCode: 'fr', partOfSpeech: 'interjection', definition: 'Mot français pour exprimer la gratitude', pronunciation: '/mer-SEE/', difficultyLevel: 1, frequencyRank: 50, subjectTags: ['politesse', 'gratitude'] },
  { text: 'Chat', internationalName: 'chat', languageCode: 'fr', partOfSpeech: 'nom', definition: 'Animal domestique félin', pronunciation: '/sha/', difficultyLevel: 2, frequencyRank: 800, subjectTags: ['animaux', 'domestique'] },
  { text: 'Chien', internationalName: 'chien', languageCode: 'fr', partOfSpeech: 'nom', definition: 'Animal domestique canin', pronunciation: '/shee-AHN/', difficultyLevel: 2, frequencyRank: 600, subjectTags: ['animaux', 'domestique'] },
  { text: 'Maison', internationalName: 'maison', languageCode: 'fr', partOfSpeech: 'nom', definition: "Bâtiment destiné à l'habitation", pronunciation: '/may-ZOHN/', difficultyLevel: 3, frequencyRank: 400, subjectTags: ['habitation', 'architecture'] },
  { text: 'Eau', internationalName: 'eau', languageCode: 'fr', partOfSpeech: 'nom', definition: 'Liquide transparent et incolore', pronunciation: '/oh/', difficultyLevel: 2, frequencyRank: 200, subjectTags: ['nourriture', 'nature'] },
  { text: 'Pain', internationalName: 'pain', languageCode: 'fr', partOfSpeech: 'nom', definition: 'Aliment fait de farine pétrie et cuite', pronunciation: '/pan/', difficultyLevel: 2, frequencyRank: 300, subjectTags: ['nourriture', 'alimentation'] },
  // ── English ──────────────────────────────────────────────────────────────────
  { text: 'Hello', internationalName: 'hello', languageCode: 'en', partOfSpeech: 'interjection', definition: 'Common greeting in English', pronunciation: '/həˈloʊ/', difficultyLevel: 1, frequencyRank: 80, subjectTags: ['greetings', 'politeness'] },
  { text: 'Thank you', internationalName: 'thank you', languageCode: 'en', partOfSpeech: 'expression', definition: 'Expression of gratitude in English', pronunciation: '/θæŋk juː/', difficultyLevel: 1, frequencyRank: 60, subjectTags: ['politeness', 'gratitude'] },
  { text: 'Cat', internationalName: 'cat', languageCode: 'en', partOfSpeech: 'noun', definition: 'Domestic feline animal', pronunciation: '/kæt/', difficultyLevel: 2, frequencyRank: 700, subjectTags: ['animals', 'pets'] },
  { text: 'Dog', internationalName: 'dog', languageCode: 'en', partOfSpeech: 'noun', definition: 'Domestic canine animal', pronunciation: '/dɔːɡ/', difficultyLevel: 2, frequencyRank: 500, subjectTags: ['animals', 'pets'] },
  { text: 'House', internationalName: 'house', languageCode: 'en', partOfSpeech: 'noun', definition: 'Building for human habitation', pronunciation: '/haʊs/', difficultyLevel: 3, frequencyRank: 350, subjectTags: ['housing', 'architecture'] },
  { text: 'Water', internationalName: 'water', languageCode: 'en', partOfSpeech: 'noun', definition: 'Transparent liquid essential for life', pronunciation: '/ˈwɔːtər/', difficultyLevel: 2, frequencyRank: 150, subjectTags: ['food', 'nature'] },
  { text: 'Bread', internationalName: 'bread', languageCode: 'en', partOfSpeech: 'noun', definition: 'Food made from flour and water', pronunciation: '/brɛd/', difficultyLevel: 2, frequencyRank: 250, subjectTags: ['food', 'nutrition'] },
  // ── 中文 ─────────────────────────────────────────────────────────────────────
  { text: '你好', internationalName: 'nǐ hǎo', languageCode: 'zh', partOfSpeech: 'interjection', definition: '中文问候语，相当于英语的hello', pronunciation: '/niː haʊ/', difficultyLevel: 1, frequencyRank: 90, subjectTags: ['问候', '礼貌'] },
  { text: '谢谢', internationalName: 'xiè xiè', languageCode: 'zh', partOfSpeech: 'interjection', definition: '表达感谢的中文词汇', pronunciation: '/ɕjɛ ɕjɛ/', difficultyLevel: 1, frequencyRank: 70, subjectTags: ['礼貌', '感谢'] },
  { text: '猫', internationalName: 'māo', languageCode: 'zh', partOfSpeech: 'noun', definition: '家养的猫科动物', pronunciation: '/maʊ/', difficultyLevel: 2, frequencyRank: 900, subjectTags: ['动物', '宠物'] },
  { text: '狗', internationalName: 'gǒu', languageCode: 'zh', partOfSpeech: 'noun', definition: '家养的犬科动物', pronunciation: '/ɡoʊ/', difficultyLevel: 2, frequencyRank: 650, subjectTags: ['动物', '宠物'] },
  { text: '房子', internationalName: 'fáng zi', languageCode: 'zh', partOfSpeech: 'noun', definition: '供人居住的建筑物', pronunciation: '/faŋ tsɨ/', difficultyLevel: 3, frequencyRank: 450, subjectTags: ['住房', '建筑'] },
  { text: '水', internationalName: 'shuǐ', languageCode: 'zh', partOfSpeech: 'noun', definition: '无色透明的液体', pronunciation: '/ʂweɪ/', difficultyLevel: 2, frequencyRank: 180, subjectTags: ['食物', '自然'] },
  { text: '面包', internationalName: 'miàn bāo', languageCode: 'zh', partOfSpeech: 'noun', definition: '用面粉制作的食品', pronunciation: '/mjɛn paʊ/', difficultyLevel: 2, frequencyRank: 280, subjectTags: ['食物', '营养'] },
];

// [source, target, confidence, context]
type TranslationDef = [string, string, number, string];

const TRANSLATION_DEFS: TranslationDef[] = [
  // FR → EN
  ['Bonjour', 'Hello', 0.95, 'greeting'], ['Merci', 'Thank you', 0.98, 'gratitude'],
  ['Chat', 'Cat', 1.0, 'animal'], ['Chien', 'Dog', 1.0, 'animal'],
  ['Maison', 'House', 0.9, 'building'], ['Eau', 'Water', 1.0, 'liquid'],
  ['Pain', 'Bread', 1.0, 'food'],
  // EN → FR
  ['Hello', 'Bonjour', 0.95, 'greeting'], ['Thank you', 'Merci', 0.98, 'gratitude'],
  ['Cat', 'Chat', 1.0, 'animal'], ['Dog', 'Chien', 1.0, 'animal'],
  ['House', 'Maison', 0.9, 'building'], ['Water', 'Eau', 1.0, 'liquid'],
  ['Bread', 'Pain', 1.0, 'food'],
  // FR → ZH
  ['Bonjour', '你好', 0.9, 'greeting'], ['Merci', '谢谢', 0.95, 'gratitude'],
  ['Chat', '猫', 1.0, 'animal'], ['Chien', '狗', 1.0, 'animal'],
  ['Maison', '房子', 0.85, 'building'], ['Eau', '水', 1.0, 'liquid'],
  ['Pain', '面包', 0.9, 'food'],
  // EN → ZH
  ['Hello', '你好', 0.9, 'greeting'], ['Thank you', '谢谢', 0.95, 'gratitude'],
  ['Cat', '猫', 1.0, 'animal'], ['Dog', '狗', 1.0, 'animal'],
  ['House', '房子', 0.85, 'building'], ['Water', '水', 1.0, 'liquid'],
  ['Bread', '面包', 0.9, 'food'],
  // ZH → FR
  ['你好', 'Bonjour', 0.9, 'greeting'], ['谢谢', 'Merci', 0.95, 'gratitude'],
  ['猫', 'Chat', 1.0, 'animal'], ['狗', 'Chien', 1.0, 'animal'],
  ['房子', 'Maison', 0.85, 'building'], ['水', 'Eau', 1.0, 'liquid'],
  ['面包', 'Pain', 0.9, 'food'],
  // ZH → EN
  ['你好', 'Hello', 0.9, 'greeting'], ['谢谢', 'Thank you', 0.95, 'gratitude'],
  ['猫', 'Cat', 1.0, 'animal'], ['狗', 'Dog', 1.0, 'animal'],
  ['房子', 'House', 0.85, 'building'], ['水', 'Water', 1.0, 'liquid'],
  ['面包', 'Bread', 0.9, 'food'],
];

// [wordText, sentence, translation]
type SentenceDef = [string, string, string];

const SENTENCE_DEFS: SentenceDef[] = [
  ['Bonjour', 'Bonjour, comment allez-vous ?', 'Hello, how are you?'],
  ['Bonjour', 'Bonjour, comment allez-vous ?', '你好，你好吗？'],
  ['Merci', 'Merci beaucoup pour votre aide.', 'Thank you very much for your help.'],
  ['Merci', 'Merci beaucoup pour votre aide.', '非常感谢您的帮助。'],
  ['Chat', 'Mon chat dort sur le canapé.', 'My cat is sleeping on the sofa.'],
  ['Chat', 'Mon chat dort sur le canapé.', '我的猫在沙发上睡觉。'],
  ['Chien', 'Le chien aime jouer dans le jardin.', 'The dog likes to play in the garden.'],
  ['Chien', 'Le chien aime jouer dans le jardin.', '狗喜欢在花园里玩。'],
  ['Hello', 'Hello, nice to meet you!', 'Bonjour, ravi de vous rencontrer !'],
  ['Hello', 'Hello, nice to meet you!', '你好，很高兴见到你！'],
  ['Cat', 'The cat is very cute.', 'Le chat est très mignon.'],
  ['Cat', 'The cat is very cute.', '这只猫很可爱。'],
  ['你好', '你好，很高兴认识你。', 'Hello, nice to meet you.'],
  ['你好', '你好，很高兴认识你。', 'Bonjour, ravi de vous rencontrer.'],
  ['猫', '我家有一只白猫。', 'I have a white cat at home.'],
  ['猫', '我家有一只白猫。', "J'ai un chat blanc à la maison."],
];

export const seedWords = async (
  prisma: PrismaClient,
  adminUserId: string,
): Promise<SeededWords> => {
  const words: SeededWords = {};

  for (const def of WORD_DEFS) {
    const word = await prisma.word.upsert({
      where: { text_languageCode: { text: def.text, languageCode: def.languageCode } },
      update: {},
      create: { ...def, validated: true, createdBy: adminUserId },
    });
    words[def.text] = word;
  }

  console.log('✅ Words seeded');

  // ─── Example Sentences ───────────────────────────────────────────────────

  for (const [wordText, sentence, translation] of SENTENCE_DEFS) {
    const wordId = words[wordText].id;
    const existing = await prisma.exampleSentence.findFirst({
      where: { wordId, sentence, translation },
    });
    if (!existing) {
      await prisma.exampleSentence.create({
        data: { wordId, sentence, translation, verified: true },
      });
    }
  }

  console.log('✅ Example sentences seeded');

  // ─── Word Translations ───────────────────────────────────────────────────

  for (const [src, tgt, confidence, context] of TRANSLATION_DEFS) {
    const sourceWordId = words[src].id;
    const targetWordId = words[tgt].id;
    await prisma.wordTranslation.upsert({
      where: { sourceWordId_targetWordId: { sourceWordId, targetWordId } },
      update: {},
      create: { sourceWordId, targetWordId, confidence, context, verified: true },
    });
  }

  console.log('✅ Word translations seeded');

  return words;
};
