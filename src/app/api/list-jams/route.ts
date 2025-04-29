import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  try {
    const jams = await prisma.jamSessions.findMany({
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(jams);
  } catch (error) {
    console.error('Failed to fetch jam sessions:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
