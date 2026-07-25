import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Yeni task oluşturma
export async function POST(req: Request) {
  try {
    const { content, description, color, status, boardId } = await req.json();

    const taskCount = await prisma.task.count({
      where: { boardId, status }
    });

    const task = await prisma.task.create({
      data: {
        content,
        description,
        color,
        status,
        boardId,
        order: taskCount,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Task güncelleme (taşıma veya içerik değiştirme)
export async function PATCH(req: Request) {
  try {
    const { id, content, description, color, status, order } = await req.json();

    const task = await prisma.task.update({
      where: { id },
      data: {
        content,
        description,
        color,
        status,
        order,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Task silme
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
