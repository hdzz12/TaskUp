# 🎓 Portal Tugas Kuliah & Portofolio Muhammad Hafidz

Platform web hybrid yang dirancang khusus untuk **Pengumpulan & Penilaian Tugas Kuliah oleh Dosen** sekaligus sebagai **Etalase Portofolio Proyek** profesional Muhammad Hafidz.

Dibangun dengan **Next.js (App Router)**, **Tailwind CSS**, dan siap dihubungkan ke **Neon PostgreSQL (Serverless)** di **Vercel**.

---

## ✨ Fitur Unggulan

### 1. Mode Public Viewer (Dosen & Publik)
- **Tampilan Beranda Elegan**: Profil, bio, keahlian, dan statistik pengerjaan tugas & portofolio.
- **Filter Interaktif**: Beralih antara *Semua Karya*, *Tugas Kuliah*, dan *Portofolio Proyek*.
- **Pencarian Cepat**: Cari tugas berdasarkan judul, nama mata kuliah, nama dosen, atau teknologi.
- **Halaman Detail Tugas (`/tugas/[slug]`)**:
  - Kartu Verifikasi Akademik (Mata Kuliah, Dosen Pengampu, Semester).
  - Tautan langsung: **Live Demo**, **Repositori GitHub**, dan **Laporan PDF/Google Drive**.
  - Catatan & Umpan Balik Dosen serta badge nilai resmi (misal: "A (96/100)").
  - Dokumentasi lengkap berbasis Markdown.

### 2. Mode Admin Hafidz (CRUD Terproteksi)
- **Autentikasi Aman**: Login via `/login` menggunakan sesi JWT terenkripsi.
- **Dashboard Admin (`/admin`)**:
  - Indikator status koneksi database (Neon Postgres Cloud vs Mode Lokal).
  - Kelola semua item (Tambah, Edit, Hapus).
  - Quick status dropdown: Ubah status langsung (*Siap Dicek Dosen*, *Perlu Revisi*, *Selesai / Dinilai*, *Draft*).
- **Formulir Lengkap (`/admin/new` & `/admin/edit/[id]`)**:
  - Pilihan tipe: Tugas Kuliah vs Proyek Portofolio.
  - Input metadata akademik lengkap (mata kuliah, dosen, semester, nilai, feedback).
  - Input link demo, repositori, dan berkas tugas.
  - Editor dokumentasi Markdown.

---

## 🚀 Panduan Menjalankan di Komputer Lokal

1. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
2. **Buka di Browser**:
   - Website Publik: [http://localhost:3000](http://localhost:3000)
   - Login Admin: [http://localhost:3000/login](http://localhost:3000/login)

### 🔑 Kredensial Login Admin Default
- **Password**: `hafidzpassword123`
*(Password dapat diubah kapan saja di file `.env` pada variabel `ADMIN_PASSWORD`)*

---

## 🗄️ Menghubungkan Neon PostgreSQL di Vercel

Aplikasi ini sudah dilengkapi sistem pintar:
- Di komputer lokal, jika belum ada koneksi Neon, aplikasi otomatis berjalan dengan **Mode Penyimpanan Lokal** (CRUD tetap berfungsi 100%).
- Saat dihubungkan ke Neon, aplikasi otomatis beralih ke database PostgreSQL di cloud!

### Langkah 1-Klik di Dashboard Vercel:
1. Push project ini ke repositori **GitHub** lo.
2. Buka [vercel.com](https://vercel.com) dan impor repositori tersebut.
3. Di dashboard project Vercel, buka tab **Storage**.
4. Klik **Create Database** -> Pilih **Neon Postgres** (Serverless).
5. Klik **Connect to Project**. Vercel akan otomatis mengisi environment variable `DATABASE_URL`.
6. Tambahkan environment variable berikut di tab **Settings** -> **Environment Variables**:
   - `ADMIN_PASSWORD`: *(password admin pilihan lo)*
   - `SESSION_SECRET`: *(string acak minimal 32 karakter untuk enkripsi token login)*
7. Buka terminal lokal, lalu sinkronkan tabel skema ke database Neon:
   ```bash
   npm run db:push
   ```
   *Atau jalankan `npx prisma db push` langsung.*

---

## 📁 Struktur Direktori

```
Porto/
├── prisma/
│   └── schema.prisma         # Skema database PostgreSQL (Item, Status, Tipe)
├── src/
│   ├── app/
│   │   ├── admin/            # Dashboard & formulir CRUD admin
│   │   ├── api/              # API routes (Login, Logout, CRUD Items)
│   │   ├── login/            # Halaman login admin
│   │   ├── tugas/[slug]/     # Halaman detail tugas untuk dosen
│   │   ├── globals.css       # Tailwind CSS v4 styling & dark theme
│   │   ├── layout.tsx        # Root layout & meta tags
│   │   └── page.tsx          # Beranda portofolio & filter interaktif
│   ├── components/           # Reusable UI (Navbar, Hero, ItemCard, Form, Badge)
│   └── lib/                  # Auth logic (JWT), Data access layer, Prisma client
├── .env.example              # Template variabel lingkungan
└── package.json
```

---

## 📜 Lisensi
Dikembangkan oleh **Muhammad Hafidz** © 2026.
