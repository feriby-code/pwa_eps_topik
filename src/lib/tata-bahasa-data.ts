// Data menu Tata Bahasa: pola kalimat EPS-TOPIK beserta arti, pengertian,
// cara penggunaan (rumus), contoh kalimat, dan tips.

export type RumusTataBahasa = {
  /** Keterangan kondisi, mis. "Ada Bachim". Kosongkan bila hanya satu rumus. */
  kondisi?: string;
  /** Bagian kiri rumus, mis. "KATA BENDA" */
  kiri: string;
  /** Bagian kanan rumus, mis. "입니다/입니까?" */
  kanan: string;
};

export type ContohTataBahasa = { korea: string; arti: string };

export type PolaTataBahasa = {
  slug: string;
  pola: string;
  arti: string;
  pengertian: string;
  /** Keterangan perubahan, mis. "Tanpa perubahan" atau "Perubahan 2 macam" */
  catatanPenggunaan: string;
  rumus: RumusTataBahasa[];
  contoh: ContohTataBahasa[];
  tips: string[];
};

export const polaTataBahasa: PolaTataBahasa[] = [
  {
    slug: "imnida-imnikka",
    pola: "입니다/입니까?",
    arti: "Adalah/Apakah",
    pengertian: "Ditempelkan pada kata benda dengan kondisi formal.",
    catatanPenggunaan: "Tanpa perubahan",
    rumus: [{ kiri: "KATA BENDA", kanan: "입니다/입니까?" }],
    contoh: [
      { korea: "어느 나라 사람입니까?", arti: "Anda orang dari negara mana?" },
      { korea: "(저는) 라오스 사람입니다.", arti: "(Saya) orang Laos." },
    ],
    tips: ["입니까? untuk pertanyaan.", "입니다 untuk pernyataan."],
  },
  {
    slug: "eul-kkayo",
    pola: "-(으)ㄹ까요?",
    arti: "Akan, Bagaimana Kalau",
    pengertian:
      "Ditempelkan pada kata kerja untuk menanyakan pendapat atau memperkirakan sesuatu yang akan terjadi.",
    catatanPenggunaan: "Perubahan 2 macam",
    rumus: [
      { kondisi: "Ada Bachim", kiri: "KATA KERJA", kanan: "을까요" },
      { kondisi: "Tidak ada Bachim dan bachim ㄹ", kiri: "KATA KERJA", kanan: "ㄹ까요" },
    ],
    contoh: [
      { korea: "내일 같이 점심 먹을까요?", arti: "Besok makan siang bersama, bagaimana?" },
      { korea: "같이 저녁을 만들까요?", arti: "Bagaimana kalau kita masak makan malam bersama?" },
    ],
    tips: [
      "Bila dibersamai keterangan waktu, artinya \u201cakan\u201d.",
      "Bila tanpa keterangan waktu, artinya \u201cbagaimana kalau\u201d.",
    ],
  },
  {
    slug: "aseo-eoseo",
    pola: "아서/어서",
    arti: "Karena, Lalu",
    pengertian:
      "Ditempelkan pada kata kerja dan kata sifat untuk menyatakan alasan atau kejadian berurutan.",
    catatanPenggunaan: "Perubahan 3 macam",
    rumus: [
      { kondisi: "Diakhiri ㅏ, ㅗ", kiri: "KK, KS", kanan: "아서" },
      { kondisi: "Diakhiri selain ㅏ, ㅗ", kiri: "KK, KS", kanan: "어서" },
      { kondisi: "Diakhiri 하다", kiri: "KK, KS", kanan: "해서" },
    ],
    contoh: [
      { korea: "저는 편찮아서 병원에 갔어요.", arti: "Saya sakit sehingga pergi ke rumah sakit." },
      { korea: "과일이 싱싱해서 몇 개 샀어요.", arti: "Buahnya segar sehingga saya beli beberapa." },
    ],
    tips: [
      "Dipakai untuk menyatakan alasan (karena).",
      "Dipakai juga untuk kejadian berurutan (lalu).",
    ],
  },
];

export function cariPolaTataBahasa(kueri: string) {
  const kata = kueri.trim().toLowerCase();
  if (kata === "") return polaTataBahasa;
  return polaTataBahasa.filter((item) =>
    [item.pola, item.arti, item.pengertian].join(" ").toLowerCase().includes(kata),
  );
}

export function polaBySlug(slug: string) {
  return polaTataBahasa.find((item) => item.slug === slug);
}
