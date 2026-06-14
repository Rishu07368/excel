"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  FolderKanban,
  Clock,
  ChevronRight,
  Download,
  ArrowRight,
  Wallet,
  ClipboardList,
  TrendingUp,
  LayoutDashboard,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/content";

const categoryIcons: Record<string, typeof Wallet> = {
  budget: Wallet,
  tracking: ClipboardList,
  analysis: TrendingUp,
  reporting: LayoutDashboard,
  automation: Zap,
};

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  expert: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  professional: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  master: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Project Library</h1>
        <p className="text-muted-foreground mt-2">
          Build real-world spreadsheets with step-by-step guided projects. Practice makes perfect.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ProjectCategory | "all")}>
          <TabsList>
            <TabsTrigger value="all">All Categories</TabsTrigger>
            {projectCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const Icon = categoryIcons[project.category] || FolderKanban;
          
          return (
            <Card key={project.id} className="group hover:shadow-lg transition-all flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className={difficultyColors[project.difficulty]}>
                    {project.difficulty}
                  </Badge>
                </div>
                <CardTitle className="mt-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    ~{project.estimatedTime} minutes
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">What you&apos;ll learn:</p>
                    <ul className="space-y-1">
                      {project.objectives.slice(0, 3).map((objective, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {objective}
                        </li>
                      ))}
                      {project.objectives.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{project.objectives.length - 3} more objectives
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/projects/${project.slug}`}>
                    Start Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No projects found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}