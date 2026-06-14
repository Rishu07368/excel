// Course and Learning Types
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: CourseLevel;
  lessons: Lesson[];
  totalDuration: number;
  totalLessons: number;
  imageUrl?: string;
  prerequisites?: string[];
}

export type CourseLevel = 
  | "beginner" 
  | "intermediate" 
  | "advanced" 
  | "expert" 
  | "professional" 
  | "master";

export type InterviewDifficulty = 
  | "beginner" 
  | "intermediate" 
  | "advanced" 
  | "analyst" 
  | "vba";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: LessonContent;
  duration: number;
  order: number;
  type: LessonType;
  objectives?: string[];
  quiz?: Quiz;
}

export type LessonType = 
  | "theory" 
  | "practical" 
  | "quiz" 
  | "project" 
  | "assessment";

export interface LessonContent {
  sections: ContentSection[];
  examples?: Example[];
  exercises?: Exercise[];
  summary?: string;
  furtherReading?: FurtherReading[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  code?: string;
  imageUrl?: string;
}

export interface Example {
  id: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  formula?: string;
  result?: unknown;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  hints?: string[];
  solution?: string;
}

export interface FurtherReading {
  title: string;
  url: string;
  type: "article" | "video" | "documentation";
}

// Quiz Types
export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export type QuestionType = 
  | "multiple-choice" 
  | "true-false" 
  | "fill-blank" 
  | "formula";

// Formula Types
export interface Formula {
  id: string;
  name: string;
  slug: string;
  category: FormulaCategory;
  purpose: string;
  syntax: string;
  arguments: FormulaArgument[];
  returnType: string;
  examples: FormulaExample[];
  commonMistakes?: string[];
  errorCases?: ErrorCase[];
  tips?: string[];
  relatedFunctions?: string[];
  isModern?: boolean;
}

export type FormulaCategory = 
  | "math" 
  | "statistical" 
  | "lookup" 
  | "text" 
  | "date" 
  | "time" 
  | "financial" 
  | "engineering" 
  | "information" 
  | "database" 
  | "logical" 
  | "reference";

export interface FormulaArgument {
  name: string;
  description: string;
  required: boolean;
  type: string;
  defaultValue?: string;
}

export interface FormulaExample {
  description: string;
  formula: string;
  result: string;
  explanation?: string;
}

export interface ErrorCase {
  formula: string;
  error: string;
  cause: string;
  solution: string;
}

// Command Types
export interface Command {
  id: string;
  name: string;
  slug: string;
  tab: RibbonTab;
  group: string;
  description: string;
  purpose: string;
  steps: string[];
  example?: CommandExample;
  bestUseCases?: string[];
  commonMistakes?: string[];
  relatedCommands?: string[];
  shortcut?: string;
  icon?: string;
}

export type RibbonTab = 
  | "home" 
  | "insert" 
  | "page-layout" 
  | "formulas" 
  | "data" 
  | "review" 
  | "view" 
  | "draw" 
  | "help" 
  | "developer";

export interface CommandExample {
  before?: string;
  after?: string;
  steps: string[];
}

// Shortcut Types
export interface Shortcut {
  id: string;
  keys: string;
  category: ShortcutCategory;
  description: string;
  useCases?: string[];
  productivityImpact?: "high" | "medium" | "low";
  windowsKeys: string;
  macKeys: string;
}

export type ShortcutCategory = 
  | "navigation" 
  | "editing" 
  | "formatting" 
  | "data" 
  | "charts" 
  | "pivot-tables" 
  | "formula-auditing" 
  | "vba" 
  | "workbook";

// Project Types
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: CourseLevel;
  estimatedTime: number;
  category: ProjectCategory;
  thumbnail?: string;
  objectives: string[];
  instructions: ProjectInstruction[];
  dataset?: ProjectDataset;
  solution?: string;
  downloadUrl?: string;
}

export type ProjectCategory = 
  | "budget" 
  | "tracking" 
  | "analysis" 
  | "reporting" 
  | "automation";

export interface ProjectInstruction {
  step: number;
  title: string;
  description: string;
  hints?: string[];
}

export interface ProjectDataset {
  headers: string[];
  rows: (string | number)[][];
}

// Interview Types
export interface InterviewQuestion {
  id: string;
  question: string;
  difficulty: InterviewDifficulty;
  category: InterviewCategory;
  answer: string;
  explanation: string;
  followUpQuestions?: string[];
  tags?: string[];
}

export type InterviewCategory = 
  | "beginner" 
  | "intermediate" 
  | "advanced" 
  | "analyst" 
  | "vba";

// Glossary Types
export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  examples?: string[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  createdAt: string;
  preferences: UserPreferences;
  stats: UserStats;
  streak: UserStreak;
  achievements: Achievement[];
  bookmarks: string[];
  notes: UserNote[];
  completedLessons: string[];
  quizScores: QuizScore[];
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  dailyGoal: number;
  notifications: boolean;
  soundEffects: boolean;
}

export interface UserStats {
  totalLessonsCompleted: number;
  totalTimeSpent: number;
  totalQuizzesTaken: number;
  averageQuizScore: number;
  currentLevel: CourseLevel;
  levelProgress: number;
}

export interface UserStreak {
  current: number;
  longest: number;
  lastActivityDate: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: "progress" | "quiz" | "exploration" | "streak";
}

export interface UserNote {
  id: string;
  lessonId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizScore {
  quizId: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

// Search Types
export interface SearchResult {
  id: string;
  type: "lesson" | "formula" | "command" | "shortcut" | "project" | "interview" | "glossary";
  title: string;
  description: string;
  url: string;
  breadcrumb?: string[];
}