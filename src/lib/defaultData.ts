import { Item } from './types';

export const defaultItems: Item[] = [
  {
    id: 'item-1',
    title: 'Sistem Informasi Manajemen Tugas Akhir & Bimbingan Online',
    slug: 'sim-tugas-akhir-bimbingan-online',
    type: 'TUGAS',
    summary: 'Aplikasi web fullstack untuk penjadwalan bimbingan, revisi dokumen, dan tracking progress skripsi mahasiswa.',
    description: `### Latar Belakang Proyek
Proyek ini dikembangkan untuk memenuhi tugas besar mata kuliah **Pemrograman Web Lanjut**. Sistem ini mendigitalkan alur bimbingan skripsi antara mahasiswa dan dosen pembimbing, mulai dari pengajuan judul, persetujuan bab, penjadwalan temu bimbingan, hingga pencatatan riwayat revisi.

### Fitur Utama
- **Autentikasi & Otorisasi Berbasis Peran**: Mahasiswa, Dosen Pembimbing, dan Koordinator Prodi.
- **Manajemen Revisi Dokumen**: Fitur upload berkas draft bab (PDF/Docx) dengan penanda versi otomatis.
- **Log Bimbingan Digital**: Mahasiswa dan dosen dapat mengisi catatan dan logbook hasil asistensi.
- **Notifikasi Status**: Indikator apakah bab disetujui, perlu revisi mayor, atau revisi minor.

### Teknologi yang Digunakan
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js Server Actions & API Routes
- **Database**: PostgreSQL dengan Prisma ORM
- **Deployment**: Vercel & Neon Database

### Cara Menjalankan Secara Lokal
1. Clone repositori: \`git clone https://github.com/m-hafidz/sim-tugas-akhir.git\`
2. Install dependensi: \`npm install\`
3. Siapkan file \`.env\` dengan \`DATABASE_URL\` PostgreSQL.
4. Jalankan migrasi: \`npx prisma db push\`
5. Jalankan server dev: \`npm run dev\`
`,
    category: 'Pemrograman Web',
    subject: 'Pemrograman Web Lanjut',
    lecturer: 'Dr. Ir. Hendra Wijaya, M.Kom.',
    semester: 'Semester 4',
    status: 'SIAP_DICEK',
    grade: null,
    lecturerFeedback: 'Tugas telah diserahkan dan menunggu pemeriksaan berkas serta kode oleh dosen pengampu.',
    repoUrl: 'https://github.com',
    demoUrl: 'https://demo-example.vercel.app',
    fileUrl: 'https://drive.google.com',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    techStack: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma']),
    featured: true,
    createdAt: '2026-10-15T08:00:00.000Z',
    updatedAt: '2026-10-20T10:30:00.000Z',
  },
  {
    id: 'item-2',
    title: 'Klasifikasi Citra Rontgen Paru-Paru Menggunakan Model CNN',
    slug: 'klasifikasi-citra-rontgen-cnn',
    type: 'TUGAS',
    summary: 'Model Deep Learning Convolutional Neural Network untuk deteksi dini Pneumonia berbasis citra X-Ray dada dengan akurasi 94.8%.',
    description: `### Latar Belakang & Tujuan
Tugas proyek akhir mata kuliah **Kecerdasan Buatan & Deep Learning**. Proyek ini bertujuan untuk membangun model machine learning computer vision yang mampu mengklasifikasikan foto rontgen dada ke dalam dua kelas: *Normal* dan *Pneumonia*.

### Metodologi
- **Dataset**: Menggunakan dataset NIH Chest X-Ray berjumlah 5.863 citra.
- **Preprocessing**: Data augmentation (random rotation, zoom, horizontal flip) dan normalisasi histogram CLAHE.
- **Arsitektur Model**: Fine-tuning arsitektur transfer learning ResNet-50 dan MobileNetV2 dengan custom classification head.
- **Evaluasi**: Menggunakan confusion matrix, F1-Score, dan ROC-AUC curve. Model mencapai akurasi 94.8% pada data uji.

### Output Tugas
- Laporan ilmiah format IEEE (PDF terlampir).
- Jupyter Notebook source code lengkap dengan visualisasi Grad-CAM untuk interpretasi fitur gambar.
`,
    category: 'Kecerdasan Buatan',
    subject: 'Kecerdasan Buatan & Pembelajaran Mesin',
    lecturer: 'Prof. Siti Rahmawati, Ph.D.',
    semester: 'Semester 5',
    status: 'SELESAI',
    grade: 'A (96/100)',
    lecturerFeedback: 'Analisis metrik evaluasi sangat rapi dan lengkap. Implementasi Grad-CAM memberikan visualisasi yang tepat pada region of interest. Sangat memuaskan!',
    repoUrl: 'https://github.com',
    demoUrl: null,
    fileUrl: 'https://drive.google.com',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    techStack: JSON.stringify(['Python', 'PyTorch', 'OpenCV', 'Jupyter', 'Scikit-Learn']),
    featured: true,
    createdAt: '2026-09-01T09:00:00.000Z',
    updatedAt: '2026-09-28T14:15:00.000Z',
  },
  {
    id: 'item-3',
    title: 'Analisis Kinerja Routing OSPF vs BGP Pada Topologi Jaringan Terdistribusi',
    slug: 'analisis-routing-ospf-bgp',
    type: 'TUGAS',
    summary: 'Simulasi dan perbandingan waktu konvergensi serta throughput protokol routing dinamis OSPF dan BGP menggunakan Cisco Packet Tracer & GNS3.',
    description: `### Deskripsi Praktikum
Praktikum modul ke-5 mata kuliah **Jaringan Komputer & Komunikasi Data**. Eksperimen ini membandingkan latensi, packet loss, dan stabilitas routing table ketika terjadi link failure pada topologi multi-router.

### Hasil Analisis
- OSPF menunjukkan waktu konvergensi lebih cepat (rata-rata 3.2 detik) pada Autonomous System skala lokal.
- BGP lebih unggul dalam skalabilitas kebijakan filtering rute inter-AS meskipun konvergensi lebih lambat.
- Analisis wireshark terlampir pada dokumen laporan.
`,
    category: 'Jaringan Komputer',
    subject: 'Jaringan Komputer & Komunikasi Data',
    lecturer: 'Agus Pratama, S.T., M.Kom.',
    semester: 'Semester 4',
    status: 'REVISI',
    grade: null,
    lecturerFeedback: 'Analisis OSPF sudah baik, namun tambahkan pengujian untuk simulasi skenario link flapping pada router core nomor 3.',
    repoUrl: 'https://github.com',
    demoUrl: null,
    fileUrl: 'https://drive.google.com',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    techStack: JSON.stringify(['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'Network Protocols']),
    featured: false,
    createdAt: '2026-10-02T11:00:00.000Z',
    updatedAt: '2026-10-18T16:00:00.000Z',
  },
  {
    id: 'item-4',
    title: 'DevPulse - Realtime Developer Productivity & Analytics Dashboard',
    slug: 'devpulse-analytics-dashboard',
    type: 'PORTO',
    summary: 'Aplikasi portofolio pribadi: dashboard analitik produktivitas developer yang mengintegrasikan metrik GitHub commits, pull requests, dan waktu coding.',
    description: `### Tentang Proyek Portofolio
DevPulse adalah proyek showcase mandiri yang saya bangun untuk mengeksplorasi pembuatan aplikasi web modern dengan performa tinggi, visualisasi data interaktif, dan integrasi webhook realtime.

### Arsitektur Sistem
- **Frontend**: Next.js App Router dengan React Server Components dan Recharts untuk diagram visual.
- **Backend**: Serverless API routes dengan caching HTTP headers.
- **Database**: PostgreSQL hosted di Neon Serverless dengan Prisma.
- **Otentikasi**: Session-based auth dengan token JWT terenkripsi.

### Fitur Utama
- Sync otomatis aktivitas commit dari GitHub REST & GraphQL API.
- Heatmap kalender produktivitas mirip GitHub contribution chart.
- Mode gelap/terang adaptif dengan Tailwind CSS.
`,
    category: 'Fullstack Web App',
    subject: null,
    lecturer: null,
    semester: null,
    status: 'SELESAI',
    grade: null,
    lecturerFeedback: null,
    repoUrl: 'https://github.com',
    demoUrl: 'https://devpulse-demo.vercel.app',
    fileUrl: null,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Neon Postgres', 'Recharts']),
    featured: true,
    createdAt: '2026-08-10T10:00:00.000Z',
    updatedAt: '2026-09-05T12:00:00.000Z',
  },
  {
    id: 'item-5',
    title: 'Mobile Banking App UI/UX Redesign - Mandiri Livin Case Study',
    slug: 'livin-redesign-case-study',
    type: 'PORTO',
    summary: 'Studi kasus desain antarmuka aplikasi perbankan modern yang memprioritaskan kemudahan transfer cepat, manajemen tagihan, dan budgeting mingguan.',
    description: `### Studi Kasus UI/UX Design
Proyek portofolio desain produk digital berfokus pada perbaikan user flow transaksi harian dan sistem navigasi finansial.

### Metodologi Design Thinking
1. **Empathize**: Wawancara 6 pengguna aktif rentang usia 20-35 tahun mengenai kendala pembayaran QRIS dan transfer berulang.
2. **Define**: Pemetaan user journey, pain points, dan arsitektur informasi.
3. **Ideate**: Eksplorasi wireframe low-fidelity dan micro-interactions.
4. **Prototype**: High-fidelity prototype interaktif di Figma dengan reusable Design System komponen.
5. **Usability Testing**: Pengujian System Usability Scale (SUS) dengan peningkatan skor kepuasan hingga 84.5.
`,
    category: 'UI/UX Design',
    subject: null,
    lecturer: null,
    semester: null,
    status: 'SELESAI',
    grade: null,
    lecturerFeedback: null,
    repoUrl: null,
    demoUrl: 'https://figma.com',
    fileUrl: 'https://drive.google.com',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    techStack: JSON.stringify(['Figma', 'UI/UX Design', 'Design System', 'User Research', 'Prototyping']),
    featured: false,
    createdAt: '2026-07-15T09:00:00.000Z',
    updatedAt: '2026-08-01T15:30:00.000Z',
  },
];
