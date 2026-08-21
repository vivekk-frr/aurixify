'use client';

import React from 'react';
import { EditorSpecialty, EditingSoftware } from '@/types';
import { getSpecialtyLabel, getSoftwareLabel } from '@/lib/utils';
import { Filter, Search, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export interface FilterState {
  search: string;
  specialty: string;
  software: string;
  maxPrice: number;
  minRating: number;
  turnaround: string;
}

interface EditorFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function EditorFilters({ filters, onChange, onReset }: EditorFiltersProps) {
  const specialties: EditorSpecialty[] = [
    'youtube', 'shorts-reels', 'tiktok', 'podcast', 'motion-graphics',
    'gaming', 'commercials', 'documentary', 'wedding', 'corporate'
  ];

  const softwares: EditingSoftware[] = [
    'premiere-pro', 'after-effects', 'davinci-resolve', 'final-cut', 'capcut', 'blender'
  ];

  return (
    <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-6 text-gray-200">
      <div className="flex items-center justify-between pb-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-sm text-white">Filter Editors</h3>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] text-gray-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by name, skill, bio..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        leftIcon={<Search className="w-4 h-4" />}
      />

      {/* Specialty Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-300 block">Video Specialty</label>
        <select
          value={filters.specialty}
          onChange={(e) => onChange({ ...filters, specialty: e.target.value })}
          className="w-full bg-surface-50 border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="">All Categories</option>
          {specialties.map((s) => (
            <option key={s} value={s}>
              {getSpecialtyLabel(s)}
            </option>
          ))}
        </select>
      </div>

      {/* Software Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-300 block">Software Used</label>
        <select
          value={filters.software}
          onChange={(e) => onChange({ ...filters, software: e.target.value })}
          className="w-full bg-surface-50 border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
        >
          <option value="">Any Software</option>
          {softwares.map((sw) => (
            <option key={sw} value={sw}>
              {getSoftwareLabel(sw)}
            </option>
          ))}
        </select>
      </div>

      {/* Max Starting Price */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <label className="font-semibold text-gray-300">Max Starting Price</label>
          <span className="font-mono text-amber-400 font-bold">
            {filters.maxPrice >= 1000 ? 'Any Price' : `$${filters.maxPrice}`}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-amber-500 bg-surface-50 cursor-pointer"
        />
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-300 block">Minimum Rating</label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 4.5, 4.8, 5.0].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange({ ...filters, minRating: rating })}
              className={`py-1.5 text-xs rounded-lg border text-center font-medium transition-colors ${
                filters.minRating === rating
                  ? 'bg-amber-500 text-black border-amber-400 font-bold'
                  : 'bg-surface-50 border-surface-border text-gray-300 hover:border-gray-500'
              }`}
            >
              {rating === 0 ? 'Any' : `${rating}★`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
