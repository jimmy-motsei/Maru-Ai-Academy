# Week 1 Quick Start Checklist

**Goal**: Get essential features working this week  
**Time Commitment**: ~30-35 hours (6-7 hours/day)

---

## 🎯 Priority Tasks (In Order)

### ✅ Day 1: AI Chatbot Activation (3-4 hours)

- [ ] **Get Gemini API Key**:
  - Go to https://makersuite.google.com/app/apikey
  - Create API key
  - Copy the key

- [ ] **Add to Vercel**:
  ```bash
  # Via CLI (if installed)
  vercel env add GEMINI_API_KEY production
  
  # Or via dashboard:
  # 1. Go to Vercel dashboard → Your project
  # 2. Settings → Environment Variables
  # 3. Add: GEMINI_API_KEY = your_key
  # 4. Redeploy (Production → Redeploy)
  ```

- [ ] **Test Chatbot**:
  - Go to production site
  - Click chat widget
  - Send a test message
  - Confirm AI responds

- [ ] **(Optional) Add Rate Limiting**:
  - Edit `/app/api/chat/route.ts`
  - Add simple rate limiting logic
  - Prevent abuse

**Success**: Users can chat with AI assistant on live site

---

### ✅ Day 2: Email Integration (5-6 hours)

- [ ] **Sign up for Resend**:
  - Go to https://resend.com
  - Create account (free tier: 100 emails/day)
  - Get API key from dashboard

- [ ] **Install Resend**:
  ```bash
  npm install resend
  ```

- [ ] **Add API Key to Environment**:
  ```bash
  # Local (.env.local)
  RESEND_API_KEY=re_your_key
  FROM_EMAIL=noreply@yourdomain.com
  
  # Production (Vercel)
  vercel env add RESEND_API_KEY production
  vercel env add FROM_EMAIL production
  ```

- [ ] **Create Email Templates** in `/app/lib/emails/`:
  - `welcome.tsx` - Welcome email
  - `contact-notification.tsx` - Admin notification
  - `support-ticket.tsx` - Support confirmation

- [ ] **Create Email API Route** (`/app/api/emails/send/route.ts`):
  ```typescript
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  export async function POST(req: Request) {
    const { to, subject, template, data } = await req.json();
    // Send email logic
  }
  ```

- [ ] **Update Signup Route** to send welcome email:
  ```typescript
  // After user created in /app/api/auth/signup/route.ts
  await fetch('/api/emails/send', {
    method: 'POST',
    body: JSON.stringify({
      to: email,
      subject: 'Welcome to Maru AI Academy',
      template: 'welcome',
      data: { name }
    })
  });
  ```

- [ ] **Test**:
  - Create a test account
  - Confirm welcome email received
  - Check spam folder if not in inbox

**Success**: New users receive welcome emails

---

### ✅ Day 3: Form Handlers (6-8 hours)

#### **Contact Form** (2 hours)

- [ ] **Create API Route** (`/app/api/contact/route.ts`):
  ```typescript
  export async function POST(req: Request) {
    const { name, email, message } = await req.json();
    
    // 1. Save to database (optional)
    // 2. Send email to admin
    // 3. Return success
  }
  ```

- [ ] **Update Frontend** (`/app/contact/page.tsx`):
  - Add form submission handler
  - Show success/error messages
  - Clear form on success

#### **Support Form** (2-3 hours)

- [ ] **Update Prisma Schema** (`/prisma/schema.prisma`):
  ```prisma
  model SupportTicket {
    id        String   @id @default(cuid())
    userId    String?
    email     String
    subject   String
    message   String   @db.Text
    status    String   @default("open") // open, pending, closed
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  ```

- [ ] **Run Migration**:
  ```bash
  npx prisma migrate dev --name add_support_tickets
  npx prisma generate
  git add .
  git commit -m "Add support ticket schema"
  git push
  ```

- [ ] **Create API Route** (`/app/api/support/route.ts`)
- [ ] **Update Frontend** (`/app/support/page.tsx`)
- [ ] **Send Confirmation Email** to user

#### **Settings Update** (2-3 hours)

- [ ] **Create API Route** (`/app/api/user/update/route.ts`):
  - Handle profile updates (name, email)
  - Handle password changes (verify old, hash new)
  - Validate inputs

- [ ] **Update Frontend** (`/app/settings/page.tsx`):
  - Wire up form submission
  - Show success notifications
  - Handle errors gracefully

**Success**: All forms save data and send emails

---

### ✅ Day 4: Content Development (6-8 hours)

- [ ] **Choose 3 Modules to Complete**:
  - "AI Made Simple" (Beginner)
  - "Prompt Engineering Fundamentals" (Beginner)
  - One Intermediate module

- [ ] **For Each Module, Add**:
  - Detailed lesson descriptions
  - Key learning objectives
  - Real examples and use cases
  - Resources and links
  - Estimated time to complete

- [ ] **Update Module Data** in `/app/types/modules.ts`

- [ ] **Create Lesson Content**:
  - Write lesson material (can be markdown)
  - Add images/diagrams if helpful
  - Create quiz questions (3-5 per lesson)

- [ ] **Test**:
  - Navigate through lessons
  - Ensure formatting looks good
  - Check responsive display

**Success**: 3 modules have complete, educational content

---

### ✅ Day 5: Progress Tracking (6-8 hours)

- [ ] **Update Prisma Schema**:
  ```prisma
  model LessonProgress {
    id          String   @id @default(cuid())
    userId      String
    user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    moduleSlug  String
    lessonSlug  String
    completed   Boolean  @default(false)
    completedAt DateTime?
    timeSpent   Int      @default(0) // seconds
    score       Int?     // quiz score %
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
    
    @@unique([userId, moduleSlug, lessonSlug])
    @@index([userId])
  }
  ```

- [ ] **Run Migration**:
  ```bash
  npx prisma migrate dev --name add_lesson_progress
  npx prisma generate
  ```

- [ ] **Create Progress API Routes**:
  - `POST /api/progress/mark-complete` - Mark lesson done
  - `POST /api/progress/update-time` - Track time spent
  - `GET /api/progress/user` - Get all user progress
  - `GET /api/progress/module/[slug]` - Get module progress

- [ ] **Update Lesson Pages**:
  - Add "Mark as Complete" button
  - Add time tracking (start timer on page load)
  - Show completion status
  - Add progress bar

- [ ] **Update Dashboard**:
  - Fetch user progress on load
  - Display:
    - Total lessons completed
    - % completion per module
    - Time spent learning
    - Next recommended lesson
  - Add visual progress indicators

- [ ] **Test Full Flow**:
  1. Start a lesson
  2. Click "Mark as Complete"
  3. Check database (should have new record)
  4. Go to dashboard (should show 1 completed)
  5. Return to lesson (should show "Completed")

**Success**: Users can track progress, data persists

---

## 🎯 End of Week 1 Goals

By Friday evening, you should have:

- ✅ AI chatbot responding to users
- ✅ Email notifications working (welcome, support)
- ✅ All forms submitting and saving data
- ✅ 3 modules with complete lesson content
- ✅ Progress tracking fully functional
- ✅ Dashboard showing real progress data

---

## 🛠️ Helpful Commands

### **Development**
```bash
# Start dev server
npm run dev

# Type check
npm run type-check

# Database
npx prisma studio          # View database in browser
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate Prisma Client

# Deploy
git add .
git commit -m "Your message"
git push origin main       # Auto-deploys to Vercel
```

### **Debugging**
```bash
# Check logs
vercel logs                # Production logs

# Check build
vercel build               # Test build locally

# Environment variables
vercel env ls              # List env vars
```

---

## 📋 Pre-Flight Checklist

Before starting Day 1:

- [ ] `npm install` completed successfully
- [ ] Local dev server runs (`npm run dev`)
- [ ] Database connection works (test query in Prisma Studio)
- [ ] Git repository is clean and up to date
- [ ] You have ~6 hours available this week

---

## 🆘 Troubleshooting

### **Email not sending**
- Check RESEND_API_KEY is set in Vercel
- Verify FROM_EMAIL is a domain you own
- Check Resend dashboard for error logs
- Try sending a test email via Resend UI first

### **Database migration fails**
- Check DATABASE_URL is correct
- Ensure Neon database is running
- Try: `npx prisma migrate reset` (⚠️ deletes data)
- Check Prisma schema syntax

### **Chatbot not responding**
- Check GEMINI_API_KEY is set
- Verify API key is valid in Google AI Studio
- Check browser console for errors
- Check `/api/chat` route logs

### **Forms not submitting**
- Check browser console for errors
- Verify API route is created
- Check network tab for failed requests
- Ensure CSRF/auth isn't blocking

---

## 💡 Tips for Success

1. **Work in order** - Don't skip ahead, each day builds on previous
2. **Test as you go** - Don't wait until Friday to test everything
3. **Commit often** - `git commit` after each working feature
4. **Use Prisma Studio** - Visual database tool helps debug
5. **Check Vercel logs** - When production breaks, logs tell you why
6. **Ask for help** - If stuck >30 min, ask AI assistant or community

---

## 📅 Daily Time Budget

| Day | Task | Estimated Time | Actual Time |
|-----|------|----------------|-------------|
| Mon | AI Chatbot | 3-4 hours | ___ |
| Tue | Email Integration | 5-6 hours | ___ |
| Wed | Form Handlers | 6-8 hours | ___ |
| Thu | Content Development | 6-8 hours | ___ |
| Fri | Progress Tracking | 6-8 hours | ___ |
| **Total** | | **26-34 hours** | ___ |

---

## 🎉 Celebration Criteria

At the end of Week 1, you should be able to:

1. Create a new account
2. Receive a welcome email
3. Ask the chatbot a question
4. Complete a lesson
5. See progress on dashboard
6. Submit a support ticket
7. Update your profile

**If all 7 work, you're crushing it! 🚀**

---

**Ready to start?** Begin with Day 1 (AI Chatbot Activation) and work your way through. Each task is designed to be completable in the estimated time.

**Questions?** Refer to:
- `BUILD_PLAN_UPDATED.md` for detailed implementation
- `DEPLOYMENT_OPTIONS.md` for platform-specific help
- `MIGRATION_PLAN.md` for original architecture vision

**Let's build! 💪**
