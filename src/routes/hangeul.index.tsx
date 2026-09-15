import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Coins, Hash, Languages, Ruler } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { subMenuHangeul } from "@/lib/hangeul-data";

const ikon = {
  "vokal-konsonan": Languages,
  angka: Hash,
  satuan: Ruler,
  "mata-uang": Coins,
} as const;

const tujuan = {
  "vokal-konsonan": "/hangeul/vokal-konsonan",
  angka: "/hangeul/angka",
  satuan: "/hangeul/satuan",
  "mata-uang": "/hangeul/mata-uang",
} as const;

export const Route = createFileRoute("/hangeul/")({
  head: () => ({
    meta: [
      { title: "Huruf Hangeul — Annyeong" },
      {
        name: "description",
        content:
          "Belajar huruf Hangeul: vokal dan konsonan, angka Korea, satuan, serta cara baca mata uang Won dengan audio.",
      },
      { property: "og:title", content: "Huruf Hangeul — Annyeong" },
      {
        property: "og:description",
        content: "Vokal & konsonan, angka, satuan, dan cara baca uang Won lengkap dengan audio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HangeulIndex,
});

function HangeulIndex() {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/" aria-label="Kembali ke beranda">
            <ArrowLeft /> Kembali
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-3xl font-extrabold">Huruf Hangeul</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pilih materi Hangeul yang ingin kamu pelajari. Setiap huruf bisa didengarkan dengan suara
          Korea berkecepatan normal.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {subMenuHangeul.map((item) => {
            const Icon = ikon[item.slug];
            return (
              <Link
                key={item.slug}
                to={tujuan[item.slug]}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block font-display text-sm font-extrabold">{item.label}</strong>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {item.deskripsi}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
      <AppBottomNav />
    </main>
  );
}
