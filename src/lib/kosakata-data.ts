export type KelasKata = "KB" | "KK" | "KS";

export type Kosakata = {
  korea: string;
  indonesia: string;
  kelas: KelasKata;
  tahun: "2015" | "2024";
  bab: number;
};

export type PasanganKata = {
  koreaA: string;
  artiA: string;
  koreaB: string;
  artiB: string;
};

export const labelKelas: Record<KelasKata, string> = {
  KB: "Kata Benda",
  KK: "Kata Kerja",
  KS: "Kata Sifat",
};

export const daftarKosakata: Kosakata[] = [
  // Buku 2015
  { korea: "의사", indonesia: "Dokter", kelas: "KB", tahun: "2015", bab: 1 },
  { korea: "이름", indonesia: "Nama", kelas: "KB", tahun: "2015", bab: 1 },
  { korea: "나라", indonesia: "Negara", kelas: "KB", tahun: "2015", bab: 1 },
  { korea: "녹다", indonesia: "Berkarat, Mencairkan, Melelehkan", kelas: "KK", tahun: "2015", bab: 1 },
  { korea: "정확하다", indonesia: "Benar, Tepat", kelas: "KS", tahun: "2015", bab: 1 },
  { korea: "가족", indonesia: "Keluarga", kelas: "KB", tahun: "2015", bab: 2 },
  { korea: "형제", indonesia: "Saudara laki-laki", kelas: "KB", tahun: "2015", bab: 2 },
  { korea: "살다", indonesia: "Tinggal, Hidup", kelas: "KK", tahun: "2015", bab: 2 },
  { korea: "친절하다", indonesia: "Ramah", kelas: "KS", tahun: "2015", bab: 2 },
  { korea: "시간", indonesia: "Waktu, Jam", kelas: "KB", tahun: "2015", bab: 3 },
  { korea: "숫자", indonesia: "Angka", kelas: "KB", tahun: "2015", bab: 3 },
  { korea: "세다", indonesia: "Menghitung", kelas: "KK", tahun: "2015", bab: 3 },
  { korea: "빠르다", indonesia: "Cepat", kelas: "KS", tahun: "2015", bab: 3 },
  { korea: "일터", indonesia: "Tempat kerja", kelas: "KB", tahun: "2015", bab: 4 },
  { korea: "회사", indonesia: "Perusahaan", kelas: "KB", tahun: "2015", bab: 4 },
  { korea: "일하다", indonesia: "Bekerja", kelas: "KK", tahun: "2015", bab: 4 },
  { korea: "바쁘다", indonesia: "Sibuk", kelas: "KS", tahun: "2015", bab: 4 },
  { korea: "장갑", indonesia: "Sarung tangan", kelas: "KB", tahun: "2015", bab: 5 },
  { korea: "망치", indonesia: "Palu", kelas: "KB", tahun: "2015", bab: 5 },
  { korea: "고치다", indonesia: "Memperbaiki", kelas: "KK", tahun: "2015", bab: 5 },
  { korea: "무겁다", indonesia: "Berat", kelas: "KS", tahun: "2015", bab: 5 },
  { korea: "안전", indonesia: "Keselamatan", kelas: "KB", tahun: "2015", bab: 6 },
  { korea: "사고", indonesia: "Kecelakaan", kelas: "KB", tahun: "2015", bab: 6 },
  { korea: "조심하다", indonesia: "Berhati-hati", kelas: "KK", tahun: "2015", bab: 6 },
  { korea: "위험하다", indonesia: "Berbahaya", kelas: "KS", tahun: "2015", bab: 6 },
  { korea: "아침", indonesia: "Pagi", kelas: "KB", tahun: "2015", bab: 7 },
  { korea: "일어나다", indonesia: "Bangun", kelas: "KK", tahun: "2015", bab: 7 },
  { korea: "깨끗하다", indonesia: "Bersih", kelas: "KS", tahun: "2015", bab: 7 },
  { korea: "시장", indonesia: "Pasar", kelas: "KB", tahun: "2015", bab: 8 },
  { korea: "사다", indonesia: "Membeli", kelas: "KK", tahun: "2015", bab: 8 },
  { korea: "싸다", indonesia: "Murah", kelas: "KS", tahun: "2015", bab: 8 },
  { korea: "지하철", indonesia: "Kereta bawah tanah", kelas: "KB", tahun: "2015", bab: 9 },
  { korea: "타다", indonesia: "Naik (kendaraan)", kelas: "KK", tahun: "2015", bab: 9 },
  { korea: "멀다", indonesia: "Jauh", kelas: "KS", tahun: "2015", bab: 9 },
  { korea: "병원", indonesia: "Rumah sakit", kelas: "KB", tahun: "2015", bab: 10 },
  { korea: "아프다", indonesia: "Sakit", kelas: "KS", tahun: "2015", bab: 10 },
  { korea: "쉬다", indonesia: "Istirahat", kelas: "KK", tahun: "2015", bab: 10 },
  { korea: "날씨", indonesia: "Cuaca", kelas: "KB", tahun: "2015", bab: 11 },
  { korea: "춥다", indonesia: "Dingin", kelas: "KS", tahun: "2015", bab: 11 },
  { korea: "휴가", indonesia: "Liburan", kelas: "KB", tahun: "2015", bab: 12 },
  { korea: "떠나다", indonesia: "Berangkat, Pergi", kelas: "KK", tahun: "2015", bab: 12 },

  // Buku 2024
  { korea: "소개", indonesia: "Perkenalan", kelas: "KB", tahun: "2024", bab: 1 },
  { korea: "인사하다", indonesia: "Memberi salam", kelas: "KK", tahun: "2024", bab: 1 },
  { korea: "반갑다", indonesia: "Senang (bertemu)", kelas: "KS", tahun: "2024", bab: 1 },
  { korea: "부모님", indonesia: "Orang tua", kelas: "KB", tahun: "2024", bab: 2 },
  { korea: "돌보다", indonesia: "Merawat", kelas: "KK", tahun: "2024", bab: 2 },
  { korea: "요일", indonesia: "Hari", kelas: "KB", tahun: "2024", bab: 3 },
  { korea: "늦다", indonesia: "Terlambat", kelas: "KS", tahun: "2024", bab: 3 },
  { korea: "공장", indonesia: "Pabrik", kelas: "KB", tahun: "2024", bab: 4 },
  { korea: "출근하다", indonesia: "Masuk kerja", kelas: "KK", tahun: "2024", bab: 4 },
  { korea: "기계", indonesia: "Mesin", kelas: "KB", tahun: "2024", bab: 5 },
  { korea: "작동하다", indonesia: "Mengoperasikan", kelas: "KK", tahun: "2024", bab: 5 },
  { korea: "보호구", indonesia: "Alat pelindung diri", kelas: "KB", tahun: "2024", bab: 6 },
  { korea: "지키다", indonesia: "Menjaga, Mematuhi", kelas: "KK", tahun: "2024", bab: 6 },
  { korea: "청소", indonesia: "Bersih-bersih", kelas: "KB", tahun: "2024", bab: 7 },
  { korea: "준비하다", indonesia: "Menyiapkan", kelas: "KK", tahun: "2024", bab: 7 },
  { korea: "가격", indonesia: "Harga", kelas: "KB", tahun: "2024", bab: 8 },
  { korea: "지급하다", indonesia: "Membayar", kelas: "KK", tahun: "2024", bab: 8 },
  { korea: "버스", indonesia: "Bus", kelas: "KB", tahun: "2024", bab: 9 },
  { korea: "갈아타다", indonesia: "Berganti kendaraan", kelas: "KK", tahun: "2024", bab: 9 },
  { korea: "약국", indonesia: "Apotek", kelas: "KB", tahun: "2024", bab: 10 },
  { korea: "낫다", indonesia: "Sembuh", kelas: "KK", tahun: "2024", bab: 10 },
  { korea: "계절", indonesia: "Musim", kelas: "KB", tahun: "2024", bab: 11 },
  { korea: "덥다", indonesia: "Panas", kelas: "KS", tahun: "2024", bab: 11 },
  { korea: "여행", indonesia: "Perjalanan", kelas: "KB", tahun: "2024", bab: 12 },
  { korea: "문자", indonesia: "Pesan teks", kelas: "KB", tahun: "2024", bab: 13 },
  { korea: "전화하다", indonesia: "Menelepon", kelas: "KK", tahun: "2024", bab: 13 },
  { korea: "문화", indonesia: "Budaya", kelas: "KB", tahun: "2024", bab: 14 },
  { korea: "즐겁다", indonesia: "Menyenangkan", kelas: "KS", tahun: "2024", bab: 14 },
];

export const daftarSinonim: PasanganKata[] = [
  { koreaA: "의사", artiA: "Dokter", koreaB: "의원", artiB: "Dokter" },
  { koreaA: "지급하다", artiA: "Membayar", koreaB: "결제하다", artiB: "Membayar" },
  { koreaA: "생각", artiA: "Pendapat", koreaB: "의견", artiB: "Pendapat" },
  { koreaA: "일터", artiA: "Tempat kerja", koreaB: "직장", artiB: "Tempat kerja" },
  { koreaA: "고치다", artiA: "Memperbaiki", koreaB: "수리하다", artiB: "Memperbaiki" },
  { koreaA: "빠르다", artiA: "Cepat", koreaB: "신속하다", artiB: "Cepat" },
  { koreaA: "친구", artiA: "Teman", koreaB: "동무", artiB: "Teman" },
  { koreaA: "값", artiA: "Harga", koreaB: "가격", artiB: "Harga" },
];

export const daftarAntonim: PasanganKata[] = [
  { koreaA: "하얀색", artiA: "Warna putih", koreaB: "검은색", artiB: "Warna hitam" },
  { koreaA: "크다", artiA: "Besar", koreaB: "작다", artiB: "Kecil" },
  { koreaA: "싸다", artiA: "Murah", koreaB: "비싸다", artiB: "Mahal" },
  { koreaA: "멀다", artiA: "Jauh", koreaB: "가깝다", artiB: "Dekat" },
  { koreaA: "덥다", artiA: "Panas", koreaB: "춥다", artiB: "Dingin" },
  { koreaA: "무겁다", artiA: "Berat", koreaB: "가볍다", artiB: "Ringan" },
  { koreaA: "빠르다", artiA: "Cepat", koreaB: "느리다", artiB: "Lambat" },
  { koreaA: "안전하다", artiA: "Aman", koreaB: "위험하다", artiB: "Berbahaya" },
];

export const tahunKosakata = ["2015", "2024"] as const;

export function babKosakata(tahun: string) {
  const nomor = new Set(
    daftarKosakata.filter((item) => item.tahun === tahun).map((item) => item.bab),
  );
  return [...nomor].sort((a, b) => a - b);
}

export function kosakataBuku(tahun: string, bab?: number) {
  return daftarKosakata.filter(
    (item) => item.tahun === tahun && (bab === undefined || item.bab === bab),
  );
}
