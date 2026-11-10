import { NextResponse } from 'next/server';
import { verifyAdminPassword, setAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password wajib diisi.' }, { status: 400 });
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Password salah. Coba lagi.' }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ success: true, message: 'Login berhasil!' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
