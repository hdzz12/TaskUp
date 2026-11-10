'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Item, ItemType, AssignmentStatus } from '@/lib/types';
import {
  GraduationCap,
  FolderGit2,
  Save,
  ArrowLeft,
  Sparkles,
  Link as LinkIcon,
  BookOpen,
  UserCheck,
  Tag,
  AlertCircle,
} from 'lucide-react';

interface Props {
  initialData?: Item;
  isEditing?: boolean;
}

export function ItemForm({ initialData, isEditing = false }: Props) {
  const router = useRouter();

  const [type, setType] = useState<ItemType>(initialData?.type || 'TUGAS');
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'Pemrograman Web');
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [lecturer, setLecturer] = useState(initialData?.lecturer || '');
  const [semester, setSemester] = useState(initialData?.semester || 'Semester 4');
  const [status, setStatus] = useState<AssignmentStatus>(initialData?.status || 'SIAP_DICEK');
  const [grade, setGrade] = useState(initialData?.grade || '');
  const [lecturerFeedback, setLecturerFeedback] = useState(initialData?.lecturerFeedback || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [description, setDescription] = useState(
    initialData?.description ||
      `### Deskripsi Tugas\nJelaskan gambaran umum tugas dan apa yang dikerjakan di sini.\n\n### Fitur Utama\n- Fitur 1\n- Fitur 2\n\n### Cara Menjalankan\n1. Clone repo\n2. Jalankan \`npm install\`\n3. Jalankan \`npm run dev\`\n`
  );
  const [demoUrl, setDemoUrl] = useState(initialData?.demoUrl || '');
  const [repoUrl, setRepoUrl] = useState(initialData?.repoUrl || '');
  const [fileUrl, setFileUrl] = useState(initialData?.fileUrl || '');

  // Tech stack as comma separated
  const initialTags = (() => {
    try {
      return JSON.parse(initialData?.techStack || '[]').join(', ');
    } catch {
      return initialData?.techStack || '';
    }
  })();
  const [techStackInput, setTechStackInput] = useState(initialTags || 'Next.js, TypeScript, Tailwind CSS');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!title.trim()) {
      setError('Judul wajib diisi!');
      setLoading(false);
      return;
    }

    const tagsArray = techStackInput
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    const payload = {
      title,
      slug: slug.trim() ? slug.trim() : undefined,
      type,
      category,
      subject: type === 'TUGAS' ? subject : null,
      lecturer: type === 'TUGAS' ? lecturer : null,
      semester: type === 'TUGAS' ? semester : null,
      status,
      grade: grade.trim() ? grade.trim() : null,
      lecturerFeedback: lecturerFeedback.trim() ? lecturerFeedback.trim() : null,
      summary: summary.trim() ? summary.trim() : null,
      description,
      demoUrl: demoUrl.trim() ? demoUrl.trim() : null,
      repoUrl: repoUrl.trim() ? repoUrl.trim() : null,
      fileUrl: fileUrl.trim() ? fileUrl.trim() : null,
      techStack: JSON.stringify(tagsArray),
    };

    try {
      const url = isEditing && initialData ? `/api/items/${initialData.id}` : '/api/items';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Terjadi kesalahan saat menyimpan data.');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Gagal menghubungi server.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Select Type: Tugas Kuliah vs Proyek Portofolio */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Pilih Tipe Konten
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setType('TUGAS')}
            className={`p-4 rounded-xl border flex items-start gap-3 text-left transition ${
              type === 'TUGAS'
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${type === 'TUGAS' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-200">Tugas Kuliah (Untuk Dosen)</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Ada info mata kuliah, dosen pengampu, status siap dicek, dan slot nilai/feedback.
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setType('PORTO')}
            className={`p-4 rounded-xl border flex items-start gap-3 text-left transition ${
              type === 'PORTO'
                ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className={`p-2 rounded-lg ${type === 'PORTO' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-200">Proyek Portofolio (Showcase)</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Karya pribadi, studi kasus software engineering, atau eksplorasi teknologi mandiri.
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Info */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200">Informasi Utama</h3>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Judul {type === 'TUGAS' ? 'Tugas Kuliah' : 'Proyek'} *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Implementasi Algoritma Dijkstra Pada Rute Angkutan Kota"
            required
            className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Kategori
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Contoh: Pemrograman Web, AI, UI/UX, Jaringan"
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Status Pengerjaan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AssignmentStatus)}
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="SIAP_DICEK">Siap Dicek Dosen (Menunggu Penilaian)</option>
              <option value="REVISI">Perlu Revisi</option>
              <option value="SELESAI">Selesai / Sudah Dinilai</option>
              <option value="DRAFT">Draft Pengerjaan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Ringkasan Singkat (Summary)
          </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="1-2 kalimat ringkas untuk kartu tampilan di beranda..."
            className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Academic Fields (Shown if TUGAS) */}
      {type === 'TUGAS' && (
        <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <BookOpen className="w-4 h-4" />
            <span>Detail Akademik & Dosen</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Mata Kuliah
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Pemrograman Web Lanjut"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Dosen Pengampu
              </label>
              <input
                type="text"
                value={lecturer}
                onChange={(e) => setLecturer(e.target.value)}
                placeholder="Contoh: Dr. Ir. Budi Santoso, M.Kom."
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Semester / Periode
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Contoh: Semester 4 (Genap 2024/2025)"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nilai dari Dosen (Opsional)
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Contoh: A (95) atau Kosongkan jika belum dinilai"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Feedback / Catatan Dosen (Opsional)
            </label>
            <textarea
              rows={2}
              value={lecturerFeedback}
              onChange={(e) => setLecturerFeedback(e.target.value)}
              placeholder="Catatan hasil koreksi dari dosen pengampu..."
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* External Links */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <LinkIcon className="w-4 h-4 text-indigo-400" />
          <span>Tautan Tugas & Berkas (Bisa diakses Dosen / Publik)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Link Live Demo
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Link Repositori GitHub
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Link Berkas / Google Drive / PDF
            </label>
            <input
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full px-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Tech Stack (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
            className="w-full px-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Full Description Markdown */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-200">
            Deskripsi & Dokumentasi Pengerjaan (Format Markdown didukung)
          </label>
          <span className="text-[11px] text-slate-500">Mendukung ## Heading, - List, dan ```code</span>
        </div>
        <textarea
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tuliskan dokumentasi lengkap tugas di sini..."
          className="w-full px-4 py-3 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Batal</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Terbitkan Tugas/Proyek'}</span>
        </button>
      </div>
    </form>
  );
}
