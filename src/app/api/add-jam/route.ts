import { NextResponse } from 'next/server';
import { addJamSession } from '@/lib/dbActions';

export default async function POST(req: Request) {
  try {
    const body = await req.json();
    await addJamSession(body);
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error('Error in /api/add-jam:', error);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
