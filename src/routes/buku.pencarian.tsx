import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cariSemua } from "@/lib/buku-data";

export const Route = createFileRoute("/buku/pencarian")({
  head: () => ({
    meta: [
      { title: "Pencarian Buku — Annyeong" },
      {
        name: "description",
        content: "Cari bab pada buku EPS-TOPIK 2024, 2015, dan 2000 dengan cepat.",
      },
      { property: "og:title", content: "Pencarian Buku — Annyeong" },
      { property: "og:description", content: "Temukan bab buku EPS-TOPIK dalam sekali ketik." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PencarianBuku,
});

function PencarianBuku() {
  const [kueri, setKueri] = useState("");
  const hasil = useMemo(() => cariSemua(kueri), [kueri]);

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/buku" aria-label="Kembali ke menu buku">
            <ArrowLeft /> Buku
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">Pencarian</h1>

        <div className="relative mt-4">
          <Input
            value={kueri}
            onChange={(event) => setKueri(event.target.value)}
            placeholder="Contoh: bab 6, keluarga, 2015"
            aria-label="Kata kunci pencarian buku"
            className="h-14 rounded-2xl bg-surface pr-12 text-base shadow-soft"
          />
          <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="mt-4 space-y-3">
          {kueri.trim() === "" ? (
            <p className="px-1 text-sm text-muted-foreground">
              Ketik kata kunci untuk mulai mencari.
            </p>
          ) : hasil.length === 0 ? (
            <p className="px-1 text-sm text-muted-foreground">
              Tidak ada bab yang cocok dengan "{kueri}".
            </p>
          ) : (
            hasil.map((item) => (
              <Link
                key={`${item.tahun}-${item.bab.nomor}`}
                to="/buku/$tahun/$bab"
                params={{ tahun: item.tahun, bab: String(item.bab.nomor) }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm">
                    Buku {item.tahun} | Bab {item.bab.nomor}
                  </strong>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {item.bab.judul} · {item.bab.judulKorea}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))
          )}
        </div>
      </div>
      <AppBottomNav />
    </main>
  );
}
