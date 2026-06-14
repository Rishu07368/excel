"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User,
  Settings,
  Award,
  TrendingUp,
  Clock,
  Target,
  Flame,
  Star,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  Bookmark,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useUserStore } from "@/hooks/useUserStore";
import { curriculumLevels } from "@/data/courses";
import { courses } from "@/data/courses";
import { DAILY_GOALS } from "@/lib/constants";

export default function ProfilePage() {
  const { user, updatePreferences, updateStreak, resetProgress } = useUserStore();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  // Calculate stats
  const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0);
  const completedLessons = user.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Get current level info
  const currentLevelInfo = curriculumLevels.find((l) => l.id === user.stats.currentLevel);

  const handleSaveName = () => {
    useUserStore.getState().setUser({ name: nameInput });
    setEditingName(false);
  };

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Track your progress and manage your learning preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {editingName ? (
                  <div className="w-full flex gap-2 mb-4">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      autoFocus
                    />
                    <Button onClick={handleSaveName}>Save</Button>
                  </div>
                ) : (
                  <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingName(!editingName)}
                  className="mb-4"
                >
                  {editingName ? "Cancel" : "Edit Name"}
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge className="capitalize" style={{ backgroundColor: currentLevelInfo?.color }}>
                    {currentLevelInfo?.name || "Beginner"}
                  </Badge>
                  <span>Level</span>
                </div>
              </div>

              {/* Streak */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">Learning Streak</span>
                  </div>
                  <Badge variant="outline">{user.streak.current} days</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Longest streak: {user.streak.longest} days
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.achievements.length > 0 ? (
                <div className="space-y-3">
                  {user.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Complete lessons and quizzes to earn achievements!
                </p>
              )}
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/achievements">View All Achievements</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats and Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Learning Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{completedLessons}</div>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.floor(user.stats.totalTimeSpent / 60)}h
                  </div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{user.stats.totalQuizzesTaken}</div>
                  <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{user.stats.averageQuizScore}%</div>
                  <p className="text-sm text-muted-foreground">Avg Quiz Score</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-muted-foreground">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  {completedLessons} of {totalLessons} lessons completed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Bookmarks and Notes */}
          <Tabs defaultValue="bookmarks">
            <TabsList>
              <TabsTrigger value="bookmarks">
                <Bookmark className="h-4 w-4 mr-1" />
                Bookmarks
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4 mr-1" />
                Notes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookmarks" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {user.bookmarks.length > 0 ? (
                    <div className="space-y-2">
                      {user.bookmarks.map((bookmark) => (
                        <div 
                          key={bookmark} 
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <span className="text-sm font-mono">{bookmark}</span>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No bookmarks yet. Save lessons for later!
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {user.notes.length > 0 ? (
                    <div className="space-y-4">
                      {user.notes.map((note) => (
                        <div key={note.id} className="p-4 bg-muted rounded-lg">
                          <p className="text-sm mb-2">{note.content}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(note.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No notes yet. Add notes to lessons to help you remember key concepts!
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Daily Goal */}
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4" />
                  Daily Learning Goal
                </Label>
                <div className="flex gap-2">
                  {DAILY_GOALS.map((goal) => (
                    <Button
                      key={goal}
                      variant={user.preferences.dailyGoal === goal ? "default" : "outline"}
                      size="sm"
                      onClick={() => updatePreferences({ dailyGoal: goal })}
                    >
                      {goal} min
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user.preferences.theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                  <Label>Dark Mode</Label>
                </div>
                <Switch 
                  checked={user.preferences.theme === "dark"}
                  onCheckedChange={(checked) => {
                    updatePreferences({ theme: checked ? "dark" : "light" });
                  }}
                />
              </div>

              <Separator />

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label>Notifications</Label>
                </div>
                <Switch 
                  checked={user.preferences.notifications}
                  onCheckedChange={(checked) => {
                    updatePreferences({ notifications: checked });
                  }}
                />
              </div>

              <Separator />

              {/* Reset Progress */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reset Progress</p>
                  <p className="text-sm text-muted-foreground">
                    Clear all your learning progress and start fresh
                  </p>
                </div>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
                      resetProgress();
                    }
                  }}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}