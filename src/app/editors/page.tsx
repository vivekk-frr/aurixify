'use client';

import React from 'react';
import { getAllEditorsWithProfiles } from '@/data/seed';
import { EditorGrid } from '@/components/editors/EditorGrid';
import { Sparkles, Users, Filter } from 'lucide-react';

export default function EditorsPage() {
  const editors = getAllEditorsWithProfiles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3 py-1 rounded-full text-xs text-amber-400 font-medium">
          <Users className="w-3.5 h-3.5" />
          <span>Editor Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Discover World-Class Video Editors
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Browse vetted video professionals by editing style, software proficiency, turnaround speed, and client reviews.
        </p>
      </div>

      {/* Editor Grid with interactive filters */}
      <EditorGrid editors={editors} />
    </div>
  );
}
