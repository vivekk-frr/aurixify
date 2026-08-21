'use client';

import React, { useState } from 'react';
import { Comment, CommentStatus } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { formatTimestamp, formatRelativeTime, cn } from '@/lib/utils';
import {
  Play, CheckCircle2, Clock, RotateCcw, MessageSquare,
  Send, CornerDownRight, Sparkles, Check, ChevronDown
} from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
  isSelected?: boolean;
  onSeekToTimestamp: (seconds: number) => void;
}

export function CommentItem({
  comment,
  isSelected = false,
  onSeekToTimestamp,
}: CommentItemProps) {
  const { updateCommentStatus, addCommentReply, currentUser } = useApp();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const handleStatusChange = (newStatus: CommentStatus) => {
    updateCommentStatus(comment.id, newStatus);
    setStatusMenuOpen(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addCommentReply(comment.id, replyText.trim());
    setReplyText('');
    setIsReplying(false);
  };

  const statusConfig = {
    'open': { label: 'Open', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    'in-progress': { label: 'In Progress', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    'resolved': { label: 'Resolved', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  };

  const isResolved = comment.status === 'resolved';

  return (
    <div
      id={`comment-${comment.id}`}
      className={cn(
        'group rounded-xl p-3.5 border transition-all space-y-3',
        isSelected
          ? 'bg-surface-50 border-amber-500/50 shadow-lg shadow-amber-500/5'
          : isResolved
          ? 'bg-surface-200/40 border-surface-border/60 opacity-80'
          : 'bg-surface-100/90 border-surface-border hover:border-surface-border/80'
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Avatar src={comment.user.avatarUrl} name={comment.user.name} size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white">{comment.user.name}</span>
              <span className="text-[10px] text-gray-500 uppercase font-mono">
                {comment.user.role}
              </span>
            </div>
            <span className="text-[10px] text-gray-500">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
        </div>

        {/* Status Dropdown / Quick Toggle */}
        <div className="relative">
          <button
            onClick={() => setStatusMenuOpen(!statusMenuOpen)}
            className={cn(
              'flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors',
              statusConfig[comment.status].color
            )}
          >
            {isResolved ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            ) : (
              <Clock className="w-3 h-3 text-amber-400" />
            )}
            <span>{statusConfig[comment.status].label}</span>
            <ChevronDown className="w-2.5 h-2.5 opacity-60" />
          </button>

          {statusMenuOpen && (
            <div className="absolute right-0 mt-1 w-32 glass-dropdown rounded-lg shadow-xl p-1 z-30 animate-in fade-in zoom-in-95">
              {(['open', 'in-progress', 'resolved'] as CommentStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={cn(
                    'w-full text-left px-2 py-1 text-[11px] rounded flex items-center justify-between hover:bg-white/5 transition-colors',
                    comment.status === st ? 'text-amber-400 font-semibold' : 'text-gray-300'
                  )}
                >
                  <span className="capitalize">{st.replace('-', ' ')}</span>
                  {comment.status === st && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Comment Body + Clickable Timestamp Seek Pill */}
      <div className="space-y-2 pl-9">
        <button
          onClick={() => onSeekToTimestamp(comment.timestampSeconds)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 font-mono text-xs font-semibold border border-amber-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{formatTimestamp(comment.timestampSeconds)}</span>
        </button>

        <p className={cn('text-xs text-gray-200 leading-relaxed', isResolved && 'line-through text-gray-400')}>
          {comment.content}
        </p>

        {comment.attachmentUrl && (
          <div className="mt-2 rounded-lg overflow-hidden border border-surface-border max-w-[200px]">
            <img src={comment.attachmentUrl} alt="Attachment" className="w-full h-auto object-cover" />
          </div>
        )}
      </div>

      {/* Threaded Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-9 space-y-2 pt-2 border-t border-surface-border/40">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex items-start gap-2 bg-surface-200/50 p-2.5 rounded-lg border border-surface-border/50 text-xs">
              <CornerDownRight className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
              <Avatar src={reply.user.avatarUrl} name={reply.user.name} size="sm" className="w-5 h-5 text-[9px]" />
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-[11px]">{reply.user.name}</span>
                  <span className="text-[9px] text-gray-500">{formatRelativeTime(reply.createdAt)}</span>
                </div>
                <p className="text-gray-300 text-xs leading-snug">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Action Form */}
      <div className="pl-9 pt-1 flex items-center justify-between">
        {!isReplying ? (
          <button
            onClick={() => setIsReplying(true)}
            className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-amber-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Reply to thread</span>
          </button>
        ) : (
          <form onSubmit={handleSendReply} className="w-full flex items-center gap-2 mt-1">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              autoFocus
              className="flex-1 bg-surface-200 border border-surface-border rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/80"
            />
            <Button size="sm" variant="primary" type="submit" className="h-7 px-2 text-xs">
              <Send className="w-3 h-3" />
            </Button>
            <button
              type="button"
              onClick={() => {
                setIsReplying(false);
                setReplyText('');
              }}
              className="text-[11px] text-gray-400 hover:text-white px-1"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
