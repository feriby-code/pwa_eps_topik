import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ArrowLeft, Download, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cariBab, cariBuku, type AudioTrack } from "@/lib/buku-data";

const PdfViewer = lazy(() =>
  import("@/components/PdfViewer").then((modul) => ({ default: modul.PdfViewer })),
);

function PdfLazy({ url }: { url: string }) {
  const [diPeramban, setDiPeramban] = useState(false);
  useEffect(() => setDiPeramban(true), []);
  const pemuat = (
    <div className="p-10 text-center text-sm text-muted-foreground">Memuat PDF…</div>
  );
  if (!diPeramban) return pemuat;
  return <Suspense fallback={pemuat}><PdfViewer url={url} /></Suspense>;
}

export const Route = createFileRoute("/buku/$tahun/$bab")({
  head: ({ params }) => {
    const title = `Buku ${params.tahun} Bab ${params.bab} — Annyeong`;
    const description = `Baca PDF dan dengarkan audio Buku EPS-TOPIK ${params.tahun} Bab ${params.bab}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: ({ params }) => {
    if (!cariBab(params.tahun, params.bab)) throw notFound();
    return null;
  },
  component: BacaBab,
});

const kecepatan = [0.5, 0.75, 1] as const;

function formatWaktu(detik: number) {
  if (!Number.isFinite(detik)) return "0:00";
  const menit = Math.floor(detik / 60);
  const sisa = Math.floor(detik % 60);
  return `${menit}:${String(sisa).padStart(2, "0")}`;
}

function PemutarAudio({ tracks }: { tracks: AudioTrack[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [indexTrack, setIndexTrack] = useState(0);
  const [rate, setRate] = useState<number>(1);
  const [main, setMain] = useState(false);
  const [posisi, setPosisi] = useState(0);
  const [durasi, setDurasi] = useState(0);

  const track = tracks[indexTrack];

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate, indexTrack]);

  function togglePutar() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.playbackRate = rate;
      void audio.play();
    } else {
      audio.pause();
    }
  }

  if (!track) return null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
      <audio
        ref={audioRef}
        src={track.url}
        preload="metadata"
        onPlay={() => setMain(true)}
        onPause={() => setMain(false)}
        onTimeUpdate={(event) => setPosisi(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDurasi(event.currentTarget.duration)}
        onEnded={() => setMain(false)}
      />

      <div className="flex flex-wrap items-center gap-2">
        {kecepatan.map((nilai) => (
          <button
            key={nilai}
            type="button"
            onClick={() => setRate(nilai)}
            aria-pressed={rate === nilai}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              rate === nilai
                ? "bg-primary text-primary-foreground"
                : "bg-primary-soft text-primary hover:bg-primary/15"
            }`}
          >
            {nilai}x
          </button>
        ))}

        <div className="ml-auto flex flex-wrap gap-2">
          {tracks.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setIndexTrack(index)}
              aria-pressed={index === indexTrack}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                index === indexTrack
                  ? "bg-highlight text-highlight-foreground"
                  : "bg-primary-soft text-primary hover:bg-primary/15"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          onClick={togglePutar}
          aria-label={main ? "Jeda audio" : "Putar audio"}
          className="h-11 w-11 shrink-0 rounded-full shadow-primary"
        >
          {main ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        <input
          type="range"
          min={0}
          max={durasi || 0}
          step={0.1}
          value={posisi}
          aria-label="Posisi audio"
          onChange={(event) => {
            const nilai = Number(event.target.value);
            setPosisi(nilai);
            if (audioRef.current) audioRef.current.currentTime = nilai;
          }}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary-soft accent-primary"
        />

        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {formatWaktu(posisi)} / {formatWaktu(durasi)}
        </span>
      </div>
    </div>
  );
}

function BacaBab() {
  const { tahun, bab: nomorBab } = Route.useParams();
  const buku = cariBuku(tahun);
  const bab = cariBab(tahun, nomorBab);
  if (!buku || !bab) return null;

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-10 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/buku/$tahun" params={{ tahun }} aria-label="Kembali ke daftar bab">
            <ArrowLeft /> {buku.label}
          </Link>
        </Button>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold">
              Buku {buku.tahun} | Bab {bab.nomor}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {bab.judul} · {bab.judulKorea}
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <a href={bab.pdfUrl} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" /> Unduh PDF
            </a>
          </Button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
          <PdfLazy url={bab.pdfUrl} />
        </div>

        <div className="sticky bottom-4 mt-4">
          <PemutarAudio tracks={bab.tracks} />
        </div>
      </div>
    </main>
  );
}
