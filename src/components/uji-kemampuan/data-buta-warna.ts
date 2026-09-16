// src/components/uji-kemampuan/data-buta-warna.ts
// 30 bank soal plate Ishihara untuk simulasi Test Buta Warna EPS-TOPIK

export type PlateSoal = {
  id: number;
  /** Angka/bentuk yang tersembunyi di dalam plate */
  simbol: string;
  /** Warna titik pembentuk simbol */
  warnaSimbol: string[];
  /** Warna titik latar */
  warnaLatar: string[];
  pilihan: string[];
  jawaban: number;
  keterangan: string;
};

export const plates: PlateSoal[] = [
  { id: 1, simbol: "12", warnaSimbol: ["#c86a3c", "#d98450", "#b85c33"], warnaLatar: ["#9aa15c", "#b3b56a", "#8b9455"], pilihan: ["12", "17", "70", "Tidak terlihat"], jawaban: 0, keterangan: "Plate demonstrasi, semua orang dapat melihat 12." },
  { id: 2, simbol: "8", warnaSimbol: ["#c1533a", "#d4694a", "#ab4632"], warnaLatar: ["#8f9a58", "#a7ad64", "#7f8a4f"], pilihan: ["3", "8", "6", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 8; defisiensi merah-hijau melihat 3." },
  { id: 3, simbol: "6", warnaSimbol: ["#bf4f38", "#d16748", "#a94430"], warnaLatar: ["#93994f", "#aab060", "#82884a"], pilihan: ["5", "6", "9", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 6; defisiensi melihat 5." },
  { id: 4, simbol: "29", warnaSimbol: ["#c05a3d", "#d3714f", "#aa4c33"], warnaLatar: ["#94a05a", "#adb56b", "#84904f"], pilihan: ["70", "29", "20", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 29; defisiensi melihat 70." },
  { id: 5, simbol: "57", warnaSimbol: ["#c96b3f", "#dc8253", "#b45a34"], warnaLatar: ["#8f9c57", "#a8b168", "#7f8b4d"], pilihan: ["35", "57", "37", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 57; defisiensi melihat 35." },
  { id: 6, simbol: "5", warnaSimbol: ["#bd5138", "#d06a4a", "#a74631"], warnaLatar: ["#96a259", "#afb76a", "#85914e"], pilihan: ["2", "5", "3", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 5; defisiensi melihat 2." },
  { id: 7, simbol: "3", warnaSimbol: ["#c45f3c", "#d8764e", "#ac5032"], warnaLatar: ["#909d55", "#a9b266", "#808c4c"], pilihan: ["5", "3", "8", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 3; defisiensi melihat 5." },
  { id: 8, simbol: "15", warnaSimbol: ["#c2543a", "#d56d4b", "#aa4830"], warnaLatar: ["#98a45b", "#b1b96c", "#87934f"], pilihan: ["17", "15", "13", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 15; defisiensi melihat 17." },
  { id: 9, simbol: "74", warnaSimbol: ["#cb6d41", "#de8455", "#b65c36"], warnaLatar: ["#8d9a55", "#a6af66", "#7d894b"], pilihan: ["21", "74", "71", "Tidak terlihat"], jawaban: 1, keterangan: "Normal melihat 74; defisiensi melihat 21." },
  { id: 10, simbol: "2", warnaSimbol: ["#bf5539", "#d26e4b", "#a94a31"], warnaLatar: ["#95a158", "#aeb669", "#84904d"], pilihan: ["2", "7", "5", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 2; defisiensi tidak melihat apa pun." },
  { id: 11, simbol: "6", warnaSimbol: ["#c66240", "#d97952", "#af5335"], warnaLatar: ["#919e56", "#aab367", "#818d4d"], pilihan: ["6", "8", "5", "Tidak terlihat"], jawaban: 0, keterangan: "Defisiensi merah-hijau umumnya tidak melihat angka." },
  { id: 12, simbol: "97", warnaSimbol: ["#c8683e", "#db7f51", "#b35934"], warnaLatar: ["#8e9b56", "#a7b067", "#7e8a4c"], pilihan: ["97", "87", "91", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 97." },
  { id: 13, simbol: "45", warnaSimbol: ["#c15a3b", "#d4714d", "#ab4d32"], warnaLatar: ["#97a35a", "#b0b86b", "#86924e"], pilihan: ["45", "15", "43", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 45." },
  { id: 14, simbol: "5", warnaSimbol: ["#cc6f42", "#df8656", "#b75e37"], warnaLatar: ["#8c9954", "#a5ae65", "#7c884a"], pilihan: ["5", "3", "9", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 5." },
  { id: 15, simbol: "7", warnaSimbol: ["#be5238", "#d16b4a", "#a84730"], warnaLatar: ["#96a259", "#afb76a", "#85914e"], pilihan: ["7", "1", "4", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 7." },
  { id: 16, simbol: "16", warnaSimbol: ["#c56140", "#d87852", "#ae5235"], warnaLatar: ["#909d55", "#a9b266", "#808c4c"], pilihan: ["16", "18", "10", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 16." },
  { id: 17, simbol: "73", warnaSimbol: ["#c9693f", "#dc8052", "#b45a35"], warnaLatar: ["#8f9c57", "#a8b168", "#7f8b4d"], pilihan: ["73", "78", "13", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 73." },
  { id: 18, simbol: "26", warnaSimbol: ["#c05939", "#d3704b", "#aa4c31"], warnaLatar: ["#94a05a", "#adb56b", "#84904f"], pilihan: ["26", "6", "2", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 26." },
  { id: 19, simbol: "42", warnaSimbol: ["#c76540", "#da7c53", "#b05636"], warnaLatar: ["#8e9b56", "#a7b067", "#7e8a4c"], pilihan: ["42", "2", "4", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 42." },
  { id: 20, simbol: "35", warnaSimbol: ["#bd5037", "#d06949", "#a7452f"], warnaLatar: ["#98a45b", "#b1b96c", "#87934f"], pilihan: ["35", "5", "3", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 35." },
  { id: 21, simbol: "96", warnaSimbol: ["#ca6a40", "#dd8154", "#b55b36"], warnaLatar: ["#8d9a55", "#a6af66", "#7d894b"], pilihan: ["96", "6", "9", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 96." },
  { id: 22, simbol: "8", warnaSimbol: ["#c25b3c", "#d5724e", "#ac4e33"], warnaLatar: ["#95a158", "#aeb669", "#84904d"], pilihan: ["8", "3", "6", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 8." },
  { id: 23, simbol: "1", warnaSimbol: ["#c86840", "#db7f53", "#b35935"], warnaLatar: ["#919e56", "#aab367", "#818d4d"], pilihan: ["1", "7", "4", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 1." },
  { id: 24, simbol: "6", warnaSimbol: ["#bf5439", "#d26d4b", "#a94931"], warnaLatar: ["#97a35a", "#b0b86b", "#86924e"], pilihan: ["6", "5", "8", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 6." },
  { id: 25, simbol: "12", warnaSimbol: ["#cb6c41", "#de8355", "#b65d36"], warnaLatar: ["#8c9954", "#a5ae65", "#7c884a"], pilihan: ["12", "17", "2", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 12." },
  { id: 26, simbol: "9", warnaSimbol: ["#c45e3d", "#d7754f", "#ad5033"], warnaLatar: ["#909d55", "#a9b266", "#808c4c"], pilihan: ["9", "5", "8", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 9." },
  { id: 27, simbol: "45", warnaSimbol: ["#c66341", "#d97a54", "#af5436"], warnaLatar: ["#8f9c57", "#a8b168", "#7f8b4d"], pilihan: ["45", "15", "5", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 45." },
  { id: 28, simbol: "5", warnaSimbol: ["#bc4f36", "#cf6848", "#a6442e"], warnaLatar: ["#98a45b", "#b1b96c", "#87934f"], pilihan: ["5", "2", "3", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 5." },
  { id: 29, simbol: "7", warnaSimbol: ["#c96b41", "#dc8254", "#b45b36"], warnaLatar: ["#8e9b56", "#a7b067", "#7e8a4c"], pilihan: ["7", "1", "9", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 7." },
  { id: 30, simbol: "16", warnaSimbol: ["#c1583a", "#d46f4c", "#ab4b31"], warnaLatar: ["#95a158", "#aeb669", "#84904d"], pilihan: ["16", "18", "6", "Tidak terlihat"], jawaban: 0, keterangan: "Normal melihat 16." },
];

/** Durasi total simulasi: 2 menit 30 detik */
export const DURASI_TEST_DETIK = 150;

export function nilaiHasil(benar: number, total: number) {
  const persen = Math.round((benar / total) * 100);
  if (persen >= 90) return { label: "Normal (Lulus)", persen, lulus: true };
  if (persen >= 70) return { label: "Defisiensi Ringan", persen, lulus: false };
  return { label: "Indikasi Buta Warna", persen, lulus: false };
}
