import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { TombolBunyi, useBunyiHangeul } from "@/components/hangeul-audio";
import {
  angkaAsli,
  angkaSino,
  catatanAngkaAsli,
  catatanAngkaSino,
  type BarisAngka,
} from "@/lib/hangeul-data";

export const Route = createFileRoute("/hangeul/angka")({
  head: () => ({
    meta: [
      { title: "Angka Korea (Hangeul) — Annyeong" },
      {
        name: "description",
        content:
          "Angka asli Korea (고유 숫자) dan angka sino Korea (시노 숫자) lengkap dengan cara pakai, cara baca, dan audio.",
      },
      { property: "og:title", content: "Angka Korea (Hangeul) — Annyeong" },
      {
        property: "og:description",
        content: "Bedakan angka asli dan angka sino Korea beserta penggunaannya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AngkaHangeul,
});

function Daftar({
  data,
  aktif,
  memuat,
  bunyikan,
}: {
  data: BarisAngka[];
  aktif: string | null;
  memuat: string | null;
  bunyikan: (teks: string) => void;
}) {
  return (
    <div className="mt-3 space-y-2">
      {data.map((baris) => (
        <div
          key={`${baris.angka}-${baris.tulisan}`}
          className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-soft"
        >
          <span className="grid h-11 w-14 shrink-0 place-items-center rounded-xl bg-primary-soft font-display text-lg font-extrabold text-primary">
            {baris.angka}
          </span>
          <p className="min-w-0 flex-1 font-display text-2xl font-extrabold leading-tight">
            {baris.tulisan}
          </p>
          <span className="shrink-0 text-sm font-bold text-muted-foreground">{baris.baca}</span>
          <TombolBunyi
            teks={baris.tulisan}
            label={baris.baca}
            aktif={aktif === baris.tulisan}
            memuat={memuat === baris.tulisan}
            onClick={bunyikan}
          />
        </div>
      ))}
    </div>
  );
}

function AngkaHangeul() {
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
          Huruf Hangeul | Angka
        </h1>

        <section className="mt-7">
          <h2 className="font-display text-base font-extrabold">Angka Asli | 고유 숫자</h2>
          <div className="mt-2 rounded-2xl border border-border bg-surface p-4 shadow-soft">
            <p className="text-xs font-bold text-muted-foreground">Digunakan untuk:</p>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">
              {catatanAngkaAsli.map((catatan) => (
                <li key={catatan} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{catatan}</span>
                </li>
              ))}
            </ul>
          </div>
          <Daftar data={angkaAsli} aktif={teksAktif} memuat={teksMemuat} bunyikan={bunyikan} />
        </section>

        <section className="mt-8">
          <h2 className="font-display text-base font-extrabold">Angka Sino | 시노 숫자</h2>
          <div className="mt-2 rounded-2xl border border-border bg-surface p-4 shadow-soft">
            <p className="text-xs font-bold text-muted-foreground">Digunakan untuk:</p>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">
              {catatanAngkaSino.map((catatan) => (
                <li key={catatan} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{catatan}</span>
                </li>
              ))}
            </ul>
          </div>
          <Daftar data={angkaSino} aktif={teksAktif} memuat={teksMemuat} bunyikan={bunyikan} />
        </section>
      </div>
      <AppBottomNav />
    </main>
  );
}
