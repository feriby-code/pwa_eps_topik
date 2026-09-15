import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { TombolBunyi, useBunyiHangeul } from "@/components/hangeul-audio";
import { caraBacaMataUang } from "@/lib/hangeul-data";

export const Route = createFileRoute("/hangeul/mata-uang")({
  head: () => ({
    meta: [
      { title: "Cara Baca Mata Uang Won — Annyeong" },
      {
        name: "description",
        content:
          "Cara membaca nominal uang Korea (Won) dari 1.000 sampai 1.000.000 beserta rumus dan audio pelafalannya.",
      },
      { property: "og:title", content: "Cara Baca Mata Uang Won — Annyeong" },
      {
        property: "og:description",
        content: "Baca nominal Won dengan angka sino Korea secara tepat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MataUang,
});

function MataUang() {
  const { bunyikan, teksAktif, teksMemuat } = useBunyiHangeul();

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/hangeul" aria-label="Kembali ke menu Huruf Hangeul">
            <ArrowLeft /> Huruf Hangeul
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold sm:text-3xl">
          Huruf Hangeul | Cara Baca Mata Uang
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Nominal uang Korea dibaca memakai angka sino Korea, dengan satuan 만 (10.000) sebagai
          kuncinya.
        </p>

        <div className="mt-5 space-y-2">
          {caraBacaMataUang.map((baris) => (
            <div
              key={baris.nominal}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-muted-foreground">
                  {baris.nominal} <span className="font-normal">({baris.rumus})</span>
                </p>
                <p className="mt-1 font-display text-xl font-extrabold leading-tight">
                  {baris.tulisan}
                </p>
                <p className="text-xs text-muted-foreground">{baris.baca}</p>
              </div>
              <TombolBunyi
                teks={baris.tulisan}
                label={baris.baca}
                aktif={teksAktif === baris.tulisan}
                memuat={teksMemuat === baris.tulisan}
                onClick={bunyikan}
              />
            </div>
          ))}
        </div>
      </div>
      <AppBottomNav />
    </main>
  );
}
