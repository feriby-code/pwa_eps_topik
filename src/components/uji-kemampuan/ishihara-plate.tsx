// src/components/uji-kemampuan/ishihara-plate.tsx
// Komponen visual plate Ishihara: dot matrix SVG yang dibentuk dari teks simbol

import { useMemo } from "react";

type Titik = { x: number; y: number; r: number; warna: string };

const UKURAN = 320;
const RADIUS_PLATE = UKURAN / 2 - 4;

/** PRNG deterministik agar plate sama setiap render */
function acak(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

/**
 * Bentuk mask simbol memakai canvas offscreen (hanya di browser).
 * Fallback: mask lingkaran tengah bila canvas tidak tersedia.
 */
function buatMask(simbol: string): ((x: number, y: number) => boolean) | null {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = UKURAN;
  c.height = UKURAN;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const ukuranFont = simbol.length > 1 ? 170 : 210;
  ctx.font = `bold ${ukuranFont}px "Arial Black", Arial, sans-serif`;
  ctx.fillText(simbol, UKURAN / 2, UKURAN / 2 + 6);
  const data = ctx.getImageData(0, 0, UKURAN, UKURAN).data;
  return (x: number, y: number) => {
    const px = Math.round(x);
    const py = Math.round(y);
    if (px < 0 || py < 0 || px >= UKURAN || py >= UKURAN) return false;
    return data[(py * UKURAN + px) * 4 + 3] > 128;
  };
}

export function IshiharaPlate({
  simbol,
  warnaSimbol,
  warnaLatar,
  jumlahTitik = 1600,
  label,
}: {
  simbol: string;
  warnaSimbol: string[];
  warnaLatar: string[];
  jumlahTitik?: number;
  label?: string;
}) {
  const titik = useMemo<Titik[]>(() => {
    const rand = acak(simbol.split("").reduce((a, c) => a + c.charCodeAt(0), 7) * 97);
    const mask = buatMask(simbol);
    const hasil: Titik[] = [];
    let percobaan = 0;
    while (hasil.length < jumlahTitik && percobaan < jumlahTitik * 40) {
      percobaan++;
      const sudut = rand() * Math.PI * 2;
      const jarak = Math.sqrt(rand()) * RADIUS_PLATE;
      const x = UKURAN / 2 + Math.cos(sudut) * jarak;
      const y = UKURAN / 2 + Math.sin(sudut) * jarak;
      const r = 2.2 + rand() * 4.4;
      // hindari tumpang tindih berat
      let bentrok = false;
      for (let i = hasil.length - 1; i >= Math.max(0, hasil.length - 90); i--) {
        const t = hasil[i];
        const dx = t.x - x;
        const dy = t.y - y;
        if (dx * dx + dy * dy < (t.r + r) * (t.r + r) * 0.72) {
          bentrok = true;
          break;
        }
      }
      if (bentrok) continue;
      const didalam = mask
        ? mask(x, y)
        : Math.hypot(x - UKURAN / 2, y - UKURAN / 2) < RADIUS_PLATE * 0.42;
      const palet = didalam ? warnaSimbol : warnaLatar;
      hasil.push({ x, y, r, warna: palet[Math.floor(rand() * palet.length)] });
    }
    return hasil;
  }, [simbol, warnaSimbol, warnaLatar, jumlahTitik]);

  return (
    <svg
      viewBox={`0 0 ${UKURAN} ${UKURAN}`}
      role="img"
      aria-label={label ?? "Plate uji buta warna Ishihara"}
      className="mx-auto h-auto w-full max-w-[320px] select-none"
    >
      <circle cx={UKURAN / 2} cy={UKURAN / 2} r={RADIUS_PLATE} fill="#f4f1e8" />
      {titik.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={t.warna} />
      ))}
    </svg>
  );
}

export default IshiharaPlate;
