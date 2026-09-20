import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { MODE_DEMO } from "@/lib/auth-config";
import { akunDemo } from "@/lib/auth-client";
import { labelPeran } from "@/lib/auth-types";

export const Route = createFileRoute("/masuk")({
  head: () => ({
    meta: [
      { title: "Masuk — Annyeong" },
      { name: "description", content: "Masuk ke Annyeong memakai email atau nomor HP dan kata sandi." },
      { property: "og:title", content: "Masuk — Annyeong" },
      { property: "og:description", content: "Masuk ke Annyeong memakai email atau nomor HP dan kata sandi." },
    ],
  }),
  component: HalamanMasuk,
});

function HalamanMasuk() {
  const { masuk, pengguna, sudahSiap } = useAuth();
  const navigate = useNavigate();
  const [identitas, setIdentitas] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [sedangKirim, setSedangKirim] = useState(false);

  useEffect(() => {
    if (sudahSiap && pengguna) navigate({ to: "/profil", replace: true });
  }, [sudahSiap, pengguna, navigate]);

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    if (!identitas.trim() || !kataSandi) {
      toast.error("Email/No HP dan kata sandi wajib diisi.");
      return;
    }
    setSedangKirim(true);
    try {
      const akun = await masuk({ identitas, kata_sandi: kataSandi });
      toast.success(`Selamat datang, ${akun.nama}!`);
      navigate({ to: akun.peran === "siswa" ? "/profil" : "/admin", replace: true });
    } catch (galat) {
      toast.error(galat instanceof Error ? galat.message : "Gagal masuk.");
    } finally {
      setSedangKirim(false);
    }
  }

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-16 pt-8 sm:px-8">
      <div className="mx-auto max-w-md">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/" aria-label="Kembali ke beranda">
            <ArrowLeft /> Kembali
          </Link>
        </Button>

        <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-foreground">Masuk</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gunakan email atau nomor HP yang terdaftar beserta kata sandi Anda.
        </p>

        <form onSubmit={kirim} className="mt-7 space-y-4 rounded-2xl border border-border/70 bg-surface p-5">
          <div className="space-y-2">
            <Label htmlFor="identitas">Email atau Nomor HP</Label>
            <Input
              id="identitas"
              autoComplete="username"
              placeholder="contoh@email.com atau 0812xxxxxxx"
              value={identitas}
              onChange={(e) => setIdentitas(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kata-sandi">Kata Sandi</Label>
            <Input
              id="kata-sandi"
              type="password"
              autoComplete="current-password"
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={sedangKirim}>
            <LogIn /> {sedangKirim ? "Memproses…" : "Masuk"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link to="/daftar" className="font-semibold text-primary">
              Daftar sekarang
            </Link>
          </p>
        </form>

        {MODE_DEMO ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border/70 bg-surface/70 p-4 text-sm">
            <p className="font-semibold text-foreground">Akun uji coba (mode tanpa database)</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {akunDemo.map((akun) => (
                <li key={akun.email}>
                  <span className="font-semibold text-foreground">{labelPeran[akun.peran]}</span>: {akun.email} atau{" "}
                  {akun.no_hp} — kata sandi <span className="font-semibold">{akun.kata_sandi}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </main>
  );
}
