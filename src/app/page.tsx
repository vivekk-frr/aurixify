'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { EditorCard } from '@/components/editors/EditorCard';
import { getAllEditorsWithProfiles } from '@/data/seed';
import {
  Film, Sparkles, Play, MessageSquare, CheckCircle2,
  Clock, Shield, ArrowRight, Video, FileText, Layers,
  Zap, Star, Lock, Users, ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const editors = getAllEditorsWithProfiles().slice(0, 4);

  return (
    <div className="space-y-24 pb-16">
      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative pt-12 sm:pt-28 pb-12 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 animate-glow-pulse blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-100 border border-white/10 px-4 py-1.5 rounded-full text-xs text-gray-300 font-medium shadow-2xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>The Specialized Workspace for Video Editors & Clients</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white max-w-5xl mx-auto leading-[1.05]">
            Where great videos <br />
            <span className="text-gray-400">
              get made.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            The workspace for video editors and clients to collaborate, review with frame-accurate timestamped feedback, revise, and deliver — without the chaos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/editors">
              <Button size="lg" variant="primary" className="w-full sm:w-auto font-bold px-8 rounded-full h-14 text-base">
                <span>Find an Editor</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/projects/proj-1/review">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 rounded-full h-14 text-base bg-white/5 backdrop-blur-md hover:bg-white/10 border-white/10 hover:border-white/30 text-white">
                <Play className="w-4 h-4 fill-current mr-2" />
                <span>Live Review Demo</span>
              </Button>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Timestamped Video Review
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Revision Tracking & History
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Structured Creative Briefs
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Protected Escrow Payouts
            </span>
          </div>

          {/* ============================================================ */}
          {/* HERO WORKSPACE INTERACTIVE PREVIEW */}
          {/* ============================================================ */}
          <div className="pt-16 max-w-5xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-surface-100/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-3 sm:p-5 shadow-[0_0_80px_rgba(255,255,255,0.05)] relative text-left overflow-hidden ring-1 ring-white/5">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-surface-border" />
                  <div className="w-3 h-3 rounded-full bg-surface-border" />
                  <div className="w-3 h-3 rounded-full bg-surface-border" />
                  <span className="text-xs font-mono text-gray-500 ml-2">
                    aurixify.app/projects/iphone-17-review/review
                  </span>
                </div>
                <span className="text-xs bg-white text-black border border-white px-3 py-1 rounded-full font-mono font-bold">
                  Draft 2 • In Review
                </span>
              </div>

              {/* Preview Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left: Video Player Mockup */}
                <div className="lg:col-span-2 bg-black rounded-2xl aspect-video relative flex flex-col justify-between p-4 border border-white/10 overflow-hidden shadow-inner">
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/20">
                      00:37 / 09:38
                    </span>
                    <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Paused at 00:37
                    </span>
                  </div>

                  {/* Playhead Center */}
                  <div className="text-center z-10">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center mx-auto hover:scale-110 hover:bg-white hover:text-black transition-all cursor-pointer">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Scrubber Bar */}
                  <div className="space-y-1.5 z-10">
                    <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="bg-white h-full w-[35%]" />
                      {/* Marker */}
                      <div className="absolute top-0 left-[15%] w-1 h-full bg-emerald-400" />
                      <div className="absolute -top-1 left-[35%] w-1.5 h-3.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      <div className="absolute top-0 left-[60%] w-1 h-full bg-white/50" />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>00:37</span>
                      <span className="text-white">Marker selected</span>
                      <span>09:38</span>
                    </div>
                  </div>
                </div>

                {/* Right: Feedback Mockup */}
                <div className="bg-surface-50/50 rounded-2xl p-4 border border-white/5 flex flex-col justify-between space-y-3">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white">Client Feedback</span>
                      <span className="text-gray-400 font-mono text-[10px]">3 Open</span>
                    </div>

                    <div className="bg-surface-100 p-3 rounded-xl border border-white/20 text-xs space-y-2 shadow-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-mono font-bold text-[11px]">▶ 00:37</span>
                        <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-full font-medium">Open</span>
                      </div>
                      <p className="text-gray-300 text-[11px] leading-relaxed">
                        "Make this transition faster. Maybe a whip pan instead of a dissolve."
                      </p>
                      <div className="text-[10px] text-gray-400 pt-2 border-t border-white/10">
                        <span className="text-white font-semibold">Alex (Editor):</span> "On it! Swapping to whip pan with motion blur."
                      </div>
                    </div>

                    <div className="bg-surface-100/50 p-3 rounded-xl border border-white/5 text-xs space-y-1 opacity-60">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-400 font-mono text-[10px]">✓ 01:14</span>
                        <span className="text-[9px] text-emerald-400">Resolved</span>
                      </div>
                      <p className="text-gray-500 text-[10px] line-through">
                        "Change subtitle font to Inter Bold."
                      </p>
                    </div>
                  </div>

                  <Link href="/projects/proj-1/review" className="w-full pt-4">
                    <Button size="sm" variant="outline" className="w-full text-xs bg-white text-black hover:bg-neutral-200 border-transparent">
                      Try Interactive Workspace
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4 CORE VALUE PILLARS */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        <div className="text-center space-y-4">
          <h2 className="text-xs uppercase font-mono tracking-widest text-gray-500">
            Engineered for Video Workflows
          </h2>
          <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Everything your project needs.<br/><span className="text-gray-500">Nothing you don't.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-surface-50 border border-white/5 rounded-3xl p-8 space-y-6 hover:border-white/20 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Hire better.</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Discover vetted video editors through real video portfolios, verified turnaround times, software specialties, and client ratings.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-surface-50 border border-white/5 rounded-3xl p-8 space-y-6 hover:border-white/20 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Review smarter.</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Leave feedback directly on the exact timestamp in the video cut. No more "at around 2 minutes" guesswork.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-surface-50 border border-white/5 rounded-3xl p-8 space-y-6 hover:border-white/20 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Collaborate.</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Keep creative briefs, raw footage, scripts, chat threads, drafts, and approvals organized in a dedicated project workspace.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-surface-50 border border-white/5 rounded-3xl p-8 space-y-6 hover:border-white/20 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Finish faster.</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Track revisions from Draft 1 to Final Delivery. Automatic status progressions, deadline countdowns, and secure escrow payouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED EDITORS SHOWCASE */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <h2 className="text-xs uppercase font-mono tracking-widest text-gray-500">
              Top Talent
            </h2>
            <p className="text-3xl font-black text-white tracking-tight">
              Featured Video Editors
            </p>
          </div>
          <Link href="/editors">
            <Button size="sm" variant="outline" className="text-xs rounded-full bg-surface-50 border-white/10 hover:border-white/30 text-white">
              <span>View All 50+ Editors</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {editors.map((editor) => (
            <EditorCard key={editor.id} editor={editor} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* THE WORKFLOW WALKTHROUGH */}
      {/* ============================================================ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] border-y border-white/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-xs uppercase font-mono tracking-widest text-gray-500">
              End-to-End Simplicity
            </h2>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              From initial brief to final master in 6 steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            {[
              { step: '01', title: 'Find & Hire', desc: 'Select an editor based on style, rates, and software.' },
              { step: '02', title: 'Creative Brief', desc: 'Define goals, target audience, and must-haves.' },
              { step: '03', title: 'Upload Assets', desc: 'Share raw footage, audio stems, and graphics.' },
              { step: '04', title: 'Review Draft', desc: 'Leave timestamped comments directly on the cut.' },
              { step: '05', title: 'Revise & Polish', desc: 'Editor resolves items and uploads revisions.' },
              { step: '06', title: 'Approve & Pay', desc: 'Sign off on the master cut and release funds.' },
            ].map((s) => (
              <div key={s.step} className="bg-surface-50/50 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-white/20 transition-colors">
                <span className="font-mono text-white font-bold text-xl">{s.step}</span>
                <h4 className="font-bold text-white text-sm">{s.title}</h4>
                <p className="text-gray-400 leading-relaxed text-[11px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CALL TO ACTION */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-100 border border-white/10 rounded-[40px] p-10 sm:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Ready to eliminate video revision chaos?
            </h2>
            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Join top YouTube creators, agencies, and professional video editors collaborating inside Aurixify today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
            <Link href="/editors">
              <Button size="lg" variant="primary" className="font-bold px-10 rounded-full h-14 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <span>Find an Editor</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="px-10 rounded-full h-14 bg-white/5 border-white/10 hover:border-white/30 text-white">
                <span>Create Free Workspace</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
