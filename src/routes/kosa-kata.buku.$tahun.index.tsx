import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { babKosakata, kosakataBuku, tahunKosakata } from "@/lib/kosakata-data";

export const Route = createFileRoute("/kosa-kata/buku/$tahun/")({
  head: ({ params }) => {
    const title = `Kosa Kata Buku ${params.tahun} — Annyeong`;
    const description = `Daftar bab kosa kata Buku EPS-TOPIK ${params.tahun} Korea–Indonesia.`;
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
    if (!tahunKosakata.includes(params.tahun as (typeof tahunKosakata)[number])) throw notFound();
    return null;
  },
  component: DaftarBabKosakata,
});

function DaftarBabKosakata() {
  const { tahun } = Route.useParams();
  const bab = babKosakata(tahun);

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/kosa-kata" aria-label="Kembali ke menu kosa kata">
            <ArrowLeft /> Kosa Kata
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">Kosa Kata | Buku {tahun}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {kosakataBuku(tahun).length} kata dalam {bab.length} bab.
        </p>

        <div className="mt-5 space-y-3">
          {bab.map((nomor) => (
            <Link
              key={nomor}
              to="/kosa-kata/buku/$tahun/$bab"
              params={{ tahun, bab: String(nomor) }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm">Bab {nomor}</strong>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {kosakataBuku(tahun, nomor).length} kata
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
