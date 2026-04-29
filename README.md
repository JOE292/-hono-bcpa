# Modular REST API with Hono

A REST API built with **Hono + TypeScript + Drizzle ORM + PostgreSQL**.

## Features
- Modular routes: `users`, `posts`, `comments`
- Service layer (routes call services, not DB directly)
- Relational schema:
  - User has many Posts
  - Post belongs to User
  - Post has many Comments
  - Comment belongs to Post

## Endpoints
- `POST /users`
- `GET /users`
- `GET /users/:userId/posts`
- `POST /posts`
- `GET /posts`
- `GET /posts/:postId/comments`
- `POST /comments`
- `GET /comments`

## Run
```bash
npm install
npm i @hono/node-server
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
