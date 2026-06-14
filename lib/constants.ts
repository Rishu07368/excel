export const SITE_NAME = "Excel Mastery Academy";
export const SITE_DESCRIPTION = "The definitive Excel learning platform - from beginner to master";
export const SITE_URL = "https://excelmasteryacademy.com";

export const LEARNING_LEVELS = [
  { id: "beginner", name: "Beginner", color: "#22C55E", description: "Start your Excel journey" },
  { id: "intermediate", name: "Intermediate", color: "#3B82F6", description: "Build on your foundation" },
  { id: "advanced", name: "Advanced", color: "#8B5CF6", description: "Master complex features" },
  { id: "expert", name: "Expert", color: "#F97316", description: "Become a power user" },
  { id: "professional", name: "Professional", color: "#EF4444", description: "Industry-ready skills" },
  { id: "master", name: "Master", color: "#EAB308", description: "Excel mastery achieved" },
] as const;

export const FORMULA_CATEGORIES = [
  { id: "math", name: "Math & Trig", icon: "Calculator", count: 0 },
  { id: "statistical", name: "Statistical", icon: "BarChart3", count: 0 },
  { id: "lookup", name: "Lookup & Reference", icon: "Search", count: 0 },
  { id: "text", name: "Text", icon: "Type", count: 0 },
  { id: "date", name: "Date & Time", icon: "Calendar", count: 0 },
  { id: "time", name: "Time", icon: "Clock", count: 0 },
  { id: "financial", name: "Financial", icon: "DollarSign", count: 0 },
  { id: "engineering", name: "Engineering", icon: "Wrench", count: 0 },
  { id: "information", name: "Information", icon: "Info", count: 0 },
  { id: "database", name: "Database", icon: "Database", count: 0 },
  { id: "logical", name: "Logical", icon: "GitBranch", count: 0 },
  { id: "reference", name: "Reference", icon: "BookOpen", count: 0 },
] as const;

export const RIBBON_TABS = [
  { id: "home", name: "Home", icon: "Home" },
  { id: "insert", name: "Insert", icon: "Plus" },
  { id: "page-layout", name: "Page Layout", icon: "Layout" },
  { id: "formulas", name: "Formulas", icon: "Sigma" },
  { id: "data", name: "Data", icon: "Table" },
  { id: "review", name: "Review", icon: "CheckCircle" },
  { id: "view", name: "View", icon: "Eye" },
  { id: "draw", name: "Draw", icon: "Pencil" },
  { id: "help", name: "Help", icon: "HelpCircle" },
  { id: "developer", name: "Developer", icon: "Code" },
] as const;

export const SHORTCUT_CATEGORIES = [
  { id: "navigation", name: "Navigation", count: 0 },
  { id: "editing", name: "Editing", count: 0 },
  { id: "formatting", name: "Formatting", count: 0 },
  { id: "data", name: "Data", count: 0 },
  { id: "charts", name: "Charts", count: 0 },
  { id: "pivot-tables", name: "Pivot Tables", count: 0 },
  { id: "formula-auditing", name: "Formula Auditing", count: 0 },
  { id: "vba", name: "VBA", count: 0 },
  { id: "workbook", name: "Workbook Management", count: 0 },
] as const;

export const PROJECT_CATEGORIES = [
  { id: "budget", name: "Budget & Finance", icon: "Wallet" },
  { id: "tracking", name: "Tracking & Records", icon: "ClipboardList" },
  { id: "analysis", name: "Analysis & Reporting", icon: "TrendingUp" },
  { id: "reporting", name: "Dashboards", icon: "LayoutDashboard" },
  { id: "automation", name: "Automation", icon: "Zap" },
] as const;

export const INTERVIEW_DIFFICULTIES = [
  { id: "beginner", name: "Beginner", description: "Basic Excel questions" },
  { id: "intermediate", name: "Intermediate", description: "Formulas and features" },
  { id: "advanced", name: "Advanced", description: "Complex scenarios" },
  { id: "analyst", name: "Analyst", description: "Data analysis focus" },
  { id: "vba", name: "VBA", description: "Programming questions" },
] as const;

export const ACHIEVEMENTS = [
  { id: "first-lesson", name: "First Steps", description: "Complete your first lesson", icon: "Baby", category: "progress" },
  { id: "beginner-complete", name: "Beginner Graduate", description: "Complete all beginner lessons", icon: "GraduationCap", category: "progress" },
  { id: "streak-7", name: "Week Warrior", description: "7-day learning streak", icon: "Flame", category: "streak" },
  { id: "streak-30", name: "Monthly Master", description: "30-day learning streak", icon: "Trophy", category: "streak" },
  { id: "quiz-perfect", name: "Perfect Score", description: "Score 100% on a quiz", icon: "Star", category: "quiz" },
  { id: "quiz-10", name: "Quiz Champion", description: "Complete 10 quizzes", icon: "Award", category: "quiz" },
  { id: "formula-50", name: "Formula Explorer", description: "Learn 50 formulas", icon: "Calculator", category: "exploration" },
  { id: "shortcut-100", name: "Keyboard Ninja", description: "Learn 100 shortcuts", icon: "Keyboard", category: "exploration" },
] as const;

export const DEFAULT_USER_PREFERENCES = {
  theme: "system" as const,
  dailyGoal: 30,
  notifications: true,
  soundEffects: true,
};

export const DEFAULT_USER_STATS = {
  totalLessonsCompleted: 0,
  totalTimeSpent: 0,
  totalQuizzesTaken: 0,
  averageQuizScore: 0,
  currentLevel: "beginner" as const,
  levelProgress: 0,
};

export const DEFAULT_USER_STREAK = {
  current: 0,
  longest: 0,
  lastActivityDate: new Date().toISOString().split("T")[0],
};

export const DAILY_GOALS = [15, 30, 45, 60, 90];