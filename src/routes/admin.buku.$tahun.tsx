import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDashed,
  Eye,
  FileText,
  Headphones,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { Suspense, lazy, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/lib/auth-context";
import { cariBuku, type Bab } from "@/lib/buku-data";
import {
  ambilEntri,
  ambilSemua,
  formatUkuran,
  hapusAudio,
  hapusPdf,
  langganan,
  petaKosong,
  setPdf,
  tambahAudio,
  ubahLabelAudio,
} from "@/lib/admin-buku-store";

const PdfViewer = lazy(() =>
  import("@/components/PdfViewer").then((modul) => ({ default: modul.PdfViewer })),
);

export const Route = createFileRoute("/admin/buku/$tahun")({
  head: ({ params }) => {
    const title = `Kelola Buku ${params.tahun} — Dashboard Admin Annyeong`;
    const description = `Unggah berkas PDF dan audio asli untuk setiap bab Buku EPS-TOPIK ${params.tahun}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: ({ params }) => {
    if (!cariBuku(params.tahun)) throw notFound();
    return null;
  },
  component: HalamanKelolaTahun,
});

function HalamanKelolaTahun() {
  const { tahun } = Route.useParams();
  const { pengguna, sudahSiap } = useAuth();
  const navigate = useNavigate();
  const [pratinjau, setPratinjau] = useState<{ judul: string; url: string } | null>(null);
  useSyncExternalStore(langganan, ambilSemua, () => petaKosong);

  useEffect(() => {
    if (sudahSiap && !pengguna) navigate({ to: "/masuk", replace: true });
  }, [sudahSiap, pengguna, navigate]);

  const buku = cariBuku(tahun);

  if (!sudahSiap || !pengguna || !buku) {
    return (
      <main className="grid min-h-screen place-items-center bg-app-canvas px-5">
        <p className="text-sm text-muted-foreground">Memuat…</p>
      </main>
    );
  }

  const lengkap = buku.bab.filter((bab) => {
    const entri = ambilEntri(tahun, bab.nomor);
    return entri.pdf && entri.audio.length > 0;
  }).length;

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-16 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/admin/buku">
            <ArrowLeft /> Kelola Buku
          </Link>
        </Button>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">{buku.label}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{buku.deskripsi}</p>
          </div>
          <Badge variant="secondary" className="rounded-full">
            {lengkap}/{buku.bab.length} bab lengkap
          </Badge>
        </div>

        <Accordion type="multiple" className="mt-6 grid gap-3">
          {buku.bab.map((bab) => (
            <KartuBab key={bab.nomor} tahun={tahun} bab={bab} onPratinjau={setPratinjau} />
          ))}
        </Accordion>
      </div>

      <Dialog open={!!pratinjau} onOpenChange={(buka) => !buka && setPratinjau(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{pratinjau?.judul}</DialogTitle>
          </DialogHeader>
          {pratinjau && (
            <Suspense
              fallback={<div className="p-10 text-center text-sm text-muted-foreground">Memuat PDF…</div>}
            >
              <PdfViewer url={pratinjau.url} />
            </Suspense>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function KartuBab({
  tahun,
  bab,
  onPratinjau,
}: {
  tahun: string;
  bab: Bab;
  onPratinjau: (nilai: { judul: string; url: string }) => void;
}) {
  const entri = ambilEntri(tahun, bab.nomor);
  const inputPdf = useRef<HTMLInputElement>(null);
  const inputAudio = useRef<HTMLInputElement>(null);
  const siap = !!entri.pdf && entri.audio.length > 0;

  return (
    <AccordionItem
      value={`bab-${bab.nomor}`}
      className="rounded-2xl border border-border bg-surface px-4 shadow-soft"
    >
      <AccordionTrigger className="hover:no-underline">
        <div className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-extrabold text-primary">
            {bab.nomor}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{bab.judul}</p>
            <p className="truncate text-xs text-muted-foreground">{bab.judulKorea}</p>
          </div>
          <span className="ml-auto mr-2 flex shrink-0 items-center gap-1.5 text-xs font-semibold">
            {siap ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline text-primary">Lengkap</span>
              </>
            ) : (
              <>
                <CircleDashed className="h-4 w-4 text-muted-foreground" />
                <span className="hidden sm:inline text-muted-foreground">Belum lengkap</span>
              </>
            )}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pb-4">
        {/* PDF */}
        <section className="rounded-xl border border-border/70 bg-app-canvas p-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-extrabold uppercase tracking-wide">Berkas PDF</h3>
          </div>

          {entri.pdf ? (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-surface p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{entri.pdf.nama}</p>
                <p className="text-xs text-muted-foreground">
                  {formatUkuran(entri.pdf.ukuran)}
                  {!entri.pdf.url && " • perlu diunggah ulang di sesi ini"}
                </p>
              </div>
              {entri.pdf.url && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() =>
                    onPratinjau({
                      judul: `Bab ${bab.nomor} — ${bab.judul}`,
                      url: entri.pdf!.url,
                    })
                  }
                >
                  <Eye /> Pratinjau
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => inputPdf.current?.click()}
              >
                <Upload /> Ganti
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full text-destructive"
                onClick={() => hapusPdf(tahun, bab.nomor)}
                aria-label="Hapus PDF"
              >
                <Trash2 />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputPdf.current?.click()}
              className="mt-3 flex w-full flex-col items-center gap-1 rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-center transition-colors hover:border-primary/40"
            >
              <Upload className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">Pilih berkas PDF</span>
              <span className="text-xs text-muted-foreground">Satu berkas PDF per bab</span>
            </button>
          )}

          <input
            ref={inputPdf}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) setPdf(tahun, bab.nomor, file);
              event.currentTarget.value = "";
            }}
          />
        </section>

        {/* Audio */}
        <section className="mt-3 rounded-xl border border-border/70 bg-app-canvas p-3">
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-extrabold uppercase tracking-wide">
              Audio ({entri.audio.length})
            </h3>
            <Button
              size="sm"
              variant="outline"
              className="ml-auto rounded-full"
              onClick={() => inputAudio.current?.click()}
            >
              <Plus /> Tambah audio
            </Button>
          </div>

          {entri.audio.length === 0 ? (
            <p className="mt-3 rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-center text-xs text-muted-foreground">
              Belum ada audio. Anda bisa memilih beberapa berkas sekaligus.
            </p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {entri.audio.map((berkas) => (
                <li key={berkas.id} className="rounded-xl bg-surface p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      value={berkas.label}
                      onChange={(event) =>
                        ubahLabelAudio(tahun, bab.nomor, berkas.id, event.currentTarget.value)
                      }
                      className="h-9 w-32 rounded-lg"
                      aria-label="Nama track"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{berkas.nama}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatUkuran(berkas.ukuran)}
                        {!berkas.url && " • perlu diunggah ulang di sesi ini"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-destructive"
                      onClick={() => hapusAudio(tahun, bab.nomor, berkas.id)}
                      aria-label="Hapus audio"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                  {berkas.url && (
                    <audio src={berkas.url} controls preload="metadata" className="mt-2 w-full" />
                  )}
                </li>
              ))}
            </ul>
          )}

          <input
            ref={inputAudio}
            type="file"
            accept="audio/*"
            multiple
            className="hidden"
            onChange={(event) => {
              const files = Array.from(event.currentTarget.files ?? []);
              if (files.length) tambahAudio(tahun, bab.nomor, files);
              event.currentTarget.value = "";
            }}
          />
        </section>
      </AccordionContent>
    </AccordionItem>
  );
}
