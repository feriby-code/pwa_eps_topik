import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, FileText, Headphones } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth-context";
import { ambilEntri, ambilSemua, langganan, petaKosong } from "@/lib/admin-buku-store";
import { daftarBuku } from "@/lib/buku-data";

export const Route = createFileRoute("/admin/buku/")({
  head: () => ({
    meta: [
      { title: "Kelola Buku — Dashboard Admin Annyeong" },
      {
        name: "description",
        content: "Unggah dan atur berkas PDF serta audio asli untuk setiap bab buku EPS-TOPIK.",
      },
      { property: "og:title", content: "Kelola Buku — Dashboard Admin Annyeong" },
      {
        property: "og:description",
        content: "Isi setiap bab buku EPS-TOPIK dengan berkas PDF dan audio asli.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HalamanKelolaBuku,
});

function HalamanKelolaBuku() {
  const { pengguna, sudahSiap } = useAuth();
  const navigate = useNavigate();
  useSyncExternalStore(langganan, ambilSemua, () => petaKosong);

  useEffect(() => {
    if (sudahSiap && !pengguna) navigate({ to: "/masuk", replace: true });
  }, [sudahSiap, pengguna, navigate]);

  if (!sudahSiap || !pengguna) {
    return (
      <main className="grid min-h-screen place-items-center bg-app-canvas px-5">
        <p className="text-sm text-muted-foreground">Memuat…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-16 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/admin">
            <ArrowLeft /> Dashboard
          </Link>
        </Button>

        <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight">Kelola Buku</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pilih buku, lalu isi setiap bab dengan berkas PDF dan audio yang asli.
        </p>

        <div className="mt-6 grid gap-3">
          {daftarBuku.map((buku) => {
            const total = buku.bab.length;
            const jumlahPdf = buku.bab.filter((bab) => ambilEntri(buku.tahun, bab.nomor).pdf).length;
            const jumlahAudio = buku.bab.filter(
              (bab) => ambilEntri(buku.tahun, bab.nomor).audio.length > 0,
            ).length;
            const persen = Math.round(((jumlahPdf + jumlahAudio) / (total * 2)) * 100);

            return (
              <Link
                key={buku.tahun}
                to="/admin/buku/$tahun"
                params={{ tahun: buku.tahun }}
                className="group rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-extrabold">{buku.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{buku.deskripsi}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {total} bab
                  </Badge>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>

                <Progress value={persen} className="mt-4 h-1.5" />
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 font-semibold">
                    <FileText className="h-3.5 w-3.5 text-primary" /> PDF {jumlahPdf}/{total}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 font-semibold">
                    <Headphones className="h-3.5 w-3.5 text-primary" /> Audio {jumlahAudio}/{total}
                  </span>
                  <span className="ml-auto font-bold text-primary">{persen}% terisi</span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-6 rounded-2xl border border-dashed border-border/70 bg-surface p-4 text-xs leading-6 text-muted-foreground">
          Tahap ini masih tampilan saja. Berkas yang Anda pilih bisa langsung dipratinjau di
          peramban, dan nama berkasnya tercatat. Penyimpanan permanen menyusul saat bagian server
          dikerjakan.
        </p>
      </div>
    </main>
  );
}
