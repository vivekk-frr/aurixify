// ============================================================
// Aurixify — Core Type Definitions
// ============================================================

// --- User & Auth ---

export type UserRole = 'editor' | 'client';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  username: string;
  avatarUrl: string;
  location: string;
  bio: string;
  createdAt: string;
  onboardingComplete: boolean;
}

// --- Editor ---

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable';

export type EditorSpecialty =
  | 'youtube'
  | 'shorts-reels'
  | 'tiktok'
  | 'podcast'
  | 'motion-graphics'
  | 'gaming'
  | 'commercials'
  | 'documentary'
  | 'music-video'
  | 'wedding'
  | 'corporate'
  | 'social-media';

export type EditingSoftware =
  | 'premiere-pro'
  | 'final-cut'
  | 'davinci-resolve'
  | 'after-effects'
  | 'capcut'
  | 'avid'
  | 'vegas-pro'
  | 'blender';

export interface EditorProfile {
  id: string;
  userId: string;
  specialties: EditorSpecialty[];
  yearsExperience: number;
  software: EditingSoftware[];
  languages: string[];
  turnaroundDays: number;
  startingPrice: number;
  hourlyRate: number | null;
  perVideoPrice: number | null;
  customQuote: boolean;
  availabilityStatus: AvailabilityStatus;
  completedProjectsCount: number;
  avgRating: number;
  totalReviews: number;
}

export interface Service {
  id: string;
  editorProfileId: string;
  name: string;
  description: string;
  startingPrice: number;
  estimatedDays: number;
  category: EditorSpecialty;
}

export interface PortfolioItem {
  id: string;
  editorProfileId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: EditorSpecialty;
  softwareUsed: EditingSoftware[];
}

// Combined type for editor display
export interface EditorWithProfile extends User {
  editorProfile: EditorProfile;
  services: Service[];
  portfolio: PortfolioItem[];
  reviews: Review[];
}

// --- Client ---

export interface ClientProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  website: string;
  socialLinks: string[];
  description: string;
}

export interface ClientWithProfile extends User {
  clientProfile: ClientProfile;
}

// --- Project ---

export type ProjectStatus =
  | 'briefing'
  | 'in-progress'
  | 'review'
  | 'revision'
  | 'approved'
  | 'completed';

export type VideoType =
  | 'youtube-video'
  | 'youtube-short'
  | 'instagram-reel'
  | 'tiktok'
  | 'podcast'
  | 'commercial'
  | 'documentary'
  | 'music-video'
  | 'corporate'
  | 'wedding'
  | 'other';

export type Platform =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'vimeo'
  | 'website'
  | 'other';

export interface ProjectBrief {
  goal: string;
  targetAudience: string;
  style: string;
  tone: string;
  references: string[];
  requiredElements: string[];
  thingsToAvoid: string[];
}

export interface Project {
  id: string;
  clientId: string;
  editorId: string;
  name: string;
  description: string;
  videoType: VideoType;
  platform: Platform;
  deadline: string;
  budget: number;
  numVideos: number;
  status: ProjectStatus;
  brief: ProjectBrief;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithMembers extends Project {
  client: User;
  editor: User;
  versions: VideoVersion[];
  files: ProjectFile[];
  payments: Payment[];
}

// --- Files ---

export type FileCategory = 'video' | 'image' | 'audio' | 'document' | 'other';

export interface ProjectFile {
  id: string;
  projectId: string;
  uploadedBy: string;
  name: string;
  fileType: string;
  size: number;
  url: string;
  category: FileCategory;
  createdAt: string;
}

// --- Video Versions / Drafts ---

export type VersionStatus = 'draft' | 'in-review' | 'revision-requested' | 'approved';

export interface VideoVersion {
  id: string;
  projectId: string;
  versionNumber: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  status: VersionStatus;
  uploadedAt: string;
  duration: number; // seconds
}

// --- Comments (Timestamped Feedback) ---

export type CommentStatus = 'open' | 'in-progress' | 'resolved';

export interface Comment {
  id: string;
  videoVersionId: string;
  userId: string;
  user: User;
  content: string;
  timestampSeconds: number;
  status: CommentStatus;
  attachmentUrl: string | null;
  createdAt: string;
  replies: CommentReply[];
}

export interface CommentReply {
  id: string;
  commentId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
}

// --- Messages ---

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  sender: User;
  content: string;
  attachmentUrl: string | null;
  attachmentName: string | null;
  isRead: boolean;
  createdAt: string;
}

// --- Notifications ---

export type NotificationType =
  | 'project-created'
  | 'new-message'
  | 'draft-uploaded'
  | 'feedback-added'
  | 'feedback-resolved'
  | 'project-approved'
  | 'payment-received'
  | 'deadline-approaching'
  | 'status-changed';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  projectId: string | null;
  isRead: boolean;
  createdAt: string;
}

// --- Payments ---

export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'refunded';

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  platformFee: number;
  editorEarnings: number;
  status: PaymentStatus;
  createdAt: string;
}

// --- Reviews ---

export interface Review {
  id: string;
  projectId: string;
  clientId: string;
  editorId: string;
  client: User;
  rating: number;
  content: string;
  createdAt: string;
}

// --- Activity ---

export type ActivityType =
  | 'draft-uploaded'
  | 'comment-added'
  | 'comment-resolved'
  | 'status-changed'
  | 'file-uploaded'
  | 'payment-made'
  | 'project-approved'
  | 'message-sent';

export interface Activity {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  type: ActivityType;
  description: string;
  createdAt: string;
}
