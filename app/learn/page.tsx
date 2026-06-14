"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { courses, curriculumLevels } from "@/data/courses";
import { useUserStore } from "@/hooks/useUserStore";
import { cn } from "@/lib/utils";
import type { Course, CourseLevel } from "@/types/content";

export default function LearnPage() {
  const searchParams = useSearchParams();
  const levelFilter = searchParams.get("level") as CourseLevel | null;
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "all">(levelFilter || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUserStore();

  const filteredCourses = courses.filter((course) => {
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: CourseLevel) => {
    const colors: Record<CourseLevel, string> = {
      beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      expert: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      professional: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      master: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    };
    return colors[level];
  };

  const getCourseProgress = (course: Course) => {
    const lessonIds = course.lessons.map((l) => l.id);
    const completed = lessonIds.filter((id) => user.completedLessons.includes(id)).length;
    return {
      completed,
      total: course.lessons.length,
      percent: Math.round((completed / course.lessons.length) * 100),
    };
  };

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Learn Excel</h1>
        <p className="text-muted-foreground mt-2">
          Structured curriculum from beginner to master. Start your journey today.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as CourseLevel | "all")}>
          <TabsList>
            <TabsTrigger value="all">All Levels</TabsTrigger>
            {curriculumLevels.map((level) => (
              <TabsTrigger key={level.id} value={level.id}>
                {level.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progress = getCourseProgress(course);
          const levelInfo = curriculumLevels.find((l) => l.id === course.level);
          
          return (
            <Card key={course.id} className="group hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge className={getLevelColor(course.level)}>
                    {levelInfo?.name}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.totalDuration} min
                  </div>
                </div>
                <CardTitle className="mt-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress.percent}%</span>
                    </div>
                    <Progress value={progress.percent} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {progress.completed} of {progress.total} lessons completed
                    </p>
                  </div>

                  {/* Start/Continue Button */}
                  <Button className="w-full" asChild>
                    <Link href={`/learn/${course.slug}`}>
                      {progress.completed > 0 ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Start Course
                        </>
                      )}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No courses found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSelectedLevel("all");
            setSearchQuery("");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}