import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    expert: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    professional: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    master: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };
  return colors[level.toLowerCase()] || colors.beginner;
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    math: "Calculator",
    statistical: "BarChart3",
    lookup: "Search",
    text: "Type",
    date: "Calendar",
    time: "Clock",
    financial: "DollarSign",
    engineering: "Wrench",
    information: "Info",
    database: "Database",
    logical: "GitBranch",
    reference: "BookOpen",
  };
  return icons[category.toLowerCase()] || "Function";
}