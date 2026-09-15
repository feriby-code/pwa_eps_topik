import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cariPolaTataBahasa } from "@/lib/tata-bahasa-data";

export const Route = createFileRoute("/tata-bahasa/")({
  head: () => ({
    meta: [
      { title: "Tata Bahasa — Annyeong" },
      {
        name: "description",
        content:
          "Kumpulan pola tata bahasa EPS-TOPIK: 입니다/입니까?, -(으)ㄹ까요?, 아서/어서 lengkap dengan arti, rumus, contoh, dan tips.",
      },
      { property: "og:title", content: "Tata Bahasa — Annyeong" },
      {
        property: "og:description",
        content: "Pelajari pola kalimat Korea beserta rumus, contoh, dan tips penggunaannya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TataBahasaIndex,
});

function TataBahasaIndex() {
  const [kueri, setKueri] = useState("");
  const hasil = useMemo(() => cariPolaTataBahasa(kueri), [kueri]);

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/" aria-label="Kembali ke beranda">
            <ArrowLeft /> Kembali
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-3xl font-extrabold">Tata Bahasa</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pilih pola kalimat untuk melihat arti, cara penggunaan, contoh, dan tipsnya.
        </p>

        <div className="relative mt-5">
          <Input
            value={kueri}
            onChange={(event) => setKueri(event.target.value)}
            placeholder="Cari pola, mis. 입니다 atau karena"
            aria-label="Kata kunci pencarian tata bahasa"
            className="h-13 rounded-2xl bg-surface pr-12 text-base shadow-soft"
          />
          <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="mt-4 space-y-3">
          {hasil.length === 0 ? (
            <p className="px-1 text-sm text-muted-foreground">
              Tidak ada pola yang cocok dengan "{kueri}".
            </p>
          ) : (
            hasil.map((item) => (
              <Link
                key={item.slug}
                to="/tata-bahasa/$slug"
                params={{ slug: item.slug }}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30"
              >
                <span className="min-w-0 flex-1">
                  <strong className="block font-display text-sm font-extrabold">
                    {item.pola} <span className="text-muted-foreground">| {item.arti}</span>
                  </strong>
                  <span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {item.pengertian}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))
          )}
        </div>
      </div>
      <AppBottomNav />
    </main>
  );
}
