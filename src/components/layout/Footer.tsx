import React from 'react';
import Link from 'next/link';
import { Film, Github, Twitter, Youtube, Sparkles, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-300 border-t border-surface-border mt-24 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black font-black">
                <Film className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">AURIXIFY</span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              The purpose-built workspace for independent video editors and their clients.
              Hire, brief, review timestamped cuts, manage revisions, and deliver final files in one place.
            </p>
            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <span className="flex items-center gap-1.5 bg-surface-100 border border-surface-border px-3 py-1 rounded-full text-[11px] text-amber-400">
                <Sparkles className="w-3 h-3" />
                No More Lost Feedback & Drive Chaos
              </span>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Product</h5>
            <ul className="space-y-2">
              <li><Link href="/editors" className="hover:text-amber-400 transition-colors">Find Editors</Link></li>
              <li><Link href="/projects" className="hover:text-amber-400 transition-colors">Project Workspace</Link></li>
              <li><Link href="/projects/proj-1/review" className="hover:text-amber-400 transition-colors">Video Review Demo</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">Pricing & Escrow</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Solutions */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider">For Creators & Editors</h5>
            <ul className="space-y-2">
              <li><Link href="/onboarding/editor" className="hover:text-amber-400 transition-colors">Become an Editor</Link></li>
              <li><Link href="/onboarding/client" className="hover:text-amber-400 transition-colors">Hire an Editor</Link></li>
              <li><Link href="/dashboard/editor" className="hover:text-amber-400 transition-colors">Editor Dashboard</Link></li>
              <li><Link href="/dashboard/client" className="hover:text-amber-400 transition-colors">Client Dashboard</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Company */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h5>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Aurixify</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">Security & Files</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© 2026 Aurixify Inc. Built for professional video creators and editing teams.</p>
          <div className="flex items-center gap-4">
            <span>Frame-accurate review</span>
            <span>•</span>
            <span>Version control</span>
            <span>•</span>
            <span>Secure payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
