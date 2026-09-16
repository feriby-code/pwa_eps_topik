// src/routes/uji-kemampuan.buta-warna.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Timer, Play, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { plates, DURASI_TEST_DETIK, nilaiHasil } from "@/components/uji-kemampuan/data-buta-warna";
import { IshiharaPlate } from "@/components/uji-kemampuan/ishihara-plate";

export const Route = createFileRoute("/uji-kemampuan/buta-warna")({
  head: () => ({
    meta: [
      { title: "Test Buta Warna Ishihara 30 Soal — PWA EPS-TOPIK" },
      {
        name: "description",
        content:
          "Simulasi Test Buta Warna Ishihara EPS-TOPIK: 30 plate, durasi 2 menit 30 detik, hasil skor dan pembahasan otomatis.",
      },
      { property: "og:title", content: "Test Buta Warna Ishihara 30 Soal" },
      {
        property: "og:description",
        content: "30 plate Ishihara dengan timer 2 menit 30 detik dan hasil skor otomatis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ButaWarnaPage,
});

function formatWaktu(detik: number) {
  const m = Math.floor(detik / 60);
  const s = Math.max(0, detik % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

type Fase = "mulai" | "berjalan" | "hasil";

function ButaWarnaPage() {
  const [fase, setFase] = useState<Fase>("mulai");
  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState<number[]>(Array(plates.length).fill(-1));
  const [sisa, setSisa] = useState(DURASI_TEST_DETIK);

  useEffect(() => {
    if (fase !== "berjalan") return;
    if (sisa <= 0) {
      setFase("hasil");
      return;
    }
    const t = setTimeout(() => setSisa((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [fase, sisa]);

  function mulai() {
    setIdx(0);
    setJawaban(Array(plates.length).fill(-1));
    setSisa(DURASI_TEST_DETIK);
    setFase("berjalan");
  }

  function pilih(i: number) {
    setJawaban((prev) => prev.map((v, k) => (k === idx ? i : v)));
    if (idx === plates.length - 1) setFase("hasil");
    else setIdx((v) => v + 1);
  }

  const benar = jawaban.filter((j, i) => j === plates[i].jawaban).length;
  const hasil = nilaiHasil(benar, plates.length);
  const plate = plates[idx];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            to="/uji-kemampuan"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border"
            aria-label="Kembali ke Uji Kemampuan"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-base font-bold">Test Buta Warna Ishihara</h1>
          {fase === "berjalan" && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 font-mono text-sm font-bold text-primary">
              <Timer className="h-4 w-4" />
              {formatWaktu(sisa)}
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {fase === "mulai" && (
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <h2 className="text-lg font-black">Simulasi Test Buta Warna</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              30 plate Ishihara dengan total waktu <strong className="text-foreground">2 menit 30 detik</strong>.
              Sebutkan angka yang Anda lihat pada setiap plate. Gunakan pencahayaan yang cukup dan
              jarak pandang sekitar 40–50 cm.
            </p>
            <ul className="mx-auto mt-5 max-w-md space-y-2 text-left text-sm text-muted-foreground">
              <li>• 30 soal, satu jawaban per plate</li>
              <li>• Timer otomatis berjalan setelah Mulai</li>
              <li>• Hasil skor & pembahasan muncul di akhir</li>
            </ul>
            <button
              onClick={mulai}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground"
            >
              <Play className="h-4 w-4" />
              Mulai Test (2:30)
            </button>
          </div>
        )}

        {fase === "berjalan" && (
          <div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <span className="text-sm font-semibold">
                Plate {idx + 1} / {plates.length}
              </span>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${((idx + 1) / plates.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-card p-5">
              <IshiharaPlate
                simbol={plate.simbol}
                warnaSimbol={plate.warnaSimbol}
                warnaLatar={plate.warnaLatar}
                label={`Plate Ishihara nomor ${plate.id}`}
              />
              <p className="mt-4 text-center text-sm font-bold">
                Angka apa yang Anda lihat pada plate ini?
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {plate.pilihan.map((p, i) => (
                  <button
                    key={p}
                    onClick={() => pilih(i)}
                    className="rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary/10"
                  >
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
              <button
                onClick={() => setFase("hasil")}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold"
              >
                Akhiri & Lihat Hasil
              </button>
            </div>
          </div>
        )}

        {fase === "hasil" && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-center text-lg font-black">Hasil Test Buta Warna</h2>
            <p className="mt-4 text-center text-5xl font-black text-primary">{hasil.persen}%</p>
            <p className="mt-2 text-center text-sm font-semibold">{hasil.label}</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              {benar} benar dari {plates.length} plate · sisa waktu {formatWaktu(sisa)}
            </p>
            <p className="mx-auto mt-4 max-w-md rounded-xl bg-muted px-4 py-3 text-center text-xs text-muted-foreground">
              Simulasi ini bukan diagnosis medis. Untuk keperluan resmi EPS-TOPIK, lakukan
              pemeriksaan di fasilitas kesehatan yang ditunjuk.
            </p>

            <ul className="mt-6 space-y-2">
              {plates.map((p, i) => (
                <li key={p.id} className="flex items-start gap-2 rounded-xl border border-border p-3">
                  {jawaban[i] === p.jawaban ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      Plate {p.id} — jawaban benar: {p.pilihan[p.jawaban]}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.keterangan}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={mulai}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Ulangi Test
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
