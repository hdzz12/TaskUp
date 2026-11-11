import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { isAdminAuthenticated } from '@/lib/auth';
import { put } from '@vercel/blob';

const ALLOWED_EXTENSIONS = [
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.xls',
  '.xlsx',
  '.txt',
  '.md',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
];

export async function POST(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized. Hanya admin yang bisa mengupload file.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang dipilih.' }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        {
          error: `Format berkas (${ext}) tidak didukung. Harap unggah PDF, Word (.docx), PowerPoint (.pptx), Excel (.xlsx), Teks, atau Gambar.`,
        },
        { status: 400 }
      );
    }

    // Validate size (max 50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 50 MB.' },
        { status: 400 }
      );
    }

    const safeBase = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const filename = `${Date.now()}-${safeBase}${ext}`;

    // 1. If Vercel Blob Token exists (Production Cloud)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`tugas/${filename}`, file, {
          access: 'public',
        });
        return NextResponse.json({
          url: blob.url,
          filename: file.name,
          size: file.size,
          storage: 'vercel_blob',
          extension: ext,
        });
      } catch (blobError) {
        console.warn('Vercel Blob failed, falling back to local file storage:', blobError);
      }
    }

    // 2. Local File Storage Fallback (Development & Local preview)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const destinationPath = path.join(uploadsDir, filename);

    await fs.promises.writeFile(destinationPath, buffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      filename: file.name,
      size: file.size,
      storage: 'local',
      extension: ext,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengunggah file.' },
      { status: 500 }
    );
  }
}
