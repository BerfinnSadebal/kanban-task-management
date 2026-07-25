import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Yeni board oluşturma
export async function POST(req: Request) {
  try {
    const { slug, title } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const board = await prisma.board.create({
      data: {
        slug: slug.toLowerCase(),
        title: title || slug,
      },
    });

    return NextResponse.json(board);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'This slug is already taken' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
