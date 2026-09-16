import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Eye,
  GraduationCap,
  Headphones,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/uji-kemampuan/")({
  head: () => ({
    meta: [
      { title: "Uji Kemampuan — Annyeong" },
      {
        name: "description",
        content:
          "Uji kemampuan bahasa Korea EPS-TOPIK: Tebak-Tebakan, Materi Reading, Materi Listening, Test Buta Warna, dan UBT.",
      },
    ],
  }),
  component: UjiKemampuanIndex,
});

export function UjiKemampuanIndex() {
  const [modalComingSoon, setModalComingSoon] = useState<string | null>(null);

  const daftarMenu = [
    {
      id: "tebak-tebakan",
      judul: "Tebak - Tebakan",
      deskripsi: "Huruf dasar, gambar, kata, dan pendengaran",
      icon: HelpCircle,
      aktif: true,
      to: "/uji-kemampuan/tebak-tebakan" as const,
      badge: "Tersedia",
    },
    {
      id: "reading",
      judul: "Materi Reading",
      deskripsi: "Latihan membaca teks & soal bacaan EPS-TOPIK",
      icon: BookOpen,
      aktif: false,
      badge: "Coming Soon",
    },
    {
      id: "listening",
      judul: "Materi Listening",
      deskripsi: "Latihan mendengar dialog percakapan EPS-TOPIK",
      icon: Headphones,
      aktif: false,
      badge: "Coming Soon",
    },
    {
      id: "buta-warna",
      judul: "Test Buta Warna",
      deskripsi: "Simulasi tes plates Ishihara pra-medikal",
      icon: Eye,
      aktif: false,
      badge: "Coming Soon",
    },
    {
      id: "ubt",
      judul: "UBT",
      deskripsi: "Simulasi ujian berbasis tablet/komputer resmi EPS-TOPIK",
      icon: GraduationCap,
      aktif: true,
      to: "/uji-kemampuan/ubt" as const,
      badge: "Tersedia",
    },
  ];

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/" aria-label="Kembali ke beranda">
            <ArrowLeft className="mr-1 h-4 w-4" /> Beranda
          </Link>
        </Button>

        {/* Header menu uji kemampuan */}
        <div className="mt-4 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold sm:text-3xl">UJI KEMAMPUAN</h1>
              <p className="text-xs text-muted-foreground">
                Ukur dan latih pemahaman bahasa Korea EPS-TOPIK
              </p>
            </div>
          </div>
        </div>

        {/* List Menu sesuai gambar Canva */}
        <div className="mt-6 flex flex-col gap-3">
          {daftarMenu.map((item) => {
            const Icon = item.icon;
            if (item.aktif && item.to) {
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className="group flex items-center justify-between rounded-2xl border-2 border-primary/30 bg-surface p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="block text-base font-bold text-foreground">
                          {item.judul}
                        </strong>
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.deskripsi}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setModalComingSoon(item.judul)}
                className="group flex items-center justify-between rounded-2xl border border-border bg-surface/70 p-4 text-left transition-all hover:bg-surface"
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="block text-base font-bold text-foreground/80">
                        {item.judul}
                      </strong>
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.deskripsi}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-muted-foreground/70">Soon</span>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!modalComingSoon} onOpenChange={(open) => !open && setModalComingSoon(null)}>
        <DialogContent className="max-w-sm rounded-3xl p-6 text-center">
          <DialogHeader className="items-center text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-amber-500/15 text-amber-600 mb-2">
              <Sparkles className="h-6 w-6" />
            </span>
            <DialogTitle className="text-lg font-bold">{modalComingSoon}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Fitur ini sedang dalam tahap pengembangan dan akan segera hadir pada pembaruan
              berikutnya.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              onClick={() => setModalComingSoon(null)}
              className="w-full rounded-xl bg-primary font-bold"
            >
              Mengerti
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AppBottomNav />
    </main>
  );
}
