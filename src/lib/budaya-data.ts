// src/lib/budaya-data.ts
// Data materi Budaya & Informasi untuk PWA EPS-TOPIK

export type BudayaItem = {
  ko: string;
  arti: string;
  catatan?: string;
};

export type BudayaKategori = {
  id: string;
  judul: string;
  ikon: string;
  ringkas: string;
  items: BudayaItem[];
};

export const budayaKategori: BudayaKategori[] = [
  {
    id: "budaya-umum",
    judul: "Budaya & Etika Korea",
    ikon: "Landmark",
    ringkas: "Kebiasaan, sopan santun, dan etika kerja di Korea Selatan.",
    items: [
      { ko: "인사 (Insa)", arti: "Salam / membungkuk saat bertemu orang lain", catatan: "Membungkuk 15–30 derajat kepada atasan." },
      { ko: "존댓말 (Jondaenmal)", arti: "Bahasa hormat kepada orang yang lebih tua/atasan" },
      { ko: "회식 (Hoesik)", arti: "Makan bersama rekan kerja setelah jam kerja" },
      { ko: "빨리빨리 (Ppalli-ppalli)", arti: "Budaya cepat, serba tepat waktu" },
      { ko: "명함 (Myeongham)", arti: "Kartu nama, diberikan dengan dua tangan" },
      { ko: "신발 벗기 (Sinbal beotgi)", arti: "Melepas sepatu sebelum masuk rumah" },
    ],
  },
  {
    id: "hari-besar",
    judul: "Hari Besar & Libur Nasional",
    ikon: "CalendarDays",
    ringkas: "Daftar hari besar Korea beserta artinya.",
    items: [
      { ko: "설날 (Seollal)", arti: "Tahun Baru Imlek Korea", catatan: "Libur 3 hari, makan tteokguk." },
      { ko: "추석 (Chuseok)", arti: "Hari raya panen / thanksgiving Korea" },
      { ko: "삼일절 (Samiljeol)", arti: "Hari Pergerakan Kemerdekaan, 1 Maret" },
      { ko: "어린이날 (Eorininal)", arti: "Hari Anak, 5 Mei" },
      { ko: "부처님 오신 날", arti: "Hari Waisak (kelahiran Buddha)" },
      { ko: "광복절 (Gwangbokjeol)", arti: "Hari Pembebasan, 15 Agustus" },
      { ko: "개천절 (Gaecheonjeol)", arti: "Hari Berdirinya Negara, 3 Oktober" },
      { ko: "한글날 (Hangeullal)", arti: "Hari Hangeul, 9 Oktober" },
    ],
  },
  {
    id: "asuransi",
    judul: "Asuransi Pekerja (4대 보험)",
    ikon: "ShieldCheck",
    ringkas: "Empat asuransi wajib dan asuransi khusus pekerja asing.",
    items: [
      { ko: "국민연금 (Gungmin yeongeum)", arti: "Asuransi pensiun nasional", catatan: "Bisa diklaim (lumpsum) saat pulang." },
      { ko: "건강보험 (Geongang boheom)", arti: "Asuransi kesehatan nasional" },
      { ko: "고용보험 (Goyong boheom)", arti: "Asuransi ketenagakerjaan" },
      { ko: "산재보험 (Sanjae boheom)", arti: "Asuransi kecelakaan kerja", catatan: "Dibayar penuh oleh perusahaan." },
      { ko: "귀국비용보험", arti: "Asuransi biaya kepulangan (wajib EPS)" },
      { ko: "상해보험", arti: "Asuransi kecelakaan di luar jam kerja" },
      { ko: "임금체불보증보험", arti: "Asuransi jaminan tunggakan upah" },
    ],
  },
  {
    id: "imigrasi",
    judul: "Imigrasi & Dokumen (출입국)",
    ikon: "Stamp",
    ringkas: "Istilah imigrasi, visa, dan perizinan tinggal.",
    items: [
      { ko: "외국인등록증 (ARC)", arti: "Kartu identitas pekerja asing", catatan: "Wajib dibuat dalam 90 hari." },
      { ko: "E-9 비자", arti: "Visa kerja non-profesional EPS" },
      { ko: "체류기간 연장", arti: "Perpanjangan masa tinggal" },
      { ko: "사업장 변경", arti: "Perpindahan tempat kerja" },
      { ko: "재입국", arti: "Masuk kembali ke Korea (re-entry)" },
      { ko: "성실근로자", arti: "Pekerja setia / rentry khusus" },
      { ko: "출국만기보험", arti: "Asuransi jatuh tempo kepulangan (severance)" },
    ],
  },
  {
    id: "transportasi",
    judul: "Transportasi (교통)",
    ikon: "TrainFront",
    ringkas: "Moda transportasi dan istilah penting saat bepergian.",
    items: [
      { ko: "지하철 (Jihacheol)", arti: "Kereta bawah tanah / subway" },
      { ko: "버스 (Beoseu)", arti: "Bus kota" },
      { ko: "환승 (Hwanseung)", arti: "Transit / ganti moda transportasi" },
      { ko: "교통카드 (T-money)", arti: "Kartu transportasi isi ulang" },
      { ko: "택시 (Taeksi)", arti: "Taksi" },
      { ko: "KTX", arti: "Kereta cepat antarkota" },
      { ko: "정류장 (Jeongnyujang)", arti: "Halte pemberhentian" },
      { ko: "요금 (Yogeum)", arti: "Tarif / biaya" },
    ],
  },
];

export function getKategori(id: string) {
  return budayaKategori.find((k) => k.id === id);
}
