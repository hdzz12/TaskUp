import Link from 'next/link';
import { Shield, GraduationCap, FolderGit2, Sparkles, Layers } from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/auth';

export async function Navbar() {
  const isAuth = await isAdminAuthenticated();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="hidden sm:block">
              <div className="font-semibold text-slate-100 flex items-center gap-2 text-sm">
                Muhammad Hafidz
              </div>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden sm:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800">
            <Link
              href="/#karya"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            >
              Semua
            </Link>
            <Link
              href="/?type=TUGAS#karya"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              Tugas Kuliah
            </Link>
            <Link
              href="/?type=PORTO#karya"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
              Portofolio
            </Link>
          </nav>

          {/* Admin Button */}
          <div className="flex items-center gap-2 shrink-0">
            {isAuth ? (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
                title="Akses Admin Hafidz (CRUD)"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar (Shown on small screens) */}
        <div className="sm:hidden flex items-center justify-around py-2 border-t border-slate-900 gap-1 text-xs">
          <Link
            href="/#karya"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-slate-400 hover:text-white active:bg-slate-800/60"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Semua</span>
          </Link>
          <Link
            href="/?type=TUGAS#karya"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-blue-400 hover:text-blue-300 active:bg-slate-800/60"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Tugas Kuliah</span>
          </Link>
          <Link
            href="/?type=PORTO#karya"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-purple-400 hover:text-purple-300 active:bg-slate-800/60"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portofolio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
