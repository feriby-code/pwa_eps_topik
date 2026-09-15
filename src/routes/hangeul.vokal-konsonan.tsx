import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { TombolBunyi, useBunyiHangeul } from "@/components/hangeul-audio";
import { kelompokVokalKonsonan } from "@/lib/hangeul-data";

export const Route = createFileRoute("/hangeul/vokal-konsonan")({
  head: () => ({
    meta: [
      { title: "Vokal dan Konsonan Hangeul — Annyeong" },
      {
        name: "description",
        content:
          "Daftar vokal tunggal, vokal ganda, konsonan tunggal, dan konsonan ganda Hangeul beserta cara baca dan audionya.",
      },
      { property: "og:title", content: "Vokal dan Konsonan Hangeul — Annyeong" },
      {
        property: "og:description",
        content: "Pelajari abjad Korea lengkap dengan tulisan, cara baca, dan bunyi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VokalKonsonan,
});

function VokalKonsonan() {
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
          Huruf Hangeul | Vokal dan Konsonan
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Ketuk tombol bunyi untuk mendengar pelafalan suara Korea dengan kecepatan normal.
        </p>

        {kelompokVokalKonsonan.map((kelompok) => (
          <section key={kelompok.judul} className="mt-7">
            <h2 className="font-display text-base font-extrabold">{kelompok.judul}</h2>
            <div className="mt-3 space-y-2">
              {kelompok.baris.map((baris) => (
                <div
                  key={baris.tulisan}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-soft"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <span>{baris.nama}</span>
                    </div>
                    <p className="mt-1 font-display text-2xl font-extrabold leading-tight">
                      {baris.tulisan}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-primary-soft px-2.5 py-1 text-sm font-extrabold text-primary">
                    {baris.baca}
                  </span>
                  <TombolBunyi
                    teks={baris.ucap}
                    label={baris.baca}
                    aktif={teksAktif === baris.ucap}
                    memuat={teksMemuat === baris.ucap}
                    onClick={bunyikan}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <AppBottomNav />
    </main>
  );
}
