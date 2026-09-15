import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const ZOOM_MIN = 0.5;
const ZOOM_MAKS = 2.5;
const ZOOM_LANGKAH = 0.25;

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const wadahRef = useRef<HTMLDivElement>(null);
  const [lebarWadah, setLebarWadah] = useState(0);
  const [jumlahHalaman, setJumlahHalaman] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [gagal, setGagal] = useState(false);

  useEffect(() => {
    const wadah = wadahRef.current;
    if (!wadah) return;
    const observer = new ResizeObserver((entries) => {
      const lebar = entries[0]?.contentRect.width;
      if (lebar) setLebarWadah(lebar);
    });
    observer.observe(wadah);
    return () => observer.disconnect();
  }, []);

  const saatTermuat = useCallback(
    ({ numPages }: { numPages: number }) => setJumlahHalaman(numPages),
    [],
  );

  function ubahZoom(arah: 1 | -1) {
    setZoom((nilai) =>
      Math.min(ZOOM_MAKS, Math.max(ZOOM_MIN, Number((nilai + arah * ZOOM_LANGKAH).toFixed(2)))),
    );
  }

  if (gagal) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        PDF tidak dapat dimuat.{" "}
        <a href={url} target="_blank" rel="noreferrer" className="font-bold text-primary">
          Buka PDF di tab baru
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Kontrol zoom — hanya tampil di desktop, hilang di HP/Android */}
      <div className="hidden items-center justify-end gap-2 border-b border-border bg-primary-soft/50 px-4 py-2 sm:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => ubahZoom(-1)}
          disabled={zoom <= ZOOM_MIN}
          aria-label="Perkecil tampilan PDF"
          className="h-8 w-8 rounded-full"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-14 text-center text-xs font-bold tabular-nums text-primary">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => ubahZoom(1)}
          disabled={zoom >= ZOOM_MAKS}
          aria-label="Perbesar tampilan PDF"
          className="h-8 w-8 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div ref={wadahRef} className="max-h-[75vh] overflow-auto">
        <Document
          file={url}
          onLoadSuccess={saatTermuat}
          onLoadError={() => setGagal(true)}
          loading={
            <div className="p-10 text-center text-sm text-muted-foreground">
              Memuat PDF…
            </div>
          }
        >
          {lebarWadah > 0 &&
            Array.from({ length: jumlahHalaman }, (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                width={Math.floor(lebarWadah * zoom)}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="border-b border-border last:border-b-0"
              />
            ))}
        </Document>
      </div>
    </div>
  );
}
