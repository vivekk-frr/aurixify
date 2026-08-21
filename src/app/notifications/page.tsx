'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import {
  Bell, CheckCheck, MessageSquare, Video, Clock,
  CheckCircle2, DollarSign, Sparkles, ArrowRight
} from 'lucide-react';
import { formatRelativeTime, cn } from '@/lib/utils';

export default function NotificationsPage() {
  const {
    notifications,
    currentUser,
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadNotificationsCount,
  } = useApp();

  const userNotifications = notifications.filter((n) => n.userId === currentUser?.id);
  const unreadCount = getUnreadNotificationsCount();

  const getIcon = (type: string) => {
    if (type.includes('feedback')) return <MessageSquare className="w-5 h-5 text-amber-400" />;
    if (type.includes('draft')) return <Video className="w-5 h-5 text-purple-400" />;
    if (type.includes('payment')) return <DollarSign className="w-5 h-5 text-emerald-400" />;
    if (type.includes('approved')) return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    return <Clock className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-2 bg-surface-100 border border-amber-500/30 px-3 py-1 rounded-full text-xs text-amber-400 font-medium mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity Feed</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Notifications & Alerts</h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time updates on video cuts, client feedback, approvals, and escrow status.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button size="sm" variant="outline" onClick={markAllNotificationsRead} className="text-xs">
            <CheckCheck className="w-4 h-4 mr-1.5" />
            <span>Mark All as Read ({unreadCount})</span>
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-surface-100/90 border border-surface-border rounded-2xl divide-y divide-surface-border overflow-hidden shadow-xl">
        {userNotifications.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <Bell className="w-10 h-10 text-gray-600 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No notifications yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              When collaborators comment on your video cuts or upload new revisions, updates will appear here.
            </p>
          </div>
        ) : (
          userNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={cn(
                'p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer',
                notif.isRead
                  ? 'bg-transparent hover:bg-surface-50/50'
                  : 'bg-amber-500/5 hover:bg-amber-500/10'
              )}
            >
              <div className="p-2.5 rounded-xl bg-surface-50 border border-surface-border shrink-0">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-white truncate">{notif.title}</h4>
                  <span className="text-[11px] text-gray-500 shrink-0 font-mono">
                    {formatRelativeTime(notif.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{notif.message}</p>

                {notif.projectId && (
                  <div className="pt-2">
                    <Link
                      href={`/projects/${notif.projectId}`}
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      <span>Open Project Workspace</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>

              {!notif.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
