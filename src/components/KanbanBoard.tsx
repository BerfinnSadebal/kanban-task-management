'use client';

import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from './Column';
import { Card } from './Card';
import { boardService } from '@/services/boardService';
import { Share2, Settings } from 'lucide-react';

interface BoardProps {
  initialBoard: any;
}

const COLUMNS = [
  { id: 'BACKLOG', title: 'Backlog' },
  { id: 'TODO', title: 'To do' },
  { id: 'IN_PROGRESS', title: 'In progress' },
  { id: 'DONE', title: 'Done' },
];

export const KanbanBoard: React.FC<BoardProps> = ({ initialBoard }) => {
  const [board, setBoard] = useState(initialBoard);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onAddTask = async (status: string, content: string, description: string, color: string) => {
    try {
      const newTask = await boardService.createTask(board.id, content, status, description, color);
      setBoard({
        ...board,
        tasks: [...board.tasks, newTask],
      });
    } catch (error) {
      alert('Kart eklenirken bir hata oluştu');
    }
  };

  const onDeleteTask = async (id: string) => {
    if (!window.confirm('Bu kartı silmek istediğinize emin misiniz?')) return;
    try {
      await boardService.deleteTask(id);
      setBoard({
        ...board,
        tasks: board.tasks.filter((t: any) => t.id !== id),
      });
    } catch (error) {
      alert('Kart silinirken bir hata oluştu');
    }
  };

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeTask = board.tasks.find((t: any) => t.id === active.id);
    if (!activeTask) return; // Kart bulunamazsa işlemi durdur

    const overId = over.id as string;
    const isColumn = COLUMNS.some(col => col.id === overId);
    let newStatus = activeTask.status;
    
    if (isColumn) {
      newStatus = overId;
    } else {
      const overTask = board.tasks.find((t: any) => t.id === overId);
      if (overTask) newStatus = overTask.status;
    }

    if (activeTask.status !== newStatus || active.id !== overId) {
      const oldIndex = board.tasks.findIndex((t: any) => t.id === active.id);
      const newIndex = isColumn 
        ? board.tasks.filter((t: any) => t.status === newStatus).length 
        : board.tasks.findIndex((t: any) => t.id === overId);
      
      const newTasks = arrayMove(board.tasks, oldIndex, newIndex).map((t: any, idx: number) => {
        if (t.id === active.id) return { ...t, status: newStatus, order: idx };
        return { ...t, order: idx };
      });

      setBoard({ ...board, tasks: newTasks });

      try {
        await boardService.updateTask(active.id as string, { 
          status: newStatus, 
          order: newIndex 
        });
      } catch (error) {
        console.error('Update failed');
      }
    }
    setActiveId(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-purple-500/30">
      <header className="px-10 py-8 flex flex-col gap-2 shrink-0">
        <h1 className="text-5xl font-bold tracking-tight">Kanban Task Management</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
  <span>By Berfin Sadebal</span>
</div>
      </header>

      <main className="flex-1 px-10 overflow-x-auto custom-scrollbar-h">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 items-start pb-10">
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                tasks={board.tasks.filter((t: any) => t.status === col.id)}
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="rotate-3 cursor-grabbing shadow-2xl">
                <Card 
                  id={activeId} 
                  content={board.tasks.find((t: any) => t.id === activeId)?.content || ''}
                  description={board.tasks.find((t: any) => t.id === activeId)?.description || ''}
                  color={board.tasks.find((t: any) => t.id === activeId)?.color || ''}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
};