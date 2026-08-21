import React from 'react';
import { ProjectBrief } from '@/types';
import { Target, Users, Palette, Sparkles, CheckCircle, Ban, Link as LinkIcon } from 'lucide-react';

export function ProjectBriefView({ brief }: { brief: ProjectBrief }) {
  return (
    <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-surface-border">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="text-base font-bold text-white">Creative Project Brief</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Goal */}
        <div className="space-y-1.5">
          <span className="font-semibold text-gray-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Project Goal
          </span>
          <p className="text-gray-300 leading-relaxed bg-surface-50 p-3 rounded-xl border border-surface-border">
            {brief.goal || 'No specific goal described.'}
          </p>
        </div>

        {/* Target Audience */}
        <div className="space-y-1.5">
          <span className="font-semibold text-gray-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            Target Audience
          </span>
          <p className="text-gray-300 leading-relaxed bg-surface-50 p-3 rounded-xl border border-surface-border">
            {brief.targetAudience || 'General audience'}
          </p>
        </div>

        {/* Style & Aesthetic */}
        <div className="space-y-1.5">
          <span className="font-semibold text-gray-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            Visual Style & Pacing
          </span>
          <p className="text-gray-300 leading-relaxed bg-surface-50 p-3 rounded-xl border border-surface-border">
            {brief.style || 'Standard modern edit'}
          </p>
        </div>

        {/* Tone */}
        <div className="space-y-1.5">
          <span className="font-semibold text-gray-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Tone & Mood
          </span>
          <p className="text-gray-300 leading-relaxed bg-surface-50 p-3 rounded-xl border border-surface-border">
            {brief.tone || 'Professional & Engaging'}
          </p>
        </div>
      </div>

      {/* Required Elements */}
      {brief.requiredElements && brief.requiredElements.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-surface-border/70">
          <span className="font-semibold text-gray-300 text-xs flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Must-Have Elements
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {brief.requiredElements.map((el, i) => (
              <div key={i} className="flex items-center gap-2 bg-surface-50/70 p-2.5 rounded-lg border border-surface-border text-xs text-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{el}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Things to Avoid */}
      {brief.thingsToAvoid && brief.thingsToAvoid.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-surface-border/70">
          <span className="font-semibold text-gray-300 text-xs flex items-center gap-1.5 text-red-400">
            <Ban className="w-3.5 h-3.5 text-red-400" />
            Things to Avoid / Red Flags
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {brief.thingsToAvoid.map((avoid, i) => (
              <div key={i} className="flex items-center gap-2 bg-red-500/5 p-2.5 rounded-lg border border-red-500/20 text-xs text-red-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>{avoid}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {brief.references && brief.references.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-surface-border/70">
          <span className="font-semibold text-gray-300 text-xs flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
            Style References & Inspo
          </span>
          <div className="flex flex-wrap gap-2">
            {brief.references.map((ref, i) => (
              <span key={i} className="bg-surface-50 px-3 py-1.5 rounded-lg border border-surface-border text-xs text-amber-400 font-mono">
                {ref}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
