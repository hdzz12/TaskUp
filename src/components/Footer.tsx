import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { hafidzProfile } from '@/lib/profile';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 mt-auto py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-slate-200">{hafidzProfile.name}</p>
            <p className="text-sm text-slate-500 mt-1">
              Platform Pengumpulan & Penilaian Tugas Kuliah + Portofolio Showcase
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={hafidzProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={hafidzProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${hafidzProfile.email}`}
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>
            © {new Date().getFullYear()} Muhammad Hafidz. Hosted on Vercel & Powered by Neon PostgreSQL.
            <Link href="/login" className="hover:text-slate-400 transition ml-2">
              • Login Admin
            </Link>
          </p>
          <p className="flex items-center gap-1">
            Dibangun dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
