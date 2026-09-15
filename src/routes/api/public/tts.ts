import { createFileRoute } from "@tanstack/react-router";

/**
 * Proxy audio pelafalan Hangeul memakai suara Google (Google Translate TTS),
 * bahasa Korea dengan kecepatan normal (ttsspeed=1).
 * Contoh: /api/public/tts?q=%ED%95%98%EB%82%98
 */
export const Route = createFileRoute("/api/public/tts")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const teks = new URL(request.url).searchParams.get("q")?.trim() ?? "";
        if (!teks || teks.length > 120) {
          return new Response("Parameter q tidak valid", { status: 400 });
        }

        const url =
          "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ko&ttsspeed=1&q=" +
          encodeURIComponent(teks);

        const hasil = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
            Referer: "https://translate.google.com/",
          },
        });

        if (!hasil.ok || !hasil.body) {
          return new Response("Audio tidak tersedia", { status: 502 });
        }

        return new Response(hasil.body, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
