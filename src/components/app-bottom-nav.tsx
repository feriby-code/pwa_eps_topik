import { Link, useRouterState } from "@tanstack/react-router";
import { bottomMenus } from "@/lib/app-navigation";

export function AppBottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav aria-label="Navigasi utama" className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:left-1/2 lg:max-w-3xl lg:-translate-x-1/2 lg:rounded-t-2xl lg:border-x">
      <div className="mx-auto grid h-17 max-w-3xl grid-cols-5 px-2">
        {bottomMenus.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.slug} to={item.path} aria-current={active ? "page" : undefined} className={`group flex min-w-0 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <span className={`grid h-7 w-11 place-items-center rounded-full transition-colors ${active ? "bg-primary-soft" : "group-hover:bg-muted"}`}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}