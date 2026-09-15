import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { GambarGaleri } from "@/components/gambar-galeri";
import { daftarGambar } from "@/lib/gambar-data";

export const Route = createFileRoute("/gambar/semua")({
  head: () => ({
    meta: [
      { title: "Semua Gambar — Annyeong" },
      {
        name: "description",
        content:
          "Semua gambar kosa kata Korea EPS-TOPIK dengan pencarian dan mode sembunyikan teks untuk tes hafalan.",
      },
      { property: "og:title", content: "Semua Gambar — Annyeong" },
      {
        property: "og:description",
        content: "Hafalkan kosa kata Korea lewat gambar dari Buku 2015 dan Buku 2024.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SemuaGambar,
});

function SemuaGambar() {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/gambar" aria-label="Kembali ke menu gambar">
            <ArrowLeft /> Gambar
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">Gambar | Semua Gambar</h1>

        <GambarGaleri data={daftarGambar} />
      </div>
      <AppBottomNav />
    </main>
  );
}
