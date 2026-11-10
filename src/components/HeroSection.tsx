import Link from 'next/link';
import { hafidzProfile } from '@/lib/profile';
import {
  GraduationCap,
  FolderGit2,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface Props {
  stats: {
    totalTugas: number;
    totalPorto: number;
    siapDicek: number;
    selesai: number;
  };
}

export function HeroSection({ stats }: Props) {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        {/* Left Column: Bio & Intro */}
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-emerald-400">Portal Tugas & Portofolio Aktif</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3" />
              {hafidzProfile.location}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Hai, saya{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {hafidzProfile.name}
              </span>
            </h1>
            <p className="text-lg font-medium text-slate-300">
              {hafidzProfile.role} —{' '}
              <span className="text-indigo-400">{hafidzProfile.major}</span>
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {hafidzProfile.bio}
          </p>

          {/* Social and quick actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/?type=TUGAS#karya"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Periksa Tugas Kuliah</span>
            </Link>

            <Link
              href="/?type=PORTO#karya"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer"
            >
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              <span>Eksplor Portofolio</span>
            </Link>

            <div className="flex items-center gap-2 pl-2">
              <a
                href={hafidzProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={hafidzProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${hafidzProfile.email}`}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                title="Kirim Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Highlight Stats Card for Dosen / Lecturers */}
        <div className="w-full lg:w-80 shrink-0 p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-800">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Ringkasan Akademik</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/60">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Tugas Kuliah</span>
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalTugas}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Tersubmit</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/60">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Portofolio</span>
                <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalPorto}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Showcase</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
              <div className="flex items-center justify-between text-emerald-400 text-xs mb-1">
                <span>Siap Dicek</span>
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400">{stats.siapDicek}</div>
              <div className="text-[10px] text-emerald-400/70 mt-0.5">Menunggu review</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
              <div className="flex items-center justify-between text-indigo-400 text-xs mb-1">
                <span>Selesai / A</span>
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-indigo-400">{stats.selesai}</div>
              <div className="text-[10px] text-indigo-400/70 mt-0.5">Dinilai</div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Dosen Pengampu:</span>
            <span className="text-slate-200 font-medium">Akses Verifikasi Terbuka</span>
          </div>
        </div>
      </div>
    </section>
  );
}
