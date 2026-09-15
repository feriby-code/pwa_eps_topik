# Cara Instalasi — PWA Annyeong (Belajar Bahasa Korea)

Aplikasi ini adalah PWA (Progressive Web App) berbasis React (TanStack Start + Vite + Tailwind CSS).
Ikuti langkah berikut untuk menjalankannya di komputer Anda.

## 1. Persyaratan

- **Node.js versi 20 atau lebih baru** — unduh dari https://nodejs.org (pilih LTS), lalu instal seperti biasa.
- (Opsional) **Bun** dari https://bun.sh jika ingin memakai bun, tapi npm sudah cukup.

Cek versi Node setelah instalasi:

```bash
node -v
```

## 2. Ekstrak ZIP

Ekstrak file `pwa-annyeong.zip` ke folder mana pun, misalnya `D:\pwa-annyeong` atau `~/pwa-annyeong`.

## 3. Instal Dependensi

Buka terminal / Command Prompt / PowerShell di dalam folder hasil ekstrak, lalu jalankan:

```bash
npm install
```

(atau `bun install` jika memakai Bun)

## 4. Jalankan Aplikasi (Mode Pengembangan)

```bash
npm run dev
```

Lalu buka browser ke alamat yang muncul, biasanya:

```
http://localhost:8080
```

## 5. Membangun Versi Produksi (Build)

```bash
npm run build
```

Hasil build akan berada di folder `.output`. Untuk mencoba hasil build secara lokal:

```bash
npm run preview
```

## 6. Memasang sebagai PWA (Add to Home Screen)

Aplikasi sudah memiliki manifest PWA (ikon, nama, warna tema biru). Untuk memasangnya:

- **Android (Chrome):** buka situsnya → menu ⋮ → **Add to Home screen / Instal aplikasi**.
- **iPhone (Safari):** buka situsnya → tombol Share → **Add to Home Screen**.
- **Desktop (Chrome/Edge):** klik ikon instal di bilah alamat.

Catatan: pemasangan PWA hanya bekerja saat aplikasi diakses lewat HTTPS atau `localhost`.

## 7. Tentang Database MySQL

Koneksi database MySQL (XAMPP) belum dipakai pada tahap ini — semua halaman masih
berstatus "Coming Soon" kecuali beranda. Integrasi MySQL akan ditambahkan pada tahap
pengembangan isi fitur berikutnya.

## Struktur Halaman

- `/` — Beranda (menu utama berikon)
- `/buku` — Buku (Coming Soon)
- `/huruf-hangeul` — Huruf Hangeul (Coming Soon)
- `/kosa-kata` — Kosa Kata (Coming Soon)
- `/gambar` — Gambar (Coming Soon)
- `/tata-bahasa` — Tata Bahasa (Coming Soon)
- `/budaya-informasi` — Budaya dan Informasi (Coming Soon)
- `/uji-kemampuan` — Uji Kemampuan (Coming Soon)
- `/wawancara` — Wawancara (Coming Soon)
