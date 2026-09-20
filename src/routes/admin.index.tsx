import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, BookOpen, Building2, Construction, GraduationCap, LogOut, ShieldCheck, Trophy, Users } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { labelPeran, type Modul } from "@/lib/auth-types";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin — Annyeong" },
      { name: "description", content: "Dashboard pengelolaan data Annyeong untuk Super Admin dan LPK." },
      { property: "og:title", content: "Dashboard Admin — Annyeong" },
      { property: "og:description", content: "Dashboard pengelolaan data Annyeong untuk Super Admin dan LPK." },
    ],
  }),
  component: HalamanAdmin,
});

const kartuModul: { modul: Modul; label: string; keterangan: string; icon: typeof Users }[] = [
  { modul: "pengguna", label: "Pengguna", keterangan: "Kelola akun Super Admin, LPK, dan siswa", icon: Users },
  { modul: "materi", label: "Materi Belajar", keterangan: "Buku, kosa kata, hangeul, tata bahasa", icon: GraduationCap },
  { modul: "lembaga", label: "Lembaga", keterangan: "Data LPK dan informasi lembaga", icon: Building2 },
  { modul: "hasil", label: "Hasil Ujian", keterangan: "Nilai dan rekap uji kemampuan siswa", icon: Trophy },
];

function HalamanAdmin() {
  const { pengguna, sudahSiap, keluar, bisaKelola } = useAuth();
  const navigate = useNavigate();

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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Halo, {pengguna.nama}</h1>
            <Badge className="mt-2 rounded-full">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" /> {labelPeran[pengguna.peran]}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/profil">Profil</Link>
            </Button>
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={async () => {
                await keluar();
                navigate({ to: "/", replace: true });
              }}
            >
              <LogOut /> Keluar
            </Button>
          </div>
        </div>

        <h3 className="mt-7 text-sm font-bold text-foreground">Pengelolaan data</h3>
        <Link
          to="/admin/buku"
          className="group mt-3 flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <strong className="block text-sm">Buku</strong>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Unggah PDF dan audio asli untuk tiap bab
            </span>
          </span>
          <Badge variant="secondary" className="rounded-full">
            Siap dipakai
          </Badge>
        </Link>

        <section className="mt-3 rounded-2xl border border-dashed border-border/70 bg-surface p-5 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-muted">
            <Construction className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Menu lain (pengguna, lembaga, hasil ujian) masih disiapkan.
          </p>
        </section>

        <h3 className="mt-8 flex items-center gap-2 text-sm font-bold text-foreground">
          <BarChart3 className="h-4 w-4 text-primary" /> Hak akses Anda
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {kartuModul.map(({ modul, label, keterangan, icon: Icon }) => {
            const kelola = bisaKelola(modul);
            return (
              <article key={modul} className="rounded-2xl border border-border/70 bg-surface p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{label}</p>
                    <p className="truncate text-xs text-muted-foreground">{keterangan}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    Lihat
                  </Badge>
                  <Badge variant={kelola ? "default" : "outline"} className="rounded-full">
                    {kelola ? "Tambah / Ubah / Hapus" : "Tidak bisa mengubah"}
                  </Badge>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
