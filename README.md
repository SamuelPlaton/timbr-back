# Formator API - Backend

API backend pour l'aide à l'administration des entreprises françaises avec intégration ChatGPT.

## Stack Technique

- **Framework**: NestJS 10
- **Base de données**: PostgreSQL (freelapp_db)
- **ORM**: TypeORM
- **Authentication**: JWT avec refresh tokens
- **IA**: OpenAI GPT-3.5-turbo
- **API externe**: API Gouvernementale de recherche d'entreprises

## Structure du Projet

```
src/
├── entities/                    # Entités TypeORM
│   ├── user.entity.ts          # Utilisateur (email, password_hash, role)
│   ├── refresh-token.entity.ts # Tokens de rafraîchissement
│   ├── password-reset-token.entity.ts
│   ├── onboarding.entity.ts    # Données onboarding (situation, subjects, company_info)
│   └── chat.entity.ts          # Historique des chats (id, title, type, openai_thread_id)
│
├── modules/
│   ├── auth/                   # Authentification JWT
│   │   ├── auth.controller.ts  # POST /auth/register, /login, /refresh
│   │   ├── auth.service.ts     # Hash password, generate tokens
│   │   └── jwt.strategy.ts     # Passport JWT strategy
│   │
│   ├── users/                  # Gestion utilisateurs
│   │   ├── users.controller.ts # GET/PUT /users/me
│   │   └── users.service.ts
│   │
│   ├── onboarding/             # Process d'onboarding
│   │   ├── onboarding.controller.ts # GET/POST/PUT /onboarding
│   │   └── onboarding.dto.ts   # DTO avec validation
│   │
│   ├── chats/                  # Gestion des conversations
│   │   ├── chats.controller.ts # GET/POST/DELETE /chats
│   │   ├── chatgpt.service.ts  # Intégration OpenAI
│   │   └── chats.dto.ts        # Types: fast/complete/pedagogue
│   │
│   └── company/                # Recherche d'entreprises
│       ├── company.controller.ts # GET /company/search?q=SIREN
│       └── company.service.ts  # Appel API gouv.fr
│
├── guards/
│   └── jwt-auth.guard.ts       # Protection des routes
│
└── database/
    ├── config.ts               # Configuration PostgreSQL
    ├── data-source.ts          # TypeORM DataSource
    └── migrations/             # Migrations DB
```

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` basé sur `.env.example`:

```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=freelapp_db
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
OPENAI_API_KEY=sk-your-openai-api-key
```

## Base de Données

### Créer la base de données

```bash
createdb freelapp_db
```

### Générer et exécuter les migrations

```bash
npm run migration:generate -- src/database/migrations/InitialMigration
npm run migration:run
```

## Démarrage

```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

L'API sera accessible sur `http://localhost:3001`
Documentation Swagger sur `http://localhost:3001/api`

## Endpoints Principaux

### Authentification
- `POST /auth/register` - Créer un compte
- `POST /auth/login` - Se connecter
- `POST /auth/refresh` - Rafraîchir le token
- `POST /auth/forgot-password` - Demande de réinitialisation
- `POST /auth/reset-password` - Réinitialiser le mot de passe

### Utilisateurs
- `GET /users/me` - Profil utilisateur (protégé)
- `PUT /users/me` - Mettre à jour le profil (protégé)

### Onboarding
- `GET /onboarding` - Récupérer l'onboarding (protégé)
- `POST /onboarding` - Créer/mettre à jour l'onboarding (protégé)
- `PUT /onboarding` - Modifier l'onboarding (protégé)

### Chats
- `GET /chats` - Liste des chats (protégé)
- `POST /chats` - Créer un nouveau chat (protégé)
- `POST /chats/:id/messages` - Envoyer un message (protégé)
- `DELETE /chats/:id` - Supprimer un chat (protégé)

### Entreprises
- `GET /company/search?q=SIREN` - Rechercher une entreprise (protégé)

## Architecture

### Authentification
- JWT avec access token (15 min) et refresh token (7 jours)
- Refresh tokens stockés en base de données
- Protection contre les attaques par timing
- Validation stricte du JWT_SECRET (minimum 32 caractères)

### Onboarding
Les données sont stockées en JSON dans la table `onboarding`:
- `situation`: "Futur Auto-Entrepreneur" | "Auto-Entrepreneur" | "SARL/SASU"
- `interested_subjects`: ["VAT", "Aides", "Impôts", ...]
- `company_information`: { siren, siret, company_name, address, ... }

### ChatGPT Integration
Trois types de chat disponibles:
- **fast**: Réponses courtes et directes
- **complete**: Réponses détaillées et complètes
- **pedagogue**: Explications pédagogiques étape par étape

Les conversations sont stockées côté frontend, seul le metadata du chat (id, title, type) est en base.

## Sécurité

- Validation des données avec `class-validator`
- Hashing des mots de passe avec bcrypt (10 rounds)
- Protection CORS configurée
- Tokens JWT avec expiration
- Protection contre l'énumération d'utilisateurs
