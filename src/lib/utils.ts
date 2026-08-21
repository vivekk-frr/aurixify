import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function daysUntil(dateString: string): number {
  const now = new Date();
  const target = new Date(dateString);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'briefing': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'review': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'revision': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'approved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'completed': 'bg-green-500/10 text-green-400 border-green-500/20',
    'open': 'bg-red-500/10 text-red-400 border-red-500/20',
    'in-progress-comment': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'resolved': 'bg-green-500/10 text-green-400 border-green-500/20',
    'available': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'busy': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'unavailable': 'bg-red-500/10 text-red-400 border-red-500/20',
    'unpaid': 'bg-red-500/10 text-red-400 border-red-500/20',
    'pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'paid': 'bg-green-500/10 text-green-400 border-green-500/20',
    'refunded': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'draft': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'in-review': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'revision-requested': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };
  return colors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
}

export function getSpecialtyLabel(specialty: string): string {
  const labels: Record<string, string> = {
    'youtube': 'YouTube',
    'shorts-reels': 'Shorts & Reels',
    'tiktok': 'TikTok',
    'podcast': 'Podcast',
    'motion-graphics': 'Motion Graphics',
    'gaming': 'Gaming',
    'commercials': 'Commercials',
    'documentary': 'Documentary',
    'music-video': 'Music Video',
    'wedding': 'Wedding',
    'corporate': 'Corporate',
    'social-media': 'Social Media',
  };
  return labels[specialty] || specialty;
}

export function getSoftwareLabel(software: string): string {
  const labels: Record<string, string> = {
    'premiere-pro': 'Premiere Pro',
    'final-cut': 'Final Cut Pro',
    'davinci-resolve': 'DaVinci Resolve',
    'after-effects': 'After Effects',
    'capcut': 'CapCut',
    'avid': 'Avid',
    'vegas-pro': 'Vegas Pro',
    'blender': 'Blender',
  };
  return labels[software] || software;
}
