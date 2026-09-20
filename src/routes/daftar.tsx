import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/daftar")({
  head: () => ({
    meta: [
      { title: "Daftar Akun — Annyeong" },
      { name: "description", content: "Buat akun Annyeong dengan nama pengguna, email, nomor HP, dan kata sandi." },
      { property: "og:title", content: "Daftar Akun — Annyeong" },
      { property: "og:description", content: "Buat akun Annyeong dengan nama pengguna, email, nomor HP, dan kata sandi." },
    ],
  }),
  component: HalamanDaftar,
});

function HalamanDaftar() {
  const { daftar, pengguna, sudahSiap } = useAuth();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [ulangiKataSandi, setUlangiKataSandi] = useState("");
  const [sedangKirim, setSedangKirim] = useState(false);

  useEffect(() => {
    if (sudahSiap && pengguna) navigate({ to: "/profil", replace: true });
  }, [sudahSiap, pengguna, navigate]);

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim() || !email.trim() || !noHp.trim() || !kataSandi) {
      toast.error("Semua kolom wajib diisi.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Format email belum benar.");
      return;
    }
    if (!/^[0-9+][0-9\s-]{7,17}$/.test(noHp.trim())) {
      toast.error("Nomor HP hanya boleh angka, minimal 8 digit.");
      return;
    }
    if (kataSandi.length < 6) {
      toast.error("Kata sandi minimal 6 karakter.");
      return;
    }
    if (kataSandi !== ulangiKataSandi) {
      toast.error("Ulangi kata sandi belum sama.");
      return;
    }

    setSedangKirim(true);
    try {
      await daftar({ nama, email, no_hp: noHp, kata_sandi: kataSandi, peran: "siswa" });
      toast.success("Akun berhasil dibuat.");
      navigate({ to: "/profil", replace: true });
    } catch (galat) {
      toast.error(galat instanceof Error ? galat.message : "Gagal membuat akun.");
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

        <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-foreground">Daftar Akun</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Akun baru otomatis berperan sebagai <span className="font-semibold text-foreground">Siswa</span>. Peran LPK
          atau Super Admin diberikan oleh administrator.
        </p>

        <form onSubmit={kirim} className="mt-7 space-y-4 rounded-2xl border border-border/70 bg-surface p-5">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama Pengguna</Label>
            <Input id="nama" autoComplete="name" value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="no-hp">Nomor HP</Label>
            <Input
              id="no-hp"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0812xxxxxxx"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kata-sandi">Kata Sandi</Label>
            <Input
              id="kata-sandi"
              type="password"
              autoComplete="new-password"
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ulangi">Ulangi Kata Sandi</Label>
            <Input
              id="ulangi"
              type="password"
              autoComplete="new-password"
              value={ulangiKataSandi}
              onChange={(e) => setUlangiKataSandi(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={sedangKirim}>
            <UserPlus /> {sedangKirim ? "Memproses…" : "Daftar"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/masuk" className="font-semibold text-primary">
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
