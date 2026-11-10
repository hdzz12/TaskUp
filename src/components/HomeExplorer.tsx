'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Item, ItemType, AssignmentStatus } from '@/lib/types';
import { ItemCard } from './ItemCard';
import { Search, Filter, GraduationCap, FolderGit2, Sparkles, Layers } from 'lucide-react';

interface Props {
  initialItems: Item[];
  isAdmin: boolean;
  defaultType?: string;
}

export function HomeExplorer({ initialItems, isAdmin, defaultType }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read type from searchParams or defaultType
  const queryType = searchParams.get('type') || defaultType;

  const [selectedType, setSelectedType] = useState<ItemType | 'ALL'>(
    queryType === 'TUGAS' || queryType === 'PORTO' ? queryType : 'ALL'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Keep state in sync with URL changes (e.g. from Navbar or Hero buttons)
  useEffect(() => {
    const currentQueryType = searchParams.get('type');
    if (currentQueryType === 'TUGAS' || currentQueryType === 'PORTO') {
      setSelectedType(currentQueryType);
    } else if (!currentQueryType) {
      setSelectedType('ALL');
    }
  }, [searchParams]);

  // Handler to change tab and update URL
  const handleTypeSelect = (newType: ItemType | 'ALL') => {
    setSelectedType(newType);
    const params = new URLSearchParams(searchParams.toString());
    if (newType === 'ALL') {
      params.delete('type');
    } else {
      params.set('type', newType);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}#karya` : `${pathname}#karya`;
    router.replace(newUrl, { scroll: false });
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialItems.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return Array.from(set);
  }, [initialItems]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      if (selectedType !== 'ALL' && item.type !== selectedType) return false;
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
      if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inSubject = item.subject?.toLowerCase().includes(query) ?? false;
        const inLecturer = item.lecturer?.toLowerCase().includes(query) ?? false;
        const inCategory = item.category.toLowerCase().includes(query);
        const inTech = item.techStack.toLowerCase().includes(query);

        if (!inTitle && !inDesc && !inSubject && !inLecturer && !inCategory && !inTech) {
          return false;
        }
      }

      return true;
    });
  }, [initialItems, selectedType, statusFilter, categoryFilter, searchQuery]);

  // Counts
  const totalTugas = initialItems.filter((i) => i.type === 'TUGAS').length;
  const totalPorto = initialItems.filter((i) => i.type === 'PORTO').length;
  const readyTugas = initialItems.filter((i) => i.type === 'TUGAS' && i.status === 'SIAP_DICEK').length;

  return (
    <section id="karya" className="space-y-8 scroll-mt-24">
      {/* Search & Navigation Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-lg">
        {/* Type Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => handleTypeSelect('ALL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer select-none touch-manipulation transition-all duration-200 ${
              selectedType === 'ALL'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Semua Karya</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
              {initialItems.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTypeSelect('TUGAS')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer select-none touch-manipulation transition-all duration-200 ${
              selectedType === 'TUGAS'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Tugas Kuliah</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
              {totalTugas}
            </span>
            {readyTugas > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Ada tugas siap dicek" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTypeSelect('PORTO')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer select-none touch-manipulation transition-all duration-200 ${
              selectedType === 'PORTO'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portofolio Proyek</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
              {totalPorto}
            </span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas, mata kuliah, dosen, atau tech stack..."
            className="w-full pl-10 pr-8 py-2 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer p-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Secondary Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </div>
          {(['ALL', 'SIAP_DICEK', 'REVISI', 'SELESAI'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg border cursor-pointer select-none touch-manipulation transition ${
                statusFilter === st
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {st === 'ALL'
                ? 'Semua'
                : st === 'SIAP_DICEK'
                ? 'Siap Dicek'
                : st === 'REVISI'
                ? 'Perlu Revisi'
                : 'Selesai'}
            </button>
          ))}
        </div>

        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="ALL">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Grid of Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} isAdmin={isAdmin} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-slate-300">Tidak ada tugas/proyek yang sesuai</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau sesuaikan pilihan filter tab di atas.
          </p>
          {(searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL' || selectedType !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setCategoryFilter('ALL');
                handleTypeSelect('ALL');
              }}
              className="mt-4 px-4 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      )}
    </section>
  );
}
