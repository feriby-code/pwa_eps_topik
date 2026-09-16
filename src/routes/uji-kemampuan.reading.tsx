// src/routes/uji-kemampuan.reading.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Timer, CheckCircle2, XCircle } from "lucide-react";
import { kategoriReading, type KategoriSoal } from "@/components/uji-kemampuan/data-reading-listening";

export const Route = createFileRoute("/uji-kemampuan/reading")({
  head: () => ({
    meta: [
      { title: "Materi Reading Format Mirip UBT — PWA EPS-TOPIK" },
      {
        name: "description",
        content:
          "Latihan Reading EPS-TOPIK format mirip UBT: kosakata, tata bahasa, dan pemahaman bacaan dengan timer serta skor otomatis.",
      },
      { property: "og:title", content: "Materi Reading Format Mirip UBT" },
      {
        property: "og:description",
        content: "Latihan Reading EPS-TOPIK dengan timer dan penilaian otomatis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReadingPage,
});

function formatWaktu(detik: number) {
  const m = Math.floor(detik / 60);
  const s = detik % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function ReadingPage() {
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
            {kategori ? kategori.judul : "Materi Reading (Mirip UBT)"}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {kategori ? (
          <Kuis kategori={kategori} onSelesai={() => setKategori(null)} />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {kategoriReading.map((k) => (
              <li key={k.id}>
                <button
                  onClick={() => setKategori(k)}
                  className="w-full rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
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

export function Kuis({
  kategori,
  onSelesai,
}: {
  kategori: KategoriSoal;
  onSelesai: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState<number[]>(Array(kategori.soal.length).fill(-1));
  const [sisa, setSisa] = useState(kategori.durasiDetik);
  const [selesai, setSelesai] = useState(false);

  useEffect(() => {
    if (selesai) return;
    if (sisa <= 0) {
      setSelesai(true);
      return;
    }
    const t = setTimeout(() => setSisa((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [sisa, selesai]);

  const soal = kategori.soal[idx];
  const benar = jawaban.filter((j, i) => j === kategori.soal[i].jawaban).length;

  if (selesai) {
    const nilai = Math.round((benar / kategori.soal.length) * 100);
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <h2 className="text-lg font-black">Hasil {kategori.judul}</h2>
        <p className="mt-4 text-5xl font-black text-primary">{nilai}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {benar} benar dari {kategori.soal.length} soal
        </p>
        <ul className="mt-6 space-y-2 text-left">
          {kategori.soal.map((s, i) => (
            <li key={s.id} className="rounded-xl border border-border p-3">
              <div className="flex items-start gap-2">
                {jawaban[i] === s.jawaban ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{s.pertanyaan}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Jawaban benar: {s.pilihan[s.jawaban]}
                  </p>
                  {s.pembahasan && (
                    <p className="mt-1 text-xs text-primary">{s.pembahasan}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onSelesai}
          className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          Kembali ke Daftar Materi
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
        <span className="text-sm font-semibold">
          Soal {idx + 1} / {kategori.soal.length}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-primary">
          <Timer className="h-4 w-4" />
          {formatWaktu(sisa)}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-5">
        {soal.audioTeks && (
          <p className="mb-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            🔊 {soal.audioTeks}
          </p>
        )}
        <p className="text-sm font-bold leading-relaxed text-foreground">{soal.pertanyaan}</p>
        <div className="mt-4 space-y-2">
          {soal.pilihan.map((p, i) => (
            <button
              key={p}
              onClick={() =>
                setJawaban((prev) => prev.map((v, k) => (k === idx ? i : v)))
              }
              className={
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors " +
                (jawaban[idx] === i
                  ? "border-primary bg-primary/10 font-semibold"
                  : "border-border hover:bg-accent")
              }
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-muted text-xs font-bold">
                {i + 1}
              </span>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          disabled={idx === 0}
          onClick={() => setIdx((i) => i - 1)}
          className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold disabled:opacity-40"
        >
          Sebelumnya
        </button>
        {idx === kategori.soal.length - 1 ? (
          <button
            onClick={() => setSelesai(true)}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
          >
            Selesai
          </button>
        ) : (
          <button
            onClick={() => setIdx((i) => i + 1)}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
          >
            Berikutnya
          </button>
        )}
      </div>
    </div>
  );
}
