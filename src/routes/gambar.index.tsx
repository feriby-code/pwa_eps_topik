import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Layers } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { daftarGambar, gambarBuku } from "@/lib/gambar-data";

export const Route = createFileRoute("/gambar/")({
  head: () => ({
    meta: [
      { title: "Gambar — Annyeong" },
      {
        name: "description",
        content:
          "Belajar kosa kata Korea lewat gambar: semua gambar, Buku 2015, dan Buku 2024, lengkap dengan mode tes hafalan.",
      },
      { property: "og:title", content: "Gambar — Annyeong" },
      {
        property: "og:description",
        content: "Galeri gambar EPS-TOPIK dengan mode sembunyikan teks untuk melatih hafalan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GambarIndex,
});

const menu = [
  {
    label: "Semua Gambar",
    deskripsi: `${daftarGambar.length} gambar dari semua buku`,
    icon: Layers,
    to: "/gambar/semua" as const,
  },
  {
    label: "Buku 2015",
    deskripsi: `${gambarBuku("2015").length} gambar per bab edisi 2015`,
    icon: BookOpen,
    to: "/gambar/buku/$tahun" as const,
    params: { tahun: "2015" },
  },
  {
    label: "Buku 2024",
    deskripsi: `${gambarBuku("2024").length} gambar per bab edisi 2024`,
    icon: BookOpen,
    to: "/gambar/buku/$tahun" as const,
    params: { tahun: "2024" },
  },
];

function GambarIndex() {
  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/" aria-label="Kembali ke beranda">
            <ArrowLeft /> Kembali
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-3xl font-extrabold">Gambar</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pilih kumpulan gambar, lalu matikan teks untuk menguji hafalanmu.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                {...(item.params
                  ? { to: item.to, params: item.params }
                  : { to: item.to as "/gambar/semua" })}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block font-display text-sm font-extrabold">
                    {item.label}
                  </strong>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {item.deskripsi}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
      <AppBottomNav />
    </main>
  );
}
