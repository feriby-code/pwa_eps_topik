import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { KosakataPasangan } from "@/components/kosakata-pasangan";
import { daftarAntonim } from "@/lib/kosakata-data";

export const Route = createFileRoute("/kosa-kata/antonim")({
  head: () => ({
    meta: [
      { title: "Antonim Kosa Kata Korea — Annyeong" },
      {
        name: "description",
        content: "Kumpulan antonim atau lawan kata bahasa Korea beserta arti Indonesianya.",
      },
      { property: "og:title", content: "Antonim Kosa Kata Korea — Annyeong" },
      {
        property: "og:description",
        content: "Pelajari pasangan kata Korea yang berlawanan makna.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AntonimPage,
});

function AntonimPage() {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/kosa-kata" aria-label="Kembali ke menu kosa kata">
            <ArrowLeft /> Kosa Kata
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">Kosa Kata | Antonim</h1>

        <KosakataPasangan data={daftarAntonim} duaKolom />
      </div>
      <AppBottomNav />
    </main>
  );
}
