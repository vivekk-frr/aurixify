import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Film, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Video } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-amber-400 font-medium">
          <Film className="w-3.5 h-3.5" />
          <span>The Story of Aurixify</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Video production is broken. We built the fix.
        </h1>
        <p className="text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Generic freelance platforms treat video editing like data entry or translation. But video is visual, temporal, and frame-dependent.
        </p>
      </div>

      {/* The Problem & Solution */}
      <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
        <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">The Chaos of Modern Video Editing</h2>
          <p>
            Before Aurixify, video editors and creators were juggling 6 different fragmented tools just to produce one YouTube video:
          </p>
          <ul className="space-y-2 text-xs text-gray-400 list-disc list-inside">
            <li><strong>Instagram & Discord DMs</strong> for finding editors</li>
            <li><strong>Google Drive & Dropbox</strong> for raw footage that constantly ran out of space</li>
            <li><strong>WhatsApp / Slack</strong> for disjointed revision chats</li>
            <li><strong>Random screenshot mockups</strong> with vague notes like "at the 2-minute mark"</li>
            <li><strong>Manual bank transfers / Stripe invoices</strong> with zero escrow safety</li>
          </ul>
        </div>

        <div className="bg-surface-100/90 border border-amber-500/40 rounded-2xl p-8 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            The Unified Workspace Vision
          </h2>
          <p>
            Aurixify combines discovery, creative briefing, file management, frame-accurate timestamped video feedback, and protected escrow payouts into one unified, ultra-fast application.
          </p>
          <p className="text-xs text-gray-400">
            Whether you are a solo creator producing weekly YouTube tutorials or an agency editing commercial campaigns, Aurixify keeps your team aligned and delivers master cuts in half the time.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link href="/editors">
          <Button size="lg" variant="primary" className="font-bold px-8 shadow-xl shadow-amber-500/20">
            <span>Find an Editor on Aurixify</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
