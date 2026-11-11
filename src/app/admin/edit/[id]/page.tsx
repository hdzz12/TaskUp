import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/auth';
import { getItemById } from '@/lib/data';
import { ItemForm } from '@/components/ItemForm';
import { ArrowLeft, Edit3 } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditItemPage({ params }: Props) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/login');
  }

  const { id } = await params;
  const item = await getItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-slate-100 pb-20">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Edit Data</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Edit: {item.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Perbarui deskripsi, link tugas, status pengerjaan, atau feedback dosen.
          </p>
        </div>

        <ItemForm initialData={item} isEditing={true} />
      </main>
    </div>
  );
}
