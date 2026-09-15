import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TombolBunyi, useBunyiHangeul } from "@/components/hangeul-audio";
import { kelompokSatuan } from "@/lib/hangeul-data";

export const Route = createFileRoute("/hangeul/satuan")({
  head: () => ({
    meta: [
      { title: "Satuan Bahasa Korea — Annyeong" },
      {
        name: "description",
        content:
          "Satuan hitung bahasa Korea: hari, unit kendaraan dan rumah, set pakaian, serta buah, lengkap dengan audio.",
      },
      { property: "og:title", content: "Satuan Bahasa Korea — Annyeong" },
      {
        property: "og:description",
        content: "Pelajari kata bantu hitung Korea sesuai jenis bendanya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SatuanHangeul,
});

function SatuanHangeul() {
  const { bunyikan, teksAktif, teksMemuat } = useBunyiHangeul();

  return (
    <main className="min-h-screen bg-app-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="-ml-2 rounded-full">
          <Link to="/hangeul" aria-label="Kembali ke menu Huruf Hangeul">
            <ArrowLeft /> Huruf Hangeul
          </Link>
        </Button>

        <h1 className="mt-6 font-display text-2xl font-extrabold sm:text-3xl">
          Huruf Hangeul | Satuan
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Ketuk salah satu kelompok untuk melihat daftar satuan dan mendengarkan bunyinya.
        </p>

        <Accordion
          type="single"
          collapsible
          defaultValue={kelompokSatuan[0]!.judul}
          className="mt-5 space-y-3"
        >
          {kelompokSatuan.map((kelompok) => (
            <AccordionItem
              key={kelompok.judul}
              value={kelompok.judul}
              className="rounded-2xl border border-border bg-surface px-4 shadow-soft"
            >
              <AccordionTrigger className="font-display text-sm font-extrabold hover:no-underline">
                {kelompok.judul}
              </AccordionTrigger>
              <AccordionContent>
                {kelompok.catatan ? (
                  <p className="mb-3 text-xs leading-5 text-muted-foreground">{kelompok.catatan}</p>
                ) : null}
                <div className="space-y-2">
                  {kelompok.baris.map((baris) => (
                    <div
                      key={baris.tulisan}
                      className="flex items-center gap-3 rounded-xl border border-border bg-app-canvas p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                          {baris.arti}
                        </p>
                        <p className="mt-0.5 font-display text-lg font-extrabold leading-tight">
                          {baris.tulisan}
                        </p>
                        <p className="text-xs text-muted-foreground">{baris.baca}</p>
                      </div>
                      <TombolBunyi
                        teks={baris.tulisan}
                        label={baris.baca}
                        aktif={teksAktif === baris.tulisan}
                        memuat={teksMemuat === baris.tulisan}
                        onClick={bunyikan}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <AppBottomNav />
    </main>
  );
}
