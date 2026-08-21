'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProjectCard } from '@/components/projects/ProjectCard';
import {
  Video, Plus, Play, Clock, CheckCircle2,
  DollarSign, Users, ArrowRight, Sparkles, MessageSquare
} from 'lucide-react';
import { formatCurrency, formatDate, daysUntil } from '@/lib/utils';

export default function ClientDashboardPage() {
  const { currentUser, projects, payments, allUsers } = useApp();

  const clientId = currentUser?.role === 'client' ? currentUser.id : 'client-1';
  const clientProjects = projects.filter((p) => p.clientId === clientId);

  const activeProjects = clientProjects.filter((p) =>
    ['briefing', 'in-progress', 'review', 'revision'].includes(p.status)
  );
  const awaitingReview = clientProjects.filter((p) => p.status === 'review');
  const completedProjects = clientProjects.filter((p) =>
    ['approved', 'completed'].includes(p.status)
  );

  const totalSpent = payments
    .filter((pay) => clientProjects.some((p) => p.id === pay.projectId) && pay.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3 py-1 rounded-full text-xs text-amber-400 font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creator & Brand Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {currentUser?.name || 'Jordan'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review incoming drafts, manage your active video pipeline, and collaborate with editors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/editors">
            <Button size="sm" variant="outline" className="text-xs">
              <Users className="w-4 h-4 mr-1.5" />
              <span>Hire New Editor</span>
            </Button>
          </Link>
          <Link href="/projects/new">
            <Button size="sm" variant="primary" className="text-xs font-bold shadow-lg shadow-amber-500/20">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create Project</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* STATS OVERVIEW CARDS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">In Production</span>
            <Video className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {activeProjects.length}
          </p>
          <span className="text-[11px] text-gray-400 font-medium">Active video cuts</span>
        </div>

        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Awaiting Your Review</span>
            <Play className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
            {awaitingReview.length}
          </p>
          <span className="text-[11px] text-purple-400/80 font-medium">Drafts ready to review</span>
        </div>

        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Master Cuts Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {completedProjects.length}
          </p>
          <span className="text-[11px] text-emerald-400 font-medium">Delivered to channel</span>
        </div>

        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Total Production Spend</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {formatCurrency(totalSpent || 1250)}
          </p>
          <span className="text-[11px] text-gray-400">Protected in escrow</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* URGENT REVIEW BANNER */}
      {/* ============================================================ */}
      {awaitingReview.length > 0 && (
        <div className="bg-gradient-to-r from-purple-900/30 via-surface-100 to-surface-200 border border-purple-500/40 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-purple-400 font-bold">
                Action Required
              </span>
              <h3 className="font-bold text-sm text-white">
                Draft 2 ready for review in "{awaitingReview[0].name}"
              </h3>
            </div>
          </div>

          <Link href={`/projects/${awaitingReview[0].id}?tab=review`}>
            <Button size="sm" variant="primary" className="font-bold shadow-lg shadow-amber-500/20">
              <Play className="w-3.5 h-3.5 fill-current mr-1.5" />
              <span>Leave Timestamped Notes</span>
            </Button>
          </Link>
        </div>
      )}

      {/* ============================================================ */}
      {/* ACTIVE PROJECTS LIST */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-amber-400" />
            <span>Active Video Projects ({activeProjects.length})</span>
          </h2>
          <Link href="/projects" className="text-xs text-amber-400 hover:underline">
            View all projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((proj) => {
            const editorUser = allUsers.find((u) => u.id === proj.editorId);
            return (
              <ProjectCard
                key={proj.id}
                project={proj}
                otherUser={editorUser}
                isEditor={false}
              />
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* HIRED EDITORS ROSTER */}
      {/* ============================================================ */}
      <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center pb-3 border-b border-surface-border">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            Your Video Production Team
          </h3>
          <Link href="/editors" className="text-xs text-amber-400 hover:underline">
            Find more editors →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allUsers
            .filter((u) => u.role === 'editor')
            .slice(0, 3)
            .map((editor) => (
              <div
                key={editor.id}
                className="p-4 bg-surface-50 rounded-xl border border-surface-border flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={editor.avatarUrl} name={editor.name} size="md" />
                  <div>
                    <h4 className="font-bold text-white">{editor.name}</h4>
                    <p className="text-gray-400 text-[10px]">{editor.bio?.slice(0, 40)}...</p>
                  </div>
                </div>
                <Link href={`/projects/new?editorId=${editor.id}`}>
                  <Button size="sm" variant="primary" className="h-7 text-xs px-2.5">
                    Book
                  </Button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
