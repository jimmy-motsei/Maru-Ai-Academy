# Maru AI Academy - Updated Build Plan
**Platform-Agnostic Development Strategy**

**Last Updated**: December 19, 2024  
**Current Status**: MVP Core Complete, Feature Build Phase  
**Deployment**: Vercel (temporary), Cloud-Ready Architecture

---

## 🎯 Current Objective

Build out core platform features while maintaining deployment flexibility. The application will be built to run on:
- ✅ Vercel (current)
- ✅ Google Cloud Run
- ✅ Azure App Service
- ✅ AWS Amplify/ECS
- ✅ Any Docker-capable platform

---

## 📊 Current State Assessment

### ✅ **COMPLETED**
- Next.js 14 application with App Router
- Tailwind CSS design system
- Authentication (NextAuth.js)
- Database (Prisma + Neon PostgreSQL)
- Basic module system
- User dashboard
- Subscription logic (Free, Pro, Team)
- 16 pages deployed and functional
- CI/CD via Vercel (git push → deploy)

### ⚠️ **IN PROGRESS**
- Content for training modules
- AI chatbot integration (UI complete, needs API key)
- Email notifications
- Payment processing

### ❌ **NOT STARTED**
- Comprehensive testing suite
- Admin dashboard
- Advanced analytics
- Certificate generation
- Team collaboration features

---

## 🚀 **3-Week Sprint Plan**

### **WEEK 1: Essential Features & Explainer Video Foundation**

#### **Day 1 (Monday): AI Chatbot Activation**
**Goal**: Enable the Gemini-powered chatbot for user support

**Tasks**:
- [ ] Add `GEMINI_API_KEY` to Vercel environment variables
- [ ] Test chatbot with sample queries
- [ ] Add conversation history in database (optional)
- [ ] Implement rate limiting for API calls
- [ ] Add fallback responses when API is unavailable
- [ ] Test on mobile devices

**Deliverables**:
- Live AI chatbot on production
- User can ask questions about courses
- Bot provides helpful responses

**Time**: 3-4 hours

---

#### **Day 2 (Tuesday): Email Integration**
**Goal**: Set up transactional emails for user actions

**Tasks**:
- [ ] Choose email provider (Resend recommended - simple, affordable)
- [ ] Install and configure SDK:
  ```bash
  npm install resend
  ```
- [ ] Create email templates:
  - Welcome email (on signup)
  - Password reset
  - Course enrollment confirmation
  - Weekly progress digest
- [ ] Create `/app/api/emails/send/route.ts`
- [ ] Update signup flow to send welcome email
- [ ] Add "Contact Support" email handler
- [ ] Test all email flows

**Deliverables**:
- Welcome emails sent on signup
- Contact form sends emails to support
- Password reset emails working

**Time**: 5-6 hours

---

#### **Day 3 (Wednesday): Form Handlers & APIs**
**Goal**: Make all forms functional with proper backend logic

**Tasks**:
- [ ] **Contact Form** (`/contact`):
  - Create `/app/api/contact/route.ts`
  - Save submissions to database
  - Send notification email
  - Return success/error message
  
- [ ] **Support Form** (`/support`):
  - Create `/app/api/support/route.ts`
  - Create `SupportTicket` model in Prisma
  - Save to database
  - Send confirmation email
  
- [ ] **Settings Update** (`/settings`):
  - Create `/app/api/user/update/route.ts`
  - Handle profile updates (name, email)
  - Handle password changes (with bcrypt)
  - Validate inputs server-side

- [ ] **Lead Capture**:
  - Update `/app/api/leads/route.ts` if needed
  - Add to mailing list (integration ready)

**Deliverables**:
- All forms submit successfully
- Data persisted in database
- Email notifications sent
- User feedback on success/error

**Time**: 6-8 hours

---

#### **Day 4 (Thursday): High-Quality Explainer Video Production**
**Goal**: Produce professional explainer videos for key lessons

**Modern Explainer Video Strategy**:
- **AI-powered production** using Synthesia + Canva Pro
- **Template-based workflow** for consistency and speed
- **Batch production** to maximize efficiency
- **Professional animated style** with AI avatars

**Tasks**:
- [ ] **Set up explainer video production**:
  - Subscribe to Synthesia ($30/month) + Canva Pro ($15/month)
  - Create branded video templates (intro/outro, color schemes)
  - Develop script framework: Hook → Explain → Apply → Act
  - Set up quality checklist and batch workflow

- [ ] **AI-powered script generation**:
  ```
  Use ChatGPT with prompt:
  "Create a 5-minute explainer video script for [topic].
  Target: Business professionals new to AI.
  Structure: Hook (0-15s), Explain (15s-4min), Apply (4-5min), Act (5-6min).
  Include visual cues and timing markers."
  ```

- [ ] **Produce priority explainer videos** (8-10 videos):
  - **Beginner Priority**: "What is AI? (Explained Simply)" (5 min), "The 5-Part Prompt Formula" (6 min), "No-Code Automation Demo" (8 min)
  - **Intermediate Priority**: "From Chaos to Templates" (6 min), "RAG Explained Simply" (8 min)
  - Use Synthesia AI avatars with professional backgrounds
  - Add custom graphics and animations from Canva
  - Include captions and accessibility features

- [ ] **Efficient production process** (45 min per video):
  1. AI script generation (8 min)
  2. Storyboard in Canva (7 min)
  3. Synthesia production (20 min)
  4. Enhancement & polish (8 min)
  5. Review & export (2 min)

**Deliverables**:
- 8-10 professional explainer videos
- Consistent branding and messaging
- Template system for future videos
- Multi-format exports with captions

**Time**: 6-8 hours

---

#### **Day 5 (Friday): Progress Tracking Enhancements**
**Goal**: Make progress tracking fully functional and persistent

**Tasks**:
- [ ] Update Prisma schema to add:
  ```prisma
  model LessonProgress {
    id          String   @id @default(cuid())
    userId      String
    user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    moduleSlug  String
    lessonSlug  String
    completed   Boolean  @default(false)
    completedAt DateTime?
    timeSpent   Int      @default(0) // in seconds
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
    
    @@unique([userId, moduleSlug, lessonSlug])
  }
  ```

- [ ] Run migration: `npx prisma migrate dev --name add_lesson_progress`
- [ ] Create `/app/api/progress/[action]/route.ts`:
  - `POST /api/progress/mark-complete` - Mark lesson as done
  - `POST /api/progress/update-time` - Track time spent
  - `GET /api/progress/user` - Get all user progress
  
- [ ] Update dashboard to show:
  - % completion per module
  - Total lessons completed
  - Current streak (days in a row)
  - Next recommended lesson

- [ ] Add "Mark as Complete" button to lessons
- [ ] Add progress bar to module pages
- [ ] Wire up frontend to API

**Deliverables**:
- Users can mark lessons as complete
- Progress persists in database
- Dashboard shows accurate progress
- Recommendations work

**Time**: 6-8 hours

---

### **WEEK 2: Explainer Video Production & Payment Integration**

#### **Day 1 (Monday): Stripe Setup**
**Goal**: Enable real subscription payments

**Tasks**:
- [ ] Create Stripe account
- [ ] Install Stripe SDK:
  ```bash
  npm install stripe @stripe/stripe-js
  ```
- [ ] Create Stripe products and prices:
  - Starter: $0/month (free tier)
  - Pro: $29/month (or your price)
  - Team: $99/month (or your price)
  
- [ ] Create `/app/api/stripe/checkout/route.ts`
- [ ] Create `/app/api/stripe/webhook/route.ts` for events
- [ ] Update pricing page with real Stripe checkout
- [ ] Add Customer Portal for subscription management
- [ ] Test checkout flow (use Stripe test mode)

**Deliverables**:
- Users can subscribe to Pro/Team plans
- Payments processed through Stripe
- Subscription status syncs to database
- Users can manage subscriptions

**Time**: 6-8 hours

---

#### **Day 2 (Tuesday): Explainer Video Production Scale-Up**
**Goal**: Complete remaining explainer videos using batch production

**Tasks**:
- [ ] **Batch script generation for remaining videos**:
  - Generate scripts for 10-12 additional videos
  - Focus on complex concepts that benefit from visual explanation
  - Use AI prompts for consistency across all scripts

- [ ] **Synthesia batch production**:
  - **Beginner Stream** (6 videos): Email Templates, Tool Selection, Workflow Planning, etc.
  - **Intermediate Stream** (6 videos): Quality Gates, Knowledge Base Building, ROI Measurement, etc.
  - Apply consistent branding and templates
  - Add custom graphics and screen recordings where needed

- [ ] **Video enhancement and optimization**:
  - Add interactive elements and CTAs
  - Optimize for mobile viewing
  - Create video thumbnails and descriptions
  - Set up video analytics tracking

- [ ] **Platform integration**:
  - Embed videos in lesson pages
  - Add video progress tracking
  - Configure video hosting (YouTube unlisted + Vimeo backup)
  - Test video loading and playback

**Deliverables**:
- 18-20 total professional explainer videos
- All videos embedded and functional in platform
- Video progress tracking working
- Mobile-optimized video experience

**Time**: 6-8 hours

---

#### **Day 3 (Wednesday): Content Development & Video Integration**
**Goal**: Complete missing content and integrate explainer videos

**Tasks**:
- [ ] **Complete missing module content files**:
  - Create `Beginner_Module_3_No-code_quick_wins.md`
  - Create `Beginner_Module_4_Your_first_live_workflow.md`
  - Extract content from existing scripts and lesson plans

- [ ] **Update frontend content integration**:
  - Update `app/types/modules.ts` with complete lesson arrays
  - Add video URLs from explainer video production
  - Create content parser utility for markdown files
  - Update lesson pages to display videos and content

- [ ] **Video platform integration**:
  - Embed explainer videos in lesson pages
  - Add video progress tracking
  - Configure video analytics
  - Test video loading and mobile playback

**Deliverables**:
- All 8 modules with complete content
- Explainer videos integrated into lessons
- Video progress tracking functional
- Mobile-optimized video experience

**Time**: 6-8 hours

---

#### **Day 4 (Thursday): Interactive Quizzes**
**Goal**: Implement quiz functionality for lessons

**Tasks**:
- [ ] Update module data to include quiz questions:
  ```typescript
  {
    type: 'quiz',
    title: 'Knowledge Check',
    questions: [
      {
        question: 'What is AI?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: '...'
      }
    ]
  }
  ```

- [ ] Create `QuizComponent.tsx`:
  - Display questions one at a time
  - Track user answers
  - Show score at the end
  - Display explanations for incorrect answers
  - Allow retry

- [ ] Save quiz results to database
- [ ] Require 70% pass rate to mark lesson complete
- [ ] Add quiz scores to dashboard
- [ ] Create at least 2 quizzes for completed modules

**Deliverables**:
- Users can take quizzes in lessons
- Scores saved to database
- Pass/fail logic enforced
- Users can retry failed quizzes

**Time**: 6-8 hours

---

#### **Day 5 (Friday): Analytics & Insights**
**Goal**: Add analytics to understand user behavior

**Tasks**:
- [ ] Install analytics (choose one):
  - Vercel Analytics (easiest)
  - Google Analytics 4
  - PostHog (privacy-focused)
  
- [ ] Track key events:
  - Page views
  - User signups
  - Lesson completions
  - Quiz attempts
  - Subscription upgrades
  - Time spent per lesson

- [ ] Create admin analytics page (`/admin/analytics`):
  - Total users
  - Active users (last 7 days)
  - Popular modules
  - Conversion rate (free → Pro)
  - Revenue metrics
  
- [ ] Set up custom dashboards
- [ ] Add user activity log to database (optional)
- [ ] Test tracking in production

**Deliverables**:
- Analytics tracking live
- Admin can view key metrics
- Data-driven insights available

**Time**: 5-6 hours

---

### **WEEK 3: Testing, Documentation & Deployment Prep**

#### **Day 1 (Monday): Automated Testing**
**Goal**: Add test coverage for critical paths

**Tasks**:
- [ ] Install testing libraries:
  ```bash
  npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
  ```
- [ ] Configure Jest for Next.js
- [ ] Write unit tests for:
  - Authentication functions
  - Progress tracking logic
  - Subscription validation
  - Quiz grading logic
  
- [ ] Write integration tests for:
  - User signup flow
  - Lesson completion flow
  - Subscription upgrade flow
  
- [ ] Set up test database
- [ ] Add test command to `package.json`
- [ ] Run tests locally
- [ ] Aim for >60% code coverage on critical paths

**Deliverables**:
- Test suite running
- Critical user flows tested
- Tests pass locally

**Time**: 6-8 hours

---

#### **Day 2 (Tuesday): Admin Dashboard**
**Goal**: Create basic admin panel for content management

**Tasks**:
- [ ] Create admin role in database:
  ```prisma
  enum Role {
    USER
    ADMIN
  }
  ```
- [ ] Add `role` field to User model
- [ ] Create `/admin` route group (protected)
- [ ] Create admin pages:
  - `/admin/users` - View all users
  - `/admin/modules` - Manage modules
  - `/admin/support` - View support tickets
  - `/admin/analytics` - Platform metrics
  
- [ ] Add middleware to protect admin routes
- [ ] Create admin navigation
- [ ] Add basic CRUD operations for modules
- [ ] Make yourself an admin in the database

**Deliverables**:
- Admin dashboard accessible
- Can view users and support tickets
- Can edit module content
- Only admins can access

**Time**: 6-8 hours

---

#### **Day 3 (Wednesday): Cloud Deployment Preparation**
**Goal**: Make the app deployable to any cloud platform

**Tasks**:
- [ ] **Create Dockerfile for Next.js** (if deploying to Cloud Run/Azure/AWS):
  ```dockerfile
  FROM node:18-alpine AS base
  
  # Install dependencies
  FROM base AS deps
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  
  # Build application
  FROM base AS builder
  WORKDIR /app
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  RUN npx prisma generate
  RUN npm run build
  
  # Production image
  FROM base AS runner
  WORKDIR /app
  ENV NODE_ENV production
  
  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nextjs
  
  COPY --from=builder /app/public ./public
  COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
  COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
  
  USER nextjs
  EXPOSE 3000
  ENV PORT 3000
  
  CMD ["node", "server.js"]
  ```

- [ ] Update `next.config.js` for standalone output:
  ```javascript
  output: 'standalone'
  ```

- [ ] Create `.dockerignore`
- [ ] Test Docker build locally:
  ```bash
  docker build -t maru-academy .
  docker run -p 3000:3000 maru-academy
  ```

- [ ] Document environment variables needed
- [ ] Create deployment guides for:
  - Google Cloud Run
  - Azure App Service
  - AWS ECS/Amplify
  - Railway/Render

**Deliverables**:
- Docker image builds successfully
- App runs in container locally
- Deployment guides documented
- Ready for any cloud platform

**Time**: 5-6 hours

---

#### **Day 4 (Thursday): Performance Optimization**
**Goal**: Ensure fast load times and good UX

**Tasks**:
- [ ] Run Lighthouse audit on all pages
- [ ] Optimize images:
  - Use Next.js Image component
  - Add proper width/height
  - Use WebP format
  - Lazy load below the fold
  
- [ ] Code splitting:
  - Dynamic imports for heavy components
  - Route-based splitting (automatic in Next.js)
  
- [ ] Database optimization:
  - Add indexes to frequently queried fields
  - Optimize N+1 queries
  - Add connection pooling if needed
  
- [ ] Caching:
  - Add React Server Component caching
  - API route caching where appropriate
  - Static page generation for marketing pages
  
- [ ] Bundle analysis:
  ```bash
  npm install -D @next/bundle-analyzer
  ```
  - Identify large dependencies
  - Remove unused code
  
- [ ] Target metrics:
  - Lighthouse score >90
  - First Contentful Paint <1.5s
  - Time to Interactive <3s

**Deliverables**:
- Lighthouse score >90 on all pages
- Fast page loads
- Optimized bundle size
- Database queries efficient

**Time**: 6-8 hours

---

#### **Day 5 (Friday): Documentation & Launch Prep**
**Goal**: Comprehensive documentation for handoff/maintenance

**Tasks**:
- [ ] Update `README.md` with:
  - Project overview
  - Tech stack
  - Local development setup
  - Environment variables
  - Deployment instructions
  
- [ ] Create `DEPLOYMENT.md`:
  - Vercel deployment (current)
  - Google Cloud Run deployment
  - Azure App Service deployment
  - Environment variable setup
  - Database migration steps
  
- [ ] Create `CONTRIBUTING.md`:
  - Code style guide
  - Component structure
  - API conventions
  - Testing requirements
  
- [ ] Create `API_DOCUMENTATION.md`:
  - All API routes documented
  - Request/response examples
  - Authentication requirements
  - Error codes
  
- [ ] Create `USER_GUIDE.md`:
  - How to use the platform
  - FAQ
  - Troubleshooting
  
- [ ] Update Prisma schema documentation
- [ ] Add JSDoc comments to key functions
- [ ] Review and clean up commented code
- [ ] Create CHANGELOG.md

**Deliverables**:
- Comprehensive documentation
- Easy for new developers to onboard
- Deployment procedures documented
- API fully documented

**Time**: 6-8 hours

---

## 🎯 Success Criteria (End of 3 Weeks)

### **Technical**
- ✅ All forms functional with backend
- ✅ Email notifications working
- ✅ Payment integration live (Stripe)
- ✅ Progress tracking fully functional
- ✅ Certificates generated on completion
- ✅ Quizzes implemented and working
- ✅ Analytics tracking user behavior
- ✅ Admin dashboard operational
- ✅ Docker containerized
- ✅ Performance score >90
- ✅ Test coverage >60% on critical paths

### **Content**
- ✅ 3+ modules with complete content
- ✅ Real lesson material (not placeholders)
- ✅ Quizzes for each module
- ✅ Certificates designed and implemented

### **Business**
- ✅ Users can sign up and pay
- ✅ Subscription management working
- ✅ Content gating enforced
- ✅ Email communications automated
- ✅ Analytics for decision-making

---

## 🚀 Deployment Options (Ready for Any Platform)

### **Option 1: Vercel (Current - Recommended for MVP)**
**Cost**: $0-20/month  
**Pros**: Zero config, automatic deployments, edge network  
**Cons**: Vendor lock-in, limited backend control

**Deploy**: `git push origin main`

---

### **Option 2: Google Cloud Run**
**Cost**: $20-50/month  
**Pros**: Full control, Docker-based, auto-scaling  
**Cons**: More setup, requires Docker knowledge

**Deploy**:
```bash
gcloud run deploy maru-academy \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

### **Option 3: Azure App Service**
**Cost**: $25-55/month  
**Pros**: Microsoft ecosystem, good for enterprises  
**Cons**: More expensive, complex pricing

**Deploy**: Via Azure Portal or Azure CLI

---

### **Option 4: Railway/Render**
**Cost**: $10-30/month  
**Pros**: Simple, Heroku-like, affordable  
**Cons**: Smaller platform, less mature

**Deploy**: Connect GitHub repo, automatic deploys

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│              Users (Web/Mobile)                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│         Next.js Application (Frontend)           │
│  • React Components                             │
│  • Server Components                            │
│  • Tailwind CSS                                 │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│         Next.js API Routes (Backend)            │
│  • /api/auth/*          - Authentication        │
│  • /api/progress/*      - Progress tracking     │
│  • /api/stripe/*        - Payments              │
│  • /api/chat/*          - AI chatbot            │
│  • /api/emails/*        - Email sending         │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌──────────────┐    ┌──────────────┐
│   Database   │    │  External    │
│              │    │  Services    │
│  Neon        │    │             │
│  PostgreSQL  │    │  • Stripe    │
│  (or any     │    │  • Resend    │
│   Postgres)  │    │  • Gemini    │
└──────────────┘    └──────────────┘
```

---

## 💰 Cost Estimate (Monthly)

### **Content Development Tools**
- **Explainer Videos**: Synthesia ($30/month) + Canva Pro ($15/month)
- **AI Script Generation**: ChatGPT Plus ($20/month)
- **Video Hosting**: YouTube (free) + Vimeo Pro ($20/month) backup
- **Design Assets**: Unsplash Pro ($10/month)
- **Email**: Resend ($0-5/month)
- **Analytics**: Vercel Analytics (free)

### **Enhanced Stack with Explainer Videos**
- Frontend: $0 (Vercel Hobby)
- Database: $0 (Neon Free tier)
- Explainer Videos: $65/month (Synthesia + Canva + ChatGPT)
- Video Hosting: $20/month (Vimeo Pro backup)
- Email: $0-5 (Resend)
- Payments: $0 + 2.9% + $0.30 per transaction (Stripe)
- **Total: $85-90/month + payment processing**

**Note**: Video production tools can be canceled after 2-month production period, reducing ongoing costs to $20-25/month.

### **Azure Stack**
- App Service: $25-55
- Azure Database for PostgreSQL: $20-40
- Storage: $2-5
- **Total: $47-100/month**

**Recommendation**: Start with Vercel, migrate to cloud when:
- Monthly active users >10,000
- Need custom server logic Vercel can't handle
- Enterprise compliance requirements

---

## 🐛 Risk Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Payment integration complexity | High | Medium | Use Stripe's pre-built checkout, extensive docs |
| Email deliverability issues | Medium | Low | Use Resend (built for developers), proper DNS setup |
| Database scaling | High | Low | Neon auto-scales, can upgrade plan or migrate |
| AI API rate limits | Medium | Medium | Implement caching, fallback responses |
| Security vulnerabilities | High | Medium | Regular `npm audit`, follow OWASP guidelines |
| User data loss | High | Low | Automated backups (Neon does this), test restores |

---

## 📞 Support Resources

**Development**:
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Stripe Docs: https://stripe.com/docs
- Tailwind Docs: https://tailwindcss.com/docs

**Deployment**:
- Vercel: https://vercel.com/docs
- Google Cloud: https://cloud.google.com/run/docs
- Azure: https://learn.microsoft.com/azure

---

## 🎉 Next Steps After 3 Weeks

### **Month 2: Scale & Enhance**
- Mobile responsiveness improvements
- Advanced analytics and reporting
- Team collaboration features
- API rate limiting and security hardening
- SEO optimization
- Blog/content marketing integration

### **Month 3: Growth Features**
- Referral program
- Affiliate system
- Advanced certification paths
- Integration with LMS platforms
- Webinar integration
- Community forum

### **Month 4+: Enterprise**
- SSO (Single Sign-On)
- White-label options
- Advanced admin controls
- Custom integrations
- SLA guarantees
- Dedicated support

---

**Decision Point**: At any time during this 3-week sprint, you can decide which cloud platform to deploy to. The code will work on any of them with minimal changes.

**Last Updated**: December 19, 2024  
**Status**: Ready to Execute 🚀
