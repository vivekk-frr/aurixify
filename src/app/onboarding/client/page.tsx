'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Film, Sparkles, CheckCircle2, ArrowRight, Building, Globe } from 'lucide-react';

export default function ClientOnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialName = searchParams.get('name') || '';

  const { setCurrentUser, allUsers } = useApp();

  const [name, setName] = useState(initialName || 'Jordan Taylor');
  const [companyName, setCompanyName] = useState('TechBytes Media');
  const [industry, setIndustry] = useState('YouTube & Tech Reviews');
  const [website, setWebsite] = useState('https://youtube.com/@techbytes');
  const [description, setDescription] = useState('We create weekly 4K hardware and consumer gadget reviews.');

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const client = allUsers.find((u) => u.id === 'client-1') || allUsers[0];
    setCurrentUser(client);
    router.push('/dashboard/client');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Creator & Brand Onboarding</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Setup Your Creator Profile</h1>
        <p className="text-xs text-gray-400">
          Tell editors about your channel, style guidelines, and publishing schedule.
        </p>
      </div>

      <form onSubmit={handleFinish} className="bg-surface-100/90 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-4">
          <Input
            label="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Channel / Brand / Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. FitFlow, TechBytes, LaunchPad"
            required
          />

          <Input
            label="Content Category / Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g. Fitness & Wellness, Tech Reviews, Gaming"
            required
          />

          <Input
            label="Channel / Website Link"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://youtube.com/@yourchannel"
          />

          <Textarea
            label="Short Brand Summary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            helperText="What kind of video content do you produce regularly?"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" size="lg" className="w-full font-bold shadow-xl shadow-amber-500/25">
            <span>Launch Client Workspace</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}
