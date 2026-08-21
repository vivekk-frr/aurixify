'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { getAllEditorsWithProfiles } from '@/data/seed';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { VideoType, Platform } from '@/types';
import {
  Film, Sparkles, Target, Palette, Users, Ban,
  CheckCircle, Upload, ArrowRight, ArrowLeft, ShieldCheck
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function NewProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultEditorId = searchParams.get('editorId') || 'editor-1';

  const { createProject, currentUser } = useApp();
  const allEditors = getAllEditorsWithProfiles();

  // Wizard Step (1: Basics & Editor, 2: Creative Brief, 3: Assets & Review)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [editorId, setEditorId] = useState(defaultEditorId);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoType, setVideoType] = useState<VideoType>('youtube-video');
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [budget, setBudget] = useState(500);
  const [numVideos, setNumVideos] = useState(1);
  const [deadlineDays, setDeadlineDays] = useState(14);

  // Creative Brief
  const [goal, setGoal] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [style, setStyle] = useState('');
  const [tone, setTone] = useState('');
  const [references, setReferences] = useState('MKBHD-style lighting, Ali Abdaal title pacing');
  const [requiredElements, setRequiredElements] = useState('Animated intro logo, lower third name tags, sound effects on transitions, subscribe end card');
  const [thingsToAvoid, setThingsToAvoid] = useState('No robotic AI voices, avoid generic stock background music');

  // Assets
  const [assetsLink, setAssetsLink] = useState('');

  const selectedEditor = allEditors.find((e) => e.id === editorId) || allEditors[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deadline = new Date(Date.now() + deadlineDays * 86400000).toISOString();

    const newProj = createProject(
      {
        editorId,
        name: name || 'Untitled Video Project',
        description,
        videoType,
        platform,
        deadline,
        budget: Number(budget),
        numVideos: Number(numVideos),
      },
      {
        goal,
        targetAudience,
        style,
        tone,
        references: references.split(',').map((s) => s.trim()).filter(Boolean),
        requiredElements: requiredElements.split(',').map((s) => s.trim()).filter(Boolean),
        thingsToAvoid: thingsToAvoid.split(',').map((s) => s.trim()).filter(Boolean),
      }
    );

    // Redirect straight to the new project workspace
    router.push(`/projects/${newProj.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3 py-1 rounded-full text-xs text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Project Kickoff Studio</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Create a New Video Project
        </h1>
        <p className="text-xs text-gray-400">
          Provide crystal-clear creative direction to avoid back-and-forth revision cycles.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-3 gap-3 border-b border-surface-border pb-4 text-xs font-semibold">
        {[
          { num: 1, label: '1. Project & Editor' },
          { num: 2, label: '2. Creative Brief' },
          { num: 3, label: '3. Assets & Launch' },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setStep(s.num as any)}
            className={`pb-2 text-left border-b-2 transition-colors ${
              step === s.num
                ? 'text-amber-400 border-amber-400'
                : step > s.num
                ? 'text-emerald-400 border-emerald-400/50'
                : 'text-gray-500 border-transparent'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* STEP 1: BASICS & EDITOR */}
        {step === 1 && (
          <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-bold text-base text-white">Project Specifications</h3>

            <div className="space-y-4">
              <Input
                label="Project Title"
                placeholder="e.g. M4 iPad Pro In-Depth Review, 10 Summer Reels..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Textarea
                label="Summary / Overview"
                placeholder="Brief description of the project scope and deliverable..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300 block">Video Format / Type</label>
                  <select
                    value={videoType}
                    onChange={(e) => setVideoType(e.target.value as VideoType)}
                    className="w-full bg-surface-50 border border-surface-border rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="youtube-video">Long-Form YouTube Video</option>
                    <option value="youtube-short">YouTube Short</option>
                    <option value="instagram-reel">Instagram Reel</option>
                    <option value="tiktok">TikTok</option>
                    <option value="commercial">Commercial / Ad</option>
                    <option value="podcast">Podcast Episode</option>
                    <option value="corporate">Corporate / Demo</option>
                    <option value="documentary">Documentary</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300 block">Primary Destination Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="w-full bg-surface-50 border border-surface-border rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="youtube">YouTube (16:9 or 9:16)</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="website">Website / Landing Page</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <Input
                  label="Agreed Budget ($ USD)"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  min={50}
                />

                <Input
                  label="Number of Final Videos"
                  type="number"
                  value={numVideos}
                  onChange={(e) => setNumVideos(Number(e.target.value))}
                  min={1}
                />

                <Input
                  label="Turnaround Window (Days)"
                  type="number"
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  min={1}
                />
              </div>

              {/* Select Editor Card */}
              <div className="space-y-2 pt-4 border-t border-surface-border">
                <label className="text-xs font-semibold text-gray-200 block">Assign Video Editor</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allEditors.map((ed) => {
                    const isSelected = ed.id === editorId;
                    return (
                      <div
                        key={ed.id}
                        onClick={() => setEditorId(ed.id)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-surface-50 border-amber-500 shadow-md shadow-amber-500/10'
                            : 'bg-surface-200/50 border-surface-border hover:border-gray-600'
                        }`}
                      >
                        <Avatar src={ed.avatarUrl} name={ed.name} size="sm" />
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white truncate">{ed.name}</span>
                            <span className="text-amber-400 font-mono font-bold text-[11px]">
                              {formatCurrency(ed.editorProfile.startingPrice)}+
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 truncate">{ed.bio}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button" variant="primary" onClick={() => setStep(2)}>
                <span>Continue to Creative Brief</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: CREATIVE BRIEF */}
        {step === 2 && (
          <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-bold text-base text-white">Creative Direction & Brief</h3>

            <div className="space-y-4">
              <Input
                label="Primary Goal of This Video"
                placeholder="e.g. Drive 10,000 email signups, explain complex architecture, entertain gaming fans..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />

              <Input
                label="Target Audience"
                placeholder="e.g. Tech buyers aged 20-35, fitness enthusiasts, venture capital founders..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Visual Style & Pacing"
                  placeholder="e.g. Fast-paced snappy cuts, cinematic moody B-roll, minimal corporate..."
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                />

                <Input
                  label="Tone & Voice"
                  placeholder="e.g. High energy & motivational, thoughtful & educational, comedic..."
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                />
              </div>

              <Textarea
                label="Must-Have Required Elements (Comma separated)"
                placeholder="e.g. Logo watermark, animated lower thirds, chapter titles, subscribe animation"
                value={requiredElements}
                onChange={(e) => setRequiredElements(e.target.value)}
                rows={2}
              />

              <Textarea
                label="Things to Avoid / Creative Red Flags (Comma separated)"
                placeholder="e.g. No jump cuts on main narrative, avoid cheesy sound effects, no saturated filters"
                value={thingsToAvoid}
                onChange={(e) => setThingsToAvoid(e.target.value)}
                rows={2}
              />

              <Input
                label="Style References & Inspo URLs"
                placeholder="e.g. youtube.com/watch?v=..., MKBHD camera style, Linear brand videos"
                value={references}
                onChange={(e) => setReferences(e.target.value)}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Back</span>
              </Button>
              <Button type="button" variant="primary" onClick={() => setStep(3)}>
                <span>Next: Assets & Review</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: ASSETS & LAUNCH */}
        {step === 3 && (
          <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-bold text-base text-white">Assets & Project Review</h3>

            <div className="space-y-4">
              <Input
                label="Cloud Drive / Raw Footage Folder Link (Google Drive, Dropbox, Frame.io, OneDrive)"
                placeholder="https://drive.google.com/drive/folders/..."
                value={assetsLink}
                onChange={(e) => setAssetsLink(e.target.value)}
                helperText="You can also upload individual clips and brand assets directly inside the workspace later."
              />

              {/* Summary Card */}
              <div className="bg-surface-50 p-5 rounded-2xl border border-surface-border space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm">Summary of Agreement</h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-gray-300">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Editor</span>
                    <span className="font-semibold text-white">{selectedEditor.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Total Escrow</span>
                    <span className="font-semibold text-amber-400 font-mono">{formatCurrency(budget)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Target Due Date</span>
                    <span className="font-semibold text-white">{deadlineDays} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Status</span>
                    <span className="font-semibold text-blue-400">Briefing Stage</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-200/60 p-4 rounded-xl border border-surface-border text-xs text-gray-400 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p leading-relaxed>
                  When you submit, your workspace is created immediately in <strong>Briefing</strong> status. Your editor is notified to review the brief, confirm footage access, and begin the rough cut.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Back</span>
              </Button>
              <Button type="submit" variant="primary" size="lg" className="font-bold shadow-xl shadow-amber-500/25">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Launch Project Workspace</span>
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
