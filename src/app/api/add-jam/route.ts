import { NextRequest, NextResponse } from 'next/server';
import { addJamSession } from '@/lib/dbActions';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await addJamSession(body);
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error('Error in /api/add-jam:', error);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
