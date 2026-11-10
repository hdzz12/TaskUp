import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAllItems, getDbStatus } from '@/lib/data';
import { AdminItemList } from '@/components/AdminItemList';
import { LogoutButton } from '@/components/LogoutButton';
import {
  Plus,
  Shield,
  Database,
  ExternalLink,
  GraduationCap,
  FolderGit2,
  Clock,
  ArrowLeft,
  Server,
  Sparkles,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect('/login');
  }

  const items = await getAllItems();
  const dbStatus = await getDbStatus();

  const totalTugas = items.filter((i) => i.type === 'TUGAS').length;
  const totalPorto = items.filter((i) => i.type === 'PORTO').length;
  const siapDicek = items.filter((i) => i.type === 'TUGAS' && i.status === 'SIAP_DICEK').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
              title="Lihat Website Publik"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-100 text-sm sm:text-base">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Admin Dashboard Hafidz</span>
              </div>
              <p className="text-[11px] text-slate-400">Pusat Kelola Tugas & Portofolio (CRUD)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Baru</span>
            </Link>

            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Database Status Alert Banner */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
            dbStatus.isDatabaseConnected
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl mt-0.5 ${
                dbStatus.isDatabaseConnected
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm flex items-center gap-2">
                <span>
                  {dbStatus.isDatabaseConnected
                    ? 'Database Neon PostgreSQL Terhubung!'
                    : 'Penyimpanan Lokal Aktif (Fallback Mode)'}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    dbStatus.isDatabaseConnected
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {dbStatus.isDatabaseConnected ? 'Neon Cloud' : 'Local JSON'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {dbStatus.isDatabaseConnected
                  ? 'Data tugas dan portofolio Anda tersimpan secara aman di Neon Serverless PostgreSQL.'
                  : 'Operasi CRUD berjalan normal menggunakan penyimpanan lokal. Saat di-deploy ke Vercel, cukup hubungkan Neon Postgres di dashboard Vercel.'}
              </p>
            </div>
          </div>

          {!dbStatus.isDatabaseConnected && (
            <div className="text-xs bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 text-slate-300 shrink-0">
              <span className="font-semibold text-amber-400">Cara Hubungkan Neon di Vercel:</span>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Vercel Dashboard → Tab <strong>Storage</strong> → Pilih <strong>Neon Postgres</strong> → Klik <strong>Connect</strong>.
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Total Konten</span>
              <Server className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">{items.length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Tugas & Portofolio</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Tugas Kuliah</span>
              <GraduationCap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400">{totalTugas}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Mata Kuliah Dosen</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Portofolio</span>
              <FolderGit2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-purple-400">{totalPorto}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Proyek Showcase</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <div className="flex items-center justify-between text-emerald-400 text-xs mb-1">
              <span>Siap Dicek Dosen</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">{siapDicek}</div>
            <div className="text-[11px] text-emerald-400/70 mt-0.5">Perlu Pemeriksaan</div>
          </div>
        </div>

        {/* CRUD Table / Manager */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Daftar Semua Tugas & Portofolio</h2>
              <p className="text-xs text-slate-400">
                Klik judul untuk melihat halaman publik, gunakan tombol aksi untuk edit status atau hapus data.
              </p>
            </div>
          </div>

          <AdminItemList initialItems={items} />
        </div>
      </main>
    </div>
  );
}
