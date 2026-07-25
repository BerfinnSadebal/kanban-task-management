'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';

interface CardProps {
  id: string;
  content: string;
  description?: string;
  color?: string;
  onDelete?: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ id, content, description, color, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    backgroundColor: color || '#2B2B2B',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 rounded-[16px] group relative cursor-grab active:cursor-grabbing border border-white/10 w-full overflow-hidden hover:brightness-110 transition-all duration-200"
      {...attributes}
      {...listeners}
    >
      <h4 className="text-white font-bold text-[15px] mb-1.5 leading-tight tracking-tight truncate">
        {content}
      </h4>
      {description && (
        <p className="text-white/80 text-[12px] leading-[1.4] mb-3 line-clamp-3">
          {description}
        </p>
      )}
      <div className="flex items-center">
        <div className="px-2 py-0.5 rounded border border-white/20 text-[9px] font-bold text-white/70 uppercase tracking-widest bg-black/10">
          New Note
        </div>
      </div>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 text-white/20 hover:text-white transition-all"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
};
