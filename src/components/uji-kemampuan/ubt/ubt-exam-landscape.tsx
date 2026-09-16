import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Home,
  RotateCcw,
  Volume2,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PilihanKunci, SoalUbt, TampilanUbtMode, UbtKategori, UbtSet } from "./types";

interface UbtExamLandscapeProps {
  setUjian: UbtSet;
  kategori: UbtKategori;
  onSelesaiDanKembaliKeMenu: () => void;
}

export function UbtExamLandscape({
  setUjian,
  kategori,
  onSelesaiDanKembaliKeMenu,
}: UbtExamLandscapeProps) {
  const [mode, setMode] = useState<TampilanUbtMode>("grid_soal");
  const [indeksSoalAktif, setIndeksSoalAktif] = useState<number>(0);
  const [jawabanUser, setJawabanUser] = useState<Record<number, PilihanKunci>>({});
  const [dialogKirimBuka, setDialogKirimBuka] = useState(false);
  const [dialogPenjelasanBuka, setDialogPenjelasanBuka] = useState(false);

  // Timer countdown (default set durasi dalam detik, misal 50 menit)
  const totalDetik = useMemo(() => setUjian.durasiMenit * 60, [setUjian.durasiMenit]);
  const [sisaWaktu, setSisaWaktu] = useState<number>(totalDetik);
  const [audioSedangPutar, setAudioSedangPutar] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown effect
  useEffect(() => {
    if (mode === "hasil" || mode === "review_grid" || mode === "review_soal") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSisaWaktu((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setMode("hasil");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  const formatWaktu = (detik: number) => {
    const m = Math.floor(detik / 60);
    const s = detik % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalSoal = setUjian.daftarSoal.length;
  const jumlahDikerjakan = Object.keys(jawabanUser).length;
  const jumlahBelumDikerjakan = totalSoal - jumlahDikerjakan;

  const soalAktif: SoalUbt | undefined = setUjian.daftarSoal[indeksSoalAktif];

  // Kalkulasi Hasil
  const hitungHasil = useMemo(() => {
    let benarBacaan = 0;
    let salahBacaan = 0;
    let benarPendengaran = 0;
    let salahPendengaran = 0;

    setUjian.daftarSoal.forEach((soal) => {
      const userJawab = jawabanUser[soal.nomor];
      const isBenar = userJawab === soal.kunciJawaban;

      if (soal.bagian === "bacaan") {
        if (isBenar) benarBacaan++;
        else salahBacaan++;
      } else {
        if (isBenar) benarPendengaran++;
        else salahPendengaran++;
      }
    });

    const totalBenar = benarBacaan + benarPendengaran;
    const totalSalah = totalSoal - totalBenar;

    return {
      totalBenar,
      totalSalah,
      benarBacaan,
      salahBacaan,
      benarPendengaran,
      salahPendengaran,
    };
  }, [setUjian.daftarSoal, jawabanUser, totalSoal]);

  // Audio / TTS playback
  const putarAudioSoal = (soal: SoalUbt) => {
    if (typeof window === "undefined") return;
    const teks = soal.teksAudio || soal.soal;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(teks);
      utterance.lang = "ko-KR";
      utterance.rate = 0.85;

      const suaraKorea = window.speechSynthesis
        .getVoices()
        .find((v) => v.lang.toLowerCase().startsWith("ko"));
      if (suaraKorea) utterance.voice = suaraKorea;

      utterance.onstart = () => setAudioSedangPutar(true);
      utterance.onend = () => setAudioSedangPutar(false);
      utterance.onerror = () => setAudioSedangPutar(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePilihNomor = (nomor: number) => {
    const idx = setUjian.daftarSoal.findIndex((s) => s.nomor === nomor);
    if (idx !== -1) {
      setIndeksSoalAktif(idx);
      if (mode === "review_grid") {
        setMode("review_soal");
      } else {
        setMode("soal");
      }
    }
  };

  const handlePilihJawaban = (pilihan: PilihanKunci) => {
    if (!soalAktif || mode === "review_soal") return;
    setJawabanUser((prev) => ({
      ...prev,
      [soalAktif.nomor]: pilihan,
    }));
  };

  // Navigasi soal
  const handleSebelumnya = () => {
    if (indeksSoalAktif > 0) {
      setIndeksSoalAktif((prev) => prev - 1);
    }
  };

  const handleSelanjutnya = () => {
    if (indeksSoalAktif < totalSoal - 1) {
      setIndeksSoalAktif((prev) => prev + 1);
    }
  };

  // ==========================================
  // SCREEN 3: GRID DAFTAR NOMOR SOAL (LANDSCAPE)
  // ==========================================
  if (mode === "grid_soal") {
    const soalBacaan = setUjian.daftarSoal.filter((s) => s.bagian === "bacaan");
    const soalPendengaran = setUjian.daftarSoal.filter((s) => s.bagian === "pendengaran");

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-2 sm:p-4 text-zinc-100 font-sans">
        {/* Frame Tablet / Landscape */}
        <div className="w-full max-w-5xl rounded-3xl border-4 border-zinc-700 bg-zinc-900 p-4 sm:p-6 shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSelesaiDanKembaliKeMenu}
                className="h-8 rounded-full border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Keluar
              </Button>
              <h2 className="text-sm sm:text-base font-bold text-zinc-200">
                {kategori.judul} <span className="text-zinc-500">|</span> {setUjian.judul}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400">
                Dikerjakan: <strong className="text-primary">{jumlahDikerjakan}</strong> / {totalSoal}
              </span>
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-sm font-bold text-amber-400">
                <Clock className="h-4 w-4" />
                {formatWaktu(sisaWaktu)}
              </div>
            </div>
          </div>

          {/* Konten Grid 2 Kolom: Soal Bacaan (Kiri) & Soal Pendengaran (Kanan) */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Kolom Kiri: Soal Bacaan (1-20) */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
              <h3 className="mb-3 text-base font-bold tracking-wide text-zinc-200 uppercase">
                Soal Bacaan
              </h3>
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                {soalBacaan.map((s) => {
                  const terisi = !!jawabanUser[s.nomor];
                  return (
                    <button
                      key={s.nomor}
                      onClick={() => handlePilihNomor(s.nomor)}
                      className={`flex h-10 sm:h-11 items-center justify-center rounded-xl border font-bold text-sm transition-all active:scale-95 ${
                        terisi
                          ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                          : "border-zinc-700 bg-zinc-800/90 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-700"
                      }`}
                    >
                      {s.nomor}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kolom Kanan: Soal Pendengaran (21-40) */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
              <h3 className="mb-3 text-base font-bold tracking-wide text-zinc-200 uppercase">
                Soal Pendengaran
              </h3>
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                {soalPendengaran.map((s) => {
                  const terisi = !!jawabanUser[s.nomor];
                  return (
                    <button
                      key={s.nomor}
                      onClick={() => handlePilihNomor(s.nomor)}
                      className={`flex h-10 sm:h-11 items-center justify-center rounded-xl border font-bold text-sm transition-all active:scale-95 ${
                        terisi
                          ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                          : "border-zinc-700 bg-zinc-800/90 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-700"
                      }`}
                    >
                      {s.nomor}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer & Tombol Selesaikan Ujian sesuai mockup */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 pt-4">
            <p className="text-xs text-zinc-400 text-center sm:text-left max-w-xl">
              Silahkan Pilih Salah Satu Nomor Untuk Mengerjakan Soal, Klik Tombol Selesaikan Ujian
              Apabila Sudah Selesai Semua dan Merasa Yakin Dengan Jawaban
            </p>
            <Button
              onClick={() => setDialogKirimBuka(true)}
              className="h-11 px-6 rounded-xl font-bold bg-zinc-100 text-zinc-900 hover:bg-white active:scale-95 shadow-md shrink-0"
            >
              Selesaikan Ujian
            </Button>
          </div>
        </div>

        {/* Dialog Konfirmasi Kirim Ujian sesuai gambar 1 */}
        <Dialog open={dialogKirimBuka} onOpenChange={setDialogKirimBuka}>
          <DialogContent className="max-w-sm rounded-2xl border-zinc-700 bg-zinc-900 text-zinc-100 p-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl font-black tracking-wide text-zinc-100 text-center">
                Kirim Ujian?
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-center text-xs">
                Pastikan seluruh jawaban Anda sudah terisi dengan benar.
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 space-y-2 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Soal :</span>
                <span className="font-bold text-zinc-100">{totalSoal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Soal Dikerjakan :</span>
                <span className="font-bold text-emerald-400">{jumlahDikerjakan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Soal Belum Dikerjakan :</span>
                <span className="font-bold text-amber-400">{jumlahBelumDikerjakan}</span>
              </div>
            </div>

            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setDialogKirimBuka(false)}
                className="flex-1 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  setDialogKirimBuka(false);
                  setMode("hasil");
                }}
                className="flex-1 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90"
              >
                Kirim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ==========================================
  // SCREEN 4: PENGERJAAN SOAL (LANDSCAPE VIEW)
  // ==========================================
  if (mode === "soal" && soalAktif) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-2 sm:p-4 text-zinc-100 font-sans">
        {/* Frame Tablet / Landscape Mockup */}
        <div className="flex w-full max-w-5xl flex-col rounded-3xl border-4 border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden min-h-[580px]">
          {/* Header Bar Sesuai Gambar 2 */}
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 sm:px-6 py-3 gap-2">
            <span className="font-bold text-sm sm:text-base text-zinc-100">{setUjian.judul}</span>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-300">
              <span>
                Dikerjakan : <strong className="text-emerald-400">{jumlahDikerjakan}</strong>
              </span>
              <span>
                Belum dikerjakan : <strong className="text-amber-400">{jumlahBelumDikerjakan}</strong>
              </span>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-1.5 rounded-xl border-2 border-zinc-600 bg-zinc-950 px-3.5 py-1 font-mono text-base font-black text-amber-400">
              <Clock className="h-4 w-4" />
              {formatWaktu(sisaWaktu)}
            </div>
          </div>

          {/* Area Konten Soal (2 Kolom: Kiri Soal, Kanan Pilihan A/B/C/D) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-6 bg-zinc-950/40">
            {/* Kolom Kiri: Nomor, Jenis Soal, Isi Soal */}
            <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5">
              <div>
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-3">
                  <span className="rounded-lg bg-primary/20 px-2 py-0.5 font-mono text-xs font-black text-primary">
                    NO {soalAktif.nomor.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 tracking-wide">
                    {soalAktif.jenisSoal}
                  </span>
                </div>

                {/* Teks Soal */}
                <div className="mt-2 text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-line font-medium">
                  {soalAktif.soal}
                </div>

                {/* Tombol Audio untuk Soal Pendengaran */}
                {soalAktif.bagian === "pendengaran" && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3">
                    <Button
                      size="sm"
                      onClick={() => putarAudioSoal(soalAktif)}
                      className="rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90"
                    >
                      <Volume2 className="mr-1.5 h-4 w-4" />
                      {audioSedangPutar ? "Memutar..." : "Putar Audio"}
                    </Button>
                    <span className="text-xs text-primary/90 font-medium">
                      Dengarkan rekaman suara dengan jelas
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 text-[11px] text-zinc-500">
                EPS-TOPIK UBT Simulation • {soalAktif.bagian === "bacaan" ? "Reading" : "Listening"}
              </div>
            </div>

            {/* Kolom Kanan: Pilihan Jawaban (A, B, C, D) Sesuai Gambar 2 */}
            <div className="md:col-span-5 flex flex-col justify-center gap-3">
              {soalAktif.pilihan.map((opsi) => {
                const isSelected = jawabanUser[soalAktif.nomor] === opsi.id;
                return (
                  <button
                    key={opsi.id}
                    onClick={() => handlePilihJawaban(opsi.id)}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-3 sm:p-4 text-left font-medium transition-all active:scale-[0.99] ${
                      isSelected
                        ? "border-primary bg-primary/15 text-zinc-100 shadow-sm shadow-primary/20"
                        : "border-zinc-700/80 bg-zinc-900/90 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 font-bold text-sm ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-zinc-600 bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {opsi.id}
                    </span>
                    <span className="text-sm font-semibold">{opsi.teks}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: [Sebelumnya] [Semua Soal] [Selanjutnya] Sesuai Gambar 2 */}
          <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900 px-4 sm:px-6 py-3.5">
            <Button
              variant="outline"
              disabled={indeksSoalAktif === 0}
              onClick={handleSebelumnya}
              className="h-10 px-4 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-semibold text-xs sm:text-sm"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Sebelumnya
            </Button>

            <Button
              variant="outline"
              onClick={() => setMode("grid_soal")}
              className="h-10 px-5 rounded-xl border-zinc-600 bg-zinc-800/90 font-bold text-xs sm:text-sm text-zinc-100 hover:bg-zinc-700"
            >
              Semua Soal
            </Button>

            <Button
              variant="outline"
              disabled={indeksSoalAktif === totalSoal - 1}
              onClick={handleSelanjutnya}
              className="h-10 px-4 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-semibold text-xs sm:text-sm"
            >
              Selanjutnya <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SCREEN 5: HASIL UJIAN (LANDSCAPE VIEW)
  // ==========================================
  if (mode === "hasil") {
    const { totalBenar, totalSalah, benarBacaan, salahBacaan, benarPendengaran, salahPendengaran } =
      hitungHasil;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-2 sm:p-4 text-zinc-100 font-sans">
        <div className="w-full max-w-4xl rounded-3xl border-4 border-zinc-700 bg-zinc-900 p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <h1 className="border-b border-zinc-800 pb-4 text-center text-2xl sm:text-3xl font-black tracking-wider text-zinc-100 uppercase">
            HASIL UJIAN
          </h1>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Sisi Kiri: Rekap Data Sesuai Gambar 2 */}
            <div className="md:col-span-7 space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 font-mono text-sm">
              <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                <span className="text-zinc-400">Judul Ujian :</span>
                <span className="font-bold text-zinc-100">{setUjian.judul}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Soal :</span>
                <span className="font-bold text-zinc-100">{totalSoal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Dikerjakan :</span>
                <span className="font-bold text-zinc-200">{jumlahDikerjakan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Belum Dikerjakan :</span>
                <span className="font-bold text-amber-400">{jumlahBelumDikerjakan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Benar :</span>
                <span className="font-bold text-emerald-400">{totalBenar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Salah :</span>
                <span className="font-bold text-rose-400">{totalSalah}</span>
              </div>
            </div>

            {/* Sisi Kanan: Hasil Soal Bacaan & Soal Pendengaran */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-center">
                <h4 className="font-bold text-sm text-zinc-300 uppercase mb-2">Hasil Soal Bacaan</h4>
                <div className="flex justify-around items-center font-mono">
                  <div>
                    <span className="block text-2xl font-black text-emerald-400">{benarBacaan}</span>
                    <span className="text-xs text-zinc-500 font-semibold">Benar</span>
                  </div>
                  <div className="h-8 w-px bg-zinc-800" />
                  <div>
                    <span className="block text-2xl font-black text-rose-400">{salahBacaan}</span>
                    <span className="text-xs text-zinc-500 font-semibold">Salah</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-center">
                <h4 className="font-bold text-sm text-zinc-300 uppercase mb-2">
                  Hasil Soal Pendengaran
                </h4>
                <div className="flex justify-around items-center font-mono">
                  <div>
                    <span className="block text-2xl font-black text-emerald-400">
                      {benarPendengaran}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold">Benar</span>
                  </div>
                  <div className="h-8 w-px bg-zinc-800" />
                  <div>
                    <span className="block text-2xl font-black text-rose-400">
                      {salahPendengaran}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold">Salah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-zinc-800 pt-5">
            <Button
              onClick={() => {
                setIndeksSoalAktif(0);
                setMode("review_grid");
              }}
              className="w-full sm:w-auto h-11 px-8 rounded-xl font-bold bg-zinc-100 text-zinc-900 hover:bg-white active:scale-95 shadow-md"
            >
              Review Soal
            </Button>
            <Button
              variant="outline"
              onClick={onSelesaiDanKembaliKeMenu}
              className="w-full sm:w-auto h-11 px-6 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-semibold"
            >
              <Home className="mr-1.5 h-4 w-4" /> Menu Utama UBT
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SCREEN 6: REVIEW GRID (LANDSCAPE VIEW - GAMBAR 3)
  // ==========================================
  if (mode === "review_grid") {
    const soalBacaan = setUjian.daftarSoal.filter((s) => s.bagian === "bacaan");
    const soalPendengaran = setUjian.daftarSoal.filter((s) => s.bagian === "pendengaran");

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-2 sm:p-4 text-zinc-100 font-sans">
        <div className="w-full max-w-5xl rounded-3xl border-4 border-zinc-700 bg-zinc-900 p-4 sm:p-6 shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-3 gap-2">
            <h2 className="text-sm sm:text-base font-bold text-zinc-200">
              Review Ujian <span className="text-zinc-500">|</span> {setUjian.judul}
            </h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Benar: {hitungHasil.totalBenar}
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <XCircle className="h-3.5 w-3.5" /> Salah: {hitungHasil.totalSalah}
              </span>
            </div>
          </div>

          {/* Grid 2 Kolom Review: Soal Bacaan (1-20) & Soal Pendengaran (21-40) */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
              <h3 className="mb-3 text-base font-bold tracking-wide text-zinc-200 uppercase">
                Soal Bacaan
              </h3>
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                {soalBacaan.map((s) => {
                  const userJawab = jawabanUser[s.nomor];
                  const isBenar = userJawab === s.kunciJawaban;
                  return (
                    <button
                      key={s.nomor}
                      onClick={() => handlePilihNomor(s.nomor)}
                      className={`flex h-10 sm:h-11 items-center justify-center rounded-xl border font-bold text-sm transition-all active:scale-95 ${
                        !userJawab
                          ? "border-zinc-700 bg-zinc-800/80 text-zinc-400 hover:border-zinc-500"
                          : isBenar
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                            : "border-rose-500 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                      }`}
                    >
                      {s.nomor}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
              <h3 className="mb-3 text-base font-bold tracking-wide text-zinc-200 uppercase">
                Soal Pendengaran
              </h3>
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                {soalPendengaran.map((s) => {
                  const userJawab = jawabanUser[s.nomor];
                  const isBenar = userJawab === s.kunciJawaban;
                  return (
                    <button
                      key={s.nomor}
                      onClick={() => handlePilihNomor(s.nomor)}
                      className={`flex h-10 sm:h-11 items-center justify-center rounded-xl border font-bold text-sm transition-all active:scale-95 ${
                        !userJawab
                          ? "border-zinc-700 bg-zinc-800/80 text-zinc-400 hover:border-zinc-500"
                          : isBenar
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                            : "border-rose-500 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                      }`}
                    >
                      {s.nomor}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tombol Kembali Menu Utama sesuai Gambar 3 */}
          <div className="mt-6 flex justify-end border-t border-zinc-800 pt-4">
            <Button
              onClick={onSelesaiDanKembaliKeMenu}
              className="h-11 px-6 rounded-xl font-bold bg-zinc-100 text-zinc-900 hover:bg-white active:scale-95 shadow-md"
            >
              Kembali Menu Utama
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SCREEN 7: QUESTION REVIEW VIEW (GAMBAR 3)
  // ==========================================
  if (mode === "review_soal" && soalAktif) {
    const userJawab = jawabanUser[soalAktif.nomor];
    const isBenar = userJawab === soalAktif.kunciJawaban;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-2 sm:p-4 text-zinc-100 font-sans">
        <div className="flex w-full max-w-5xl flex-col rounded-3xl border-4 border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden min-h-[580px]">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 sm:px-6 py-3">
            <span className="font-bold text-sm sm:text-base text-zinc-100">
              Review: {setUjian.judul}
            </span>
            <div className="flex items-center gap-2">
              {isBenar ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Jawaban Anda Benar
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-3 py-1 text-xs font-bold text-rose-400 border border-rose-500/30">
                  <XCircle className="h-3.5 w-3.5" /> Jawaban Anda Salah / Kosong
                </span>
              )}
            </div>
          </div>

          {/* Area Review Soal */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-6 bg-zinc-950/40">
            {/* Kiri: NO, Jenis Soal, Teks Soal & Tombol Penjelasan Jawaban */}
            <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5">
              <div>
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-3">
                  <span className="rounded-lg bg-primary/20 px-2 py-0.5 font-mono text-xs font-black text-primary">
                    NO {soalAktif.nomor.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 tracking-wide">
                    {soalAktif.jenisSoal}
                  </span>
                </div>

                <div className="mt-2 text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-line font-medium">
                  {soalAktif.soal}
                </div>

                {soalAktif.bagian === "pendengaran" && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => putarAudioSoal(soalAktif)}
                      className="rounded-xl border-zinc-700 bg-zinc-800 text-xs text-zinc-200 hover:bg-zinc-700"
                    >
                      <Volume2 className="mr-1.5 h-3.5 w-3.5" /> Putar Ulang Audio
                    </Button>
                  </div>
                )}
              </div>

              {/* Tombol & Card Penjelasan Jawaban Sesuai Gambar 3 */}
              <div className="mt-4 border-t border-zinc-800 pt-3">
                <Button
                  onClick={() => setDialogPenjelasanBuka(true)}
                  className="rounded-xl bg-zinc-100 text-zinc-900 font-bold hover:bg-white text-xs sm:text-sm px-4"
                >
                  <HelpCircle className="mr-1.5 h-4 w-4" /> Penjelasan Jawaban
                </Button>
              </div>
            </div>

            {/* Kanan: Pilihan Jawaban dengan Kunci Jawaban HIJAU sesuai Gambar 3 */}
            <div className="md:col-span-5 flex flex-col justify-center gap-3">
              {soalAktif.pilihan.map((opsi) => {
                const isKunci = opsi.id === soalAktif.kunciJawaban;
                const isUserPilih = userJawab === opsi.id;

                return (
                  <div
                    key={opsi.id}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-3 sm:p-4 text-left font-medium transition-all ${
                      isKunci
                        ? "border-emerald-500 bg-emerald-500/25 text-emerald-100 shadow-sm shadow-emerald-500/30"
                        : isUserPilih
                          ? "border-rose-500 bg-rose-500/20 text-rose-200"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 opacity-80"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 font-bold text-sm ${
                        isKunci
                          ? "border-emerald-400 bg-emerald-500 text-zinc-950 font-black"
                          : isUserPilih
                            ? "border-rose-500 bg-rose-500 text-white"
                            : "border-zinc-700 bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {opsi.id}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-semibold">{opsi.teks}</span>
                      {isKunci && (
                        <span className="ml-2 inline-block rounded-md bg-emerald-500/30 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                          Kunci Benar
                        </span>
                      )}
                      {isUserPilih && !isKunci && (
                        <span className="ml-2 inline-block rounded-md bg-rose-500/30 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                          Pilihan Anda
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: [Sebelumnya] [Semua Soal] [Selanjutnya] */}
          <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900 px-4 sm:px-6 py-3.5">
            <Button
              variant="outline"
              disabled={indeksSoalAktif === 0}
              onClick={handleSebelumnya}
              className="h-10 px-4 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-semibold text-xs sm:text-sm"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Sebelumnya
            </Button>

            <Button
              variant="outline"
              onClick={() => setMode("review_grid")}
              className="h-10 px-5 rounded-xl border-zinc-600 bg-zinc-800/90 font-bold text-xs sm:text-sm text-zinc-100 hover:bg-zinc-700"
            >
              Semua Soal
            </Button>

            <Button
              variant="outline"
              disabled={indeksSoalAktif === totalSoal - 1}
              onClick={handleSelanjutnya}
              className="h-10 px-4 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-semibold text-xs sm:text-sm"
            >
              Selanjutnya <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dialog / Modal Penjelasan Jawaban sesuai Gambar 3 */}
        <Dialog open={dialogPenjelasanBuka} onOpenChange={setDialogPenjelasanBuka}>
          <DialogContent className="max-w-md rounded-2xl border-zinc-700 bg-zinc-900 text-zinc-100 p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-wide text-zinc-100 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-emerald-400" />
                Penjelasan Jawaban (Soal No. {soalAktif.nomor})
              </DialogTitle>
            </DialogHeader>

            <div className="my-3 space-y-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                Kunci Jawaban: {soalAktif.kunciJawaban}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {soalAktif.penjelasan}
              </p>
            </div>

            <DialogFooter>
              <Button
                onClick={() => setDialogPenjelasanBuka(false)}
                className="w-full rounded-xl bg-zinc-100 text-zinc-900 font-bold hover:bg-white"
              >
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return null;
}
