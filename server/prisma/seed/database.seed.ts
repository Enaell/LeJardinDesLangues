import { Prisma, PrismaClient } from '../../src/generated/prisma/client';

/**
 * Creates database views and stored functions that sit on top of the
 * Prisma-managed schema.  All statements use CREATE OR REPLACE so this
 * seed step is fully idempotent.
 */
export const seedDatabase = async (prisma: PrismaClient): Promise<void> => {
  // ─── Views ───────────────────────────────────────────────────────────────

  await prisma.$executeRaw(Prisma.sql`
    CREATE OR REPLACE VIEW user_progress AS
    SELECT
      u.id            AS user_id,
      u.username,
      u.name,
      ull.language_code,
      ull.level,
      ull.words_known,
      ull.total_study_time,
      COUNT(DISTINCT f.id)::INT   AS total_flashcards,
      COUNT(DISTINCT fr.id)::INT  AS total_reviews,
      MAX(fr.created_at)          AS last_review_at
    FROM users u
    LEFT JOIN user_language_levels ull ON ull.user_id = u.id
    LEFT JOIN flashcards f             ON f.user_id   = u.id
    LEFT JOIN flashcard_reviews fr     ON fr.user_id  = u.id
    GROUP BY
      u.id, u.username, u.name,
      ull.language_code, ull.level,
      ull.words_known,  ull.total_study_time
  `);

  await prisma.$executeRaw(Prisma.sql`
    CREATE OR REPLACE VIEW popular_words AS
    SELECT
      w.id,
      w.text,
      w.language_code,
      w.part_of_speech,
      w.definition,
      w.difficulty_level,
      w.frequency_rank,
      COUNT(DISTINCT f.id)::INT       AS flashcard_count,
      COALESCE(SUM(f.likes_count), 0) AS total_likes,
      COALESCE(SUM(f.downloads_count), 0) AS total_downloads
    FROM words w
    LEFT JOIN flashcards f ON f.source_word_id = w.id
    WHERE w.validated = TRUE
    GROUP BY
      w.id, w.text, w.language_code, w.part_of_speech,
      w.definition, w.difficulty_level, w.frequency_rank
    ORDER BY total_likes DESC, flashcard_count DESC
  `);

  console.log('✅ Database views created');

  // ─── Functions ───────────────────────────────────────────────────────────

  await prisma.$executeRaw(Prisma.sql`
    CREATE OR REPLACE FUNCTION search_users(search_term TEXT)
    RETURNS TABLE (
      id       INT,
      username VARCHAR,
      name     VARCHAR,
      email    VARCHAR,
      role     VARCHAR
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY
      SELECT u.id, u.username, u.name, u.email, u.role
      FROM users u
      WHERE
        u.username ILIKE '%' || search_term || '%' OR
        u.name     ILIKE '%' || search_term || '%' OR
        u.email    ILIKE '%' || search_term || '%';
    END;
    $$
  `);

  await prisma.$executeRaw(Prisma.sql`
    CREATE OR REPLACE FUNCTION search_words(
      search_term   TEXT,
      lang_code     VARCHAR DEFAULT NULL,
      max_difficulty INT   DEFAULT NULL
    )
    RETURNS TABLE (
      id               INT,
      text             VARCHAR,
      language_code    VARCHAR,
      part_of_speech   VARCHAR,
      definition       TEXT,
      pronunciation    VARCHAR,
      difficulty_level INT,
      frequency_rank   INT
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY
      SELECT
        w.id, w.text, w.language_code, w.part_of_speech,
        w.definition, w.pronunciation, w.difficulty_level, w.frequency_rank
      FROM words w
      WHERE
        w.validated = TRUE AND
        (w.text            ILIKE '%' || search_term || '%' OR
         w.definition      ILIKE '%' || search_term || '%' OR
         w.international_name ILIKE '%' || search_term || '%') AND
        (lang_code     IS NULL OR w.language_code    = lang_code) AND
        (max_difficulty IS NULL OR w.difficulty_level <= max_difficulty)
      ORDER BY w.frequency_rank ASC NULLS LAST;
    END;
    $$
  `);

  await prisma.$executeRaw(Prisma.sql`
    CREATE OR REPLACE FUNCTION search_flashcards(
      search_term TEXT,
      lang_code   VARCHAR DEFAULT NULL
    )
    RETURNS TABLE (
      id               INT,
      title            VARCHAR,
      personal_note    TEXT,
      deck_name        VARCHAR,
      tags             TEXT[],
      source_word_text VARCHAR,
      target_word_text VARCHAR,
      likes_count      INT,
      downloads_count  INT
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY
      SELECT
        f.id, f.title, f.personal_note, f.deck_name, f.tags,
        sw.text AS source_word_text,
        tw.text AS target_word_text,
        f.likes_count, f.downloads_count
      FROM flashcards f
      JOIN words sw ON sw.id = f.source_word_id
      LEFT JOIN words tw ON tw.id = f.target_word_id
      WHERE
        f.visibility       = 'public' AND
        f.validation_status = 'approved' AND
        (f.title        ILIKE '%' || search_term || '%' OR
         f.personal_note ILIKE '%' || search_term || '%' OR
         sw.text        ILIKE '%' || search_term || '%' OR
         tw.text        ILIKE '%' || search_term || '%') AND
        (lang_code IS NULL OR sw.language_code = lang_code)
      ORDER BY f.likes_count DESC;
    END;
    $$
  `);

  console.log('✅ Database functions created');
};
