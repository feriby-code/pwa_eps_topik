import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  bacaSesi,
  daftar as apiDaftar,
  keluar as apiKeluar,
  masuk as apiMasuk,
  periksaSesi,
  type DataDaftar,
  type DataMasuk,
  type Sesi,
} from "@/lib/auth-client";
import { bisaKelola, daftarModulKelola, type Modul, type Pengguna } from "@/lib/auth-types";

type NilaiAuth = {
  pengguna: Pengguna | null;
  sudahSiap: boolean;
  masuk: (data: DataMasuk) => Promise<Pengguna>;
  daftar: (data: DataDaftar) => Promise<Pengguna>;
  keluar: () => Promise<void>;
  bisaKelola: (modul: Modul) => boolean;
  modulKelola: readonly Modul[];
};

const AuthContext = createContext<NilaiAuth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sesi, setSesi] = useState<Sesi | null>(null);
  const [sudahSiap, setSudahSiap] = useState(false);

  useEffect(() => {
    let aktif = true;
    const tersimpan = bacaSesi();
    if (!tersimpan) {
      setSudahSiap(true);
      return;
    }
    setSesi(tersimpan);
    periksaSesi(tersimpan).then((hasil) => {
      if (!aktif) return;
      setSesi(hasil);
      setSudahSiap(true);
    });
    return () => {
      aktif = false;
    };
  }, []);

  const masuk = useCallback(async (data: DataMasuk) => {
    const hasil = await apiMasuk(data);
    setSesi(hasil);
    return hasil.pengguna;
  }, []);

  const daftar = useCallback(async (data: DataDaftar) => {
    const hasil = await apiDaftar(data);
    setSesi(hasil);
    return hasil.pengguna;
  }, []);

  const keluar = useCallback(async () => {
    await apiKeluar(sesi?.token);
    setSesi(null);
  }, [sesi]);

  const nilai = useMemo<NilaiAuth>(() => {
    const peran = sesi?.pengguna.peran;
    return {
      pengguna: sesi?.pengguna ?? null,
      sudahSiap,
      masuk,
      daftar,
      keluar,
      bisaKelola: (modul: Modul) => bisaKelola(peran, modul),
      modulKelola: daftarModulKelola(peran),
    };
  }, [sesi, sudahSiap, masuk, daftar, keluar]);

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const nilai = useContext(AuthContext);
  if (!nilai) throw new Error("useAuth harus dipakai di dalam <AuthProvider>.");
  return nilai;
}
