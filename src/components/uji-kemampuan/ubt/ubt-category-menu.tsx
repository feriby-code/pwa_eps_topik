import { ArrowLeft, ChevronRight, GraduationCap, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UbtKategori, UbtSet } from "./types";
import { daftarKategoriUbt } from "./data-ubt";

interface UbtCategoryMenuProps {
  onPilihSet: (set: UbtSet, kategori: UbtKategori) => void;
  onKembaliKeUjiKemampuan: () => void;
}

export function UbtCategoryMenu({
  onPilihSet,
  onKembaliKeUjiKemampuan,
}: UbtCategoryMenuProps) {
  const [kategoriTerpilih, setKategoriTerpilih] = useState<UbtKategori | null>(null);
  const [pencarian, setPencarian] = useState("");

  // Layar 1: Daftar Kategori UBT
  if (!kategoriTerpilih) {
    const listFiltered = daftarKategoriUbt.filter((kat) =>
      kat.judul.toLowerCase().includes(pencarian.toLowerCase())
    );

    return (
      <div className="mx-auto max-w-md px-4 py-6">
        {/* Tombol kembali ke Uji Kemampuan */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onKembaliKeUjiKemampuan}
          className="-ml-2 mb-3 rounded-full text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Uji Kemampuan
        </Button>

        {/* Header Layar 1: UBT */}
        <div className="mb-6 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl font-black tracking-wide text-foreground">UBT</h1>
              <p className="text-xs text-muted-foreground">
                Ujian Berbasis Tablet / Komputer EPS-TOPIK
              </p>
            </div>
          </div>
        </div>

        {/* Input Pencarian */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={pencarian}
            onChange={(e) => setPencarian(e.target.value)}
            placeholder="Cari kategori UBT..."
            className="h-11 rounded-full pl-10 pr-4 text-sm shadow-xs"
          />
        </div>

        {/* List Kategori sesuai gambar 1 */}
        <div className="flex flex-col gap-3.5">
          {listFiltered.map((kategori) => (
            <button
              key={kategori.id}
              onClick={() => {
                setKategoriTerpilih(kategori);
                setPencarian("");
              }}
              className="group flex w-full items-center justify-between rounded-full border-2 border-border bg-card px-5 py-3.5 text-left font-medium text-foreground shadow-xs transition-all hover:border-primary hover:bg-accent/40 active:scale-[0.99]"
            >
              <span className="font-semibold text-sm sm:text-base">{kategori.judul}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </button>
          ))}

          {listFiltered.length === 0 && (
            <div className="rounded-2xl border border-dashed p-8 text-center text-xs text-muted-foreground">
              Tidak ditemukan kategori yang sesuai.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Layar 2: Daftar SET dalam Kategori Terpilih (UBT | [Nama Kategori])
  const filteredSets = kategoriTerpilih.sets.filter((s) =>
    s.judul.toLowerCase().includes(pencarian.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      {/* Tombol kembali ke Menu Kategori UBT */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setKategoriTerpilih(null);
          setPencarian("");
        }}
        className="-ml-2 mb-3 rounded-full text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Kembali ke Kategori
      </Button>

      {/* Header Layar 2: UBT | Nama Kategori */}
      <div className="mb-6 flex items-center justify-between border-b pb-3">
        <h1 className="text-lg font-black tracking-wide text-foreground">
          UBT <span className="font-normal text-muted-foreground">|</span> {kategoriTerpilih.judul}
        </h1>
      </div>

      {/* Input Pencarian SET */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          placeholder="Cari set ujian..."
          className="h-11 rounded-full pl-10 pr-4 text-sm shadow-xs"
        />
      </div>

      {/* List Set sesuai gambar 1: SET 1, SET 2, SET 3 ... */}
      <div className="flex flex-col gap-3.5">
        {filteredSets.map((set) => (
          <button
            key={set.id}
            onClick={() => onPilihSet(set, kategoriTerpilih)}
            className="group flex w-full items-center justify-between rounded-full border-2 border-border bg-card px-5 py-3.5 text-left font-medium text-foreground shadow-xs transition-all hover:border-primary hover:bg-accent/40 active:scale-[0.99]"
          >
            <div>
              <span className="font-bold text-sm sm:text-base">{set.judul}</span>
              <p className="text-[11px] text-muted-foreground">
                {set.daftarSoal.length} Soal • {set.durasiMenit} Menit
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </button>
        ))}

        {filteredSets.length === 0 && (
          <div className="rounded-2xl border border-dashed p-8 text-center text-xs text-muted-foreground">
            Belum ada set soal yang sesuai pencarian.
          </div>
        )}
      </div>
    </div>
  );
}
