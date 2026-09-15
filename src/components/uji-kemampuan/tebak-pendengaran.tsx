import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SoalPendengaran,
  SoalDengarKata,
  SoalDengarKalimat,
  getSoalPendengaranList,
  SumberBuku,
} from "./data-soal";
import { useBunyiHangeul } from "@/components/hangeul-audio";

type Props = {
  sumber: SumberBuku;
  onKembali: () => void;
};

export function TebakPendengaran({ sumber, onKembali }: Props) {
  const [soalList, setSoalList] = useState<SoalPendengaran[]>([]);
  const [index, setIndex] = useState(0);
  const [jawabanUserKata, setJawabanUserKata] = useState<Record<number, string>>({});
  // jawabanUserKalimat: Record<index, id_token[]>
  const [jawabanUserKalimat, setJawabanUserKalimat] = useState<Record<number, string[]>>({});
  const [selesai, setSelesai] = useState(false);
  const { bunyikan, teksAktif } = useBunyiHangeul();

  useEffect(() => {
    setSoalList(getSoalPendengaranList(sumber));
  }, [sumber]);

  const currentSoal = soalList[index];

  const handlePilihKata = (label: string) => {
    setJawabanUserKata((prev) => ({ ...prev, [index]: label }));
  };

  const handleKlikToken = (tokenId: string) => {
    setJawabanUserKalimat((prev) => {
      const arr = prev[index] ? [...prev[index]] : [];
      if (arr.includes(tokenId)) {
        // Hapus dari susunan jawaban jika diklik kembali
        return { ...prev, [index]: arr.filter((id) => id !== tokenId) };
      } else {
        // Tambahkan ke urutan jawaban
        return { ...prev, [index]: [...arr, tokenId] };
      }
    });
  };

  const hitungTotalSkor = () => {
    if (soalList.length === 0) return 0;
    let benar = 0;

    soalList.forEach((s, idx) => {
      if (s.tipe === "kata") {
        const pick = jawabanUserKata[idx];
        const correctOpt = s.pilihan.find((p) => p.benar)?.label;
        if (pick === correctOpt) benar++;
      } else {
        const arrangedIds = jawabanUserKalimat[idx] || [];
        const arrangedWords = arrangedIds.map((id) => {
          return s.kataTeracak.find((t) => t.id === id)?.teks || "";
        });
        if (
          arrangedWords.length === s.kataTersusun.length &&
          arrangedWords.join(" ") === s.kataTersusun.join(" ")
        ) {
          benar++;
        }
      }
    });

    return Math.round((benar / soalList.length) * 100);
  };

  if (!currentSoal) return null;

  if (selesai) {
    const skor = hitungTotalSkor();
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          UJI KEMAMPUAN | Tebak - Tebakan | Pendengaran
        </div>
        <Card className="mt-6 w-full max-w-sm rounded-3xl border-2 border-primary/20 bg-surface p-8 shadow-soft">
          <div className="text-xl font-extrabold text-foreground">Hasil Total</div>
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-3xl border-4 border-primary/30 bg-primary-soft">
              <span className="font-display text-5xl font-extrabold text-primary">
                {skor}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Selesai menjawab {soalList.length} soal pendengaran
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
                setJawabanUserKata({});
                setJawabanUserKalimat({});
                setSelesai(false);
                setSoalList(getSoalPendengaranList(sumber));
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

  const isKata = currentSoal.tipe === "kata";
  const kataSoal = isKata ? (currentSoal as SoalDengarKata) : null;
  const kalimatSoal = !isKata ? (currentSoal as SoalDengarKalimat) : null;

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
          Uji Kemampuan | Tebak - Tebakan | Pendengaran
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm font-bold">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">
          {isKata ? `Soal Kata ${index + 1}` : `Soal Kalimat ${index + 1}`}
        </span>
        <span className="text-xs text-muted-foreground">
          {index + 1} / {soalList.length}
        </span>
      </div>

      {/* Box Klik Dengarkan */}
      <div className="mt-6 flex flex-col items-center">
        <Button
          onClick={() => bunyikan(currentSoal.audioText)}
          className={`flex h-24 w-full max-w-sm flex-col items-center justify-center rounded-3xl border-2 transition-all shadow-soft ${
            teksAktif === currentSoal.audioText
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-surface text-foreground hover:bg-muted"
          }`}
        >
          <Volume2 className="h-7 w-7" />
          <span className="mt-2 text-base font-bold">Klik, Dengarkan</span>
        </Button>
      </div>

      {/* Konten Soal Kata */}
      {isKata && kataSoal && (
        <div className="mt-6 flex flex-col gap-2.5">
          {kataSoal.pilihan.map((item) => {
            const isSelected = jawabanUserKata[index] === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handlePilihKata(item.label)}
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
      )}

      {/* Konten Soal Kalimat (Menyusun urutan kata) */}
      {!isKata && kalimatSoal && (
        <div className="mt-6 flex flex-col">
          {/* Kotak Jawaban (Drop zone / arranged words) */}
          <div className="min-h-24 w-full rounded-2xl border-2 border-dashed border-border bg-muted/40 p-3 text-center">
            <span className="block text-xs font-bold text-muted-foreground mb-2">Jawaban:</span>
            <div className="flex flex-wrap gap-2 justify-center">
              {(jawabanUserKalimat[index] || []).length === 0 ? (
                <span className="text-xs text-muted-foreground italic py-2">
                  (Klik kata-kata di bawah sesuai urutan suara yang didengar)
                </span>
              ) : (
                (jawabanUserKalimat[index] || []).map((tokenId) => {
                  const token = kalimatSoal.kataTeracak.find((t) => t.id === tokenId);
                  if (!token) return null;
                  return (
                    <button
                      key={token.id}
                      onClick={() => handleKlikToken(token.id)}
                      className="rounded-xl bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-sm active:scale-95 transition-transform"
                      title="Klik untuk membatalkan"
                    >
                      {token.teks} ✕
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <span className="mt-4 text-xs font-semibold text-muted-foreground text-center">
            Pilihan Kata Teracak (Klik untuk menyusun):
          </span>

          {/* Chips kata acak sesuai wireframe: [Urutan Kata ...] */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {kalimatSoal.kataTeracak.map((token, i) => {
              const isUsed = (jawabanUserKalimat[index] || []).includes(token.id);
              return (
                <button
                  key={token.id}
                  disabled={isUsed}
                  onClick={() => handleKlikToken(token.id)}
                  className={`rounded-2xl border px-4 py-2.5 text-sm font-bold shadow-soft transition-all ${
                    isUsed
                      ? "opacity-30 border-dashed bg-muted text-muted-foreground cursor-not-allowed"
                      : "border-border bg-surface text-foreground hover:border-primary hover:bg-primary-soft"
                  }`}
                >
                  <span className="block text-[10px] text-muted-foreground font-medium">
                    Urutan Kata {i + 1}
                  </span>
                  {token.teks}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
