import { API_URL, KUNCI_PENGGUNA_DEMO, KUNCI_SESI, MODE_DEMO } from "@/lib/auth-config";
import type { Peran, Pengguna } from "@/lib/auth-types";

export type Sesi = { token: string; pengguna: Pengguna };

export type DataDaftar = {
  nama: string;
  email: string;
  no_hp: string;
  kata_sandi: string;
  peran?: Peran;
};

export type DataMasuk = {
  identitas: string; // email atau no hp
  kata_sandi: string;
};

/* ------------------------------------------------------------------ */
/* Penyimpanan sesi di browser                                         */
/* ------------------------------------------------------------------ */

export function bacaSesi(): Sesi | null {
  if (typeof window === "undefined") return null;
  try {
    const mentah = window.localStorage.getItem(KUNCI_SESI);
    return mentah ? (JSON.parse(mentah) as Sesi) : null;
  } catch {
    return null;
  }
}

export function simpanSesi(sesi: Sesi | null) {
  if (typeof window === "undefined") return;
  if (sesi) window.localStorage.setItem(KUNCI_SESI, JSON.stringify(sesi));
  else window.localStorage.removeItem(KUNCI_SESI);
}

/* ------------------------------------------------------------------ */
/* MODE DEMO (tanpa database) — dipakai bila VITE_API_URL kosong       */
/* ------------------------------------------------------------------ */

type PenggunaDemo = Pengguna & { kata_sandi: string };

const penggunaBawaan: PenggunaDemo[] = [
  { id: 1, nama: "Super Admin", email: "admin@annyeong.id", no_hp: "081200000001", peran: "superadmin", kata_sandi: "admin123" },
  { id: 2, nama: "LPK Harapan", email: "lpk@annyeong.id", no_hp: "081200000002", peran: "lpk", kata_sandi: "lpk123" },
  { id: 3, nama: "Siswa Contoh", email: "siswa@annyeong.id", no_hp: "081200000003", peran: "siswa", kata_sandi: "siswa123" },
];

function bacaPenggunaDemo(): PenggunaDemo[] {
  if (typeof window === "undefined") return penggunaBawaan;
  try {
    const mentah = window.localStorage.getItem(KUNCI_PENGGUNA_DEMO);
    if (!mentah) {
      window.localStorage.setItem(KUNCI_PENGGUNA_DEMO, JSON.stringify(penggunaBawaan));
      return penggunaBawaan;
    }
    return JSON.parse(mentah) as PenggunaDemo[];
  } catch {
    return penggunaBawaan;
  }
}

function simpanPenggunaDemo(daftar: PenggunaDemo[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KUNCI_PENGGUNA_DEMO, JSON.stringify(daftar));
}

export const akunDemo = penggunaBawaan.map(({ email, no_hp, kata_sandi, peran }) => ({
  email,
  no_hp,
  kata_sandi,
  peran,
}));

/* ------------------------------------------------------------------ */
/* Pemanggilan API PHP                                                 */
/* ------------------------------------------------------------------ */

async function panggilApi<T>(jalur: string, isi: unknown, token?: string): Promise<T> {
  const respons = await fetch(`${API_URL}/${jalur}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(isi ?? {}),
  });

  let data: { sukses?: boolean; pesan?: string } & Record<string, unknown> = {};
  try {
    data = await respons.json();
  } catch {
    throw new Error("Server tidak merespons dengan benar. Pastikan Apache & MySQL di XAMPP aktif.");
  }
  if (!respons.ok || data.sukses === false) {
    throw new Error(data.pesan ?? "Terjadi kesalahan pada server.");
  }
  return data as T;
}

/* ------------------------------------------------------------------ */
/* Fungsi publik                                                       */
/* ------------------------------------------------------------------ */

const normalHp = (nilai: string) => nilai.replace(/[\s-]/g, "");

export async function daftar(data: DataDaftar): Promise<Sesi> {
  if (!MODE_DEMO) {
    const hasil = await panggilApi<{ token: string; pengguna: Pengguna }>("daftar.php", data);
    const sesi = { token: hasil.token, pengguna: hasil.pengguna };
    simpanSesi(sesi);
    return sesi;
  }

  const daftarPengguna = bacaPenggunaDemo();
  const email = data.email.trim().toLowerCase();
  const noHp = normalHp(data.no_hp);
  if (daftarPengguna.some((p) => p.email.toLowerCase() === email)) {
    throw new Error("Email sudah terdaftar.");
  }
  if (daftarPengguna.some((p) => normalHp(p.no_hp) === noHp)) {
    throw new Error("Nomor HP sudah terdaftar.");
  }

  const baru: PenggunaDemo = {
    id: Date.now(),
    nama: data.nama.trim(),
    email,
    no_hp: noHp,
    peran: data.peran ?? "siswa",
    kata_sandi: data.kata_sandi,
  };
  simpanPenggunaDemo([...daftarPengguna, baru]);

  const { kata_sandi: _rahasia, ...pengguna } = baru;
  const sesi: Sesi = { token: `demo-${baru.id}`, pengguna };
  simpanSesi(sesi);
  return sesi;
}

export async function masuk(data: DataMasuk): Promise<Sesi> {
  if (!MODE_DEMO) {
    const hasil = await panggilApi<{ token: string; pengguna: Pengguna }>("masuk.php", data);
    const sesi = { token: hasil.token, pengguna: hasil.pengguna };
    simpanSesi(sesi);
    return sesi;
  }

  const identitas = data.identitas.trim().toLowerCase();
  const cocok = bacaPenggunaDemo().find(
    (p) => p.email.toLowerCase() === identitas || normalHp(p.no_hp) === normalHp(identitas),
  );
  if (!cocok || cocok.kata_sandi !== data.kata_sandi) {
    throw new Error("Email/No HP atau kata sandi salah.");
  }
  const { kata_sandi: _rahasia, ...pengguna } = cocok;
  const sesi: Sesi = { token: `demo-${cocok.id}`, pengguna };
  simpanSesi(sesi);
  return sesi;
}

export async function keluar(token?: string) {
  if (!MODE_DEMO && token) {
    try {
      await panggilApi("keluar.php", {}, token);
    } catch {
      /* abaikan: sesi lokal tetap dihapus */
    }
  }
  simpanSesi(null);
}

/** Memeriksa sesi ke server (hanya bila memakai backend PHP). */
export async function periksaSesi(sesi: Sesi): Promise<Sesi | null> {
  if (MODE_DEMO) return sesi;
  try {
    const hasil = await panggilApi<{ pengguna: Pengguna }>("saya.php", {}, sesi.token);
    return { token: sesi.token, pengguna: hasil.pengguna };
  } catch {
    return null;
  }
}
