# Timbr API (formator-api)

## Overview

Backend API for **Timbr**, an AI-powered business administration assistant for French entrepreneurs and companies. Built with NestJS, it provides chat-based AI interactions (powered by OpenAI), subscription management (Stripe), email services (Brevo), and file storage (Cloudflare R2).

**Deployed on:** Railway/Render
**Database:** Separate PostgreSQL instance (`freelapp_db`)
**Related frontend:** `formator-front`

## Tech Stack

- **Framework:** NestJS 10 (TypeScript 5.1)
- **Database:** PostgreSQL with TypeORM 0.3
- **Auth:** Custom JWT (Passport.js) with access + refresh token pattern
- **AI:** OpenAI SDK (gpt-4.1 / gpt-4-mini)
- **Payments:** Stripe (subscriptions with 3 tiers: Solo, Boost, Elite)
- **Email:** Brevo (transactional emails + contact management)
- **Storage:** Cloudflare R2 (S3-compatible, for chat file attachments)
- **Monitoring:** Sentry
- **Scheduling:** @nestjs/schedule (cron jobs)

## Project Structure

```
src/
├── main.ts                     # App entry point (port, CORS, validation pipe, cookies)
├── app.module.ts               # Root module
├── instrument.ts               # Sentry initialization
├── config/
│   ├── subscription.config.ts  # Tier definitions & token limits
│   └── multer.config.ts        # File upload rules (5 files, 10MB max)
├── database/
│   ├── config.ts               # TypeORM connection config
│   └── migrations/             # TypeORM migrations (9 total)
├── entities/                   # TypeORM entities
│   ├── user.entity.ts
│   ├── chat.entity.ts
│   ├── chat-message.entity.ts
│   ├── chat-attachment.entity.ts
│   ├── subscription.entity.ts
│   ├── onboarding.entity.ts
│   ├── refresh-token.entity.ts
│   └── password-reset-token.entity.ts
├── guards/
│   └── jwt-auth.guard.ts       # JWT validation (header or cookie)
├── filters/
│   └── sentry-exception.filter.ts
└── modules/
    ├── auth/                   # Login, register, refresh, password reset, email verification
    ├── users/                  # Profile CRUD + token usage service
    ├── chats/                  # Chat CRUD + OpenAI message streaming
    ├── chat-messages/          # Message persistence
    ├── stripe/                 # Checkout, portal, webhooks
    ├── onboarding/             # User profiling (situation, interests, company info)
    ├── company/                # French enterprise search (SIREN API)
    ├── contact/                # Contact form emails
    └── brevo/                  # Email service wrapper
```

## Module Pattern

Each module follows a consistent 3-layer pattern:

```
*.controller.ts  → HTTP routes, validation, guards
*.service.ts     → Business logic
*.api.ts         → Data access layer (TypeORM repository operations)
*.dto.ts         → Request/response validation (class-validator)
*.module.ts      → NestJS module definition
```

## API Routes

### Auth (public)

- `POST /auth/register` - Register + auto-create Stripe customer
- `POST /auth/login` - Login (returns JWT in cookie)
- `POST /auth/refresh` - Refresh access token
- `POST /auth/forgot-password` - Request password reset email
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/resend-verification` - Resend email verification

### Users (protected - JwtAuthGuard)

- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update profile

### Chats (protected)

- `GET /chats` - List user chats (paginated)
- `GET /chats/:id` - Get specific chat
- `GET /chats/:id/messages` - Get chat messages (paginated)
- `POST /chats` - Create new chat (supports file uploads)
- `POST /chats/:id/messages` - Send message (supports file uploads)
- `DELETE /chats/:id` - Delete chat

### Stripe (protected except webhook)

- `POST /stripe/create-checkout-session` - Create checkout
- `POST /stripe/create-portal-session` - Billing portal
- `POST /stripe/webhook` - Webhook handler (public, signature verified)

### Other

- `GET /company/search?q=SIREN` - Search French companies (protected)
- `POST /contact` - Contact form (protected)
- `GET /onboarding` / `POST /onboarding` / `PUT /onboarding` - Onboarding CRUD (protected)

## Database Schema

### Key Entities & Relationships

- **User** → has many Chats, Subscriptions, RefreshTokens; has one Onboarding
- **Chat** → has many ChatMessages; belongs to User; has type (fast/complete/pedagogue)
- **ChatMessage** → has many ChatAttachments; tracks token_cost per message
- **Subscription** → status enum (active/inactive/canceled/trialing); linked to Stripe
- **Onboarding** → JSONB fields for company_information and interested_subjects

### Soft Deletes

- User entity uses `deleted_at` column

## Authentication

- **Access token:** 15min expiry, JWT in Authorization header or cookie
- **Refresh token:** 7 days expiry, stored in database
- **Password hashing:** bcrypt (10 rounds)
- **Email verification:** HMAC-based verification codes
- **Password reset:** Token-based with 1 hour expiry

## Subscription Tiers & Token Limits

| Tier  | Monthly Tokens | Features              |
| ----- | -------------- | --------------------- |
| FREE  | 20,000         | Basic chat            |
| SOLO  | 400,000        | + File attachments    |
| BOOST | 1,000,000      | + Advanced chat types |
| ELITE | 2,000,000      | All features          |

Token usage resets monthly via cron (`0 0 1 * *`).

## Chat System

Three chat types with different OpenAI system prompts:

- **FAST** - Quick answers
- **COMPLETE** - Detailed responses
- **PEDAGOGUE** - Educational approach

Models used:

- `gpt-4.1` when images are attached
- `gpt-4-mini` for text-only

## Development

```bash
npm run start:dev          # Dev with hot reload
npm run build              # Compile TypeScript
npm run start:prod         # Production
npm run migration:generate # Generate migration from entity changes
npm run migration:run      # Apply migrations
npm run test               # Run Jest tests
```

## Environment Variables

Key variables (see `.env.example`):

- `PORT`, `NODE_ENV`, `APP_URL`, `FRONTEND_URL`
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (min 32 chars), `JWT_EXPIRATION`, `REFRESH_TOKEN_EXPIRATION`
- `EMAIL_VERIFICATION_SECRET`
- `OPENAI_API_KEY`, `OPENAI_MODEL`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_SOLO/BOOST/ELITE_MONTHLY/YEARLY_PRICE_ID`
- `BREVO_API_KEY`
- `S3_PUBLIC_URL`, `S3_ACCOUNT_ID`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`
- `SENTRY_DSN`

## Naming Conventions

- **TypeScript:** camelCase for variables/functions, PascalCase for classes
- **Database columns:** snake_case
- **Entities:** PascalCase
- **Constants/Enums:** UPPER_CASE
- **User-facing messages:** French language

## Code Quality

- ESLint + Prettier
- Husky pre-commit hooks with lint-staged
- Conventional commits (commitlint)
