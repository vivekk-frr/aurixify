import React from 'react';
import { cn } from '@/lib/utils';
import { ProjectStatus } from '@/types';

interface ProgressBarProps {
  value?: number; // 0 to 100
  status?: ProjectStatus;
  className?: string;
  showLabels?: boolean;
}

export function ProgressBar({ value, status, className, showLabels = false }: ProgressBarProps) {
  // If status is provided, map to lifecycle percentage
  const statusSteps: { key: ProjectStatus; label: string; pct: number }[] = [
    { key: 'briefing', label: 'Briefing', pct: 15 },
    { key: 'in-progress', label: 'Editing', pct: 40 },
    { key: 'review', label: 'Review', pct: 70 },
    { key: 'revision', label: 'Revision', pct: 85 },
    { key: 'approved', label: 'Approved', pct: 95 },
    { key: 'completed', label: 'Completed', pct: 100 },
  ];

  let percentage = value ?? 0;
  if (status) {
    const found = statusSteps.find(s => s.key === status);
    if (found) percentage = found.pct;
  }

  return (
    <div className={cn('w-full space-y-2', className)}>
      {showLabels && status && (
        <div className="flex justify-between text-xs text-gray-400">
          {statusSteps.map((step) => {
            const isCurrent = step.key === status;
            const isPast = percentage >= step.pct;
            return (
              <span
                key={step.key}
                className={cn(
                  'transition-colors',
                  isCurrent && 'text-amber-400 font-semibold',
                  isPast && !isCurrent && 'text-gray-300',
                  !isPast && 'text-gray-600'
                )}
              >
                {step.label}
              </span>
            );
          })}
        </div>
      )}
      <div className="w-full bg-surface-50 border border-surface-border rounded-full h-2 overflow-hidden relative">
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500 ease-out shadow-sm shadow-amber-500/50"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
