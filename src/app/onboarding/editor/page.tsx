'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { EditorSpecialty, EditingSoftware } from '@/types';
import { getSpecialtyLabel, getSoftwareLabel } from '@/lib/utils';
import { Film, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Layers, DollarSign } from 'lucide-react';

export default function EditorOnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialName = searchParams.get('name') || '';

  const { setCurrentUser, allUsers } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [name, setName] = useState(initialName || 'Alex Rivera');
  const [username, setUsername] = useState('alexedits');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [bio, setBio] = useState('Specialized in fast-paced cinematic YouTube edits and short-form Reels with motion graphics.');

  // Professional
  const [selectedSpecialties, setSelectedSpecialties] = useState<EditorSpecialty[]>(['youtube', 'shorts-reels', 'motion-graphics']);
  const [selectedSoftware, setSelectedSoftware] = useState<EditingSoftware[]>(['premiere-pro', 'after-effects', 'davinci-resolve']);
  const [yearsExperience, setYearsExperience] = useState(5);
  const [turnaroundDays, setTurnaroundDays] = useState(4);
  const [startingPrice, setStartingPrice] = useState(300);

  const specialtiesList: EditorSpecialty[] = [
    'youtube', 'shorts-reels', 'tiktok', 'podcast', 'motion-graphics',
    'gaming', 'commercials', 'documentary', 'wedding', 'corporate'
  ];

  const softwareList: EditingSoftware[] = [
    'premiere-pro', 'after-effects', 'davinci-resolve', 'final-cut', 'capcut', 'blender'
  ];

  const toggleSpecialty = (spec: EditorSpecialty) => {
    setSelectedSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleSoftware = (sw: EditingSoftware) => {
    setSelectedSoftware((prev) =>
      prev.includes(sw) ? prev.filter((s) => s !== sw) : [...prev, sw]
    );
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    // Set as active editor
    const editor = allUsers.find((u) => u.id === 'editor-1') || allUsers[0];
    setCurrentUser(editor);
    router.push('/dashboard/editor');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Editor Profile Setup</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Create Your Editor Profile</h1>
        <p className="text-xs text-gray-400">
          Showcase your editing skills and set your starting rates for prospective clients.
        </p>
      </div>

      {/* Steps indicator */}
      <div className="grid grid-cols-3 gap-2 border-b border-surface-border pb-3 text-xs font-semibold">
        {[
          { num: 1, label: '1. Basics' },
          { num: 2, label: '2. Skills & Stack' },
          { num: 3, label: '3. Pricing & Launch' },
        ].map((s) => (
          <div
            key={s.num}
            className={`pb-1 text-center border-b-2 ${
              step === s.num
                ? 'text-amber-400 border-amber-400'
                : step > s.num
                ? 'text-emerald-400 border-emerald-400'
                : 'text-gray-500 border-transparent'
            }`}
          >
            {s.label}
          </div>
        ))}
      </div>

      <form onSubmit={handleFinish} className="bg-surface-100/90 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base">Personal & Profile Information</h3>
            <Input
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Username / Handle"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<span className="text-xs text-gray-500">@</span>}
              required
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Los Angeles, CA or Remote"
              required
            />
            <Textarea
              label="Professional Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              helperText="Explain your storytelling approach, experience, and what makes your cuts stand out."
            />
            <div className="flex justify-end pt-4">
              <Button type="button" variant="primary" onClick={() => setStep(2)}>
                <span>Next: Skills & Tools</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-bold text-white text-base">Editing Specialties & Software</h3>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-200 block">
                Select Your Editing Specialties:
              </label>
              <div className="flex flex-wrap gap-2">
                {specialtiesList.map((spec) => {
                  const isSelected = selectedSpecialties.includes(spec);
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpecialty(spec)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-black border-amber-400 font-bold'
                          : 'bg-surface-50 border-surface-border text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {getSpecialtyLabel(spec)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-200 block">
                Software You Master:
              </label>
              <div className="flex flex-wrap gap-2">
                {softwareList.map((sw) => {
                  const isSelected = selectedSoftware.includes(sw);
                  return (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => toggleSoftware(sw)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500 font-bold'
                          : 'bg-surface-50 border-surface-border text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {getSoftwareLabel(sw)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Years of Experience"
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(Number(e.target.value))}
                min={1}
              />
              <Input
                label="Avg Turnaround (Days)"
                type="number"
                value={turnaroundDays}
                onChange={(e) => setTurnaroundDays(Number(e.target.value))}
                min={1}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Back</span>
              </Button>
              <Button type="button" variant="primary" onClick={() => setStep(3)}>
                <span>Next: Pricing & Launch</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="font-bold text-white text-base">Pricing & Payout Setup</h3>

            <div className="space-y-4">
              <Input
                label="Minimum Starting Rate ($ USD)"
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                min={50}
                helperText="Clients will see this as your baseline per-project quote."
              />

              <div className="bg-surface-50 p-4 rounded-xl border border-surface-border text-xs text-gray-300 space-y-2">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Your Profile is Ready!
                </h4>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  You will be directed to your Editor Command Center where you can upload portfolio sample videos, view incoming client requests, and deliver cuts with timestamped feedback.
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
                <span>Launch Editor Profile</span>
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
