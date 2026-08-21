'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DirectPaymentsPage() {
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    router.replace(`/projects/${params.id}?tab=payments`);
  }, [params.id, router]);
  return <div className="p-8 text-xs text-gray-400">Loading escrow billing...</div>;
}
