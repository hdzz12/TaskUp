import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { HomeExplorer } from '@/components/HomeExplorer';
import { getAllItems } from '@/lib/data';
import { isAdminAuthenticated } from '@/lib/auth';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const items = await getAllItems();
  const isAdmin = await isAdminAuthenticated();

  const stats = {
    totalTugas: items.filter((i) => i.type === 'TUGAS').length,
    totalPorto: items.filter((i) => i.type === 'PORTO').length,
    siapDicek: items.filter((i) => i.type === 'TUGAS' && i.status === 'SIAP_DICEK').length,
    selesai: items.filter((i) => i.status === 'SELESAI').length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        <HeroSection stats={stats} />
        <HomeExplorer initialItems={items} isAdmin={isAdmin} defaultType={params.type} />
      </main>

      <Footer />
    </div>
  );
}
