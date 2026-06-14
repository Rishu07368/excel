"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  BookText,
  ChevronRight,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { glossaryTerms, glossaryCategories } from "@/data/glossary";
import { cn } from "@/lib/utils";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch = searchQuery === "" || 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = selectedLetter === null || 
        term.term.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, selectedLetter]);

  // Get all unique first letters
  const allLetters = useMemo(() => {
    const letters = new Set<string>();
    glossaryTerms.forEach((term) => {
      letters.add(term.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof filteredTerms> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Glossary</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive Excel terminology reference with {glossaryTerms.length} terms and definitions.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Alphabet Navigation */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant={selectedLetter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedLetter(null)}
        >
          All
        </Button>
        {allLetters.map((letter) => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLetter(letter)}
            className="w-10"
          >
            {letter}
          </Button>
        ))}
      </div>

      {/* Terms by Letter */}
      <div className="space-y-8">
        {Object.entries(groupedTerms).sort().map(([letter, terms]) => (
          <div key={letter}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                {letter}
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {terms.map((term) => (
                <Card key={term.id} id={term.slug} className="scroll-mt-20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {term.term}
                      {term.category && (
                        <Badge variant="secondary" className="text-xs">
                          {term.category}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {term.definition}
                    </p>
                    
                    {/* Examples */}
                    {term.examples && term.examples.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Examples:</p>
                        <div className="space-y-1">
                          {term.examples.map((example, index) => (
                            <code key={index} className="text-xs bg-muted px-2 py-1 rounded block">
                              {example}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Related Terms */}
                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="mt-4 flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Related:</span>
                        <div className="flex flex-wrap gap-1">
                          {term.relatedTerms.map((related) => (
                            <Badge key={related} variant="outline" className="text-xs">
                              {related}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <BookText className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No terms found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or letter filter.
          </p>
        </div>
      )}
    </div>
  );
}