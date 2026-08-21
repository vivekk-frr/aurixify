'use client';

import React, { useState } from 'react';
import { ProjectFile, FileCategory } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import {
  FolderOpen, FileVideo, FileImage, FileAudio, FileText,
  FileBox, Upload, Download, Trash2, Plus, Sparkles
} from 'lucide-react';
import { formatFileSize, formatRelativeTime, cn } from '@/lib/utils';

export function FileManager({
  projectId,
  files,
  canUpload = true,
}: {
  projectId: string;
  files: ProjectFile[];
  canUpload?: boolean;
}) {
  const { uploadProjectFile, deleteProjectFile, allUsers } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState<FileCategory>('video');
  const [fileUrl, setFileUrl] = useState('');

  const categories: { key: string; label: string; icon: any }[] = [
    { key: 'all', label: 'All Files', icon: FolderOpen },
    { key: 'video', label: 'Raw Footage & Videos', icon: FileVideo },
    { key: 'image', label: 'Thumbnails & Graphics', icon: FileImage },
    { key: 'audio', label: 'Audio & Music', icon: FileAudio },
    { key: 'document', label: 'Briefs & Scripts', icon: FileText },
    { key: 'other', label: 'Archives & Assets', icon: FileBox },
  ];

  const filteredFiles = files.filter((f) => {
    if (selectedCategory === 'all') return true;
    return f.category === selectedCategory;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    uploadProjectFile(projectId, {
      name: fileName.trim(),
      fileType: fileCategory === 'video' ? 'video/mp4' : fileCategory === 'image' ? 'image/png' : 'application/octet-stream',
      size: Math.floor(Math.random() * 50000000) + 1000000, // random demo file size
      category: fileCategory,
      url: fileUrl.trim() || '#',
    });

    setFileName('');
    setFileUrl('');
    setIsUploadOpen(false);
  };

  const getFileIcon = (cat: FileCategory) => {
    switch (cat) {
      case 'video':
        return <FileVideo className="w-5 h-5 text-amber-400" />;
      case 'image':
        return <FileImage className="w-5 h-5 text-purple-400" />;
      case 'audio':
        return <FileAudio className="w-5 h-5 text-blue-400" />;
      case 'document':
        return <FileText className="w-5 h-5 text-emerald-400" />;
      default:
        return <FileBox className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-surface-100 p-1.5 rounded-xl border border-surface-border">
          {categories.map((c) => {
            const Icon = c.icon;
            const count = c.key === 'all' ? files.length : files.filter((f) => f.category === c.key).length;
            const isActive = selectedCategory === c.key;

            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-all',
                  isActive
                    ? 'bg-surface-50 text-amber-400 font-semibold border border-surface-border shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
                <span className="text-[10px] text-gray-500 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {canUpload && (
          <Button size="sm" variant="primary" onClick={() => setIsUploadOpen(true)}>
            <Upload className="w-4 h-4 mr-1.5" />
            <span>Upload Asset / Footage</span>
          </Button>
        )}
      </div>

      {/* Files Table / List */}
      <div className="bg-surface-100/90 border border-surface-border rounded-2xl overflow-hidden shadow-xl">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-16 px-4">
            <FolderOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-white">No files in this category</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              Upload raw footage, graphics, audio stems, or fonts to share with your collaborator.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-surface-border">
            {filteredFiles.map((file) => {
              const uploader = allUsers.find((u) => u.id === file.uploadedBy);

              return (
                <div
                  key={file.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-surface-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-surface-50 border border-surface-border flex items-center justify-center shrink-0">
                      {getFileIcon(file.category)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate hover:text-amber-400 cursor-pointer">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span className="font-mono">{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>Uploaded by {uploader?.name || 'User'}</span>
                        <span>•</span>
                        <span>{formatRelativeTime(file.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={file.url}
                      download
                      className="p-2 rounded-lg bg-surface-50 hover:bg-surface-hover text-gray-300 hover:text-white border border-surface-border transition-colors"
                      title="Download file"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => deleteProjectFile(file.id)}
                      className="p-2 rounded-lg bg-surface-50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-surface-border transition-colors"
                      title="Delete file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Project Assets"
        description="Share footage, references, logos, audio tracks, or documents with your collaborator."
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 pt-2">
          <Input
            label="File Name / Label"
            placeholder="e.g. b-roll_tech_shot_04.mp4, brand_guidelines.pdf"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300 block">Category</label>
            <select
              value={fileCategory}
              onChange={(e) => setFileCategory(e.target.value as FileCategory)}
              className="w-full bg-surface-50 border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="video">Raw Footage / Video</option>
              <option value="image">Image / Graphic / Logo</option>
              <option value="audio">Audio / Music / SFX</option>
              <option value="document">Document / Brief / Script</option>
              <option value="other">Archive / Other Asset</option>
            </select>
          </div>

          <Input
            label="Storage or Cloud Drive Link (Optional)"
            placeholder="https://drive.google.com/... or leave blank for direct attach"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" variant="ghost" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              <Upload className="w-4 h-4 mr-1" />
              Upload Asset
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
