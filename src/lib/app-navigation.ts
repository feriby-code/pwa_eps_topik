import {
  BookOpen,
  Building2,
  Camera,
  CircleUserRound,
  ClipboardCheck,
  GraduationCap,
  Home,
  Image,
  Languages,
  Map,
  MessageCircleQuestion,
  ScrollText,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";

export const mainMenus = [
  { slug: "buku", label: "Buku", description: "Materi belajar terstruktur", icon: BookOpen, tone: "sky" },
  { slug: "huruf-hangeul", label: "Huruf Hangeul", description: "Kenali abjad Korea", icon: Languages, tone: "coral" },
  { slug: "kosa-kata", label: "Kosa Kata", description: "Perkaya kata harian", icon: ScrollText, tone: "amber" },
  { slug: "gambar", label: "Gambar", description: "Belajar lewat visual", icon: Image, tone: "mint" },
  { slug: "tata-bahasa", label: "Tata Bahasa", description: "Susun kalimat tepat", icon: GraduationCap, tone: "blue" },
  { slug: "budaya-informasi", label: "Budaya & Informasi", description: "Kenali Korea lebih dekat", icon: UsersRound, tone: "rose" },
  { slug: "uji-kemampuan", label: "Uji Kemampuan", description: "Ukur progres belajarmu", icon: ClipboardCheck, tone: "green" },
  { slug: "wawancara", label: "Wawancara", description: "Persiapan percakapan", icon: MessageCircleQuestion, tone: "violet" },
] as const;

export const bottomMenus = [
  { slug: "beranda", label: "Beranda", path: "/", icon: Home },
  { slug: "roadmap", label: "Roadmap", path: "/roadmap", icon: Map },
  { slug: "hasil", label: "Hasil", path: "/hasil", icon: Trophy },
  { slug: "lembaga", label: "Lembaga", path: "/lembaga", icon: Building2 },
  { slug: "profil", label: "Profil", path: "/profil", icon: CircleUserRound },
] as const;

export const quickMenus = [
  { label: "Buku 2024", detail: "Bab 14", icon: BookOpen, slug: "buku" },
  { label: "Huruf Hangeul", detail: "Vokal tunggal", icon: Languages, slug: "huruf-hangeul" },
  { label: "Kosa Kata", detail: "Antonim", icon: Sparkles, slug: "kosa-kata" },
] as const;

export function titleFromSlug(slug: string) {
  const main = mainMenus.find((item) => item.slug === slug);
  if (main) return main.label;
  const bottom = bottomMenus.find((item) => item.slug === slug);
  return bottom?.label ?? "Fitur";
}

export { Camera };