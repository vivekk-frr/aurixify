import {
  User, EditorProfile, ClientProfile, Service, PortfolioItem,
  Project, ProjectBrief, VideoVersion, Comment, CommentReply,
  Message, Notification, Payment, Review, ProjectFile, Activity,
  EditorWithProfile, ClientWithProfile, ProjectWithMembers,
} from '@/types';

// ============================================================
// USERS
// ============================================================

export const editors: User[] = [
  {
    id: 'editor-1',
    email: 'alex.rivera@email.com',
    role: 'editor',
    name: 'Alex Rivera',
    username: 'alexrivera',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Alex&backgroundColor=f59e0b',
    location: 'Los Angeles, CA',
    bio: 'Award-winning video editor specializing in cinematic YouTube content and brand commercials. 8+ years turning raw footage into compelling stories.',
    createdAt: '2024-01-15T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'editor-2',
    email: 'sarah.chen@email.com',
    role: 'editor',
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sarah&backgroundColor=8b5cf6',
    location: 'New York, NY',
    bio: 'Motion graphics artist and editor for top creators. I make complex ideas simple and visually stunning. Specialized in explainer videos and educational content.',
    createdAt: '2024-02-20T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'editor-3',
    email: 'marcus.johnson@email.com',
    role: 'editor',
    name: 'Marcus Johnson',
    username: 'marcusjohnson',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Marcus&backgroundColor=3b82f6',
    location: 'London, UK',
    bio: 'Fast-paced editing for gaming channels and esports content. Known for dynamic transitions, sound design, and meme-worthy moments.',
    createdAt: '2024-03-10T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'editor-4',
    email: 'priya.sharma@email.com',
    role: 'editor',
    name: 'Priya Sharma',
    username: 'priyasharma',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Priya&backgroundColor=ec4899',
    location: 'Mumbai, India',
    bio: 'Podcast and documentary editor with a keen ear for storytelling. I help creators cut hours of footage into powerful, engaging narratives.',
    createdAt: '2024-04-05T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'editor-5',
    email: 'jake.morrison@email.com',
    role: 'editor',
    name: 'Jake Morrison',
    username: 'jakemorrison',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Jake&backgroundColor=10b981',
    location: 'Toronto, Canada',
    bio: 'Short-form content specialist. I create scroll-stopping Reels, Shorts, and TikToks that drive engagement. Quick turnaround, high energy.',
    createdAt: '2024-05-12T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'editor-6',
    email: 'elena.volkov@email.com',
    role: 'editor',
    name: 'Elena Volkov',
    username: 'elenavolkov',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Elena&backgroundColor=f97316',
    location: 'Berlin, Germany',
    bio: 'Cinematic wedding and event videographer turned editor. I bring emotion and elegance to every frame. DaVinci Resolve certified colorist.',
    createdAt: '2024-06-01T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'editor-7',
    email: 'david.park@email.com',
    role: 'editor',
    name: 'David Park',
    username: 'davidpark',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=David&backgroundColor=6366f1',
    location: 'Seoul, South Korea',
    bio: 'Corporate and commercial video editor for Fortune 500 companies. Clean, professional, on-brand. Every time.',
    createdAt: '2024-07-15T10:00:00Z',
    onboardingComplete: true,
  },
];

export const clients: User[] = [
  {
    id: 'client-1',
    email: 'jordan.taylor@email.com',
    role: 'client',
    name: 'Jordan Taylor',
    username: 'jordantaylor',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Jordan&backgroundColor=06b6d4',
    location: 'Austin, TX',
    bio: 'Tech YouTuber with 500K subscribers. Always looking for talented editors who understand pacing and storytelling.',
    createdAt: '2024-03-01T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'client-2',
    email: 'maya.rodriguez@email.com',
    role: 'client',
    name: 'Maya Rodriguez',
    username: 'mayarodriguez',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Maya&backgroundColor=a855f7',
    location: 'Miami, FL',
    bio: 'Fitness influencer and brand founder. Need consistent, high-energy video content for multiple platforms.',
    createdAt: '2024-04-15T10:00:00Z',
    onboardingComplete: true,
  },
  {
    id: 'client-3',
    email: 'ryan.foster@email.com',
    role: 'client',
    name: 'Ryan Foster',
    username: 'ryanfoster',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Ryan&backgroundColor=22c55e',
    location: 'San Francisco, CA',
    bio: 'Startup founder. We need video content for product demos, investor pitches, and social media.',
    createdAt: '2024-05-20T10:00:00Z',
    onboardingComplete: true,
  },
];

// ============================================================
// EDITOR PROFILES
// ============================================================

export const editorProfiles: EditorProfile[] = [
  {
    id: 'ep-1',
    userId: 'editor-1',
    specialties: ['youtube', 'commercials', 'corporate'],
    yearsExperience: 8,
    software: ['premiere-pro', 'after-effects', 'davinci-resolve'],
    languages: ['English', 'Spanish'],
    turnaroundDays: 5,
    startingPrice: 350,
    hourlyRate: 75,
    perVideoPrice: 500,
    customQuote: true,
    availabilityStatus: 'available',
    completedProjectsCount: 142,
    avgRating: 4.9,
    totalReviews: 87,
  },
  {
    id: 'ep-2',
    userId: 'editor-2',
    specialties: ['motion-graphics', 'youtube', 'corporate'],
    yearsExperience: 6,
    software: ['after-effects', 'premiere-pro', 'blender'],
    languages: ['English', 'Mandarin'],
    turnaroundDays: 7,
    startingPrice: 400,
    hourlyRate: 85,
    perVideoPrice: 600,
    customQuote: true,
    availabilityStatus: 'available',
    completedProjectsCount: 98,
    avgRating: 4.8,
    totalReviews: 64,
  },
  {
    id: 'ep-3',
    userId: 'editor-3',
    specialties: ['gaming', 'shorts-reels', 'tiktok'],
    yearsExperience: 4,
    software: ['premiere-pro', 'after-effects'],
    languages: ['English'],
    turnaroundDays: 3,
    startingPrice: 200,
    hourlyRate: 50,
    perVideoPrice: 250,
    customQuote: false,
    availabilityStatus: 'busy',
    completedProjectsCount: 215,
    avgRating: 4.7,
    totalReviews: 156,
  },
  {
    id: 'ep-4',
    userId: 'editor-4',
    specialties: ['podcast', 'documentary', 'corporate'],
    yearsExperience: 10,
    software: ['premiere-pro', 'davinci-resolve', 'avid'],
    languages: ['English', 'Hindi', 'Marathi'],
    turnaroundDays: 10,
    startingPrice: 300,
    hourlyRate: 65,
    perVideoPrice: 450,
    customQuote: true,
    availabilityStatus: 'available',
    completedProjectsCount: 76,
    avgRating: 4.9,
    totalReviews: 52,
  },
  {
    id: 'ep-5',
    userId: 'editor-5',
    specialties: ['shorts-reels', 'tiktok', 'social-media'],
    yearsExperience: 3,
    software: ['premiere-pro', 'capcut', 'after-effects'],
    languages: ['English', 'French'],
    turnaroundDays: 2,
    startingPrice: 100,
    hourlyRate: 35,
    perVideoPrice: 150,
    customQuote: false,
    availabilityStatus: 'available',
    completedProjectsCount: 320,
    avgRating: 4.6,
    totalReviews: 198,
  },
  {
    id: 'ep-6',
    userId: 'editor-6',
    specialties: ['wedding', 'documentary', 'music-video'],
    yearsExperience: 7,
    software: ['davinci-resolve', 'premiere-pro', 'final-cut'],
    languages: ['English', 'German', 'Russian'],
    turnaroundDays: 14,
    startingPrice: 500,
    hourlyRate: 90,
    perVideoPrice: 800,
    customQuote: true,
    availabilityStatus: 'available',
    completedProjectsCount: 54,
    avgRating: 5.0,
    totalReviews: 38,
  },
  {
    id: 'ep-7',
    userId: 'editor-7',
    specialties: ['corporate', 'commercials', 'motion-graphics'],
    yearsExperience: 12,
    software: ['premiere-pro', 'after-effects', 'davinci-resolve'],
    languages: ['English', 'Korean', 'Japanese'],
    turnaroundDays: 7,
    startingPrice: 600,
    hourlyRate: 120,
    perVideoPrice: 900,
    customQuote: true,
    availabilityStatus: 'busy',
    completedProjectsCount: 189,
    avgRating: 4.9,
    totalReviews: 112,
  },
];

// ============================================================
// CLIENT PROFILES
// ============================================================

export const clientProfiles: ClientProfile[] = [
  {
    id: 'cp-1',
    userId: 'client-1',
    companyName: 'TechBytes',
    industry: 'Technology',
    website: 'https://techbytes.example.com',
    socialLinks: ['https://youtube.com/@techbytes', 'https://twitter.com/techbytes'],
    description: 'Tech review and tutorial channel covering the latest gadgets and software.',
  },
  {
    id: 'cp-2',
    userId: 'client-2',
    companyName: 'FitFlow Studio',
    industry: 'Fitness & Wellness',
    website: 'https://fitflow.example.com',
    socialLinks: ['https://instagram.com/fitflow', 'https://tiktok.com/@fitflow'],
    description: 'Premium fitness brand creating workout guides and wellness content.',
  },
  {
    id: 'cp-3',
    userId: 'client-3',
    companyName: 'LaunchPad AI',
    industry: 'SaaS / Technology',
    website: 'https://launchpad.example.com',
    socialLinks: ['https://linkedin.com/company/launchpadai'],
    description: 'AI-powered productivity platform for startups and enterprise teams.',
  },
];

// ============================================================
// SERVICES
// ============================================================

export const services: Service[] = [
  { id: 'svc-1', editorProfileId: 'ep-1', name: 'YouTube Video Editing', description: 'Full editing for long-form YouTube content including cuts, transitions, sound design, color grading, and motion graphics.', startingPrice: 350, estimatedDays: 5, category: 'youtube' },
  { id: 'svc-2', editorProfileId: 'ep-1', name: 'Commercial Production', description: 'Professional commercial editing with advanced color grading, VFX, and brand-consistent motion graphics.', startingPrice: 800, estimatedDays: 10, category: 'commercials' },
  { id: 'svc-3', editorProfileId: 'ep-2', name: 'Motion Graphics Package', description: 'Custom animated intros, lower thirds, transitions, and explainer animations tailored to your brand.', startingPrice: 500, estimatedDays: 7, category: 'motion-graphics' },
  { id: 'svc-4', editorProfileId: 'ep-2', name: 'Educational Content Editing', description: 'Engaging educational video editing with annotations, diagrams, screen recordings, and clear pacing.', startingPrice: 400, estimatedDays: 5, category: 'youtube' },
  { id: 'svc-5', editorProfileId: 'ep-3', name: 'Gaming Highlights', description: 'High-energy gaming montages and highlights with dynamic transitions, memes, and sound effects.', startingPrice: 200, estimatedDays: 3, category: 'gaming' },
  { id: 'svc-6', editorProfileId: 'ep-3', name: 'Short-Form Content', description: 'Scroll-stopping Shorts, Reels, and TikToks with trending formats, captions, and music sync.', startingPrice: 100, estimatedDays: 2, category: 'shorts-reels' },
  { id: 'svc-7', editorProfileId: 'ep-4', name: 'Podcast Editing', description: 'Full podcast editing including multi-track audio, noise removal, intro/outro, and video podcast formatting.', startingPrice: 300, estimatedDays: 5, category: 'podcast' },
  { id: 'svc-8', editorProfileId: 'ep-4', name: 'Documentary Editing', description: 'Long-form documentary editing with narrative structure, interview cuts, B-roll integration, and color grading.', startingPrice: 600, estimatedDays: 14, category: 'documentary' },
  { id: 'svc-9', editorProfileId: 'ep-5', name: 'TikTok/Reels Package', description: '5-pack of short-form videos optimized for engagement. Includes captions, trending audio, and platform-specific formatting.', startingPrice: 250, estimatedDays: 3, category: 'tiktok' },
  { id: 'svc-10', editorProfileId: 'ep-6', name: 'Wedding Film', description: 'Cinematic wedding film editing with color grading, music selection, and emotional storytelling.', startingPrice: 800, estimatedDays: 21, category: 'wedding' },
  { id: 'svc-11', editorProfileId: 'ep-7', name: 'Corporate Video', description: 'Professional corporate video editing for internal comms, training, and external marketing.', startingPrice: 600, estimatedDays: 7, category: 'corporate' },
  { id: 'svc-12', editorProfileId: 'ep-7', name: 'Product Demo Video', description: 'Polished product demo and explainer videos with screen recordings, voiceover sync, and animated callouts.', startingPrice: 500, estimatedDays: 5, category: 'commercials' },
];

// ============================================================
// PORTFOLIO
// ============================================================

export const portfolioItems: PortfolioItem[] = [
  { id: 'port-1', editorProfileId: 'ep-1', title: 'MKBHD-Style Tech Review', description: 'Clean, cinematic tech review with product shots and studio lighting.', thumbnailUrl: '/portfolio/tech-review.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'youtube', softwareUsed: ['premiere-pro', 'after-effects'] },
  { id: 'port-2', editorProfileId: 'ep-1', title: 'Nike Campaign Edit', description: 'High-energy commercial for athletic wear brand with dynamic transitions.', thumbnailUrl: '/portfolio/nike-campaign.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'commercials', softwareUsed: ['premiere-pro', 'davinci-resolve'] },
  { id: 'port-3', editorProfileId: 'ep-2', title: 'Explainer: How AI Works', description: 'Animated explainer video breaking down complex AI concepts for general audience.', thumbnailUrl: '/portfolio/ai-explainer.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'motion-graphics', softwareUsed: ['after-effects', 'blender'] },
  { id: 'port-4', editorProfileId: 'ep-2', title: 'SaaS Product Launch', description: 'Product launch video with screen recordings, kinetic typography, and brand animations.', thumbnailUrl: '/portfolio/saas-launch.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'corporate', softwareUsed: ['after-effects', 'premiere-pro'] },
  { id: 'port-5', editorProfileId: 'ep-3', title: 'Valorant Montage', description: 'Fast-paced gaming montage with sync edits, memes, and custom transitions.', thumbnailUrl: '/portfolio/valorant.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'gaming', softwareUsed: ['premiere-pro', 'after-effects'] },
  { id: 'port-6', editorProfileId: 'ep-3', title: 'Streamer Highlights', description: 'Best moments compilation with face-cam zoom, chat reactions, and sound design.', thumbnailUrl: '/portfolio/streamer.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'gaming', softwareUsed: ['premiere-pro'] },
  { id: 'port-7', editorProfileId: 'ep-4', title: 'True Crime Podcast', description: 'Multi-episode podcast with atmospheric sound design and narrative pacing.', thumbnailUrl: '/portfolio/podcast.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'podcast', softwareUsed: ['premiere-pro', 'davinci-resolve'] },
  { id: 'port-8', editorProfileId: 'ep-5', title: 'Viral TikTok Series', description: 'Series of trending TikToks that generated over 10M combined views.', thumbnailUrl: '/portfolio/tiktok-series.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'tiktok', softwareUsed: ['capcut', 'premiere-pro'] },
  { id: 'port-9', editorProfileId: 'ep-6', title: 'Tuscan Wedding Film', description: 'Emotional cinematic wedding film shot in the Italian countryside.', thumbnailUrl: '/portfolio/wedding.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'wedding', softwareUsed: ['davinci-resolve', 'premiere-pro'] },
  { id: 'port-10', editorProfileId: 'ep-7', title: 'Samsung Product Launch', description: 'Corporate product launch video for global tech company.', thumbnailUrl: '/portfolio/samsung.jpg', videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', category: 'corporate', softwareUsed: ['premiere-pro', 'after-effects'] },
];

// ============================================================
// REVIEWS
// ============================================================

export const reviews: Review[] = [
  { id: 'rev-1', projectId: 'proj-1', clientId: 'client-1', editorId: 'editor-1', client: clients[0], rating: 5, content: 'Alex completely transformed my raw footage into something incredible. The pacing, transitions, and color grading were all top-notch. Will definitely work with again.', createdAt: '2024-08-15T10:00:00Z' },
  { id: 'rev-2', projectId: 'proj-2', clientId: 'client-2', editorId: 'editor-1', client: clients[1], rating: 5, content: 'Professional, fast, and creative. Alex understood our brand vision perfectly and delivered ahead of schedule.', createdAt: '2024-09-02T10:00:00Z' },
  { id: 'rev-3', projectId: 'proj-3', clientId: 'client-1', editorId: 'editor-2', client: clients[0], rating: 5, content: 'Sarah\'s motion graphics elevated our explainer video to a whole new level. Complex concepts made beautifully simple.', createdAt: '2024-07-20T10:00:00Z' },
  { id: 'rev-4', projectId: 'proj-4', clientId: 'client-3', editorId: 'editor-3', client: clients[2], rating: 4, content: 'Marcus has an incredible eye for gaming content. Fast turnaround and great energy in the edits. Only wish the color grading was a bit more consistent.', createdAt: '2024-10-01T10:00:00Z' },
  { id: 'rev-5', projectId: 'proj-5', clientId: 'client-2', editorId: 'editor-5', client: clients[1], rating: 5, content: 'Jake delivered 10 Reels in under a week and every single one performed well. He understands what works on Instagram.', createdAt: '2024-11-05T10:00:00Z' },
  { id: 'rev-6', projectId: 'proj-6', clientId: 'client-1', editorId: 'editor-4', client: clients[0], rating: 5, content: 'Priya took 3 hours of podcast footage and turned it into a compelling 45-minute episode. Her narrative instincts are phenomenal.', createdAt: '2024-09-15T10:00:00Z' },
];

// ============================================================
// PROJECTS
// ============================================================

export const projects: Project[] = [
  {
    id: 'proj-1',
    clientId: 'client-1',
    editorId: 'editor-1',
    name: 'iPhone 17 Pro Review',
    description: 'Full review video for the iPhone 17 Pro covering design, camera, performance, and battery life.',
    videoType: 'youtube-video',
    platform: 'youtube',
    deadline: '2026-09-01T00:00:00Z',
    budget: 500,
    numVideos: 1,
    status: 'review',
    brief: {
      goal: 'Create an engaging, in-depth review that helps viewers decide whether to buy the iPhone 17 Pro.',
      targetAudience: 'Tech enthusiasts aged 18-35 who follow smartphone releases.',
      style: 'Clean, cinematic, MKBHD-inspired with studio shots and real-world footage.',
      tone: 'Informative but conversational, honest opinions without being overly critical.',
      references: ['MKBHD review style', 'Dave2D aesthetic'],
      requiredElements: ['Unboxing sequence', 'Camera comparison shots', 'Battery test results', 'Benchmark scores overlay', 'End card with subscribe CTA'],
      thingsToAvoid: ['Jump cuts longer than 3 seconds', 'Stock music that feels generic', 'Over-saturated color grading'],
    },
    createdAt: '2024-08-10T10:00:00Z',
    updatedAt: '2024-08-21T14:00:00Z',
  },
  {
    id: 'proj-2',
    clientId: 'client-2',
    editorId: 'editor-5',
    name: 'Summer Workout Series — Reels',
    description: 'A series of 10 Instagram Reels showcasing summer workout routines for the FitFlow brand.',
    videoType: 'instagram-reel',
    platform: 'instagram',
    deadline: '2026-08-25T00:00:00Z',
    budget: 800,
    numVideos: 10,
    status: 'in-progress',
    brief: {
      goal: 'Drive engagement and new followers through high-energy workout Reels.',
      targetAudience: 'Women aged 20-35 interested in fitness and wellness.',
      style: 'Bright, energetic, fast-paced with trending transitions.',
      tone: 'Motivational, fun, empowering.',
      references: ['@kayla_itsines Reels', '@blogilates transitions'],
      requiredElements: ['Brand logo watermark', 'Exercise name text overlay', 'Trending audio', 'CTA slide at the end'],
      thingsToAvoid: ['Slow pacing', 'Dark/moody color grading', 'Complex choreography that\'s hard to follow'],
    },
    createdAt: '2024-08-05T10:00:00Z',
    updatedAt: '2024-08-18T09:00:00Z',
  },
  {
    id: 'proj-3',
    clientId: 'client-3',
    editorId: 'editor-2',
    name: 'LaunchPad AI — Product Demo',
    description: 'Product demo video showcasing LaunchPad AI\'s core features for investor presentations and landing page.',
    videoType: 'corporate',
    platform: 'website',
    deadline: '2026-09-15T00:00:00Z',
    budget: 1200,
    numVideos: 1,
    status: 'briefing',
    brief: {
      goal: 'Create a polished 2-minute product demo that impresses investors and converts website visitors.',
      targetAudience: 'Startup founders, CTOs, and investors in the SaaS space.',
      style: 'Clean, modern, Apple-keynote-inspired with subtle animations.',
      tone: 'Professional, confident, forward-thinking.',
      references: ['Notion product videos', 'Linear launch trailers', 'Stripe brand videos'],
      requiredElements: ['Screen recording walkthrough', 'Animated feature callouts', 'Customer testimonial snippet', 'Pricing slide', 'CTA with website URL'],
      thingsToAvoid: ['Overly technical jargon', 'Flashy effects that distract from the product', 'Generic stock footage'],
    },
    createdAt: '2024-08-18T10:00:00Z',
    updatedAt: '2024-08-18T10:00:00Z',
  },
  {
    id: 'proj-4',
    clientId: 'client-1',
    editorId: 'editor-1',
    name: 'Best Laptops 2026 — Roundup',
    description: 'Comparison video reviewing the top 5 laptops of 2026.',
    videoType: 'youtube-video',
    platform: 'youtube',
    deadline: '2026-08-30T00:00:00Z',
    budget: 450,
    numVideos: 1,
    status: 'completed',
    brief: {
      goal: 'Help viewers choose the best laptop for their needs with clear comparisons.',
      targetAudience: 'Students and professionals shopping for new laptops.',
      style: 'Clean comparison format with side-by-side shots.',
      tone: 'Helpful, decisive, no-nonsense.',
      references: [],
      requiredElements: ['Comparison table overlay', 'Score cards', 'Winner reveal'],
      thingsToAvoid: ['Bias toward one brand'],
    },
    createdAt: '2024-07-15T10:00:00Z',
    updatedAt: '2024-08-01T10:00:00Z',
  },
];

// ============================================================
// VIDEO VERSIONS
// ============================================================

export const videoVersions: VideoVersion[] = [
  {
    id: 'vv-1',
    projectId: 'proj-1',
    versionNumber: 1,
    title: 'Draft 1 — Rough Cut',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/thumbnails/draft-1.jpg',
    status: 'revision-requested',
    uploadedAt: '2024-08-19T10:00:00Z',
    duration: 596,
  },
  {
    id: 'vv-2',
    projectId: 'proj-1',
    versionNumber: 2,
    title: 'Draft 2 — Revised',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/thumbnails/draft-2.jpg',
    status: 'in-review',
    uploadedAt: '2024-08-21T14:00:00Z',
    duration: 578,
  },
];

// ============================================================
// COMMENTS (Timestamped Feedback)
// ============================================================

export const comments: Comment[] = [
  {
    id: 'cmt-1',
    videoVersionId: 'vv-1',
    userId: 'client-1',
    user: clients[0],
    content: 'This transition feels too slow. Can we make it snappier? Maybe a whip pan instead of a dissolve.',
    timestampSeconds: 37,
    status: 'resolved',
    attachmentUrl: null,
    createdAt: '2024-08-19T15:30:00Z',
    replies: [
      { id: 'reply-1', commentId: 'cmt-1', userId: 'editor-1', user: editors[0], content: 'Good call! I\'ll swap it for a whip pan with motion blur. Should feel much more dynamic.', createdAt: '2024-08-19T16:00:00Z' },
      { id: 'reply-2', commentId: 'cmt-1', userId: 'client-1', user: clients[0], content: 'Perfect, thanks!', createdAt: '2024-08-19T16:15:00Z' },
    ],
  },
  {
    id: 'cmt-2',
    videoVersionId: 'vv-1',
    userId: 'client-1',
    user: clients[0],
    content: 'The subtitle font doesn\'t match our brand. Can we switch to Inter or something cleaner?',
    timestampSeconds: 74,
    status: 'resolved',
    attachmentUrl: null,
    createdAt: '2024-08-19T15:45:00Z',
    replies: [
      { id: 'reply-3', commentId: 'cmt-2', userId: 'editor-1', user: editors[0], content: 'Switching to Inter Bold with a subtle drop shadow. Will look great on dark backgrounds.', createdAt: '2024-08-19T17:00:00Z' },
    ],
  },
  {
    id: 'cmt-3',
    videoVersionId: 'vv-1',
    userId: 'client-1',
    user: clients[0],
    content: 'Love this camera angle! Can we hold it for a beat longer before cutting?',
    timestampSeconds: 123,
    status: 'resolved',
    attachmentUrl: null,
    createdAt: '2024-08-19T16:00:00Z',
    replies: [],
  },
  {
    id: 'cmt-4',
    videoVersionId: 'vv-1',
    userId: 'client-1',
    user: clients[0],
    content: 'The background music is too loud here — it\'s competing with my voiceover. Can we duck it down about 6dB?',
    timestampSeconds: 189,
    status: 'resolved',
    attachmentUrl: null,
    createdAt: '2024-08-19T16:20:00Z',
    replies: [
      { id: 'reply-4', commentId: 'cmt-4', userId: 'editor-1', user: editors[0], content: 'Done! I\'ve also added a sidechain compressor to auto-duck whenever your voice is present.', createdAt: '2024-08-20T09:00:00Z' },
    ],
  },
  {
    id: 'cmt-5',
    videoVersionId: 'vv-1',
    userId: 'client-1',
    user: clients[0],
    content: 'Remove this entire section — it\'s off-topic and breaks the flow of the review.',
    timestampSeconds: 245,
    status: 'resolved',
    attachmentUrl: null,
    createdAt: '2024-08-19T16:30:00Z',
    replies: [],
  },
  {
    id: 'cmt-6',
    videoVersionId: 'vv-2',
    userId: 'client-1',
    user: clients[0],
    content: 'The benchmark overlay looks great! Can we add a subtle glow effect to the numbers?',
    timestampSeconds: 95,
    status: 'open',
    attachmentUrl: null,
    createdAt: '2024-08-21T16:00:00Z',
    replies: [],
  },
  {
    id: 'cmt-7',
    videoVersionId: 'vv-2',
    userId: 'client-1',
    user: clients[0],
    content: 'End card animation is clean. Maybe add the subscribe button animation a half second earlier?',
    timestampSeconds: 540,
    status: 'open',
    attachmentUrl: null,
    createdAt: '2024-08-21T16:15:00Z',
    replies: [
      { id: 'reply-5', commentId: 'cmt-7', userId: 'editor-1', user: editors[0], content: 'On it! I\'ll also add a gentle bounce effect to draw attention.', createdAt: '2024-08-21T17:00:00Z' },
    ],
  },
  {
    id: 'cmt-8',
    videoVersionId: 'vv-2',
    userId: 'client-1',
    user: clients[0],
    content: 'Color grading in this section is slightly too warm. Can we cool it down a touch?',
    timestampSeconds: 320,
    status: 'in-progress',
    attachmentUrl: null,
    createdAt: '2024-08-21T16:30:00Z',
    replies: [],
  },
];

// ============================================================
// PROJECT FILES
// ============================================================

export const projectFiles: ProjectFile[] = [
  { id: 'file-1', projectId: 'proj-1', uploadedBy: 'client-1', name: 'iphone17_raw_footage_01.mp4', fileType: 'video/mp4', size: 2147483648, url: '#', category: 'video', createdAt: '2024-08-10T12:00:00Z' },
  { id: 'file-2', projectId: 'proj-1', uploadedBy: 'client-1', name: 'iphone17_raw_footage_02.mp4', fileType: 'video/mp4', size: 1825361100, url: '#', category: 'video', createdAt: '2024-08-10T12:05:00Z' },
  { id: 'file-3', projectId: 'proj-1', uploadedBy: 'client-1', name: 'brand_guidelines.pdf', fileType: 'application/pdf', size: 5242880, url: '#', category: 'document', createdAt: '2024-08-10T12:10:00Z' },
  { id: 'file-4', projectId: 'proj-1', uploadedBy: 'client-1', name: 'techbytes_logo.png', fileType: 'image/png', size: 524288, url: '#', category: 'image', createdAt: '2024-08-10T12:15:00Z' },
  { id: 'file-5', projectId: 'proj-1', uploadedBy: 'client-1', name: 'background_music.mp3', fileType: 'audio/mpeg', size: 8388608, url: '#', category: 'audio', createdAt: '2024-08-10T12:20:00Z' },
  { id: 'file-6', projectId: 'proj-1', uploadedBy: 'editor-1', name: 'iphone17_review_draft1.mp4', fileType: 'video/mp4', size: 734003200, url: '#', category: 'video', createdAt: '2024-08-19T10:00:00Z' },
  { id: 'file-7', projectId: 'proj-1', uploadedBy: 'editor-1', name: 'iphone17_review_draft2.mp4', fileType: 'video/mp4', size: 681574400, url: '#', category: 'video', createdAt: '2024-08-21T14:00:00Z' },
  { id: 'file-8', projectId: 'proj-2', uploadedBy: 'client-2', name: 'workout_clips.zip', fileType: 'application/zip', size: 5368709120, url: '#', category: 'other', createdAt: '2024-08-05T12:00:00Z' },
  { id: 'file-9', projectId: 'proj-2', uploadedBy: 'client-2', name: 'fitflow_brand_kit.zip', fileType: 'application/zip', size: 52428800, url: '#', category: 'other', createdAt: '2024-08-05T12:05:00Z' },
];

// ============================================================
// MESSAGES
// ============================================================

export const messages: Message[] = [
  { id: 'msg-1', projectId: 'proj-1', senderId: 'client-1', sender: clients[0], content: 'Hey Alex! Just uploaded all the raw footage and brand guidelines. Let me know if you need anything else to get started.', attachmentUrl: null, attachmentName: null, isRead: true, createdAt: '2024-08-10T13:00:00Z' },
  { id: 'msg-2', projectId: 'proj-1', senderId: 'editor-1', sender: editors[0], content: 'Got everything, thanks Jordan! The footage quality is great. I\'ll have a rough cut ready by the 19th.', attachmentUrl: null, attachmentName: null, isRead: true, createdAt: '2024-08-10T14:30:00Z' },
  { id: 'msg-3', projectId: 'proj-1', senderId: 'editor-1', sender: editors[0], content: 'Draft 1 is uploaded! Take a look when you get a chance. I went with a clean, MKBHD-inspired style as you mentioned in the brief.', attachmentUrl: null, attachmentName: null, isRead: true, createdAt: '2024-08-19T10:30:00Z' },
  { id: 'msg-4', projectId: 'proj-1', senderId: 'client-1', sender: clients[0], content: 'Watching it now — overall really solid! Left some timestamped comments on the review page. Main thing is the transition at 0:37 and the subtitle font.', attachmentUrl: null, attachmentName: null, isRead: true, createdAt: '2024-08-19T16:45:00Z' },
  { id: 'msg-5', projectId: 'proj-1', senderId: 'editor-1', sender: editors[0], content: 'All done! Draft 2 is up with all your feedback addressed. The whip pans feel way better and I swapped to Inter for subtitles.', attachmentUrl: null, attachmentName: null, isRead: true, createdAt: '2024-08-21T14:30:00Z' },
  { id: 'msg-6', projectId: 'proj-1', senderId: 'client-1', sender: clients[0], content: 'This is looking amazing! Just a few minor tweaks on Draft 2 — left comments. We\'re almost there! 🎬', attachmentUrl: null, attachmentName: null, isRead: false, createdAt: '2024-08-21T17:00:00Z' },
];

// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications: Notification[] = [
  { id: 'notif-1', userId: 'editor-1', type: 'feedback-added', title: 'New Feedback', message: 'Jordan Taylor left 3 comments on Draft 2 of "iPhone 17 Pro Review"', projectId: 'proj-1', isRead: false, createdAt: '2024-08-21T17:00:00Z' },
  { id: 'notif-2', userId: 'editor-1', type: 'new-message', title: 'New Message', message: 'Jordan Taylor sent a message in "iPhone 17 Pro Review"', projectId: 'proj-1', isRead: false, createdAt: '2024-08-21T17:00:00Z' },
  { id: 'notif-3', userId: 'editor-1', type: 'deadline-approaching', title: 'Deadline Approaching', message: '"iPhone 17 Pro Review" is due in 10 days', projectId: 'proj-1', isRead: true, createdAt: '2024-08-20T09:00:00Z' },
  { id: 'notif-4', userId: 'editor-1', type: 'project-created', title: 'New Project', message: 'You\'ve been assigned to "iPhone 17 Pro Review" by Jordan Taylor', projectId: 'proj-1', isRead: true, createdAt: '2024-08-10T10:00:00Z' },
  { id: 'notif-5', userId: 'client-1', type: 'draft-uploaded', title: 'New Draft', message: 'Alex Rivera uploaded Draft 2 for "iPhone 17 Pro Review"', projectId: 'proj-1', isRead: false, createdAt: '2024-08-21T14:00:00Z' },
  { id: 'notif-6', userId: 'client-1', type: 'feedback-resolved', title: 'Feedback Resolved', message: 'Alex Rivera resolved 5 comments on Draft 1', projectId: 'proj-1', isRead: true, createdAt: '2024-08-20T18:00:00Z' },
];

// ============================================================
// PAYMENTS
// ============================================================

export const payments: Payment[] = [
  { id: 'pay-1', projectId: 'proj-1', amount: 500, platformFee: 50, editorEarnings: 450, status: 'pending', createdAt: '2024-08-10T10:00:00Z' },
  { id: 'pay-2', projectId: 'proj-2', amount: 800, platformFee: 80, editorEarnings: 720, status: 'unpaid', createdAt: '2024-08-05T10:00:00Z' },
  { id: 'pay-3', projectId: 'proj-4', amount: 450, platformFee: 45, editorEarnings: 405, status: 'paid', createdAt: '2024-08-01T10:00:00Z' },
];

// ============================================================
// ACTIVITY
// ============================================================

export const activities: Activity[] = [
  { id: 'act-1', projectId: 'proj-1', userId: 'editor-1', user: editors[0], type: 'draft-uploaded', description: 'Alex Rivera uploaded Draft 2', createdAt: '2024-08-21T14:00:00Z' },
  { id: 'act-2', projectId: 'proj-1', userId: 'client-1', user: clients[0], type: 'comment-added', description: 'Jordan Taylor left 3 comments on Draft 2', createdAt: '2024-08-21T16:30:00Z' },
  { id: 'act-3', projectId: 'proj-1', userId: 'editor-1', user: editors[0], type: 'comment-resolved', description: 'Alex Rivera resolved 5 comments on Draft 1', createdAt: '2024-08-20T18:00:00Z' },
  { id: 'act-4', projectId: 'proj-1', userId: 'editor-1', user: editors[0], type: 'draft-uploaded', description: 'Alex Rivera uploaded Draft 1', createdAt: '2024-08-19T10:00:00Z' },
  { id: 'act-5', projectId: 'proj-1', userId: 'client-1', user: clients[0], type: 'comment-added', description: 'Jordan Taylor left 5 comments on Draft 1', createdAt: '2024-08-19T16:30:00Z' },
  { id: 'act-6', projectId: 'proj-1', userId: 'client-1', user: clients[0], type: 'file-uploaded', description: 'Jordan Taylor uploaded 5 files', createdAt: '2024-08-10T12:00:00Z' },
  { id: 'act-7', projectId: 'proj-1', userId: 'editor-1', user: editors[0], type: 'status-changed', description: 'Alex Rivera changed status to In Progress', createdAt: '2024-08-11T09:00:00Z' },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getEditorWithProfile(userId: string): EditorWithProfile | null {
  const user = editors.find((e) => e.id === userId);
  if (!user) return null;
  const profile = editorProfiles.find((p) => p.userId === userId);
  if (!profile) return null;
  const editorServices = services.filter((s) => s.editorProfileId === profile.id);
  const editorPortfolio = portfolioItems.filter((p) => p.editorProfileId === profile.id);
  const editorReviews = reviews.filter((r) => r.editorId === userId);
  return { ...user, editorProfile: profile, services: editorServices, portfolio: editorPortfolio, reviews: editorReviews };
}

export function getAllEditorsWithProfiles(): EditorWithProfile[] {
  return editors.map((e) => getEditorWithProfile(e.id)!).filter(Boolean);
}

export function getProjectWithMembers(projectId: string): ProjectWithMembers | null {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;
  const client = [...clients, ...editors].find((u) => u.id === project.clientId)!;
  const editor = [...editors, ...clients].find((u) => u.id === project.editorId)!;
  const versions = videoVersions.filter((v) => v.projectId === projectId);
  const files = projectFiles.filter((f) => f.projectId === projectId);
  const projectPayments = payments.filter((p) => p.projectId === projectId);
  return { ...project, client, editor, versions, files, payments: projectPayments };
}

export function getProjectsByUser(userId: string): Project[] {
  return projects.filter((p) => p.clientId === userId || p.editorId === userId);
}

export function getCommentsByVersion(versionId: string): Comment[] {
  return comments.filter((c) => c.videoVersionId === versionId);
}

export function getMessagesByProject(projectId: string): Message[] {
  return messages.filter((m) => m.projectId === projectId);
}

export function getNotificationsByUser(userId: string): Notification[] {
  return notifications.filter((n) => n.userId === userId);
}

export function getActivitiesByProject(projectId: string): Activity[] {
  return activities.filter((a) => a.projectId === projectId);
}

export function getFilesByProject(projectId: string): ProjectFile[] {
  return projectFiles.filter((f) => f.projectId === projectId);
}
