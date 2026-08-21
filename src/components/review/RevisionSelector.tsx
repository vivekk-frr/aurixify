'use client';

import React, { useState } from 'react';
import { VideoVersion, ProjectWithMembers } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import {
  History, Upload, CheckCircle2, AlertCircle,
  FileVideo, Plus, Sparkles, Check
} from 'lucide-react';
import { cn, formatRelativeTime } from '@/lib/utils';

interface RevisionSelectorProps {
  project: ProjectWithMembers;
  versions: VideoVersion[];
  selectedVersionId: string;
  onSelectVersion: (versionId: string) => void;
  isEditor: boolean;
}

export function RevisionSelector({
  project,
  versions,
  selectedVersionId,
  onSelectVersion,
  isEditor,
}: RevisionSelectorProps) {
  const { uploadVideoDraft, updateProjectStatus, comments } = useApp();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [isApproving, setIsApproving] = useState(false);

  const handleUploadNewDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const newDraft = uploadVideoDraft(
      project.id,
      draftTitle.trim() || `Draft ${versions.length + 1}`,
      videoUrlInput.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    );
    onSelectVersion(newDraft.id);
    setIsUploadModalOpen(false);
    setDraftTitle('');
    setVideoUrlInput('');
  };

  const handleApproveVersion = () => {
    setIsApproving(true);
    updateProjectStatus(project.id, 'approved');
    setTimeout(() => {
      setIsApproving(false);
    }, 500);
  };

  return (
    <div className="bg-surface-200/90 border border-surface-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Version Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mr-2 font-medium">
          <History className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Versions:</span>
        </div>

        {versions.map((ver) => {
          const isSelected = ver.id === selectedVersionId;
          const versionComments = comments.filter((c) => c.videoVersionId === ver.id);
          const openComments = versionComments.filter((c) => c.status !== 'resolved').length;

          return (
            <button
              key={ver.id}
              onClick={() => onSelectVersion(ver.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0',
                isSelected
                  ? 'bg-surface-50 text-white border-amber-500/50 shadow-sm'
                  : 'bg-surface-100/60 text-gray-400 border-surface-border hover:text-gray-200 hover:border-gray-600'
              )}
            >
              <FileVideo className={cn('w-3.5 h-3.5', isSelected ? 'text-amber-400' : 'text-gray-500')} />
              <span>{ver.title}</span>
              {versionComments.length > 0 && (
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded-full text-[10px] font-mono',
                    openComments > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  )}
                >
                  {openComments > 0 ? `${openComments} open` : '✓ clean'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Actions (Upload Revision for Editor, Approve Cut for Client) */}
      <div className="flex items-center gap-2">
        {isEditor ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsUploadModalOpen(true)}
            className="h-8 text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Draft</span>
          </Button>
        ) : (
          project.status !== 'approved' && project.status !== 'completed' && (
            <Button
              size="sm"
              variant="success"
              onClick={handleApproveVersion}
              isLoading={isApproving}
              className="h-8 text-xs font-semibold"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve Video Draft</span>
            </Button>
          )
        )}
      </div>

      {/* Upload Draft Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Video Draft / Revision"
        description="Deliver a new cut for your client to review with timestamped annotations."
      >
        <form onSubmit={handleUploadNewDraft} className="space-y-4 pt-2">
          <Input
            label="Draft Title / Version Label"
            placeholder={`Draft ${versions.length + 1} — Color Graded & Sound Mixed`}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
          />

          <Input
            label="Video URL (Cloud or MP4 Link)"
            placeholder="https://example.com/video.mp4 (or leave blank to use high-res demo cut)"
            value={videoUrlInput}
            onChange={(e) => setVideoUrlInput(e.target.value)}
            helperText="Supports direct MP4/WebM links, Supabase storage URLs, Frame.io links, etc."
          />

          <div className="p-3 bg-surface-50 border border-surface-border rounded-xl text-xs text-gray-300 space-y-1">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Revision Flow Tip:
            </p>
            <p className="text-gray-400">
              Uploading a new draft automatically updates project status to <strong>In Review</strong> and notifies your client.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              <Upload className="w-4 h-4 mr-1.5" />
              Upload Version {versions.length + 1}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
