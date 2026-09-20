/**
 * Alamat backend PHP (XAMPP).
 *
 * Isi file `.env` di root proyek dengan:
 *   VITE_API_URL=http://localhost/annyeong-api
 *
 * Jika kosong (misalnya saat dibuka di Lovable), aplikasi otomatis memakai
 * MODE DEMO: data pengguna disimpan di browser (localStorage) sehingga login
 * tetap bisa dicoba tanpa database.
 */
export const API_URL = (import.meta.env["VITE_API_URL"] ?? "").replace(/\/+$/, "");

export const MODE_DEMO = API_URL === "";

export const KUNCI_SESI = "annyeong.sesi";
export const KUNCI_PENGGUNA_DEMO = "annyeong.pengguna-demo";
