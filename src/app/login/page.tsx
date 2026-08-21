'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Film, Sparkles, ArrowRight, UserCheck, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchUser, allUsers, setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo/MVP, find matching user or default to client
    const match = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || allUsers[0];
    setCurrentUser(match);
    router.push(match.role === 'editor' ? '/dashboard/editor' : '/dashboard/client');
  };

  const handlePersonaClick = (userId: string) => {
    switchUser(userId);
    const user = allUsers.find((u) => u.id === userId);
    router.push(user?.role === 'editor' ? '/dashboard/editor' : '/dashboard/client');
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
        <h1 className="text-2xl font-extrabold text-white">Log in to your workspace</h1>
        <p className="text-xs text-gray-400">
          Access your video projects, timestamped notes, and team files.
        </p>
      </div>

      {/* Quick Demo Personas */}
      <div className="bg-surface-100/90 border border-amber-500/30 rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>One-Click Demo Instant Access:</span>
        </div>
        <div className="space-y-2">
          {allUsers.slice(0, 3).map((user) => (
            <button
              key={user.id}
              onClick={() => handlePersonaClick(user.id)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface-50 hover:bg-surface-hover border border-surface-border text-xs transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <Avatar src={user.avatarUrl} name={user.name} size="sm" />
                <div>
                  <p className="font-bold text-white text-xs">{user.name}</p>
                  <p className="text-[10px] text-amber-400 capitalize">{user.role} Account</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Standard Form */}
      <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-6 shadow-xl space-y-5">
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="jordan.taylor@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <Button type="submit" variant="primary" size="md" className="w-full font-bold">
            <span>Log In</span>
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-400">
          Don't have an account yet?{' '}
          <Link href="/signup" className="text-amber-400 font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
