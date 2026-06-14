import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserPreferences, UserStats, UserStreak, Achievement, UserNote, QuizScore } from '@/types/content';
import { DEFAULT_USER_PREFERENCES, DEFAULT_USER_STATS, DEFAULT_USER_STREAK } from '@/lib/constants';

interface UserStore {
  user: User;
  setUser: (user: Partial<User>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  updateStreak: (streak: Partial<UserStreak>) => void;
  addAchievement: (achievement: Achievement) => void;
  addBookmark: (itemId: string) => void;
  removeBookmark: (itemId: string) => void;
  addNote: (note: UserNote) => void;
  updateNote: (noteId: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  completeLesson: (lessonId: string) => void;
  recordQuizScore: (score: QuizScore) => void;
  resetProgress: () => void;
}

const createInitialUser = (): User => ({
  id: 'user-1',
  name: 'Excel Learner',
  createdAt: new Date().toISOString(),
  preferences: DEFAULT_USER_PREFERENCES,
  stats: DEFAULT_USER_STATS,
  streak: DEFAULT_USER_STREAK,
  achievements: [],
  bookmarks: [],
  notes: [],
  completedLessons: [],
  quizScores: [],
});

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: createInitialUser(),

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      updatePreferences: (preferences) =>
        set((state) => ({
          user: {
            ...state.user,
            preferences: { ...state.user.preferences, ...preferences },
          },
        })),

      updateStats: (stats) =>
        set((state) => ({
          user: {
            ...state.user,
            stats: { ...state.user.stats, ...stats },
          },
        })),

      updateStreak: (streak) =>
        set((state) => ({
          user: {
            ...state.user,
            streak: { ...state.user.streak, ...streak },
          },
        })),

      addAchievement: (achievement) =>
        set((state) => ({
          user: {
            ...state.user,
            achievements: [...state.user.achievements, achievement],
          },
        })),

      addBookmark: (itemId) =>
        set((state) => ({
          user: {
            ...state.user,
            bookmarks: state.user.bookmarks.includes(itemId)
              ? state.user.bookmarks
              : [...state.user.bookmarks, itemId],
          },
        })),

      removeBookmark: (itemId) =>
        set((state) => ({
          user: {
            ...state.user,
            bookmarks: state.user.bookmarks.filter((id) => id !== itemId),
          },
        })),

      addNote: (note) =>
        set((state) => ({
          user: {
            ...state.user,
            notes: [...state.user.notes, note],
          },
        })),

      updateNote: (noteId, content) =>
        set((state) => ({
          user: {
            ...state.user,
            notes: state.user.notes.map((note) =>
              note.id === noteId
                ? { ...note, content, updatedAt: new Date().toISOString() }
                : note
            ),
          },
        })),

      deleteNote: (noteId) =>
        set((state) => ({
          user: {
            ...state.user,
            notes: state.user.notes.filter((note) => note.id !== noteId),
          },
        })),

      completeLesson: (lessonId) =>
        set((state) => ({
          user: {
            ...state.user,
            completedLessons: state.user.completedLessons.includes(lessonId)
              ? state.user.completedLessons
              : [...state.user.completedLessons, lessonId],
            stats: {
              ...state.user.stats,
              totalLessonsCompleted: state.user.stats.totalLessonsCompleted + 1,
            },
          },
        })),

      recordQuizScore: (quizScore) =>
        set((state) => {
          const totalQuizzes = state.user.stats.totalQuizzesTaken + 1;
          const previousTotal = state.user.stats.averageQuizScore * state.user.stats.totalQuizzesTaken;
          const newAverage = (previousTotal + (quizScore.score / quizScore.maxScore) * 100) / totalQuizzes;
          
          return {
            user: {
              ...state.user,
              quizScores: [...state.user.quizScores, quizScore],
              stats: {
                ...state.user.stats,
                totalQuizzesTaken: totalQuizzes,
                averageQuizScore: Math.round(newAverage),
              },
            },
          };
        }),

      resetProgress: () =>
        set(() => ({
          user: createInitialUser(),
        })),
    }),
    {
      name: 'excel-mastery-user',
    }
  )
);