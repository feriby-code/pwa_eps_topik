// src/routes/uji-kemampuan.listening.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Headphones, Timer } from "lucide-react";
import { kategoriListening, type KategoriSoal } from "@/components/uji-kemampuan/data-reading-listening";
import { Kuis } from "./uji-kemampuan.reading";

export const Route = createFileRoute("/uji-kemampuan/listening")({
  head: () => ({
    meta: [
      { title: "Materi Listening Format Mirip UBT — PWA EPS-TOPIK" },
      {
        name: "description",
        content:
          "Latihan Listening EPS-TOPIK format mirip UBT: dengar & pilih gambar serta percakapan tempat kerja dengan timer dan skor otomatis.",
      },
      { property: "og:title", content: "Materi Listening Format Mirip UBT" },
      {
        property: "og:description",
        content: "Latihan Listening EPS-TOPIK dengan timer dan penilaian otomatis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ListeningPage,
});

function formatWaktu(detik: number) {
  const m = Math.floor(detik / 60);
  const s = detik % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function ListeningPage() {
  const [kategori, setKategori] = useState<KategoriSoal | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          {kategori ? (
            <button
              onClick={() => setKategori(null)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border"
              aria-label="Kembali ke daftar materi"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <Link
              to="/uji-kemampuan"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border"
              aria-label="Kembali ke Uji Kemampuan"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
          <h1 className="min-w-0 flex-1 truncate text-base font-bold">
            {kategori ? kategori.judul : "Materi Listening (Mirip UBT)"}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {kategori ? (
          <Kuis kategori={kategori} onSelesai={() => setKategori(null)} />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {kategoriListening.map((k) => (
              <li key={k.id}>
                <button
                  onClick={() => setKategori(k)}
                  className="w-full rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-primary" />
                    <p className="text-sm font-bold text-foreground">{k.judul}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{k.ringkas}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Timer className="h-3.5 w-3.5" />
                    {k.soal.length} soal · {formatWaktu(k.durasiDetik)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
