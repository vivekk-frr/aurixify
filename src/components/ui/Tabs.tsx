'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pills' | 'segmented';
}

export function Tabs({ tabs, activeTab, onChange, className, variant = 'underline' }: TabsProps) {
  if (variant === 'segmented') {
    return (
      <div className={cn('inline-flex bg-surface-50 p-1 rounded-xl border border-surface-border', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all',
                isActive
                  ? 'bg-surface-200 text-white shadow-sm border border-surface-border/80 font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              )}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded-full text-[10px]',
                    isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-surface-100 text-gray-400'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all',
                isActive
                  ? 'bg-amber-500 text-black border-amber-400 font-semibold shadow-sm shadow-amber-500/20'
                  : 'bg-surface-100 border-surface-border text-gray-400 hover:text-gray-200 hover:border-gray-600'
              )}
            >
              {tab.icon && <span className="w-3.5 h-3.5">{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={cn('px-1.5 py-0.2 rounded-full text-[10px]', isActive ? 'bg-black/20 text-black' : 'bg-surface-50 text-gray-400')}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex border-b border-surface-border gap-6 overflow-x-auto no-scrollbar', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 pb-3 text-sm font-medium transition-all relative border-b-2 whitespace-nowrap',
              isActive
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'text-gray-400 hover:text-gray-200 border-transparent'
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-xs',
                  isActive ? 'bg-amber-500/20 text-amber-400 font-medium' : 'bg-surface-50 text-gray-500'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
