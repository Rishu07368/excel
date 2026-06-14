"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  LayoutGrid,
  Home,
  Plus,
  Layout,
  Sigma,
  Table,
  CheckCircle,
  Eye,
  Pencil,
  HelpCircle,
  Code,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { commands, ribbonTabs } from "@/data/commands";
import { cn } from "@/lib/utils";
import type { RibbonTab } from "@/types/content";

const tabIcons: Record<string, typeof Home> = {
  home: Home,
  insert: Plus,
  "page-layout": Layout,
  formulas: Sigma,
  data: Table,
  review: CheckCircle,
  view: Eye,
  draw: Pencil,
  help: HelpCircle,
  developer: Code,
};

export default function CommandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<RibbonTab | "all">("all");

  const filteredCommands = useMemo(() => {
    return commands.filter((command) => {
      const matchesSearch = searchQuery === "" || 
        command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        command.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = selectedTab === "all" || command.tab === selectedTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, selectedTab]);

  // Group commands by tab and group
  const groupedCommands = useMemo(() => {
    const groups: Record<string, Record<string, typeof filteredCommands>> = {};
    
    filteredCommands.forEach((command) => {
      if (!groups[command.tab]) {
        groups[command.tab] = {};
      }
      if (!groups[command.tab][command.group]) {
        groups[command.tab][command.group] = [];
      }
      groups[command.tab][command.group].push(command);
    });
    
    return groups;
  }, [filteredCommands]);

  return (
    <div className="p-6 md:p-8">
      <Breadcrumbs />
      
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Ribbon Command Explorer</h1>
        <p className="text-muted-foreground mt-2">
          Complete reference for all major Excel ribbon commands with step-by-step guides.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 overflow-x-auto">
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as RibbonTab | "all")}>
          <TabsList>
            <TabsTrigger value="all">All Commands</TabsTrigger>
            {ribbonTabs.map((tab) => {
              const Icon = tabIcons[tab.id] || LayoutGrid;
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredCommands.length} of {commands.length} commands
      </div>

      {/* Commands by Group */}
      {Object.entries(groupedCommands).map(([tabId, groups]) => {
        const tabInfo = ribbonTabs.find((t) => t.id === tabId);
        const Icon = tabIcons[tabId] || LayoutGrid;
        
        return (
          <div key={tabId} className="mb-8">
            {selectedTab === "all" && (
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">{tabInfo?.name || tabId} Tab</h2>
              </div>
            )}
            
            <Accordion type="multiple" className="space-y-4">
              {Object.entries(groups).map(([groupName, groupCommands]) => (
                <AccordionItem key={groupName} value={groupName} className="bg-card rounded-lg border px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 py-4">
                      <Badge variant="secondary">{groupCommands.length} commands</Badge>
                      <span className="font-medium">{groupName}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pb-4 space-y-4">
                      {groupCommands.map((command) => (
                        <div key={command.id} className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{command.name}</h4>
                              {command.shortcut && (
                                <Badge variant="outline" className="mt-1">
                                  {command.shortcut}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {command.description}
                          </p>
                          
                          {/* Steps */}
                          <div className="mb-3">
                            <h5 className="text-sm font-medium mb-2">How to use:</h5>
                            <ol className="space-y-1">
                              {command.steps.map((step, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                                    {index + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Best Use Cases */}
                          {command.bestUseCases && command.bestUseCases.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2">Best for:</h5>
                              <ul className="space-y-1">
                                {command.bestUseCases.map((useCase, index) => (
                                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    {useCase}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Common Mistakes */}
                          {command.commonMistakes && command.commonMistakes.length > 0 && (
                            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-2">
                                Common Mistakes:
                              </h5>
                              <ul className="space-y-1">
                                {command.commonMistakes.map((mistake, index) => (
                                  <li key={index} className="text-sm text-yellow-600 dark:text-yellow-500">
                                    • {mistake}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );
      })}

      {filteredCommands.length === 0 && (
        <div className="text-center py-12">
          <LayoutGrid className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No commands found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or tab filter.
          </p>
        </div>
      )}
    </div>
  );
}