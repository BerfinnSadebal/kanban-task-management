'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { boardService } from '@/services/boardService';
import { Clock, Plus, Layout } from 'lucide-react';

export default function HomePage() {
  const [slug, setSlug] = useState('');
  const [recentBoards, setRecentBoards] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('recentBoards') || '[]');
    setRecentBoards(boards);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    
    try {
      await boardService.createBoard(slug);
      router.push(`/${slug.toLowerCase()}`);
    } catch (error) {
      alert('Board oluşturulurken bir hata oluştu. Belki bu isim zaten alınmıştır?');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full bg-[#1A1A1A] rounded-2xl shadow-2xl p-8 space-y-8 border border-white/10">
        <div className="text-center space-y-2">
          <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
            <Layout className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white">Kanban Board</h1>
          <p className="text-gray-400">Yeni bir proje başlatın veya mevcut birine girin.</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Board Adı (ID)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.replace(/\s+/g, '-'))}
              placeholder="proje-adi"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-500 mt-2">İpucu: Sadece ID girerek mevcut boardlara erişebilirsiniz.</p>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-500/10 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Board Oluştur veya Git
          </button>
        </form>

        {recentBoards.length > 0 && (
          <div className="pt-6 border-t border-white/5">
            <h2 className="text-sm font-semibold text-gray-400 flex items-center gap-2 mb-4">
              <Clock size={16} />
              Son Gezilenler
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentBoards.map((b) => (
                <button
                  key={b}
                  onClick={() => router.push(`/${b}`)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-colors border border-white/5"
                >
                  /{b}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
