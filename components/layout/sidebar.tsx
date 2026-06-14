"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Calculator,
  LayoutGrid,
  Keyboard,
  FolderKanban,
  PlayCircle,
  MessageSquareDot,
  BookText,
  User,
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/hooks/useThemeStore";
import { useSearchStore } from "@/hooks/useSearchStore";
import { useUserStore } from "@/hooks/useUserStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Formulas", href: "/formulas", icon: Calculator },
  { name: "Commands", href: "/commands", icon: LayoutGrid },
  { name: "Shortcuts", href: "/shortcuts", icon: Keyboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Practice", href: "/practice", icon: PlayCircle },
  { name: "Interview", href: "/interview", icon: MessageSquareDot },
  { name: "Glossary", href: "/glossary", icon: BookText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const { theme, setTheme } = useThemeStore();
  const { openSearch } = useSearchStore();
  const { user } = useUserStore();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform duration-300 md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Excel Mastery</span>
              <span className="text-xs text-muted-foreground">Academy</span>
            </div>
          </div>

          {/* Search button */}
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground"
              onClick={openSearch}
            >
              <Search className="mr-2 h-4 w-4" />
              Search...
              <kbd className="ml-auto text-xs opacity-50">⌘K</kbd>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t p-4 space-y-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={toggleTheme}
            >
              {theme === "light" && (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Light Mode
                </>
              )}
              {theme === "dark" && (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark Mode
                </>
              )}
              {theme === "system" && (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  System
                </>
              )}
            </Button>

            {/* User profile */}
            <Link
              href="/profile"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate">{user.name}</span>
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}