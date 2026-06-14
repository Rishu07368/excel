"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Calculator,
  Keyboard,
  FolderKanban,
  PlayCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/hooks/useUserStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Formulas", href: "/formulas", icon: Calculator },
  { name: "Shortcuts", href: "/shortcuts", icon: Keyboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Practice", href: "/practice", icon: PlayCircle },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navigation.slice(0, 5).map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
        <Link
          href="/profile"
          className={cn(
            "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
            pathname === "/profile"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {user ? (
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[10px]">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}