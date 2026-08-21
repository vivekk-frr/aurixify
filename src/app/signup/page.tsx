'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Film, Video, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserRole } from '@/types';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'client';

  const [role, setRole] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'editor') {
      router.push(`/onboarding/editor?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
    } else {
      router.push(`/onboarding/client?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black">
            <Film className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">AURIXIFY</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-white">Join Aurixify</h1>
        <p className="text-xs text-gray-400">
          The collaborative workspace where great videos get made.
        </p>
      </div>

      <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Role Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-200 block">I am joining as a:</label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setRole('client')}
              className={`p-4 rounded-xl border cursor-pointer transition-all text-center space-y-2 ${
                role === 'client'
                  ? 'bg-surface-50 border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-surface-200/60 border-surface-border hover:border-gray-600'
              }`}
            >
              <Users className={`w-5 h-5 mx-auto ${role === 'client' ? 'text-amber-400' : 'text-gray-400'}`} />
              <div>
                <p className="font-bold text-xs text-white">Client / Creator</p>
                <p className="text-[10px] text-gray-400">I want to hire editors</p>
              </div>
            </div>

            <div
              onClick={() => setRole('editor')}
              className={`p-4 rounded-xl border cursor-pointer transition-all text-center space-y-2 ${
                role === 'editor'
                  ? 'bg-surface-50 border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-surface-200/60 border-surface-border hover:border-gray-600'
              }`}
            >
              <Video className={`w-5 h-5 mx-auto ${role === 'editor' ? 'text-amber-400' : 'text-gray-400'}`} />
              <div>
                <p className="font-bold text-xs text-white">Video Editor</p>
                <p className="text-[10px] text-gray-400">I want client projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Jordan Taylor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="jordan@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="md" className="w-full font-bold">
            <span>Continue to Onboarding</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-400 font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
