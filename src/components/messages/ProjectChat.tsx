'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message, ProjectWithMembers } from '@/types';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { formatRelativeTime, cn } from '@/lib/utils';
import { Send, Paperclip, CheckCheck, MessageSquare, Sparkles } from 'lucide-react';

export function ProjectChat({ project, messages }: { project: ProjectWithMembers; messages: Message[] }) {
  const { sendMessage, currentUser } = useApp();
  const [inputText, setInputText] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachmentName) return;

    sendMessage(
      project.id,
      inputText.trim(),
      attachmentName ? '#' : undefined,
      attachmentName || undefined
    );

    setInputText('');
    setAttachmentName(null);
  };

  const simulateAttachFile = () => {
    const demoFiles = ['updated_script_v2.pdf', 'audio_feedback_note.mp3', 'color_lut_reference.cube'];
    const chosen = demoFiles[Math.floor(Math.random() * demoFiles.length)];
    setAttachmentName(chosen);
  };

  return (
    <div className="bg-surface-100/90 border border-surface-border rounded-2xl flex flex-col h-[650px] overflow-hidden shadow-xl">
      {/* Chat Header */}
      <div className="p-4 border-b border-surface-border bg-surface-200/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <Avatar src={project.client.avatarUrl} name={project.client.name} size="sm" />
            <Avatar src={project.editor.avatarUrl} name={project.editor.name} size="sm" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Project Discussion</h4>
            <p className="text-[11px] text-gray-400">
              Between {project.client.name} (Client) & {project.editor.name} (Editor)
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono">
          Direct Project Channel
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <MessageSquare className="w-8 h-8 text-gray-600 mx-auto" />
            <p className="text-xs font-semibold text-gray-300">Start the conversation</p>
            <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
              Discuss creative decisions, clarify script notes, and coordinate delivery deadlines.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUser?.id;

            return (
              <div
                key={msg.id}
                className={cn('flex items-end gap-2.5 max-w-[85%]', isMe ? 'ml-auto flex-row-reverse' : 'mr-auto')}
              >
                <Avatar src={msg.sender.avatarUrl} name={msg.sender.name} size="sm" className="w-7 h-7 mb-1" />

                <div className="space-y-1">
                  <div
                    className={cn(
                      'p-3.5 rounded-2xl text-xs leading-relaxed',
                      isMe
                        ? 'bg-amber-500 text-black font-medium rounded-br-xs shadow-md shadow-amber-500/10'
                        : 'bg-surface-50 border border-surface-border text-gray-200 rounded-bl-xs'
                    )}
                  >
                    {!isMe && (
                      <div className="text-[10px] font-bold text-amber-400 mb-1">
                        {msg.sender.name}
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {msg.attachmentName && (
                      <div
                        className={cn(
                          'mt-2.5 p-2 rounded-lg flex items-center gap-2 text-[11px] font-mono',
                          isMe ? 'bg-black/15 text-black' : 'bg-surface-100 text-amber-400 border border-surface-border'
                        )}
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                        <span className="truncate">{msg.attachmentName}</span>
                      </div>
                    )}
                  </div>

                  <div className={cn('flex items-center gap-1 text-[10px] text-gray-500 px-1', isMe && 'justify-end')}>
                    <span>{formatRelativeTime(msg.createdAt)}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-surface-200/90 border-t border-surface-border space-y-2">
        {attachmentName && (
          <div className="flex items-center justify-between bg-surface-50 border border-surface-border px-3 py-1.5 rounded-lg text-xs text-amber-400 font-mono">
            <div className="flex items-center gap-2">
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attached: {attachmentName}</span>
            </div>
            <button
              onClick={() => setAttachmentName(null)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={simulateAttachFile}
            className="p-2 rounded-lg bg-surface-50 hover:bg-surface-hover text-gray-400 hover:text-amber-400 border border-surface-border transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to your collaborator..."
            className="flex-1 bg-surface-50 border border-surface-border rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
          />

          <Button
            type="submit"
            size="sm"
            variant="primary"
            disabled={!inputText.trim() && !attachmentName}
            className="h-9 px-4 text-xs"
          >
            <Send className="w-3.5 h-3.5 mr-1" />
            <span>Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
