import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CircleUserRound, LayoutDashboard, LogIn, LogOut, Mail, Phone, ShieldCheck, UserPlus } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { labelPeran, type Modul } from "@/lib/auth-types";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profil — Annyeong" },
      { name: "description", content: "Profil pengguna aplikasi belajar Annyeong." },
      { property: "og:title", content: "Profil — Annyeong" },
      { property: "og:description", content: "Profil pengguna aplikasi belajar Annyeong." },
    ],
  }),
  component: HalamanProfil,
});

const namaModul: Record<Modul, string> = {
  pengguna: "Pengguna",
  materi: "Materi Belajar",
  lembaga: "Lembaga",
  hasil: "Hasil Ujian",
};

function HalamanProfil() {
  const { pengguna, sudahSiap, keluar, modulKelola } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <main className="min-h-screen bg-app-canvas px-5 pb-28 pt-8 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Profil</h1>

          {!sudahSiap ? (
            <p className="mt-8 text-sm text-muted-foreground">Memuat…</p>
          ) : !pengguna ? (
            <section className="mt-6 rounded-2xl border border-border/70 bg-surface p-6 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft">
                <CircleUserRound className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-foreground">Belum masuk</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Masuk untuk menyimpan progres belajar dan mengakses menu sesuai peran Anda.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button asChild className="rounded-full">
                  <Link to="/masuk">
                    <LogIn /> Masuk
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/daftar">
                    <UserPlus /> Daftar
                  </Link>
                </Button>
              </div>
            </section>
          ) : (
            <>
              <section className="mt-6 rounded-2xl border border-border/70 bg-surface p-5">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-soft text-lg font-extrabold text-primary">
                    {pengguna.nama.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-bold text-foreground">{pengguna.nama}</p>
                    <Badge className="mt-1 rounded-full">
                      <ShieldCheck className="mr-1 h-3.5 w-3.5" /> {labelPeran[pengguna.peran]}
                    </Badge>
                  </div>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <dt className="sr-only">Email</dt>
                    <dd className="truncate text-foreground">{pengguna.email}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <dt className="sr-only">Nomor HP</dt>
                    <dd className="truncate text-foreground">{pengguna.no_hp}</dd>
                  </div>
                </dl>
              </section>

              <section className="mt-5 rounded-2xl border border-border/70 bg-surface p-5">
                <h2 className="text-sm font-bold text-foreground">Hak akses</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Semua data bisa dilihat.{" "}
                  {modulKelola.length > 0
                    ? `Anda juga bisa menambah, mengubah, dan menghapus: ${modulKelola
                        .map((modul) => namaModul[modul])
                        .join(", ")}.`
                    : "Akun ini hanya bisa melihat, tanpa mengubah data."}
                </p>
              </section>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                {pengguna.peran !== "siswa" ? (
                  <Button asChild className="rounded-full">
                    <Link to="/admin">
                      <LayoutDashboard /> Dashboard Admin
                    </Link>
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={async () => {
                    await keluar();
                    navigate({ to: "/", replace: true });
                  }}
                >
                  <LogOut /> Keluar
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <AppBottomNav />
    </>
  );
}
