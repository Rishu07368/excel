"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Copy, 
  Check, 
  Keyboard,
  Monitor,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { shortcuts, shortcutCategories } from "@/data/shortcuts";
import { cn } from "@/lib/utils";
import type { ShortcutCategory } from "@/types/content";

const productivityColors = {
  high: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

export default function ShortcutsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ShortcutCategory | "all">("all");
  const [platform, setPlatform] = useState<"windows" | "mac">("windows");
  const [copiedShortcut, setCopiedShortcut] = useState<string | null>(null);

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter((shortcut) => {
      const matchesSearch = searchQuery === "" || 
        shortcut.keys.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || shortcut.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedShortcut(text);
    setTimeout(() => setCopiedShortcut(null), 2000);
  };

  const getCategoryName = (id: string) => {
    const cat = shortcutCategories.find((c) => c.id === id);
    return cat?.name || id;
  };

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Shortcut Database</h1>
        <p className="text-muted-foreground mt-2">
          Master {shortcuts.length}+ keyboard shortcuts to boost your Excel productivity.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shortcuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs value={platform} onValueChange={(v) => setPlatform(v as "windows" | "mac")}>
          <TabsList>
            <TabsTrigger value="windows">
              <Monitor className="h-4 w-4 mr-1" />
              Windows
            </TabsTrigger>
            <TabsTrigger value="mac">
              <Smartphone className="h-4 w-4 mr-1" />
              Mac
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ShortcutCategory | "all")}>
        <TabsList className="mb-6 flex flex-wrap h-auto">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {shortcutCategories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredShortcuts.length} of {shortcuts.length} shortcuts
      </div>

      {/* Shortcuts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShortcuts.map((shortcut) => (
          <Card key={shortcut.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Badge className={cn("text-xs", productivityColors[shortcut.productivityImpact || "medium"])}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {shortcut.productivityImpact || "medium"} impact
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getCategoryName(shortcut.category)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <kbd className="px-3 py-2 bg-muted rounded-lg font-mono text-sm font-semibold flex-1 text-center">
                  {platform === "windows" ? shortcut.windowsKeys : shortcut.macKeys}
                </kbd>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(platform === "windows" ? shortcut.windowsKeys : shortcut.macKeys)}
                >
                  {copiedShortcut === (platform === "windows" ? shortcut.windowsKeys : shortcut.macKeys) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{shortcut.description}</p>
              {shortcut.useCases && shortcut.useCases.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {shortcut.useCases.slice(0, 2).map((useCase, index) => (
                    <span key={index} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {useCase}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredShortcuts.length === 0 && (
        <div className="text-center py-12">
          <Keyboard className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No shortcuts found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}