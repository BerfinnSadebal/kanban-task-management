'use client';

import { useEffect } from 'react';

export default function RecentBoardsHandler({ slug }: { slug: string }) {
  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('recentBoards') || '[]');
    const updated = [slug, ...boards.filter((b: string) => b !== slug)].slice(0, 5);
    localStorage.setItem('recentBoards', JSON.stringify(updated));
  }, [slug]);

  return null;
}
