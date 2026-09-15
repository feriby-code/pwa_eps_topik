import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LembarKata, getLembarKataList, SumberBuku } from "./data-soal";

type Props = {
  sumber: SumberBuku;
  onKembali: () => void;
};

export function TebakKata({ sumber, onKembali }: Props) {
  const [lembarList, setLembarList] = useState<LembarKata[]>([]);
  const [index, setIndex] = useState(0);
  // selectedKiri: id item kiri yang dipilih
  const [selectedKiri, setSelectedKiri] = useState<string | null>(null);
  // matches: Record<kiriId, kananTeks>
  const [matchedPairs, setMatchedPairs] = useState<Record<string, Record<string, string>>>({});
  const [selesai, setSelesai] = useState(false);

  useEffect(() => {
    setLembarList(getLembarKataList(sumber, 3));
  }, [sumber]);

  const currentLembar = lembarList[index];
  const curMatches = (currentLembar && matchedPairs[currentLembar.lembar]) || {};

  const handleKlikKiri = (id: string) => {
    // Jika sudah matched, boleh dilepas
    if (curMatches[id]) {
      setMatchedPairs((prev) => {
        const copy = { ...(prev[currentLembar.lembar] || {}) };
        delete copy[id];
        return { ...prev, [currentLembar.lembar]: copy };
      });
      setSelectedKiri(null);
      return;
    }
    setSelectedKiri(id);
  };

  const handleKlikKanan = (teksKanan: string) => {
    if (!selectedKiri || !currentLembar) return;

    // Pasangkan
    setMatchedPairs((prev) => {
      const lembarMatches = { ...(prev[currentLembar.lembar] || {}) };

      // Hapus jika ada kiri lain yang sudah memakai kanan ini
      Object.keys(lembarMatches).forEach((k) => {
        if (lembarMatches[k] === teksKanan) {
          delete lembarMatches[k];
        }
      });

      lembarMatches[selectedKiri] = teksKanan;
      return { ...prev, [currentLembar.lembar]: lembarMatches };
    });

    setSelectedKiri(null);
  };

  const hitungTotalSkor = () => {
    if (lembarList.length === 0) return 0;
    let totalBenar = 0;
    let totalSoal = 0;

    lembarList.forEach((lembar) => {
      const matches = matchedPairs[lembar.lembar] || {};
      lembar.kiri.forEach((item) => {
        totalSoal++;
        const targetKanan = lembar.pasangan[item.id];
        if (matches[item.id] === targetKanan) {
          totalBenar++;
        }
      });
    });

    return totalSoal > 0 ? Math.round((totalBenar / totalSoal) * 100) : 100;
  };

  if (!currentLembar) return null;

  if (selesai) {
    const skor = hitungTotalSkor();
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          UJI KEMAMPUAN | Tebak - Tebakan | Kata
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
              Selesai menjodohkan {lembarList.length} lembar kata
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
                setMatchedPairs({});
                setSelectedKiri(null);
                setSelesai(false);
                setLembarList(getLembarKataList(sumber, 3));
              }}
              className="w-full rounded-2xl py-6 text-sm font-semibold"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Ulangi Lembar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
          Uji Kemampuan | Tebak - Tebakan | Kata
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm font-bold">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">
          Lembar {currentLembar.lembar}
        </span>
        <span className="text-xs text-muted-foreground">
          {currentLembar.lembar} / {lembarList.length}
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground text-center">
        Pilih kata di kolom kiri, lalu pasangkan dengan arti di kolom kanan.
      </p>

      {/* Grid 2 Kolom Menjodohkan sesuai wireframe */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* Kolom Kiri: Soal */}
        <div className="flex flex-col gap-3">
          {currentLembar.kiri.map((item) => {
            const isSelected = selectedKiri === item.id;
            const hasMatch = !!curMatches[item.id];
            return (
              <button
                key={item.id}
                onClick={() => handleKlikKiri(item.id)}
                type="button"
                className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/40"
                    : hasMatch
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                    : "border-border bg-surface text-foreground hover:border-primary/50"
                }`}
              >
                <span className="text-xs opacity-75 font-bold">Soal {item.nomorUrut}</span>
                <span className="font-display text-base font-bold mt-0.5">{item.teks}</span>
              </button>
            );
          })}
        </div>

        {/* Kolom Kanan: Jawaban */}
        <div className="flex flex-col gap-3">
          {currentLembar.kanan.map((item) => {
            // Apakah item kanan ini sudah dipasangkan dengan suatu kiri?
            const matchedKiriId = Object.keys(curMatches).find(
              (k) => curMatches[k] === item.teks
            );
            const isMatched = !!matchedKiriId;

            return (
              <button
                key={item.id}
                onClick={() => handleKlikKanan(item.teks)}
                type="button"
                className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
                  isMatched
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                    : selectedKiri
                    ? "border-primary/60 bg-primary/5 text-foreground hover:bg-primary/20"
                    : "border-border bg-surface text-foreground hover:border-muted-foreground/40"
                }`}
              >
                <span className="text-xs opacity-75 font-bold">Jawaban {item.nomorUrut}</span>
                <span className="text-sm font-semibold mt-0.5 truncate max-w-full px-1">
                  {item.teks}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigasi */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedKiri(null);
            setIndex((prev) => Math.max(0, prev - 1));
          }}
          disabled={index === 0}
          className="flex-1 rounded-2xl py-6 font-semibold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Sebelumnya
        </Button>
        <Button
          onClick={() => {
            setSelectedKiri(null);
            if (index < lembarList.length - 1) {
              setIndex((prev) => prev + 1);
            } else {
              setSelesai(true);
            }
          }}
          className="flex-1 rounded-2xl bg-primary py-6 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {index < lembarList.length - 1 ? (
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
