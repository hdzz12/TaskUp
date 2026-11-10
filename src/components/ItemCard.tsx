import Link from 'next/link';
import { Item } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { GithubIcon } from './SocialIcons';
import {
  ExternalLink,
  FileText,
  GraduationCap,
  FolderGit2,
  BookOpen,
  UserCheck,
  Award,
} from 'lucide-react';

interface Props {
  item: Item;
  isAdmin?: boolean;
}

export function ItemCard({ item, isAdmin }: Props) {
  let tags: string[] = [];
  try {
    tags = JSON.parse(item.techStack || '[]');
  } catch {
    tags = item.techStack ? item.techStack.split(',').map((s) => s.trim()) : [];
  }

  const isTugas = item.type === 'TUGAS';

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/70 hover:shadow-xl hover:shadow-indigo-500/5">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                isTugas
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              }`}
            >
              {isTugas ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5" />
                  Tugas Kuliah
                </>
              ) : (
                <>
                  <FolderGit2 className="w-3.5 h-3.5" />
                  Proyek Portofolio
                </>
              )}
            </span>

            <span className="text-xs text-slate-400 px-2 py-0.5 rounded bg-slate-800/60">
              {item.category}
            </span>
          </div>

          <StatusBadge status={item.status} />
        </div>

        {/* Title */}
        <Link href={`/tugas/${item.slug}`} className="block group-hover:text-indigo-400 transition">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition line-clamp-2">
            {item.title}
          </h3>
        </Link>

        {/* Academic Details (For Dosen / Lecturers) */}
        {isTugas && (item.subject || item.lecturer) && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1.5 text-xs">
            {item.subject && (
              <div className="flex items-center gap-2 text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-medium text-slate-400">Mata Kuliah:</span>
                <span className="text-slate-200 font-medium truncate">{item.subject}</span>
              </div>
            )}
            {item.lecturer && (
              <div className="flex items-center gap-2 text-slate-300">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-400">Dosen Pengampu:</span>
                <span className="text-slate-200 truncate">{item.lecturer}</span>
              </div>
            )}
            {item.semester && (
              <div className="text-slate-400 pl-5.5 text-[11px]">
                Periode: <span className="text-slate-300">{item.semester}</span>
              </div>
            )}
          </div>
        )}

        {/* Grade Badge if available */}
        {item.grade && (
          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Award className="w-4 h-4" />
            <span>Nilai Dosen: {item.grade}</span>
          </div>
        )}

        {/* Summary Description */}
        <p className="mt-3 text-sm text-slate-400 line-clamp-3 leading-relaxed">
          {item.summary || item.description.replace(/[#*`]/g, '').slice(0, 160)}
        </p>

        {/* Tech Stack Tags */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 5).map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50"
              >
                {t}
              </span>
            ))}
            {tags.length > 5 && (
              <span className="px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-500">
                +{tags.length - 5}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <Link
          href={`/tugas/${item.slug}`}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/btn"
        >
          <span>Detail Lengkap</span>
          <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
        </Link>

        <div className="flex items-center gap-1.5">
          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Lihat Live Preview"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {item.repoUrl && (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Source Code GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {item.fileUrl && (
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Dokumen / Laporan / Google Drive"
            >
              <FileText className="w-3.5 h-3.5" />
            </a>
          )}
          {isAdmin && (
            <Link
              href={`/admin/edit/${item.id}`}
              className="px-2 py-1 rounded-md bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 text-[11px] font-medium border border-indigo-500/30 transition ml-1"
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
