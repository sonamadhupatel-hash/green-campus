import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { q, q1, initDb } from './db.js';

const PORT = Number(process.env.PORT || 5000);
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me';
if (!process.env.JWT_SECRET) {
  console.warn('[warn] JWT_SECRET not set in .env — using an insecure dev default.');
}

const app = express();
app.use(express.json({ limit: '2mb' })); // contribution photos arrive as base64

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Express 4 does not catch errors from async routes, so wrap each one
const ah =
  (fn: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// ---------- auth helpers ----------
interface AuthedRequest extends Request {
  userId?: number;
}

function sign(userId: number) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' });
}

function readToken(req: AuthedRequest) {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return;
  try {
    const p = jwt.verify(h.slice(7), JWT_SECRET) as unknown as { sub: number };
    req.userId = p.sub;
  } catch {
    /* invalid/expired token -> treated as guest */
  }
}

const optionalAuth = (req: AuthedRequest, _res: Response, next: NextFunction) => {
  readToken(req);
  next();
};

const requireAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  readToken(req);
  if (!req.userId) return res.status(401).json({ error: 'Please log in to do that.' });
  next();
};

const publicUser = (id: number) =>
  q1(
    `SELECT id, name, email, eco_points AS "ecoPoints", created_at AS "createdAt" FROM users WHERE id = $1`,
    [id]
  );

const addPoints = async (userId: number | undefined, pts: number) => {
  if (userId) await q('UPDATE users SET eco_points = eco_points + $1 WHERE id = $2', [pts, userId]);
};

// ---------- row mappers ----------
const mapActivity = (a: any) => ({
  id: a.id, title: a.title, date: a.date, time: a.time, location: a.location,
  description: a.description, capacity: a.capacity, category: a.category, organizer: a.organizer,
  registeredCount: a.base_registered + a.reg_count,
});
const mapReg = (r: any) => ({
  id: String(r.id), activityId: r.activity_id, activityTitle: r.activity_title,
  studentName: r.student_name, studentEmail: r.student_email,
  studentDepartment: r.department, registeredAt: r.created_at,
});
const mapContribution = (c: any) => ({
  id: String(c.id), studentName: c.student_name, studentEmail: c.student_email,
  activityId: c.activity_id, activityTitle: c.activity_title, title: c.title,
  description: c.description, imageUrl: c.image_url, submittedAt: c.created_at, isDemoRecord: true,
});
const mapIdea = (i: any) => ({
  id: String(i.id), title: i.title, description: i.description, category: i.category,
  expectedBenefit: i.expected_benefit, studentName: i.student_name,
  submittedAt: String(i.created_at).slice(0, 10), status: i.status,
  upvotes: i.base_upvotes + i.vote_count,
});
const mapQuiz = (x: any) => ({
  id: String(x.id), timestamp: x.created_at, topic: x.topic, score: x.score,
  total: x.total, percentage: x.percentage, userAnswers: JSON.parse(x.answers_json),
});

const ACTIVITIES_BASE = `
  SELECT a.*, (SELECT COUNT(*) FROM registrations r WHERE r.activity_id = a.id) AS reg_count
  FROM activities a`;
const REGS_SQL = `
  SELECT r.*, a.title AS activity_title FROM registrations r
  JOIN activities a ON a.id = r.activity_id`;
const IDEAS_SQL = `
  SELECT i.*, (SELECT COUNT(*) FROM idea_votes v WHERE v.idea_id = i.id) AS vote_count
  FROM ideas i`;

// ---------- AUTH ----------
app.post('/api/auth/register', ah(async (req, res) => {
  const name = clean(req.body.name, 100);
  const email = clean(req.body.email, 200).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (await q1('SELECT 1 FROM users WHERE email = $1', [email]))
    return res.status(409).json({ error: 'An account with this email already exists.' });

  const hash = await bcrypt.hash(password, 12);
  try {
    const row = await q1<{ id: number }>(
      'INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id',
      [name, email, hash]
    );
    const id = row!.id;
    res.status(201).json({ token: sign(id), user: await publicUser(id) });
  } catch (e: any) {
    if (e.code === '23505') return res.status(409).json({ error: 'An account with this email already exists.' });
    throw e;
  }
}));

app.post('/api/auth/login', ah(async (req, res) => {
  const email = clean(req.body.email, 200).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const row = await q1<any>('SELECT id, password_hash FROM users WHERE email = $1', [email]);
  if (!row || !(await bcrypt.compare(password, row.password_hash)))
    return res.status(401).json({ error: 'Incorrect email or password.' });
  res.json({ token: sign(row.id), user: await publicUser(row.id) });
}));

app.get('/api/auth/me', requireAuth, ah(async (req: AuthedRequest, res) => {
  const u = await publicUser(req.userId!);
  if (!u) return res.status(401).json({ error: 'Account no longer exists.' });
  res.json({ user: u });
}));

// ---------- BOOTSTRAP (everything the UI needs in one call) ----------
app.get('/api/bootstrap', optionalAuth, ah(async (req: AuthedRequest, res) => {
  const activities = (await q(ACTIVITIES_BASE + ' ORDER BY a.sort_order')).map(mapActivity);
  const contributions = (await q('SELECT * FROM contributions ORDER BY id DESC')).map(mapContribution);
  const ideas = (await q(IDEAS_SQL + ' ORDER BY i.id DESC')).map(mapIdea);

  let user: any = null, registrations: any[] = [], quizAttempts: any[] = [], upvotedIdeaIds: string[] = [];
  if (req.userId) {
    user = (await publicUser(req.userId)) ?? null;
    registrations = (await q(REGS_SQL + ' WHERE r.user_id = $1 ORDER BY r.id DESC', [req.userId])).map(mapReg);
    quizAttempts = (await q('SELECT * FROM quiz_attempts WHERE user_id = $1 ORDER BY id DESC', [req.userId])).map(mapQuiz);
    upvotedIdeaIds = (await q('SELECT idea_id FROM idea_votes WHERE user_id = $1', [req.userId])).map((v: any) => String(v.idea_id));
  }
  res.json({ user, activities, contributions, ideas, registrations, quizAttempts, upvotedIdeaIds });
}));

// ---------- ACTIVITY REGISTRATION ----------
app.post('/api/activities/:id/register', optionalAuth, ah(async (req: AuthedRequest, res) => {
  const activity = await q1(ACTIVITIES_BASE + ' WHERE a.id = $1', [req.params.id]);
  if (!activity) return res.status(404).json({ error: 'Selected activity does not exist.' });

  const name = clean(req.body.studentName, 100);
  const email = clean(req.body.studentEmail, 200).toLowerCase();
  const department = clean(req.body.department, 150) || 'General Student Body';
  if (!name || !email) return res.status(400).json({ error: 'Please enter your full name and college email address.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please provide a valid email address.' });

  const a = mapActivity(activity);
  if (a.registeredCount >= a.capacity)
    return res.status(409).json({ error: 'Sorry, this activity has reached its maximum capacity.' });

  try {
    const ins = await q1<{ id: number }>(
      `INSERT INTO registrations (activity_id, user_id, student_name, student_email, department)
       VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [a.id, req.userId ?? null, name, email, department]
    );
    await addPoints(req.userId, 15);
    const row = await q1(REGS_SQL + ' WHERE r.id = $1', [ins!.id]);
    const fresh = mapActivity(await q1(ACTIVITIES_BASE + ' WHERE a.id = $1', [a.id]));
    res.status(201).json({
      registration: mapReg(row), activity: fresh,
      user: req.userId ? await publicUser(req.userId) : null,
    });
  } catch (e: any) {
    if (e.code === '23505')
      return res.status(409).json({ error: `You are already registered for "${a.title}" with ${email}.` });
    throw e;
  }
}));

// ---------- CONTRIBUTIONS ----------
app.post('/api/contributions', optionalAuth, ah(async (req: AuthedRequest, res) => {
  const name = clean(req.body.studentName, 100);
  const email = clean(req.body.studentEmail, 200).toLowerCase() || 'student@campus.edu';
  const title = clean(req.body.title, 200);
  const description = clean(req.body.description, 4000);
  const image = typeof req.body.imageUrl === 'string' ? req.body.imageUrl : null;
  if (!name || !title || !description)
    return res.status(400).json({ error: 'Please fill in your name, contribution title, and description.' });
  if (image && (image.length > 1_200_000 || !(image.startsWith('data:image/') || image.startsWith('https://'))))
    return res.status(400).json({ error: 'Image must be a valid picture under ~800 KB.' });

  const act = req.body.activityId
    ? await q1<any>('SELECT id, title FROM activities WHERE id = $1', [req.body.activityId])
    : null;

  const row = await q1(
    `INSERT INTO contributions
      (user_id, student_name, student_email, activity_id, activity_title, title, description, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [req.userId ?? null, name, email, act?.id ?? null, act?.title ?? 'General Environmental Action', title, description, image]
  );
  await addPoints(req.userId, 25);
  res.status(201).json({ contribution: mapContribution(row), user: req.userId ? await publicUser(req.userId) : null });
}));

// ---------- IDEAS ----------
const IDEA_CATEGORIES = ['Energy', 'Water', 'Waste', 'Transportation', 'Biodiversity', 'Campus Infrastructure', 'Other'];

app.post('/api/ideas', optionalAuth, ah(async (req: AuthedRequest, res) => {
  const title = clean(req.body.title, 200);
  const description = clean(req.body.description, 4000);
  const expectedBenefit = clean(req.body.expectedBenefit, 1000);
  const studentName = clean(req.body.studentName, 150);
  const category = IDEA_CATEGORIES.includes(req.body.category) ? req.body.category : 'Other';
  if (!title || !description || !expectedBenefit || !studentName)
    return res.status(400).json({ error: 'All fields are required to submit an environmental proposal.' });

  const ins = await q1<{ id: number }>(
    `INSERT INTO ideas (user_id,title,description,category,expected_benefit,student_name)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
    [req.userId ?? null, title, description, category, expectedBenefit, studentName]
  );
  const id = ins!.id;
  if (req.userId)
    await q('INSERT INTO idea_votes (idea_id, user_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [id, req.userId]);
  await addPoints(req.userId, 20);
  const row = await q1(IDEAS_SQL + ' WHERE i.id = $1', [id]);
  res.status(201).json({ idea: mapIdea(row), user: req.userId ? await publicUser(req.userId) : null });
}));

app.post('/api/ideas/:id/upvote', requireAuth, ah(async (req: AuthedRequest, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || !(await q1('SELECT 1 FROM ideas WHERE id = $1', [id])))
    return res.status(404).json({ error: 'Idea not found.' });
  const existing = await q1('SELECT 1 FROM idea_votes WHERE idea_id = $1 AND user_id = $2', [id, req.userId]);
  if (existing) await q('DELETE FROM idea_votes WHERE idea_id = $1 AND user_id = $2', [id, req.userId]);
  else await q('INSERT INTO idea_votes (idea_id, user_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [id, req.userId]);
  res.json({ idea: mapIdea(await q1(IDEAS_SQL + ' WHERE i.id = $1', [id])), upvoted: !existing });
}));

// ---------- QUIZ ----------
app.post('/api/quiz-attempts', requireAuth, ah(async (req: AuthedRequest, res) => {
  const { topic, score, total, userAnswers } = req.body;
  if (typeof topic !== 'string' || !Number.isInteger(score) || !Number.isInteger(total) || total <= 0 || score < 0 || score > total)
    return res.status(400).json({ error: 'Invalid quiz result.' });
  const percentage = Math.round((score / total) * 100);
  const earned = score * 2 + (percentage >= 80 ? 10 : 5);
  const row = await q1(
    `INSERT INTO quiz_attempts (user_id, topic, score, total, percentage, answers_json)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [req.userId, topic.slice(0, 100), score, total, percentage, JSON.stringify(userAnswers ?? [])]
  );
  await addPoints(req.userId, earned);
  res.status(201).json({
    attempt: mapQuiz(row),
    earnedPoints: earned, user: await publicUser(req.userId!),
  });
}));

// ---------- CONTACT ----------
const CONTACT_CATEGORIES = ['General Inquiry', 'Campus Eco-Club', 'Report Issue', 'Suggest Collaboration'];

app.post('/api/contact', optionalAuth, ah(async (req: AuthedRequest, res) => {
  const name = clean(req.body.name, 100);
  const email = clean(req.body.email, 200);
  const message = clean(req.body.message, 5000);
  const category = CONTACT_CATEGORIES.includes(req.body.category) ? req.body.category : 'General Inquiry';
  if (!name || !email || !message) return res.status(400).json({ error: 'Please provide your name, email, and message.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  const row = await q1<{ id: number }>(
    'INSERT INTO contact_messages (user_id,name,email,category,message) VALUES ($1,$2,$3,$4,$5) RETURNING id',
    [req.userId ?? null, name, email, category, message]
  );
  res.status(201).json({ reference: `GC-${1000 + row!.id}` });
}));

// ---------- serve the built website (production) ----------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// ---------- errors ----------
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.type === 'entity.too.large' ? 413 : 500).json({
    error: err.type === 'entity.too.large' ? 'Upload too large.' : 'Something went wrong on the server.',
  });
});

initDb()
  .then(() => app.listen(PORT, () => console.log(`Green Campus API running on http://localhost:${PORT}`)))
  .catch((e) => {
    console.error('[fatal] could not start:', e.message);
    process.exit(1);
  });
