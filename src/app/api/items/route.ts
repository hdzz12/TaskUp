import { NextResponse } from 'next/server';
import { getAllItems, createItem } from '@/lib/data';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const search = searchParams.get('q')?.toLowerCase();

    let items = await getAllItems();

    if (type && type !== 'ALL') {
      items = items.filter((i) => i.type === type);
    }

    if (search) {
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(search) ||
          i.description.toLowerCase().includes(search) ||
          i.subject?.toLowerCase().includes(search) ||
          i.lecturer?.toLowerCase().includes(search) ||
          i.category.toLowerCase().includes(search)
      );
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error('GET items error:', error);
    return NextResponse.json({ error: 'Gagal memuat data.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized. Hanya admin yang bisa menambah tugas.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      type = 'TUGAS',
      summary,
      description,
      category = 'Umum',
      subject,
      lecturer,
      semester,
      status = 'SIAP_DICEK',
      grade,
      lecturerFeedback,
      repoUrl,
      demoUrl,
      fileUrl,
      coverImage,
      techStack = '[]',
      featured = false,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Judul dan deskripsi wajib diisi.' }, { status: 400 });
    }

    const newItem = await createItem({
      title,
      slug: body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      type,
      summary: summary || null,
      description,
      category,
      subject: subject || null,
      lecturer: lecturer || null,
      semester: semester || null,
      status,
      grade: grade || null,
      lecturerFeedback: lecturerFeedback || null,
      repoUrl: repoUrl || null,
      demoUrl: demoUrl || null,
      fileUrl: fileUrl || null,
      coverImage: coverImage || null,
      techStack: typeof techStack === 'string' ? techStack : JSON.stringify(techStack),
      featured: !!featured,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('POST item error:', error);
    return NextResponse.json({ error: 'Gagal membuat tugas/proyek.' }, { status: 500 });
  }
}
