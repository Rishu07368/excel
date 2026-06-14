"use client";

import Link from "next/link";
import { 
  BookOpen, 
  Calculator, 
  Keyboard, 
  FolderKanban, 
  PlayCircle,
  MessageSquareDot,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  Award,
  Flame,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUserStore } from "@/hooks/useUserStore";
import { curriculumLevels, courses } from "@/data/courses";
import { formulas } from "@/data/formulas";
import { shortcuts } from "@/data/shortcuts";
import { projects } from "@/data/projects";

const features = [
  {
    title: "Interactive Learning",
    description: "Learn by doing with hands-on exercises and immediate feedback",
    icon: PlayCircle,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    title: "300+ Formulas",
    description: "Complete reference for all Excel functions with examples",
    icon: Calculator,
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  },
  {
    title: "500+ Shortcuts",
    description: "Master keyboard shortcuts to boost your productivity",
    icon: Keyboard,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    title: "Real Projects",
    description: "Build real-world spreadsheets from budget trackers to dashboards",
    icon: FolderKanban,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
  },
  {
    title: "Interview Prep",
    description: "Practice 500+ Excel interview questions with detailed answers",
    icon: MessageSquareDot,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
  },
  {
    title: "Progress Tracking",
    description: "Track your learning journey with detailed analytics",
    icon: TrendingUp,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300",
  },
];

const stats = [
  { label: "Formulas", value: formulas.length, icon: Calculator },
  { label: "Shortcuts", value: shortcuts.length, icon: Keyboard },
  { label: "Projects", value: projects.length, icon: FolderKanban },
  { label: "Lessons", value: courses.reduce((acc, c) => acc + c.totalLessons, 0), icon: BookOpen },
];

export default function HomePage() {
  const { user } = useUserStore();
  
  // Calculate overall progress
  const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0);
  const completedLessons = user.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-6 py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Star className="mr-1 h-3 w-3" />
            The Most Comprehensive Excel Learning Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Master Excel from
            <span className="text-primary"> Beginner to Expert</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Learn Microsoft Excel with interactive tutorials, 300+ formula references, 
            500+ shortcuts, real-world projects, and interview preparation. 
            Everything you need to become workplace-ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/learn">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/formulas">
                Explore Formulas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold">{stat.value}+</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section (if user has started) */}
      {completedLessons > 0 && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <Card className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Welcome back, {user.name}!
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      You&apos;ve completed {completedLessons} of {totalLessons} lessons
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="text-sm font-medium mb-1">{progressPercent}% Complete</div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/learn">
                        Continue
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive learning platform designed to take you from complete beginner 
              to Excel master with practical, real-world skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Learning Path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Structured curriculum from beginner to master, with clear progression at each level.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculumLevels.map((level, index) => (
              <Card key={level.id} className="relative overflow-hidden group hover:shadow-lg transition-all">
                <div 
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: level.color }}
                />
                <CardHeader className="pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: level.color }}
                    >
                      {index + 1}
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {level.courses} courses
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{level.name}</CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                </CardHeader>
                <CardContent className="pl-6">
                  <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors" asChild>
                    <Link href={`/learn?level=${level.id}`}>
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Access</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Formula Explorer */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>Formula Explorer</CardTitle>
                    <CardDescription>300+ Excel functions with examples</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Math & Trig</span>
                    <span className="font-medium">{formulas.filter(f => f.category === 'math').length} functions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lookup & Reference</span>
                    <span className="font-medium">{formulas.filter(f => f.category === 'lookup').length} functions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Logical</span>
                    <span className="font-medium">{formulas.filter(f => f.category === 'logical').length} functions</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/formulas">
                    Browse All Formulas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Shortcut Database */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                    <Keyboard className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>Shortcut Database</CardTitle>
                    <CardDescription>500+ keyboard shortcuts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Navigation</span>
                    <span className="font-medium">{shortcuts.filter(s => s.category === 'navigation').length} shortcuts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Formatting</span>
                    <span className="font-medium">{shortcuts.filter(s => s.category === 'formatting').length} shortcuts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Formulas</span>
                    <span className="font-medium">{shortcuts.filter(s => s.category === 'formula-auditing').length} shortcuts</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/shortcuts">
                    Browse All Shortcuts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Project Library */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                    <FolderKanban className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>Project Library</CardTitle>
                    <CardDescription>Real-world spreadsheet projects</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between text-sm py-1">
                      <span>{project.title}</span>
                      <Badge variant="secondary" className="text-xs">{project.difficulty}</Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/projects">
                    View All Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Interview Prep */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300">
                    <MessageSquareDot className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>Interview Prep</CardTitle>
                    <CardDescription>Excel interview questions & answers</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Beginner questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Intermediate questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Advanced & Analyst questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>VBA programming questions</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/interview">
                    Practice Questions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <Zap className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Master Excel?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their Excel skills. 
            Start your journey today with our comprehensive curriculum.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/learn">
              <Award className="mr-2 h-4 w-4" />
              Start Learning Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-semibold">Excel Mastery Academy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Excel Mastery Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}