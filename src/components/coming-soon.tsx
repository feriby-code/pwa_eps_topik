import { Link } from "@tanstack/react-router";
import { ArrowLeft, BellRing, Construction } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";

export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/" aria-label="Kembali ke beranda"><ArrowLeft /> Kembali</Link>
        </Button>
        <section className="mt-16 flex flex-col items-center text-center sm:mt-24">
          <div className="relative grid h-28 w-28 place-items-center rounded-[2rem] bg-primary-soft text-primary shadow-soft">
            <Construction className="h-12 w-12" />
            <span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-highlight text-highlight-foreground shadow-soft"><BellRing className="h-4 w-4" /></span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">Sedang disiapkan</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">Materi untuk bagian ini sedang kami siapkan agar pengalaman belajarmu lebih menyenangkan.</p>
          <Button asChild size="lg" className="mt-8 rounded-full px-7 shadow-primary">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </section>
      </div>
      <AppBottomNav />
    </main>
  );
}