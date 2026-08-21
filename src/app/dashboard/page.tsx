'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { currentUser } = useApp();

  useEffect(() => {
    if (currentUser?.role === 'editor') {
      router.replace('/dashboard/editor');
    } else {
      router.replace('/dashboard/client');
    }
  }, [currentUser, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] text-xs text-gray-400">
      Redirecting to your dashboard...
    </div>
  );
}
