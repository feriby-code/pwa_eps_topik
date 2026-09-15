import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { KosakataTabel } from "@/components/kosakata-tabel";
import { kosakataBuku, tahunKosakata } from "@/lib/kosakata-data";

export const Route = createFileRoute("/kosa-kata/buku/$tahun/$bab")({
  head: ({ params }) => {
    const title = `Kosa Kata Buku ${params.tahun} Bab ${params.bab} — Annyeong`;
    const description = `Kosa kata Korea–Indonesia Buku EPS-TOPIK ${params.tahun} bab ${params.bab}.`;
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
    const tahunValid = tahunKosakata.includes(params.tahun as (typeof tahunKosakata)[number]);
    if (!tahunValid || kosakataBuku(params.tahun, Number(params.bab)).length === 0) throw notFound();
    return null;
  },
  component: KosakataBab,
});

function KosakataBab() {
  const { tahun, bab } = Route.useParams();
  const data = kosakataBuku(tahun, Number(bab));

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link
            to="/kosa-kata/buku/$tahun"
            params={{ tahun }}
            aria-label={`Kembali ke daftar bab Buku ${tahun}`}
          >
            <ArrowLeft /> Buku {tahun}
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">
          Kosa Kata | Buku {tahun} | Bab {bab}
        </h1>

        <KosakataTabel data={data} />
      </div>
      <AppBottomNav />
    </main>
  );
}
