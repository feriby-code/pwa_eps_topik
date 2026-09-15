import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Check, Headphones, Image, Languages, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import { SumberBuku } from "@/components/uji-kemampuan/data-soal";
import { TebakHuruf } from "@/components/uji-kemampuan/tebak-huruf";
import { TebakGambar } from "@/components/uji-kemampuan/tebak-gambar";
import { TebakKata } from "@/components/uji-kemampuan/tebak-kata";
import { TebakPendengaran } from "@/components/uji-kemampuan/tebak-pendengaran";

export const Route = createFileRoute("/uji-kemampuan/tebak-tebakan/")({
  head: () => ({
    meta: [
      { title: "Tebak-Tebakan — Uji Kemampuan Annyeong" },
      {
        name: "description",
        content:
          "Uji kemampuan bahasa Korea EPS-TOPIK: Huruf Dasar, Gambar, Kata, dan Pendengaran.",
      },
    ],
  }),
  component: TebakTebakanPage,
});

type Mode = "menu" | "huruf" | "gambar" | "kata" | "pendengaran";

function TebakTebakanPage() {
  const [selectedKategori, setSelectedKategori] = useState<
    "Huruf Dasar" | "Gambar" | "Kata" | "Pendengaran" | null
  >(null);
  const [sumber, setSumber] = useState<SumberBuku>("gabungan");
  const [aktifMode, setAktifMode] = useState<Mode>("menu");

  const handleMulai = () => {
    if (!selectedKategori) return;
    if (selectedKategori === "Huruf Dasar") setAktifMode("huruf");
    else if (selectedKategori === "Gambar") setAktifMode("gambar");
    else if (selectedKategori === "Kata") setAktifMode("kata");
    else if (selectedKategori === "Pendengaran") setAktifMode("pendengaran");
  };

  const handleKembaliKeMenu = () => {
    setAktifMode("menu");
  };

  if (aktifMode === "huruf") {
    return (
      <main className="min-h-screen bg-app-canvas pb-24 pt-4">
        <TebakHuruf sumber={sumber} onKembali={handleKembaliKeMenu} />
        <AppBottomNav />
      </main>
    );
  }

  if (aktifMode === "gambar") {
    return (
      <main className="min-h-screen bg-app-canvas pb-24 pt-4">
        <TebakGambar sumber={sumber} onKembali={handleKembaliKeMenu} />
        <AppBottomNav />
      </main>
    );
  }

  if (aktifMode === "kata") {
    return (
      <main className="min-h-screen bg-app-canvas pb-24 pt-4">
        <TebakKata sumber={sumber} onKembali={handleKembaliKeMenu} />
        <AppBottomNav />
      </main>
    );
  }

  if (aktifMode === "pendengaran") {
    return (
      <main className="min-h-screen bg-app-canvas pb-24 pt-4">
        <TebakPendengaran sumber={sumber} onKembali={handleKembaliKeMenu} />
        <AppBottomNav />
      </main>
    );
  }

  const kategoriList = [
    { label: "Huruf Dasar", deskripsi: "Tirukan bunyi & cek kemiripan", icon: Languages },
    { label: "Gambar", deskripsi: "Tebak arti benda dari visual", icon: Image },
    { label: "Kata", deskripsi: "Jodohkan pasangan kata & arti", icon: BookOpen },
    { label: "Pendengaran", deskripsi: "Dengarkan suara & susun kalimat", icon: Headphones },
  ] as const;

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/uji-kemampuan" aria-label="Kembali ke menu uji kemampuan">
            <ArrowLeft className="mr-1 h-4 w-4" /> Uji Kemampuan
          </Link>
        </Button>

        {/* Header sesuai wireframe */}
        <div className="mt-4 border-b border-border pb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Uji Kemampuan
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">Tebak - Tebakan</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Pilih kategori latihan dan sumber buku untuk mulai menguji kemampuanmu.
          </p>
        </div>

        {/* 4 Pilihan Kategori */}
        <div className="mt-6 flex flex-col gap-3">
          {kategoriList.map((item) => {
            const isSelected = selectedKategori === item.label;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedKategori(item.label)}
                className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all shadow-soft ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground ring-2 ring-primary/40"
                    : "border-border bg-surface text-foreground hover:border-primary/40 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                      isSelected
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary-soft text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <strong className="block text-sm font-bold sm:text-base">{item.label}</strong>
                    <span
                      className={`text-xs ${
                        isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {item.deskripsi}
                    </span>
                  </div>
                </div>
                {isSelected && <Check className="h-5 w-5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Panel Berdasarkan Sumber Buku (sesuai wireframe) */}
        {selectedKategori && (
          <div className="mt-6 rounded-3xl border-2 border-primary/20 bg-surface p-5 shadow-soft animate-in fade-in zoom-in-95 duration-200">
            <span className="block text-center text-xs font-extrabold uppercase tracking-wide text-foreground">
              Berdasarkan :
            </span>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={sumber === "2015" ? "default" : "outline"}
                onClick={() => setSumber("2015")}
                className="rounded-xl py-5 text-xs font-bold"
              >
                Buku 2015
              </Button>
              <Button
                type="button"
                variant={sumber === "2024" ? "default" : "outline"}
                onClick={() => setSumber("2024")}
                className="rounded-xl py-5 text-xs font-bold"
              >
                Buku 2024
              </Button>
              <Button
                type="button"
                variant={sumber === "gabungan" ? "default" : "outline"}
                onClick={() => setSumber("gabungan")}
                className="rounded-xl py-5 text-xs font-bold"
              >
                Gabungan
              </Button>
            </div>

            <Button
              onClick={handleMulai}
              className="mt-5 w-full rounded-2xl bg-primary py-6 text-base font-extrabold shadow-soft hover:bg-primary/90"
            >
              <Sparkles className="mr-2 h-5 w-5" /> Mulai
            </Button>
          </div>
        )}
      </div>
      <AppBottomNav />
    </main>
  );
}
