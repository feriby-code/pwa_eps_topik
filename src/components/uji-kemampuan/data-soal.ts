import { daftarGambar, Gambar } from "@/lib/gambar-data";
import { daftarKosakata, Kosakata } from "@/lib/kosakata-data";
import { polaTataBahasa } from "@/lib/tata-bahasa-data";

export type SumberBuku = "2015" | "2024" | "gabungan";

// --- DATA SOAL HURUF DASAR ---
export type SoalHuruf = {
  id: string;
  huruf: string;
  nama: string;
  baca: string;
  ucap: string;
};

export const soalHurufList: SoalHuruf[] = [
  { id: "h1", huruf: "가", nama: "기역 + 아", baca: "GA", ucap: "가" },
  { id: "h2", huruf: "나", nama: "니은 + 아", baca: "NA", ucap: "나" },
  { id: "h3", huruf: "다", nama: "디귿 + 아", baca: "DA", ucap: "다" },
  { id: "h4", huruf: "라", nama: "리을 + 아", baca: "RA", ucap: "라" },
  { id: "h5", huruf: "마", nama: "미음 + 아", baca: "MA", ucap: "마" },
  { id: "h6", huruf: "바", nama: "비읍 + 아", baca: "BA", ucap: "바" },
  { id: "h7", huruf: "사", nama: "시옷 + 아", baca: "SA", ucap: "사" },
  { id: "h8", huruf: "아", nama: "이응 + 아", baca: "A", ucap: "아" },
  { id: "h9", huruf: "자", nama: "지읒 + 아", baca: "JA", ucap: "자" },
  { id: "h10", huruf: "차", nama: "치읓 + 아", baca: "CHA", ucap: "차" },
  { id: "h11", huruf: "카", nama: "키읔 + 아", baca: "KA", ucap: "카" },
  { id: "h12", huruf: "타", nama: "티읕 + 아", baca: "TA", ucap: "타" },
  { id: "h13", huruf: "파", nama: "피읖 + 아", baca: "PA", ucap: "파" },
  { id: "h14", huruf: "하", nama: "히읗 + 아", baca: "HA", ucap: "하" },
];

export function getSoalHuruf(sumber: SumberBuku, count = 5): SoalHuruf[] {
  const shuffled = [...soalHurufList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// --- DATA SOAL GAMBAR ---
export type SoalGambar = {
  id: string;
  gambar: Gambar;
  pilihan: { label: string; teks: string; benar: boolean }[];
};

export function getSoalGambar(sumber: SumberBuku, count = 5): SoalGambar[] {
  let list = daftarGambar;
  if (sumber === "2015") {
    list = daftarGambar.filter((g) => g.tahun === "2015");
  } else if (sumber === "2024") {
    list = daftarGambar.filter((g) => g.tahun === "2024");
  }
  if (list.length === 0) list = daftarGambar;

  const shuffled = [...list].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map((item, idx) => {
    // Ambil 3 pengecoh acak
    const distractors = list
      .filter((g) => g.korea !== item.korea)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((g) => ({ teks: `${g.korea} (${g.indonesia})`, benar: false }));

    const choices = [
      { teks: `${item.korea} (${item.indonesia})`, benar: true },
      ...distractors,
    ].sort(() => Math.random() - 0.5);

    const labels = ["A", "B", "C", "D"];
    return {
      id: `img-${idx + 1}`,
      gambar: item,
      pilihan: choices.map((c, i) => ({
        label: labels[i],
        teks: c.teks,
        benar: c.benar,
      })),
    };
  });
}

// --- DATA SOAL KATA (MENJODOHKAN) ---
export type PasanganJodoh = {
  id: string;
  korea: string;
  indonesia: string;
};

export type LembarKata = {
  lembar: number;
  kiri: { id: string; teks: string; nomorUrut: number }[];
  kanan: { id: string; teks: string; nomorUrut: number }[];
  pasangan: Record<string, string>; // kiriId -> kananId
};

export function getLembarKataList(sumber: SumberBuku, totalLembar = 2): LembarKata[] {
  let list = daftarKosakata;
  if (sumber === "2015") {
    list = daftarKosakata.filter((k) => k.tahun === "2015");
  } else if (sumber === "2024") {
    list = daftarKosakata.filter((k) => k.tahun === "2024");
  }
  if (list.length < 10) list = daftarKosakata;

  const shuffled = [...list].sort(() => Math.random() - 0.5);
  const hasil: LembarKata[] = [];

  for (let l = 0; l < totalLembar; l++) {
    const subset = shuffled.slice(l * 5, (l + 1) * 5);
    if (subset.length < 5) break;

    // Pasangan asli
    const mapping: Record<string, string> = {};
    const itemKiri = subset.map((item, i) => {
      const id = `item-${l}-${i}`;
      mapping[id] = item.indonesia;
      return { id, teks: item.korea, nomorUrut: i + 1 };
    });

    // Acak urutan kanan seperti di gambar Canva: Jawaban 5, Jawaban 2, Jawaban 1, dst.
    const shuffledKanan = [...subset]
      .sort(() => Math.random() - 0.5)
      .map((item, i) => ({
        id: `kanan-${l}-${item.indonesia}`,
        teks: item.indonesia,
        nomorUrut: i + 1,
      }));

    hasil.push({
      lembar: l + 1,
      kiri: itemKiri,
      kanan: shuffledKanan,
      pasangan: mapping,
    });
  }

  return hasil;
}

// --- DATA SOAL PENDENGARAN ---
export type SoalDengarKata = {
  id: string;
  tipe: "kata";
  audioText: string;
  pilihan: { label: string; teks: string; benar: boolean }[];
};

export type SoalDengarKalimat = {
  id: string;
  tipe: "kalimat";
  audioText: string;
  arti: string;
  kataTersusun: string[];
  kataTeracak: { id: string; teks: string }[];
};

export type SoalPendengaran = SoalDengarKata | SoalDengarKalimat;

export function getSoalPendengaranList(sumber: SumberBuku): SoalPendengaran[] {
  let listKata = daftarKosakata;
  if (sumber === "2015") {
    listKata = daftarKosakata.filter((k) => k.tahun === "2015");
  } else if (sumber === "2024") {
    listKata = daftarKosakata.filter((k) => k.tahun === "2024");
  }
  if (listKata.length < 8) listKata = daftarKosakata;

  const shuffledKata = [...listKata].sort(() => Math.random() - 0.5).slice(0, 3);

  // 1. Soal Kata
  const soalKata: SoalDengarKata[] = shuffledKata.map((item, idx) => {
    const distractors = listKata
      .filter((k) => k.korea !== item.korea)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((k) => ({ teks: k.indonesia, benar: false }));

    const choices = [
      { teks: item.indonesia, benar: true },
      ...distractors,
    ].sort(() => Math.random() - 0.5);

    const labels = ["A", "B", "C", "D"];
    return {
      id: `dk-${idx + 1}`,
      tipe: "kata",
      audioText: item.korea,
      pilihan: choices.map((c, i) => ({
        label: labels[i],
        teks: c.teks,
        benar: c.benar,
      })),
    };
  });

  // 2. Soal Kalimat (Menyusun urutan kata)
  const contohKalimat = polaTataBahasa.flatMap((p) => p.contoh);
  const selectedKalimat = [...contohKalimat]
    .filter((c) => c.korea.split(" ").length >= 3 && c.korea.split(" ").length <= 5)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  // Fallback kalimat jika kurang
  const fallbackKalimat = [
    { korea: "내일 같이 점심 먹을까요?", arti: "Besok makan siang bersama, bagaimana?" },
    { korea: "어느 나라 사람입니까?", arti: "Anda orang dari negara mana?" },
  ];

  const poolKalimat = selectedKalimat.length >= 2 ? selectedKalimat : fallbackKalimat;

  const soalKalimat: SoalDengarKalimat[] = poolKalimat.slice(0, 2).map((item, idx) => {
    // Hilangkan tanda baca yang menempel untuk tokenisasi kata rapi
    const rawWords = item.korea.trim().split(/\s+/);
    const shuffledTokens = [...rawWords]
      .map((w, i) => ({ id: `token-${idx}-${i}-${w}`, teks: w }))
      .sort(() => Math.random() - 0.5);

    return {
      id: `dkl-${idx + 1}`,
      tipe: "kalimat",
      audioText: item.korea,
      arti: item.arti,
      kataTersusun: rawWords,
      kataTeracak: shuffledTokens,
    };
  });

  return [...soalKata, ...soalKalimat];
}
