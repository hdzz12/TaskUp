import Link from 'next/link';
import { Shield, GraduationCap, FolderGit2, Sparkles } from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/auth';

export async function Navbar() {
  const isAuth = await isAdminAuthenticated();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            MH
          </div>
          <div>
            <div className="font-semibold text-slate-100 flex items-center gap-2">
              Muhammad Hafidz
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Hub
              </span>
            </div>
            <p className="text-xs text-slate-400">Arsip Tugas & Portofolio</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            Semua
          </Link>
          <Link
            href="/?type=TUGAS"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            Tugas Kuliah
          </Link>
          <Link
            href="/?type=PORTO"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
            Portofolio
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuth ? (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
              title="Akses Admin Hafidz (CRUD)"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
