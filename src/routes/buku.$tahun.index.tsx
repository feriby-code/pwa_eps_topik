import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { cariBuku } from "@/lib/buku-data";

export const Route = createFileRoute("/buku/$tahun/")({
  head: ({ params }) => {
    const title = `Buku ${params.tahun} — Annyeong`;
    const description = `Daftar bab Buku EPS-TOPIK ${params.tahun} lengkap dengan PDF dan audio.`;
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
  component: DaftarBab,
});

function DaftarBab() {
  const { tahun } = Route.useParams();
  const buku = cariBuku(tahun);
  if (!buku) return null;

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/buku" aria-label="Kembali ke menu buku">
            <ArrowLeft /> Buku
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">{buku.label}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{buku.deskripsi}</p>

        <div className="mt-5 space-y-3">
          {buku.bab.map((bab) => (
            <Link
              key={bab.nomor}
              to="/buku/$tahun/$bab"
              params={{ tahun: buku.tahun, bab: String(bab.nomor) }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm">
                  Buku {buku.tahun} | Bab {bab.nomor}
                </strong>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {bab.judul} · {bab.judulKorea}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
      <AppBottomNav />
    </main>
  );
}
