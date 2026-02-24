# Star Wars Explorer

A full-stack TypeScript application for browsing the [Star Wars API (SWAPI)](https://swapi.dev). Features a Star Wars-themed dark UI with search, pagination, and detail views across 6 categories: People, Planets, Films, Starships, Vehicles, and Species.

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Backend  | Node.js, Express, TypeScript, Axios     |
| Frontend | React 18, Vite, TypeScript, CSS Modules |
| Testing  | Jest, ts-jest, Supertest, React Testing Library |
| Hosting  | GoDaddy Shared Hosting (cPanel / Phusion Passenger) |

## Project Structure

```
Starwars/
├── server/          # Express API server (TypeScript)
│   ├── src/
│   │   ├── app.ts          # Express app factory
│   │   ├── index.ts        # Entry point (listen)
│   │   ├── config.ts       # Environment config
│   │   ├── routes/         # 6 category API routers
│   │   ├── services/       # SWAPI Axios client
│   │   ├── middleware/     # Error handler
│   │   └── types/          # TypeScript interfaces
│   └── tests/              # Jest + Supertest tests
│
├── client/          # React frontend (TypeScript)
│   └── src/
│       ├── api/            # Axios instance + SWAPI API functions
│       ├── components/     # Layout, UI, Cards, Detail components
│       ├── hooks/          # useDebounce, useSwapiList, useSwapiDetail
│       ├── pages/          # CategoryPage
│       ├── types/          # Shared TypeScript interfaces
│       └── styles/         # Global CSS + theme constants
│
├── README.md
└── DEPLOYMENT.md
```

## Prerequisites

- **Node.js** >= 18.0.0 (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- **npm** >= 9.0.0

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/macn84/starwars-browser.git
cd starwars-browser
```

### 2. Install all dependencies

```bash
npm install
```

This installs both server and client dependencies via npm workspaces.

### 3. Configure the server (optional)

Copy the example environment file:

```bash
cp server/.env.example server/.env
```

The defaults work for local development — no changes needed.

### 4. Start the development servers

Open **two terminal windows**:

**Terminal 1 — Express API server (port 3001):**
```bash
npm run dev:server
```

**Terminal 2 — Vite React client (port 5173):**
```bash
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The Vite dev server automatically proxies `/api/*` requests to the Express server on port 3001, so there are no CORS issues during development.

## Running Tests

```bash
# Run all tests (server + client)
npm test

# Run only server tests
npm run test:server

# Run only client tests
npm run test:client
```

## Production Build

```bash
npm run build
```

This compiles:
- `server/src/` → `server/dist/` (TypeScript → CommonJS)
- `client/src/` → `client/dist/` (Vite bundled React app)

To verify the production build locally:

```bash
NODE_ENV=production node server/dist/index.js
```

Then open [http://localhost:3001](http://localhost:3001) — the Express server serves the React app.

## Environment Variables

| Variable        | Default                  | Description                         |
|-----------------|--------------------------|-------------------------------------|
| `PORT`          | `3001`                   | Express server port                 |
| `NODE_ENV`      | `development`            | `development` or `production`       |
| `CLIENT_ORIGIN` | `http://localhost:5173`  | CORS allowed origin (dev only)      |

> In production on GoDaddy, only `NODE_ENV=production` is needed. The frontend and backend share the same origin, so CORS is not required.

## GitHub Setup

### Creating a new repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `starwars-browser`
3. Visibility: Private or Public (your choice)
4. **Do NOT** initialize with a README, .gitignore, or license (you already have these files)
5. Click **Create repository**

### Pushing to GitHub

```bash
cd /home/andrew/Starwars
git init
git add .
git commit -m "feat: initial Star Wars API browser"
git branch -M main
git remote add origin https://github.com/macn84/starwars-browser.git
git push -u origin main
```

### Subsequent pushes

```bash
git add .
git commit -m "your commit message"
git push
```

### Recommended branch strategy

```
main       — production-ready code only
develop    — integration branch for features
feature/*  — individual feature branches (e.g. feature/add-search)
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions to deploy to GoDaddy Shared Hosting.

## API Endpoints

The Express server exposes these proxy endpoints (all GET):

| Endpoint                  | Description                              |
|---------------------------|------------------------------------------|
| `/api/people?search=&page=`    | List people (search + pagination)   |
| `/api/people/:id`              | Single person by ID                 |
| `/api/planets?search=&page=`   | List planets                        |
| `/api/planets/:id`             | Single planet by ID                 |
| `/api/films?search=&page=`     | List films                          |
| `/api/films/:id`               | Single film by ID                   |
| `/api/starships?search=&page=` | List starships                      |
| `/api/starships/:id`           | Single starship by ID               |
| `/api/vehicles?search=&page=`  | List vehicles                       |
| `/api/vehicles/:id`            | Single vehicle by ID                |
| `/api/species?search=&page=`   | List species                        |
| `/api/species/:id`             | Single species by ID                |
