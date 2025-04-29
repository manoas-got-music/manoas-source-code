import { NextResponse } from 'next/server';
// eslint-disable-next-line import/extensions
import { addJamSession } from '@/lib/dbActions';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await addJamSession(body);
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error('Error in /api/add-jam:', error);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
