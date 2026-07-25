import { KanbanBoard } from '@/components/KanbanBoard';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import RecentBoardsHandler from '@/components/RecentBoardsHandler';

async function getBoardData(slug: string) {
  const board = await prisma.board.findUnique({
    where: { slug: slug.toLowerCase() },
    include: { tasks: { orderBy: { order: 'asc' } } }
  });
  return board;
}

export default async function BoardPage({ params }: { params: { id: string } }) {
  const board = await getBoardData(params.id);

  if (!board) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <RecentBoardsHandler slug={params.id} />
      <KanbanBoard initialBoard={JSON.parse(JSON.stringify(board))} />
    </div>
  );
}
