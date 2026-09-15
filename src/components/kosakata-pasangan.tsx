import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { PasanganKata } from "@/lib/kosakata-data";

type Props = {
  data: PasanganKata[];
  /** true = tampilkan dua kolom berdampingan (antonim). */
  duaKolom?: boolean;
};

export function KosakataPasangan({ data, duaKolom = false }: Props) {
  const [kueri, setKueri] = useState("");

  const hasil = useMemo(() => {
    const kata = kueri.trim().toLowerCase();
    if (kata === "") return data;
    return data.filter((item) =>
      [item.koreaA, item.koreaB, item.artiA, item.artiB].some((teks) =>
        teks.toLowerCase().includes(kata),
      ),
    );
  }, [data, kueri]);

  return (
    <div className="mt-5">
      <div className="relative">
        <Input
          value={kueri}
          onChange={(event) => setKueri(event.target.value)}
          placeholder="Cari kata"
          aria-label="Cari kata"
          className="h-11 rounded-xl bg-surface pr-10 shadow-soft"
        />
        <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="mt-4 space-y-3">
        {hasil.length === 0 ? (
          <p className="px-1 text-sm text-muted-foreground">Tidak ada kata yang cocok.</p>
        ) : (
          hasil.map((item) => (
            <div
              key={`${item.koreaA}-${item.koreaB}`}
              className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              {duaKolom ? (
                <div className="grid grid-cols-2 divide-x divide-border text-center">
                  <div className="px-2">
                    <p className="font-display text-lg font-extrabold">{item.koreaA}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.artiA}</p>
                  </div>
                  <div className="px-2">
                    <p className="font-display text-lg font-extrabold">{item.koreaB}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.artiB}</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-display text-lg font-extrabold">
                    {item.koreaA}, {item.koreaB}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.artiA}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
