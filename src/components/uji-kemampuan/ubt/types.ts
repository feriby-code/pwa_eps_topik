export type PilihanKunci = "A" | "B" | "C" | "D";

export interface OpsiJawaban {
  id: PilihanKunci;
  teks: string;
}

export interface SoalUbt {
  nomor: number; // 1 - 40
  bagian: "bacaan" | "pendengaran";
  jenisSoal: string; // Misal: "[1~2] 다음 그림을 보고 맞는 단어나 문장을 고르십시오."
  soal: string;
  gambarUrl?: string;
  audioUrl?: string;
  teksAudio?: string; // Teks yang dibacakan bila menggunakan TTS
  pilihan: OpsiJawaban[];
  kunciJawaban: PilihanKunci;
  penjelasan: string; // "JAWABAN BENAR ADALAH A KARENA..."
}

export interface UbtSet {
  id: string;
  kategoriId: string;
  judul: string; // e.g. "SET 1", "Set 2026 Baru"
  tahun?: string;
  durasiMenit: number; // e.g. 50 menit (25 menit bacaan + 25 menit pendengaran)
  daftarSoal: SoalUbt[];
}

export interface UbtKategori {
  id: string;
  judul: string; // e.g. "UBT Tahun 2026", "UBT Tahun 2025", "UBT Dari Komunitas"
  deskripsi: string;
  sets: UbtSet[];
}

export type TampilanUbtMode =
  | "kategori"
  | "set_list"
  | "grid_soal"
  | "soal"
  | "hasil"
  | "review_grid"
  | "review_soal";
