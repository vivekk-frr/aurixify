'use client';

import React from 'react';
import Link from 'next/link';
import { EditorWithProfile } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Star, Clock, CheckCircle2, ShieldCheck,
  Video, ArrowRight, Sparkles, Layers
} from 'lucide-react';
import {
  formatCurrency, getSpecialtyLabel, getSoftwareLabel,
  getStatusColor
} from '@/lib/utils';

export function EditorCard({ editor }: { editor: EditorWithProfile }) {
  const profile = editor.editorProfile;

  return (
    <div className="bg-surface-50 border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,255,255,0.03)] hover:-translate-y-1 flex flex-col justify-between group">
      {/* Top row: Avatar + Name + Rating */}
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={editor.avatarUrl}
              name={editor.name}
              size="lg"
              status={profile.availabilityStatus === 'available' ? 'online' : 'busy'}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/editors/${editor.id}`}
                  className="font-bold text-lg text-white group-hover:text-gray-300 transition-colors"
                >
                  {editor.name}
                </Link>
                <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Professional Editor" />
              </div>
              <p className="text-xs text-gray-400 font-medium">{editor.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-surface-100 px-2.5 py-1 rounded-full border border-white/10 shadow-inner">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span className="text-xs font-bold text-white">{profile.avgRating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-500 font-medium">({profile.totalReviews})</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {editor.bio}
        </p>

        {/* Specialties Badges */}
        <div className="flex flex-wrap gap-1.5">
          {profile.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="text-[10px] px-2.5 py-1 rounded-full bg-surface-100 text-gray-300 border border-white/5 font-medium"
            >
              {getSpecialtyLabel(spec)}
            </span>
          ))}
          {profile.specialties.length > 3 && (
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface-100 text-gray-500 font-medium">
              +{profile.specialties.length - 3}
            </span>
          )}
        </div>

        {/* Software Stack */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Layers className="w-4 h-4 text-gray-600" />
          <span className="truncate">
            {profile.software.map(getSoftwareLabel).join(', ')}
          </span>
        </div>
      </div>

      {/* Bottom Section: Metrics & Action Buttons */}
      <div className="pt-6 mt-6 border-t border-white/5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-medium">Starts at</span>
            <span className="text-lg font-black text-white">
              {formatCurrency(profile.startingPrice)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-medium">Turnaround</span>
            <span className="text-sm font-semibold text-gray-300 flex items-center justify-end gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white" />
              ~{profile.turnaroundDays} days
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-medium">Delivered</span>
            <span className="text-sm font-semibold text-white">
              {profile.completedProjectsCount} projects
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href={`/editors/${editor.id}`}>
            <Button size="md" variant="outline" className="w-full text-sm rounded-full bg-surface-100 hover:bg-white hover:text-black border-transparent transition-colors">
              View Profile
            </Button>
          </Link>
          <Link href={`/projects/new?editorId=${editor.id}`}>
            <Button size="md" variant="primary" className="w-full text-sm rounded-full bg-white text-black hover:bg-gray-200">
              Hire Editor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
