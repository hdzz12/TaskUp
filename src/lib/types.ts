export type ItemType = 'TUGAS' | 'PORTO';

export type AssignmentStatus = 'DRAFT' | 'SIAP_DICEK' | 'REVISI' | 'SELESAI';

export interface Item {
  id: string;
  title: string;
  slug: string;
  type: ItemType;
  summary: string | null;
  description: string;
  category: string;
  subject: string | null; // Mata Kuliah
  lecturer: string | null; // Nama Dosen Pengampu
  semester: string | null; // e.g. "Semester 4"
  status: AssignmentStatus;
  grade: string | null; // e.g. "A" / "95"
  lecturerFeedback: string | null;
  repoUrl: string | null;
  demoUrl: string | null;
  fileUrl: string | null; // Google Drive / Laporan PDF
  coverImage: string | null;
  techStack: string; // JSON array of string tags
  featured: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ProfileInfo {
  name: string;
  role: string;
  university: string;
  major: string;
  bio: string;
  avatarUrl?: string;
  email: string;
  github: string;
  linkedin: string;
}
