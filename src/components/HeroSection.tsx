import Link from 'next/link';
import { hafidzProfile } from '@/lib/profile';
import {
  GraduationCap,
  FolderGit2,
  Mail,
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
    <section className="relative pt-6 pb-14 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-[#12c187]/20 via-[#0d9f70]/20 to-[#12c187]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        {/* Left Column: Bio & Intro */}
        <div className="max-w-2xl space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Hai, saya{' '}
              <span className="text-[#12c187]">
                {hafidzProfile.name}
              </span>
            </h1>
            <p className="text-lg font-medium text-slate-300">  
              {hafidzProfile.role} —{' '}
              <span className="text-[#12c187]">{hafidzProfile.major}</span>
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {hafidzProfile.bio}
          </p>

          {/* Social and quick actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/?type=TUGAS#karya"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs bg-[#12c187] hover:bg-[#0fa875] text-white shadow-lg shadow-[#12c187]/25 transition cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Periksa Tugas Kuliah</span>
            </Link>

            <Link
              href="/?type=PORTO#karya"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer"
            >
              <FolderGit2 className="w-4 h-4 text-[#12c187]" />
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
            <span>Ringkasan Akademik</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/60">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Tugas Kuliah</span>
                <GraduationCap className="w-3.5 h-3.5 text-[#12c187]" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalTugas}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Tersubmit</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/60">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Portofolio</span>
                <FolderGit2 className="w-3.5 h-3.5 text-[#12c187]" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalPorto}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Showcase</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#12c187]/5 border border-[#12c187]/20">
              <div className="flex items-center justify-between text-[#12c187] text-xs mb-1">
                <span>Siap Dicek</span>
                <Clock className="w-3.5 h-3.5 text-[#12c187]" />
              </div>
              <div className="text-2xl font-bold text-[#12c187]">{stats.siapDicek}</div>
              <div className="text-[10px] text-[#12c187]/70 mt-0.5">Menunggu review</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d9f70]/10 border border-[#0d9f70]/25">
              <div className="flex items-center justify-between text-[#42d9a1] text-xs mb-1">
                <span>Selesai / A</span>
                <CheckCircle className="w-3.5 h-3.5 text-[#42d9a1]" />
              </div>
              <div className="text-2xl font-bold text-[#42d9a1]">{stats.selesai}</div>
              <div className="text-[10px] text-[#42d9a1]/70 mt-0.5">Dinilai</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
