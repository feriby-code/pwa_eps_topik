import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpZA, ChevronsLeft, ChevronsRight, Eye, EyeOff, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { labelKelas, type KelasKata, type Kosakata } from "@/lib/kosakata-data";

type Props = {
  data: Kosakata[];
};

const pilihanBaris = ["10", "25", "50", "semua"] as const;

export function KosakataTabel({ data }: Props) {
  const [kueri, setKueri] = useState("");
  const [tampilKorea, setTampilKorea] = useState(true);
  const [tampilIndonesia, setTampilIndonesia] = useState(true);
  const [urutNaik, setUrutNaik] = useState(true);
  const [baris, setBaris] = useState<(typeof pilihanBaris)[number]>("10");
  const [kelas, setKelas] = useState<"semua" | KelasKata>("semua");
  const [halaman, setHalaman] = useState(0);

  const hasil = useMemo(() => {
    const kata = kueri.trim().toLowerCase();
    const tersaring = data.filter((item) => {
      const cocokKelas = kelas === "semua" || item.kelas === kelas;
      const cocokKata =
        kata === "" ||
        item.korea.toLowerCase().includes(kata) ||
        item.indonesia.toLowerCase().includes(kata);
      return cocokKelas && cocokKata;
    });
    return [...tersaring].sort((a, b) =>
      urutNaik ? a.korea.localeCompare(b.korea, "ko") : b.korea.localeCompare(a.korea, "ko"),
    );
  }, [data, kueri, kelas, urutNaik]);

  const perHalaman = baris === "semua" ? hasil.length || 1 : Number(baris);
  const totalHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman));
  const halamanAman = Math.min(halaman, totalHalaman - 1);
  const terlihat = hasil.slice(halamanAman * perHalaman, halamanAman * perHalaman + perHalaman);

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTampilKorea((nilai) => !nilai)}
          aria-label={tampilKorea ? "Sembunyikan kolom Korea" : "Tampilkan kolom Korea"}
          aria-pressed={!tampilKorea}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border transition-colors ${
            tampilKorea ? "bg-surface text-muted-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          {tampilKorea ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        </button>

        <div className="relative min-w-0 flex-1">
          <Input
            value={kueri}
            onChange={(event) => {
              setKueri(event.target.value);
              setHalaman(0);
            }}
            placeholder="Cari kosa kata"
            aria-label="Cari kosa kata"
            className="h-11 rounded-xl bg-surface pr-10 shadow-soft"
          />
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <button
          type="button"
          onClick={() => setTampilIndonesia((nilai) => !nilai)}
          aria-label={tampilIndonesia ? "Sembunyikan kolom Indonesia" : "Tampilkan kolom Indonesia"}
          aria-pressed={!tampilIndonesia}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border transition-colors ${
            tampilIndonesia
              ? "bg-surface text-muted-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {tampilIndonesia ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        <div className="grid grid-cols-2 border-b border-border bg-primary-soft text-center font-display text-sm font-extrabold text-primary">
          <div className="border-r border-border py-2">KOREA</div>
          <div className="py-2">INDONESIA</div>
        </div>

        {terlihat.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Tidak ada kosa kata yang cocok.
          </p>
        ) : (
          terlihat.map((item) => (
            <div
              key={`${item.tahun}-${item.bab}-${item.korea}`}
              className="grid grid-cols-2 border-b border-border last:border-b-0"
            >
              <div className="relative border-r border-border px-3 py-3 pl-9">
                <span className="absolute left-2 top-2 text-[10px] font-bold text-muted-foreground">
                  {item.kelas}
                </span>
                <span
                  className={`font-display text-lg font-extrabold transition-all duration-200 ${
                    tampilKorea ? "" : "select-none blur-md"
                  }`}
                >
                  {item.korea}
                </span>
              </div>
              <div
                className={`px-3 py-3 text-sm leading-5 transition-all duration-200 ${
                  tampilIndonesia ? "" : "select-none blur-md"
                }`}
              >
                {item.indonesia}
              </div>
            </div>
          ))
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
          value={baris}
          onValueChange={(nilai) => {
            setBaris(nilai as (typeof pilihanBaris)[number]);
            setHalaman(0);
          }}
        >
          <SelectTrigger className="h-10 w-28 rounded-full bg-surface text-xs font-bold" aria-label="Jumlah baris">
            <SelectValue>{baris === "semua" ? "Semua baris" : `${baris} baris`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {pilihanBaris.map((pilihan) => (
              <SelectItem key={pilihan} value={pilihan}>
                {pilihan === "semua" ? "Semua baris" : `${pilihan} baris`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={kelas}
          onValueChange={(nilai) => {
            setKelas(nilai as "semua" | KelasKata);
            setHalaman(0);
          }}
        >
          <SelectTrigger className="h-10 w-32 rounded-full bg-surface text-xs font-bold" aria-label="Kelas kata">
            <SelectValue>{kelas === "semua" ? "Semua" : `${kelas} · ${labelKelas[kelas]}`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua</SelectItem>
            {(Object.keys(labelKelas) as KelasKata[]).map((kode) => (
              <SelectItem key={kode} value={kode}>
                {kode} · {labelKelas[kode]}
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
        {hasil.length} kata · halaman {halamanAman + 1} dari {totalHalaman}
      </p>
    </div>
  );
}
