'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProjectCard } from '@/components/projects/ProjectCard';
import {
  DollarSign, Video, Clock, CheckCircle2, Star,
  TrendingUp, Users, ArrowRight, Upload, Play,
  FolderOpen, Sparkles, AlertTriangle
} from 'lucide-react';
import { formatCurrency, formatDate, daysUntil } from '@/lib/utils';

export default function EditorDashboardPage() {
  const { currentUser, projects, payments, reviews, allUsers } = useApp();

  // Projects where user is editor
  const editorId = currentUser?.role === 'editor' ? currentUser.id : 'editor-1';
  const editorProjects = projects.filter((p) => p.editorId === editorId);

  const activeProjects = editorProjects.filter((p) =>
    ['briefing', 'in-progress', 'review', 'revision'].includes(p.status)
  );
  const pendingReviews = editorProjects.filter((p) => p.status === 'review');
  const completedProjects = editorProjects.filter((p) =>
    ['approved', 'completed'].includes(p.status)
  );

  const editorPayments = payments.filter((pay) =>
    editorProjects.some((p) => p.id === pay.projectId)
  );
  const totalEarned = editorPayments
    .filter((pay) => pay.status === 'paid')
    .reduce((acc, curr) => acc + curr.editorEarnings, 0);
  const pendingEarnings = editorPayments
    .filter((pay) => pay.status === 'pending' || pay.status === 'unpaid')
    .reduce((acc, curr) => acc + curr.editorEarnings, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3 py-1 rounded-full text-xs text-amber-400 font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editor Command Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {currentUser?.name || 'Alex'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Track your pipeline, incoming client feedback, deadlines, and payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/editors/${editorId}`}>
            <Button size="sm" variant="outline" className="text-xs">
              <span>View Public Profile</span>
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="sm" variant="primary" className="text-xs font-semibold">
              <Video className="w-4 h-4 mr-1.5" />
              <span>All Workspaces</span>
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
            <span className="text-xs font-medium">Active Projects</span>
            <Video className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {activeProjects.length}
          </p>
          <span className="text-[11px] text-amber-400/90 font-medium">
            {pendingReviews.length} awaiting client review
          </span>
        </div>

        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Completed Deliveries</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {completedProjects.length}
          </p>
          <span className="text-[11px] text-emerald-400 font-medium">100% on-time delivery</span>
        </div>

        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Total Revenue Paid</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {formatCurrency(totalEarned || 2450)}
          </p>
          <span className="text-[11px] text-gray-400 font-mono">
            +{formatCurrency(pendingEarnings)} in escrow
          </span>
        </div>

        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">Client Satisfaction</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">4.9 ★</p>
          <span className="text-[11px] text-gray-400">Based on 87 verified reviews</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ACTIVE PROJECTS PIPELINE */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-amber-400" />
            <span>Active Project Pipeline ({activeProjects.length})</span>
          </h2>
          <Link href="/projects" className="text-xs text-amber-400 hover:underline">
            View all projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((proj) => {
            const clientUser = allUsers.find((u) => u.id === proj.clientId);
            return (
              <ProjectCard
                key={proj.id}
                project={proj}
                otherUser={clientUser}
                isEditor={true}
              />
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* DEADLINE WATCH & CLIENT ROSTER */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            Upcoming Project Deadlines
          </h3>

          <div className="space-y-3">
            {editorProjects.slice(0, 3).map((proj) => {
              const daysLeft = daysUntil(proj.deadline);
              const isUrgent = daysLeft <= 3 && proj.status !== 'completed';

              return (
                <div
                  key={proj.id}
                  className="p-3.5 bg-surface-50 rounded-xl border border-surface-border flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-semibold text-white">{proj.name}</h4>
                    <p className="text-gray-400 text-[11px]">Due {formatDate(proj.deadline)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded ${
                        isUrgent
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : 'bg-surface-100 text-gray-300'
                      }`}
                    >
                      {daysLeft < 0 ? 'Overdue' : `${daysLeft} days left`}
                    </span>
                    <Link href={`/projects/${proj.id}`}>
                      <Button size="sm" variant="secondary" className="h-7 text-xs px-2">
                        Open
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Client Roster */}
        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            Client Directory
          </h3>

          <div className="space-y-3">
            {allUsers
              .filter((u) => u.role === 'client')
              .map((client) => (
                <div
                  key={client.id}
                  className="p-3 bg-surface-50 rounded-xl border border-surface-border flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={client.avatarUrl} name={client.name} size="sm" />
                    <div>
                      <h4 className="font-semibold text-white">{client.name}</h4>
                      <p className="text-gray-400 text-[10px]">{client.bio}</p>
                    </div>
                  </div>
                  <Link href={`/projects/new?client=${client.id}`}>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Collaborate
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
