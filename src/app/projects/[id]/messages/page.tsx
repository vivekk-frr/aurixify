'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DirectMessagesPage() {
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    router.replace(`/projects/${params.id}?tab=messages`);
  }, [params.id, router]);
  return <div className="p-8 text-xs text-gray-400">Loading project discussion...</div>;
}
