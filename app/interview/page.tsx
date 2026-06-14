"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  MessageSquareDot,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { interviewQuestions, interviewCategories } from "@/data/interview";
import { useUserStore } from "@/hooks/useUserStore";
import { cn } from "@/lib/utils";
import type { InterviewCategory, CourseLevel } from "@/types/content";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  analyst: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  vba: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function InterviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<InterviewCategory | "all">("all");
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const { user, addBookmark, removeBookmark } = useUserStore();

  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((question) => {
      const matchesSearch = searchQuery === "" || 
        question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || question.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => 
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.bookmarks.includes(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };

  const getCategoryName = (id: string) => {
    const cat = interviewCategories.find((c) => c.id === id);
    return cat?.name || id;
  };

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Interview Preparation</h1>
        <p className="text-muted-foreground mt-2">
          Practice {interviewQuestions.length}+ Excel interview questions with detailed answers and explanations.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as InterviewCategory | "all")}>
          <TabsList>
            <TabsTrigger value="all">All Levels</TabsTrigger>
            {interviewCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredQuestions.length} of {interviewQuestions.length} questions
      </div>

      {/* Questions List */}
      <Accordion type="multiple" className="space-y-4">
        {filteredQuestions.map((question) => {
          const isExpanded = expandedQuestions.includes(question.id);
          const isBookmarked = user.bookmarks.includes(question.id);
          
          return (
            <AccordionItem 
              key={question.id} 
              value={question.id} 
              className="bg-card rounded-lg border px-6"
            >
              <AccordionTrigger className="hover:no-underline" onClick={() => toggleQuestion(question.id)}>
                <div className="flex items-start gap-4 py-4 w-full pr-4">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={difficultyColors[question.difficulty]}>
                        {getCategoryName(question.category)}
                      </Badge>
                      <Badge variant="outline">
                        {question.difficulty}
                      </Badge>
                    </div>
                    <p className="font-medium text-left">{question.question}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => toggleBookmark(question.id, e)}
                    className="shrink-0"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-6 space-y-6">
                  {/* Answer */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      Answer
                    </h4>
                    <p className="text-sm leading-relaxed">{question.answer}</p>
                  </div>

                  {/* Explanation */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <MessageSquareDot className="h-4 w-4" />
                      Explanation
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
                  </div>

                  {/* Follow-up Questions */}
                  {question.followUpQuestions && question.followUpQuestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Follow-up Questions</h4>
                      <ul className="space-y-2">
                        {question.followUpQuestions.map((followUp, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">→</span>
                            {followUp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquareDot className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No questions found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}