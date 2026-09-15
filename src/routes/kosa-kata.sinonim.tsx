import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { KosakataPasangan } from "@/components/kosakata-pasangan";
import { daftarSinonim } from "@/lib/kosakata-data";

export const Route = createFileRoute("/kosa-kata/sinonim")({
  head: () => ({
    meta: [
      { title: "Sinonim Kosa Kata Korea — Annyeong" },
      {
        name: "description",
        content: "Kumpulan sinonim kosa kata Korea beserta artinya dalam bahasa Indonesia.",
      },
      { property: "og:title", content: "Sinonim Kosa Kata Korea — Annyeong" },
      {
        property: "og:description",
        content: "Pelajari kata-kata Korea yang punya makna sama.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SinonimPage,
});

function SinonimPage() {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/kosa-kata" aria-label="Kembali ke menu kosa kata">
            <ArrowLeft /> Kosa Kata
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold">Kosa Kata | Sinonim</h1>

        <KosakataPasangan data={daftarSinonim} />
      </div>
      <AppBottomNav />
    </main>
  );
}
