'use client';

import React from 'react';
import Link from 'next/link';
import { Project, User } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency, formatDate, daysUntil, cn } from '@/lib/utils';
import { Calendar, Video, ArrowRight, Clock } from 'lucide-react';

export function ProjectCard({
  project,
  otherUser,
  isEditor,
}: {
  project: Project;
  otherUser?: User;
  isEditor: boolean;
}) {
  const daysLeft = daysUntil(project.deadline);
  const isUrgent = daysLeft <= 3 && project.status !== 'completed' && project.status !== 'approved';

  return (
    <Link
      href={`/projects/${project.id}`}
      className="block bg-surface-100/90 border border-surface-border rounded-2xl p-5 hover:border-amber-500/40 hover:bg-surface-50/40 transition-all duration-200 group shadow-lg"
    >
      <div className="space-y-4">
        {/* Header: Title & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
              {project.name}
            </h3>
            <p className="text-xs text-gray-400 capitalize">
              {project.videoType.replace('-', ' ')} • {project.platform}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Collaborator info */}
        {otherUser && (
          <div className="flex items-center gap-2.5 bg-surface-50/70 p-2.5 rounded-xl border border-surface-border/60">
            <Avatar src={otherUser.avatarUrl} name={otherUser.name} size="sm" />
            <div className="text-xs">
              <span className="text-gray-400 text-[10px] block uppercase font-mono">
                {isEditor ? 'Client' : 'Editor'}
              </span>
              <span className="font-medium text-white">{otherUser.name}</span>
            </div>
          </div>
        )}

        {/* Milestone Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] text-gray-400">
            <span>Workflow Progress</span>
            <span className="font-mono text-amber-400 font-semibold uppercase">{project.status.replace('-', ' ')}</span>
          </div>
          <ProgressBar status={project.status} />
        </div>

        {/* Footer: Budget, Deadline, Action */}
        <div className="pt-3 border-t border-surface-border/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Budget</span>
              <span className="font-mono text-white font-bold">{formatCurrency(project.budget)}</span>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Due</span>
              <span className={cn('flex items-center gap-1 font-medium', isUrgent ? 'text-red-400 font-bold' : 'text-gray-300')}>
                <Clock className="w-3 h-3" />
                {daysLeft < 0 ? 'Overdue' : daysLeft === 0 ? 'Today' : `${daysLeft} days`}
              </span>
            </div>
          </div>

          <span className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
