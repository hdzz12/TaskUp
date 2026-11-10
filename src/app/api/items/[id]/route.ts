import { NextResponse } from 'next/server';
import { getItemById, updateItem, deleteItem } from '@/lib/data';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getItemById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET item by id error:', error);
    return NextResponse.json({ error: 'Gagal memuat item.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await updateItem(id, {
      ...body,
      techStack: typeof body.techStack === 'string' ? body.techStack : JSON.stringify(body.techStack || []),
    });

    if (!updated) {
      return NextResponse.json({ error: 'Item tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT item error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui item.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const success = await deleteItem(id);

    if (!success) {
      return NextResponse.json({ error: 'Item tidak ditemukan atau gagal dihapus.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Item berhasil dihapus.' });
  } catch (error) {
    console.error('DELETE item error:', error);
    return NextResponse.json({ error: 'Gagal menghapus item.' }, { status: 500 });
  }
}
