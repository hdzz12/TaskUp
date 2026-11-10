import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StatusBadge } from '@/components/StatusBadge';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { PdfViewer } from '@/components/PdfViewer';
import { GithubIcon } from '@/components/SocialIcons';
import { getItemBySlug } from '@/lib/data';
import { isAdminAuthenticated } from '@/lib/auth';
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  FileText,
  BookOpen,
  UserCheck,
  Award,
  MessageSquareQuote,
  GraduationCap,
  FolderGit2,
  Edit,
  Tag,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TugasDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const isAdmin = await isAdminAuthenticated();
  const isTugas = item.type === 'TUGAS';

  let tags: string[] = [];
  try {
    tags = JSON.parse(item.techStack || '[]');
  } catch {
    tags = item.techStack ? item.techStack.split(',').map((s) => s.trim()) : [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back navigation & Admin Edit */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          {isAdmin && (
            <Link
              href={`/admin/edit/${item.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Tugas Ini (Admin)</span>
            </Link>
          )}
        </div>

        {/* Header / Badges */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                isTugas
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              }`}
            >
              {isTugas ? <GraduationCap className="w-4 h-4" /> : <FolderGit2 className="w-4 h-4" />}
              {isTugas ? 'Tugas Kuliah' : 'Proyek Portofolio'}
            </span>

            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
              {item.category}
            </span>

            <StatusBadge status={item.status} size="md" />

            {item.grade && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Award className="w-4 h-4" />
                Nilai: {item.grade}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Diunggah: {new Date(item.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}
            </span>
            {item.semester && (
              <span>• Periode: <strong className="text-slate-300">{item.semester}</strong></span>
            )}
          </div>
        </div>

        {/* Academic / Lecturer Verification Card */}
        {isTugas && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Informasi Verifikasi Akademik</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <BookOpen className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Mata Kuliah</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{item.subject || '-'}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <UserCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Dosen Pengampu</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{item.lecturer || '-'}</div>
                </div>
              </div>
            </div>

            {/* Lecturer Feedback / Review note */}
            {item.lecturerFeedback && (
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Catatan & Umpan Balik Dosen:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{item.lecturerFeedback}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}

        {/* Primary Action Buttons Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-wrap items-center gap-3">
          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka Demo / Live Preview</span>
            </a>
          )}

          {item.repoUrl && (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repositori GitHub (Source Code)</span>
            </a>
          )}

          {item.fileUrl && (
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Laporan PDF / Berkas Tugas</span>
            </a>
          )}

          {!item.demoUrl && !item.repoUrl && !item.fileUrl && (
            <span className="text-xs text-slate-500 italic">
              Tidak ada tautan berkas eksternal untuk tugas ini.
            </span>
          )}
        </div>

        {/* Embedded Interactive PDF Reader */}
        {item.fileUrl && (
          <div className="mt-6">
            <PdfViewer fileUrl={item.fileUrl} title={item.title} />
          </div>
        )}

        {/* Tech Stack */}
        {tags.length > 0 && (
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              <span>Teknologi & Alat yang Digunakan</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Full Markdown Description */}
        <div className="mt-10 pt-8 border-t border-slate-900">
          <h2 className="text-lg font-bold text-slate-100 mb-4">Deskripsi & Dokumentasi Pengerjaan</h2>
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/80">
            <MarkdownViewer content={item.description} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
