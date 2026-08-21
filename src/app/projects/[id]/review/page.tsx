'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DirectReviewPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  useEffect(() => {
    router.replace(`/projects/${projectId}?tab=review`);
  }, [projectId, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] text-xs text-gray-400">
      Loading video review workspace...
    </div>
  );
}
