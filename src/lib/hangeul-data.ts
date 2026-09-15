// Data menu Huruf Hangeul (vokal & konsonan, angka, satuan, cara baca mata uang).

export type BarisHuruf = {
  /** Nama huruf latin, mis. "A" atau "기역 Giyeok" */
  nama: string;
  /** Tulisan gabungan, mis. "ㅏ = 아" */
  tulisan: string;
  /** Cara baca latin, mis. "A" atau "GA/KA" */
  baca: string;
  /** Teks Korea yang dibunyikan oleh audio */
  ucap: string;
};

export type KelompokHuruf = { judul: string; baris: BarisHuruf[] };

const vokalTunggal: BarisHuruf[] = [
  { nama: "A", tulisan: "ㅏ = 아", baca: "A", ucap: "아" },
  { nama: "EO", tulisan: "ㅓ = 어", baca: "EO", ucap: "어" },
  { nama: "O", tulisan: "ㅗ = 오", baca: "O", ucap: "오" },
  { nama: "U", tulisan: "ㅜ = 우", baca: "U", ucap: "우" },
  { nama: "EU", tulisan: "ㅡ = 으", baca: "EU", ucap: "으" },
  { nama: "I", tulisan: "ㅣ = 이", baca: "I", ucap: "이" },
  { nama: "AE", tulisan: "ㅐ = 애", baca: "AE", ucap: "애" },
  { nama: "E", tulisan: "ㅔ = 에", baca: "E", ucap: "에" },
];

const vokalGanda: BarisHuruf[] = [
  { nama: "YA", tulisan: "ㅑ = 야", baca: "YA", ucap: "야" },
  { nama: "YEO", tulisan: "ㅕ = 여", baca: "YEO", ucap: "여" },
  { nama: "YO", tulisan: "ㅛ = 요", baca: "YO", ucap: "요" },
  { nama: "YU", tulisan: "ㅠ = 유", baca: "YU", ucap: "유" },
  { nama: "YAE", tulisan: "ㅒ = 얘", baca: "YAE", ucap: "얘" },
  { nama: "YE", tulisan: "ㅖ = 예", baca: "YE", ucap: "예" },
  { nama: "WA", tulisan: "ㅘ = 와", baca: "WA", ucap: "와" },
  { nama: "WAE", tulisan: "ㅙ = 왜", baca: "WAE", ucap: "왜" },
  { nama: "OE", tulisan: "ㅚ = 외", baca: "OE", ucap: "외" },
  { nama: "WO", tulisan: "ㅝ = 워", baca: "WO", ucap: "워" },
  { nama: "WE", tulisan: "ㅞ = 웨", baca: "WE", ucap: "웨" },
  { nama: "WI", tulisan: "ㅟ = 위", baca: "WI", ucap: "위" },
  { nama: "UI", tulisan: "ㅢ = 의", baca: "UI", ucap: "의" },
];

const konsonanTunggal: BarisHuruf[] = [
  { nama: "기역 Giyeok", tulisan: "ㄱ = 가", baca: "GA/KA", ucap: "가" },
  { nama: "니은 Nieun", tulisan: "ㄴ = 나", baca: "NA", ucap: "나" },
  { nama: "디귿 Digeut", tulisan: "ㄷ = 다", baca: "DA/TA", ucap: "다" },
  { nama: "리을 Rieul", tulisan: "ㄹ = 라", baca: "RA/LA", ucap: "라" },
  { nama: "미음 Mieum", tulisan: "ㅁ = 마", baca: "MA", ucap: "마" },
  { nama: "비읍 Bieup", tulisan: "ㅂ = 바", baca: "BA/PA", ucap: "바" },
  { nama: "시옷 Siot", tulisan: "ㅅ = 사", baca: "SA", ucap: "사" },
  { nama: "이응 Ieung", tulisan: "ㅇ = 아", baca: "A / NG", ucap: "아" },
  { nama: "지읒 Jieut", tulisan: "ㅈ = 자", baca: "JA", ucap: "자" },
  { nama: "치읓 Chieut", tulisan: "ㅊ = 차", baca: "CHA", ucap: "차" },
  { nama: "키읔 Kieuk", tulisan: "ㅋ = 카", baca: "KA", ucap: "카" },
  { nama: "티읕 Tieut", tulisan: "ㅌ = 타", baca: "TA", ucap: "타" },
  { nama: "피읖 Pieup", tulisan: "ㅍ = 파", baca: "PA", ucap: "파" },
  { nama: "히읗 Hieut", tulisan: "ㅎ = 하", baca: "HA", ucap: "하" },
];

const konsonanGanda: BarisHuruf[] = [
  { nama: "쌍기역 Ssanggiyeok", tulisan: "ㄲ = 까", baca: "KKA", ucap: "까" },
  { nama: "쌍디귿 Ssangdigeut", tulisan: "ㄸ = 따", baca: "TTA", ucap: "따" },
  { nama: "쌍비읍 Ssangbieup", tulisan: "ㅃ = 빠", baca: "PPA", ucap: "빠" },
  { nama: "쌍시옷 Ssangsiot", tulisan: "ㅆ = 싸", baca: "SSA", ucap: "싸" },
  { nama: "쌍지읒 Ssangjieut", tulisan: "ㅉ = 짜", baca: "JJA", ucap: "짜" },
];

export const kelompokVokalKonsonan: KelompokHuruf[] = [
  { judul: "Vokal Tunggal", baris: vokalTunggal },
  { judul: "Vokal Ganda", baris: vokalGanda },
  { judul: "Konsonan Tunggal", baris: konsonanTunggal },
  { judul: "Konsonan Ganda", baris: konsonanGanda },
];

export type BarisAngka = { angka: string; tulisan: string; baca: string };

export const angkaAsli: BarisAngka[] = [
  { angka: "1", tulisan: "하나", baca: "hana" },
  { angka: "2", tulisan: "둘", baca: "dul" },
  { angka: "3", tulisan: "셋", baca: "set" },
  { angka: "4", tulisan: "넷", baca: "net" },
  { angka: "5", tulisan: "다섯", baca: "daseot" },
  { angka: "6", tulisan: "여섯", baca: "yeoseot" },
  { angka: "7", tulisan: "일곱", baca: "ilgop" },
  { angka: "8", tulisan: "여덟", baca: "yeodeol" },
  { angka: "9", tulisan: "아홉", baca: "ahop" },
  { angka: "10", tulisan: "열", baca: "yeol" },
  { angka: "20", tulisan: "스물", baca: "seumul" },
  { angka: "30", tulisan: "서른", baca: "seoreun" },
  { angka: "40", tulisan: "마흔", baca: "maheun" },
  { angka: "50", tulisan: "쉰", baca: "swin" },
];

export const angkaSino: BarisAngka[] = [
  { angka: "1", tulisan: "일", baca: "il" },
  { angka: "2", tulisan: "이", baca: "i" },
  { angka: "3", tulisan: "삼", baca: "sam" },
  { angka: "4", tulisan: "사", baca: "sa" },
  { angka: "5", tulisan: "오", baca: "o" },
  { angka: "6", tulisan: "육", baca: "yuk" },
  { angka: "7", tulisan: "칠", baca: "chil" },
  { angka: "8", tulisan: "팔", baca: "pal" },
  { angka: "9", tulisan: "구", baca: "gu" },
  { angka: "10", tulisan: "십", baca: "sip" },
  { angka: "100", tulisan: "백", baca: "baek" },
  { angka: "1.000", tulisan: "천", baca: "cheon" },
  { angka: "10.000", tulisan: "만", baca: "man" },
];

export const catatanAngkaAsli = [
  "Umur → 23 tahun | 스물세 살이에요",
  "Satuan → 1 buah apel | 사과 사과 한 개",
  "Jam → jam 10 | 열 시입니다",
];

export const catatanAngkaSino = [
  "Uang / Harga (Won) → 10.000 won | 만 원이에요",
  "Nomor telepon dan alamat → 021256 | 공 이 일 이 오 육",
  "Tanggal, bulan, dan tahun → 03 Maret 2026 | 이천이십육년 삼월 삼일이에요",
  "Menit dan detik (untuk jam gunakan angka asli Korea) → 11:32:02 | 열한시 삼십이분 이초",
  "Satuan ukuran (meter, kilogram, dll.) → 1 meter | 일 미터",
];

export type BarisSatuan = { arti: string; tulisan: string; baca: string };
export type KelompokSatuan = { judul: string; catatan?: string; baris: BarisSatuan[] };

export const kelompokSatuan: KelompokSatuan[] = [
  {
    judul: "Hari | 일",
    catatan: "Menggunakan angka asli Korea + 일",
    baris: [
      { arti: "1 hari", tulisan: "하루", baca: "haru" },
      { arti: "2 hari", tulisan: "이틀", baca: "iteul" },
      { arti: "3 hari", tulisan: "사흘", baca: "saheul" },
      { arti: "4 hari", tulisan: "나흘", baca: "naheul" },
      { arti: "5 hari", tulisan: "닷새", baca: "datsae" },
      { arti: "10 hari", tulisan: "열흘", baca: "yeolheul" },
      { arti: "15 hari", tulisan: "보름", baca: "boreum" },
    ],
  },
  {
    judul: "Unit | mobil, rumah (대 / 채)",
    catatan: "대 untuk mesin & kendaraan, 채 untuk bangunan",
    baris: [
      { arti: "1 mobil", tulisan: "자동차 한 대", baca: "jadongcha han dae" },
      { arti: "2 mobil", tulisan: "자동차 두 대", baca: "jadongcha du dae" },
      { arti: "1 rumah", tulisan: "집 한 채", baca: "jip han chae" },
      { arti: "3 rumah", tulisan: "집 세 채", baca: "jip se chae" },
    ],
  },
  {
    judul: "Set | Baju (벌)",
    catatan: "벌 untuk pakaian satu set",
    baris: [
      { arti: "1 set baju", tulisan: "옷 한 벌", baca: "ot han beol" },
      { arti: "2 set baju", tulisan: "옷 두 벌", baca: "ot du beol" },
      { arti: "3 set baju", tulisan: "옷 세 벌", baca: "ot se beol" },
    ],
  },
  {
    judul: "Buah Besar | Semangka dll (통)",
    catatan: "통 untuk buah besar, 개 untuk buah kecil",
    baris: [
      { arti: "1 semangka", tulisan: "수박 한 통", baca: "subak han tong" },
      { arti: "2 semangka", tulisan: "수박 두 통", baca: "subak du tong" },
      { arti: "1 apel", tulisan: "사과 한 개", baca: "sagwa han gae" },
      { arti: "5 apel", tulisan: "사과 다섯 개", baca: "sagwa daseot gae" },
    ],
  },
];

export type BarisUang = { nominal: string; tulisan: string; baca: string; rumus: string };

export const caraBacaMataUang: BarisUang[] = [
  { nominal: "1.000 Won", tulisan: "천 원", baca: "cheon won", rumus: "1.000" },
  { nominal: "5.000 Won", tulisan: "오천 원", baca: "ocheon won", rumus: "5 x 1.000" },
  { nominal: "10.000 Won", tulisan: "만 원", baca: "man won", rumus: "10.000" },
  { nominal: "50.000 Won", tulisan: "오만 원", baca: "oman won", rumus: "5 x 10.000" },
  {
    nominal: "15.000 Won",
    tulisan: "만오천 원",
    baca: "man ocheon won",
    rumus: "10.000 + 5.000",
  },
  {
    nominal: "23.500 Won",
    tulisan: "이만삼천오백 원",
    baca: "iman samcheon obaek won",
    rumus: "20.000 + 3.000 + 500",
  },
  {
    nominal: "100.000 Won",
    tulisan: "십만 원",
    baca: "simman won",
    rumus: "10 x 10.000",
  },
  {
    nominal: "1.000.000 Won",
    tulisan: "백만 원",
    baca: "baengman won",
    rumus: "100 x 10.000",
  },
];

export const subMenuHangeul = [
  {
    slug: "vokal-konsonan",
    label: "Vokal dan Konsonan",
    deskripsi: "Vokal & konsonan tunggal dan ganda",
  },
  { slug: "angka", label: "Angka", deskripsi: "Angka asli & angka sino Korea" },
  { slug: "satuan", label: "Satuan", deskripsi: "Hari, unit, set, dan buah" },
  {
    slug: "mata-uang",
    label: "Cara Baca Mata Uang",
    deskripsi: "Membaca nominal Won dengan benar",
  },
] as const;
