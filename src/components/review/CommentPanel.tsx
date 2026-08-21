'use client';

import React, { useState } from 'react';
import { Comment, CommentStatus } from '@/types';
import { CommentItem } from './CommentItem';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { formatTimestamp } from '@/lib/utils';
import {
  MessageSquare, Plus, Filter, Sparkles, Send,
  CheckCircle2, Clock, CheckSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentPanelProps {
  versionId: string;
  comments: Comment[];
  currentTime: number;
  selectedCommentId?: string | null;
  onSeekToTimestamp: (seconds: number) => void;
  isEditor: boolean;
}

export function CommentPanel({
  versionId,
  comments,
  currentTime,
  selectedCommentId,
  onSeekToTimestamp,
  isEditor,
}: CommentPanelProps) {
  const { addComment } = useApp();
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCount = comments.filter((c) => c.status !== 'resolved').length;
  const resolvedCount = comments.filter((c) => c.status === 'resolved').length;

  const filteredComments = comments
    .filter((c) => {
      if (filter === 'open') return c.status !== 'resolved';
      if (filter === 'resolved') return c.status === 'resolved';
      return true;
    })
    .sort((a, b) => a.timestampSeconds - b.timestampSeconds);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    addComment(versionId, newCommentText.trim(), currentTime);
    setNewCommentText('');
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full bg-surface-200/90 border border-surface-border rounded-2xl overflow-hidden shadow-xl">
      {/* Panel Header */}
      <div className="p-4 border-b border-surface-border bg-surface-100/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-white text-sm">Timestamped Feedback</h3>
            <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/20 font-mono">
              {comments.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-amber-400 font-mono font-medium">{openCount} Open</span>
            <span className="text-gray-600">•</span>
            <span className="text-emerald-400 font-mono font-medium">{resolvedCount} Resolved</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          {(['all', 'open', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1 text-xs rounded-lg transition-colors capitalize font-medium',
                filter === f
                  ? 'bg-surface-50 text-white border border-surface-border'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              )}
            >
              {f} ({f === 'all' ? comments.length : f === 'open' ? openCount : resolvedCount})
            </button>
          ))}
        </div>
      </div>

      {/* Add New Comment Box (Pre-linked to current timestamp) */}
      <div className="p-3.5 bg-surface-100/50 border-b border-surface-border">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-xs font-mono font-semibold">
              <Clock className="w-3 h-3" />
              At {formatTimestamp(currentTime)}
            </span>
            <span className="text-[11px] text-gray-400 hidden sm:inline">
              Press Enter to add note
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder='e.g. "Speed up transition", "Fix subtitle typo"...'
              className="flex-1 bg-surface-50 border border-surface-border text-white text-xs rounded-lg px-3 py-2 placeholder:text-gray-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50"
            />
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={!newCommentText.trim() || isSubmitting}
              className="h-8 px-3 text-xs"
            >
              <Send className="w-3 h-3 mr-1" />
              <span>Post</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
        {filteredComments.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-2">
            <CheckSquare className="w-8 h-8 text-gray-600 mx-auto stroke-[1.5]" />
            <p className="text-xs font-medium text-gray-300">
              {filter === 'open'
                ? 'All feedback is resolved! 🎉'
                : filter === 'resolved'
                ? 'No resolved feedback yet'
                : 'No comments on this version yet'}
            </p>
            <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
              Pause the video at any frame to leave precise, timestamped instructions.
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isSelected={selectedCommentId === comment.id}
              onSeekToTimestamp={onSeekToTimestamp}
            />
          ))
        )}
      </div>
    </div>
  );
}
