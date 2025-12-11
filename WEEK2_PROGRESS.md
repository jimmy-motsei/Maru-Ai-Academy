# Week 2 Progress Tracker: Backend Migration

## ✅ Completed Tasks (Day 1-4)

### Day 1: API Setup & Consolidation
- [x] Create `backend` directory structure
- [x] Initialize Node.js project (package.json, tsconfig.json)
- [x] Install dependencies (express, cors, helmet, typescript)
- [x] Create Main Application (`src/index.ts`)
- [x] Migrate Modules API (`src/routes/modules.ts`)
- [x] Migrate Users API (`src/routes/users.ts`)
- [x] Verify local development server (Port 8080)

### Day 2: Containerization
- [x] Create `Dockerfile`
- [x] Create `.dockerignore`
- [x] Optimize image size (multi-stage build)
- [x] Install OpenSSL for Prisma compatibility

### Day 3: Cloud Run Deployment
- [x] Authenticate with Google Cloud CLI
- [x] Create Artifact Registry repo (`maru-backend-repo`)
- [x] Set up GitHub Actions CI/CD
- [x] Build and Push image to Artifact Registry
- [x] Deploy to Cloud Run
- [x] Configure service account permissions

### Day 4: Database Setup
- [x] ~~Cloud SQL~~ → Neon PostgreSQL (better free tier)
- [x] Connect Express app to Neon
- [x] Create initial schema migration (Prisma db push)
- [x] Update route logic to use real DB (Prisma Client)
- [x] Verify data persistence

---

## ⏳ Day 5: Integration & Polish (IN PROGRESS)

- [x] Create `.env.local` with API URL
- [x] Create API utility (`app/lib/api.ts`)
- [ ] Update Next.js pages to fetch from API
- [ ] Add loading/error states
- [ ] Final end-to-end testing

---

## 🎯 API Status

**Production URL:** `https://maru-academy-api-bdqus7zlya-uc.a.run.app`

**Endpoints:**
- ✅ `GET /health` - Health check
- ✅ `GET /api/modules` - List all modules
- ✅ `POST /api/modules` - Create module
- ✅ `GET /api/modules/:id` - Get module by ID
- ✅ `GET /api/users` - List all users

**Database:** Neon PostgreSQL (eu-west-2)

---

**Last Updated**: December 11, 2025
**Status**: Week 2 Day 5 🚀 In Progress

