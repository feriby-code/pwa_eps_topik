import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Lightbulb, Plus } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { polaBySlug } from "@/lib/tata-bahasa-data";

export const Route = createFileRoute("/tata-bahasa/$slug")({
  loader: ({ params }) => {
    const pola = polaBySlug(params.slug);
    if (!pola) throw notFound();
    return pola;
  },
  head: ({ loaderData }) => {
    const judul = loaderData ? `${loaderData.pola} — Tata Bahasa Annyeong` : "Tata Bahasa — Annyeong";
    const deskripsi = loaderData
      ? `${loaderData.pola} (${loaderData.arti}): ${loaderData.pengertian}`
      : "Pola tata bahasa Korea EPS-TOPIK.";
    return {
      meta: [
        { title: judul },
        { name: "description", content: deskripsi },
        { property: "og:title", content: judul },
        { property: "og:description", content: deskripsi },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DetailTataBahasa,
});

function DetailTataBahasa() {
  const pola = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/tata-bahasa" aria-label="Kembali ke menu tata bahasa">
            <ArrowLeft /> Tata Bahasa
          </Link>
        </Button>

        <h1 className="mt-6 text-center font-display text-3xl font-extrabold">{pola.pola}</h1>

        <section className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-soft">
          <h2 className="font-display text-sm font-extrabold">Arti</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{pola.arti}</p>

          <h2 className="mt-4 font-display text-sm font-extrabold">Pengertian</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{pola.pengertian}</p>

          <h2 className="mt-4 font-display text-sm font-extrabold">Cara Penggunaan</h2>
          <p className="mt-1 text-xs text-muted-foreground">({pola.catatanPenggunaan})</p>

          <div className="mt-3 space-y-3">
            {pola.rumus.map((item) => (
              <div
                key={`${item.kondisi ?? ""}-${item.kanan}`}
                className="overflow-hidden rounded-xl border border-border"
              >
                {item.kondisi ? (
                  <p className="border-b border-border bg-muted px-3 py-2 text-xs font-bold">
                    {item.kondisi}
                  </p>
                ) : null}
                <p className="flex flex-wrap items-center justify-center gap-2 px-3 py-3 font-display text-sm font-extrabold">
                  <span>{item.kiri}</span>
                  <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-primary">{item.kanan}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-border bg-surface p-5 shadow-soft">
          <h2 className="font-display text-sm font-extrabold">Contoh</h2>
          <ul className="mt-2 space-y-3">
            {pola.contoh.map((item) => (
              <li key={item.korea}>
                <p className="text-sm font-bold">{item.korea}</p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{item.arti}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-2xl border border-border bg-primary-soft/60 p-5">
          <h2 className="flex items-center gap-2 font-display text-sm font-extrabold">
            <Lightbulb className="h-4 w-4 text-primary" /> Tips
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-muted-foreground">
            {pola.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      </div>
      <AppBottomNav />
    </main>
  );
}
