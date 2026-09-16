import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { UbtCategoryMenu } from "@/components/uji-kemampuan/ubt/ubt-category-menu";
import { UbtExamLandscape } from "@/components/uji-kemampuan/ubt/ubt-exam-landscape";
import { UbtKategori, UbtSet } from "@/components/uji-kemampuan/ubt/types";

export const Route = createFileRoute("/uji-kemampuan/ubt/")({
  head: () => ({
    meta: [
      { title: "Simulasi UBT — Uji Kemampuan EPS-TOPIK" },
      {
        name: "description",
        content:
          "Simulasi Ujian Berbasis Komputer/Tablet (UBT) EPS-TOPIK standar resmi dengan format landscape, timer, pembagian soal bacaan & pendengaran, serta review kunci jawaban.",
      },
    ],
  }),
  component: UbtPage,
});

function UbtPage() {
  const navigate = useNavigate();
  const [activeSet, setActiveSet] = useState<UbtSet | null>(null);
  const [activeKategori, setActiveKategori] = useState<UbtKategori | null>(null);

  const handlePilihSet = (set: UbtSet, kategori: UbtKategori) => {
    setActiveSet(set);
    setActiveKategori(kategori);
  };

  const handleKembaliKeMenu = () => {
    setActiveSet(null);
    setActiveKategori(null);
  };

  const handleKembaliKeUjiKemampuan = () => {
    navigate({ to: "/uji-kemampuan" });
  };

  // Jika sedang mengerjakan soal / melihat hasil UBT (mode Landscape)
  if (activeSet && activeKategori) {
    return (
      <main className="min-h-screen bg-zinc-950">
        <UbtExamLandscape
          setUjian={activeSet}
          kategori={activeKategori}
          onSelesaiDanKembaliKeMenu={handleKembaliKeMenu}
        />
      </main>
    );
  }

  // Jika di menu pemilihan Kategori & Set UBT (Layar 1 & Layar 2)
  return (
    <main className="min-h-screen bg-app-canvas pb-24 pt-4">
      <UbtCategoryMenu
        onPilihSet={handlePilihSet}
        onKembaliKeUjiKemampuan={handleKembaliKeUjiKemampuan}
      />
      <AppBottomNav />
    </main>
  );
}
