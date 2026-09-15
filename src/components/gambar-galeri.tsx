import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpZA,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  EyeOff,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Gambar } from "@/lib/gambar-data";

type Props = {
  data: Gambar[];
};

const pilihanKartu = ["10", "25", "50", "semua"] as const;

export function GambarGaleri({ data }: Props) {
  const [kueri, setKueri] = useState("");
  const [tampilTeks, setTampilTeks] = useState(true);
  const [terbuka, setTerbuka] = useState<string[]>([]);
  const [urutNaik, setUrutNaik] = useState(true);
  const [kartu, setKartu] = useState<(typeof pilihanKartu)[number]>("10");
  const [halaman, setHalaman] = useState(0);

  const hasil = useMemo(() => {
    const kata = kueri.trim().toLowerCase();
    const tersaring = data.filter(
      (item) =>
        kata === "" ||
        item.korea.toLowerCase().includes(kata) ||
        item.indonesia.toLowerCase().includes(kata),
    );
    return [...tersaring].sort((a, b) =>
      urutNaik ? a.korea.localeCompare(b.korea, "ko") : b.korea.localeCompare(a.korea, "ko"),
    );
  }, [data, kueri, urutNaik]);

  const perHalaman = kartu === "semua" ? hasil.length || 1 : Number(kartu);
  const totalHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman));
  const halamanAman = Math.min(halaman, totalHalaman - 1);
  const terlihat = hasil.slice(halamanAman * perHalaman, halamanAman * perHalaman + perHalaman);

  const kunci = (item: Gambar) => `${item.tahun}-${item.bab}-${item.korea}`;

  function alihkanTeks() {
    setTampilTeks((nilai) => !nilai);
    setTerbuka([]);
  }

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={alihkanTeks}
          aria-pressed={!tampilTeks}
          aria-label={
            tampilTeks ? "Sembunyikan teks untuk tes hafalan" : "Tampilkan teks kembali"
          }
          className={`flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 text-xs font-bold transition-colors ${
            tampilTeks ? "bg-surface text-muted-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          Teks
          {tampilTeks ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>

        <div className="relative min-w-0 flex-1">
          <Input
            value={kueri}
            onChange={(event) => {
              setKueri(event.target.value);
              setHalaman(0);
            }}
            placeholder="Cari gambar"
            aria-label="Cari gambar"
            className="h-11 rounded-xl bg-surface pr-10 shadow-soft"
          />
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {!tampilTeks && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Mode hafalan aktif — ketuk gambar untuk mengintip jawabannya.
        </p>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {terlihat.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-border bg-surface px-4 py-8 text-center text-sm text-muted-foreground">
            Tidak ada gambar yang cocok.
          </p>
        ) : (
          terlihat.map((item) => {
            const id = kunci(item);
            const diintip = terbuka.includes(id);
            const tampil = tampilTeks || diintip;
            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  setTerbuka((daftar) =>
                    daftar.includes(id) ? daftar.filter((x) => x !== id) : [...daftar, id],
                  )
                }
                aria-label={tampil ? `${item.korea} — ${item.indonesia}` : "Tampilkan jawaban"}
                className="rounded-2xl border border-border bg-surface p-3 text-center shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <span className="grid aspect-[4/3] w-full place-items-center rounded-xl border border-border bg-primary-soft text-6xl">
                  <span aria-hidden="true">{item.emoji}</span>
                </span>
                <span
                  className={`mt-3 block font-display text-lg font-extrabold transition-all duration-200 ${
                    tampil ? "" : "select-none blur-md"
                  }`}
                >
                  {item.korea}
                </span>
                <span
                  className={`mt-0.5 block text-xs text-muted-foreground transition-all duration-200 ${
                    tampil ? "" : "select-none blur-md"
                  }`}
                >
                  {item.indonesia}
                </span>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setHalaman(Math.max(0, halamanAman - 1))}
          disabled={halamanAman === 0}
          aria-label="Halaman sebelumnya"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted-foreground disabled:opacity-40"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setUrutNaik((nilai) => !nilai)}
          aria-label="Ubah urutan abjad"
          className="flex h-10 items-center gap-1 rounded-full border border-border bg-surface px-3 text-xs font-bold text-muted-foreground"
        >
          {urutNaik ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowUpZA className="h-4 w-4" />}
          {urutNaik ? "A–Z" : "Z–A"}
        </button>

        <Select
          value={kartu}
          onValueChange={(nilai) => {
            setKartu(nilai as (typeof pilihanKartu)[number]);
            setHalaman(0);
          }}
        >
          <SelectTrigger
            className="h-10 w-32 rounded-full bg-surface text-xs font-bold"
            aria-label="Jumlah gambar per halaman"
          >
            <SelectValue>{kartu === "semua" ? "Semua gambar" : `${kartu} gambar`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {pilihanKartu.map((pilihan) => (
              <SelectItem key={pilihan} value={pilihan}>
                {pilihan === "semua" ? "Semua gambar" : `${pilihan} gambar`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          type="button"
          onClick={() => setHalaman(Math.min(totalHalaman - 1, halamanAman + 1))}
          disabled={halamanAman >= totalHalaman - 1}
          aria-label="Halaman berikutnya"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted-foreground disabled:opacity-40"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        {hasil.length} gambar · halaman {halamanAman + 1} dari {totalHalaman}
      </p>
    </div>
  );
}
