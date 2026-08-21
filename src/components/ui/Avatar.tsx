import React from 'react';
import { cn, getInitials } from '@/lib/utils';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'busy' | 'offline';
}

export function Avatar({ src, name, size = 'md', className, status }: AvatarProps) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs font-medium',
    lg: 'w-12 h-12 text-sm font-semibold',
    xl: 'w-16 h-16 text-base font-bold',
  };

  const statusDotSizes = {
    sm: 'w-2 h-2 bottom-0 right-0',
    md: 'w-2.5 h-2.5 bottom-0 right-0',
    lg: 'w-3 h-3 bottom-0.5 right-0.5',
    xl: 'w-4 h-4 bottom-1 right-1',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    offline: 'bg-gray-500',
  };

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          'relative rounded-full overflow-hidden bg-surface-50 border border-surface-border flex items-center justify-center text-gray-200 select-none shadow-sm',
          sizes[size],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials on load error
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute rounded-full border-2 border-background',
            statusColors[status],
            statusDotSizes[size]
          )}
        />
      )}
    </div>
  );
}
