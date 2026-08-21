'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tabs } from '@/components/ui/Tabs';

// Subcomponents
import { VideoPlayer } from '@/components/review/VideoPlayer';
import { CommentPanel } from '@/components/review/CommentPanel';
import { RevisionSelector } from '@/components/review/RevisionSelector';
import { FileManager } from '@/components/files/FileManager';
import { ProjectChat } from '@/components/messages/ProjectChat';
import { PaymentBreakdown } from '@/components/payments/PaymentBreakdown';
import { ProjectBriefView } from '@/components/projects/ProjectBriefView';

import {
  LayoutDashboard, Play, FolderOpen, MessageSquare,
  CreditCard, Clock, Calendar, CheckCircle2, AlertCircle,
  FileVideo, ArrowRight, Sparkles, ChevronRight, User, Shield
} from 'lucide-react';
import { formatCurrency, formatDate, daysUntil, formatRelativeTime, cn } from '@/lib/utils';
import { ProjectStatus } from '@/types';

export default function ProjectWorkspacePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params.id as string;

  const {
    getProjectById,
    currentUser,
    updateProjectStatus,
    comments: allComments,
    messages: allMessages,
    activities: allActivities,
  } = useApp();

  const project = getProjectById(projectId) || getProjectById('proj-1');

  // Active Tab
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Video Review State
  const versions = project?.versions || [];
  const [selectedVersionId, setSelectedVersionId] = useState<string>(
    versions[versions.length - 1]?.id || 'vv-1'
  );
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Project Not Found</h2>
        <Link href="/projects">
          <Button variant="primary">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const isEditor = currentUser?.id === project.editorId;
  const isClient = currentUser?.id === project.clientId;

  const currentVersion = versions.find((v) => v.id === selectedVersionId) || versions[0];
  const versionComments = allComments.filter((c) => c.videoVersionId === currentVersion?.id);
  const projectMessages = allMessages.filter((m) => m.projectId === project.id);
  const projectActivities = allActivities.filter((a) => a.projectId === project.id);

  const daysLeft = daysUntil(project.deadline);

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleSelectComment = (commentId: string) => {
    setSelectedCommentId(commentId);
  };

  const workspaceTabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'review',
      label: 'Video Review',
      count: versionComments.filter((c) => c.status !== 'resolved').length,
      icon: <Play className="w-4 h-4 text-amber-400" />,
    },
    { id: 'files', label: 'Files & Assets', count: project.files.length, icon: <FolderOpen className="w-4 h-4" /> },
    { id: 'messages', label: 'Discussion', count: projectMessages.length, icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'payments', label: 'Billing & Escrow', icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* ============================================================ */}
      {/* PROJECT HEADER & STATUS BAR */}
      {/* ============================================================ */}
      <section className="bg-surface-200/95 border-b border-surface-border pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Top Bar: Breadcrumb + Project Title + Status Progression */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-amber-400 font-mono">{project.videoType.replace('-', ' ')}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-gray-300">{project.platform}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.name}
                </h1>
                <StatusBadge status={project.status} />
              </div>
            </div>

            {/* Quick Status Control Dropdown (Simulating Editor/Client advancing project lifecycle) */}
            <div className="flex items-center gap-3 bg-surface-100 p-2 rounded-xl border border-surface-border text-xs">
              <span className="text-gray-400 font-medium pl-1">Lifecycle Stage:</span>
              <select
                value={project.status}
                onChange={(e) => updateProjectStatus(project.id, e.target.value as ProjectStatus)}
                className="bg-surface-50 border border-surface-border text-amber-400 font-semibold rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="briefing">1. Briefing</option>
                <option value="in-progress">2. In Progress (Editing)</option>
                <option value="review">3. Client Review</option>
                <option value="revision">4. Revision Requested</option>
                <option value="approved">5. Approved</option>
                <option value="completed">6. Completed & Paid</option>
              </select>
            </div>
          </div>

          {/* Collaborator details, budget, and countdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-100/70 p-3.5 rounded-2xl border border-surface-border/70 text-xs">
            <div className="flex items-center gap-2.5">
              <Avatar src={project.client.avatarUrl} name={project.client.name} size="sm" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-mono">Client</span>
                <span className="font-semibold text-white">{project.client.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Avatar src={project.editor.avatarUrl} name={project.editor.name} size="sm" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-mono">Editor</span>
                <span className="font-semibold text-white">{project.editor.name}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-mono">Target Deadline</span>
              <span className="font-semibold text-gray-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {formatDate(project.deadline)} ({daysLeft < 0 ? 'Past Due' : `${daysLeft}d left`})
              </span>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-mono">Escrow Budget</span>
              <span className="font-bold text-amber-400 font-mono text-sm">
                {formatCurrency(project.budget)}
              </span>
            </div>
          </div>

          {/* Workflow Progress Tracker */}
          <ProgressBar status={project.status} showLabels />

          {/* Navigation Tabs */}
          <Tabs
            tabs={workspaceTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/* TAB CONTENT AREA */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* TAB 1: OVERVIEW */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col (2 cols): Latest Draft Callout + Creative Brief */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Cut Quick Review Banner */}
              {currentVersion && (
                <div className="bg-gradient-to-br from-surface-100 to-surface-200 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-400 font-mono uppercase font-bold">
                          Latest Video Cut Available
                        </span>
                        <h3 className="font-bold text-base text-white">{currentVersion.title}</h3>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setActiveTab('review')}
                      className="font-bold shadow-lg shadow-amber-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-current mr-1.5" />
                      <span>Open Timestamped Review ({versionComments.length} notes)</span>
                    </Button>
                  </div>

                  <p className="text-xs text-gray-300">
                    Uploaded {formatRelativeTime(currentVersion.uploadedAt)} by {project.editor.name}.
                    Leave exact frame comments or approve the master cut.
                  </p>
                </div>
              )}

              {/* Creative Brief */}
              <ProjectBriefView brief={project.brief} />
            </div>

            {/* Right Col (1 col): Recent Activity Feed & Quick Actions */}
            <div className="space-y-6">
              {/* Activity Feed */}
              <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Project Activity Stream</h3>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {projectActivities.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-6">No activity recorded yet</p>
                  ) : (
                    projectActivities.map((act) => (
                      <div key={act.id} className="text-xs space-y-1 bg-surface-50 p-2.5 rounded-xl border border-surface-border/60">
                        <div className="flex justify-between text-[10px] text-gray-400">
                          <span className="font-semibold text-gray-200">{act.user.name}</span>
                          <span>{formatRelativeTime(act.createdAt)}</span>
                        </div>
                        <p className="text-gray-300 text-[11px] leading-snug">{act.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Files Widget */}
              <div className="bg-surface-100/90 border border-surface-border rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-blue-400" />
                    Files ({project.files.length})
                  </h3>
                  <button
                    onClick={() => setActiveTab('files')}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-2">
                  {project.files.slice(0, 3).map((f) => (
                    <div key={f.id} className="flex justify-between items-center bg-surface-50 p-2 rounded-lg text-xs">
                      <span className="text-gray-300 truncate max-w-[180px]">{f.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{f.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: VIDEO REVIEW (⭐ Primary Core Feature) */}
        {/* ============================================================ */}
        {activeTab === 'review' && (
          <div className="space-y-6">
            {/* Version Revision Bar */}
            <RevisionSelector
              project={project}
              versions={versions}
              selectedVersionId={selectedVersionId}
              onSelectVersion={setSelectedVersionId}
              isEditor={isEditor}
            />

            {/* Video Review Interface (Left: Player, Right: Comments Panel) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left 2 Cols: Player */}
              <div className="lg:col-span-2 space-y-4">
                <VideoPlayer
                  videoUrl={currentVersion?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  comments={versionComments}
                  currentTime={currentTime}
                  onTimeUpdate={setCurrentTime}
                  onSeek={handleSeek}
                  onAddCommentAtCurrentTime={() => {
                    // Handled inside CommentPanel
                  }}
                  onSelectComment={handleSelectComment}
                />

                {/* Instructions Hint */}
                <div className="bg-surface-100/60 p-3 rounded-xl border border-surface-border text-xs text-gray-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <strong>Pro-tip:</strong> Pause anywhere to pin a note. Click any comment or timeline marker to jump to that moment.
                  </span>
                  <span className="text-amber-400 font-mono font-medium">
                    {versionComments.filter(c => c.status === 'resolved').length}/{versionComments.length} Resolved
                  </span>
                </div>
              </div>

              {/* Right 1 Col: Timestamped Comment & Feedback Panel */}
              <div className="lg:col-span-1 h-[620px]">
                <CommentPanel
                  versionId={currentVersion?.id || 'vv-1'}
                  comments={versionComments}
                  currentTime={currentTime}
                  selectedCommentId={selectedCommentId}
                  onSeekToTimestamp={handleSeek}
                  isEditor={isEditor}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: FILES */}
        {/* ============================================================ */}
        {activeTab === 'files' && (
          <FileManager projectId={project.id} files={project.files} />
        )}

        {/* ============================================================ */}
        {/* TAB 4: MESSAGES */}
        {/* ============================================================ */}
        {activeTab === 'messages' && (
          <ProjectChat project={project} messages={projectMessages} />
        )}

        {/* ============================================================ */}
        {/* TAB 5: BILLING & ESCROW */}
        {/* ============================================================ */}
        {activeTab === 'payments' && (
          <PaymentBreakdown project={project} />
        )}
      </div>
    </div>
  );
}
