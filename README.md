# TODO App

A full-stack TODO application built with React, Node.js, Express, Prisma, and PostgreSQL using an npm workspaces monorepo.

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 19, Vite, TypeScript        |
| Backend   | Node.js, Express, TypeScript      |
| Database  | PostgreSQL                        |
| ORM       | Prisma                            |
| Testing   | Jest, Testing Library, Supertest  |

## Project Structure

```
todo-app/
├── package.json                 # Root - npm workspaces
├── .env.example                 # Environment variables template
├── client/                      # React frontend
│   ├── src/
│   │   ├── api/todos.ts         # API client
│   │   ├── components/          # React components + tests
│   │   ├── types/todo.ts        # TypeScript interfaces
│   │   ├── App.tsx              # Root component
│   │   └── index.css            # Styles
│   ├── vite.config.ts           # Vite config with API proxy
│   └── jest.config.ts           # Jest config for frontend
└── server/                      # Node.js backend
    ├── src/
    │   ├── routes/              # Express route handlers + tests
    │   ├── lib/prisma.ts        # Prisma client singleton
    │   ├── app.ts               # Express app setup
    │   └── index.ts             # Server entry point
    ├── prisma/
    │   ├── schema.prisma        # Database schema
    │   └── seed.ts              # Seed data
    └── jest.config.ts           # Jest config for backend
```

## API Endpoints

| Method   | Endpoint         | Description       |
|----------|------------------|-------------------|
| `GET`    | /api/todos       | Get all todos     |
| `GET`    | /api/todos/:id   | Get a single todo |
| `POST`   | /api/todos       | Create a todo     |
| `PATCH`  | /api/todos/:id   | Update a todo     |
| `DELETE` | /api/todos/:id   | Delete a todo     |
| `GET`    | /api/health      | Health check      |

## Prerequisites

- Node.js >= 18
- PostgreSQL running on port 5432

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/biswalom22/claude-demo.git
   cd claude-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example server/.env
   ```
   Edit `server/.env` with your PostgreSQL credentials:
   ```
   DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/todo_db?schema=public"
   PORT=3001
   ```

4. **Create the database**
   ```bash
   psql -U postgres -h localhost -c "CREATE DATABASE todo_db;"
   ```

5. **Run migrations**
   ```bash
   npm run db:migrate
   ```

6. **Seed the database** (optional)
   ```bash
   npm run db:seed
   ```

## Running the App

Start both frontend and backend in separate terminals:

```bash
# Terminal 1 - Backend (http://localhost:3001)
npm run dev:server

# Terminal 2 - Frontend (http://localhost:3000)
npm run dev:client
```

Open **http://localhost:3000** in your browser.

## Testing

```bash
# Run all tests (27 tests)
npm test

# Run only backend tests (13 tests)
npm run test:server

# Run only frontend tests (14 tests)
npm run test:client
```

## Available Scripts

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run dev:server` | Start backend with hot-reload        |
| `npm run dev:client` | Start frontend with HMR              |
| `npm run build`      | Build both client and server         |
| `npm test`           | Run all tests                        |
| `npm run test:server`| Run backend tests                    |
| `npm run test:client`| Run frontend tests                   |
| `npm run db:migrate` | Run Prisma database migrations       |
| `npm run db:generate`| Regenerate Prisma client             |
| `npm run db:seed`    | Seed database with sample data       |
