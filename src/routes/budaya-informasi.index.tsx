// src/routes/budaya-informasi.index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { budayaKategori } from "@/lib/budaya-data";

export const Route = createFileRoute("/budaya-informasi/")({
  head: () => ({
    meta: [
      { title: "Budaya & Informasi — PWA EPS-TOPIK" },
      {
        name: "description",
        content:
          "Materi budaya Korea, hari besar, asuransi pekerja, imigrasi, dan transportasi untuk persiapan EPS-TOPIK.",
      },
      { property: "og:title", content: "Budaya & Informasi — PWA EPS-TOPIK" },
      {
        property: "og:description",
        content: "Materi budaya, hari besar, asuransi, imigrasi, dan transportasi Korea.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BudayaInformasiPage,
});

function BudayaInformasiPage() {
  const [aktif, setAktif] = useState<string | null>(null);
  const [hilangkanArti, setHilangkanArti] = useState(false);
  const kategori = budayaKategori.find((k) => k.id === aktif);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          {kategori ? (
            <button
              onClick={() => setAktif(null)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border"
              aria-label="Kembali ke daftar kategori"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <Link
              to="/"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border"
              aria-label="Kembali ke menu utama"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
          <h1 className="min-w-0 flex-1 truncate text-base font-bold">
            {kategori ? kategori.judul : "Budaya & Informasi"}
          </h1>
          {kategori && (
            <button
              onClick={() => setHilangkanArti((v) => !v)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold"
            >
              {hilangkanArti ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {hilangkanArti ? "Tampilkan Arti" : "Hilangkan Arti"}
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {!kategori ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {budayaKategori.map((k) => (
              <li key={k.id}>
                <button
                  onClick={() => setAktif(k.id)}
                  className="w-full rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
                >
                  <p className="text-sm font-bold text-foreground">{k.judul}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{k.ringkas}</p>
                  <p className="mt-2 text-xs font-semibold text-primary">{k.items.length} materi</p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="space-y-2">
            {kategori.items.map((item, i) => (
              <li
                key={item.ko}
                className="rounded-xl border border-border bg-card px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-muted text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{item.ko}</p>
                    {!hilangkanArti && (
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.arti}</p>
                    )}
                    {!hilangkanArti && item.catatan && (
                      <p className="mt-1 text-xs text-primary">{item.catatan}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}
