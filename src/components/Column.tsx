'use client';

import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card } from './Card';
import { Plus, X } from 'lucide-react';

interface ColumnProps {
  id: string;
  title: string;
  tasks: any[];
  onAddTask: (status: string, content: string, description: string, color: string) => Promise<void>;
  onDeleteTask: (id: string) => void;
}

const COLORS = [
  { name: 'Purple', value: '#b5489d' },
  { name: 'Blue', value: '#5d6bc4' },
  { name: 'Red', value: '#d83b33' },
  { name: 'Green', value: '#00a884' },
];

export const Column: React.FC<ColumnProps> = ({ id, title, tasks, onAddTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({ id });
  const [isAdding, setIsAdding] = useState(false);
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await onAddTask(id, content, description, selectedColor);
    setContent('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col w-[320px] shrink-0 h-full">
      <div className="px-1 mb-5 flex items-baseline gap-2">
        <h3 className="text-white text-[22px] font-bold tracking-tight">{title}</h3>
        <span className="text-white/20 text-lg font-medium">{tasks.length}</span>
      </div>

      <div ref={setNodeRef} className="flex flex-col bg-[#111111] rounded-[24px] p-3 border border-white/[0.03] min-h-[200px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <Card 
                key={task.id} 
                id={task.id} 
                content={task.content} 
                description={task.description}
                color={task.color}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </SortableContext>

        {isAdding ? (
          <div className="mt-3 p-4 rounded-xl shadow-2xl space-y-3" style={{ backgroundColor: selectedColor }}>
            <input
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Başlık..."
              className="w-full bg-black/20 text-white placeholder-white/60 outline-none font-bold text-sm p-2 rounded"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Açıklama..."
              className="w-full bg-black/10 text-white/90 placeholder-white/40 outline-none resize-none p-2 rounded text-xs"
              rows={2}
            />
            <div className="flex gap-2 py-1">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setSelectedColor(c.value)}
                  className={`w-5 h-5 rounded-full border-2 ${selectedColor === c.value ? 'border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => setIsAdding(false)} className="text-white/70 hover:text-white"><X size={18} /></button>
              <button onClick={handleSubmit} className="px-4 py-1.5 bg-white text-black font-bold rounded-lg text-[10px] uppercase">KAYDET</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mt-3 flex items-center justify-center gap-2 text-white/10 hover:text-white/40 hover:bg-white/[0.02] p-4 rounded-xl text-[11px] font-bold transition-all border border-dashed border-white/5 w-full uppercase tracking-widest"
          >
            <Plus size={14} /> Kart Ekle
          </button>
        )}
      </div>
    </div>
  );
};