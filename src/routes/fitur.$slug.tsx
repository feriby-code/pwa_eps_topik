import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
import { titleFromSlug } from "@/lib/app-navigation";

export const Route = createFileRoute("/fitur/$slug")({
  head: ({ params }) => {
    const title = titleFromSlug(params.slug);
    const description = `${title} sedang disiapkan untuk aplikasi belajar bahasa Korea Annyeong.`;
    return { meta: [{ title: `${title} — Annyeong` }, { name: "description", content: description }, { property: "og:title", content: `${title} — Annyeong` }, { property: "og:description", content: description }] };
  },
  component: FeaturePage,
});

function FeaturePage() { return <ComingSoon title={titleFromSlug(Route.useParams().slug)} />; }