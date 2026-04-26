# TaskForge

TaskForge is a workflow automation platform in the style of a lightweight Zapier clone. Users create a workflow ("Zap") with a trigger and one or more actions, then TaskForge executes those actions asynchronously when the trigger fires.

In the current implementation, the main trigger is a webhook and the supported actions are:

- Send an email
- Transfer Solana balance between TaskForge users
- Transfer INR balance between TaskForge users

## What This Repo Contains

This repository is a small monorepo with one frontend and four backend services:

- `frontend/`: Next.js app for signup, signin, dashboard, profile, and zap creation
- `primary_backend/`: main API for auth, available triggers/actions, and zap CRUD
- `hooks/`: webhook ingestion service that records incoming trigger events
- `processor/`: outbox processor that reads pending runs from Postgres and pushes jobs to Kafka
- `worker/`: Kafka consumer that executes actions stage by stage
- `docker-compose.yml`: orchestration for Kafka, Zookeeper, and backend services

## Architecture

TaskForge uses an event-driven pipeline:

1. A user creates a zap in the frontend.
2. The frontend calls `primary_backend` to save the trigger and ordered actions.
3. A webhook request hits `hooks`.
4. `hooks` stores a `ZapRun` and inserts a `ZapRunOutbox` row.
5. `processor` polls the outbox table and publishes Kafka messages to the `zap-events` topic.
6. `worker` consumes messages, resolves the current stage, executes the action, and republishes the next stage if more actions remain.

This gives the system a simple decoupled execution model:

- Postgres stores workflow definitions and run state
- Kafka coordinates background execution
- Worker logic remains sequential per zap stage

## Core Data Model

All backend services use the same Prisma schema shape with PostgreSQL.

Main entities:

- `User`: account, password, and internal balances (`Solana`, `INR`)
- `Zap`: workflow owned by a user
- `Trigger`: trigger type attached to a zap
- `Action`: ordered action list attached to a zap
- `AvailableTrigger`: trigger catalog shown in the UI
- `AvailableAction`: action catalog shown in the UI
- `ZapRun`: a single trigger execution
- `ZapRunOutbox`: outbox row used by the processor before publishing to Kafka

## Current Feature Set

- User signup and signin with JWT-based auth
- Fetch logged-in user profile
- List available triggers and actions
- Create zaps with one trigger and multiple ordered actions
- Dashboard view of created zaps
- Copyable webhook URL per zap
- Dynamic action metadata using placeholders like `{comment.email}` and `{comment.amount}`
- Background execution through Kafka

## How Action Templating Works

The worker resolves action metadata using placeholders from the latest webhook payload stored in `ZapRun.metadata`.

Examples used by the UI:

- `{comment.email}`
- `{comment.amount}`

If a webhook payload includes those values, they can be injected into:

- email recipient/body
- INR recipient/amount
- Solana recipient/amount

## Webhook Format

The webhook service listens on:

- `POST /hooks/catch/:userId/:zapId`

The current parser expects the incoming payload to include `comment.body`, and it extracts `amount` and `email` from that string using regex.

Example shape:

```json
{
  "comment": {
    "body": "amount: \"2\", email: \"alice@example.com\""
  }
}
```

After ingestion, the service stores:

```json
{
  "comment": {
    "amount": "2",
    "email": "alice@example.com"
  }
}
```

## Tech Stack

- Frontend: Next.js 13, React 18, Tailwind CSS, Axios, Radix UI
- API services: Express + TypeScript
- ORM: Prisma
- Database: PostgreSQL
- Queue / event bus: Kafka
- Email: Nodemailer with Gmail SMTP
- Containerization: Docker, Docker Compose

## Repository Structure

```text
.
|-- frontend/
|-- primary_backend/
|-- hooks/
|-- processor/
|-- worker/
|-- docker-compose.yml
`-- .env
```

## Service Details

### `frontend`

User-facing app built with Next.js.

Main routes:

- `/`: marketing homepage
- `/landing`: alternate landing page
- `/auth/signup`: registration
- `/auth/signin`: login
- `/home`: dashboard showing created zaps
- `/zap/create`: zap builder
- `/profile`: logged-in user profile

Frontend runtime config:

- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_HOOKS_URL`

### `primary_backend`

Main REST API running on port `3001`.

Key endpoints:

- `POST /api/v1/user/signup`
- `POST /api/v1/user/signin`
- `GET /api/v1/user/logged_user`
- `GET /api/v1/trigger/available`
- `GET /api/v1/action/available`
- `POST /api/v1/zap`
- `GET /api/v1/zap`

Responsibilities:

- auth and JWT issuance
- user lookup
- available trigger/action lookup
- zap creation and listing

### `hooks`

Webhook ingestion service running on port `3002`.

Responsibilities:

- accept incoming webhook calls
- parse relevant payload data
- create `ZapRun`
- write to `ZapRunOutbox`

### `processor`

Background polling service.

Responsibilities:

- poll `ZapRunOutbox`
- publish jobs to Kafka topic `zap-events`
- delete processed outbox rows

### `worker`

Kafka consumer that executes workflow actions.

Responsibilities:

- consume `zap-events`
- fetch zap/action metadata
- execute Email, Solana, or INR action
- publish next stage if workflow has more actions

## Environment Variables

The repo currently references these variables in code.

### Root `.env`

Used by the worker through Docker Compose:

```env
DATABASE_URL=postgresql://...
```

### `primary_backend/.env`

Expected values:

```env
DATABASE_URL=postgresql://...
JWT_PASSWORD=replace-this
```

### `hooks/.env`

Expected values:

```env
DATABASE_URL=postgresql://...
```

### `processor/.env`

Expected values:

```env
DATABASE_URL=postgresql://...
```

### `worker/.env`

Expected values:

```env
DATABASE_URL=postgresql://...
EMAIL_USER=your-gmail-address
EMAIL_PASS=your-app-password
```

### `frontend/.env.local`

Expected values:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_HOOKS_URL=http://localhost:3002
```

## Local Development

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL database
- Kafka and Zookeeper
- Docker Desktop if you want to run the provided Compose stack

### 1. Install dependencies

Run in each app/service directory:

```bash
cd frontend && npm install
cd ../primary_backend && npm install
cd ../hooks && npm install
cd ../processor && npm install
cd ../worker && npm install
```

### 2. Create env files

Create the env files listed above and point all Prisma-based services to the same PostgreSQL database unless you intentionally want separate databases.

### 3. Generate Prisma clients

Run in each backend service:

```bash
cd primary_backend && npx prisma generate
cd ../hooks && npx prisma generate
cd ../processor && npx prisma generate
cd ../worker && npx prisma generate
```

### 4. Apply migrations

The services ship with Prisma migrations. Apply them against your database from one service that owns the same schema, typically `primary_backend`:

```bash
cd primary_backend
npx prisma migrate deploy
```

For local iterative development you can also use:

```bash
npx prisma migrate dev
```

### 5. Seed initial data

The frontend depends on available trigger/action rows existing in the database.

From `primary_backend/`:

```bash
npx prisma db seed
```

This seed currently creates:

- one sample user
- one trigger: `Webhook`
- three actions: `Email`, `Solana`, `INR`

### 6. Start services

Recommended local startup order:

1. Start PostgreSQL.
2. Start Kafka and Zookeeper.
3. Start `primary_backend`.
4. Start `hooks`.
5. Start `processor`.
6. Start `worker`.
7. Start `frontend`.

Dev commands:

```bash
cd primary_backend && npm run dev
cd hooks && npm run dev
cd processor && npm run dev
cd worker && npm run dev
cd frontend && npm run dev
```

## Running With Docker Compose

The repository includes a `docker-compose.yml` for:

- Zookeeper
- Kafka
- `primary_backend`
- `hooks`
- `processor`
- `worker`

Start the stack with:

```bash
docker compose up --build
```

Notes:

- Compose expects service-specific env files such as `primary_backend/.env`, `hooks/.env`, `processor/.env`, and `worker/.env`.
- The root `.env` is also loaded into `worker`.
- `frontend` is not included in the Compose file, so run it separately if needed.

## API Summary

### Auth

```http
POST /api/v1/user/signup
POST /api/v1/user/signin
GET /api/v1/user/logged_user
```

### Catalog

```http
GET /api/v1/trigger/available
GET /api/v1/action/available
```

### Zaps

```http
POST /api/v1/zap
GET /api/v1/zap
GET /api/v1/zap/:zapId
```

### Hooks

```http
POST /hooks/catch/:userId/:zapId
```

## Example Workflow

Example: "When a webhook is received, send INR and then send an email."

1. User signs in.
2. User creates a zap with trigger `Webhook`.
3. User sets actions in order: `INR`, then `Email`.
4. User copies the webhook URL from the dashboard.
5. A request hits the webhook endpoint with `comment.body`.
6. `hooks` stores the run.
7. `processor` publishes the first Kafka job.
8. `worker` executes stage `0`.
9. `worker` republishes stage `1`.
10. `worker` executes the final action.

## Important Implementation Notes

- Passwords are currently stored in plain text. `bcrypt` is present in comments but not enabled.
- JWT uses `JWT_PASSWORD` and falls back to a hardcoded default if unset.
- Kafka brokers are hardcoded in code as `localhost:9092`, even though Compose also sets `KAFKA_BROKER`. If running in containers, you may want to align the code with env-based broker resolution.
- The webhook parser is tightly coupled to the current `comment.body` string format.
- The worker validates recipients by checking whether the destination email exists as a TaskForge user.
- The frontend uses `localStorage` for auth token storage.
- `frontend/next.config.js` uses `output: 'export'`, while the app also relies on runtime API calls; keep that in mind if you change the deployment model.

## Suggested Improvements

- hash passwords with `bcrypt`
- remove hardcoded secrets/defaults
- make Kafka broker configuration env-driven
- add `.env.example` files for every service
- add request validation for all routes
- improve webhook payload parsing
- add retries and dead-letter handling for failed jobs
- add tests for parser, worker stages, and API routes
- add auth/logout guards in the frontend

## Status

This codebase is a functional prototype of a distributed automation platform with a clear service split and an outbox-to-Kafka execution flow. It is well-suited for learning, demos, and iteration, and would benefit from hardening around security, config management, and failure handling before production use.