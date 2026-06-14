# Excel Mastery Academy - Product Specification

## 1. Concept & Vision

Excel Mastery Academy is the definitive, enterprise-grade Excel learning platform designed to take users from complete beginners to Excel masters. The platform combines comprehensive educational content with an interactive learning experience that feels like having a personal Excel expert at your fingertips.

**Personality**: Professional yet approachable, data-driven in presentation, empowering through progressive mastery. The interface should feel like a premium productivity tool - think Linear meets Notion meets a world-class learning platform.

**Core Philosophy**: Learn by doing. Every concept is reinforced through interactive practice, real-world examples, and immediate feedback.

---

## 2. Design Language

### Aesthetic Direction
Inspired by Linear's clean precision, Notion's content-first approach, and Stripe's developer-friendly documentation. A sophisticated, minimal interface that prioritizes content and learning experience.

### Color Palette

**Light Theme:**
- `--background`: #FAFAFA
- `--foreground`: #0A0A0A
- `--card`: #FFFFFF
- `--card-foreground`: #0A0A0A
- `--primary`: #2563EB (Blue 600)
- `--primary-foreground`: #FFFFFF
- `--secondary`: #F4F4F5
- `--secondary-foreground`: #18181B
- `--accent`: #F0F9FF
- `--accent-foreground`: #0369A1
- `--muted`: #F4F4F5
- `--muted-foreground`: #71717A
- `--destructive`: #EF4444
- `--destructive-foreground`: #FFFFFF
- `--border`: #E4E4E7
- `--input`: #E4E4E7
- `--ring`: #2563EB
- `--success`: #22C55E
- `--warning`: #F59E0B
- `--info`: #3B82F6

**Dark Theme:**
- `--background`: #0A0A0A
- `--foreground`: #FAFAFA
- `--card`: #18181B
- `--card-foreground`: #FAFAFA
- `--primary`: #3B82F6 (Blue 500)
- `--primary-foreground`: #FFFFFF
- `--secondary`: #27272A
- `--secondary-foreground`: #FAFAFA
- `--accent`: #1E3A5F
- `--accent-foreground`: #93C5FD
- `--muted`: #27272A
- `--muted-foreground`: #A1A1AA
- `--destructive`: #DC2626
- `--destructive-foreground`: #FFFFFF
- `--border`: #27272A
- `--input`: #27272A
- `--ring`: #3B82F6
- `--success`: #22C55E
- `--warning`: #F59E0B
- `--info`: #60A5FA

### Typography
- **Headings**: Inter (Google Fonts) - weights 600, 700
- **Body**: Inter - weights 400, 500
- **Code/Formulas**: JetBrains Mono - weight 400
- **Fallbacks**: system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Border radius: 6px (small), 8px (medium), 12px (large), 16px (xl)
- Content max-width: 1280px
- Sidebar width: 280px
- Max content width: 800px

### Motion Philosophy
- **Micro-interactions**: 150ms ease-out for hovers, 200ms for state changes
- **Page transitions**: 300ms fade with subtle slide
- **Loading states**: Skeleton shimmer animation
- **Success feedback**: Subtle scale pulse (1.02) with color change
- **Progress indicators**: Smooth width transitions

### Visual Assets
- **Icons**: Lucide React - consistent 24px size, 1.5px stroke
- **Illustrations**: Custom SVG illustrations for empty states
- **Code highlighting**: Custom theme matching brand colors
- **Charts**: Recharts with brand color palette

---

## 3. Layout & Structure

### Global Layout
```
┌─────────────────────────────────────────────────────────┐
│ Header: Logo | Search | Theme Toggle | User Menu        │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Sidebar     │  Main Content Area                       │
│  Navigation  │  (Dynamic based on route)                │
│              │                                          │
│  - Home      │                                          │
│  - Learn     │                                          │
│  - Formulas  │                                          │
│  - Commands  │                                          │
│  - Shortcuts │                                          │
│  - Projects  │                                          │
│  - Practice  │                                          │
│  - Interview │                                          │
│  - Glossary  │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### Page Types
1. **Dashboard**: Grid of progress cards, recent lessons, achievements
2. **Course Page**: Lesson list with progress indicators
3. **Lesson Page**: Split view - content left, interactive playground right
4. **Reference Pages**: Searchable tables with filters
5. **Practice Page**: Full-width interactive playground
6. **Profile Page**: User stats, certificates, settings

### Responsive Strategy
- **Desktop (1280px+)**: Full sidebar, 3-column grids
- **Tablet (768px-1279px)**: Collapsible sidebar, 2-column grids
- **Mobile (<768px)**: Bottom navigation, single column, full-width content

---

## 4. Features & Interactions

### Core Features

#### 4.1 Home Dashboard
- **Welcome Section**: Personalized greeting with user name, learning streak
- **Progress Overview**: Circular progress showing overall completion
- **Continue Learning**: Last accessed lesson with resume button
- **Daily Goal**: Configurable daily learning target (lessons/minutes)
- **Achievement Showcase**: Recent badges earned
- **Recommended Next**: AI-suggested lessons based on progress

#### 4.2 Learning System
- **Course Navigation**: Hierarchical tree of lessons by level/topic
- **Lesson Content**:
  - Learning objectives (collapsible)
  - Theory section with formatted text
  - Visual examples with screenshots
  - Interactive code/formula blocks
  - Practice exercises
  - Quiz questions
  - Summary
  - Related lessons
- **Progress Tracking**: Per-lesson completion, time spent, quiz scores
- **Bookmarks**: Save any lesson for later
- **Notes**: Personal notes per lesson (stored locally)

#### 4.3 Formula Explorer
- **Searchable Database**: 300+ Excel functions
- **Function Details**:
  - Name, category, purpose
  - Syntax with argument descriptions
  - Return type
  - Multiple examples
  - Common mistakes
  - Error cases
  - Tips
  - Related functions
- **Interactive Examples**: Live formula execution
- **Category Filters**: Sidebar with all categories
- **Favorites**: Save frequently used functions

#### 4.4 Ribbon Command Explorer
- **Tab Navigation**: HOME, INSERT, PAGE LAYOUT, FORMULAS, DATA, REVIEW, VIEW, DRAW, HELP, DEVELOPER
- **Command Cards**: Description, purpose, step-by-step guide, example
- **Visual Guides**: Screenshots showing ribbon location
- **Keyboard Equivalents**: Shortcut for each command when available

#### 4.5 Shortcut Database
- **500+ Shortcuts**: Organized by category
- **Windows/Mac Toggle**: See both versions
- **Search**: Instant fuzzy search
- **Filters**: By category, by frequency
- **Copy to Clipboard**: One-click copy
- **Categories**: Navigation, Editing, Formatting, Data, Charts, Pivot Tables, Formula Auditing, VBA, Workbook Management

#### 4.6 Interactive Playground
- **Spreadsheet Simulator**: Full cell grid with formula support
- **Formula Bar**: Edit mode with syntax highlighting
- **Cell References**: Visual highlighting of referenced cells
- **Error Display**: Inline error explanations
- **Example Datasets**: Pre-loaded data for practice
- **Reset/Clear**: Reset to lesson data or clear all

#### 4.7 Project Library
- **Project Cards**: Title, difficulty, estimated time, thumbnail
- **Project Details**:
  - Description and objectives
  - Dataset (downloadable)
  - Step-by-step instructions
  - Walkthrough video (embedded)
  - Solution download
- **Categories**: Budget, Tracking, Analysis, Reporting, Automation

#### 4.8 Interview Preparation
- **Question Bank**: 500+ questions
- **Difficulty Levels**: Beginner, Intermediate, Advanced, Analyst, VBA
- **Answer Format**: Main answer, explanation, follow-up questions
- **Category Tags**: For filtering
- **Bookmark Questions**: Save for review

#### 4.9 Quiz System
- **Question Types**: Multiple choice, true/false, fill-in-blank, formula writing
- **Immediate Feedback**: Correct/incorrect with explanation
- **Score Tracking**: Per quiz and cumulative
- **Retry Option**: Re-attempt after review
- **Time Limit**: Optional timed quizzes

#### 4.10 Achievement System
- **Badge Types**: Course completion, streak milestones, quiz scores, exploration
- **Progress Indicators**: How close to next achievement
- **Showcase**: Display earned badges on profile

#### 4.11 Search System
- **Global Search**: CMD+K / CTRL+K to open
- **Search Scope**: All content types
- **Fuzzy Matching**: Handle typos
- **Category Filters**: Refine by type
- **Recent Searches**: Quick access
- **Keyboard Navigation**: Arrow keys, Enter to select

#### 4.12 Glossary
- **Alphabetical Index**: A-Z navigation
- **Search**: Instant filter
- **Terms with Definitions**: Clear explanations
- **Related Terms**: Cross-links

#### 4.13 User Profile
- **Stats Dashboard**: Total lessons, time spent, quiz average
- **Learning Streak**: Current and longest streak
- **Certificates**: Earned completion certificates
- **Bookmarks**: Saved lessons
- **Notes**: All personal notes
- **Settings**: Theme, daily goal, notifications

### Interaction Details

#### Hover States
- Cards: Subtle shadow elevation (0 4px 12px rgba(0,0,0,0.1))
- Buttons: Background lightens/darkens 10%
- Links: Underline appears
- Icons: Color transition to primary

#### Active States
- Buttons: Scale 0.98, darker background
- Cards: Border color changes to primary

#### Focus States
- Visible focus ring (ring: 2px, offset: 2px)
- High contrast for accessibility

#### Loading States
- Skeleton shimmer for content
- Spinner for actions
- Progress bar for long operations

#### Empty States
- Custom illustrations
- Helpful message
- Call-to-action button

#### Error States
- Red border/highlight
- Error message below field
- Toast notification for system errors

---

## 5. Component Inventory

### Layout Components
- `AppShell`: Main layout wrapper
- `Sidebar`: Navigation sidebar
- `Header`: Top header with search, theme toggle
- `Footer`: Minimal footer with links
- `MobileNav`: Bottom navigation for mobile

### Navigation Components
- `NavLink`: Sidebar navigation item
- `Breadcrumbs`: Current location path
- `Tabs`: Horizontal tab navigation
- `Pagination`: Page navigation for lists

### Content Components
- `Card`: Reusable card component
- `LessonCard`: Course lesson card with progress
- `FunctionCard`: Formula reference card
- `CommandCard`: Ribbon command card
- `ShortcutCard`: Keyboard shortcut card
- `ProjectCard`: Project card
- `QuestionCard`: Interview question card
- `AchievementBadge`: Achievement display

### Interactive Components
- `Button`: Primary, secondary, ghost, destructive variants
- `Input`: Text input with label and error
- `Textarea`: Multi-line input
- `Select`: Dropdown select
- `Checkbox`: Checkbox with label
- `RadioGroup`: Radio button group
- `Switch`: Toggle switch
- `Slider`: Range slider
- `Progress`: Progress bar
- `ProgressCircle`: Circular progress indicator

### Feedback Components
- `Alert`: Alert banner (success, error, warning, info)
- `Toast`: Temporary notification
- `Modal`: Dialog overlay
- `Dialog`: Confirmation dialog
- `Tooltip`: Hover tooltip
- `Popover`: Click-triggered popover
- `Skeleton`: Loading placeholder

### Data Display
- `Table`: Data table with sorting
- `TableOfContents`: Auto-generated from headings
- `CodeBlock`: Syntax highlighted code/formula
- `Callout`: Highlighted callout box
- `Badge`: Small label/tag
- `Avatar`: User avatar
- `Rating`: Star rating display

### Specialized Components
- `Spreadsheet`: Interactive playground grid
- `FormulaBar`: Formula input with validation
- `SearchModal`: Global search overlay
- `QuizQuestion`: Quiz question display
- `ProgressRing`: Circular progress with percentage

---

## 6. Technical Approach

### Framework & Build
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Build Tool**: Turbopack (via Next.js)
- **Package Manager**: npm

### Styling
- **Framework**: TailwindCSS 3.4+
- **Components**: shadcn/ui
- **CSS Variables**: For theming
- **Animation**: Framer Motion

### State Management
- **Global State**: Zustand
- **Server State**: React Query (TanStack Query)
- **Form State**: React Hook Form + Zod
- **Persistence**: localStorage for user data

### Data Layer
- **Static Content**: JSON files in /content
- **User Data**: localStorage
- **Search**: Fuse.js for client-side fuzzy search

### Key Libraries
- `lucide-react`: Icons
- `recharts`: Charts
- `@tanstack/react-table`: Tables
- `framer-motion`: Animations
- `fuse.js`: Search
- `clsx`: Class names
- `tailwind-merge`: Tailwind utilities
- `date-fns`: Date formatting
- `react-hot-toast`: Notifications

### Project Structure
```
/app
  /layout.tsx
  /page.tsx (Home)
  /dashboard/page.tsx
  /learn/[...slug]/page.tsx
  /formulas/page.tsx
  /formulas/[slug]/page.tsx
  /commands/page.tsx
  /shortcuts/page.tsx
  /projects/page.tsx
  /projects/[slug]/page.tsx
  /practice/page.tsx
  /interview/page.tsx
  /glossary/page.tsx
  /profile/page.tsx
  /api/
/components
  /ui/ (shadcn components)
  /layout/
  /navigation/
  /content/
  /interactive/
  /features/
/features
  /dashboard/
  /learning/
  /formulas/
  /commands/
  /shortcuts/
  /projects/
  /interview/
  /search/
  /quiz/
  /achievements/
  /user/
/hooks
  /useTheme.ts
  /useProgress.ts
  /useSearch.ts
  /useLocalStorage.ts
  /...
/lib
  /utils.ts
  /constants.ts
  /types.ts
  /validations.ts
/services
  /content-service.ts
  /progress-service.ts
  /user-service.ts
/types
  /content.ts
  /user.ts
  /progress.ts
/content
  /courses/
  /formulas/
  /commands/
  /shortcuts/
  /projects/
  /interview/
  /glossary/
/data
  /formulas.json
  /commands.json
  /shortcuts.json
  /interview.json
  /glossary.json
/public
  /images/
  /icons/
```

### API Design (Future-Ready)
For future backend integration, structure API routes as:
- `GET /api/courses` - List all courses
- `GET /api/courses/[slug]` - Course details with lessons
- `GET /api/lessons/[slug]` - Lesson content
- `POST /api/progress` - Update user progress
- `GET /api/user/profile` - User profile data

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 95 (all categories)

### Accessibility Requirements
- **WCAG 2.1 AA** compliance
- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation for all features
- Focus management in modals
- Screen reader announcements
- Sufficient color contrast (4.5:1 minimum)
- Reduced motion support

---

## 7. Content Structure

### Curriculum Levels

**Beginner (Level 1)**
- Excel Interface Basics
- Data Entry and Editing
- Basic Formatting
- Simple Calculations
- Managing Worksheets

**Intermediate (Level 2)**
- Intermediate Formulas
- Data Management
- Charts and Visualizations
- Printing and Layout
- Data Validation

**Advanced (Level 3)**
- Advanced Formulas
- Pivot Tables
- Data Analysis Tools
- Macros Introduction
- Collaboration Features

**Expert (Level 4)**
- Power Query
- Power Pivot
- Advanced Data Analysis
- Complex Automation
- Performance Optimization

**Professional (Level 5)**
- Business Intelligence
- Financial Modeling
- Project Management
- Database Integration
- API Integration

**Master (Level 6)**
- VBA Programming
- Advanced Automation
- Custom Solutions
- Best Practices
- Certification Preparation

### Formula Categories
- Math & Trig
- Statistical
- Lookup & Reference
- Text
- Date & Time
- Financial
- Logical
- Information
- Engineering
- Database
- Dynamic Arrays
- Compatibility

---

## 8. Success Metrics

### User Engagement
- Average session duration > 10 minutes
- Return rate > 60%
- Lesson completion rate > 70%
- Quiz pass rate > 80%

### Content Quality
- All 300+ formulas documented
- All ribbon commands covered
- 500+ shortcuts catalogued
- 100+ interview questions
- 10+ complete projects

### Technical Performance
- Lighthouse Score > 95
- Zero console errors
- 100% test coverage for critical paths
- Accessibility Score > 95
- Zero WCAG violations

### User Satisfaction
- Net Promoter Score > 70
- Support ticket resolution < 24 hours
- Feature request implementation > 80%