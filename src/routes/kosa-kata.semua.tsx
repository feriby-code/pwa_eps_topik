import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { KosakataTabel } from "@/components/kosakata-tabel";
import { daftarKosakata } from "@/lib/kosakata-data";

export const Route = createFileRoute("/kosa-kata/semua")({
  head: () => ({
    meta: [
      { title: "Semua Kosa Kata — Annyeong" },
      {
        name: "description",
        content:
          "Daftar lengkap kosa kata Korea–Indonesia EPS-TOPIK dengan pencarian, penyaringan kelas kata, dan mode sembunyikan arti.",
      },
      { property: "og:title", content: "Semua Kosa Kata — Annyeong" },
      {
        property: "og:description",
        content: "Cari dan hafalkan kosa kata Korea–Indonesia dari semua buku EPS-TOPIK.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SemuaKosaKata,
});

function SemuaKosaKata() {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/kosa-kata" aria-label="Kembali ke menu kosa kata">
            <ArrowLeft /> Kosa Kata
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">
          Kosa Kata | Semua Kosa Kata
        </h1>

        <KosakataTabel data={daftarKosakata} />
      </div>
      <AppBottomNav />
    </main>
  );
}
