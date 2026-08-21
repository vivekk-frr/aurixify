'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw,
  RotateCw, MessageSquarePlus, Sparkles, FastForward
} from 'lucide-react';
import { formatTimestamp, cn } from '@/lib/utils';
import { Comment } from '@/types';

interface VideoPlayerProps {
  videoUrl: string;
  comments: Comment[];
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  onSeek: (time: number) => void;
  onAddCommentAtCurrentTime: () => void;
  onSelectComment?: (commentId: string) => void;
}

export function VideoPlayer({
  videoUrl,
  comments,
  currentTime,
  onTimeUpdate,
  onSeek,
  onAddCommentAtCurrentTime,
  onSelectComment,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [activeHoverComment, setActiveHoverComment] = useState<Comment | null>(null);

  // Sync external seek time if changed externally (e.g. comment clicked)
  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    onTimeUpdate(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 600);
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pos * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
    onSeek(targetTime);
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPosition(pos * 100);
    setHoverTime(pos * duration);
  };

  const handleScrubberMouseLeave = () => {
    setHoverTime(null);
    setActiveHoverComment(null);
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const stepTime = (deltaSeconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + deltaSeconds));
    videoRef.current.currentTime = newTime;
    onSeek(newTime);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col bg-black rounded-3xl overflow-hidden border border-white/10 group select-none shadow-[0_20px_60px_rgba(255,255,255,0.05)]"
    >
      {/* Video Element & Overlay Container */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Big Center Play/Pause Indicator on Hover / Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
          <span className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-white border border-white/10 flex items-center gap-2 shadow-lg">
            <span className={cn('w-2 h-2 rounded-full', isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-white/50')} />
            {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
          </span>
        </div>

        {/* Quick Add Feedback Button Floating on Video */}
        <div className="absolute top-4 right-4 z-20" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              if (isPlaying && videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
              onAddCommentAtCurrentTime();
            }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-black font-medium px-4 py-2 rounded-full text-xs shadow-xl border border-white/20 transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Comment at {formatTimestamp(currentTime)}</span>
          </button>
        </div>
      </div>

      {/* Sleek Custom Control Bar with Marker Scrubber */}
      <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 space-y-3">
        {/* Timeline Scrubber Container */}
        <div
          className="relative h-7 flex items-center cursor-pointer group/scrubber"
          onClick={handleScrubberClick}
          onMouseMove={handleScrubberMouseMove}
          onMouseLeave={handleScrubberMouseLeave}
        >
          {/* Base Track */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative">
            {/* Progress Filled */}
            <div
              className="bg-white h-full rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Hover Time Tooltip */}
          {hoverTime !== null && (
            <div
              className="absolute -top-8 transform -translate-x-1/2 bg-white text-black font-mono font-bold text-[10px] px-2.5 py-1 rounded-md pointer-events-none shadow-lg z-30"
              style={{ left: `${hoverPosition}%` }}
            >
              {formatTimestamp(hoverTime)}
            </div>
          )}

          {/* Comment Hover Tooltip */}
          {activeHoverComment && (
            <div
              className="absolute -top-16 transform -translate-x-1/2 bg-surface-50/95 backdrop-blur-md border border-white/10 text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl pointer-events-none z-30 max-w-[220px] truncate"
              style={{ left: `${(activeHoverComment.timestampSeconds / (duration || 1)) * 100}%` }}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono mb-0.5">
                <span className="font-bold text-white">{formatTimestamp(activeHoverComment.timestampSeconds)}</span>
                <span>•</span>
                <span className="truncate">{activeHoverComment.user.name}</span>
              </div>
              <p className="text-[11px] text-gray-300 truncate">{activeHoverComment.content}</p>
            </div>
          )}

          {/* Scrubber Playhead Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border border-gray-300 shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none transition-transform group-hover/scrubber:scale-[1.3]"
            style={{ left: `${progressPercent}%`, transform: 'translate(-50%, -50%)' }}
          />

          {/* Timestamped Comment Markers on the Timeline Bar */}
          {comments.map((comment) => {
            const markerPos = duration > 0 ? (comment.timestampSeconds / duration) * 100 : 0;
            const isResolved = comment.status === 'resolved';

            return (
              <div
                key={comment.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeek(comment.timestampSeconds);
                  if (onSelectComment) onSelectComment(comment.id);
                }}
                onMouseEnter={() => setActiveHoverComment(comment)}
                onMouseLeave={() => setActiveHoverComment(null)}
                className={cn(
                  'comment-marker shadow-md',
                  isResolved
                    ? 'bg-emerald-400 border border-emerald-900/50'
                    : 'bg-white border border-gray-900/50 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                )}
                style={{ left: `${markerPos}%` }}
                title={`${formatTimestamp(comment.timestampSeconds)} - ${comment.content}`}
              />
            );
          })}
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between gap-2 text-gray-300 text-xs pt-1">
          {/* Left: Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={() => stepTime(-5)}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Rewind 5s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => stepTime(5)}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Forward 5s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="font-mono text-[11px] text-gray-500 hidden sm:inline ml-2">
              <span className="text-white font-semibold">{formatTimestamp(currentTime)}</span> / {formatTimestamp(duration)}
            </span>
          </div>

          {/* Right: Speeds & Fullscreen */}
          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10">
              {[1, 1.25, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => changeSpeed(rate)}
                  className={cn(
                    'px-2.5 py-1 text-[10px] font-mono rounded-full transition-colors font-semibold',
                    playbackRate === rate ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  )}
                >
                  {rate}x
                </button>
              ))}
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
