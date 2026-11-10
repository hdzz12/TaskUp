'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Item, AssignmentStatus } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import {
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  GraduationCap,
  FolderGit2,
  Check,
  AlertTriangle,
  Award,
} from 'lucide-react';

interface Props {
  initialItems: Item[];
}

export function AdminItemList({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'TUGAS' | 'PORTO'>('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const inTitle = item.title.toLowerCase().includes(q);
      const inSubject = item.subject?.toLowerCase().includes(q) ?? false;
      const inLecturer = item.lecturer?.toLowerCase().includes(q) ?? false;
      return inTitle || inSubject || inLecturer;
    }
    return true;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        router.refresh();
      } else {
        alert('Gagal menghapus item.');
      }
    } catch {
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: AssignmentStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
        router.refresh();
      }
    } catch {
      alert('Gagal memperbarui status.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => setTypeFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              typeFilter === 'ALL'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua ({items.length})
          </button>
          <button
            onClick={() => setTypeFilter('TUGAS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              typeFilter === 'TUGAS'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tugas Kuliah ({items.filter((i) => i.type === 'TUGAS').length})
          </button>
          <button
            onClick={() => setTypeFilter('PORTO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              typeFilter === 'PORTO'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Portofolio ({items.filter((i) => i.type === 'PORTO').length})
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari item di admin..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table / List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Tipe & Judul</th>
                <th className="px-4 py-3 font-semibold">Mata Kuliah / Dosen</th>
                <th className="px-4 py-3 font-semibold">Status Pengerjaan</th>
                <th className="px-4 py-3 font-semibold">Nilai</th>
                <th className="px-4 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition">
                  {/* Tipe & Judul */}
                  <td className="px-4 py-3 max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.type === 'TUGAS'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}
                      >
                        {item.type === 'TUGAS' ? (
                          <GraduationCap className="w-3 h-3" />
                        ) : (
                          <FolderGit2 className="w-3 h-3" />
                        )}
                        {item.type === 'TUGAS' ? 'Tugas' : 'Porto'}
                      </span>
                      <span className="text-[11px] text-slate-500">{item.category}</span>
                    </div>
                    <Link
                      href={`/tugas/${item.slug}`}
                      className="font-semibold text-slate-200 hover:text-indigo-400 line-clamp-1 flex items-center gap-1 group"
                    >
                      <span>{item.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition shrink-0" />
                    </Link>
                  </td>

                  {/* Mata Kuliah / Dosen */}
                  <td className="px-4 py-3 text-slate-300">
                    {item.type === 'TUGAS' ? (
                      <div>
                        <div className="font-medium text-slate-200">{item.subject || '-'}</div>
                        <div className="text-[11px] text-slate-500">{item.lecturer || 'Belum diisi'}</div>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">Proyek Mandiri</span>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      disabled={updatingId === item.id}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as AssignmentStatus)}
                      className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="SIAP_DICEK">Siap Dicek</option>
                      <option value="REVISI">Perlu Revisi</option>
                      <option value="SELESAI">Selesai / Nilai</option>
                      <option value="DRAFT">Draft</option>
                    </select>
                  </td>

                  {/* Nilai */}
                  <td className="px-4 py-3">
                    {item.grade ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Award className="w-3 h-3" />
                        {item.grade}
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/edit/${item.id}`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Edit Tugas/Proyek"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={deletingId === item.id}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition disabled:opacity-50"
                        title="Hapus Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Tidak ada item yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
