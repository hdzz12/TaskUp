'use client';

import { useState } from 'react';
import {
  FileText,
  ExternalLink,
  Download,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Eye,
} from 'lucide-react';

interface Props {
  fileUrl: string;
  title?: string;
}

export function PdfViewer({ fileUrl, title = 'Dokumen Laporan' }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Convert Google Drive view URL to preview URL for iframe embedding
  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
      const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
      }
    }
    return `${url}#view=FitH&toolbar=1`;
  };

  const embedUrl = getEmbedUrl(fileUrl);
  const isDirectPdf = fileUrl.toLowerCase().endsWith('.pdf') || fileUrl.includes('/uploads/') || fileUrl.includes('blob.vercel-storage.com');

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none bg-slate-950 p-4 flex flex-col'
          : 'my-6'
      }`}
    >
      {/* Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950/80 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                PDF Reader & Dokumen
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                {isDirectPdf ? 'Berkas PDF Langsung' : 'Google Drive'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
              {title}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
            title="Buka dokumen di tab baru"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buka Tab Baru</span>
          </a>

          <a
            href={fileUrl}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 transition cursor-pointer"
            title="Unduh Berkas PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh</span>
          </a>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {!isFullscreen && (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
              title={isOpen ? 'Sembunyikan Reader' : 'Buka Reader'}
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Embed Iframe Viewer */}
      {isOpen && (
        <div
          className={`relative bg-slate-950 ${
            isFullscreen ? 'flex-1 w-full h-full min-h-0' : 'w-full h-[600px] sm:h-[700px]'
          }`}
        >
          <iframe
            src={embedUrl}
            className="w-full h-full border-0 bg-slate-900"
            title={title}
            loading="lazy"
            allow="autoplay"
          />

          {/* Bottom Fallback bar */}
          <div className="absolute bottom-2 right-4 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 backdrop-blur-sm flex items-center gap-2">
            <span>Tidak tampil?</span>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              Buka berkas langsung di sini
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
