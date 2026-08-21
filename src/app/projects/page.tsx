'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Video, Plus, Filter, CheckCircle2, Clock,
  Layers, ArrowRight, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectStatus } from '@/types';

export default function ProjectsPage() {
  const { projects, currentUser, allUsers } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'review' | 'completed'>('all');

  // Filter projects involving current user
  const userProjects = projects.filter((p) => {
    if (!currentUser) return true;
    return p.clientId === currentUser.id || p.editorId === currentUser.id;
  });

  const filteredProjects = userProjects.filter((p) => {
    if (activeFilter === 'active') return ['briefing', 'in-progress', 'revision'].includes(p.status);
    if (activeFilter === 'review') return p.status === 'review';
    if (activeFilter === 'completed') return ['approved', 'completed'].includes(p.status);
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3 py-1 rounded-full text-xs text-amber-400 font-medium mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>Workspace Central</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Project Workspaces</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage briefs, video cuts, timestamped feedback, and deliverables.
          </p>
        </div>

        {currentUser?.role === 'client' && (
          <Link href="/projects/new">
            <Button size="md" variant="primary" className="font-bold shadow-lg shadow-amber-500/20">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create New Project</span>
            </Button>
          </Link>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-border pb-3">
        {[
          { key: 'all', label: 'All Projects', count: userProjects.length },
          { key: 'active', label: 'Active & In Progress', count: userProjects.filter(p => ['briefing', 'in-progress', 'revision'].includes(p.status)).length },
          { key: 'review', label: 'Awaiting Review', count: userProjects.filter(p => p.status === 'review').length },
          { key: 'completed', label: 'Completed & Approved', count: userProjects.filter(p => ['approved', 'completed'].includes(p.status)).length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as any)}
            className={cn(
              'flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-lg transition-colors font-medium',
              activeFilter === tab.key
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-50'
            )}
          >
            <span>{tab.label}</span>
            <span className="bg-surface-50 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<Video className="w-8 h-8 text-gray-500" />}
          title="No projects found"
          description="Start a new collaboration or check your other status tabs."
          actionLabel={currentUser?.role === 'client' ? 'Create Project Brief' : 'Browse Open Projects'}
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isEditor = currentUser?.id === project.editorId;
            const otherUserId = isEditor ? project.clientId : project.editorId;
            const otherUser = allUsers.find((u) => u.id === otherUserId);

            return (
              <ProjectCard
                key={project.id}
                project={project}
                otherUser={otherUser}
                isEditor={isEditor}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
