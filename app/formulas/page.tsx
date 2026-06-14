"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Copy, 
  Check, 
  Info,
  AlertTriangle,
  Lightbulb,
  ArrowRightLeft,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { formulas, formulaCategories } from "@/data/formulas";
import { cn } from "@/lib/utils";
import type { Formula, FormulaCategory } from "@/types/content";

const categoryColors: Record<string, string> = {
  math: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  statistical: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  lookup: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  text: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  date: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  time: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  financial: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  engineering: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  information: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  database: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  logical: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  reference: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
};

export default function FormulasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FormulaCategory | "all">("all");
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const filteredFormulas = useMemo(() => {
    return formulas.filter((formula) => {
      const matchesSearch = searchQuery === "" || 
        formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.syntax.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || formula.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedFormula(text);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const getCategoryName = (id: string) => {
    const cat = formulaCategories.find((c) => c.id === id);
    return cat?.name || id;
  };

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Formula Explorer</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive reference for {formulas.length}+ Excel functions with syntax, examples, and tips.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as FormulaCategory | "all")}>
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            {formulaCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredFormulas.length} of {formulas.length} formulas
      </div>

      {/* Formula List */}
      <Accordion type="single" collapsible className="space-y-4">
        {filteredFormulas.map((formula) => (
          <AccordionItem key={formula.id} value={formula.id} className="bg-card rounded-lg border px-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{formula.name}</span>
                    <Badge className={cn("text-xs", categoryColors[formula.category])}>
                      {getCategoryName(formula.category)}
                    </Badge>
                    {formula.isModern && (
                      <Badge variant="outline" className="text-xs">Modern</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{formula.purpose}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-6 space-y-6">
                {/* Syntax */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Syntax
                  </h4>
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3 font-mono text-sm">
                    <code className="flex-1">{formula.syntax}</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(formula.syntax)}
                    >
                      {copiedFormula === formula.syntax ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Arguments */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Arguments</h4>
                  <div className="space-y-2">
                    {formula.arguments.map((arg, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <code className="bg-muted px-2 py-1 rounded font-mono shrink-0">{arg.name}</code>
                        <div>
                          <span className="text-muted-foreground">{arg.description}</span>
                          <div className="flex gap-2 mt-1">
                            {arg.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">{arg.type}</Badge>
                            {arg.defaultValue && (
                              <span className="text-xs text-muted-foreground">Default: {arg.defaultValue}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Examples</h4>
                  <div className="space-y-3">
                    {formula.examples.map((example, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{example.description}</span>
                          <Badge variant="outline">{example.result}</Badge>
                        </div>
                        <div className="flex items-center gap-2 bg-background rounded p-2 font-mono text-sm">
                          <code className="flex-1">{example.formula}</code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(example.formula)}
                          >
                            {copiedFormula === example.formula ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {example.explanation && (
                          <p className="text-sm text-muted-foreground mt-2">{example.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Mistakes */}
                {formula.commonMistakes && formula.commonMistakes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="h-4 w-4" />
                      Common Mistakes
                    </h4>
                    <ul className="space-y-1">
                      {formula.commonMistakes.map((mistake, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-yellow-500">•</span>
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips */}
                {formula.tips && formula.tips.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Lightbulb className="h-4 w-4" />
                      Tips
                    </h4>
                    <ul className="space-y-1">
                      {formula.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Functions */}
                {formula.relatedFunctions && formula.relatedFunctions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4" />
                      Related Functions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {formula.relatedFunctions.map((func) => (
                        <Badge key={func} variant="secondary">
                          {func}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFormulas.length === 0 && (
        <div className="text-center py-12">
          <Calculator className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No formulas found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}