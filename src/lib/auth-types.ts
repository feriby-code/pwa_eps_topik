export type Peran = "superadmin" | "lpk" | "siswa";

export type Pengguna = {
  id: number | string;
  nama: string;
  email: string;
  no_hp: string;
  peran: Peran;
};

/** Modul yang bisa dikelola (create/update/delete) per peran. */
export const modulCrud = ["pengguna", "materi", "lembaga", "hasil"] as const;
export type Modul = (typeof modulCrud)[number];

const hakCrud: Record<Peran, readonly Modul[]> = {
  superadmin: modulCrud,
  lpk: ["lembaga", "hasil"],
  siswa: [],
};

export const labelPeran: Record<Peran, string> = {
  superadmin: "Super Admin",
  lpk: "LPK",
  siswa: "Siswa",
};

/** Semua peran boleh melihat seluruh data. */
export function bisaLihat(_peran: Peran | undefined, _modul: Modul) {
  return true;
}

export function bisaKelola(peran: Peran | undefined, modul: Modul) {
  if (!peran) return false;
  return hakCrud[peran].includes(modul);
}

export function daftarModulKelola(peran: Peran | undefined): readonly Modul[] {
  if (!peran) return [];
  return hakCrud[peran];
}
