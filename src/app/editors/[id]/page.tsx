'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getEditorWithProfile } from '@/data/seed';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Star, ShieldCheck, Clock, CheckCircle2, MessageSquare,
  Play, Video, Layers, Globe, Calendar, Award, Sparkles,
  ArrowRight, ExternalLink
} from 'lucide-react';
import {
  formatCurrency, getSpecialtyLabel, getSoftwareLabel,
  formatDate
} from '@/lib/utils';

export default function EditorProfilePage() {
  const params = useParams();
  const editorId = params.id as string;
  const editor = getEditorWithProfile(editorId) || getEditorWithProfile('editor-1')!;

  const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'reviews' | 'about'>('portfolio');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const profile = editor.editorProfile;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <div className="bg-surface-100/90 border border-surface-border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Avatar + Main Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar
              src={editor.avatarUrl}
              name={editor.name}
              size="xl"
              status={profile.availabilityStatus === 'available' ? 'online' : 'busy'}
              className="w-20 h-20 text-xl border-2 border-amber-500/40"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{editor.name}</h1>
                <span className="flex items-center gap-1 bg-amber-500/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Pro
                </span>
                <StatusBadge status={profile.availabilityStatus} />
              </div>

              <p className="text-xs text-gray-400">
                @{editor.username} • {editor.location} • Member since 2024
              </p>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1.5 bg-surface-50 px-3 py-1 rounded-full border border-surface-border">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{profile.avgRating.toFixed(1)}</span>
                  <span className="text-gray-400">({profile.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>~{profile.turnaroundDays} days turnaround</span>
                </div>
                <div className="text-emerald-400 font-semibold">
                  ✓ {profile.completedProjectsCount} projects delivered
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & CTAs */}
          <div className="bg-surface-200/90 p-5 rounded-2xl border border-surface-border flex flex-col sm:flex-row lg:flex-col justify-between gap-4 lg:w-72 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 tracking-wider block">
                Starting Rate
              </span>
              <span className="text-3xl font-extrabold text-white font-mono">
                {formatCurrency(profile.startingPrice)}
              </span>
              <span className="text-xs text-gray-400 block mt-0.5">
                {profile.hourlyRate ? `$${profile.hourlyRate}/hr • ` : ''}per video quote
              </span>
            </div>

            <div className="space-y-2 w-full">
              <Link href={`/projects/new?editorId=${editor.id}`} className="block w-full">
                <Button size="md" variant="primary" className="w-full font-bold shadow-lg shadow-amber-500/20">
                  <span>Hire {editor.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href={`/projects/new?editorId=${editor.id}&mode=inquire`} className="block w-full">
                <Button size="md" variant="outline" className="w-full text-xs">
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  <span>Send Project Inquiry</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-gray-300 max-w-4xl leading-relaxed pt-2 border-t border-surface-border/60">
          {editor.bio}
        </p>

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {profile.specialties.map((spec) => (
            <span
              key={spec}
              className="text-xs px-3 py-1 rounded-lg bg-surface-50 text-gray-200 border border-surface-border font-medium"
            >
              {getSpecialtyLabel(spec)}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* PROFILE TABS */}
      {/* ============================================================ */}
      <div className="space-y-6">
        <div className="flex border-b border-surface-border gap-6">
          {[
            { id: 'portfolio', label: `Portfolio (${editor.portfolio.length})` },
            { id: 'services', label: `Services & Packages (${editor.services.length})` },
            { id: 'reviews', label: `Client Reviews (${editor.reviews.length})` },
            { id: 'about', label: 'Skills & Software' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-semibold transition-colors relative border-b-2 ${
                activeTab === tab.id
                  ? 'text-amber-400 border-amber-400'
                  : 'text-gray-400 hover:text-white border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editor.portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-surface-100/90 border border-surface-border rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all group flex flex-col justify-between shadow-lg"
              >
                <div className="relative aspect-video bg-black flex items-center justify-center cursor-pointer overflow-hidden">
                  {/* Video Mock/Poster */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-20">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 left-2 z-20 text-[10px] bg-black/80 text-amber-400 font-mono px-2 py-0.5 rounded border border-white/10">
                    {getSpecialtyLabel(item.category)}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 pt-3 border-t border-surface-border/60 text-[11px] text-gray-500">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{item.softwareUsed.map(getSoftwareLabel).join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editor.services.map((svc) => (
              <div
                key={svc.id}
                className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-bold text-base text-white">{svc.name}</h3>
                    <span className="text-base font-extrabold text-amber-400 font-mono">
                      {formatCurrency(svc.startingPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{svc.description}</p>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    ~{svc.estimatedDays} days turnaround
                  </span>
                  <Link href={`/projects/new?editorId=${editor.id}&service=${encodeURIComponent(svc.name)}`}>
                    <Button size="sm" variant="primary" className="text-xs">
                      Book This Service
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {editor.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={rev.client.avatarUrl} name={rev.client.name} size="sm" />
                    <div>
                      <h4 className="font-bold text-xs text-white">{rev.client.name}</h4>
                      <p className="text-[10px] text-gray-500">{formatDate(rev.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-surface-50 px-2.5 py-1 rounded-full border border-surface-border">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-white">{rev.rating}.0</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed italic pl-10">
                  "{rev.content}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: ABOUT & STACK */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 space-y-4 shadow-md">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Software & Tool Stack
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {profile.software.map((sw) => (
                  <div key={sw} className="bg-surface-50 p-2.5 rounded-xl border border-surface-border text-gray-200 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{getSoftwareLabel(sw)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 space-y-4 shadow-md">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                Languages & Experience
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 block mb-1">Languages Spoken</span>
                  <p className="text-white font-medium">{profile.languages.join(', ')}</p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Industry Experience</span>
                  <p className="text-white font-medium">{profile.yearsExperience} Years of Professional Editing</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
