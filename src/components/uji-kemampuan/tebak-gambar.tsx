import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SoalGambar, getSoalGambar, SumberBuku } from "./data-soal";

type Props = {
  sumber: SumberBuku;
  onKembali: () => void;
};

export function TebakGambar({ sumber, onKembali }: Props) {
  const [soalList, setSoalList] = useState<SoalGambar[]>([]);
  const [index, setIndex] = useState(0);
  const [jawabanUser, setJawabanUser] = useState<Record<number, string>>({});
  const [selesai, setSelesai] = useState(false);

  useEffect(() => {
    setSoalList(getSoalGambar(sumber, 10));
  }, [sumber]);

  const currentSoal = soalList[index];

  const handlePilih = (label: string) => {
    setJawabanUser((prev) => ({ ...prev, [index]: label }));
  };

  const hitungTotalSkor = () => {
    if (soalList.length === 0) return 0;
    let benar = 0;
    soalList.forEach((s, idx) => {
      const userPick = jawabanUser[idx];
      const correctOption = s.pilihan.find((p) => p.benar)?.label;
      if (userPick === correctOption) {
        benar++;
      }
    });
    return Math.round((benar / soalList.length) * 100);
  };

  if (soalList.length === 0) return null;

  if (selesai) {
    const totalSkor = hitungTotalSkor();
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          UJI KEMAMPUAN | Tebak - Tebakan | Gambar
        </div>
        <Card className="mt-6 w-full max-w-sm rounded-3xl border-2 border-primary/20 bg-surface p-8 shadow-soft">
          <div className="text-xl font-extrabold text-foreground">Hasil Total</div>
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-3xl border-4 border-primary/30 bg-primary-soft">
              <span className="font-display text-5xl font-extrabold text-primary">
                {totalSkor}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Selesai menjawab {Object.keys(jawabanUser).length} dari {soalList.length} soal
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              onClick={onKembali}
              className="w-full rounded-2xl bg-primary py-6 text-base font-bold shadow-soft hover:bg-primary/90"
            >
              Kembali Menu Utama
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIndex(0);
                setJawabanUser({});
                setSelesai(false);
                setSoalList(getSoalGambar(sumber, 10));
              }}
              className="w-full rounded-2xl py-6 text-sm font-semibold"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Ulangi Soal
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const selectedAnswer = jawabanUser[index];

  return (
    <div className="mx-auto max-w-md p-4 sm:p-6">
      <div className="flex items-center justify-between border-b pb-3">
        <button
          onClick={onKembali}
          className="text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          ← Kembali
        </button>
        <span className="text-center text-xs font-bold uppercase tracking-wide text-foreground">
          Uji Kemampuan | Tebak - Tebakan | Gambar
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm font-bold">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">
          Soal {index + 1}
        </span>
        <span className="text-xs text-muted-foreground">
          {index + 1} / {soalList.length}
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        {/* Box Gambar */}
        <div className="flex h-44 w-full flex-col items-center justify-center rounded-3xl border-2 border-border bg-surface p-4 shadow-soft">
          <span className="text-6xl drop-shadow-sm">{currentSoal.gambar.emoji}</span>
          <span className="mt-2 text-xs font-semibold text-muted-foreground">
            Buku {currentSoal.gambar.tahun} • Bab {currentSoal.gambar.bab}
          </span>
        </div>

        {/* Pilihan A, B, C, D */}
        <div className="mt-6 flex w-full flex-col gap-2.5">
          {currentSoal.pilihan.map((item) => {
            const isSelected = selectedAnswer === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handlePilih(item.label)}
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left font-medium transition-all ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                    isSelected
                      ? "bg-primary-foreground text-primary"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                <span className="text-sm font-semibold">{item.teks}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigasi */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
          disabled={index === 0}
          className="flex-1 rounded-2xl py-6 font-semibold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Sebelumnya
        </Button>
        <Button
          onClick={() => {
            if (index < soalList.length - 1) {
              setIndex((prev) => prev + 1);
            } else {
              setSelesai(true);
            }
          }}
          className="flex-1 rounded-2xl bg-primary py-6 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {index < soalList.length - 1 ? (
            <>
              Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Lihat Hasil"
          )}
        </Button>
      </div>
    </div>
  );
}
