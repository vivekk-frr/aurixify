'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2, ShieldCheck, Zap, Sparkles,
  HelpCircle, ArrowRight, DollarSign, Lock
} from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fair & Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple pricing for creators & editors
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          No hidden fees or unexpected markups. We charge a flat 10% platform fee only on funded milestones to guarantee escrow protection, frame-accurate review hosting, and 24/7 support.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tier 1: Creators / Clients */}
        <div className="bg-surface-100/90 border border-surface-border rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-gray-400 font-bold">For Clients & Brands</span>
              <h3 className="text-2xl font-bold text-white mt-1">Creator Workspace</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-xs text-gray-400">/month subscription</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Unlimited project creation, video reviews, and file hosting. Pay only for the editors you hire.
            </p>

            <ul className="space-y-3 text-xs text-gray-300 pt-4 border-t border-surface-border">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Unlimited timestamped video comments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Full version revision tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Escrow payment protection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Raw footage & asset storage up to 50GB</span>
              </li>
            </ul>
          </div>

          <Link href="/signup?role=client" className="block w-full">
            <Button size="lg" variant="outline" className="w-full font-bold">
              Sign Up as Client
            </Button>
          </Link>
        </div>

        {/* Tier 2: Freelance Editors (Highlighted) */}
        <div className="bg-gradient-to-b from-surface-100 via-surface-100 to-surface-200 border-2 border-amber-500/80 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-full shadow-lg">
            Most Popular for Editors
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">For Freelancers</span>
              <h3 className="text-2xl font-bold text-white mt-1">Editor Standard</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">10%</span>
              <span className="text-xs text-gray-400">per completed project</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Everything you need to showcase your portfolio, receive client briefs, and deliver master cuts.
            </p>

            <ul className="space-y-3 text-xs text-gray-300 pt-4 border-t border-surface-border">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Custom verified public portfolio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Frame-accurate client feedback player</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct bank / Stripe instant payouts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>No bidding wars or proposal tokens</span>
              </li>
            </ul>
          </div>

          <Link href="/onboarding/editor" className="block w-full">
            <Button size="lg" variant="primary" className="w-full font-bold shadow-xl shadow-amber-500/25">
              <span>Start Editing Free</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Tier 3: Production Agencies */}
        <div className="bg-surface-100/90 border border-surface-border rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-gray-400 font-bold">For Post-Houses & Teams</span>
              <h3 className="text-2xl font-bold text-white mt-1">Agency Pro</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">$49</span>
              <span className="text-xs text-gray-400">/month + 5% fee</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              For editing agencies managing multi-creator teams, white-label client review portals, and high volume.
            </p>

            <ul className="space-y-3 text-xs text-gray-300 pt-4 border-t border-surface-border">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Up to 10 team editor seats</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Custom agency logo on review links</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1TB dedicated high-speed cloud footage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Priority 24/7 live concierge support</span>
              </li>
            </ul>
          </div>

          <Link href="/signup?role=agency" className="block w-full">
            <Button size="lg" variant="outline" className="w-full font-bold">
              Contact Agency Sales
            </Button>
          </Link>
        </div>
      </div>

      {/* Trust & FAQ */}
      <div className="bg-surface-200/70 border border-surface-border rounded-3xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-amber-400" />
          Escrow Guarantee & Security FAQs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">When is the editor paid?</h4>
            <p className="text-gray-400 leading-relaxed">
              When a project begins, client funds are held securely in Aurixify Escrow. Funds are only transferred to the editor once the client reviews and clicks "Approve Video Draft".
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white">What if revisions are required?</h4>
            <p className="text-gray-400 leading-relaxed">
              Clients leave timestamped comments on Draft 1. The editor uploads Draft 2 to address the feedback. The workflow continues until the agreed scope is met.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
