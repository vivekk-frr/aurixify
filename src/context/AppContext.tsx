'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User, EditorProfile, ClientProfile, Project, VideoVersion,
  Comment, CommentReply, Message, Notification, Payment, Review,
  ProjectFile, Activity, EditorWithProfile, ProjectWithMembers,
  ProjectStatus, CommentStatus, VersionStatus
} from '@/types';
import {
  editors as seedEditors,
  clients as seedClients,
  editorProfiles as seedEditorProfiles,
  clientProfiles as seedClientProfiles,
  services as seedServices,
  portfolioItems as seedPortfolioItems,
  projects as seedProjects,
  videoVersions as seedVideoVersions,
  comments as seedComments,
  projectFiles as seedProjectFiles,
  messages as seedMessages,
  notifications as seedNotifications,
  payments as seedPayments,
  activities as seedActivities,
  reviews as seedReviews,
  getEditorWithProfile,
} from '@/data/seed';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchUser: (userId: string) => void;
  allUsers: User[];
  projects: Project[];
  videoVersions: VideoVersion[];
  comments: Comment[];
  messages: Message[];
  notifications: Notification[];
  projectFiles: ProjectFile[];
  payments: Payment[];
  activities: Activity[];
  reviews: Review[];
  
  // Actions
  createProject: (projectData: Partial<Project>, briefData: any, initialFiles?: File[]) => Project;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  uploadVideoDraft: (projectId: string, title: string, videoUrl: string, duration?: number) => VideoVersion;
  addComment: (videoVersionId: string, content: string, timestampSeconds: number, attachmentUrl?: string) => Comment;
  updateCommentStatus: (commentId: string, status: CommentStatus) => void;
  addCommentReply: (commentId: string, content: string) => CommentReply;
  sendMessage: (projectId: string, content: string, attachmentUrl?: string, attachmentName?: string) => Message;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  uploadProjectFile: (projectId: string, file: { name: string; size: number; fileType: string; category: any; url: string }) => ProjectFile;
  deleteProjectFile: (fileId: string) => void;
  processPayment: (projectId: string) => void;
  addReview: (projectId: string, rating: number, content: string) => void;
  updateEditorProfile: (profileData: Partial<EditorProfile>, userData: Partial<User>) => void;
  updateClientProfile: (profileData: Partial<ClientProfile>, userData: Partial<User>) => void;
  
  // Query Helpers
  getProjectById: (projectId: string) => ProjectWithMembers | null;
  getEditorById: (editorId: string) => EditorWithProfile | null;
  getUnreadNotificationsCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from local storage or seed
  const [currentUser, setCurrentUser] = useState<User | null>(() => seedClients[0]); // Default to Client Jordan
  const [allUsers, setAllUsers] = useState<User[]>([...seedEditors, ...seedClients]);
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [videoVersions, setVideoVersions] = useState<VideoVersion[]>(seedVideoVersions);
  const [comments, setComments] = useState<Comment[]>(seedComments);
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>(seedProjectFiles);
  const [payments, setPayments] = useState<Payment[]>(seedPayments);
  const [activities, setActivities] = useState<Activity[]>(seedActivities);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);

  // Switch active user demo persona
  const switchUser = (userId: string) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  // Create Project
  const createProject = (projectData: Partial<Project>, briefData: any, initialFiles: File[] = []): Project => {
    const newId = `proj-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      clientId: currentUser?.id || 'client-1',
      editorId: projectData.editorId || 'editor-1',
      name: projectData.name || 'New Video Project',
      description: projectData.description || '',
      videoType: projectData.videoType || 'youtube-video',
      platform: projectData.platform || 'youtube',
      deadline: projectData.deadline || new Date(Date.now() + 14 * 86400000).toISOString(),
      budget: projectData.budget || 500,
      numVideos: projectData.numVideos || 1,
      status: 'briefing',
      brief: {
        goal: briefData.goal || '',
        targetAudience: briefData.targetAudience || '',
        style: briefData.style || '',
        tone: briefData.tone || '',
        references: briefData.references || [],
        requiredElements: briefData.requiredElements || [],
        thingsToAvoid: briefData.thingsToAvoid || [],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects(prev => [newProject, ...prev]);

    // Add initial payment record
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      projectId: newId,
      amount: newProject.budget,
      platformFee: Math.round(newProject.budget * 0.1),
      editorEarnings: Math.round(newProject.budget * 0.9),
      status: 'unpaid',
      createdAt: new Date().toISOString(),
    };
    setPayments(prev => [...prev, newPayment]);

    // Create Notification for editor
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId: newProject.editorId,
      type: 'project-created',
      title: 'New Project Request',
      message: `${currentUser?.name || 'A client'} created project "${newProject.name}"`,
      projectId: newId,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Add activity
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      projectId: newId,
      userId: currentUser?.id || 'client-1',
      user: currentUser || seedClients[0],
      type: 'status-changed',
      description: `${currentUser?.name || 'Client'} created project "${newProject.name}"`,
      createdAt: new Date().toISOString(),
    };
    setActivities(prev => [newAct, ...prev]);

    return newProject;
  };

  // Update Project Status
  const updateProjectStatus = (projectId: string, status: ProjectStatus) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status, updatedAt: new Date().toISOString() } : p));
    
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    // Send notifications to counterpart
    const targetUserId = currentUser?.id === proj.editorId ? proj.clientId : proj.editorId;
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId: targetUserId,
      type: 'status-changed',
      title: 'Project Status Updated',
      message: `Project "${proj.name}" status changed to ${status.replace('-', ' ').toUpperCase()}`,
      projectId,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Add activity
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      projectId,
      userId: currentUser?.id || 'editor-1',
      user: currentUser || seedEditors[0],
      type: 'status-changed',
      description: `${currentUser?.name || 'User'} marked project as ${status.replace('-', ' ')}`,
      createdAt: new Date().toISOString(),
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Upload Video Draft
  const uploadVideoDraft = (projectId: string, title: string, videoUrl: string, duration: number = 600): VideoVersion => {
    const existingForProj = videoVersions.filter(v => v.projectId === projectId);
    const versionNumber = existingForProj.length + 1;
    
    const newDraft: VideoVersion = {
      id: `vv-${Date.now()}`,
      projectId,
      versionNumber,
      title: title || `Draft ${versionNumber}`,
      videoUrl: videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: `/thumbnails/draft-${versionNumber}.jpg`,
      status: 'in-review',
      uploadedAt: new Date().toISOString(),
      duration,
    };

    setVideoVersions(prev => [...prev, newDraft]);
    
    // Automatically advance project status to review if it was in-progress
    updateProjectStatus(projectId, 'review');

    // Notify client
    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        userId: proj.clientId,
        type: 'draft-uploaded',
        title: 'New Video Draft Uploaded',
        message: `${currentUser?.name || 'Editor'} uploaded ${newDraft.title} for "${proj.name}"`,
        projectId,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications(prev => [newNotif, ...prev]);

      const newAct: Activity = {
        id: `act-${Date.now()}`,
        projectId,
        userId: currentUser?.id || 'editor-1',
        user: currentUser || seedEditors[0],
        type: 'draft-uploaded',
        description: `${currentUser?.name || 'Editor'} uploaded ${newDraft.title}`,
        createdAt: new Date().toISOString(),
      };
      setActivities(prev => [newAct, ...prev]);
    }

    return newDraft;
  };

  // Add Timestamped Comment
  const addComment = (videoVersionId: string, content: string, timestampSeconds: number, attachmentUrl?: string): Comment => {
    const newComment: Comment = {
      id: `cmt-${Date.now()}`,
      videoVersionId,
      userId: currentUser?.id || 'client-1',
      user: currentUser || seedClients[0],
      content,
      timestampSeconds: Math.round(timestampSeconds),
      status: 'open',
      attachmentUrl: attachmentUrl || null,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments(prev => [...prev, newComment]);

    // Find version and project for notification
    const version = videoVersions.find(v => v.id === videoVersionId);
    if (version) {
      const proj = projects.find(p => p.id === version.projectId);
      if (proj) {
        const targetUserId = currentUser?.id === proj.editorId ? proj.clientId : proj.editorId;
        const newNotif: Notification = {
          id: `notif-${Date.now()}`,
          userId: targetUserId,
          type: 'feedback-added',
          title: 'New Timestamped Feedback',
          message: `${currentUser?.name || 'Client'} commented at ${Math.floor(timestampSeconds/60)}:${Math.floor(timestampSeconds%60).toString().padStart(2, '0')} on ${version.title}`,
          projectId: proj.id,
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    }

    return newComment;
  };

  // Update Comment Status (Resolved, Open, In Progress)
  const updateCommentStatus = (commentId: string, status: CommentStatus) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, status } : c));
  };

  // Add Comment Reply
  const addCommentReply = (commentId: string, content: string): CommentReply => {
    const newReply: CommentReply = {
      id: `reply-${Date.now()}`,
      commentId,
      userId: currentUser?.id || 'editor-1',
      user: currentUser || seedEditors[0],
      content,
      createdAt: new Date().toISOString(),
    };

    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
        };
      }
      return c;
    }));

    return newReply;
  };

  // Send Message
  const sendMessage = (projectId: string, content: string, attachmentUrl?: string, attachmentName?: string): Message => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      projectId,
      senderId: currentUser?.id || 'user-1',
      sender: currentUser || seedClients[0],
      content,
      attachmentUrl: attachmentUrl || null,
      attachmentName: attachmentName || null,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMsg]);

    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      const targetUserId = currentUser?.id === proj.editorId ? proj.clientId : proj.editorId;
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        userId: targetUserId,
        type: 'new-message',
        title: 'New Message',
        message: `${currentUser?.name || 'Someone'}: ${content.slice(0, 40)}...`,
        projectId,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    return newMsg;
  };

  // Notifications
  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => n.userId === currentUser?.id ? { ...n, isRead: true } : n));
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter(n => n.userId === currentUser?.id && !n.isRead).length;
  };

  // Files
  const uploadProjectFile = (projectId: string, file: { name: string; size: number; fileType: string; category: any; url: string }) => {
    const newFile: ProjectFile = {
      id: `file-${Date.now()}`,
      projectId,
      uploadedBy: currentUser?.id || 'user-1',
      name: file.name,
      fileType: file.fileType,
      size: file.size,
      url: file.url || '#',
      category: file.category || 'other',
      createdAt: new Date().toISOString(),
    };

    setProjectFiles(prev => [newFile, ...prev]);
    return newFile;
  };

  const deleteProjectFile = (fileId: string) => {
    setProjectFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Process Payment
  const processPayment = (projectId: string) => {
    setPayments(prev => prev.map(p => p.projectId === projectId ? { ...p, status: 'paid' } : p));
    updateProjectStatus(projectId, 'completed');
  };

  // Add Review
  const addReview = (projectId: string, rating: number, content: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      projectId,
      clientId: proj.clientId,
      editorId: proj.editorId,
      client: currentUser || seedClients[0],
      rating,
      content,
      createdAt: new Date().toISOString(),
    };

    setReviews(prev => [newReview, ...prev]);
  };

  // Update Profiles
  const updateEditorProfile = (profileData: Partial<EditorProfile>, userData: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const updateClientProfile = (profileData: Partial<ClientProfile>, userData: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...userData } : null);
  };

  // Queries
  const getProjectById = (projectId: string): ProjectWithMembers | null => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return null;
    const client = allUsers.find(u => u.id === project.clientId) || seedClients[0];
    const editor = allUsers.find(u => u.id === project.editorId) || seedEditors[0];
    const versions = videoVersions.filter(v => v.projectId === projectId);
    const files = projectFiles.filter(f => f.projectId === projectId);
    const projPayments = payments.filter(p => p.projectId === projectId);

    return {
      ...project,
      client,
      editor,
      versions,
      files,
      payments: projPayments,
    };
  };

  const getEditorById = (editorId: string): EditorWithProfile | null => {
    return getEditorWithProfile(editorId);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUser,
        allUsers,
        projects,
        videoVersions,
        comments,
        messages,
        notifications,
        projectFiles,
        payments,
        activities,
        reviews,
        createProject,
        updateProjectStatus,
        uploadVideoDraft,
        addComment,
        updateCommentStatus,
        addCommentReply,
        sendMessage,
        markNotificationRead,
        markAllNotificationsRead,
        uploadProjectFile,
        deleteProjectFile,
        processPayment,
        addReview,
        updateEditorProfile,
        updateClientProfile,
        getProjectById,
        getEditorById,
        getUnreadNotificationsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
