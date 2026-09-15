import pdfAsset from "@/assets/contoh-buku.pdf.asset.json";
import audioAsset from "@/assets/contoh-audio.mp3.asset.json";

export type AudioTrack = { label: string; url: string };

export type Bab = {
  nomor: number;
  judul: string;
  judulKorea: string;
  pdfUrl: string;
  tracks: AudioTrack[];
};

export type BukuTahun = {
  tahun: string;
  label: string;
  deskripsi: string;
  bab: Bab[];
};

const judulBab: string[] = [
  "Perkenalan Diri",
  "Keluarga",
  "Angka dan Waktu",
  "Tempat Kerja",
  "Peralatan Kerja",
  "Keselamatan Kerja",
  "Kehidupan Sehari-hari",
  "Berbelanja",
  "Transportasi",
  "Kesehatan",
  "Cuaca dan Musim",
  "Liburan",
  "Telepon dan Pesan",
  "Budaya Korea",
];

const judulKorea: string[] = [
  "자기소개",
  "가족",
  "숫자와 시간",
  "일터",
  "작업 도구",
  "산업 안전",
  "일상생활",
  "쇼핑",
  "교통",
  "건강",
  "날씨와 계절",
  "휴가",
  "전화와 문자",
  "한국 문화",
];

function buatBab(jumlah: number): Bab[] {
  return Array.from({ length: jumlah }, (_, index) => ({
    nomor: index + 1,
    judul: judulBab[index % judulBab.length] as string,
    judulKorea: judulKorea[index % judulKorea.length] as string,
    pdfUrl: pdfAsset.url,
    tracks: [
      { label: "Track 1", url: audioAsset.url },
      { label: "Track 2", url: audioAsset.url },
    ],
  }));
}

export const daftarBuku: BukuTahun[] = [
  {
    tahun: "2024",
    label: "Buku 2024",
    deskripsi: "Edisi terbaru EPS-TOPIK",
    bab: buatBab(14),
  },
  {
    tahun: "2015",
    label: "Buku 2015",
    deskripsi: "Edisi standar kerja",
    bab: buatBab(12),
  },
  {
    tahun: "2000",
    label: "Buku 2000",
    deskripsi: "Edisi klasik dasar",
    bab: buatBab(10),
  },
];

export function cariBuku(tahun: string) {
  return daftarBuku.find((buku) => buku.tahun === tahun);
}

export function cariBab(tahun: string, nomor: string) {
  return cariBuku(tahun)?.bab.find((bab) => String(bab.nomor) === nomor);
}

export type HasilPencarian = { tahun: string; bab: Bab };

export function cariSemua(kueri: string): HasilPencarian[] {
  const q = kueri.trim().toLowerCase();
  if (!q) return [];
  const hasil: HasilPencarian[] = [];
  for (const buku of daftarBuku) {
    for (const bab of buku.bab) {
      const teks = `buku ${buku.tahun} bab ${bab.nomor} ${bab.judul} ${bab.judulKorea}`.toLowerCase();
      if (teks.includes(q)) hasil.push({ tahun: buku.tahun, bab });
    }
  }
  return hasil;
}
