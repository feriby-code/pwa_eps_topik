import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { daftarBuku } from "@/lib/buku-data";

export const Route = createFileRoute("/buku/")({
  head: () => ({
    meta: [
      { title: "Buku — Annyeong" },
      {
        name: "description",
        content:
          "Kumpulan buku EPS-TOPIK 2024, 2015, dan 2000 lengkap dengan PDF dan audio latihan.",
      },
      { property: "og:title", content: "Buku — Annyeong" },
      {
        property: "og:description",
        content: "Pilih buku EPS-TOPIK per tahun atau cari bab yang kamu butuhkan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BukuIndex,
});

function BukuIndex() {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/" aria-label="Kembali ke beranda">
            <ArrowLeft /> Kembali
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-3xl font-extrabold">Buku</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pilih buku sesuai tahun terbit, atau cari langsung bab yang kamu butuhkan.
        </p>

        <Link
          to="/buku/pencarian"
          className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-transform hover:-translate-y-0.5"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Search className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <strong className="block text-sm">Pencarian</strong>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Cari bab dari semua buku
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Link>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {daftarBuku.map((buku) => (
            <Link
              key={buku.tahun}
              to="/buku/$tahun"
              params={{ tahun: buku.tahun }}
              className="group min-h-36 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <BookOpen className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-sm font-extrabold">{buku.label}</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{buku.deskripsi}</p>
              <p className="mt-2 text-xs font-bold text-primary">{buku.bab.length} bab</p>
            </Link>
          ))}
        </div>
      </div>
      <AppBottomNav />
    </main>
  );
}
