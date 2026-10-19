# Green Campus – Backend

Express + SQLite (file DB at `server/data/greencampus.db`, created automatically and seeded with the original sample activities/ideas/contributions).

## Run
```
npm install
copy .env.example .env      (Windows)   # then set JWT_SECRET
npm run dev:all             # API on :5000 + Vite on :3000 (Vite proxies /api)
```
Or two terminals: `npm run server` and `npm run dev`.

## Tables
users, activities, registrations, contributions, ideas, idea_votes, quiz_attempts, contact_messages

## API
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | /api/auth/register | – | name, email, password (bcrypt hashed, min 8 chars) |
| POST | /api/auth/login | – | returns JWT + user |
| GET | /api/auth/me | required | current user |
| GET | /api/bootstrap | optional | activities, ideas, contributions (+ your registrations, quiz history, votes if logged in) |
| POST | /api/activities/:id/register | optional | join activity (capacity + duplicate email check) |
| POST | /api/contributions | optional | submit work (+25 pts if logged in) |
| POST | /api/ideas | optional | propose idea (+20 pts if logged in) |
| POST | /api/ideas/:id/upvote | required | toggle vote |
| POST | /api/quiz-attempts | required | save quiz result, award points |
| POST | /api/contact | optional | save contact/feedback message |

Guests can still use the forms; logged-in users get points, history and votes tied to their account.

View the data: open `server/data/greencampus.db` with "DB Browser for SQLite" or the VS Code "SQLite Viewer" extension.
