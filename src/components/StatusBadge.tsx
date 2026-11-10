import React from 'react';
import { AssignmentStatus } from '@/lib/types';
import { CheckCircle2, AlertCircle, Clock, FileEdit } from 'lucide-react';

interface Props {
  status: AssignmentStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: Props) {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  switch (status) {
    case 'SIAP_DICEK':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${sizeClasses}`}
        >
          <Clock className="w-3.5 h-3.5" />
          Siap Dicek Dosen
        </span>
      );
    case 'REVISI':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 ${sizeClasses}`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          Perlu Revisi
        </span>
      );
    case 'SELESAI':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Selesai / Dinilai
        </span>
      );
    case 'DRAFT':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20 ${sizeClasses}`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          Draft Pengerjaan
        </span>
      );
  }
}
