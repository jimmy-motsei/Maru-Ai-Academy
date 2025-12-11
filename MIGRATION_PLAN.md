# Maru AI Academy - Google Cloud Migration Implementation Plan

**Project Duration:** 6 Weeks  
**Start Date:** Week of December 16, 2025  
**Completion Target:** Week of January 27, 2026  

---

## 🎯 Project Overview

**Objectives:**
1. Migrate from Azure to Google Cloud Platform
2. Implement full Tailwind CSS integration
3. Modernize Next.js architecture with component-based design
4. Establish robust CI/CD pipeline on Google Cloud
5. Optimize content delivery and performance

**Success Metrics:**
- Zero downtime migration
- <2s page load time
- 100% feature parity with current system
- Automated deployment pipeline
- Monthly hosting costs under $60

---

## 📅 WEEK 1: Foundation & Local Modernization

### Day 1 (Monday) - Environment Setup
**Tasks:**
- [ ] Create Google Cloud Project (`maru-ai-academy`)
- [ ] Enable required APIs:
  ```bash
  gcloud services enable run.googleapis.com
  gcloud services enable sqladmin.googleapis.com
  gcloud services enable storage-api.googleapis.com
  gcloud services enable cloudbuild.googleapis.com
  ```
- [ ] Install Google Cloud CLI locally
- [ ] Create service account for deployments
- [ ] Set up billing alerts ($50/month threshold)

**Deliverables:**
- GCP project configured
- Service account JSON key downloaded
- Local gcloud CLI authenticated

**Time Estimate:** 2-3 hours

---

### Day 2 (Tuesday) - Tailwind CSS Setup
**Tasks:**
- [ ] Install Tailwind CSS dependencies:
  ```bash
  npm install -D tailwindcss@latest postcss autoprefixer
  npx tailwindcss init -p
  ```
- [ ] Create `tailwind.config.ts` with custom theme
- [ ] Create `postcss.config.js`
- [ ] Update `globals.css` with Tailwind layers
- [ ] Add custom color palette (Maru brand colors)
- [ ] Configure fonts (Inter, Outfit, or similar)
- [ ] Test Tailwind utilities in existing pages

**Deliverables:**
- `tailwind.config.ts` configured
- `postcss.config.js` created
- Updated `globals.css`
- Verified Tailwind builds correctly

**Time Estimate:** 3-4 hours

---

### Day 3 (Wednesday) - Component Architecture
**Tasks:**
- [ ] Create new folder structure:
  ```
  app/
  ├── components/
  │   ├── ui/
  │   ├── modules/
  │   ├── layouts/
  │   └── forms/
  ├── lib/
  ├── hooks/
  └── types/
  ```
- [ ] Build core UI components:
  - Button with variants (primary, secondary, outline)
  - Card component
  - Badge component
  - Input field
  - Loading spinner
- [ ] Create Layout components (Header, Footer, Navigation)
- [ ] Document component usage with JSDoc

**Deliverables:**
- Component library folder structure
- 5+ reusable UI components
- Layout components (Header/Footer/Nav)

**Time Estimate:** 6-8 hours

---

### Day 4 (Thursday) - Homepage Rebuild
**Tasks:**
- [ ] Redesign homepage (`app/page.tsx`) with Tailwind
- [ ] Implement hero section with modern design
- [ ] Create learning stream cards using new Card component
- [ ] Add responsive design (mobile, tablet, desktop)
- [ ] Implement hover effects and animations
- [ ] Add call-to-action sections
- [ ] Optimize typography and spacing

**Deliverables:**
- Fully redesigned homepage
- Mobile-responsive layout
- Modern UI with animations

**Time Estimate:** 6-8 hours

---

### Day 5 (Friday) - Module Pages & Testing
**Tasks:**
- [ ] Create module listing page layout
- [ ] Build module card component
- [ ] Create module detail page template
- [ ] Add progress tracking UI components
- [ ] Test all components across browsers
- [ ] Fix any styling inconsistencies
- [ ] Performance audit with Lighthouse
- [ ] Git commit: "Week 1 - Frontend modernization complete"

**Deliverables:**
- Module pages with new design
- Cross-browser tested
- Lighthouse score >90

**Time Estimate:** 6-8 hours

---

#### **Phase 2.5: Design Refinement (Course Landing Page)**
*Inspired by Industry Standards (IBM/Coursera style)*

- [ ] **Data Structure Update**: 
    - Introduce `Course` model (parent of Modules).
    - Add metadata: `skills`, `level`, `rating`, `enrollmentCount`, `instructors`.
- [ ] **New Page: `/courses/[slug]`**:
    - **Hero Section**: High-contrast, university-style header with "Enroll" CTA.
    - **Stats Bar**: Horizontal strip showing "Level", "Duration", "Schedule", "Reviews".
    - **What You'll Learn**: Checkmark grid of outcomes.
    - **Curriculum Accordion**: 
        - Vertical list of modules.
        - Detailed metadata per module (e.g., "5 videos • 2 readings • 1 quiz").
        - Expandable summary for each module.
    - **Instructor Section**: Photos and bios of course creators.
- [ ] **Components**: `CourseHero`, `StatsBar`, `CurriculumList`, `SkillsChips`, `InstructorCard`.

### **Phase 3: Backend Migration (Week 2)**
API Restructuring

### Day 1 (Monday) - API Consolidation
**Tasks:**
- [ ] Review all Azure Functions endpoints
- [ ] Create Express.js app structure:
  ```
  api/
  ├── src/
  │   ├── routes/
  │   │   ├── modules.ts
  │   │   ├── users.ts
  │   │   └── progress.ts
  │   ├── middleware/
  │   ├── services/
  │   ├── types/
  │   └── index.ts
  ```
- [ ] Migrate Azure Functions to Express routes
- [ ] Add middleware (CORS, Helmet, Auth)
- [ ] Update API documentation

**Deliverables:**
- Consolidated Express.js API
- All endpoints migrated
- API documentation updated

**Time Estimate:** 6-8 hours

---

### Day 2 (Tuesday) - Containerization
**Tasks:**
- [ ] Create `Dockerfile` for API:
  ```dockerfile
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY . .
  RUN npm run build
  EXPOSE 8080
  CMD ["node", "dist/index.js"]
  ```
- [ ] Create `.dockerignore`
- [ ] Build and test Docker image locally
- [ ] Create `cloudbuild.yaml` for Cloud Build
- [ ] Test container locally with environment variables

**Deliverables:**
- Working Dockerfile
- Local Docker build successful
- Cloud Build configuration

**Time Estimate:** 4-5 hours

---

### Day 3 (Wednesday) - Cloud Run Deployment (API)
**Tasks:**
- [ ] Deploy API to Cloud Run:
  ```bash
  gcloud run deploy maru-api \
    --source ./api \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated
  ```
- [ ] Configure environment variables in Cloud Run
- [ ] Set up Cloud Run IAM permissions
- [ ] Configure custom domain (api.maruacademy.com)
- [ ] Test all API endpoints on Cloud Run
- [ ] Set up request logging

**Deliverables:**
- API running on Cloud Run
- All endpoints accessible
- Custom domain configured

**Time Estimate:** 4-6 hours

---

### Day 4 (Thursday) - Database Setup
**Tasks:**
- [ ] Create Cloud SQL PostgreSQL instance:
  ```bash
  gcloud sql instances create maru-db \
    --database-version=POSTGRES_15 \
    --tier=db-g1-small \
    --region=us-central1 \
    --backup-start-time=03:00
  ```
- [ ] Create database and user
- [ ] Configure Cloud SQL Proxy for local development
- [ ] Set up connection pooling
- [ ] Configure automated backups
- [ ] Document connection strings

**Deliverables:**
- Cloud SQL instance running
- Database created
- Local connection working

**Time Estimate:** 4-5 hours

---

### Day 5 (Friday) - Database Migration & Testing
**Tasks:**
- [ ] Export data from Azure PostgreSQL
- [ ] Run migrations on Cloud SQL
- [ ] Import production data (if exists)
- [ ] Test all database queries
- [ ] Update API to use Cloud SQL connection
- [ ] Performance testing
- [ ] Git commit: "Week 2 - Backend migration to GCP complete"

**Deliverables:**
- All data migrated
- API connected to Cloud SQL
- All tests passing

**Time Estimate:** 6-8 hours

---

## 📅 WEEK 3: Frontend Deployment & Integration

### Day 1 (Monday) - Next.js Optimization
**Tasks:**
- [ ] Update `next.config.js` for production
- [ ] Configure image optimization
- [ ] Set up environment variables
- [ ] Implement API client with proper error handling
- [ ] Add loading states and error boundaries
- [ ] Configure metadata and SEO

**Deliverables:**
- Production-ready Next.js config
- API integration complete
- Error handling implemented

**Time Estimate:** 6-8 hours

---

### Day 2 (Tuesday) - Frontend Containerization
**Tasks:**
- [ ] Create Dockerfile for Next.js:
  ```dockerfile
  FROM node:18-alpine AS deps
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  
  FROM node:18-alpine AS builder
  WORKDIR /app
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  RUN npm run build
  
  FROM node:18-alpine AS runner
  WORKDIR /app
  ENV NODE_ENV production
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/.next/standalone ./
  COPY --from=builder /app/.next/static ./.next/static
  EXPOSE 3000
  CMD ["node", "server.js"]
  ```
- [ ] Test Docker build locally
- [ ] Optimize image size
- [ ] Create `.dockerignore`

**Deliverables:**
- Frontend Dockerfile
- Local Docker build working
- Optimized image size

**Time Estimate:** 4-5 hours

---

### Day 3 (Wednesday) - Cloud Run Deployment (Frontend)
**Tasks:**
- [ ] Deploy frontend to Cloud Run:
  ```bash
  gcloud run deploy maru-academy \
    --source . \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --memory 512Mi
  ```
- [ ] Configure environment variables
- [ ] Set up custom domain (www.maruacademy.com)
- [ ] Configure SSL certificate
- [ ] Test all pages on Cloud Run

**Deliverables:**
- Frontend live on Cloud Run
- Custom domain configured
- SSL enabled

**Time Estimate:** 4-6 hours

---

### Day 4 (Thursday) - Content Migration
**Tasks:**
- [ ] Create Cloud Storage bucket:
  ```bash
  gsutil mb -l us-central1 gs://maru-academy-content
  ```
- [ ] Upload all training content:
  ```bash
  gsutil -m cp -r content/* gs://maru-academy-content/
  ```
- [ ] Configure bucket permissions
- [ ] Enable Cloud CDN
- [ ] Create content API endpoints
- [ ] Update frontend to fetch from Cloud Storage

**Deliverables:**
- All content in Cloud Storage
- CDN configured
- Content accessible via API

**Time Estimate:** 4-5 hours

---

### Day 5 (Friday) - Integration Testing
**Tasks:**
- [ ] End-to-end testing of all features
- [ ] Test user registration/login
- [ ] Test module access
- [ ] Test progress tracking
- [ ] Performance testing (Lighthouse)
- [ ] Mobile responsiveness testing
- [ ] Git commit: "Week 3 - Full stack deployed to GCP"

**Deliverables:**
- All features working end-to-end
- Performance benchmarks met
- Mobile responsive

**Time Estimate:** 6-8 hours

---

## 📅 WEEK 4: CI/CD Pipeline & Automation

### Day 1 (Monday) - GitHub Actions Setup
**Tasks:**
- [ ] Create `.github/workflows/gcp-deploy.yml`
- [ ] Configure GCP authentication with service account
- [ ] Add GitHub secrets:
  - `GCP_PROJECT_ID`
  - `GCP_SA_KEY`
  - `DATABASE_URL`
- [ ] Test workflow with manual trigger
- [ ] Document deployment process

**Deliverables:**
- GitHub Actions workflow configured
- Secrets properly set
- Manual deployment working

**Time Estimate:** 4-5 hours

---

### Day 2 (Tuesday) - Automated Testing Pipeline
**Tasks:**
- [ ] Add test job to GitHub Actions
- [ ] Configure ESLint for code quality
- [ ] Add TypeScript type checking
- [ ] Set up Jest for unit tests
- [ ] Create sample tests for components
- [ ] Configure test coverage reporting

**Deliverables:**
- Automated testing in CI
- Type checking enforced
- Test coverage reporting

**Time Estimate:** 5-6 hours

---

### Day 3 (Wednesday) - Staging Environment
**Tasks:**
- [ ] Create staging Cloud Run services
- [ ] Configure staging database
- [ ] Set up branch-based deployments:
  - `main` → Production
  - `develop` → Staging
- [ ] Add deployment status badges to README
- [ ] Test staging deployment

**Deliverables:**
- Staging environment live
- Branch-based deployments working
- README updated

**Time Estimate:** 4-6 hours

---

### Day 4 (Thursday) - Database Automation
**Tasks:**
- [ ] Create database migration workflow
- [ ] Automate backup scheduling
- [ ] Set up Cloud SQL replication (optional)
- [ ] Create database seeding scripts
- [ ] Document database procedures

**Deliverables:**
- Automated database migrations
- Backup automation configured
- Database documentation

**Time Estimate:** 4-5 hours

---

### Day 5 (Friday) - Monitoring & Alerts
**Tasks:**
- [ ] Set up Cloud Monitoring dashboards
- [ ] Configure uptime checks
- [ ] Create alerting policies:
  - API response time >2s
  - Error rate >5%
  - Database connection failures
- [ ] Set up Cloud Logging
- [ ] Configure notification channels (email, Slack)
- [ ] Git commit: "Week 4 - CI/CD and monitoring complete"

**Deliverables:**
- Monitoring dashboards live
- Alerts configured
- Logging centralized

**Time Estimate:** 5-6 hours

---

## 📅 WEEK 5: Polish, Optimization & Documentation

### Day 1 (Monday) - Performance Optimization
**Tasks:**
- [ ] Implement code splitting
- [ ] Optimize bundle size
- [ ] Add image optimization
- [ ] Implement caching strategies
- [ ] Configure CDN for static assets
- [ ] Run performance benchmarks

**Deliverables:**
- Lighthouse score >95
- Bundle size optimized
- Caching implemented

**Time Estimate:** 6-8 hours

---

### Day 2 (Tuesday) - SEO & Accessibility
**Tasks:**
- [ ] Add meta tags to all pages
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data (JSON-LD)
- [ ] Run accessibility audit (WCAG 2.1)
- [ ] Fix accessibility issues
- [ ] Add aria labels

**Deliverables:**
- SEO optimized
- Accessibility score >90
- Sitemap generated

**Time Estimate:** 5-6 hours

---

### Day 3 (Wednesday) - PWA Enhancement
**Tasks:**
- [ ] Update service worker
- [ ] Configure offline functionality
- [ ] Add app icons (all sizes)
- [ ] Update manifest.json
- [ ] Test PWA installation
- [ ] Add push notification support (if needed)

**Deliverables:**
- PWA fully functional
- Offline mode working
- Installable on mobile

**Time Estimate:** 4-6 hours

---

### Day 4 (Thursday) - Documentation
**Tasks:**
- [ ] Update README.md with new architecture
- [ ] Create DEPLOYMENT.md guide
- [ ] Document API endpoints (OpenAPI/Swagger)
- [ ] Create developer setup guide
- [ ] Write troubleshooting guide
- [ ] Document environment variables

**Deliverables:**
- Comprehensive documentation
- API documentation
- Developer guides

**Time Estimate:** 6-8 hours

---

### Day 5 (Friday) - Security Audit
**Tasks:**
- [ ] Review IAM permissions
- [ ] Audit API authentication
- [ ] Check secret management
- [ ] Review CORS configuration
- [ ] Test rate limiting
- [ ] Run security scan (npm audit)
- [ ] Git commit: "Week 5 - Optimization and documentation"

**Deliverables:**
- Security audit report
- Vulnerabilities fixed
- Best practices implemented

**Time Estimate:** 5-6 hours

---

## 📅 WEEK 6: Migration Finalization & Launch

### Day 1 (Monday) - Data Migration (Final)
**Tasks:**
- [ ] Schedule maintenance window
- [ ] Final Azure database export
- [ ] Import to Cloud SQL
- [ ] Verify data integrity
- [ ] Test all user flows
- [ ] Update DNS records

**Deliverables:**
- All production data migrated
- DNS updated
- Zero data loss

**Time Estimate:** 4-6 hours

---

### Day 2 (Tuesday) - User Acceptance Testing
**Tasks:**
- [ ] Create UAT test plan
- [ ] Test all critical user journeys
- [ ] Test on multiple devices
- [ ] Test on different browsers
- [ ] Get stakeholder sign-off
- [ ] Document any issues

**Deliverables:**
- UAT completed
- Issues documented
- Stakeholder approval

**Time Estimate:** 6-8 hours

---

### Day 3 (Wednesday) - Go-Live Preparation
**Tasks:**
- [ ] Create rollback plan
- [ ] Prepare launch checklist
- [ ] Set up status page
- [ ] Notify users of migration
- [ ] Prepare support documentation
- [ ] Schedule team for monitoring

**Deliverables:**
- Launch checklist
- Rollback plan documented
- Team briefed

**Time Estimate:** 4-5 hours

---

### Day 4 (Thursday) - Production Launch
**Tasks:**
- [ ] Execute launch checklist
- [ ] Monitor logs and metrics
- [ ] Address any immediate issues
- [ ] Verify all services running
- [ ] Test critical paths
- [ ] Send launch announcement

**Deliverables:**
- Production live on GCP
- All systems operational
- Launch announcement sent

**Time Estimate:** Full day monitoring

---

### Day 5 (Friday) - Post-Launch & Cleanup
**Tasks:**
- [ ] Monitor for 24 hours post-launch
- [ ] Optimize based on real traffic
- [ ] Decommission Azure resources:
  - Stop Azure Functions
  - Stop Azure Static Web Apps
  - Export final logs
  - Cancel Azure subscriptions
- [ ] Update all documentation with final URLs
- [ ] Conduct retrospective meeting
- [ ] Git commit: "Week 6 - Production launch successful"

**Deliverables:**
- Azure fully decommissioned
- Post-launch report
- Retrospective notes

**Time Estimate:** 6-8 hours

---

## 📊 Success Criteria

**Technical:**
- ✅ All features from Azure migrated
- ✅ Lighthouse performance score >95
- ✅ Zero critical bugs
- ✅ <2s average page load time
- ✅ 99.9% uptime

**Business:**
- ✅ Zero downtime during migration
- ✅ Monthly costs <$60
- ✅ Automated deployments working
- ✅ Full documentation complete

**User Experience:**
- ✅ Mobile-responsive design
- ✅ Modern UI with Tailwind
- ✅ Accessibility score >90
- ✅ PWA installable

---

## 🛠️ Tools & Technologies

**Development:**
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- Express.js

**Google Cloud:**
- Cloud Run
- Cloud SQL (PostgreSQL)
- Cloud Storage
- Cloud Build
- Cloud Monitoring

**CI/CD:**
- GitHub Actions
- Docker
- Cloud Build

**Testing:**
- Jest
- React Testing Library
- Lighthouse CI

---

## 💰 Budget Breakdown

**Google Cloud Monthly Costs (Estimated):**
- Cloud Run (Frontend): $10-20
- Cloud Run (API): $10-20
- Cloud SQL (db-g1-small): $15-25
- Cloud Storage: $1-3
- Cloud CDN: $2-5
- Cloud Build: $0-5 (generous free tier)
- **Total: $38-78/month**

**One-Time Costs:**
- Domain (if new): $12/year
- SSL Certificate: Free (Google-managed)

---

## 📝 Risk Management

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Data loss during migration | Low | High | Multiple backups, test migrations |
| Extended downtime | Medium | High | Staging environment, rollback plan |
| Budget overrun | Low | Medium | Set billing alerts, monitor daily |
| Performance issues | Medium | Medium | Load testing, monitoring setup |
| Security vulnerabilities | Low | High | Security audit, regular updates |

---

## 📞 Support Contacts

**During Migration:**
- **Technical Lead:** [Your Name]
- **Google Cloud Support:** Support ticket system
- **Emergency:** Create rollback procedure

**Post-Migration:**
- **Google Cloud Console:** https://console.cloud.google.com
- **Monitoring Dashboard:** [To be created]
- **Documentation:** This repository

---

## 🎉 Next Steps After Migration

**Immediate (Week 7):**
1. Monitor performance and costs
2. Optimize based on real usage
3. User feedback collection
4. Bug fixes and improvements

**Short-term (Months 2-3):**
1. Add new features
2. Implement advanced analytics
3. User authentication enhancements
4. Content expansion

**Long-term (Months 4-6):**
1. Mobile app development
2. Advanced AI integrations
3. Team collaboration features
4. Certification system

---

**Last Updated:** December 11, 2025  
**Document Owner:** Maru AI Academy Development Team
