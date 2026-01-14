# Enhanced Lesson Structure Implementation Plan

## Overview
Transforming the Maru AI Academy lesson experience to mirror Codecademy's effective learning approach with comprehensive feedback collection.

## Goals

### Part 1: Enhanced Lesson Structure
1. **Lesson Introduction** - Explain objectives, concepts, and benefits
2. **Exercise Hints** - Contextual help when users struggle
3. **Lesson Review** - Concept reinforcement and comprehension check
4. **Sequential Progression** - Enforce lesson completion order

### Part 2: Feedback System
1. **Feedback Form** - Collect user ratings and comments
2. **Feedback Storage** - Database persistence
3. **Feedback Reports** - Daily/weekly aggregation
4. **Feedback Review** - Team access to insights

---

## Database Schema Changes

### 1. Add Lesson Feedback Model
```prisma
model LessonFeedback {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  moduleSlug      String
  lessonSlug      String
  
  // Ratings (1-10)
  contentQuality  Int      // How well-explained was the content?
  difficulty      Int      // Was the difficulty appropriate?
  relevance       Int      // How relevant is this to your work?
  overallRating   Int      // Overall lesson rating
  
  // Text feedback
  whatWorked      String?  @db.Text  // What worked well?
  improvements    String?  @db.Text  // What could be improved?
  comments        String?  @db.Text  // Additional comments
  
  createdAt       DateTime @default(now())
  
  @@unique([userId, moduleSlug, lessonSlug])
  @@index([moduleSlug])
  @@index([lessonSlug])
  @@index([createdAt])
}
```

### 2. Extend LessonProgress for Sequential Learning
```prisma
model LessonProgress {
  // ... existing fields
  hintsViewed     Int       @default(0)  // Track hint usage
  attemptsCount   Int       @default(0)  // Exercise attempts
  reviewCompleted Boolean   @default(false)  // Lesson review done
}
```

---

## File Structure

```
app/
├── components/
│   └── modules/
│       ├── LessonIntroduction.tsx      // NEW
│       ├── LessonExercise.tsx          // NEW (with hints)
│       ├── LessonReview.tsx            // NEW
│       ├── FeedbackModal.tsx           // NEW
│       └── LessonView.tsx              // ENHANCED
├── api/
│   ├── feedback/
│   │   ├── submit/route.ts             // NEW
│   │   └── reports/route.ts            // NEW

├── modules/
│   └── [slug]/
│       └── lesson/
│           └── [lessonId]/
│               ├── page.tsx            // ENHANCED
│               └── feedback/page.tsx   // NEW
└── lib/
    └── feedback-reports.ts             // NEW
```

---

## Component Specifications

### 1. LessonIntroduction Component
```tsx
interface LessonIntro {
  objective: string;        // "Learn how to..."
  concepts: string[];       // ["Concept 1", "Concept 2"]
  benefits: string[];       // ["Why this matters"]
  estimatedTime: string;    // "15 minutes"
}
```

**Design:**
- Clean, card-based layout
- Icon for each concept
- Collapsible "Why this matters" section
- Progress indicator showing position in module

### 2. Exercise with Hints Component
```tsx
interface Exercise {
  id: string;
  instructions: string[];
  hint: {
    trigger: "After 2 failed attempts" | "On request";
    content: string;
    secondaryHint?: string;  // If they still struggle
  };
  validation: (userInput: any) => boolean;
  solution?: any;  // Optional solution to show
}
```

**Hint Display:**
- Yellow banner similar to Codecademy screenshot
- Clear "Need a hint?" button
- Progressive hints (1st hint → 2nd hint → solution)
- Track hint usage in database

### 3. Lesson Review Component
```tsx
interface LessonReview {
  questions: ReviewQuestion[];
  passingScore: number;  // default: 80%
  allowRetake: boolean;
}

interface ReviewQuestion {
  type: "multiple-choice" | "true-false" | "fill-blank";
  question: string;
  options?: string[];
  correctAnswer: number | string;
  explanation?: string;  // Show after answer
}
```

**Features:**
- 3-5 quick review questions
- Immediate feedback per question
- Can't proceed without 80% score
- Suggest AI Assistant for deeper learning
- "Ask AI Assistant" button for each concept

### 4. Feedback Modal Component
```tsx
interface FeedbackFormData {
  contentQuality: number;    // 1-10
  difficulty: number;         // 1-10
  relevance: number;          // 1-10
  overallRating: number;      // 1-10
  whatWorked?: string;
  improvements?: string;
  comments?: string;
}
```

**Trigger Points:**
- After lesson review completion
- Dismissible but encouraged
- Shows every 3rd lesson (not every lesson)
- Skippable with "Maybe later"

---

## Sequential Progression Logic

### Rules
1. **Can't skip lessons** - Must complete Lesson 1 before accessing Lesson 2
2. **Visual indicators**:
   - ✅ Completed lessons - Green checkmark, accessible
   - 🔓 Current lesson - Highlighted, accessible
   - 🔒 Locked lessons - Grayed out, not clickable
3. **Exception**: Can review any completed lesson

### Implementation
```typescript
// In module page
const getAccessibleLessons = (progress: LessonProgress[]) => {
  const completed = new Set(progress.filter(p => p.completed).map(p => p.lessonSlug));
  const lessons = module.lessons.map((lesson, index) => ({
    ...lesson,
    isAccessible: index === 0 || completed.has(module.lessons[index - 1].id),
    isCompleted: completed.has(lesson.id),
    isNext: !completed.has(lesson.id) && 
            (index === 0 || completed.has(module.lessons[index - 1].id))
  }));
  return lessons;
};
```

---

## Feedback Report Generation

### Daily Report Structure
```typescript
interface DailyFeedbackReport {
  date: string;
  totalResponses: number;
  averageRatings: {
    contentQuality: number;
    difficulty: number;
    relevance: number;
    overall: number;
  };
  byModule: {
    [moduleSlug: string]: {
      responses: number;
      averageRating: number;
      commonIssues: string[];  // AI-extracted from comments
    };
  };
  topIssues: string[];  // Most mentioned improvement areas
  topPraises: string[];  // Most mentioned successes
}
```

### Generation Schedule
- **Daily**: Generate at midnight (cron job or Vercel scheduled function)
- **Storage**: Save to `reports/feedback/YYYY-MM-DD.json`
- **Access**: Admin dashboard or file download

---

## Implementation Phases

### Phase 1: Database & API (Day 1)
- [ ] Update Prisma schema with LessonFeedback model
- [ ] Create feedback API endpoints
- [ ] Create progress checking utilities

### Phase 2: Lesson Structure (Day 2-3)
- [ ] Build LessonIntroduction component
- [ ] Build Exercise with Hints component
- [ ] Build Lesson Review component
- [ ] Update LessonView to include all sections

### Phase 3: Sequential Progression (Day 3)
- [ ] Implement lesson locking logic
- [ ] Update module page UI to show locked/unlocked state
- [ ] Block navigation to locked lessons
- [ ] Add completion validation

### Phase 4: Feedback System (Day 4)
- [ ] Build Feedback Modal component
- [ ] Create feedback submission flow
- [ ] Build report generation script
- [ ] Add admin access to reports

### Phase 5: Content Updates (Day 5+)
- [ ] Add intro/review content to all existing lessons
- [ ] Define exercises with hints
- [ ] Test sequential flow across all modules

---

## Success Metrics

### User Engagement
- % of users who complete lessons sequentially
- Average hint usage per lesson
- Lesson completion rate improvement

### Content Quality
- Average feedback ratings (target: >7/10)
- % of users requesting hints (target: <30%)
- Review quiz pass rate (target: >80% on first attempt)

### Learning Outcomes
- Time spent per lesson
- Module completion rate
- Badge earning rate

---

## Technical Considerations

### Performance
- Lazy load lesson sections (intro, content, review)
- Cache feedback aggregations
- Index feedback table by date for fast report generation

### UX
- Smooth transitions between lesson sections
- Save progress automatically
- Don't interrupt flow for feedback too often

### Accessibility
- Keyboard navigation through lesson sections
- Screen reader support for hints
- High contrast mode for review questions

---

## Next Steps
1. Review and approve this plan
2. Update database schema
3. Build components in order of dependency
4. Test with sample lessons
5. Roll out to production incrementally

**Estimated Total Time**: 5-7 days of focused development
**Priority**: High - Significant UX improvement
**Risk**: Low - Additive changes, doesn't break existing functionality
