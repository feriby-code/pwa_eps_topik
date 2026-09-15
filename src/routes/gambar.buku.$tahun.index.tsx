import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { babGambar, gambarBuku, tahunGambar } from "@/lib/gambar-data";

export const Route = createFileRoute("/gambar/buku/$tahun/")({
  head: ({ params }) => {
    const title = `Gambar Buku ${params.tahun} — Annyeong`;
    const description = `Daftar bab gambar kosa kata Buku EPS-TOPIK ${params.tahun}.`;
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
    if (!tahunGambar.includes(params.tahun as (typeof tahunGambar)[number])) throw notFound();
    return null;
  },
  component: DaftarBabGambar,
});

function DaftarBabGambar() {
  const { tahun } = Route.useParams();
  const bab = babGambar(tahun);

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/gambar" aria-label="Kembali ke menu gambar">
            <ArrowLeft /> Gambar
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">Gambar | Buku {tahun}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {gambarBuku(tahun).length} gambar dalam {bab.length} bab.
        </p>

        <div className="mt-5 space-y-3">
          {bab.map((nomor) => (
            <Link
              key={nomor}
              to="/gambar/buku/$tahun/$bab"
              params={{ tahun, bab: String(nomor) }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Images className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm">Bab {nomor}</strong>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {gambarBuku(tahun, nomor).length} gambar
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
