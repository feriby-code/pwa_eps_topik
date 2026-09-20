/**
 * Penyimpanan sementara (frontend saja) untuk berkas PDF & audio buku di dashboard admin.
 *
 * Catatan: belum ada backend. Berkas yang diunggah disimpan di memori peramban
 * (object URL) sehingga bisa langsung dipratinjau. Nama & ukuran berkas ikut
 * disimpan di localStorage supaya daftarnya tetap terlihat setelah halaman
 * dimuat ulang, tetapi berkasnya sendiri harus diunggah ulang sampai backend siap.
 */

export type BerkasBuku = {
  id: string;
  nama: string;
  ukuran: number;
  label: string;
  /** Kosong berarti berkas hanya tercatat, isinya belum ada di sesi ini. */
  url: string;
  diunggahPada: string;
};

export type EntriBab = {
  pdf: BerkasBuku | null;
  audio: BerkasBuku[];
};

type Peta = Record<string, EntriBab>;

const KUNCI = "annyeong.admin.buku.v1";

let peta: Peta = muat();
const pendengar = new Set<() => void>();

function muat(): Peta {
  if (typeof window === "undefined") return {};
  try {
    const mentah = window.localStorage.getItem(KUNCI);
    if (!mentah) return {};
    const data = JSON.parse(mentah) as Peta;
    // URL object tidak bertahan setelah reload.
    for (const entri of Object.values(data)) {
      if (entri.pdf) entri.pdf.url = "";
      entri.audio = entri.audio.map((berkas) => ({ ...berkas, url: "" }));
    }
    return data;
  } catch {
    return {};
  }
}

function simpan() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KUNCI, JSON.stringify(peta));
    } catch {
      /* abaikan */
    }
  }
  pendengar.forEach((fn) => fn());
}

export function kunciBab(tahun: string, bab: number) {
  return `${tahun}::${bab}`;
}

export function ambilEntri(tahun: string, bab: number): EntriBab {
  return peta[kunciBab(tahun, bab)] ?? { pdf: null, audio: [] };
}

export function ambilSemua(): Peta {
  return peta;
}

export function langganan(fn: () => void) {
  pendengar.add(fn);
  return () => pendengar.delete(fn);
}

function berkasDari(file: File, label: string): BerkasBuku {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nama: file.name,
    ukuran: file.size,
    label,
    url: typeof URL !== "undefined" ? URL.createObjectURL(file) : "",
    diunggahPada: new Date().toISOString(),
  };
}

function tulis(tahun: string, bab: number, ubah: (entri: EntriBab) => EntriBab) {
  const kunci = kunciBab(tahun, bab);
  peta = { ...peta, [kunci]: ubah(peta[kunci] ?? { pdf: null, audio: [] }) };
  simpan();
}

export function setPdf(tahun: string, bab: number, file: File) {
  tulis(tahun, bab, (entri) => ({ ...entri, pdf: berkasDari(file, "PDF") }));
}

export function hapusPdf(tahun: string, bab: number) {
  tulis(tahun, bab, (entri) => ({ ...entri, pdf: null }));
}

export function tambahAudio(tahun: string, bab: number, files: File[]) {
  tulis(tahun, bab, (entri) => ({
    ...entri,
    audio: [
      ...entri.audio,
      ...files.map((file, i) => berkasDari(file, `Track ${entri.audio.length + i + 1}`)),
    ],
  }));
}

export function ubahLabelAudio(tahun: string, bab: number, id: string, label: string) {
  tulis(tahun, bab, (entri) => ({
    ...entri,
    audio: entri.audio.map((berkas) => (berkas.id === id ? { ...berkas, label } : berkas)),
  }));
}

export function hapusAudio(tahun: string, bab: number, id: string) {
  tulis(tahun, bab, (entri) => ({
    ...entri,
    audio: entri.audio.filter((berkas) => berkas.id !== id),
  }));
}

export function formatUkuran(byte: number) {
  if (byte < 1024) return `${byte} B`;
  if (byte < 1024 * 1024) return `${(byte / 1024).toFixed(0)} KB`;
  return `${(byte / 1024 / 1024).toFixed(1)} MB`;
}

/** Snapshot stabil untuk render di server (useSyncExternalStore). */
export const petaKosong: Record<string, EntriBab> = {};
