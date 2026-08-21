import React from 'react';
import { cn } from '@/lib/utils';
import { ProjectStatus, CommentStatus, AvailabilityStatus, PaymentStatus } from '@/types';

interface StatusBadgeProps {
  status: ProjectStatus | CommentStatus | AvailabilityStatus | PaymentStatus | string;
  className?: string;
  dotOnly?: boolean;
}

export function StatusBadge({ status, className, dotOnly = false }: StatusBadgeProps) {
  const configs: Record<string, { label: string; bg: string; text: string; dot: string; border: string }> = {
    // Project Statuses
    'briefing': { label: 'Briefing', bg: 'bg-white/5', text: 'text-gray-300', dot: 'bg-gray-300', border: 'border-white/10' },
    'in-progress': { label: 'In Progress', bg: 'bg-white/10', text: 'text-white', dot: 'bg-white', border: 'border-white/20' },
    'review': { label: 'In Review', bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-400', border: 'border-purple-500/20' },
    'revision': { label: 'Revising', bg: 'bg-white/10', text: 'text-white', dot: 'bg-white animate-pulse', border: 'border-white/20' },
    'approved': { label: 'Approved', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/20' },
    'completed': { label: 'Completed', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/20' },
    
    // Comment Statuses
    'open': { label: 'Open', bg: 'bg-white/10', text: 'text-white', dot: 'bg-white', border: 'border-white/20' },
    'in-progress-comment': { label: 'In Progress', bg: 'bg-white/5', text: 'text-gray-300', dot: 'bg-gray-300', border: 'border-white/10' },
    'resolved': { label: 'Resolved', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/20' },
    
    // Availability
    'available': { label: 'Available for Hire', bg: 'bg-white/10', text: 'text-white', dot: 'bg-white', border: 'border-white/20' },
    'busy': { label: 'Busy (Queue Open)', bg: 'bg-white/5', text: 'text-gray-400', dot: 'bg-gray-400', border: 'border-white/10' },
    'unavailable': { label: 'Unavailable', bg: 'bg-gray-500/10', text: 'text-gray-500', dot: 'bg-gray-500', border: 'border-gray-500/20' },

    // Payments
    'unpaid': { label: 'Unpaid', bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400', border: 'border-red-500/20' },
    'pending': { label: 'Pending', bg: 'bg-white/10', text: 'text-white', dot: 'bg-white', border: 'border-white/20' },
    'paid': { label: 'Paid & Secured', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/20' },
    'refunded': { label: 'Refunded', bg: 'bg-gray-500/10', text: 'text-gray-500', dot: 'bg-gray-500', border: 'border-gray-500/20' },
  };

  const current = configs[status] || {
    label: status.replace('-', ' '),
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    dot: 'bg-gray-400',
    border: 'border-gray-500/20',
  };

  if (dotOnly) {
    return <span className={cn('inline-block w-2 h-2 rounded-full', current.dot, className)} title={current.label} />;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider',
        current.bg,
        current.text,
        current.border,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', current.dot)} />
      <span>{current.label}</span>
    </span>
  );
}
