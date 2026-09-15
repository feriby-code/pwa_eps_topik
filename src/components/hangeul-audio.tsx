import { Loader2, Play, Volume2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

/** Cache audio per teks agar tidak mengunduh ulang. */
const cacheAudio = new Map<string, HTMLAudioElement>();

function bunyikanLewatPeramban(teks: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const ucapan = new SpeechSynthesisUtterance(teks);
  ucapan.lang = "ko-KR";
  ucapan.rate = 1;
  const suaraKorea = window.speechSynthesis
    .getVoices()
    .find((suara) => suara.lang?.toLowerCase().startsWith("ko"));
  if (suaraKorea) ucapan.voice = suaraKorea;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(ucapan);
  return true;
}

export function useBunyiHangeul() {
  const [teksAktif, setTeksAktif] = useState<string | null>(null);
  const [teksMemuat, setTeksMemuat] = useState<string | null>(null);
  const aktifRef = useRef<HTMLAudioElement | null>(null);

  const bunyikan = useCallback(async (teks: string) => {
    aktifRef.current?.pause();
    if (aktifRef.current) aktifRef.current.currentTime = 0;

    let audio = cacheAudio.get(teks);
    if (!audio) {
      setTeksMemuat(teks);
      audio = new Audio(`/api/public/tts?q=${encodeURIComponent(teks)}`);
      audio.preload = "auto";
      cacheAudio.set(teks, audio);
    }

    aktifRef.current = audio;
    audio.onended = () => setTeksAktif(null);
    audio.onerror = () => {
      setTeksMemuat(null);
      setTeksAktif(null);
      bunyikanLewatPeramban(teks);
    };

    try {
      await audio.play();
      setTeksAktif(teks);
    } catch {
      bunyikanLewatPeramban(teks);
    } finally {
      setTeksMemuat(null);
    }
  }, []);

  return { bunyikan, teksAktif, teksMemuat };
}

type Props = {
  teks: string;
  label?: string;
  aktif?: boolean;
  memuat?: boolean;
  onClick: (teks: string) => void;
};

export function TombolBunyi({ teks, label, aktif, memuat, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick(teks)}
      aria-label={`Dengarkan pelafalan ${label ?? teks}`}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all active:scale-95 ${
        aktif
          ? "border-primary bg-primary text-primary-foreground"
          : "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
      }`}
    >
      {memuat ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : aktif ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <Play className="h-4 w-4 fill-current" />
      )}
    </button>
  );
}
