"use client";

import * as React from "react";
import { useSearchStore } from "@/hooks/useSearchStore";
import { Search, X, ArrowRight, Clock, FileText, Calculator, Keyboard, FolderKanban, MessageSquare, BookText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { formulas } from "@/data/formulas";
import { shortcuts } from "@/data/shortcuts";
import { interviewQuestions } from "@/data/interview";
import { glossaryTerms } from "@/data/glossary";
import { projects } from "@/data/projects";

const iconMap: Record<string, typeof FileText> = {
  lesson: FileText,
  formula: Calculator,
  command: Keyboard,
  shortcut: Keyboard,
  project: FolderKanban,
  interview: MessageSquare,
  glossary: BookText,
};

export function SearchModal() {
  const router = useRouter();
  const { isOpen, query, results, recentSearches, closeSearch, setQuery, setResults, addRecentSearch } = useSearchStore();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Build search index
  const allItems = React.useMemo(() => {
    const items: Array<{
      id: string;
      type: "lesson" | "formula" | "command" | "shortcut" | "project" | "interview" | "glossary";
      title: string;
      description: string;
      url: string;
    }> = [];

    // Add formulas
    formulas.forEach((f) => {
      items.push({
        id: f.id,
        type: "formula",
        title: f.name,
        description: f.purpose,
        url: `/formulas/${f.slug}`,
      });
    });

    // Add shortcuts
    shortcuts.forEach((s) => {
      items.push({
        id: s.id,
        type: "shortcut",
        title: s.keys,
        description: s.description,
        url: `/shortcuts?highlight=${s.id}`,
      });
    });

    // Add interview questions
    interviewQuestions.forEach((q) => {
      items.push({
        id: q.id,
        type: "interview",
        title: q.question,
        description: q.answer.substring(0, 100) + "...",
        url: `/interview?q=${encodeURIComponent(q.question.substring(0, 50))}`,
      });
    });

    // Add glossary terms
    glossaryTerms.forEach((t) => {
      items.push({
        id: t.id,
        type: "glossary",
        title: t.term,
        description: t.definition,
        url: `/glossary#${t.slug}`,
      });
    });

    // Add projects
    projects.forEach((p) => {
      items.push({
        id: p.id,
        type: "project",
        title: p.title,
        description: p.description,
        url: `/projects/${p.slug}`,
      });
    });

    return items;
  }, []);

  const fuse = React.useMemo(() => {
    return new Fuse(allItems, {
      keys: ["title", "description"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [allItems]);

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (query.length >= 2) {
      const searchResults = fuse.search(query).slice(0, 10).map((r) => r.item);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, fuse, setResults]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  const handleSelect = (result: typeof results[0]) => {
    addRecentSearch(query || result.title);
    router.push(result.url);
    closeSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeSearch}
      />
      <div className="relative mx-auto mt-[10vh] max-w-2xl p-4">
        <div className="bg-card rounded-xl border shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search lessons, formulas, shortcuts..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base"
            />
            <Button variant="ghost" size="sm" onClick={closeSearch}>
              <kbd className="text-xs text-muted-foreground">ESC</kbd>
            </Button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {query.length >= 2 && results.length > 0 && (
              <div className="space-y-1">
                {results.map((result, index) => {
                  const Icon = iconMap[result.type] || FileText;
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className={cn(
                        "w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors",
                        index === selectedIndex
                          ? "bg-accent"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{result.title}</span>
                          <Badge variant="secondary" className="text-xs">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {result.description}
                        </p>
                      </div>
                      {index === selectedIndex && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {query.length >= 2 && results.length === 0 && (
              <div className="py-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">No results found</p>
                <p className="text-sm text-muted-foreground">
                  Try different keywords or browse categories
                </p>
              </div>
            )}

            {query.length < 2 && recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Recent searches
                </div>
                {recentSearches.slice(0, 5).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="w-full flex items-center gap-3 rounded-lg p-3 text-left hover:bg-muted transition-colors"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            )}

            {query.length < 2 && recentSearches.length === 0 && (
              <div className="py-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">Search Excel Mastery</p>
                <p className="text-sm text-muted-foreground">
                  Find lessons, formulas, shortcuts, and more
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted px-1.5 py-0.5">↑</kbd>
                <kbd className="rounded bg-muted px-1.5 py-0.5">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted px-1.5 py-0.5">↵</kbd>
                to select
              </span>
            </div>
            <span>{results.length} results</span>
          </div>
        </div>
      </div>
    </div>
  );
}