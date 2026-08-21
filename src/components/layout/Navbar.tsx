'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  Film, Bell, Plus, Menu, X, Check, ArrowRight,
  LayoutDashboard, User, Shield, LogOut, Video, MessageSquare, Clock
} from 'lucide-react';
import { cn, formatRelativeTime } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const {
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    getUnreadNotificationsCount
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = getUnreadNotificationsCount();
  const userNotifications = notifications.filter(n => n.userId === currentUser?.id);

  const navLinks = [
    { href: '/editors', label: 'Find Editors' },
    { href: '/projects', label: 'Projects' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface-300/80 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight leading-none group-hover:text-gray-300 transition-colors">
              AURIXIFY
            </span>
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">
              Video Workspace
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  isActive
                    ? 'text-black bg-white font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              {/* New Project CTA for Clients */}
              {currentUser.role === 'client' && (
                <Link href="/projects/new" className="hidden sm:block">
                  <Button size="sm" variant="primary" className="h-9">
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                  </Button>
                </Link>
              )}

              {/* Notification Center */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    setIsUserMenuOpen(false);
                  }}
                  className="relative p-2 rounded-lg bg-surface-100 border border-surface-border text-gray-300 hover:text-white hover:bg-surface-50 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-dropdown rounded-xl shadow-2xl p-4 z-50 text-gray-100 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-white">Notifications</h4>
                        {unreadCount > 0 && (
                          <span className="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-medium">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-gray-400 hover:text-white transition-colors"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {userNotifications.length === 0 ? (
                        <p className="text-xs text-gray-500 text-center py-6">No notifications yet</p>
                      ) : (
                        userNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markNotificationRead(notif.id)}
                            className={cn(
                              'p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex gap-3',
                              notif.isRead
                                ? 'bg-surface-100/50 border-white/5 text-gray-400'
                                : 'bg-surface-50 border-white/20 text-gray-200'
                            )}
                          >
                            <div className="mt-0.5">
                              {notif.type.includes('feedback') ? (
                                <MessageSquare className="w-4 h-4 text-white" />
                              ) : notif.type.includes('draft') ? (
                                <Video className="w-4 h-4 text-white" />
                              ) : (
                                <Clock className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1 space-y-0.5">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-white text-xs">{notif.title}</p>
                                <span className="text-[10px] text-gray-500">
                                  {formatRelativeTime(notif.createdAt)}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-snug">{notif.message}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {userNotifications.length > 0 && (
                      <Link
                        href="/notifications"
                        onClick={() => setIsNotifOpen(false)}
                        className="block text-center text-xs text-white hover:text-gray-300 font-medium pt-3 mt-3 border-t border-white/10"
                      >
                        View all activity
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* User Avatar & Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsNotifOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-surface-100 border border-white/10 hover:border-white/30 transition-colors"
                >
                  <Avatar src={currentUser.avatarUrl} name={currentUser.name} size="sm" />
                  <span className="text-xs font-medium text-gray-200 hidden sm:inline max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </button>

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-dropdown rounded-xl shadow-2xl p-2 z-50 text-gray-100 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                        {currentUser.role} Account
                      </p>
                    </div>

                    <Link
                      href={currentUser.role === 'editor' ? '/dashboard/editor' : '/dashboard/client'}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-gray-300 hover:text-black hover:bg-white transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/projects"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-gray-300 hover:text-black hover:bg-white transition-colors"
                    >
                      <Video className="w-4 h-4 text-gray-400" />
                      <span>My Projects</span>
                    </Link>

                    {currentUser.role === 'editor' && (
                      <Link
                        href={`/editors/${currentUser.id}`}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-gray-300 hover:text-black hover:bg-white transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        <span>Public Profile</span>
                      </Link>
                    )}

                    <div className="border-t border-surface-border my-1" />

                    <Link
                      href="/login"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Switch / Sign Out</span>
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button size="sm" variant="ghost">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" variant="primary">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface-100 border border-surface-border text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Apple Style Full Screen) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-black/60 backdrop-blur-3xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col p-6 space-y-6 h-full">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-white tracking-tight border-b border-white/10 pb-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {currentUser && currentUser.role === 'client' && (
              <div className="pt-8">
                <Link
                  href="/projects/new"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button size="lg" variant="primary" className="w-full rounded-full h-14 text-base shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    <Plus className="w-5 h-5 mr-2" />
                    <span>Create New Project</span>
                  </Button>
                </Link>
              </div>
            )}
            {!currentUser && (
               <div className="pt-8 space-y-4">
                 <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                   <Button size="lg" variant="outline" className="w-full rounded-full h-14 bg-white/5 border-white/10 text-white">Log In</Button>
                 </Link>
                 <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                   <Button size="lg" variant="primary" className="w-full rounded-full h-14 shadow-[0_0_20px_rgba(255,255,255,0.15)]">Get Started</Button>
                 </Link>
               </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
