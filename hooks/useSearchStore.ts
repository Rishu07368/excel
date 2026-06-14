"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchStore {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  recentSearches: string[];
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

interface SearchResult {
  id: string;
  type: 'lesson' | 'formula' | 'command' | 'shortcut' | 'project' | 'interview' | 'glossary';
  title: string;
  description: string;
  url: string;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      isOpen: false,
      query: '',
      results: [],
      recentSearches: [],
      openSearch: () => set({ isOpen: true }),
      closeSearch: () => set({ isOpen: false, query: '', results: [] }),
      setQuery: (query) => set({ query }),
      setResults: (results) => set({ results }),
      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [
            query,
            ...state.recentSearches.filter((q) => q !== query),
          ].slice(0, 10),
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'excel-mastery-search',
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);