import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { GambarGaleri } from "@/components/gambar-galeri";
import { gambarBuku, tahunGambar } from "@/lib/gambar-data";

export const Route = createFileRoute("/gambar/buku/$tahun/$bab")({
  head: ({ params }) => {
    const title = `Gambar Buku ${params.tahun} Bab ${params.bab} — Annyeong`;
    const description = `Gambar kosa kata Korea Buku EPS-TOPIK ${params.tahun} bab ${params.bab} dengan mode tes hafalan.`;
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
    const tahunValid = tahunGambar.includes(params.tahun as (typeof tahunGambar)[number]);
    if (!tahunValid || gambarBuku(params.tahun, Number(params.bab)).length === 0) throw notFound();
    return null;
  },
  component: GambarBab,
});

function GambarBab() {
  const { tahun, bab } = Route.useParams();
  const data = gambarBuku(tahun, Number(bab));

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link
            to="/gambar/buku/$tahun"
            params={{ tahun }}
            aria-label={`Kembali ke daftar bab Buku ${tahun}`}
          >
            <ArrowLeft /> Buku {tahun}
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">
          Gambar | Buku {tahun} | Bab {bab}
        </h1>

        <GambarGaleri data={data} />
      </div>
      <AppBottomNav />
    </main>
  );
}
