'use client';

import React, { useState, useMemo } from 'react';
import { EditorWithProfile } from '@/types';
import { EditorCard } from './EditorCard';
import { EditorFilters, FilterState } from './EditorFilters';
import { EmptyState } from '@/components/ui/EmptyState';
import { Users, Sparkles, SlidersHorizontal } from 'lucide-react';

export function EditorGrid({ editors }: { editors: EditorWithProfile[] }) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    specialty: '',
    software: '',
    maxPrice: 1000,
    minRating: 0,
    turnaround: '',
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      search: '',
      specialty: '',
      software: '',
      maxPrice: 1000,
      minRating: 0,
      turnaround: '',
    });
  };

  const filteredEditors = useMemo(() => {
    return editors.filter((ed) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = ed.name.toLowerCase().includes(query);
        const matchesBio = ed.bio.toLowerCase().includes(query);
        const matchesSpec = ed.editorProfile.specialties.some((s) => s.toLowerCase().includes(query));
        if (!matchesName && !matchesBio && !matchesSpec) return false;
      }

      // Specialty
      if (filters.specialty && !ed.editorProfile.specialties.includes(filters.specialty as any)) {
        return false;
      }

      // Software
      if (filters.software && !ed.editorProfile.software.includes(filters.software as any)) {
        return false;
      }

      // Price
      if (filters.maxPrice < 1000 && ed.editorProfile.startingPrice > filters.maxPrice) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && ed.editorProfile.avgRating < filters.minRating) {
        return false;
      }

      return true;
    });
  }, [editors, filters]);

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex justify-between items-center bg-surface-100 p-3 rounded-xl border border-surface-border">
        <span className="text-xs text-gray-400 font-medium">
          Showing {filteredEditors.length} video editors
        </span>
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-50 text-xs text-amber-400 border border-surface-border font-medium"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24">
            <EditorFilters filters={filters} onChange={setFilters} onReset={resetFilters} />
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300">
              Verified Editors <span className="text-gray-500">({filteredEditors.length})</span>
            </h2>
            <div className="text-xs text-gray-400">
              Sorted by <span className="text-white font-medium">Top Rated & Active</span>
            </div>
          </div>

          {filteredEditors.length === 0 ? (
            <EmptyState
              icon={<Users className="w-6 h-6 text-gray-400" />}
              title="No editors match your filters"
              description="Try broadening your search criteria or resetting filters to see all talented creators."
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEditors.map((editor) => (
                <EditorCard key={editor.id} editor={editor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
