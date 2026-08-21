'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/ui/Avatar';
import { UserCheck, Sparkles, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PersonaSwitcher() {
  const { currentUser, switchUser, allUsers } = useApp();

  return (
    <div className="bg-surface-200/90 border-b border-surface-border text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-gray-300">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Demo Persona:
        </span>
        <span className="text-gray-400 hidden sm:inline">
          Switch roles to experience the end-to-end client ↔ editor workflow
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {allUsers.slice(0, 5).map((user) => {
          const isActive = currentUser?.id === user.id;
          return (
            <button
              key={user.id}
              onClick={() => switchUser(user.id)}
              className={cn(
                'flex items-center gap-2 px-2.5 py-1 rounded-full transition-all border shrink-0',
                isActive
                  ? 'bg-amber-500 text-black border-amber-400 font-semibold shadow-sm'
                  : 'bg-surface-100/80 text-gray-300 border-surface-border hover:border-gray-500 hover:text-white'
              )}
            >
              <Avatar src={user.avatarUrl} name={user.name} size="sm" className="w-4 h-4 text-[9px]" />
              <span className="text-[11px] whitespace-nowrap">
                {user.name.split(' ')[0]} ({user.role})
              </span>
              {isActive && <UserCheck className="w-3 h-3 text-black" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
