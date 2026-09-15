import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Flame, Sparkles } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mainMenus, quickMenus } from "@/lib/app-navigation";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Annyeong — Belajar Bahasa Korea" },
    { name: "description", content: "Belajar Hangeul, kosa kata, tata bahasa, dan budaya Korea dalam satu aplikasi." },
    { property: "og:title", content: "Annyeong — Belajar Bahasa Korea" },
    { property: "og:description", content: "Teman belajar bahasa Korea yang ringkas dan menyenangkan." },
  ] }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-app-canvas pb-24">
      <header className="overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-7 sm:px-8 lg:pb-28 lg:pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-foreground/15 font-display text-lg font-extrabold">A</div>
              <div><p className="font-display text-xl font-extrabold">Annyeong</p><p className="text-xs text-primary-foreground/70">안녕, siap belajar?</p></div>
            </div>
            <Button variant="ghost" size="icon" aria-label="Buka notifikasi" className="relative rounded-full bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25 hover:text-primary-foreground"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-highlight" /></Button>
          </div>
          <div className="mt-10 flex items-end justify-between gap-4">
            <div><p className="text-sm font-semibold text-primary-foreground/75">Selamat datang!</p><h1 className="mt-1 max-w-xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">Belajar bahasa Korea, selangkah setiap hari.</h1></div>
            <Flame className="hidden h-14 w-14 text-highlight sm:block" />
          </div>
        </div>
      </header>

      <div className="mx-auto -mt-16 max-w-6xl px-5 sm:px-8">
        <section className="relative overflow-hidden rounded-2xl bg-surface p-5 shadow-soft sm:p-7">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-highlight/20" />
          <Badge className="bg-highlight text-highlight-foreground shadow-none hover:bg-highlight"><Sparkles className="mr-1 h-3.5 w-3.5" />Pengumuman</Badge>
          <h2 className="mt-4 font-display text-xl font-extrabold sm:text-2xl">Mulai perjalanan Hangeul-mu</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Materi baru akan hadir secara bertahap. Jelajahi menu dan siapkan target belajarmu.</p>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-lg font-extrabold">Menu Cepat</h2><span className="text-xs font-bold text-primary">Lanjut belajar</span></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickMenus.map((item) => { const Icon = item.icon; return (
              <Link key={item.label} {...(item.slug === "buku" ? { to: "/buku" as const } : item.slug === "huruf-hangeul" ? { to: "/hangeul" as const } : { to: "/kosa-kata" as const })} className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-soft transition-transform hover:-translate-y-0.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1"><strong className="block truncate text-sm">{item.label}</strong><span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.detail}</span></span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ); })}
          </div>
        </section>

        <section className="mt-9">
          <h2 className="mb-4 font-display text-lg font-extrabold">Menu Utama</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {mainMenus.map((item) => { const Icon = item.icon; const linkProps = item.slug === "buku" ? { to: "/buku" as const } : item.slug === "huruf-hangeul" ? { to: "/hangeul" as const } : item.slug === "kosa-kata" ? { to: "/kosa-kata" as const } : item.slug === "gambar" ? { to: "/gambar" as const } : item.slug === "tata-bahasa" ? { to: "/tata-bahasa" as const } : item.slug === "uji-kemampuan" ? { to: "/uji-kemampuan" as const } : { to: "/fitur/$slug" as const, params: { slug: item.slug } }; return (
              <Link key={item.slug} {...linkProps} className={`group min-h-36 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 tone-${item.tone}`}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-display text-sm font-extrabold leading-5">{item.label}</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
              </Link>
            ); })}
          </div>
        </section>
      </div>
      <AppBottomNav />
    </main>
  );
}
