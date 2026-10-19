import pg from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// COUNT(*) comes back from Postgres as a string by default; turn it into a number
pg.types.setTypeParser(20, (v: string) => parseInt(v, 10));

const connectionString = process.env.DATABASE_URL;
const isLocalDb = !!connectionString && /localhost|127\.0\.0\.1/.test(connectionString);

export const pool = new pg.Pool({
  connectionString,
  ssl: isLocalDb ? undefined : { rejectUnauthorized: false },
  max: 5,
  connectionTimeoutMillis: 15000, // Neon's free database may need a moment to wake up
});

pool.on('error', (err) => console.error('[db] idle connection error:', err.message));

// run a query, get all rows
export async function q<T = any>(text: string, params: any[] = []): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}

// run a query, get the first row (or undefined)
export async function q1<T = any>(text: string, params: any[] = []): Promise<T | undefined> {
  return (await q<T>(text, params))[0];
}

async function tx(fn: (c: pg.PoolClient) => Promise<void>) {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    await fn(c);
    await c.query('COMMIT');
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}

const NOW = `(to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))`;

export async function initDb() {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Add it to your .env file (and to Render environment variables).');
  }

  await pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  eco_points INTEGER NOT NULL DEFAULT 15,
  created_at TEXT NOT NULL DEFAULT ${NOW}
);

CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  sort_order SERIAL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  base_registered INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  organizer TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  activity_id TEXT NOT NULL REFERENCES activities(id),
  user_id INTEGER REFERENCES users(id),
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  department TEXT,
  created_at TEXT NOT NULL DEFAULT ${NOW},
  UNIQUE (activity_id, student_email)
);

CREATE TABLE IF NOT EXISTS contributions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  activity_id TEXT,
  activity_title TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TEXT NOT NULL DEFAULT ${NOW}
);

CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  expected_benefit TEXT NOT NULL,
  student_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Submitted',
  base_upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT ${NOW}
);

CREATE TABLE IF NOT EXISTS idea_votes (
  idea_id INTEGER NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id),
  PRIMARY KEY (idea_id, user_id)
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  topic TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  answers_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT ${NOW}
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT ${NOW}
);
`);

  // ---- Seed starter data once (from the original mock data) ----
  const seed = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf8'));

  const actCount = (await q1<{ c: number }>('SELECT COUNT(*) AS c FROM activities'))!.c;
  if (actCount === 0) {
    await tx(async (c) => {
      for (const a of seed.activities) {
        await c.query(
          `INSERT INTO activities
            (id,title,date,time,location,description,capacity,base_registered,category,organizer)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [a.id, a.title, a.date, a.time, a.location, a.description, a.capacity, a.registeredCount, a.category, a.organizer]
        );
      }
    });
  }

  const ideaCount = (await q1<{ c: number }>('SELECT COUNT(*) AS c FROM ideas'))!.c;
  if (ideaCount === 0) {
    await tx(async (c) => {
      for (const i of seed.ideas) {
        await c.query(
          `INSERT INTO ideas
            (title,description,category,expected_benefit,student_name,status,base_upvotes,created_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [i.title, i.description, i.category, i.expectedBenefit, i.studentName, i.status, i.upvotes, i.submittedAt]
        );
      }
    });
  }

  const contribCount = (await q1<{ c: number }>('SELECT COUNT(*) AS c FROM contributions'))!.c;
  if (contribCount === 0) {
    await tx(async (c) => {
      for (const x of seed.contributions) {
        await c.query(
          `INSERT INTO contributions
            (student_name,student_email,activity_id,activity_title,title,description,image_url,created_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [x.studentName, x.studentEmail, x.activityId, x.activityTitle, x.title, x.description, x.imageUrl ?? null, x.submittedAt]
        );
      }
    });
  }

  console.log('[db] connected and ready');
}
